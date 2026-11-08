# Composants

## Primitives — `src/components/ui`

| Composant | Props principales | Notes d'accessibilité |
|---|---|---|
| `Bouton` | `variante` (primaire, secondaire, discret, danger), `taille` (sm, md), `bloc`, `icone`, `disabled` | `type="button"` par défaut ; l'icône est décorative |
| `BoutonLien` | idem + `vers` | Rend un `<Link>` : navigation, pas action |
| `Champ` | `label`, `aide`, `erreur`, `obligatoire` | `aria-describedby` vers l'aide et l'erreur, `aria-invalid`, `role="alert"` sur l'erreur |
| `Alerte` | `ton` (info, succes, alerte, danger, inconnu), `titre`, `role` | `role="status"` (information) ou `role="alert"` (blocage) |
| `Carte` | `titre`, `sousTitre`, `action`, `pied`, `serre` | `aria-labelledby` sur le titre |
| `Pastille` | `ton` | Le sens est porté par le texte, pas par la couleur seule |
| `Tableau` | `legende`, `colonnes`, `lignes` | `<caption>` obligatoire |
| `Segments` | `etats`, `actif`, `onChange`, `idPanneau` | Motif onglets : une tabulation, flèches, `aria-selected` |
| `Revele` | `children` | Animation `motion` respectant `prefers-reduced-motion` |
| `Notifications` | — | `aria-live="polite"`, fermeture manuelle, 6 s |

## Gabarits — `src/components/layout`

- `CoquilleApp` — navigation latérale, fil d'Ariane, barre de session, focus sur
  le contenu à chaque changement d'écran.
- `Navigation` — 17 écrans groupés par parcours, badge d'arbitrage.
- `CoquilleEcran` — en-tête tracé (exigences, acteur), bandeau d'états, rail de
  rigueur. L'écran reçoit son état, il ne le choisit pas.
- `SceneAuth` / `BlocContexte` — scène à deux colonnes pour les écrans
  d'authentification.
- `EnteteSession` — compte courant, fraîcheur de preuve, menu (déconnexion,
  bascule de profil en démonstration).

## Composants métier — `src/features`

Les 17 écrans (`E01`…`E13`, `A02`, `A03`, `A04`, `A08`) sont des composants
présentationnels : ils reçoivent `{ ecran }` et lisent leur catalogue d'états.
Trois d'entre eux sont **branchés** sur les services :

| Écran | Comportement réel |
|---|---|
| `E02Identification` | appels `services.auth.identifier` ; en mode `http`, redirige vers le fournisseur d'identité |
| `E03MoyenAutorise` | affiche les facteurs renvoyés par le service, appelle `verifierFacteur` |
| `E06FinDeSession` | appelle `deconnecter()` et affiche le résultat contractuel |

`Parcours` (`/parcours`) exécute les huit étapes du parcours complet avec un
journal d'appels visible.

## Ajouter un écran

1. ajouter le slug et ses états dans `src/donnees/ecrans.ts` et `etats.ts` ;
2. créer le composant dans `src/features/` ;
3. l'enregistrer dans `src/features/registre.ts` ;
4. déclarer ses rôles dans `src/app/regles.ts` ;
5. `npm run audit` vérifie la correspondance registre ↔ fichiers ↔ états ;
6. ajouter la route au test de rendu (`scripts/rendu.mjs`).
