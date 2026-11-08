# EM AUTH — interface React

Application React 19 + TypeScript + Vite, issue du workflow documentaire de
prototypage EM Auth. Elle couvre les **17 écrans du MVP**, un **parcours de bout
en bout réellement exécutable**, une **couche de services prête pour le BFF**, et
un **design system implémenté**.

> **Ce que ce dépôt n'est pas.** Ce n'est pas un produit d'authentification. Le
> mode par défaut (`demo`) ne vérifie aucun mot de passe, ne signe aucun défi
> WebAuthn et n'ouvre aucune session serveur. Il démontre des parcours et des
> états. Aucune conclusion de sécurité, de conformité ou de disponibilité ne peut
> en être tirée.

---

## 1. Périmètre

| Élément | État |
|---|---|
| 17 écrans du MVP (E01–E04, E06–E14, A02, A03, A04, A08) | livrés, 71 états adressables |
| Portail de démonstration, système de design, dossier | livrés |
| Parcours de bout en bout (`/parcours`) | livré, exécute des appels réels |
| Couche de services (`demo` / `http`) | livrée |
| Session, rôles, garde d'interface | livrés |
| Tests automatisés | 44 tests exécutés (Vitest + Testing Library) |
| Contrôles structurels | 6/6 (`npm run audit`), 30/30 routes (`npm run rendu`) |
| Intégration BFF réelle | partielle : voir § 10 |

## 2. Prérequis

- Node.js ≥ 20.19 ou ≥ 22.12 (testé avec **22.22.3**)
- npm ≥ 10

Aucun service externe, aucune base de données, aucun conteneur n'est nécessaire.

## 3. Installation

```bash
cd 03_INTERFACE_REACT
npm ci          # installe exactement le contenu du lockfile
```

`npm ci` est la commande de référence : le dépôt contient `package-lock.json`.
`npm install` ne doit être utilisé que pour **ajouter** une dépendance, et toute
addition doit être déclarée (paquet, version, motif).

## 4. Lancement

```bash
npm run dev     # http://localhost:5173, écoute sur 0.0.0.0
```

Le mode par défaut est `demo` : tout fonctionne sans backend.

## 5. Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de développement Vite |
| `npm run build` | `tsc -b` puis build de production dans `dist/` |
| `npm run preview` | sert le build de production |
| `npm run verifier` | vérification TypeScript stricte, sans émission |
| `npm run lint` | ESLint 9 (configuration plate) |
| `npm test` | suite Vitest, une passe |
| `npm run test:watch` | suite Vitest en surveillance |
| `npm run audit` | 6 contrôles structurels (contrastes, registre, états, navigation, réseau, jetons) |
| `npm run rendu` | monte les 30 routes dans jsdom et vérifie le titre attendu |
| `npm run controle` | enchaîne lint → typecheck → tests → audit → rendu → build |

## 6. Structure

```
src/
├── app/          providers, routes, règles de rôle
├── config/       variables d'environnement validées
├── services/     contrats, ports, backend de démonstration, client HTTP
├── session/      état de session, garde d'interface
├── hooks/        useSoumission (envoi, anti-double-soumission)
├── components/   ui/ (10 primitives) + layout/ (8 gabarits)
├── features/     17 écrans + portail, parcours, système, dossier
├── donnees/      catalogue des écrans et des 71 états, fiction
├── styles/       tokens.css (source de vérité), base.css
└── lib/          utilitaires
tests/            44 tests (messages, backend de démonstration, parcours, garde)
docs/             architecture, routes, composants, intégration API
```

