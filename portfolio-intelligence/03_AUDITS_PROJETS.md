# 03 — Audits des projets

Chaque audit sépare ce qui est livré, partiel, prévu et non vérifié.
Les chiffres viennent de `git`, de l'API GitHub et du rejeu des tests le 2026-11-14.

---

## 1. HP Collection — `GROW-TECH-251/perscadors`

**Nature :** boutique en ligne de streetwear pour un client réel (Honoré Pescador), réalisée au sein de l'agence étudiante GROW TECH.
**Statut :** catégorie 2, projet client. Tu n'es pas propriétaire du produit.
**Site :** https://perscadors.vercel.app (non ouvert depuis l'audit, réseau limité).

### Identification

| Élément | Valeur |
|---|---|
| Période | 2026-05-18 → 2026-11-08 |
| Langages | TypeScript (≈ 23 800 lignes dans `src/`), SQL (1 684 lignes) |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, Recharts |
| Backend | Route handlers Next.js, Supabase (Auth, PostgreSQL, RLS, Realtime, Storage) |
| Services tiers | Cloudinary, Upstash Redis, Cloudflare Turnstile, WhatsApp |
| Qualité | Vitest, Playwright, ESLint, GitHub Actions, CodeQL, gitleaks, Dependabot |
| Déploiement | Vercel (déploiements enregistrés par `vercel[bot]` dans GitHub) |

### Contribution

| Auteur | Commits | Lignes ajoutées (hors médias et lockfile) |
|---|---|---|
| Toi (`Stane`, `Stane-Junior ANIAMBOSSOU`) | 449 | 62 980 |
| `landrongodo-tech` (L-androïde) | 13 | 4 748 |
| Huriel (`GeovanioH`) | 2 | 138 |

- `git blame` sur le code actuel (`src`, `supabase`, `tests`) : 31 990 lignes à ton nom sur 33 152, soit 96 %.
- 60 jours d'activité distincts, avec un pic en juillet (149 commits).
- 108 commits de merge ; les PR #3, #4 et #5 sont de toi ; les releases `develop → main` sont fusionnées par toi.
- Le premier commit (vitrine statique : pages produit, catégories, panier) est de L-androïde. Tu as construit par-dessus l'infrastructure Supabase, l'administration, le tunnel de commande, la sécurité et les tests.

Le titre « Tech Lead » n'est écrit nulle part dans le dépôt. Il est cohérent avec l'historique : tu portes l'architecture, les merges, la CI et la sécurité.

### Ce qui est implémenté (lu dans le code)

- **Tunnel de commande** — `src/app/api/checkout/route.ts` : double limitation de débit, validation du payload, vérification Turnstile, insertion avec clé d'idempotence (le doublon SQL `23505` est traité comme un succès), journal d'événements de sécurité.
- **Connexion administrateur** — `src/app/api/auth/admin-login/route.ts` : limitation à 5 essais par 15 minutes, Turnstile avec message par cause d'échec, session par cookies Supabase SSR, contrôle du rôle dans `profiles`.
- **Limitation de débit** — `src/lib/rateLimit.ts` : fenêtre glissante Upstash, six périmètres, refus par défaut en production si Redis est indisponible.
- **Base de données** — 32 migrations : 32 policies RLS, 15 fonctions dont 9 `security definer`, 5 triggers, contraintes `CHECK` sur du JSONB, publication Realtime.
- **Administration** — une quinzaine d'écrans sous `src/app/admin/` : produits, catégories, commandes, clients, stock, médias, contenu, réglages, analytics, looks composés.
- **Analytics** — `src/services/analyticsService.ts` : chiffre d'affaires mensuel, panier moyen, revenu sur 30 jours, rétention, via trois RPC PostgreSQL avec repli sur calcul local.
- **Médias** — upload signé Cloudinary avec liste blanche de dossiers, vidéos produit.
- **En-têtes de sécurité** — `next.config.ts` : CSP, HSTS, `X-Frame-Options`, `noindex` sur `/admin`.
- **Tests** — 467 tests unitaires et de sécurité réussis ; 64 tests Playwright répartis dans 10 fichiers.
- **CI** — `.github/workflows/ci-security.yml` : lint, build de production, `npm audit` sur les dépendances de production, scan de secrets.

### Limites

- Le scan de secrets est non bloquant (`continue-on-error`), faute de licence gitleaks pour l'organisation.
- `trackEvent` existe mais n'est branché nulle part ; le suivi d'événements client n'est pas actif.
- Le `README.md` est encore celui généré par `create-next-app`.
- `AGENTS.md` et `CLAUDE.md` sont présents : le développement s'est fait avec des assistants IA.

---

## 2. DabaPulse — `Stane316/daba-pulse`

