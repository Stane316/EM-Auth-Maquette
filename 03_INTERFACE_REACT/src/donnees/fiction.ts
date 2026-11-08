/**
 * Jeu de données FICTIF de la maquette.
 *
 * Règles :
 *  - aucune personne réelle, aucune donnée personnelle, aucun secret ;
 *  - aucun délai, SLA, effectif ou résultat serveur n'est présenté comme réel :
 *    les valeurs inconnues portent la mention « à convenir » ou « INCONNU » ;
 *  - les identifiants techniques (`mrq_…`) sont des chaînes de démonstration,
 *    jamais des jetons, jamais des secrets.
 */

export type EtatSysteme = 'operationnel' | 'degrade' | 'indisponible' | 'inconnu';

export type Identite = {
  readonly id: string;
  readonly nom: string;
  readonly initiales: string;
  readonly fonction: string;
  readonly facteurs: readonly string[];
  readonly dernierAcces: string;
  readonly etatCompte: 'actif' | 'suspendu' | 'invite';
};

export const IDENTITES: readonly Identite[] = [
  {
    id: 'usr_0142',
    nom: 'A. Sossou',
    initiales: 'AS',
    fonction: 'Gestionnaire d’accès',
    facteurs: ['Clé de sécurité (WebAuthn)', 'Application de codes'],
    dernierAcces: 'aujourd’hui, 09:12',
    etatCompte: 'actif',
  },
  {
    id: 'usr_0207',
    nom: 'K. Adjo',
    initiales: 'KA',
    fonction: 'Analyste — accès privilégié',
    facteurs: ['Clé de sécurité (WebAuthn)'],
    dernierAcces: 'hier, 17:48',
    etatCompte: 'actif',
  },
  {
    id: 'usr_0311',
    nom: 'R. Houngbédji',
    initiales: 'RH',
    fonction: 'Support de niveau 2',
    facteurs: ['Application de codes', 'Codes de secours'],
    dernierAcces: 'il y a 3 jours',
    etatCompte: 'actif',
  },
  {
    id: 'usr_0388',
    nom: 'M. Dossou',
    initiales: 'MD',
    fonction: 'Prestataire — mission terminée',
    facteurs: ['Clé de sécurité (WebAuthn)'],
    dernierAcces: 'il y a 41 jours',
    etatCompte: 'suspendu',
  },
];

export const IDENTITE_COURANTE = IDENTITES[0] as Identite;

export type Appareil = {
  readonly id: string;
  readonly libelle: string;
  readonly type: 'cle' | 'telephone' | 'ordinateur';
  readonly enrole: string;
  readonly dernierUsage: string;
  readonly etat: 'verifie' | 'a-verifier' | 'revoque';
};

export const APPAREILS: readonly Appareil[] = [
  {
    id: 'fct_9c21',
    libelle: 'Clé de sécurité — porte-clés',
    type: 'cle',
    enrole: '12 mars 2026',
    dernierUsage: 'aujourd’hui, 09:12',
    etat: 'verifie',
  },
  {
    id: 'fct_4b07',
    libelle: 'Téléphone professionnel',
    type: 'telephone',
    enrole: '04 juin 2026',
    dernierUsage: 'hier, 17:48',
    etat: 'verifie',
  },
  {
    id: 'fct_2e88',
    libelle: 'Ordinateur portable — profil navigateur',
    type: 'ordinateur',
    enrole: '28 septembre 2026',
    dernierUsage: 'il y a 6 jours',
    etat: 'a-verifier',
  },
];

export type Session = {
  readonly id: string;
  readonly appareil: string;
  readonly emplacement: string;
  readonly ouverte: string;
  readonly activite: string;
  readonly courante: boolean;
};

export const SESSIONS: readonly Session[] = [
  {
    id: 'ses_71fa',
    appareil: 'Ordinateur portable — Firefox',
    emplacement: 'Cotonou (réseau de démonstration)',
    ouverte: 'aujourd’hui, 08:58',
    activite: 'à l’instant',
    courante: true,
  },
  {
    id: 'ses_58c3',
    appareil: 'Téléphone professionnel — navigateur',
    emplacement: 'Cotonou (réseau de démonstration)',
    ouverte: 'hier, 17:41',
    activite: 'il y a 16 h',
    courante: false,
  },
  {
    id: 'ses_11ab',
    appareil: 'Poste partagé — salle de réunion',
    emplacement: 'Localisation non déterminée',
    ouverte: 'il y a 3 jours',
    activite: 'il y a 3 jours',
    courante: false,
  },
];

