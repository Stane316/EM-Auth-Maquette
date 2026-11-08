# PH08 — HANDOFF TECHNIQUE (interface React)

**Objet :** permettre à un développeur de reprendre `03_INTERFACE_REACT` sans explication orale, et de savoir exactement ce qui est réutilisable, ce qui est fictif, et ce qu'il ne faut pas copier tel quel.
**Public :** équipe de développement EM AUTH (phase G6, non ouverte).
**Avertissement :** ce dossier ne contient **aucune** intégration. Le code BFF du dépôt `Stane316/EM-Auth` n'a pas été lu en écriture ni modifié.

---

## 1. Démarrage

```bash
cd 03_INTERFACE_REACT
npm install          # 80 paquets + 29 pour l'outillage de test
npm run dev          # http://localhost:5173 — lié à 0.0.0.0 pour l'aperçu distant
npm run verifier     # TypeScript strict, aucune émission
npm run audit        # 6 contrôles : contrastes, registre, états, navigation, réseau, jetons
npm run rendu        # 29 routes rendues hors navigateur (jsdom), 0 erreur JS
npm run build        # construction de production
```

**Résultats mesurés au 2026-11-08 :** `tsc` 0 erreur · audit 6/6 · rendu 29/29 · build 452 kB (133 kB gzip).

---

## 2. Dépendances — versions installées et licences déclarées

| Paquet | Version | Licence (DRI, non revérifiée à la source) | Rôle |
|---|---|---|---|
| `react`, `react-dom` | 19.3.1 | MIT | interface — imposé par V3 §6.1 |
| `react-router-dom` | 7.18.5 | MIT | routage réel, états adressables par URL |
| `motion` | 12.43.0 | MIT (DRI §9.1) | transitions, `useReducedMotion` |
| `lucide-react` | 0.545.0 | ISC (DRI §9.1) | iconographie |
| `@fontsource-variable/inter` | 5.3.0 | OFL | typographie auto-hébergée |
| `@fontsource-variable/jetbrains-mono` | 5.3.0 | OFL | identifiants, codes |
| `vite` | 7.3.7 | MIT | outil de build |
| `typescript` | 5.9.3 | Apache-2.0 | typage strict |
| `@vitejs/plugin-react` | 5.2.0 | MIT | JSX, rafraîchissement |
| `jsdom` (dev) | 31.0.0 | MIT | test de rendu hors navigateur |

> **Point de vigilance licence :** ces licences sont celles qu'annonce le DRI (5 octobre 2026). Elles n'ont pas été vérifiées fichier par fichier dans cet environnement. Avant tout usage commercial, la vérification des `LICENSE` installés doit être faite — c'est une tâche d'une heure, pas une formalité.

---

## 3. Structure

```
src/
├── main.tsx                 montage, polices, feuilles globales
├── App.tsx                  routes : /, /ecran/:slug, /systeme, /dossier, 404
├── styles/
│   ├── tokens.css           SOURCE UNIQUE des couleurs, tailles, durées
│   └── base.css             remise à zéro, focus, effet signature aurora
├── donnees/
│   ├── ecrans.ts            registre des 17 écrans (id, slug, titre, exigences, statut)
│   ├── etats.ts             catalogue des 71 états — les écrans ne déclarent pas leurs onglets
│   ├── fiction.ts           identités, appareils, sessions, cibles, journal — 100 % fictif
│   └── contrastes.ts        paires de couleurs déclarées, vérifiées par l'audit
├── components/
│   ├── ui/                  9 primitives + ui.module.css
│   └── layout/              CoquilleApp, CoquilleEcran, SceneAuth, FenetreSimulee, rail
├── features/                17 écrans + Portail + Systeme + Dossier + registre.ts
└── lib/                     cx (classes), useEtatEcran (état dans l'URL)
```

**Règle d'or :** un écran ne déclare **jamais** ses propres états. Il lit `etatsDe(slug)`. C'est ce qui rend le décompte vérifiable par script et empêche un écran d'« oublier » un cas.

