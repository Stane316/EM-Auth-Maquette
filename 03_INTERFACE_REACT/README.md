# EM AUTH — maquette de démonstration (interface React)

Application de démonstration de la plateforme d'authentification **EM AUTH** : **17 écrans**, **71 états**, **aucun service connecté**.

> ⚠️ **Ceci n'est pas un produit.** Aucune authentification réelle, aucun appel WebAuthn, aucune donnée personnelle.
> Une maquette ne prouve ni sécurité, ni conformité, ni disponibilité.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Commande | Rôle | Résultat attendu |
|---|---|---|
| `npm run dev` | serveur de développement (écoute sur `0.0.0.0`) | — |
| `npm run verifier` | TypeScript strict | 0 erreur |
| `npm run audit` | 6 contrôles : contrastes, registre, états, navigation, réseau, jetons | 6/6 |
| `npm run rendu` | 29 routes rendues hors navigateur (jsdom) | 29/29 |
| `npm run build` | construction de production | ~452 kB |

## Parcours

- `/` — portail de démonstration
- `/ecran/<slug>` — les 17 écrans ; l'état courant vit dans l'URL (`?etat=…`)
- `/systeme` — jetons, composants, contrastes calculés
- `/dossier` — couverture, décisions, ressources, limites

## Organisation

```
src/donnees/ecrans.ts     registre des écrans (source de vérité)
src/donnees/etats.ts      catalogue des 71 états (les écrans ne les déclarent pas)
src/donnees/fiction.ts    données fictives
src/styles/tokens.css     jetons — seule source de couleurs
src/features/             un dossier par écran
```

Ajouter un écran : voir `../01_PHASES/PH08_HANDOFF_TECHNIQUE.md` §4. L'audit échoue volontairement si les registres divergent.

## Dépendances

React 19.3.1 · React Router 7.18.5 · Motion 12.43.0 · Lucide 0.545.0 · Inter et JetBrains Mono auto-hébergées (OFL).
Licences déclarées par le DRI, **non revérifiées à la source** — voir `PH02_SELECTION_DRI_v2.md` §6.

## Limites connues

Aucun test navigateur, clavier, lecteur d'écran, zoom ou largeur 320 px n'a été exécuté. Aucune conformité WCAG n'est revendiquée.
