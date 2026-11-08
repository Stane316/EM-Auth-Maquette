# PH02 (révision 2) — ANALYSE DU DRI ET SÉLECTION DES RESSOURCES

**Phase :** PH02 · **Révision :** v2 (remplace `PH02_SELECTION_DRI.md` v1, conservée comme historique)
**Date :** 2026-11-08 · **Source :** `dri/` à la racine du dépôt (13 fichiers, 12 documents + 1 catalogue CSV)
**Empreinte de la source :** `catalogue-dri.csv` `fcb025c7cbd9` · documents `5346c7fbce76` … `d6995c5d8ba8` (voir `00_SUIVI/EMPREINTES_SOURCES.txt`)
**Contexte nouveau :** l'interface cible est **React 19 / Vite** (V3 §6.1) et la maquette doit être un **livrable visuel de qualité**, pas un document.

---

## 1. Ce qui a été réellement analysé (méthode, sans surpromesse)

| Élément | Couverture |
|---|---|
| `catalogue-dri.csv` | **177 lignes sur 177** — toutes lues, parsées, ventilées par famille (15), par nature (24), par classe de licence (7) |
| `00-README.md` | intégral |
| `01-global-resource-map.md` | intégral (méthode, 16 familles, Tiers, labels de confiance, coverage/gaps) |
| `02-taxonomy.md` | structure complète des 24 natures, 6 règles de distinction, 3 échelles de notation, règles de fusion, nomenclature de licences |
| `03-platform-directory.md` | sections A (inspiration), **B.1–B.3 (composants, registries, primitives headless)**, C (templates/admin) |
| `04-resource-catalog.md` | sections **C1 motion, C2 composants UI, C3 primitives headless**, C10 assets, C15 qualité |
| `05-technology-map.md` | matrice **5.5 « par besoin »** (37 besoins), 5.7 licences, 5.1 frameworks |
| `06-ai-resource-map.md` | inventaire des familles IA/MCP — **aucune brique IA retenue** (hors périmètre V3) |
| `07-use-case-index.md` | blocs 1 (structure UI), 3 (formulaires/identité), 5 (design system, assets), 7 (motion), 10 (qualité) |
| `08-decision-matrix.md` | **intégral pour les canaux 1, 2, 7, 8** ; canal 7 « VISUAL IMPACT » retenu comme règle de conception |
| `09-resource-stack.md` | **§9.1 STACK ESSENTIAL intégral**, §9.6 stacks A/B/C, §9.8 limites |
| `10-verticals.md` | §10.3 SaaS B2B (contraintes de densité, tableau, permissions) et §10.2 éducation (accessibilité) |
| `11-cost-at-scale.md` | §11.3 service AUTHENTIFICATION et §11.7 synthèse — pour situer l'offre, **aucun chiffre repris dans la maquette** |

**Limite assumée :** les documents 02, 03, 04, 06, 07, 10, 11 n'ont pas été relus ligne à ligne dans leur intégralité ; ils ont été parcourus par sections identifiées ci-dessus. Le catalogue, lui, est couvert à 100 %. Aucune recommandation ci-dessous ne s'appuie sur un passage non lu.

---

## 2. Constat sur la nature du DRI (et pourquoi cela change la décision)

Le DRI est une **bibliothèque de ressources réutilisables** datée du **5 octobre 2026**, avec des labels de confiance (`[API-gh]`, `[API-npm]`, `[V]`, `[W]`, `[?]`). Trois conséquences directes :

1. **Ses chiffres sont des déclarations historiques**, pas des vérifications du jour. Aucune licence n'est vérifiée à l'usage (§6).
2. **Il est orienté « choisir une brique »**, pas « concevoir EM AUTH ». Il ne contient aucune exigence métier.
3. Il **contient des ressources réellement pertinentes** pour une interface React : c'est à ce titre qu'il est exploité ici, et non comme autorité de conception.

---

## 3. Découverte majeure — React Bits, la licence qu'il faut regarder en face

