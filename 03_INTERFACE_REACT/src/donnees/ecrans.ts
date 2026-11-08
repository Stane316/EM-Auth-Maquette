/**
 * Registre des écrans de la maquette.
 * Source de vérité unique pour la navigation, le fil d'Ariane, la page
 * « dossier de démonstration » et les compteurs de couverture.
 *
 * Traçabilité : `01_PHASES/PH01_MATRICE_PERIMETRE_ECRANS.md` (identifiants, acteurs,
 * exigences) + décision D-013 (E09 ajouté, arbitrage en attente).
 */

export type StatutArbitrage = 'arbitre' | 'en-attente';

export type Complexite = 'faible' | 'moyenne' | 'elevee';

export type GroupeId = 'acces' | 'recuperation' | 'session' | 'privileges';

export type Ecran = {
  readonly id: string;
  /** Segment d'URL, stable : il est cité dans les rapports de phase. */
  readonly slug: string;
  readonly titre: string;
  readonly resume: string;
  readonly acteur: string;
  readonly exigences: readonly string[];
  readonly proprietaire: string;
  readonly statut: StatutArbitrage;
  readonly groupe: GroupeId;
  readonly complexite: Complexite;
};

export const GROUPES: ReadonlyArray<{
  readonly id: GroupeId;
  readonly titre: string;
  readonly sousTitre: string;
}> = [
  { id: 'acces', titre: 'Accès et preuve', sousTitre: 'Entrer, prouver, être autorisé' },
  { id: 'recuperation', titre: 'Récupération et facteurs', sousTitre: 'Perdre l’accès sans perdre le compte' },
  { id: 'session', titre: 'Session et états limites', sousTitre: 'Ce qui arrive quand ça s’arrête' },
  { id: 'privileges', titre: 'Privilèges et administration', sousTitre: 'Donner, retirer, prouver' },
];

