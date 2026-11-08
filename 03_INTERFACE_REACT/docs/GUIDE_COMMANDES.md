# Guide de commandes — sections A à I

Toutes les commandes ci-dessous ont été **exécutées** sur le dépôt réel le
2026-11-08/09 (UTC), sauf celles marquées **[non exécutée]** et accompagnées de
leur motif. Aucune commande générique n'est proposée : chacune correspond à un
script ou un fichier présent dans ce dépôt.

## A — Se placer dans le bon dossier

```bash
cd EM-Auth-Maquette/03_INTERFACE_REACT
pwd          # doit se terminer par 03_INTERFACE_REACT
node -v      # ≥ 20.19 ou ≥ 22.12 — testé avec v22.22.3
npm -v       # ≥ 10
```

## B — Installer

```bash
npm ci
```

`npm ci` installe exactement `package-lock.json`. **Ne pas** utiliser
`npm install` ici : il réécrirait le lockfile. `npm install` n'est légitime que
pour ajouter une dépendance déclarée (paquet, version, motif).

## C — Lancer en développement

```bash
npm run dev
```

Vite écoute sur `0.0.0.0:5173`. En démonstration, tout fonctionne sans backend.

## D — Vérifier la qualité du code

```bash
npm run lint       # ESLint 9
npm run verifier   # TypeScript strict, sans émission
```

Résultats obtenus : `0 erreur` et `0 erreur`.

## E — Exécuter les tests

```bash
npm test            # une passe
npm run test:watch  # surveillance
```

Résultat obtenu : **44 tests réussis, 4 fichiers, 0 échec**.

Couverture réelle : catalogue de messages S05 (29 codes comparés au contrat),
10 règles du backend de démonstration, 3 parcours d'interface (identification →
facteur → preuve → déconnexion ; validation de saisie ; auto-approbation
refusée), garde d'accès. **Aucun test de navigateur.**

## F — Contrôles structurels et preuve de rendu

```bash
npm run audit   # contrastes, registre, états, navigation, réseau, jetons
npm run rendu   # monte 30 routes dans jsdom
```

Résultats obtenus : `6/6 contrôles` et `30/30 routes rendues sans erreur`.

## G — Construire et servir le build

```bash
npm run build     # tsc -b puis vite build → dist/
npm run preview   # sert dist/ sur 0.0.0.0:4173
```

Résultat obtenu : `dist/assets/index-*.js 616,81 kB (188,11 kB gzip)`,
`index-*.css 49,23 kB (11,54 kB gzip)`, build en ~4,1 s.

## H — Tout contrôler d'une seule commande

```bash
npm run controle
```

Enchaîne : lint → typecheck → tests → audit → rendu → build. C'est la commande à
citer comme preuve ; elle échoue au premier défaut.

## I — Passer en mode HTTP (BFF réel)

```bash
cp .env.example .env
# éditer .env :
#   VITE_API_MODE=http
#   VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

Ce qui fonctionne alors : redirection `GET /auth/login`, `POST /auth/logout`
(avec `x-csrf-token`), `GET /api/csrf`. Ce qui répond `NON_SUPPORTE` :
`GET /api/session` (absent du BFF) et tous les contrats de back-office. Voir
`docs/API_INTEGRATION.md`.

**[non exécutée]** : aucun BFF n'a été lancé dans cet environnement, donc le mode
`http` est **compilé mais non exercé**. Ne pas le présenter comme validé.

## Transfert et merge — état réel du dépôt

```bash
git -C ../.. status          # arbre propre
git -C ../.. log --oneline   # historique de la branche
git -C ../.. fetch origin
git -C ../.. log --oneline origin/main..HEAD    # 11 commits d'avance
```

État constaté le 2026-11-09 :

- branche courante : `arena/53c9aa9d-em-auth-maquette` ;
- `origin/main` : `97fe67e Initial commit` — la branche avance de **11 commits**,
  soit **249 fichiers** modifiés ou ajoutés ;
- aucun fichier de build n'est suivi (`dist/`, `dist-rendu/`, `node_modules/`,
  `*.tsbuildinfo` sont ignorés) ;
- **aucune pull request n'a été ouverte** (consigne explicite).

Procédure de merge, à n'exécuter qu'avec l'accord du responsable :

```bash
# 1. vérifier que la branche est à jour et propre
git status --short
git fetch origin

# 2. relire l'écart avant tout merge
git diff --stat origin/main..HEAD

# 3. fusionner sans réécrire l'historique (jamais de --force)
git switch main
git pull --ff-only origin main
git merge --no-ff arena/53c9aa9d-em-auth-maquette
```

Le merge, le rebase et le cherry-pick affectent l'historique partagé : ils
restent soumis à autorisation expresse. Aucun `git reset --hard`, aucun
`git clean -fd`, aucun `git push --force` n'a été exécuté.
