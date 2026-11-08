/**
 * Configuration d'exécution, lue une seule fois et validée.
 *
 * Aucune valeur secrète ici : tout ce qui est préfixé `VITE_` finit dans le
 * bundle et est donc public par construction. Les secrets restent côté BFF.
 */

export type ModeApi = 'demo' | 'http';

const nombre = (valeur: string | undefined, defaut: number): number => {
  const converti = Number(valeur);
  return Number.isFinite(converti) && converti > 0 ? converti : defaut;
};

const modeBrut = import.meta.env.VITE_API_MODE;
const mode: ModeApi = modeBrut === 'http' ? 'http' : 'demo';

export const env = {
  /** `demo` : backend simulé en mémoire. `http` : BFF réel (`app/`). */
  mode,
  /** Base des appels HTTP. Vide = même origine (le BFF sert l'application). */
  baseUrl: (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, ''),
  /** Latence simulée du backend de démonstration, pour éprouver les états d'attente. */
  latenceDemo: nombre(import.meta.env.VITE_DEMO_LATENCE_MS, 320),
  /** Durée de vie d'une session de démonstration. */
  dureeSessionMin: nombre(import.meta.env.VITE_SESSION_DUREE_MIN, 20),
  /** Fenêtre de preuve fraîche — alignée sur la politique S05 (`freshness.windowMs`). */
  preuveFraicheMin: nombre(import.meta.env.VITE_PREUVE_FRAICHE_MIN, 5),
  /** Intervalle de contrôle de la session (expiration, E12). */
  intervalleSessionMs: nombre(import.meta.env.VITE_SESSION_POLL_MS, 15_000),
} as const;

export const estDemo = env.mode === 'demo';
