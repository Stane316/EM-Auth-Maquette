# EM AUTH — Maquette de démonstration

Maquette navigable de la plateforme d'authentification **EM AUTH**, en trois livrables distincts et **aucune mise en production**.

> ⚠️ Maquette de démonstration. Aucun service connecté, aucune donnée réelle.
> Une maquette ne prouve ni sécurité, ni conformité, ni disponibilité.

## Ce qu'il faut regarder

**`03_INTERFACE_REACT/` — le livrable visuel principal.** Application React 19 + TypeScript : **17 écrans, 71 états**, routage réel, état par URL.

```bash
cd 03_INTERFACE_REACT
npm install && npm run dev      # http://localhost:5173
```

| Route | Contenu |
|---|---|
| `/` | portail de démonstration |
| `/ecran/<slug>` | les 17 écrans, avec leurs états (`?etat=…`) |
| `/systeme` | jetons, composants, contrastes calculés |
| `/dossier` | couverture, décisions, ressources, limites |

## Arborescence

| Dossier | Rôle |
|---|---|
| `03_INTERFACE_REACT/` | **interface React** — le livrable visuel (v2) |
| `02_MAQUETTE_HTML_V1/` | maquette statique du cycle 1, conservée telle quelle |
| `01_PHASES/` | livrables PH00 → PH09 |
| `00_SUIVI/` | registres : état, journal, décisions, problèmes, conventions |
| `04_HANDOFF/` | paquet de transfert |
| `dri/` | bibliothèque de ressources fournie (13 fichiers, 177 ressources) |

## Contrôles

```bash
cd 03_INTERFACE_REACT
npm run verifier   # TypeScript strict — 0 erreur
npm run audit      # 6/6 : contrastes, registre, états, navigation, réseau, jetons
npm run rendu      # 29/29 routes rendues hors navigateur, 0 erreur JS
```

## État réel

**PRÊT POUR DÉMONSTRATION — NON PRÊT POUR RÉCEPTION CLIENT.**
0 P0 · 2 P1 (accessibilité non mesurée, arbitrage E09) · aucun test navigateur, clavier, lecteur d'écran ou WebAuthn réel.
Détail : `01_PHASES/PH09_BILAN_RECEPTION_v2.md`.

## Règles tenues

Aucune PR · aucune écriture hors de ce dépôt · aucun service tiers · aucune donnée personnelle · aucune durée, aucun SLA, aucun budget inventés.
