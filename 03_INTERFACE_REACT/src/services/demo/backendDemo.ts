/**
 * Backend de démonstration — moteur en mémoire, sans dépendance.
 *
 * Il n'essaie pas d'imiter une sécurité : il applique les **règles du projet**
 * pour que les écrans se comportent réellement comme ils le feront face au BFF.
 *
 * Règles reprises de `s05-policy.json` :
 *  - preuve fraîche obligatoire pour une action sensible (fenêtre de 5 min) ;
 *  - un code à usage unique seul ne suffit pas (OTP_INSUFFICIENT) ;
 *  - un demandeur ne peut pas approuver son propre dossier (RECOVERY_SELF_APPROVAL) ;
 *  - approbateur habilité requis (RECOVERY_APPROVER_NOT_AUTHORIZED) ;
 *  - le retrait d'un facteur ne révoque pas les sessions (SESSIONS_NOT_REVOKED) ;
 *  - une cible non lue reste « non observable », jamais « retirée ».
 *
 * Aucun secret, aucune donnée réelle, aucune persistance : l'état vit en mémoire
 * et disparaît au rechargement de la page.
 */
import { env } from '../../config/env';
import type {
  CibleRetraitDto,
  DossierDto,
  EvenementDto,
  FacteurDto,
  MandatDto,
  OperationRetraitDto,
  ReponseApi,
  SessionDto,
  UtilisateurDto,
} from '../contracts/api';
import { MESSAGES_UI, message } from '../contracts/messages';
import { POLITIQUE } from '../contracts/politique';
import type { AuthPort, BackofficePort, ResultatDeconnexion, ResultatIdentification, ServicesEmAuth } from '../ports';

const attendre = (ms: number) => new Promise((resoudre) => setTimeout(resoudre, ms));

const ok = <T>(donnees: T, texte?: string): ReponseApi<T> =>
  texte === undefined ? { ok: true, donnees } : { ok: true, donnees, message: texte };

const echec = (code: string, statut = 400): ReponseApi<never> => ({
  ok: false,
  code,
  message: code in MESSAGES_UI ? MESSAGES_UI[code as keyof typeof MESSAGES_UI] : code,
  statut,
});

const refus = (cle: Parameters<typeof message>[0], statut = 403): ReponseApi<never> => ({
  ok: false,
  code: cle,
  message: message(cle),
  statut,
});

const iso = (instant: number): string => new Date(instant).toISOString();