export const ECRANS: readonly Ecran[] = [
  {
    id: 'E01',
    slug: 'invitation',
    titre: 'Invitation et accueil',
    resume: 'Le destinataire d’une invitation découvre le service, vérifie l’expéditeur et décide d’entrer.',
    acteur: 'destinataire invité',
    exigences: ['REQ-13-03', 'REQ-13-04'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : page publique BFF',
    statut: 'arbitre',
    groupe: 'acces',
    complexite: 'moyenne',
  },
  {
    id: 'E02',
    slug: 'identification',
    titre: 'Identification',
    resume: 'Saisie de l’identifiant sans révéler l’existence d’un compte, erreur unique et non indicative.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-06', 'REQ-13-07'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : thème Keycloak',
    statut: 'arbitre',
    groupe: 'acces',
    complexite: 'faible',
  },
  {
    id: 'E03',
    slug: 'moyen-autorise',
    titre: 'Choix du moyen autorisé',
    resume: 'Sélection du second facteur réellement enrôlé, avec l’alternative de secours visible.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-05', 'REQ-13-06'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : thème Keycloak ou page BFF',
    statut: 'arbitre',
    groupe: 'acces',
    complexite: 'moyenne',
  },
  {
    id: 'E04',
    slug: 'preuve-fraiche',
    titre: 'Défi et preuve fraîche',
    resume: 'Exigence d’une preuve récente avant une action sensible ; la fenêtre native est simulée et étiquetée.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-05', 'REQ-13-20'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : fenêtre native + attente',
    statut: 'arbitre',
    groupe: 'acces',
    complexite: 'moyenne',
  },
  {
    id: 'E05',
    slug: 'transition',
    titre: 'Transition vers l’application',
    resume: 'Redirection OIDC : ce que l’utilisateur voit pendant l’échange, et ce qu’il ne doit jamais voir.',
    acteur: 'système + utilisateur',
    exigences: ['REQ-13-16', 'REQ-13-36'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : BFF / redirection',
    statut: 'arbitre',
    groupe: 'session',
    complexite: 'faible',
  },
  {
    id: 'E06',
    slug: 'fin-de-session',
    titre: 'Fin de session',
    resume: 'Déconnexion locale confirmée, sessions distantes non confirmées : la nuance est l’écran.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-19', 'REQ-13-31'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : thème Keycloak / BFF',
    statut: 'arbitre',
    groupe: 'session',
    complexite: 'faible',
  },
  {
    id: 'E07',
    slug: 'perte-ou-aide',
    titre: 'Perte d’accès ou aide',
    resume: 'Point d’entrée unique de la récupération : aucune divulgation, deux voies indépendantes.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-08', 'REQ-13-09', 'REQ-13-30'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : page BFF',
    statut: 'arbitre',
    groupe: 'recuperation',
    complexite: 'moyenne',
  },
  {
    id: 'E08',
    slug: 'suivi-recuperation',
    titre: 'Suivi de récupération',
    resume: 'Dossier de récupération à étapes, délais « à convenir », preuve de séparation des acteurs.',
    acteur: 'utilisateur + support',
    exigences: ['REQ-13-08', 'REQ-13-09'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'arbitre',
    groupe: 'recuperation',
    complexite: 'elevee',
  },
  {
    id: 'E09',
    slug: 'demande-sensible',
    titre: 'Demande sensible',
    resume: 'Formuler une demande à effet irréversible, avec la double validation annoncée avant l’envoi.',
    acteur: 'demandeur / approbateur',
    exigences: ['REQ-13-02', 'REQ-13-15', 'REQ-13-20'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'en-attente',
    groupe: 'privileges',
    complexite: 'elevee',
  },
  {
    id: 'E10',
    slug: 'retrait-par-cible',
    titre: 'Retrait par cible',
    resume: 'Mesurer l’impact d’un retrait avant de l’exécuter : ce qui tombe, pour qui, tout de suite.',
    acteur: 'administrateur / responsable',
    exigences: ['REQ-13-11', 'REQ-13-12', 'REQ-13-13'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'arbitre',
    groupe: 'privileges',
    complexite: 'elevee',
  },
  {
    id: 'E11',
    slug: 'resultat-non-confirme',
    titre: 'Résultat non confirmé',
    resume: 'L’état que la plupart des interfaces ratent : « je ne sais pas » n’est ni un succès ni un échec.',
    acteur: 'tous (transversal)',
    exigences: ['REQ-13-12', 'REQ-13-21'],
    proprietaire: 'Composant partagé BFF/UI',
    statut: 'arbitre',
    groupe: 'session',
    complexite: 'faible',
  },
  {
    id: 'E12',
    slug: 'expiration',
    titre: 'Expiration et inactivité',
    resume: 'Avertissement avant expiration, reprise du travail sans perte, retour arrière possible.',
    acteur: 'utilisateur',
    exigences: ['REQ-13-18', 'REQ-13-20', 'REQ-13-31'],
    proprietaire: 'Composant partagé BFF/UI',
    statut: 'arbitre',
    groupe: 'session',
    complexite: 'faible',
  },
  {
    id: 'E13',
    slug: 'indisponibilite',
    titre: 'Service indisponible',
    resume: 'Panne ou dégradation : dire la vérité, ne pas inventer de délai, proposer une voie de secours.',
    acteur: 'tous (transversal)',
    exigences: ['REQ-13-21', 'REQ-13-28'],
    proprietaire: 'Composant partagé (proxy/BFF)',
    statut: 'arbitre',
    groupe: 'session',
    complexite: 'faible',
  },
  {
    id: 'A02',
    slug: 'mandat-enrolement',
    titre: 'Identité et mandat d’enrôlement',
    resume: 'Qui autorise l’enrôlement d’un facteur, pour qui, jusqu’à quand, et avec quelle trace.',
    acteur: 'gestionnaire d’accès',
    exigences: ['REQ-13-02', 'REQ-13-03', 'REQ-13-04'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'arbitre',
    groupe: 'recuperation',
    complexite: 'elevee',
  },
  {
    id: 'A03',
    slug: 'decision-recuperation',
    titre: 'Décision de récupération',
    resume: 'Deux acteurs distincts, deux regards, une décision tracée — et l’impossibilité d’auto-approuver.',
    acteur: 'support + 2ᵉ acteur',
    exigences: ['REQ-13-08', 'REQ-13-09'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'arbitre',
    groupe: 'recuperation',
    complexite: 'elevee',
  },
  {
    id: 'A04',
    slug: 'orchestration-retrait',
    titre: 'Orchestration du retrait',
    resume: 'Séquence de retrait mesurée par cible : chaque cible est vérifiée, aucune n’est présumée.',
    acteur: 'responsable / administrateur',
    exigences: ['REQ-13-11', 'REQ-13-12', 'REQ-13-13'],
    proprietaire: 'Interface EM Auth (démonstration)',
    statut: 'arbitre',
    groupe: 'privileges',
    complexite: 'elevee',
  },
  {
    id: 'A08',
    slug: 'enrolement-facteur',
    titre: 'Enrôlement du facteur',
    resume: 'Préparer l’enrôlement, expliquer la fenêtre native, ne jamais annoncer un succès non vérifié.',
    acteur: 'utilisateur + opérateur',
    exigences: ['REQ-13-04', 'REQ-13-05'],
    proprietaire: 'Interface EM Auth (démonstration) — cible : dialogue natif + page',
    statut: 'arbitre',
    groupe: 'recuperation',
    complexite: 'moyenne',
  },
];

import type { EtatEcran } from './etats';
import { ETATS } from './etats';

/** États d'un écran — dérivés du catalogue unique `donnees/etats.ts`. */
export const etatsDe = (slug: string): readonly EtatEcran[] => ETATS[slug] ?? [];

export const ecranParSlug = (slug: string | undefined): Ecran | undefined =>
  ECRANS.find((e) => e.slug === slug);

export const ecransDuGroupe = (groupe: GroupeId): readonly Ecran[] =>
  ECRANS.filter((e) => e.groupe === groupe);

/** Ensemble des exigences V3 couvertes, dédupliqué et trié. */
export const exigencesCouvertes: readonly string[] = [...new Set(ECRANS.flatMap((e) => e.exigences))].sort(
  (a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')),
);
