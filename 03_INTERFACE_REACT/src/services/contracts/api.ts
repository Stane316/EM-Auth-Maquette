/**
 * Contrats d'échange avec le BFF EM Auth.
 *
 * Ces types sont la seule surface que les écrans connaissent. Le mode `demo`
 * et le mode `http` les implémentent tous les deux, ce qui permet de brancher
 * le backend réel sans toucher un seul composant.
 *
 * Référence : `app/server.mjs` (sessions opaques, CSRF, /auth/*, /api/notes),
 * `app/lib/session.mjs`, `app/lib/csrf.mjs`, `app/lib/authz.mjs`.
 */

export type Role = 'reader' | 'writer' | 'support' | 'gestionnaire' | 'responsable';

export type UtilisateurDto = {
  readonly id: string;
  readonly nom: string;
  readonly identifiant: string;
  readonly roles: readonly Role[];
};

export type SessionDto = {
  readonly authentifie: boolean;
  readonly utilisateur?: UtilisateurDto;
  /** ISO 8601. Absent si non authentifié. */
  readonly expireA?: string;
  /** ISO 8601. Présent seulement si une preuve fraîche est encore valable. */
  readonly preuveFraicheJusqua?: string;
  /** Niveau de preuve atteint, dans le vocabulaire de la politique S05. */
  readonly niveauPreuve?: 'aucun' | 'double' | 'fort';
};

export type FacteurDto = {
  readonly id: string;
  readonly libelle: string;
  readonly type: 'cle' | 'telephone';
  readonly etat: 'verifie' | 'a-verifier' | 'revoque';
  readonly enrole: string;
  readonly dernierUsage: string;
};

export type EtapeDossierDto = {
  readonly titre: string;
  readonly detail: string;
  readonly etat: 'fait' | 'en-cours' | 'a-venir' | 'bloque';
  readonly echeance: string;
};

export type StatutDossier = 'en-attente' | 'preuve-manquante' | 'approuve' | 'refuse' | 'expire';

export type DossierDto = {
  readonly reference: string;
  readonly statut: StatutDossier;
  readonly demandeur: string;
  readonly cible: string;
  readonly motif: string;
  readonly creeLe: string;
  readonly etapes: readonly EtapeDossierDto[];
  readonly decideur?: string;
  readonly motifRefus?: string;
};

export type EtatCible = 'mesure' | 'a-mesurer' | 'non-observable' | 'effectue' | 'echec';

export type CibleRetraitDto = {
  readonly id: string;
  readonly nom: string;
  readonly portee: string;
  readonly impact: number;
  readonly unite: string;
  readonly etat: EtatCible;
  readonly detail: string;
};

export type OperationRetraitDto = {
  readonly reference: string;
  readonly utilisateurId: string;
  readonly utilisateurNom: string;
  readonly statut: 'planifiee' | 'en-cours' | 'partielle' | 'terminee';
  readonly cibles: readonly CibleRetraitDto[];
  readonly demarreeLe?: string;
};

export type MandatDto = {
  readonly reference: string;
  readonly beneficiaire: string;
  readonly facteur: string;
  readonly emisLe: string;
  readonly expireLe: string;
  readonly consomme: boolean;
};

export type ResultatEvenement = 'succes' | 'echec' | 'non-confirme' | 'refus';

export type EvenementDto = {
  readonly horodatage: string;
  readonly acteur: string;
  readonly action: string;
  readonly cible: string;
  readonly resultat: ResultatEvenement;
  readonly correlation: string;
  readonly source: string;
};

/** Enveloppe uniforme : le code renvoie au catalogue de messages du projet. */
export type ReponseApi<T> =
  | { readonly ok: true; readonly donnees: T; readonly message?: string }
  | { readonly ok: false; readonly code: string; readonly message: string; readonly statut: number };

export type CodeErreurTechnique = 'RESEAU' | 'CSRF_INVALIDE' | 'NON_SUPPORTE' | 'INCONNU';