const reference = (prefixe: string, graine: number): string =>
  `${prefixe}_${graine.toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Comptes fictifs de démonstration. Aucune donnée réelle. */
export const UTILISATEURS_DEMO: readonly UtilisateurDto[] = [
  { id: 'usr_0142', nom: 'A. Sossou', identifiant: 'a.sossou', roles: ['gestionnaire', 'support', 'reader'] },
  { id: 'usr_0311', nom: 'R. Houngbédji', identifiant: 'r.houngbedji', roles: ['support', 'reader'] },
  { id: 'usr_0207', nom: 'K. Adjo', identifiant: 'k.adjo', roles: ['reader'] },
  { id: 'usr_0388', nom: 'M. Dossou', identifiant: 'm.dossou', roles: [] },
];

const FACTEURS_INITIAUX: readonly FacteurDto[] = [
  { id: 'fct_9c21', libelle: 'Clé de sécurité — porte-clés', type: 'cle', etat: 'verifie', enrole: '12 mars 2026', dernierUsage: 'aujourd’hui, 09:12' },
  { id: 'fct_4b07', libelle: 'Téléphone professionnel', type: 'telephone', etat: 'verifie', enrole: '04 juin 2026', dernierUsage: 'hier, 17:48' },
  { id: 'fct_2e88', libelle: 'Ordinateur portable — profil navigateur', type: 'cle', etat: 'a-verifier', enrole: '28 septembre 2026', dernierUsage: 'il y a 6 jours' },
];

const CIBLES_INITIALES = (utilisateurId: string): readonly CibleRetraitDto[] => [
  { id: 'cbl_sess', nom: 'Sessions actives', portee: 'Toutes applications', impact: 3, unite: 'sessions', etat: 'mesure', detail: '3 sessions mesurées' },
  { id: 'cbl_jet', nom: 'Jetons d’accès délivrés', portee: 'Révoqués au prochain renouvellement', impact: 2, unite: 'jetons', etat: 'mesure', detail: '2 jetons mesurés' },
  { id: 'cbl_mfa', nom: 'Facteurs enrôlés', portee: 'Réinitialisation demandée', impact: 2, unite: 'facteurs', etat: 'mesure', detail: '2 facteurs mesurés' },
  { id: 'cbl_ann', nom: 'Annuaire applicatif', portee: 'Compte désactivé côté annuaire', impact: 1, unite: 'comptes', etat: 'mesure', detail: `1 compte mesuré (${utilisateurId})` },
  { id: 'cbl_cac', nom: 'Caches applicatifs', portee: 'Aucune invalidation observable', impact: 0, unite: 'systèmes', etat: 'non-observable', detail: 'Aucun accès en lecture à ce système' },
];

type SessionInterne = {
  utilisateur: UtilisateurDto;
  expireA: number;
  preuveJusqua: number | null;
  niveauPreuve: 'aucun' | 'double' | 'fort';
  facteurUtilise?: string;
};

export type OptionsDemo = {
  /** Fenêtre de preuve fraîche. Raccourcie uniquement par les tests. */
  readonly fraicheurMs?: number;
  /**
   * Ouvre d'emblée une session de démonstration. Utilisé par `npm run rendu`
   * pour vérifier que les écrans protégés se rendent réellement ; jamais activé
   * par défaut, jamais activé en mode `http`.
   */
  readonly sessionInitiale?: boolean;
};

export const creerBackendDemo = (
  options: OptionsDemo = {},
): ServicesEmAuth & { reinitialiser: () => void } => {
  const fraicheur = options.fraicheurMs ?? POLITIQUE.fraicheurMs;
  let session: SessionInterne | null = null;
  let facteurs: FacteurDto[] = [...FACTEURS_INITIAUX];
  let dossiers: DossierDto[] = [];
  let operations: OperationRetraitDto[] = [];
  let mandats: MandatDto[] = [];
  let journal: EvenementDto[] = [];
  let compteur = 1000;

  const tracer = (
    action: string,
    cible: string,
    resultat: EvenementDto['resultat'],
    source: string,
    acteur?: string,
  ): void => {
    journal = [
      {
        horodatage: iso(Date.now()),
        acteur: acteur ?? session?.utilisateur.nom ?? 'système',
        action,
        cible,
        resultat,
        correlation: `mrq_${(compteur += 7).toString(36)}`,
        source,
      },
      ...journal,
    ].slice(0, 80);
  };

  const sessionValide = (): SessionInterne | null => {
    if (!session) return null;
    if (Date.now() >= session.expireA) {
      session = null;
      return null;
    }
    return session;
  };

  const vue = (interne: SessionInterne): SessionDto => ({
    authentifie: true,
    utilisateur: interne.utilisateur,
    expireA: iso(interne.expireA),
    niveauPreuve: interne.niveauPreuve,
    ...(interne.preuveJusqua && interne.preuveJusqua > Date.now()
      ? { preuveFraicheJusqua: iso(interne.preuveJusqua) }
      : {}),
  });

  const ouvrirPour = (utilisateur: UtilisateurDto): SessionInterne => ({
    utilisateur,
    expireA: Date.now() + env.dureeSessionMin * 60_000,
    preuveJusqua: Date.now() + fraicheur,
    niveauPreuve: 'fort',
  });

  const preuveValide = (interne: SessionInterne | null): interne is SessionInterne =>
    Boolean(interne?.preuveJusqua && interne.preuveJusqua > Date.now() && interne.niveauPreuve === 'fort');

  const aRole = (interne: SessionInterne | null, ...roles: readonly string[]): boolean =>
    Boolean(interne && interne.utilisateur.roles.some((role) => roles.includes(role)));

  const ouvrirSession = (utilisateur: UtilisateurDto, facteurId: string): SessionInterne => {
    session = {
      utilisateur,
      expireA: Date.now() + env.dureeSessionMin * 60_000,
      preuveJusqua: Date.now() + fraicheur,
      niveauPreuve: 'fort',
      ...(facteurId ? { facteurUtilise: facteurId } : {}),
    };
    return session;
  };

  const auth: AuthPort = {
    strategie: 'identifiant-interne',

    async redirigerVersConnexion() {
      // En démonstration, la connexion reste dans l'application.
    },

    async sessionCourante() {
      await attendre(env.latenceDemo / 3);
      const interne = sessionValide();
      if (!interne) return ok<SessionDto>({ authentifie: false });
      return ok(vue(interne));
    },

    async identifier(identifiant) {
      await attendre(env.latenceDemo);
      // Anti-énumération : la réponse est identique que le compte existe ou non.
      const utilisateur = UTILISATEURS_DEMO.find(
        (candidat) => candidat.identifiant === identifiant.trim().toLowerCase(),
      );
      const disponibles = utilisateur ? facteurs.filter((facteur) => facteur.etat === 'verifie') : [];
      tracer('Identification — étape 1', identifiant, 'succes', 'BFF');
      return ok<ResultatIdentification>({ identifiant: identifiant.trim(), facteurs: disponibles });
    },

    async verifierFacteur(facteurId) {
      await attendre(env.latenceDemo);
      const facteur = facteurs.find((candidat) => candidat.id === facteurId);
      if (!facteur) return refus('FACTOR_MISSING');
      if (facteur.etat === 'revoque') return refus('CREDENTIAL_RETIRED');
      const utilisateur = UTILISATEURS_DEMO.find((candidat) => candidat.roles.length > 0);
      if (!utilisateur) return echec('INCONNU', 500);
      const interne = ouvrirSession(utilisateur, facteur.id);
      tracer('Authentification renforcée', utilisateur.id, 'succes', 'BFF');
      return ok(vue(interne));
    },

    async produirePreuveFraiche() {
      await attendre(env.latenceDemo / 2);
      const interne = sessionValide();
      if (!interne) return echec('SESSION_EXPIREE', 401);
      const facteur = facteurs.find((candidat) => candidat.id === interne.facteurUtilise);
      // Un code à usage unique seul ne suffit pas pour une action sensible.
      if (facteur?.type === 'telephone' && POLITIQUE.otpSeulInsuffisant) return refus('OTP_INSUFFICIENT');
      interne.preuveJusqua = Date.now() + fraicheur;
      interne.niveauPreuve = 'fort';
      tracer('Preuve fraîche produite', interne.utilisateur.id, 'succes', 'BFF');
      return ok(vue(interne));
    },

    async deconnexion() {
      await attendre(env.latenceDemo / 2);
      const acteur = session?.utilisateur.nom;
      session = null;
      tracer('Déconnexion locale', acteur ?? 'inconnu', 'succes', 'BFF', acteur);
      const resultat: ResultatDeconnexion = {
        locale: true,
        distante: 'non-confirme',
        message: message('SHARED_WORKSTATION_SAFE'),
      };
      return ok(resultat, message('SESSIONS_NOT_REVOKED'));
    },

    async ouvrirRecuperation(identifiant) {
      await attendre(env.latenceDemo);
      const referenceDossier = reference('dem', (compteur += 11));
      const demandeur = identifiant.trim() || 'demandeur inconnu';
      const dossier: DossierDto = {
        reference: referenceDossier,
        statut: 'en-attente',
        demandeur,
        cible: demandeur,
        motif: 'Perte de facteur — déclaration du demandeur',
        creeLe: iso(Date.now()),
        etapes: [
          { titre: 'Demande reçue', detail: `Dossier ${referenceDossier} ouvert`, etat: 'fait', echeance: 'à l’instant' },
          { titre: 'Preuve indépendante', detail: 'Vérification par un opérateur de support', etat: 'en-cours', echeance: 'à convenir' },
          { titre: 'Second acteur : décision indépendante', detail: 'Ne peut pas être le demandeur', etat: 'a-venir', echeance: 'à convenir' },
          { titre: 'Notification et clôture', detail: 'Le demandeur est informé du résultat', etat: 'a-venir', echeance: 'à convenir' },
        ],
      };
      dossiers = [dossier, ...dossiers];
      tracer('Ouverture d’un dossier de récupération', referenceDossier, 'succes', 'BFF');
      // Message identique que le compte existe ou non : aucune énumération.
      return ok({ reference: referenceDossier }, message('RECOVERY_OPENED'));
    },

    async suivreRecuperation(referenceDossier) {
      await attendre(env.latenceDemo / 2);
      const dossier = dossiers.find((candidat) => candidat.reference === referenceDossier);
      if (!dossier) return echec('INCONNU', 404);
      return ok(dossier);
    },
  };

  const backoffice: BackofficePort = {
    async listerUtilisateurs() {
      await attendre(env.latenceDemo / 2);
      return ok(UTILISATEURS_DEMO);
    },

    async mesurerRetrait(utilisateurId) {
      await attendre(env.latenceDemo);
      const utilisateur = UTILISATEURS_DEMO.find((candidat) => candidat.id === utilisateurId);
      if (!utilisateur) return echec('INCONNU', 404);
      const existante = operations.find((operation) => operation.utilisateurId === utilisateurId);
      if (existante) return ok(existante);
      const operation: OperationRetraitDto = {
        reference: reference('opr', (compteur += 13)),
        utilisateurId,
        utilisateurNom: utilisateur.nom,
        statut: 'planifiee',
        cibles: CIBLES_INITIALES(utilisateurId),
      };
      operations = [operation, ...operations];
      tracer('Mesure d’impact de retrait', utilisateurId, 'succes', 'Interface');
      return ok(operation);
    },

    async executerRetrait(utilisateurId) {
      await attendre(env.latenceDemo);
      const interne = sessionValide();
      if (!interne) return echec('SESSION_EXPIREE', 401);
      if (!aRole(interne, 'gestionnaire', 'responsable')) return echec('ACCES_REFUSE', 403);
      // Preuve fraîche exigée : sans elle, rien n'est exécuté.
      if (!preuveValide(interne)) return refus('PROOF_STALE');

      const operation = operations.find((candidat) => candidat.utilisateurId === utilisateurId);
      if (!operation) return echec('INCONNU', 404);

      const cibles: CibleRetraitDto[] = operation.cibles.map((cible) => {
        if (cible.etat === 'non-observable') return cible;
        if (cible.id === 'cbl_ann') {
          return { ...cible, etat: 'echec', detail: 'Annuaire indisponible au moment du retrait' };
        }
        return { ...cible, etat: 'effectue', detail: `Retrait mesuré · ${cible.impact} ${cible.unite}` };
      });

      const partielle = cibles.some((cible) => cible.etat === 'echec' || cible.etat === 'non-observable');
      const misAJour: OperationRetraitDto = {
        ...operation,
        cibles,
        statut: partielle ? 'partielle' : 'terminee',
        demarreeLe: operation.demarreeLe ?? iso(Date.now()),
      };
      operations = operations.map((candidat) => (candidat.reference === operation.reference ? misAJour : candidat));
      tracer('Exécution d’un retrait par cible', utilisateurId, partielle ? 'non-confirme' : 'succes', 'Orchestrateur');
      tracer('Invalidation de cache applicatif', 'app_crm', 'non-confirme', 'Orchestrateur');
      return ok(misAJour);
    },

    async listerOperations() {
      await attendre(env.latenceDemo / 3);
      return ok(operations);
    },

    async listerDossiers() {
      await attendre(env.latenceDemo / 3);
      return ok(dossiers);
    },

    async deciderRecuperation(referenceDossier, decision, motif) {
      await attendre(env.latenceDemo);
      const interne = sessionValide();
      if (!interne) return echec('SESSION_EXPIREE', 401);
      if (!aRole(interne, 'gestionnaire', 'support')) return refus('RECOVERY_APPROVER_NOT_AUTHORIZED');

      const dossier = dossiers.find((candidat) => candidat.reference === referenceDossier);
      if (!dossier) return echec('INCONNU', 404);

      // Le demandeur ne peut jamais décider de son propre dossier.
      if (dossier.demandeur === interne.utilisateur.identifiant || dossier.demandeur === interne.utilisateur.nom) {
        tracer('Tentative d’auto-approbation', referenceDossier, 'refus', 'Interface');
        return refus('RECOVERY_SELF_APPROVAL');
      }

      if (decision === 'refuser' && (!motif || motif.trim().length < 3)) return echec('INCONNU', 400);

      const misAJour: DossierDto =
        decision === 'approuver'
          ? {
              ...dossier,
              statut: 'approuve',
              decideur: interne.utilisateur.nom,
              etapes: dossier.etapes.map((etape) => ({ ...etape, etat: 'fait' as const })),
            }
          : {
              ...dossier,
              statut: 'refuse',
              decideur: interne.utilisateur.nom,
              motifRefus: motif?.trim(),
              etapes: dossier.etapes.map((etape, index) => ({
                ...etape,
                etat: index === 0 ? ('fait' as const) : ('bloque' as const),
              })),
            };

      dossiers = dossiers.map((candidat) => (candidat.reference === referenceDossier ? misAJour : candidat));
      tracer(
        decision === 'approuver' ? 'Approbation de récupération' : 'Refus de récupération',
        referenceDossier,
        decision === 'approuver' ? 'succes' : 'refus',
        'Interface',
      );
      return ok(misAJour, decision === 'approuver' ? message('RECOVERY_APPROVED') : undefined);
    },

    async emettreMandat(beneficiaire, facteur) {
      await attendre(env.latenceDemo);
      const interne = sessionValide();
      if (!interne) return echec('SESSION_EXPIREE', 401);
      if (!aRole(interne, 'gestionnaire')) return echec('ACCES_REFUSE', 403);
      // Auto-mandat refusé : on ne s'autorise pas soi-même.
      if (
        beneficiaire.trim().toLowerCase() === interne.utilisateur.identifiant ||
        beneficiaire.trim().toLowerCase() === interne.utilisateur.nom.toLowerCase()
      ) {
        tracer('Tentative d’auto-mandat', interne.utilisateur.id, 'refus', 'Interface');
        return refus('RECOVERY_SELF_APPROVAL');
      }
      const mandat: MandatDto = {
        reference: reference('mdt', (compteur += 17)),
        beneficiaire: beneficiaire.trim(),
        facteur: facteur.trim(),
        emisLe: iso(Date.now()),
        expireLe: iso(Date.now() + 48 * 3_600_000),
        consomme: false,
      };
      mandats = [mandat, ...mandats];
      tracer('Émission d’un mandat d’enrôlement', mandat.reference, 'succes', 'Interface');
      return ok(mandat);
    },

    async consommerMandat(referenceMandat) {
      await attendre(env.latenceDemo);
      const mandat = mandats.find((candidat) => candidat.reference === referenceMandat);
      if (!mandat) return echec('INCONNU', 404);
      if (mandat.consomme || Date.parse(mandat.expireLe) < Date.now()) {
        tracer('Mandat expiré ou déjà consommé', referenceMandat, 'echec', 'Service');
        return echec('CHALLENGE_INVALID', 409);
      }
      const nouveau: FacteurDto = {
        id: reference('fct', (compteur += 19)),
        libelle: `Clé de sécurité — enrôlement ${new Date().toLocaleDateString('fr-FR')}`,
        type: 'cle',
        etat: 'verifie',
        enrole: new Date().toLocaleDateString('fr-FR'),
        dernierUsage: 'à l’instant',
      };
      facteurs = [nouveau, ...facteurs];
      mandats = mandats.map((candidat) =>
        candidat.reference === referenceMandat ? { ...candidat, consomme: true } : candidat,
      );
      tracer('Enrôlement d’un facteur', nouveau.id, 'succes', 'Service');
      return ok(nouveau, message('ENROL_OK'));
    },

    async journal(referenceFiltre) {
      await attendre(env.latenceDemo / 4);
      const evenements = referenceFiltre
        ? journal.filter((evenement) => evenement.cible === referenceFiltre)
        : journal;
      return ok(evenements);
    },

    async changerProfil(profil) {
      await attendre(env.latenceDemo / 3);
      const utilisateur = UTILISATEURS_DEMO.find((candidat) => candidat.identifiant === profil);
      if (!utilisateur) return echec('INCONNU', 404);
      // Bascule de profil : réservée à la démonstration, jamais exposée au produit.
      session = ouvrirPour(utilisateur);
      return ok(vue(session));
    },
  };

  if (options.sessionInitiale) {
    const gestionnaire = UTILISATEURS_DEMO[0];
    if (gestionnaire) session = ouvrirPour(gestionnaire);
  }

  return {
    mode: 'demo',
    auth,
    backoffice,
    reinitialiser: () => {
      session = null;
      facteurs = [...FACTEURS_INITIAUX];
      dossiers = [];
      operations = [];
      mandats = [];
      journal = [];
    },
  };
};

export type BackendDemo = ReturnType<typeof creerBackendDemo>;
