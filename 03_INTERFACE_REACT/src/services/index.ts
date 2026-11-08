/**
 * Point d'entrée unique des services.
 *
 * Le reste de l'application n'importe que ce module : changer de mode
 * (`demo` ↔ `http`) ne demande aucune modification d'écran.
 */
import { env } from '../config/env';
import { creerBackendDemo } from './demo/backendDemo';
import { creerAuthHttp } from './http/authHttp';
import { creerBackofficeHttp } from './http/backofficeHttp';
import type { ServicesEmAuth } from './ports';

// Pré-remplissage réservé au test de rendu (`npm run rendu`) : sans session,
// les écrans protégés affichent — à juste titre — leur état « accès refusé ».
const backendDemo = creerBackendDemo({
  sessionInitiale: import.meta.env.VITE_DEMO_SESSION_INITIALE === '1',
});

export const services: ServicesEmAuth =
  env.mode === 'http'
    ? { auth: creerAuthHttp(), backoffice: creerBackofficeHttp(), mode: 'http' }
    : { auth: backendDemo.auth, backoffice: backendDemo.backoffice, mode: 'demo' };

/** Remise à zéro du backend de démonstration (tests et bouton « Réinitialiser »). */
export const reinitialiserDonneesDemo = (): void => {
  if (env.mode === 'demo') backendDemo.reinitialiser();
};

export const estModeDemo = env.mode === 'demo';
