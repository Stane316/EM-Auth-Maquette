/**
 * Implémentation HTTP de l'authentification, alignée sur le BFF réel.
 *
 * Ce que le BFF expose aujourd'hui (`app/server.mjs`) :
 *   GET  /auth/login   → redirection OIDC (Code + PKCE, state, nonce)
 *   GET  /auth/callback→ session serveur opaque + cookie HttpOnly
 *   POST /auth/logout  → invalide la session (en-tête x-csrf-token exigé)
 *   GET  /api/csrf     → { csrfToken }
 *
 * Ce qu'il n'expose pas encore, et que cette couche déclare explicitement :
 *   GET  /api/session  → état de session en JSON (nécessaire à une SPA)
 * Tant qu'il manque, `sessionCourante()` renvoie « non authentifié » et
 * `contratPartiel` est vrai : l'interface ne prétend pas connaître la session.
 */
import { env } from '../../config/env';
import type { DossierDto, ReponseApi, SessionDto } from '../contracts/api';
import { MESSAGES_UI } from '../contracts/messages';
import type { AuthPort, ResultatDeconnexion, ResultatIdentification } from '../ports';
import { ErreurApi, oublierJetonCsrf, requete } from './client';

const traduire = <T>(erreur: unknown): ReponseApi<T> => {
  if (erreur instanceof ErreurApi) {
    return { ok: false, code: erreur.code, message: erreur.message, statut: erreur.statut };
  }
  return { ok: false, code: 'INCONNU', message: MESSAGES_UI.inconnu, statut: 0 };
};

export const creerAuthHttp = (): AuthPort & { contratPartiel: boolean } => ({
  strategie: 'redirection-oidc',

  async redirigerVersConnexion() {
    window.location.assign(`${env.baseUrl}/auth/login`);
  },

  async sessionCourante() {
    try {
      const session = await requete<SessionDto>('/api/session');
      return { ok: true, donnees: session };
    } catch (erreur) {
      if (erreur instanceof ErreurApi && (erreur.statut === 404 || erreur.statut === 401)) {
        return { ok: true, donnees: { authentifie: false } };
      }
      return traduire(erreur);
    }
  },

  async identifier(identifiant) {
    // En mode BFF, l'identifiant est saisi par Keycloak : l'interface ne le
    // collecte pas. On renvoie donc un résultat neutre et on redirige.
    return { ok: true, donnees: { identifiant, facteurs: [] } satisfies ResultatIdentification };
  },

  async verifierFacteur() {
    return {
      ok: false,
      code: 'NON_SUPPORTE',
      message: `La cérémonie WebAuthn est portée par le BFF (${env.baseUrl || 'même origine'}).`,
      statut: 501,
    };
  },

  async produirePreuveFraiche() {
    try {
      const session = await requete<SessionDto>('/api/session');
      return { ok: true, donnees: session };
    } catch (erreur) {
      return traduire(erreur);
    }
  },

  async deconnexion() {
    try {
      await requete('/auth/logout', { methode: 'POST', mutation: true });
      oublierJetonCsrf();
      const resultat: ResultatDeconnexion = {
        locale: true,
        distante: 'non-confirme',
        message: MESSAGES_UI.sessionExpiree,
      };
      return { ok: true, donnees: resultat };
    } catch (erreur) {
      return traduire(erreur);
    }
  },

  async ouvrirRecuperation() {
    return {
      ok: false,
      code: 'NON_SUPPORTE',
      message: 'Aucun contrat de récupération n’est exposé par le BFF à ce jour.',
      statut: 501,
    };
  },

  async suivreRecuperation() {
    const vide: ReponseApi<DossierDto> = {
      ok: false,
      code: 'NON_SUPPORTE',
      message: 'Aucun contrat de suivi de récupération n’est exposé par le BFF à ce jour.',
      statut: 501,
    };
    return vide;
  },

  contratPartiel: true,
});
