# CONVENTIONS — zone d'écriture, nommage, code

**Objet :** figer les règles de rangement et d'écriture pour que le dépôt reste lisible par un tiers (le directeur, l'équipe de développement, un futur agent) sans explication orale.
**Principe directeur :** chaque dossier, chaque nom de fichier et chaque identifiant doit **dire ce qu'il est et à quelle phase il appartient**. Un nom qui demande une explication est un nom raté.

---

## 1. Arborescence de la zone d'écriture

```
EM-Auth-Maquette/                 zone isolée autorisée (décision D-003)
├── dri/                          bibliothèque de ressources (racine, comme demandé)
├── 00_SUIVI/                     registres, capacités, conventions, empreintes
├── 01_PHASES/                    livrables de phase PH00 → PH09
├── 02_MAQUETTE_HTML_V1/          maquette statique v1 (archive PH03 → PH07)
├── 03_INTERFACE_REACT/           maquette v2 — livrable visuel (React 19 + Vite + TS)
└── 04_HANDOFF/                   paquet de transfert
```

**Pourquoi ces renommages (décision D-016) :**
- `02_MAQUETTES` → **`02_MAQUETTE_HTML_V1`** : le dossier contenait trois choses différentes (comparaison A/B/C, 16 écrans HTML, système CSS). Le nouveau nom dit **le médium et la version**, ce qui évite de le confondre avec l'interface React.
- `03_HANDOFF` → **`04_HANDOFF`** : la numérotation suit désormais l'ordre de production (2 = maquette HTML, 3 = interface React, 4 = transfert). Un dossier numéroté hors séquence impose une question ; on l'a supprimée.
- Nouveau **`03_INTERFACE_REACT`** : le livrable visuel principal, isolé du reste.

**Aucun fichier n'a été supprimé.** Les 10 fichiers markdown qui citaient les anciens chemins ont été mis à jour automatiquement.

---

## 2. Nommage des livrables de phase

| Type | Règle | Exemple |
|---|---|---|
| Livrable de phase | `PH<NN>_<SUJET_EN_MAJUSCULES>.md` | `PH05_RAPPORT_ECRANS.md` |
| Preuve outillée | `PH<NN>_PREUVES_<SUJET>.txt` | `PH07_PREUVES_CONTROLES.txt` |
| Révision d'un livrable | suffixe `_v<N>` ; l'ancienne version est **conservée**, jamais écrasée | `PH02_SELECTION_DRI_v2.md` |
| Document de décision | `00_SUIVI/DECISIONS_REGISTER.md` uniquement — pas de décision dans un rapport | — |

---

## 3. Nommage des écrans (interface React)

Un écran = **un dossier de feature**, nommé par son identifiant du workflow + son nom court en PascalCase :

```
src/features/E02Identification/
├── E02Identification.tsx      composant d'écran (export par défaut interdit)
├── E02Identification.module.css  styles locaux (CSS Modules)
├── etats.ts                    données des états (nom, entrée, actions, destination)
└── index.ts                    surface publique du dossier
```

- L'identifiant `E02` / `A03` **est conservé tel quel** : c'est la clé de traçabilité vers le cahier V3, les prompts et les rapports de phase.
- Les composants partagés vivent dans `src/components/ui/` (design system) et n'ont **jamais** de style propre à un écran.
- Les jetons de style vivent dans `src/styles/tokens.css` et **nulle part ailleurs**.

## 4. Conventions de code

| Sujet | Règle |
|---|---|
| Langage | **TypeScript strict**, aucun `any` implicite, aucun `as` non justifié |
| Composants | fonctions fléchées nommées, `type` (pas `interface`) pour les props |
| Exports | nommés ; `export default` réservé aux entrées (`main.tsx`) |
| Styles | **CSS Modules** + variables CSS ; aucun style inline sauf valeur calculée |
| Classes CSS | kebab-case, préfixe de composant (`bouton__icone`) |
| Accessibilité | un `label` par champ, `aria-describedby` vers l'aide et l'erreur, jamais de couleur seule |
| États | union discriminée TypeScript : `"vide" \| "saisie" \| "attente" \| "echec" \| "inconnu"` |
| Données | **fictives uniquement**, centralisées dans `src/donnees/`, aucune PII réelle |
| Textes | français, dans le composant ; aucune chaîne magique dupliquée |
| Commentaires | expliquent **pourquoi**, jamais « ce que fait la ligne » |
| Dépendances | 4 maximum (react, react-router, motion, lucide), toute autre exige une décision |

## 5. Règle de sobriété visuelle (issue du DRI, doc 08 canal 7)

- **Un seul effet signature par page**, animé en `transform` / `opacity`.
- Tout mouvement est **désactivable** : `useReducedMotion()` ou `@media (prefers-reduced-motion: reduce)`.
- **Aucun effet** sur un écran où une action sensible est décidée (A03, A04, E09, E10) : la sobriété y est une exigence, pas un goût.
- Aucune image décorative lourde, aucun shader, aucune 3D.

## 6. Traçabilité obligatoire de chaque écran

Chaque écran porte en tête de fichier un bloc de cinq lignes, sans quoi il n'est pas recevable :

```ts
/**
 * E02 — Identification
 * Exigences : M03 · REQ-13-06/07
 * Acteur : utilisateur (ordinaire ou privilégié)
 * Propriétaire pressenti : page de connexion Keycloak — À ARBITRER
 * Nature : maquette fictive, aucun service connecté
 */
```

## 7. Interdits permanents

Ne jamais : afficher un succès sans preuve · écrire « déconnecté partout » · écrire « tous les accès supprimés » · remplacer « non confirmé » par « échec » · inventer un numéro d'assistance, un délai, un SLA, un budget · afficher un jeton, un code, un secret · préremplir une identité sur un poste partagé · supprimer un fichier de preuve.
