/**
 * Catalogue de messages du contrat S05 (`app/fixtures/s05-messages.json`).
 *
 * Règle tenue ici : l'interface n'invente pas ses messages. Elle affiche les
 * codes du contrat et leur texte. Seule la typographie française a été
 * restaurée (accents, ligatures) — le sens et l'ordre des mots sont identiques.
 * Un test vérifie l'égalité stricte hors accents (`tests/messages.test.ts`).
 */
import source from './s05-messages.json';

export type CodeMessage = keyof typeof TEXTES;

const TEXTES = {
  ENROL_OK: 'Facteur enrôlé pour ce compte. Aucune autre identité n’a été modifiée.',
  INVITE_EXPIRED: 'Invitation expirée. Aucun facteur n’a été lié.',
  INVITE_REPLAYED: 'Invitation déjà utilisée. Aucun facteur n’a été lié.',
  INVITE_WRONG_RECIPIENT: 'Cette invitation ne vous est pas destinée. Aucun facteur n’a été lié.',
  ENROL_UV_REQUIRED: 'Vérification de l’utilisateur requise. Aucun facteur n’a été lié.',
  ACTION_ALLOWED: 'Action sensible autorisée : preuve forte et fraîche vérifiée.',
  ORIGIN_MISMATCH: 'Origine non conforme. Action refusée.',
  RPID_MISMATCH: 'Identifiant du service (RP ID) non conforme. Action refusée.',
  CHALLENGE_INVALID: 'Défi invalide, expiré ou déjà utilisé. Action refusée.',
  UV_REQUIRED: 'Vérification de l’utilisateur requise pour cette action. Action refusée.',
  FACTOR_MISSING: 'Aucun facteur compatible. Action sensible refusée. Contactez le support.',
  OTP_INSUFFICIENT: 'Un code à usage unique seul ne suffit pas pour cette action. Action refusée.',
  PROOF_STALE: 'Preuve trop ancienne. Réauthentifiez-vous pour continuer.',
  RECOVERY_OPENED:
    'Dossier de récupération ouvert. En attente de preuve indépendante et d’un approbateur distinct.',
  RECOVERY_PROOF_MISSING: 'Preuve indépendante manquante. Dossier suspendu.',
  RECOVERY_NEW_CONTACT_NOT_PROOF:
    'Un nouveau contact fourni par le demandeur n’est pas une preuve indépendante. Dossier suspendu.',
  RECOVERY_SELF_APPROVAL:
    'Vous avez initié ce dossier : vous ne pouvez pas l’approuver. Un autre approbateur habilité est requis.',
  RECOVERY_APPROVER_NOT_AUTHORIZED:
    'Ce compte n’est pas habilité à approuver une récupération. Approbation refusée.',
  RECOVERY_TARGET_CHANGED:
    'La cible ou le canal a changé. Dossier invalide : nouvelle vérification requise.',
  RECOVERY_APPROVED:
    'Récupération approuvée par un approbateur distinct. Un nouvel enrôlement peut être proposé.',
  RECOVERY_PENDING_APPROVER:
    'Aucun approbateur habilité disponible. Dossier en attente ; action sensible refusée.',
  NOTIFY_SENT: 'Notification fictive consignée dans le journal local.',
  NOTIFY_FAILED: 'Notification impossible. Incident tracé et escalade.',
  CREDENTIAL_RETIRED: 'Ce facteur a été retiré. Authentification refusée.',
  SESSIONS_NOT_REVOKED:
    'Facteur retiré. Les sessions déjà ouvertes ne sont pas révoquées par cette opération (voir S06).',
  SHARED_WORKSTATION_SAFE: 'Session fermée. Aucune donnée du compte précédent n’est accessible.',
  SHARED_WORKSTATION_LEAK: 'Données du compte précédent encore accessibles : échec.',
  ASSISTANCE_SAFE:
    'Assistance sûre proposée. La MFA reste exigée ; aucune bascule vers un code par SMS ou e-mail.',
  RECOVERY_INITIATOR_NOT_AUTHORIZED:
    'Ce compte n’est pas habilité à ouvrir un dossier de récupération. Demande refusée.',
} as const;

/** Texte contractuel brut, conservé pour la vérification automatisée. */
export const SOURCE_CONTRAT: Readonly<Record<string, string>> = source.messages;

export const message = (code: CodeMessage): string => TEXTES[code];

/** Messages propres à l'interface (jamais présentés comme des messages serveur). */
export const MESSAGES_UI = {
  reseau: 'Le service ne répond pas. Vérifiez votre connexion, puis réessayez.',
  csrf: 'Le jeton de sécurité de votre session a expiré. Rechargez la page, puis réessayez.',
  nonSupporte: 'Cette opération n’est pas encore exposée par le BFF : le contrat est défini côté interface.',
  inconnu: 'Une erreur inattendue est survenue. Aucune action n’a été enregistrée.',
  sessionExpiree: 'Votre session a expiré. Reconnectez-vous pour continuer.',
  accesRefuse: 'Votre compte ne dispose pas du rôle requis pour cette opération.',
} as const;
