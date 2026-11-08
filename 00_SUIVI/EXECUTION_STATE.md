# État d'exécution — instance EM-AUTH-MAQUETTE

**Instance :** `EM-AUTH-MAQUETTE` · **Racine système/version :** `EM-Auth/EM_AUTH_PROTOTYPING_SYSTEM` @ `a80a478` (référence en lecture seule) · **Projet/zone de travail :** dépôt `EM-Auth-Maquette`, branche `arena/53c9aa9d-em-auth-maquette` · **DRI/empreinte :** `dri/` **13 fichiers, restaurés dans le dépôt** (`catalogue-dri.csv` `fcb025c7cbd9`) · **Fuseau/horloge :** UTC

**Phase actuelle :** PH09 (révision 3 — mission v3) · **Statut global : PRÊT POUR DÉMONSTRATION INTERACTIVE — NON PRÊT POUR RÉCEPTION CLIENT** · **Prochaine action :** brancher `GET /api/session` côté BFF, puis exécuter les tests navigateur · **Dernier événement :** couche de services livrée — 44 tests exécutés, 6/6 audit, 30/30 routes, build 616,81 kB · **Prompt en cours :** aucun — portes G5/G6 fermées

## Changement de cycle (2026-11-08)

Le cycle 1 produisait une maquette **HTML statique** (16 écrans, 60 états, boutons inertes) et concluait **NON PRÊT**.
Le cycle 2 produit une **application React 19 + TypeScript** (17 écrans, 71 états, routage réel), sur demande expresse de l'utilisateur. **Tout le cycle 1 est conservé** dans `02_MAQUETTE_HTML_V1/` et n'est pas présenté comme remplacé.

| Phase | Statut | Sortie / preuve | Porte / prochaine action |
|---|---|---|---|
| PH00 | **TERMINÉ** | `RESSOURCES_ET_CAPACITES.md` · `EMPREINTES_SOURCES.txt` | G0 franchie |
| PH01 | **TERMINÉ** | `PH01_COMPREHENSION_ET_ECARTS.md` · `PH01_MATRICE_PERIMETRE_ECRANS.md` (22 écrans) | G1 : lot de 16 + E09 (D-013) |
| PH02 | **TERMINÉ (v2)** | `PH02_SELECTION_DRI_v2.md` — 177 ressources analysées, 4 dépendances retenues, React Bits écarté (D-012) | licences à vérifier à la source (JUR-1) |
| PH03 | **TERMINÉ** | 6 vues A/B/C + portail · `PH03_DIRECTION_ET_COMPARAISON.md` | G2 tranchée : direction A (D-010) |
| PH04 | **TERMINÉ (v2)** | `PH04_DESIGN_SYSTEM.md` · `03_INTERFACE_REACT/src/styles/` + `components/ui/` · galerie `/systeme` | réserve : accessibilité non mesurée |
| PH05 | **TERMINÉ** | `03_INTERFACE_REACT/src/features/` — **17 écrans, 71 états** | E09 en attente d'arbitrage |
| PH06 | **TERMINÉ** | Routage réel `react-router-dom` · `PH06_MATRICE_PARCOURS.md` (v1) · audit : 13 destinations, 0 cassée | — |
| PH07 | **TERMINÉ AVEC RÉSERVES** | `PH07_RAPPORT_AUDITS.md` (v1) · **audit v2 : 6/6** · **rendu : 29/29** | réserve : aucun test navigateur |
| PH08 | **TERMINÉ** | `PH08_HANDOFF_TECHNIQUE.md` · `04_HANDOFF/PAQUET_HANDOFF.md` | transférable ; G6 fermée |
| PH09 | **EN_ATTENTE_HUMAIN** | `PH09_BILAN_RECEPTION_v2.md` — B01–B10 : 3 satisfaits, 4 réserves, 2 partiels, 1 NA | **réception client non prononcée** |

