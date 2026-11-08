# PH04 — SYSTÈME DE DESIGN (maquette v2, interface React)

**Statut : TERMINÉ** — le système existe en code, il est utilisé par les 17 écrans, et ses contrastes sont recalculés par script.
**Implémentation :** `03_INTERFACE_REACT/src/styles/` (jetons et base) + `src/components/ui/` (primitives).
**Galerie :** route `/systeme` de l'application.
**Direction visuelle :** A — Clarté institutionnelle (décision D-010), portée à un niveau de finition supérieur en v2.

---

## 1. Le parti pris

**Clarté institutionnelle, pas « produit SaaS générique ».**

Trois règles ont guidé chaque choix :

1. **La sobriété n'est pas de la pauvreté.** Un produit d'authentification se juge sur ce qu'il ne montre pas : pas de dégradé animé sur un écran de retrait, pas d'illustration là où il faut une preuve.
2. **La couleur ne porte jamais seule une information.** Chaque état a un mot, une forme et une couleur. « Inconnu » a même une pastille de forme différente (losange) : il ne doit jamais être confondu avec « échec ».
3. **Ce qui est affiché doit être vérifiable.** Les ratios de contraste affichés dans la galerie sont recalculés par `scripts/audit.mjs` à partir de `tokens.css`. Si une valeur change sans mise à jour, l'audit échoue.

---

## 2. Jetons de couleur (valeurs calculées, WCAG 2.x)

| Jeton | Valeur | Usage | Contraste vérifié |
|---|---|---|---|
| `--encre-900` | `#0a1725` | titres, valeurs | **18,07:1** sur blanc |
| `--encre-700` | `#2a3f55` | texte courant | **10,82:1** |
| `--encre-500` | `#4c6178` | texte secondaire, bordures de champ | **6,39:1** |
| `--encre-300` | `#7b8fa3` | **filets et icônes décoratives uniquement** | 3,40:1 — jamais du texte |
| `--accent` | `#175cd3` | action primaire | blanc dessus **5,99:1** |
| `--accent-fonce` | `#124a9e` | liens, survol | **8,40:1** |
| `--succes` | `#0b6e4f` | confirmé | **6,25:1** |
| `--alerte` | `#8a4b00` | avertissement | **6,80:1** |
| `--danger` | `#a81d14` | erreur bloquante | **7,37:1** |
| `--inconnu` | `#4a3a78` | « non confirmé » | **9,69:1** |
| `--nuit` | `#0b2239` | chrome de navigation | blanc dessus **16,13:1** |

**15 paires** sont déclarées dans `src/donnees/contrastes.ts` et **recalculées à chaque audit** : 15/15 conformes au seuil annoncé.

**Correction tracée :** l'ancienne valeur `#6B7A87` (4,41:1 sur blanc) avait été identifiée comme inutilisable pour du texte en v1. Elle n'apparaît nulle part en v2.

---

## 3. Typographie

| Rôle | Police | Justification |
|---|---|---|
| Texte et titres | **Inter Variable** (`@fontsource-variable/inter`) | excellente lisibilité aux petites tailles, chiffres tabulaires |
| Identifiants, codes, corrélations | **JetBrains Mono Variable** | lève l'ambiguïté 0/O et 1/l — utile quand on lit `mrq_4de0` |

**Auto-hébergement.** Aucune requête vers Google Fonts ou un CDN : les fichiers WOFF2 sont servis par l'application (licence OFL). C'est à la fois une exigence de souveraineté et une mesure de protection : une requête de police est une fuite d'information sur l'utilisateur.

**Échelle :** 11 / 12 / 13 / 14 / 16 / 18 / 24 / 30 / 44 px, avec `clamp()` sur les trois plus grandes tailles. Interlettrage négatif sur les titres (`-0,021em`), positif sur les étiquettes capitales (`+0,08em`).

---

## 4. Espacement, rayons, profondeur

- **Espacement :** échelle de 4 px (`--e-1` = 4 px → `--e-9` = 96 px). Aucune valeur arbitraire dans les feuilles d'écran.
- **Rayons :** 4 / 8 / 12 / 16 px + pilule. Le rayon encode la fonction (champ = 8, carte = 12, panneau = 16), pas l'humeur.
- **Ombres :** trois niveaux seulement, très basse opacité (6–10 %). Un produit de sécurité ne brille pas.

---

## 5. Composants et états couverts

| Composant | États / variantes | Accessibilité |
|---|---|---|
| `Bouton` | primaire, secondaire, discret, destructif ; `sm`/`md` ; désactivé | hauteur ≥ 44 px, `aria-disabled`, focus visible |
| `BoutonLien` | mêmes variantes, rendu `<a>` | navigation réelle, pas un bouton déguisé |
| `Champ` | nominal, aide, erreur, obligatoire, désactivé | `label` lié, `aria-describedby` vers l'aide **et** l'erreur, `aria-invalid`, erreur en `role="alert"` |
| `Pastille` | neutre, accent, succès, alerte, danger, inconnu | forme distincte pour « inconnu », texte toujours présent |
| `Alerte` | info, succès, alerte, danger, inconnu | `role="status"` ou `role="alert"` selon la gravité, icône décorative `aria-hidden` |
| `Carte` | avec/sans en-tête, pied, densité serrée | `section` + `aria-labelledby` |
| `Segments` | liste d'états | motif d'onglets complet : `role="tablist"`, flèches, `Home`/`End`, une seule tabulation |
| `Tableau` | colonnes alignées, légende | `<caption>`, `<th scope="col">` |
| `FenetreSimulee` | dialogue natif | `<dialog>` : piège de focus, fermeture par Échap, inertie de l'arrière-plan — **sans dépendance** |