export type Cible = {
  readonly id: string;
  readonly nom: string;
  readonly portee: string;
  readonly impact: number;
  readonly reset: boolean;
  readonly etat: 'mesure' | 'a-mesurer' | 'non-observable';
  readonly unite: string;
};

export const CIBLES: readonly Cible[] = [
  { id: 'cbl_sess', nom: 'Sessions actives', portee: 'Toutes applications', impact: 3, reset: false, etat: 'mesure', unite: 'sessions' },
  { id: 'cbl_jet', nom: 'Jetons d’accès délivrés', portee: 'Révoqués au prochain renouvellement', impact: 2, reset: false, etat: 'mesure', unite: 'jetons' },
  { id: 'cbl_mfa', nom: 'Facteurs enrôlés', portee: 'Réinitialisation demandée', impact: 2, reset: true, etat: 'mesure', unite: 'facteurs' },
  { id: 'cbl_ann', nom: 'Annuaire applicatif', portee: 'Compte désactivé côté annuaire', impact: 1, reset: false, etat: 'mesure', unite: 'comptes' },
  { id: 'cbl_cac', nom: 'Caches applicatifs', portee: 'Aucune invalidation observée', impact: 0, reset: false, etat: 'non-observable', unite: 'systèmes' },
];

export type EtatDemande = 'brouillon' | 'en-attente' | 'approuvee' | 'refusee' | 'expiree';

export type Demande = {
  readonly id: string;
  readonly objet: string;
  readonly demandeur: string;
  readonly cible: string;
  readonly motif: string;
  readonly creee: string;
  readonly etat: EtatDemande;
  readonly approbateurRequis: string;
};

export const DEMANDES: readonly Demande[] = [
  {
    id: 'dem_5512',
    objet: 'Récupération d’accès après perte de facteur',
    demandeur: 'K. Adjo (analyste)',
    cible: 'usr_0207',
    motif: 'Clé de sécurité égarée, aucun code de secours disponible',
    creee: 'aujourd’hui, 08:20',
    etat: 'en-attente',
    approbateurRequis: 'R. Houngbédji (support N2) + A. Sossou (gestionnaire)',
  },
  {
    id: 'dem_5488',
    objet: 'Élévation temporaire de privilège',
    demandeur: 'R. Houngbédji (support N2)',
    cible: 'usr_0311',
    motif: 'Intervention planifiée — fenêtre de 4 h',
    creee: 'hier, 16:05',
    etat: 'en-attente',
    approbateurRequis: 'A. Sossou (gestionnaire)',
  },
  {
    id: 'dem_5471',
    objet: 'Retrait immédiat — fin de mission',
    demandeur: 'A. Sossou (gestionnaire)',
    cible: 'usr_0388',
    motif: 'Fin de contrat prestataire du 30 septembre',
    creee: 'il y a 4 jours',
    etat: 'approuvee',
    approbateurRequis: 'A. Sossou + un second acteur distinct',
  },
  {
    id: 'dem_5460',
    objet: 'Enrôlement d’un second facteur',
    demandeur: 'K. Adjo (analyste)',
    cible: 'usr_0207',
    motif: 'Remplacement d’un téléphone',
    creee: 'il y a 9 jours',
    etat: 'expiree',
    approbateurRequis: 'A. Sossou (gestionnaire)',
  },
];

export type ResultatAudit = 'succes' | 'echec' | 'non-confirme' | 'refus';

export type EvenementAudit = {
  readonly horodatage: string;
  readonly acteur: string;
  readonly action: string;
  readonly cible: string;
  readonly resultat: ResultatAudit;
  readonly correlation: string;
  readonly source: string;
};

