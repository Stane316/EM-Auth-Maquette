# Index des livrables — instance EM-AUTH-MAQUETTE

Un livrable n'existe que si le **fichier**, son **emplacement** et sa **version** sont vérifiés.
Distinguer : fichier local réel · export · lien d'outil effectif · simulation · promesse. Aucun jeton de partage stocké.

| ID | Phase / écran | Type et emplacement | Version / empreinte | État vérifié / simulation / non testé | Autorisation / décision liée |
|---|---|---|---|---|---|
| L-000 | PH00 | Rapport de ressources et capacités — `00_SUIVI/RESSOURCES_ET_CAPACITES.md` | v1, 2026-11-08T17:20Z | **fichier local vérifié** | D-003 (zone) proposée |
| L-001 | PH00 | Manifeste d'empreintes des sources — `00_SUIVI/EMPREINTES_SOURCES.txt` | 156 lignes, commit `a80a478` | **vérifié** (SHA-256 calculés) | D-001 proposée |
| L-002 | PH00 | Cinq registres de suivi — `00_SUIVI/` | v1 | **fichiers locaux vérifiés**, copies de travail (modèles intactes) | D-003 proposée || L-010 | PH01 | Compréhension et écarts — `01_PHASES/PH01_COMPREHENSION_ET_ECARTS.md` | v1 | **fichier local vérifié** | D-001 proposée |
| L-011 | PH01 | Matrice de périmètre des 22 écrans — `01_PHASES/PH01_MATRICE_PERIMETRE_ECRANS.md` | v1 | **fichier local vérifié** ; tous `À_ARBITRER` | G1 ouverte |
| L-012 | PH02 | Sélection DRI — `01_PHASES/PH02_SELECTION_DRI.md` | v1 | **fichier local vérifié** ; 0 ressource intégrée | G5/G6 si intégration future |
| L-020 | PH03 | Six vues HTML (E02, A03 × A/B/C) — `02_MAQUETTE_HTML_V1/direction-{a,b,c}/` | v1, 2026-11-08T18:00Z | **produites et contrôlées syntaxiquement** ; **rendu NON TESTÉ** (aucun navigateur) | D-004 proposée ; G2 attendue |
| L-021 | PH03 | Portail de comparaison — `02_MAQUETTE_HTML_V1/index.html` | v1 | **fichier local vérifié** ; rendu non vérifié | G2 attendue |
| L-022 | PH03 | Comparaison des directions — `01_PHASES/PH03_DIRECTION_ET_COMPARAISON.md` | v1 | **fichier local vérifié** ; contrastes calculés | G2 attendue |

| L-030 | PH02 | Analyse DRI v2 — `01_PHASES/PH02_SELECTION_DRI_v2.md` | v2, 2026-11-08 | **fichier local vérifié** ; 177 ressources couvertes ; licences non revérifiées à la source | D-012 |
| L-031 | PH00 | Conventions d'écriture et de nommage — `00_SUIVI/CONVENTIONS.md` | v1 | **fichier local vérifié** | D-016 |
| L-040 | PH04 | Jetons et base — `03_INTERFACE_REACT/src/styles/` | v2 | **vérifié par script** (contrastes recalculés) | D-010 |
| L-041 | PH04 | Primitives (9) — `03_INTERFACE_REACT/src/components/ui/` | v2 | **fichiers locaux vérifiés** | D-011 |
| L-042 | PH04 | Galerie du système — route `/systeme` | v2 | **rendue sans erreur** (jsdom) ; rendu visuel non testé | — |
| L-043 | PH05 | 17 écrans React — `03_INTERFACE_REACT/src/features/` | v2 | **71 états catalogués et vérifiés** ; rendu visuel non testé | D-013 |
| L-044 | PH05 | Catalogue d'états — `03_INTERFACE_REACT/src/donnees/etats.ts` | v2 | **vérifié par script** (unicité, couverture) | — |
| L-045 | PH07 | Audit outillé — `03_INTERFACE_REACT/scripts/audit.mjs` | v2 | **6/6 contrôles** | — |
| L-046 | PH07 | Preuve de rendu — `03_INTERFACE_REACT/scripts/rendu.mjs` | v2 | **29/29 routes, 0 erreur JS** | — |
| L-047 | PH08 | Handoff technique — `01_PHASES/PH08_HANDOFF_TECHNIQUE.md` | v2 | **fichier local vérifié** | — |
| L-048 | PH09 | Bilan de réception v2 — `01_PHASES/PH09_BILAN_RECEPTION_v2.md` | v2 | **évaluation interne** ; réception client non prononcée | D-014 |
| L-049 | — | Dossier de démonstration — route `/dossier` | v2 | **rendu sans erreur** | — |

| L-050 | v3 | Couche de contrats — `03_INTERFACE_REACT/src/services/contracts/` | v3 | **vérifié par test** (29 codes, égalité hors accents) | — |
| L-051 | v3 | Backend de démonstration — `src/services/demo/backendDemo.ts` | v3 | **10 tests exécutés** | — |
| L-052 | v3 | Client HTTP + contrats BFF — `src/services/http/` | v3 | **compilé** ; non exercé contre le BFF (pas de serveur lancé) | — |
| L-053 | v3 | Session, garde, notifications — `src/session/`, `src/components/ui/Notifications.tsx` | v3 | **test de garde exécuté** | D-020 |
| L-054 | v3 | Parcours de bout en bout — `src/features/Parcours.tsx` | v3 | **3 tests d'interface exécutés** | D-018 |
| L-055 | v3 | Tests automatisés — `03_INTERFACE_REACT/tests/` | v3 | **44/44 réussis** | D-021 |
| L-056 | v3 | Configuration de lint — `03_INTERFACE_REACT/eslint.config.js` | v3 | **0 erreur** | D-021 |
| L-057 | v3 | Documentation — `README.md`, `docs/{ARCHITECTURE,API_INTEGRATION,ROUTES,COMPOSANTS}.md`, `.env.example` | v3 | **fichiers locaux vérifiés** | — |
| L-058 | v3 | Référentiel de prompts — `05_SYSTEME_DOCUMENTAIRE/` | v3 | **77 fichiers copiés** | — |

| — | — | Aucun livrable Figma, Stitch, export ou maquette n'existe à ce stade | — | — | — |
