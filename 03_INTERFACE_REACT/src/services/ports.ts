/**
 * Ports (interfaces) exposés aux écrans.
 *
 * Deux implémentations existent :
 *  - `demo` : moteur en mémoire, aucune dépendance, utilisé pour la démonstration ;
 *  - `http` : client du BFF réel (`app/`), qui n'expose aujourd'hui que
 *    `/auth/*`, `/api/csrf` et `/api/notes`.
 *
 * Les écrans ne dépendent que de ces interfaces : brancher le BFF complet ne
 * demande aucune modification de composant.
 */
import type {
  DossierDto,
  FacteurDto,
  MandatDto,
  OperationRetraitDto,
  ReponseApi,
  SessionDto,
  UtilisateurDto,
  EvenementDto,
} from './contracts/api';

export type ResultatIdentification = {
  readonly identifiant: string;
  readonly facteurs: readonly FacteurDto[];
};

export type ResultatDeconnexion = {
  /** La fermeture locale est certaine : elle est faite par le navigateur + le BFF. */
  readonly locale: true;
  /** La révocation des autres sessions n'est jamais présumée. */
  readonly distante: 'non-confirme';
  readonly message: string;
};

export type StrategieConnexion = 'identifiant-interne' | 'redirection-oidc';

export interface AuthPort {
  /**
   * `identifiant-interne` : l'identification se fait dans l'application (mode
   * démonstration). `redirection-oidc` : le BFF redirige vers Keycloak — dans ce
   * cas l'interface ne collecte jamais de mot de passe.
   */
  readonly strategie: StrategieConnexion;
  /** Redirige vers le BFF (GET /auth/login). Sans effet en mode démonstration. */
  redirigerVersConnexion(): Promise<void>;
  sessionCourante(): Promise<ReponseApi<SessionDto>>;
  /** Étape 1 : identifiant seul. Aucun mot de passe n'est collecté par l'interface. */
  identifier(identifiant: string): Promise<ReponseApi<ResultatIdentification>>;
  /** Étape 2 : preuve du second facteur (cérémonie WebAuthn côté navigateur en réel). */
  verifierFacteur(facteurId: string): Promise<ReponseApi<SessionDto>>;
  /** Preuve fraîche exigée pour une action sensible (politique S05). */
  produirePreuveFraiche(): Promise<ReponseApi<SessionDto>>;
  deconnexion(): Promise<ReponseApi<ResultatDeconnexion>>;
  ouvrirRecuperation(identifiant: string): Promise<ReponseApi<{ reference: string }>>;
  suivreRecuperation(reference: string): Promise<ReponseApi<DossierDto>>;
}

export interface BackofficePort {
  listerUtilisateurs(): Promise<ReponseApi<readonly UtilisateurDto[]>>;
  mesurerRetrait(utilisateurId: string): Promise<ReponseApi<OperationRetraitDto>>;
  executerRetrait(utilisateurId: string): Promise<ReponseApi<OperationRetraitDto>>;
  listerOperations(): Promise<ReponseApi<readonly OperationRetraitDto[]>>;
  listerDossiers(): Promise<ReponseApi<readonly DossierDto[]>>;
  deciderRecuperation(
    reference: string,
    decision: 'approuver' | 'refuser',
    motif?: string,
  ): Promise<ReponseApi<DossierDto>>;
  emettreMandat(beneficiaire: string, facteur: string): Promise<ReponseApi<MandatDto>>;
  consommerMandat(reference: string): Promise<ReponseApi<FacteurDto>>;
  journal(reference?: string): Promise<ReponseApi<readonly EvenementDto[]>>;
  /** Réservé au mode démonstration : change le profil simulé (rôles). */
  changerProfil?(profil: string): Promise<ReponseApi<SessionDto>>;
}

export interface ServicesEmAuth {
  readonly auth: AuthPort;
  readonly backoffice: BackofficePort;
  readonly mode: 'demo' | 'http';
}