export const EVENEMENTS: readonly EvenementAudit[] = [
  { horodatage: '2026-11-08T09:12:44Z', acteur: 'A. Sossou', action: 'Authentification renforcée', cible: 'usr_0142', resultat: 'succes', correlation: 'mrq_71fa', source: 'BFF' },
  { horodatage: '2026-11-08T09:14:02Z', acteur: 'A. Sossou', action: 'Consultation d’un dossier de récupération', cible: 'dem_5512', resultat: 'succes', correlation: 'mrq_71fa', source: 'BFF' },
  { horodatage: '2026-11-08T09:21:37Z', acteur: '—', action: 'Identification refusée (motif non divulgué)', cible: 'usr inconnu', resultat: 'echec', correlation: 'mrq_2c04', source: 'BFF' },
  { horodatage: '2026-11-08T09:26:11Z', acteur: 'R. Houngbédji', action: 'Approbation de récupération', cible: 'dem_5512', resultat: 'succes', correlation: 'mrq_9b31', source: 'Interface' },
  { horodatage: '2026-11-08T09:27:55Z', acteur: 'R. Houngbédji', action: 'Tentative d’auto-approbation', cible: 'dem_5512', resultat: 'refus', correlation: 'mrq_9b31', source: 'Interface' },
  { horodatage: '2026-11-08T09:31:20Z', acteur: 'A. Sossou', action: 'Retrait de privilège — demande', cible: 'usr_0388', resultat: 'succes', correlation: 'mrq_4de0', source: 'Interface' },
  { horodatage: '2026-11-08T09:32:08Z', acteur: 'système', action: 'Révocation de sessions', cible: 'usr_0388', resultat: 'non-confirme', correlation: 'mrq_4de0', source: 'Orchestrateur' },
  { horodatage: '2026-11-08T09:33:40Z', acteur: 'système', action: 'Invalidation de cache applicatif', cible: 'app_crm', resultat: 'non-confirme', correlation: 'mrq_4de0', source: 'Orchestrateur' },
  { horodatage: '2026-11-08T09:40:02Z', acteur: 'K. Adjo', action: 'Consultation de ses propres sessions', cible: 'usr_0207', resultat: 'succes', correlation: 'mrq_58c3', source: 'BFF' },
  { horodatage: '2026-11-08T09:44:19Z', acteur: '—', action: 'Preuve fraîche expirée', cible: 'usr_0142', resultat: 'refus', correlation: 'mrq_71fa', source: 'BFF' },
];

export type Application = {
  readonly id: string;
  readonly nom: string;
  readonly portee: string;
  readonly etat: EtatSysteme;
  readonly responsable: string;
};

export const APPLICATIONS: readonly Application[] = [
  { id: 'app_crm', nom: 'Portail commercial', portee: 'Clients, contrats', etat: 'operationnel', responsable: 'Direction commerciale' },
  { id: 'app_fin', nom: 'Back-office financier', portee: 'Facturation, paiements', etat: 'degrade', responsable: 'Direction financière' },
  { id: 'app_rh', nom: 'Espace ressources humaines', portee: 'Dossiers du personnel', etat: 'operationnel', responsable: 'Direction des ressources humaines' },
  { id: 'app_obs', nom: 'Observabilité', portee: 'Journaux, métriques', etat: 'inconnu', responsable: 'Exploitation' },
];

/** Étapes du dossier de récupération (E08 / A03). Aucun délai n'est inventé. */
export const ETAPES_RECUPERATION: ReadonlyArray<{
  readonly titre: string;
  readonly detail: string;
  readonly etat: 'fait' | 'en-cours' | 'a-venir' | 'bloque';
  readonly echeance: string;
}> = [
  { titre: 'Demande reçue', detail: 'Dossier dem_5512 ouvert par K. Adjo', etat: 'fait', echeance: 'aujourd’hui, 08:20' },
  { titre: 'Premier acteur : vérification d’identité', detail: 'R. Houngbédji — pièces vérifiées hors ligne', etat: 'fait', echeance: 'aujourd’hui, 08:41' },
  { titre: 'Second acteur : décision indépendante', detail: 'A. Sossou — ne peut pas être le demandeur', etat: 'en-cours', echeance: 'à convenir' },
  { titre: 'Enrôlement du nouveau facteur', detail: 'Mandat à émettre après décision', etat: 'a-venir', echeance: 'à convenir' },
  { titre: 'Notification et clôture', detail: 'Le demandeur est informé du résultat, quel qu’il soit', etat: 'a-venir', echeance: 'à convenir' },
];

