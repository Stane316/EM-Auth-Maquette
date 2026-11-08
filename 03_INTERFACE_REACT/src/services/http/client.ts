/**
 * Client HTTP du BFF EM Auth.
 *
 * Contraintes reprises du backend réel (`app/server.mjs`) :
 *  - session par cookie opaque HttpOnly : on envoie `credentials: 'include'`,
 *    et le JavaScript ne voit jamais le cookie ;
 *  - toute mutation exige l'en-tête `x-csrf-token`, obtenu via `GET /api/csrf` ;
 *  - les erreurs renvoyées par le BFF sont des JSON `{ error }` avec un statut.
 */
import { env } from '../../config/env';
import { MESSAGES_UI } from '../contracts/messages';

export class ErreurApi extends Error {
  readonly code: string;
  readonly statut: number;

  constructor(code: string, texte: string, statut: number) {
    super(texte);
    this.name = 'ErreurApi';
    this.code = code;
    this.statut = statut;
  }
}

let jetonCsrf: string | null = null;

/** Le jeton CSRF est lié à la session : récupéré une fois, puis réutilisé. */
export const chargerJetonCsrf = async (): Promise<string> => {
  if (jetonCsrf) return jetonCsrf;
  const reponse = await fetch(`${env.baseUrl}/api/csrf`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!reponse.ok) throw new ErreurApi('CSRF_INVALIDE', MESSAGES_UI.csrf, reponse.status);
  const corps = (await reponse.json()) as { csrfToken?: string };
  if (!corps.csrfToken) throw new ErreurApi('CSRF_INVALIDE', MESSAGES_UI.csrf, 500);
  jetonCsrf = corps.csrfToken;
  return jetonCsrf;
};

export const oublierJetonCsrf = (): void => {
  jetonCsrf = null;
};

type Options = {
  readonly methode?: 'GET' | 'POST' | 'DELETE';
  readonly corps?: unknown;
  readonly mutation?: boolean;
  /** Redirection attendue (connexion OIDC) : le corps n'est pas lu. */
  readonly redirection?: boolean;
};

export const requete = async <T>(chemin: string, options: Options = {}): Promise<T> => {
  const { methode = 'GET', corps, mutation = false, redirection = false } = options;
  const entetes: Record<string, string> = { Accept: 'application/json' };
  if (corps !== undefined) entetes['Content-Type'] = 'application/json';
  if (mutation) entetes['x-csrf-token'] = await chargerJetonCsrf();

  let reponse: Response;
  try {
    reponse = await fetch(`${env.baseUrl}${chemin}`, {
      method: methode,
      credentials: 'include',
      headers: entetes,
      body: corps === undefined ? undefined : JSON.stringify(corps),
      redirect: redirection ? 'manual' : 'follow',
    });
  } catch {
    throw new ErreurApi('RESEAU', MESSAGES_UI.reseau, 0);
  }

  if (redirection) return undefined as T;
  if (reponse.status === 204) return undefined as T;

  const texte = await reponse.text();
  const corpsReponse: unknown = texte ? JSON.parse(texte) : undefined;

  if (!reponse.ok) {
    const messageBff =
      typeof corpsReponse === 'object' && corpsReponse !== null && 'error' in corpsReponse
        ? String((corpsReponse as { error: unknown }).error)
        : MESSAGES_UI.inconnu;
    const code =
      reponse.status === 401 ? 'SESSION_EXPIREE' : reponse.status === 403 ? 'ACCES_REFUSE' : 'INCONNU';
    throw new ErreurApi(code, messageBff, reponse.status);
  }

  return corpsReponse as T;
};
