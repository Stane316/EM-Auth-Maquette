# Intégration du BFF — contrat attendu côté interface

Ce document décrit **ce que l'interface appelle**, ce que le BFF expose
aujourd'hui, et ce qu'il reste à ajouter. Il distingue systématiquement :

- **[EXISTE]** — route présente dans `app/server.mjs` du projet EM-Auth ;
- **[À CRÉER]** — contrat défini côté interface, non implémenté côté serveur ;
  l'interface répond `NON_SUPPORTE` (401/501) et **n'invente pas** de succès.

## 1. Mode `http` — comment le choisir

```bash
cp .env.example .env
# dans .env
VITE_API_MODE=http
VITE_API_BASE_URL=http://localhost:3000
```

`services/index.ts` sélectionne alors `authHttp` + `backofficeHttp`. Aucun écran
ne change.

## 2. Authentification

| Méthode | Route | État | Notes |
|---|---|---|---|
| `redirigerVersConnexion()` | `GET /auth/login` | **[EXISTE]** | Redirection OIDC (code + PKCE, `state`, `nonce`). L'interface ne collecte aucun mot de passe. |
| `sessionCourante()` | `GET /api/session` | **[À CRÉER]** | Retourne `SessionDto`. Aujourd'hui, la réponse 404 est interprétée comme « non authentifié ». Le BFF actuel rend une page HTML : une SPA ne peut pas la lire. |
| `verifierFacteur()` | — | **[À CRÉER]** | La cérémonie WebAuthn est portée par le BFF. L'interface renvoie `NON_SUPPORTE` avec la base configurée. |
| `produirePreuveFraiche()` | `GET /api/session` | **[À CRÉER]** | Même contrat que `sessionCourante`, avec contrôle de fraîcheur (`freshness.windowMs`). |
| `deconnexion()` | `POST /auth/logout` | **[EXISTE]** | En-tête `x-csrf-token` exigé. Le BFF accepte aussi le champ de formulaire. |
| — | `GET /api/csrf` | **[EXISTE]** | `{ csrfToken }` ; 401 si non authentifié. |

Message affiché en cas d'échec de déconnexion partielle : `SESSIONS_NOT_REVOKED`
(texte contractuel, jamais reformulé).

## 3. Back-office

Aucune de ces routes n'existe. L'interface les déclare, les nomme et refuse de
simuler un succès.

| Méthode du port | Route proposée | Réponse attendue |
|---|---|---|
| `listerUtilisateurs()` | `GET /api/utilisateurs` | `UtilisateurDto[]` |
| `mesurerRetrait(id)` | `POST /api/retraits/mesures` | `OperationRetraitDto` (cibles à l'état `mesure`) |
| `executerRetrait(id)` | `POST /api/retraits/executions` | `OperationRetraitDto` ; **preuve fraîche exigée** ; 403 sinon |
| `listerOperations()` | `GET /api/retraits` | `OperationRetraitDto[]` |
| `listerDossiers()` | `GET /api/recuperations` | `DossierDto[]` |
| `deciderRecuperation(ref, decision, motif)` | `POST /api/recuperations/:ref/decision` | `DossierDto` ; refus si demandeur = décideur |
| `emettreMandat(beneficiaire, facteur)` | `POST /api/mandats` | `MandatDto` |
| `consommerMandat(ref)` | `POST /api/mandats/:ref/consommation` | `FacteurDto` ; usage unique |
| `journal(cible?)` | `GET /api/journal?cible=…` | `EvenementDto[]` |

### 3.1 Enveloppe de réponse

Toutes les méthodes du port renvoient `ReponseApi<T>` :

```ts
type ReponseApi<T> =
  | { ok: true; donnees: T; message?: string }
  | { ok: false; code: string; message: string; statut: number };
```

Le client HTTP convertit les statuts du BFF : `401 → SESSION_EXPIREE`,
`403 → ACCES_REFUSE`, échec réseau → `RESEAU` (statut 0), CSRF absent →
`CSRF_INVALIDE`.

## 4. Règles serveur que l'interface ne réimplémente pas

| Règle | Où elle vit | Ce que fait l'interface |
|---|---|---|
| Session opaque, cookie `HttpOnly`, `SameSite=lax` | `app/lib/session.mjs` | `credentials: 'include'` ; ne lit jamais le cookie |
| Rotation d'identifiant à l'authentification | `app/lib/session.mjs` | Rien |
| CSRF lié à la session, comparaison à temps constant | `app/lib/csrf.mjs` | Récupère le jeton, l'envoie en en-tête sur toute mutation |
| Autorisation par rôle et par ressource | `app/lib/authz.mjs` | Masque une action qui échouerait — et le dit |
| Défi WebAuthn 32 octets, TTL 120 s, usage unique | `app/lib/mfa/` | Affiche le résultat, jamais la cérémonie |

## 5. Ce qui reste faux, et qui est signalé comme tel

- Le mode `demo` **n'authentifie personne** : il compare des identifiants à un
  jeu de quatre comptes fictifs, sans secret. Aucune affirmation de sécurité ne
  doit en être tirée.
- Les durées de session, la latence et les références de dossier sont fictives
  et marquées « démonstration » à l'écran.
- `NON_SUPPORTE` est un **état normal** du prototype : il montre où le contrat
  s'arrête, il ne masque pas un manque.
