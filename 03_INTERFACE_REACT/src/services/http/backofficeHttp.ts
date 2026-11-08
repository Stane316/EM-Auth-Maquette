/**
 * Implémentation HTTP du back-office.
 *
 * Aucun de ces contrats n'existe encore côté BFF : le backend réel n'expose que
 * l'authentification et la ressource d'exemple `/api/notes`. Les méthodes
 * renvoient donc `NON_SUPPORTE` avec un message explicite, plutôt que de
 * simuler silencieusement un succès — un faux succès serait un défaut grave.
 *
 * Contrats attendus (à implémenter côté BFF, voir `docs/API_INTEGRATION.md`) :
 *   GET  /api/utilisateurs
 *   POST /api/retraits/mesures        { utilisateurId }
 *   POST /api/retraits/executions     { utilisateurId }  (preuve fraîche exigée)
 *   GET  /api/recuperations
 *   POST /api/recuperations/:ref/decision { decision, motif }
 *   POST /api/mandats                 { beneficiaire, facteur }
 *   POST /api/mandats/:ref/consommation
 *   GET  /api/journal?cible=…
 */
import type {
  DossierDto,
  EvenementDto,
  FacteurDto,
  MandatDto,
  OperationRetraitDto,
  ReponseApi,
  UtilisateurDto,
} from '../contracts/api';
import type { BackofficePort } from '../ports';

const nonSupporte = <T>(chemin: string): Promise<ReponseApi<T>> =>
  Promise.resolve({
    ok: false as const,
    code: 'NON_SUPPORTE',
    message: `Contrat absent du BFF : ${chemin}. Défini côté interface, à implémenter côté serveur.`,
    statut: 501,
  });

export const creerBackofficeHttp = (): BackofficePort => ({
  listerUtilisateurs: () => nonSupporte<readonly UtilisateurDto[]>('GET /api/utilisateurs'),
  mesurerRetrait: () => nonSupporte<OperationRetraitDto>('POST /api/retraits/mesures'),
  executerRetrait: () => nonSupporte<OperationRetraitDto>('POST /api/retraits/executions'),
  listerOperations: () => nonSupporte<readonly OperationRetraitDto[]>('GET /api/retraits'),
  listerDossiers: () => nonSupporte<readonly DossierDto[]>('GET /api/recuperations'),
  deciderRecuperation: () => nonSupporte<DossierDto>('POST /api/recuperations/:ref/decision'),
  emettreMandat: () => nonSupporte<MandatDto>('POST /api/mandats'),
  consommerMandat: () => nonSupporte<FacteurDto>('POST /api/mandats/:ref/consommation'),
  journal: () => nonSupporte<readonly EvenementDto[]>('GET /api/journal'),
});