**Écrans :** 17 produits (16 du lot + E09) · 0 différé produit · 5 hors lot déclarés absents (A01, A05, A06, A07, A09).
**Contrôles exécutés en v2 :** `tsc` strict (0 erreur) · contrastes recalculés (15/15) · registre écrans/composants (17/17) · catalogue d'états (71, clés uniques) · destinations de navigation (13, 0 cassée) · appels réseau (0) · couleurs hors jetons (0) · rendu jsdom (29/29) · build de production (452 kB).
**Jamais exécutés :** rendu visuel, clavier, lecteur d'écran, zoom/reflow, axe-core, Lighthouse, WebAuthn réel, tests de sécurité ou de charge.
**Problèmes ouverts :** UX-3 (accessibilité non mesurée, P1) · G1-E09 (arbitrage, P1) · JUR-1 (licences non vérifiées, P2) · FN-2 (exigences non illustrées, P2) · B-008 (Figma, NA justifié). **0 P0.** UX-1 **levé**.

## Révision 3 — développement complet du frontend (2026-11-08/09)

Demande : une véritable application React + TypeScript, récupérable, installable,
exécutable, testable, intégrable à `EM-Auth`. **Ce qui a été fait, et ce que ça
vaut :**

| Élément | Preuve exécutée | Statut |
|---|---|---|
| Couche de services (`demo` + `http`), contrats typés, catalogue S05 | `tests/messages.test.ts` (29 codes), compilation stricte | **TERMINÉ** |
| Backend de démonstration appliquant les règles S05 | `tests/backendDemo.test.ts` — 10 tests | **TERMINÉ** |
| Session, fraîcheur de preuve, rôles, garde d'interface | `tests/acces.test.tsx` | **TERMINÉ** |
| Parcours de bout en bout exécutable | `tests/parcours.test.tsx` — 3 tests | **TERMINÉ** |
| Écrans branchés (E02, E03, E06) | rendu 30/30, parcours testé | **TERMINÉ** |
| Design system appliqué (tokens, primitives, états) | audit 6/6 (15 paires de contraste recalculées) | **TERMINÉ** |
| Lint + typecheck + build | `npm run controle` en une passe | **TERMINÉ** |
| Tests de bout en bout dans un navigateur, clavier, lecteur d'écran, axe-core | — | **EN_ATTENTE_OUTIL** (aucun navigateur) |
| Cérémonie WebAuthn réelle | — | **EN_ATTENTE_HUMAIN** (portée par le BFF, hors périmètre client) |
| Contrats back-office (`/api/retraits`, `/api/recuperations`, `/api/journal`…) | interface les définit, serveur absent | **EN_ATTENTE_HUMAIN** (arbitrage + implémentation serveur) |
| `GET /api/session` | absent du BFF : l'interface ne peut pas lire l'état de session en mode `http` | **EN_ATTENTE_HUMAIN** — bloquant pour l'intégration réelle |

**Chiffres vérifiés le 2026-11-08 (UTC) :** ESLint 0 erreur · `tsc -b --noEmit`
0 erreur · Vitest **44/44** (4 fichiers) · `npm run audit` **6/6** ·
`npm run rendu` **30/30** · `vite build` **616,81 kB / 188,11 kB gzip**.

**Corrigé pendant cette révision (défauts réels, trouvés par les contrôles) :**
1. `politique.ts` inversait `otpAloneSufficientForSensitive` → un code seul était
   accepté comme preuve d'action sensible. Test rouge, mapping corrigé.
2. `SessionProvider` appelait `Date.now()` pendant le rendu et `setState`
   directement dans un effet → restructuré (fraîcheur calculée à la réception).
3. Le test de rendu tombait à 19/29 avec le fournisseur de session → session de
   démonstration pré-ouverte **pour ce test uniquement** (`VITE_DEMO_SESSION_INITIALE`).
4. Le contrôle réseau de l'audit refusait tout `fetch` : règle reformulée
   (confinement à `src/services/http`), pas contournée.

**Dette assumée :** 14 écrans restent des galeries d'états (non branchés) ; le
bundle dépasse 500 kB ; 7 avis `npm audit` modérés en dépendances de
développement ; aucune mesure d'accessibilité automatisée.

**Dernière mise à jour / auteur :** 2026-11-09, agent d'orchestration (révision 3).