Détail : [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## 7. Design system

Implémenté dans `src/styles/tokens.css` — pas seulement documenté :

- couleurs sémantiques (encre, accent, succès, alerte, danger, inconnu) avec
  contrastes **recalculés** par `npm run audit` (15 paires, seuil annoncé) ;
- échelle typographique, interlignes, interlettres ;
- espacements `--e-1` … `--e-9`, rayons `--r-1` … `--r-rond`, trois ombres ;
- durées et courbes d'animation, respect de `prefers-reduced-motion` ;
- variantes et états des primitives (survol, focus visible, désactivé, erreur).

Page vivante : `/systeme`.

## 8. Tests et contrôles

```bash
npm run controle
```

Résultats attendus (exécutés le 2026-11-08) :

| Contrôle | Résultat |
|---|---|
| ESLint | 0 erreur, 0 avertissement |
| TypeScript `--noEmit` | 0 erreur |
| Vitest | 44 tests, 4 fichiers, 0 échec |
| `npm run audit` | 6/6 |
| `npm run rendu` | 30/30 routes |
| `vite build` | 1 bundle JS ~617 kB (188 kB gzip), 1 CSS ~49 kB (12 kB gzip) |

**Non testé**, et déclaré comme tel : rendu visuel, navigation clavier réelle,
lecteur d'écran, zoom 200 %, largeur 320 px, cérémonie WebAuthn native,
tests de bout en bout dans un navigateur (aucun navigateur disponible dans
l'environnement d'exécution).

Le bundle dépasse 500 kB : c'est signalé par Vite. Un découpage par route est
possible mais n'a pas été fait — le prototype charge tout d'un coup, ce qui reste
acceptable pour une démonstration locale.

## 9. Sessions, rôles et permissions

- `SessionProvider` interroge `sessionCourante()` au montage puis toutes les
  15 s (paramétrable). Aucun jeton n'est écrit dans `localStorage`
  (`no-restricted-globals` le refuse côté lint).
- `preuveFraiche` est calculé **à la réception de la réponse**, jamais pendant
  le rendu : un composant ne dépend pas de l'heure.
- `src/app/regles.ts` déclare les rôles par écran ; `AccesProtege` affiche
  « session requise » ou « accès refusé ».
- **Cette garde n'autorise rien** : l'autorisation est serveur
  (`app/lib/authz.mjs` du projet EM-Auth). L'interface le dit à l'écran.

## 10. Intégration du BFF

Deux implémentations du même port (`src/services/ports.ts`) :

| Mode | Contenu | Usage |
|---|---|---|
| `demo` (défaut) | moteur en mémoire, latence simulée, règles S05 appliquées | démonstration, tests |
| `http` | `fetch` vers le BFF, CSRF, cookie HttpOnly | intégration |

Ce que le BFF expose déjà : `/auth/login`, `/auth/callback`, `/auth/logout`,
`/api/csrf`, `/api/notes`. Ce qu'il manque : **`GET /api/session`** (état de
session en JSON, indispensable à une SPA) et tous les contrats de back-office.
Ces contrats sont définis côté interface et renvoient `NON_SUPPORTE` — jamais un
faux succès. Détail complet, route par route :
[`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md).

## 11. Variables d'environnement

Copier `.env.example` vers `.env`. Toute variable `VITE_*` est **publique**
(incluse dans le bundle) : aucun secret ici. Les secrets OIDC et les clés
restent côté BFF.

| Variable | Défaut | Rôle |
|---|---|---|
| `VITE_API_MODE` | `demo` | `demo` ou `http` |
| `VITE_API_BASE_URL` | *(vide)* | base des appels ; vide = même origine |
| `VITE_DEMO_LATENCE_MS` | `320` | latence simulée |
| `VITE_SESSION_DUREE_MIN` | `20` | durée de session de démonstration |
| `VITE_PREUVE_FRAICHE_MIN` | `5` | fenêtre de preuve affichée (politique S05) |
| `VITE_SESSION_POLL_MS` | `15000` | intervalle de contrôle de session |
| `VITE_DEMO_SESSION_INITIALE` | `0` | session pré-ouverte, **test de rendu uniquement** |

## 12. Limites assumées

1. Le mode `demo` n'est pas une authentification.
2. Les données sont fictives ; les références, durées et compteurs sont marqués
   comme tels.
3. Aucun test dans un navigateur réel n'a été exécuté.
4. Les contrôles d'accessibilité restent partiels : le balisage est écrit selon
   les règles (rôles, libellés, focus, annonces), mais aucun audit automatisé
   (axe-core) ni test avec lecteur d'écran n'a pu être lancé.
5. `npm audit` signale 7 avis **modérés, en dépendances de développement**
   (`minimatch` via `typescript-eslint`) : aucun n'est inclus dans le bundle de
   production ; la correction proposée casse la compatibilité des pairs.