**Inventaire :** 51 fichiers dans `src/`, 7 761 lignes (TypeScript + CSS), dont 17 écrans et 9 primitives.

---

## 6. Mise en page

| Gabarit | Usage | Règle |
|---|---|---|
| `CoquilleApp` | toutes les routes | navigateur de démonstration escamotable, fil d'Ariane, bandeau de fiction permanent |
| `CoquilleEcran` | les 17 écrans | en-tête tracé + bandeau d'états + corps + **rail de rigueur** |
| `SceneAuth` | écrans d'authentification | colonne de contexte à gauche, carte d'action à droite, pleine largeur sous 900 px |

**Le rail de rigueur** est le geste le plus singulier du système : chaque écran porte, en permanence, trois blocs — *ce que cet état démontre*, *ce que la maquette ne prouve pas*, *le statut d'arbitrage de l'écran*. C'est une contrainte éditoriale transformée en composant : impossible d'oublier de dire ce qu'on ne démontre pas.

**Densité :** les écrans d'administration utilisent des tableaux compacts ; les écrans publics respirent. La différence est volontaire — un administrateur compare, un utilisateur décide.

---

## 7. Mouvement

| Règle | Application |
|---|---|
| **Un seul effet signature par page** (DRI, doc 08 canal 7) | dégradé « aurora » en CSS, présent sur le portail et les écrans publics uniquement |
| `transform` / `opacity` seulement | jamais de `width`, `top` ou `filter` animé sur un composant |
| Durées : 120 / 200 / 320 ms | une seule courbe, `cubic-bezier(0.2, 0.7, 0.3, 1)` |
| `prefers-reduced-motion` | durées ramenées à 1 ms, `aurora` figé, défilement instantané |
| **Aucun effet sur les écrans de décision** | A03, A04, E09, E10 en sont privés — c'est une exigence, pas un oubli |
| **Un seul usage de Motion** | `components/ui/Revele.tsx` : le corps de l'écran se révèle quand l'état change, pour que le clic se voie. `useReducedMotion()` annule tout. Aucune autre animation JavaScript dans la maquette. |

---

## 8. Accessibilité — ce qui est fait, ce qui ne l'est pas

**Fait et vérifiable dans le code :**
- lien d'évitement vers le contenu principal ;
- focus `:focus-visible` avec anneau contrasté, jamais supprimé ;
- landmarks (`nav`, `main`, `aside`) et titres hiérarchisés (un seul `h1` par page) ;
- groupes de champs en `fieldset`/`legend`, aides reliées par `aria-describedby` ;
- focus déplacé sur le contenu à chaque changement de route ;
- onglets d'états opérables au clavier, `aria-selected` porté par l'élément actif ;
- dialogue modal natif (piège de focus fourni par le navigateur) ;
- aucune information portée par la seule couleur ;
- `prefers-reduced-motion` respecté au niveau des jetons de durée.

**Non fait — non testé, donc non revendiqué :**
- aucune exécution de **axe-core** (le paquet n'est pas installé, et il exige un navigateur) ;
- aucun test avec **lecteur d'écran** (NVDA, VoiceOver) ;
- aucun test de **zoom 200 %** ni de **largeur 320 px** ;
- aucun **test clavier réel** (le code est écrit pour, mais personne ne l'a parcouru au clavier) ;
- aucun **Lighthouse**.

> Conséquence : la conformité WCAG 2.2 (dont le critère 3.3.8 du cahier V3) **n'est pas démontrée**. Le système est *conçu* pour y répondre ; il n'est pas *prouvé* y répondre. Cette distinction est également affichée à l'écran, dans le rail de chaque écran.

---

## 9. Influence du DRI, et ce qui a été refusé

**Retenu :** la doctrine « pas de score unique, pas d'affirmation sans preuve » (doc 02 et 08) appliquée aux états et au rail de rigueur ; la règle de sobriété du canal 7 ; Motion et Lucide (§9.1) ; l'avertissement contre l'empilement de registries.

**Refusé — React Bits** (Tier A dans le DRI, `MIT + Commons Clause`, composants Pro payants) : ses patrons visuels sont réimplémentés en CSS et Motion, aucun code n'est importé (décision D-012). Le motif est juridique autant qu'esthétique.

**Refusé — Tailwind et shadcn/ui** : le brief interdit de les imposer depuis une maquette ; les jetons CSS restent convertibles plus tard sans réécrire l'interface.

---

## 10. Porte PH04

| Critère | État |
|---|---|
| Système en code, pas en description | **OUI** |
| Utilisé par tous les écrans | **OUI** (17/17) |
| Contrastes calculés | **OUI** (15 paires, 6/6 contrôles d'audit) |
| Composants à états documentés | **OUI** (§5) |
| Mouvement sobre et désactivable | **OUI** (§7) |
| Conformité WCAG démontrée | **NON** — et déclaré comme non démontré |
| Galerie consultable | **OUI** — route `/systeme` |

**Verdict : TERMINÉ**, avec une réserve explicite sur l'accessibilité mesurée.
