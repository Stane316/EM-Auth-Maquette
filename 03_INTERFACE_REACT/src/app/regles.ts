/**
 * Rôles exigés par écran — garde d'**interface** uniquement.
 *
 * Le BFF applique l'autorisation réelle à chaque requête (`app/lib/authz.mjs`).
 * Ce tableau sert à ne pas proposer une action qui échouerait de toute façon,
 * et à rendre l'état « accès refusé » démontrable.
 */
import type { Role } from '../services/contracts/api';

const TOUS_LES_ROLES: readonly Role[] = ['reader', 'writer', 'support', 'gestionnaire', 'responsable'];
const GESTION: readonly Role[] = ['gestionnaire', 'responsable'];

export const ROLES_ECRANS: Readonly<Record<string, readonly Role[]>> = {
  // Parcours d'authentification : aucun rôle requis, l'utilisateur n'est pas encore connecté.
  invitation: [],
  identification: [],
  'moyen-autorise': [],
  'preuve-fraiche': [],
  transition: [],
  'fin-de-session': [],
  'perte-ou-aide': [],
  'suivi-recuperation': [],
  expiration: [],
  indisponibilite: [],

  // Espace authentifié.
  'demande-sensible': TOUS_LES_ROLES,
  'resultat-non-confirme': TOUS_LES_ROLES,

  // Espace d'administration : rôles de gestion.
  'retrait-par-cible': GESTION,
  'orchestration-retrait': GESTION,
  'decision-recuperation': GESTION,
  'enrolement-facteur': GESTION,
  'mandat-enrolement': GESTION,
};

export const rolesRequis = (slug: string): readonly Role[] => ROLES_ECRANS[slug] ?? TOUS_LES_ROLES;
