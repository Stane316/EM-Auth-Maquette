/**
 * Catalogue des états démontrables, écran par écran.
 *
 * Chaque état est un cas réel du parcours : nominal, erreur, état limite ou
 * défaillance système. Les écrans ne déclarent PAS leurs onglets eux-mêmes :
 * ils lisent ce catalogue, ce qui rend le décompte vérifiable par
 * `scripts/audit.mjs` (nombre d'états, cohérence des slugs, couverture).
 */

export type NatureEtat = 'nominal' | 'erreur' | 'limite' | 'systeme';

export type EtatEcran = {
  /** Clé stable, utilisée en query string (`?etat=...`). */
  readonly cle: string;
  /** Libellé vu par l'utilisateur. */
  readonly libelle: string;
  readonly nature: NatureEtat;
  /** Ce que cet état démontre — sert aussi de documentation lisible. */
  readonly preuve: string;
};

export const ETATS: Readonly<Record<string, readonly EtatEcran[]>> = {
  invitation: [
    { cle: 'arrivee', libelle: 'Invitation valide', nature: 'nominal', preuve: 'Expéditeur, portée et échéance visibles avant toute saisie.' },
    { cle: 'expiree', libelle: 'Lien expiré', nature: 'erreur', preuve: 'Refus sans divulgation de l’identité associée au lien.' },
    { cle: 'deja-utilisee', libelle: 'Lien déjà utilisé', nature: 'limite', preuve: 'Usage unique : la deuxième ouverture ne réactive rien.' },
    { cle: 'expediteur-inconnu', libelle: 'Expéditeur non vérifié', nature: 'erreur', preuve: 'Signalement d’hameçonnage proposé, poursuite bloquée.' },
  ],
  identification: [
    { cle: 'saisie', libelle: 'Saisie', nature: 'nominal', preuve: 'Aide contextuelle, aucune révélation de l’existence du compte.' },
    { cle: 'erreur-generique', libelle: 'Échec générique', nature: 'erreur', preuve: 'Un seul message pour « inconnu » et « mauvais mot de passe ».' },
    { cle: 'verrouillage', libelle: 'Tentatives épuisées', nature: 'limite', preuve: 'Blocage temporaire, motif non détaillé, issue de secours proposée.' },
    { cle: 'vide', libelle: 'Champs incomplets', nature: 'erreur', preuve: 'Erreur de saisie locale, distincte d’un échec d’authentification.' },
    { cle: 'degrade', libelle: 'Service dégradé', nature: 'systeme', preuve: 'La dégradation est annoncée avant la saisie, pas après.' },
  ],
  'moyen-autorise': [
    { cle: 'choix', libelle: 'Moyens disponibles', nature: 'nominal', preuve: 'Seuls les facteurs réellement enrôlés sont proposés.' },
    { cle: 'cle-absente', libelle: 'Facteur indisponible', nature: 'limite', preuve: 'Voie de secours visible, jamais un cul-de-sac.' },
    { cle: 'code-non-recu', libelle: 'Code non reçu', nature: 'erreur', preuve: 'Renvoi expliqué, limitation annoncée, pas de promesse de délai.' },
    { cle: 'repli', libelle: 'Repli sur code de secours', nature: 'limite', preuve: 'Le repli consomme un code, l’information est dite avant.' },
  ],
  'preuve-fraiche': [
    { cle: 'attente', libelle: 'Attente du facteur', nature: 'nominal', preuve: 'Fenêtre native simulée et étiquetée comme telle.' },
    { cle: 'succes', libelle: 'Preuve obtenue', nature: 'nominal', preuve: 'La fenêtre de validité restante est affichée en clair.' },
    { cle: 'refus', libelle: 'Preuve refusée', nature: 'erreur', preuve: 'Refus côté facteur : l’action sensible reste bloquée.' },
    { cle: 'delai', libelle: 'Délai dépassé', nature: 'limite', preuve: 'Expiration explicite, relance possible, aucun succès implicite.' },
  ],
  transition: [
    { cle: 'echange', libelle: 'Échange en cours', nature: 'nominal', preuve: 'Aucun jeton, code ou paramètre sensible n’est affiché.' },
    { cle: 'redirection', libelle: 'Redirection', nature: 'nominal', preuve: 'Application de destination nommée et vérifiable.' },
    { cle: 'echec', libelle: 'Échange interrompu', nature: 'erreur', preuve: 'Retour au point de départ sans session fantôme.' },
  ],
  'fin-de-session': [
    { cle: 'confirmation', libelle: 'Déconnexion locale', nature: 'nominal', preuve: 'Ce qui est certain et ce qui ne l’est pas sont séparés.' },
    { cle: 'revocation-partielle', libelle: 'Révocation partielle', nature: 'limite', preuve: '« Déconnecté ici » ≠ « déconnecté partout ».' },
    { cle: 'echec-local', libelle: 'Échec local', nature: 'erreur', preuve: 'Impossible de garantir la fermeture : consigne explicite.' },
  ],
  'perte-ou-aide': [
    { cle: 'accueil', libelle: 'Choix de la voie', nature: 'nominal', preuve: 'Deux voies indépendantes, aucune ne dépend de l’autre.' },
    { cle: 'envoyee', libelle: 'Demande enregistrée', nature: 'nominal', preuve: 'Message identique que le compte existe ou non.' },
    { cle: 'sans-reponse', libelle: 'Aucune information', nature: 'limite', preuve: 'L’incertitude est assumée, pas maquillée en échec.' },
    { cle: 'voies-indisponibles', libelle: 'Voies indisponibles', nature: 'systeme', preuve: 'Aucune promesse de rétablissement non tenue.' },
  ],
  'suivi-recuperation': [
    { cle: 'en-cours', libelle: 'Dossier en cours', nature: 'nominal', preuve: 'Étapes, acteurs et échéances réelles — « à convenir » si inconnu.' },
    { cle: 'attente-2', libelle: 'Second acteur attendu', nature: 'limite', preuve: 'La séparation des acteurs est visible et bloquante.' },
    { cle: 'approuvee', libelle: 'Dossier approuvé', nature: 'nominal', preuve: 'Approbation ≠ accès rétabli : la distinction est écrite.' },
    { cle: 'refusee', libelle: 'Dossier refusé', nature: 'erreur', preuve: 'Motif de refus, recours possible, aucune impasse.' },
    { cle: 'expiree', libelle: 'Dossier expiré', nature: 'limite', preuve: 'Expiration sans effet rétroactif, nouvelle demande possible.' },
  ],
  'demande-sensible': [
    { cle: 'formulaire', libelle: 'Formulaire', nature: 'nominal', preuve: 'Portée et irréversibilité annoncées avant la saisie.' },
    { cle: 'recapitulatif', libelle: 'Récapitulatif', nature: 'nominal', preuve: 'Ce qui sera fait, pour qui, par qui — relu avant envoi.' },
    { cle: 'envoyee', libelle: 'Demande transmise', nature: 'nominal', preuve: 'Deux approbateurs distincts requis, nommés.' },
    { cle: 'conflit', libelle: 'Conflit d’intérêt', nature: 'erreur', preuve: 'Auto-approbation refusée par la règle, pas par la politesse.' },
  ],
  'retrait-par-cible': [
    { cle: 'selection', libelle: 'Sélection de la cible', nature: 'nominal', preuve: 'Recherche par identité, état du compte rappelé.' },
    { cle: 'impact', libelle: 'Impact mesuré', nature: 'nominal', preuve: 'Cibles mesurées, cibles non observables, cibles à mesurer.' },
    { cle: 'confirmation', libelle: 'Confirmation', nature: 'limite', preuve: 'Preuve fraîche exigée, conséquence irréversible écrite.' },
    { cle: 'non-observable', libelle: 'Cible non observable', nature: 'limite', preuve: 'Aucune cible n’est présumée retirée sans mesure.' },
    { cle: 'refus', libelle: 'Retrait refusé', nature: 'erreur', preuve: 'Refus motivé, aucun contournement proposé.' },
  ],
  'resultat-non-confirme': [
    { cle: 'non-confirme', libelle: 'Résultat non confirmé', nature: 'limite', preuve: 'Ni succès ni échec : état propre, actions de vérification proposées.' },
    { cle: 'verification', libelle: 'Vérification en cours', nature: 'nominal', preuve: 'Ce qui est vérifié, depuis quand, et par qui.' },
    { cle: 'confirme', libelle: 'Confirmé après coup', nature: 'nominal', preuve: 'Le passage de « non confirmé » à « confirmé » est tracé.' },
    { cle: 'echec-verifie', libelle: 'Échec vérifié', nature: 'erreur', preuve: 'Échec établi par mesure, avec la preuve associée.' },
  ],
  expiration: [
    { cle: 'avertissement', libelle: 'Avertissement', nature: 'limite', preuve: 'Compte à rebours visible, prolongation possible.' },
    { cle: 'expiree', libelle: 'Session expirée', nature: 'limite', preuve: 'Le travail en cours est conservé, pas détruit.' },
    { cle: 'reprise', libelle: 'Reprise', nature: 'nominal', preuve: 'Réauthentification ciblée, retour à l’écran quitté.' },
  ],
  indisponibilite: [
    { cle: 'panne', libelle: 'Indisponibilité totale', nature: 'systeme', preuve: 'Aucun délai inventé : « durée inconnue » est écrit.' },
    { cle: 'degrade', libelle: 'Mode dégradé', nature: 'systeme', preuve: 'Ce qui marche encore est listé, sans surpromesse.' },
    { cle: 'maintenance', libelle: 'Maintenance annoncée', nature: 'systeme', preuve: 'Fenêtre annoncée comme prévue, révisable.' },
    { cle: 'retour', libelle: 'Retour du service', nature: 'nominal', preuve: 'Retour constaté, pas annoncé par avance.' },
  ],
  'mandat-enrolement': [
    { cle: 'creation', libelle: 'Création du mandat', nature: 'nominal', preuve: 'Bénéficiaire, portée et échéance explicites.' },
    { cle: 'portee', libelle: 'Portée restreinte', nature: 'limite', preuve: 'Un mandat ne peut pas dépasser les droits de son auteur.' },
    { cle: 'conflit', libelle: 'Auto-mandat', nature: 'erreur', preuve: 'S’octroyer un facteur à soi-même est refusé.' },
    { cle: 'emis', libelle: 'Mandat émis', nature: 'nominal', preuve: 'Émission ≠ enrôlement : la nuance est portée à l’écran.' },
  ],
  'decision-recuperation': [
    { cle: 'file', libelle: 'File d’attente', nature: 'nominal', preuve: 'Tri par ancienneté fictive, aucune priorité inventée.' },
    { cle: 'dossier', libelle: 'Dossier ouvert', nature: 'nominal', preuve: 'Pièces, acteurs et historique lisibles avant décision.' },
    { cle: 'auto-approbation', libelle: 'Auto-approbation', nature: 'erreur', preuve: 'Le demandeur ne peut pas décider : bouton inopérant et expliqué.' },
    { cle: 'approuvee', libelle: 'Décision : approuver', nature: 'nominal', preuve: 'Signature à deux, trace immuable, portée limitée.' },
    { cle: 'refusee', libelle: 'Décision : refuser', nature: 'erreur', preuve: 'Refus motivé obligatoire, notification au demandeur.' },
  ],
  'orchestration-retrait': [
    { cle: 'plan', libelle: 'Plan de retrait', nature: 'nominal', preuve: 'Chaque cible a un état mesuré, non mesuré ou non observable.' },
    { cle: 'execution', libelle: 'Exécution', nature: 'nominal', preuve: 'Progression par cible, jamais une barre globale trompeuse.' },
    { cle: 'non-observable', libelle: 'Cible non observable', nature: 'limite', preuve: 'L’orchestrateur ne déclare pas ce qu’il n’a pas vu.' },
    { cle: 'reprise', libelle: 'Reprise après échec', nature: 'erreur', preuve: 'Rejouer une cible déjà faite est sans effet.' },
    { cle: 'cloture', libelle: 'Clôture', nature: 'nominal', preuve: 'Bilan partiel assumé : ce qui reste incertain est listé.' },
  ],
  'enrolement-facteur': [
    { cle: 'preparation', libelle: 'Préparation', nature: 'nominal', preuve: 'Ce qui va se passer est annoncé avant la fenêtre native.' },
    { cle: 'navigateur', libelle: 'Fenêtre native', nature: 'nominal', preuve: 'Simulation étiquetée : aucune API WebAuthn réelle invoquée.' },
    { cle: 'succes', libelle: 'Facteur vérifié', nature: 'nominal', preuve: 'Succès affiché seulement après vérification côté service.' },
    { cle: 'annule', libelle: 'Enrôlement annulé', nature: 'limite', preuve: 'Annulation propre : aucun facteur fantôme conservé.' },
    { cle: 'echec', libelle: 'Enrôlement échoué', nature: 'erreur', preuve: 'Motif technique traduit, aucun détail exploitable exposé.' },
  ],
};

/** Nombre total d'états réellement catalogués. */
export const NOMBRE_ETATS: number = Object.values(ETATS).reduce((n, liste) => n + liste.length, 0);