---

## 4. Ajouter un écran — la procédure exacte

1. Ajouter l'entrée dans `donnees/ecrans.ts` (`id`, `slug`, `titre`, `exigences`, `statut`, `groupe`).
2. Ajouter ses états dans `donnees/etats.ts`, sous la clé = `slug`.
3. Créer `features/E14MonEcran.tsx` avec le bloc d'en-tête de traçabilité (5 lignes, cf. `00_SUIVI/CONVENTIONS.md` §6).
4. L'enregistrer dans `features/registre.ts`.
5. `npm run audit` — il échoue si les trois sources divergent. C'est voulu.

Si le script échoue, **ne pas** assouplir le script : corriger la divergence.

---

## 5. Ce qui est réutilisable, et ce qui ne l'est pas

**Réutilisable en l'état :**
- `styles/tokens.css` — jetons complets, convertibles vers Tailwind ou CSS-in-JS ;
- les 9 primitives de `components/ui/` (elles ne connaissent aucun écran) ;
- `FenetreSimulee` comme patron de dialogue accessible **sans dépendance** ;
- `scripts/audit.mjs` — les six contrôles sont transposables à un autre projet ;
- `scripts/rendu.mjs` — test de fumée hors navigateur, utile en CI.

**À ne pas copier :**
- `donnees/fiction.ts` — données inventées, à remplacer par les vraies sources ;
- **toute logique d'authentification** : il n'y en a aucune. Les boutons changent d'état, ils ne vérifient rien ;
- les mentions « arbitrage en attente » et les bandeaux de fiction, à retirer en production ;
- `postMessage`/`navigator.credentials` : **jamais appelés**. L'intégration WebAuthn réelle reste entièrement à écrire.

---

## 6. Ce que l'intégration devra fournir (et qui n'existe pas ici)

| Besoin | État actuel | À faire en G6 |
|---|---|---|
| Contrat d'API BFF | inexistant dans la maquette | définir les schémas (réponses, erreurs, corrélations) |
| États réels (chargement, erreur réseau) | simulés par des états choisis manuellement | brancher sur les vraies transitions |
| WebAuthn | représenté par un dialogue HTML | implémenter `navigator.credentials` côté navigateur, vérification côté service |
| Thème Keycloak | écarté pour la démonstration (D-015) | décider écran par écran : thème, page BFF, ou React |
| Journal d'audit (A05) | hors lot | écran dédié + source de vérité |
| Tests navigateur | **aucun** | Playwright + axe-core, sur les 17 routes et les 71 états |

---

## 7. Accessibilité — mise en garde pour l'intégrateur

Le code est écrit pour l'accessibilité (lien d'évitement, focus géré, `aria-describedby`, dialogue natif, contrastes calculés) mais **aucun test avec navigateur, lecteur d'écran, zoom ou largeur réduite n'a été exécuté**. Ne pas présenter ce prototype comme conforme WCAG. La vérification reste à faire, avec des outils adaptés (axe-core, Lighthouse, NVDA/VoiceOver).

---

## 8. Dette technique assumée et connue

| Élément | Nature | Traitement recommandé |
|---|---|---|
| Styles inline ponctuels dans les écrans | lisibilité | extraire en CSS Modules lors du passage en production |
| `donnees/fiction.ts` monoligne | volume | découper par domaine quand les vraies sources arriveront |
| `dist/` et `dist-rendu/` | artefacts de build | ignorés par Git, à ne jamais committer |
| 45 kB de CSS non minifié logique | — | la minification est faite par Vite (40 kB → 10 kB gzip) |
| Aucun test unitaire | couverture | ajouter Vitest sur les primitives et `useEtatEcran` |

---

**Verdict PH08 : TERMINÉ** — le paquet est transférable, ses limites sont écrites, et aucune dépendance cachée ne subsiste.