**Nature :** MVP de hackathon (Startup FairPlay, mission « Branding & Growth »), cas d'étude DABA SAS (aviculture).
**Statut :** catégorie 3, projet collectif. Rôle : Engineering Lead (« Engineering / Strategy » dans le README).

### Identification

| Élément | Valeur |
|---|---|
| Période | 2026-08-04 → 2026-08-20 |
| Backend | Python, FastAPI, pandas, NumPy, Pydantic, SQLite |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Recharts |
| Qualité | pytest (43 tests), Ruff, oxlint, pip-audit, GitHub Actions |
| Déploiement | Netlify (front) et Render (API), d'après le README — non vérifié |

### Contribution

- 58 commits humains, tous de toi ; 9 PR ouvertes et fusionnées par toi.
- Le travail de deux coéquipiers (pôles IA et Produit) a été versé par toi dans deux branches séparées (`ai-automation/mvp-integration`, `product/mvp-integration`), **non fusionnées dans `main`**. Ce code n'est pas le tien et n'entre pas dans le produit livré.
- Le générateur de données de `main` s'inspire de celui du pôle Produit (c'est écrit dans son en-tête).
- Les documents de reprise du dépôt montrent un développement mené avec des agents IA.

### Ce qui est implémenté

- **Estimation de la demande** — `backend/app/engines/analytics.py` : moyenne des ventes sur 7 jours × facteur de tendance (borné entre 0,7 et 1,5) × horizon.
- **Revenu à risque** — `backend/app/engines/risk_engine.py` : `déficit × prix unitaire` pour les ruptures ; 15 % du surstock valorisé ; formule de réputation `visiteurs × conversion × prix × facteur`. Chaque situation porte une sévérité, un niveau de confiance, ses facteurs explicatifs et ses hypothèses.
- **Moteur de décision et simulateur** — `decision_engine.py`, `simulator.py` : recommandation de réallocation, puis comparaison avant/après (stock, déficit, revenu à risque, couverture).
- **Couche IA** — `ai_layer.py` : classification d'intention par règles (7 intentions), réponse en quatre blocs (faits, hypothèses, interprétation, incertitude), appel LLM optionnel par API compatible OpenAI, repli déterministe si le LLM est absent. Le prompt interdit d'inventer des chiffres.
- **API** — 18 routes : situations, décisions, simulation, explication, import CSV, export.
- **Données** — `scripts/generate_synthetic_data.py` : 5 boutiques × 16 produits × 84 jours = 6 720 lignes, graine fixe, sortie CSV et SQLite.
- **Interface** — six écrans (situation, investigation, décision, simulation, explication, horizon).

### Limites — à ne jamais masquer

- **Aucun modèle de machine learning n'est entraîné.** Le moteur est déterministe et fondé sur des règles.
- **Les données sont synthétiques.** Le code l'affiche lui-même (`donnees_synthetiques=True`).
- Le résultat du hackathon (classement, prix) n'est documenté nulle part.
- La vision « Business Twin / Growth Decision OS » est une feuille de route, pas une fonctionnalité.

---

## 3. Déo Gracias Wi-Fi — `Stane316/deo-gracias-wifi-system`

**Nature :** plateforme d'achat de tickets Wi-Fi par Mobile Money pour une zone Wi-Fi existante (routeur MikroTik).
**Statut :** catégorie 1. Initiative personnelle pour un proche qui gère la zone Wi-Fi : besoin réel, sans relation commerciale (confirmé par toi). Travail en solo. Ne pas écrire « client ».

### Identification

| Élément | Valeur |
|---|---|
| Période | 2026-09-16 → 2026-09-26 (11 jours actifs) |
| Architecture | Monorepo npm workspaces : `backend`, `frontend`, `connector`, `shared` |
| Backend | Fastify, zod, PostgreSQL (Supabase), TypeScript strict |
| Frontend | React, Vite, Playwright |
| Volume | ≈ 21 000 lignes TypeScript, 1 616 lignes SQL, 16 migrations avec leurs rollbacks |

### Ce qui est implémenté

- **Paiement** — `apps/backend/src/fedapay.ts` : initialisation de transaction FedaPay, vérification de signature de webhook (HMAC-SHA256, comparaison à temps constant, rejet après 300 secondes), idempotence par identifiant d'événement.
- **Machines d'états** — `packages/shared/src/states.ts` et migration `0009_state_guards.sql` : commandes, paiements, tickets, synchronisation ; toute transition non déclarée est refusée par trigger ; un test garantit la parité entre TypeScript et SQL.
- **Tickets** — allocation atomique, coffre chiffré des codes, import de lots idempotent.
- **Connecteur** — client du protocole RouterOS écrit sans dépendance, réconciliation en lecture seule.
- **Administration** — commandes, tickets, incidents, santé du système.
- **Tests** — 321 réussis ; 58 ignorés car ils exigent PostgreSQL.