| Champ DRI | Valeur |
|---|---|
| Ressource | **React Bits** · `https://reactbits.dev` · Tier A · famille UI |
| Nature | N08 (snippets / composants copier-coller) |
| Classe de licence | **`free commercial (conditions)`** |
| Licence exacte | **`MIT + Commons Clause`** |
| Preuves | 213 composants `[S]` ; **Pro 129 / 249 / 349 $** `[S]` |
| Scores | AI-readiness 3 · Réutilisabilité 3 |

**Analyse.** La *Commons Clause* ajoutée à MIT interdit de **vendre** le logiciel (ou un produit dont la valeur essentielle réside dans ce logiciel). EM AUTH est destiné à devenir une **offre commerciale** (V3 §1.2, §12). Utiliser React Bits tel quel dans un produit vendu crée donc une **ambiguïté juridique réelle**, et une partie des composants est **payante** (Pro). Ce n'est pas un veto, c'est un risque à ne pas porter par défaut.

**Recommandation retenue pour la maquette :**
- **Ne pas importer la bibliothèque.** En revanche, **appliquer ses patrons visuels** (révélations de texte, fonds animés doux, cartes à halo) en **code maison** (CSS + `Motion`), ce qui supprime le risque de licence, le poids et la dépendance à un registre externe.
- Le DRI lui-même borne l'usage : *« Règle de sobriété : **un** effet signature par page, animé en `transform`/`opacity`, désactivable par `prefers-reduced-motion` »* (doc 08, canal 7). C'est adopté comme **loi de conception** de l'interface.
- Si le directeur veut React Bits tel quel plus tard : décision explicite, achat de la licence Pro si nécessaire, et mention au dossier de conformité.

---

## 4. Stack UI retenue (et pourquoi chaque choix)

| Couche | Ressource | Licence (DRI) | Justification | Statut licence |
|---|---|---|---|---|
| Langage | **TypeScript** | Apache-2.0 | Contrat unique UI/BFF, aligné V3 §6.1 | à vérifier à l'usage |
| Build | **Vite** | MIT | Exigé par V3 §6.1 · DRI Essential | à vérifier |
| Framework | **React 19** | MIT | Exigé par V3 §6.1 | à vérifier |
| Routage | **React Router** | MIT | Convention standard, pas de framework imposé | à vérifier |
| Primitives UI | **Base UI** | MIT | Le DRI note **Radix « maintenance ralentie 2026 »** et désigne Base UI comme *« successeur headless actif »* | à vérifier à l'usage |
| Animation | **Motion** | MIT | R5 (meilleure réutilisabilité) ; gère `exit`, gestes, `useReducedMotion` | à vérifier |
| Icônes | **Lucide** | ISC | « défaut shadcn », 1 780 icônes, tree-shakable | à vérifier |
| Typographie | **@fontsource (OFL)** — Inter Variable + JetBrains Mono Variable | OFL | Auto-hébergée : **zéro requête tierce**, licences claires (le DRI cite Google Fonts/Fontshare, non accessibles ici en direct) | à vérifier |
| Styles | **CSS natif + jetons sémantiques** | — | Aucun framework CSS imposé depuis une maquette (brief §4) ; les jetons restent portables vers Tailwind si le directeur le décide | — |
| Qualité | **TypeScript strict** + `tsc --noEmit` | — | Vérification réelle, pas déclarative | — |
| A11y | **axe-core** (via script local) | MPL-2.0 | Le DRI le désigne comme porte obligatoire ; utilisable **sans navigateur** ici | à vérifier |

**Ce qui a été écarté, et pourquoi :**

