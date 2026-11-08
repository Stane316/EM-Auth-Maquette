/**
 * Politique S05, lue depuis le contrat du projet (`app/fixtures/s05-policy.json`).
 *
 * Les valeurs affichées dans l'interface (fenêtre de preuve fraîche, exigence
 * de vérification de l'utilisateur, actions sensibles) viennent d'ici — pas
 * d'un chiffre inventé dans un composant.
 */
import brut from './s05-policy.json';

export const POLITIQUE = {
  fraicheurMs: brut.freshness.windowMs,
  fraicheurMinutes: Math.round(brut.freshness.windowMs / 60_000),
  defiTtlMs: brut.webauthn.challengeTtlMs,
  actionsSensibles: brut.sensitiveActions as readonly string[],
  verificationUtilisateur: brut.webauthn.userVerification,
  recuperation: brut.recovery,
  reauthCritique: brut.criticalAlwaysReauth as readonly string[],
  // Le contrat dit `otpAloneSufficientForSensitive: false` : un code seul ne
  // suffit donc pas. On expose la conséquence, pour éviter la double négation.
  otpSeulInsuffisant: brut.otpAloneSufficientForSensitive === false,
  profils: brut.profiles as Readonly<Record<string, string>>,
} as const;

/** Une preuve obtenue à `instant` est-elle encore fraîche ? */
export const preuveEstFraiche = (instant: number, maintenant: number = Date.now()): boolean =>
  maintenant - instant < POLITIQUE.fraicheurMs;