### Limites

- **Pas en production.** La décision `DECISION-2026-09-25-IMP-28-FREEZE.md` le dit : code complet, intégrations externes différées.
- Aucun paiement réel, aucun test FedaPay en conditions réelles, connecteur jamais installé sur site.
- 21 000 lignes en 11 jours : le rythme indique une forte assistance IA.
- La dernière exécution de CI (2026-11-01) est en échec.

---

## 4. EM Auth — `Stane316/EM-Auth` et `Stane316/EM-Auth-Maquette`

**Nature :** plateforme d'authentification forte et de gestion des accès, cadrée par un cahier des charges approuvé par un directeur.
**Statut :** catégorie 2, projet mandaté. Tu es le « porteur » ; le directeur est le commanditaire.
**Correspondance avec « PM Authentication » :** confirmée par toi le 2026-11-14. Le fichier CI mentionne que le dépôt était privé ; il est public aujourd'hui.

### Identification

| Élément | Valeur |
|---|---|
| Période | 2026-11-03 → 2026-11-14 (en cours) |
| Contenu | 328 documents Markdown, ≈ 4 100 lignes JavaScript |
| Stack du laboratoire | Node.js, Express 5, `openid-client`, `@simplewebauthn`, Keycloak 26, PostgreSQL 18, Docker Compose |

### Contribution

- 99 commits : 60 signés `Stane316` (agent IA, branche `arena/b6e9d1a0-em-auth`), 39 signés `Stane` (merges et ajouts locaux).
- Ton travail visible : cadrage, directives, arbitrage des décisions, exécution du banc Docker et des tests sur ton poste, renvoi des preuves, intégration dans `develop`.
- **Le code du laboratoire a été écrit par l'agent.** Il ne prouve pas ta capacité à l'écrire seul.

### Ce qui est implémenté

- **BFF OIDC** — `app/lib/oidc.mjs`, `app/server.mjs` : flux Authorization Code avec PKCE S256, `state` et `nonce` à usage unique, validation des claims.
- **Session** — `app/lib/session.mjs` : cookie opaque `HttpOnly`, rotation de l'identifiant à la connexion, aucun jeton côté navigateur.
- **CSRF et autorisation** — `csrf.mjs`, `authz.mjs` : contrôle par rôle à chaque requête, refus par défaut.
- **MFA** — `app/lib/mfa/` : enrôlement, cérémonie WebAuthn, action sensible, récupération, cycle de vie.
- **Banc** — `bench/compose.yaml` : Keycloak et PostgreSQL épinglés par digest, liés à `127.0.0.1`.
- **Tests** — 65 réussis, 8 ignorés (intégration Keycloak réelle) ; banc : 16 réussis, 1 ignoré.

### Limites

- Laboratoire synthétique, données fictives, `http://localhost`. Rien n'est en production.
- Sprints 01 à 05 exécutés ; sprints 06 à 12 seulement planifiés.
- La maquette React (17 écrans, 71 états, 44 tests annoncés) est sur une branche d'agent, non fusionnée, non rejouée.
- CI désactivée pour un problème de facturation GitHub Actions.

---

## 5. IFRI MentorLink — `Stane316/PIL1_2526_03`

**Nature :** plateforme de mentorat entre étudiants, projet intégrateur de Licence 1 à l'IFRI (2025-2026).
**Statut :** catégorie 3, projet académique en équipe de six.

- **Stack :** Django, PostgreSQL, Bootstrap, JavaScript.
- **Contribution :** 63 commits humains sur 95 ; 8 742 lignes ajoutées sur ≈ 14 200. Quatre coéquipiers ont livré des modules (authentification, tableau de bord, mentorat).
- **Implémenté :** score de compatibilité sur 100 points dans `backend/app/matching/views.py` (60 pour les matières communes, 20 pour les disponibilités, 10 pour la filière, 10 pour le niveau), messagerie par polling AJAX, notifications, 4 tests unitaires du matching, workflow CI.
- **Limites :** 49 de tes commits datent du seul 10 juin 2026 (intégration de dernière minute) ; le fichier de matching est co-écrit avec un coéquipier ; aucun déploiement référencé.

---

## 6. Projets de préparation en IA — à ne pas présenter comme réalisés

| Dépôt | Contenu réel | Verdict |
|---|---|---|
| `Grow-Tech-waxal-asr` | 84 documents, 7 fichiers de configuration Python (2 039 lignes), 3 commits. Les branches `feature/whisper`, `feature/gemma`, `feature/eda` sont vides. | Cadrage seul. Aucun modèle entraîné, aucune soumission prouvée. |
| `farmerledger-digitizer` | 13 documents, un `requirements.txt`. `RESULTS.md` est un gabarit vide. | Plan seul. Aucun code. |