| Ressource | Motif d'exclusion |
|---|---|
| shadcn/ui + Tailwind | Le brief interdit d'imposer Tailwind/shadcn depuis une maquette ; le DRI lui-même prévient : *« empiler des registries et perdre la cohérence »* |
| Magic UI, Aceternity, Kokonut | Même famille d'effets que React Bits, mêmes questions de licence ; inutile d'empiler |
| GSAP, Lenis, Rive, Lottie, three.js | Aucun besoin V3 ; le « feel premium » n'exige pas une timeline |
| MUI, Ant Design, Mantine, Chakra | Design systems complets qui imposeraient leur langage visuel à EM AUTH |
| TanStack Query / Table, Zustand, React Hook Form, Zod | Pertinents **à l'implémentation réelle**, sans données serveur ici : les introduire maintenant serait une dette sans bénéfice. **Recommandés pour le lot d'intégration** (G6) |
| Better Auth, Supabase, Clerk, Resend, Stripe | **Contredisent la V3** (Keycloak/PostgreSQL/BFF). Les substituer serait une proposition de modification, pas une décision de maquette |
| Tout le volet IA/MCP (30 ressources) | Hors périmètre V3 ; aucun usage |

---

## 5. Ressources DRI effectivement mobilisées dans le livrable

| Ressource | Usage réel dans l'interface | Nature de l'usage |
|---|---|---|
| **Motion** | transitions, révélation échelonnée, respect de `useReducedMotion` | dépendance installée |
| **Lucide** | iconographie (états, navigation, badges) | dépendance installée |
| **@fontsource OFL** | Inter Variable + JetBrains Mono, auto-hébergées | dépendance installée |
| **Base UI** | comportements accessibles des primitives (si nécessaire aux dialogues) | dépendance installée |
| **Patrons React Bits** | **un** effet signature : fond « aurora » discret sur les écrans publics, en CSS pur | inspiration, **aucun code importé** |
| **axe-core** | contrôle automatisé d'accessibilité exécutable hors navigateur | outil de vérification |
| **Règle canal 7 du DRI** | sobriété : 1 effet signature par page, `transform`/`opacity` seulement | règle de conception |
| **Doctrine « UNKNOWN » du DRI (doc 02/08)** | jamais de score unique, jamais d'affirmation sans preuve → appliquée aux états de l'UI | méthode |

---

## 6. Licences — état réel de vérification

**Aucune licence n'a été vérifiée à la source** (pas de lecture de fichier `LICENSE`, pas d'appel registre). Les valeurs du tableau §4 sont des **déclarations DRI datées du 2026-10-05**.

| Vérification | État |
|---|---|
| Lecture des fichiers `LICENSE` des paquets installés | **à faire** — possible après installation, à consigner |
| Conformité de l'usage commercial d'EM AUTH | **INCONNUE** — décision juridique, hors de portée de l'agent |
| React Bits (Commons Clause + Pro) | **risque identifié**, non importé |

**Règle appliquée :** aucun composant dont la licence n'est pas permissive n'est intégré. Les quatre dépendances retenues sont déclarées MIT/ISC/OFL/Apache — la vérification post-installation sera consignée.

---

## 7. Risques de cette sélection

| Risque | Mitigation |
|---|---|
| Effets visuels qui nuisent à la lisibilité d'un produit de sécurité | Règle « 1 effet par page », jamais sur un écran d'action sensible |
| Dépendances qui vieillissent mal | 4 dépendances seulement, toutes remplaçables ; aucune dépendance de style |
| Perte de cohérence (risque nommé par le DRI) | Une seule couche de jetons ; aucun second registre |
| Licence incertaine | vérification post-installation + aucune ressource « conditions » |
| Sur-promesse visuelle (« ça a l'air sécurisé ») | bandeau de fiction, aucune revendication de sécurité, états INCONNU visibles |

---

## 8. Porte PH02 (révision)

| Critère | État |
|---|---|
| Fichiers DRI liés au design/composants/représentation lus | **OUI** (§1, avec périmètre exact) |
| Ressources comparées (licence, compatibilité, maintenance, poids, coût) | **OUI** (§4) |
| Non-retenus et raisons | **OUI** (§4) |
| Licences vérifiées **à l'usage** | **NON** — vérification post-installation programmée |
| Aucune installation non autorisée | **OUI** — installation autorisée par la décision D-011 |

**Verdict : PH02 v2 TERMINÉ.** La sélection est établie, justifiée, et le risque principal (React Bits) est traité par une décision explicite.
