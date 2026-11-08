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
| L-020 | PH03 | Six vues HTML (E02, A03 × A/B/C) — `02_MAQUETTES/direction-{a,b,c}/` | v1, 2026-11-08T18:00Z | **produites et contrôlées syntaxiquement** ; **rendu NON TESTÉ** (aucun navigateur) | D-004 proposée ; G2 attendue |
| L-021 | PH03 | Portail de comparaison — `02_MAQUETTES/index.html` | v1 | **fichier local vérifié** ; rendu non vérifié | G2 attendue |
| L-022 | PH03 | Comparaison des directions — `01_PHASES/PH03_DIRECTION_ET_COMPARAISON.md` | v1 | **fichier local vérifié** ; contrastes calculés | G2 attendue |

| — | — | Aucun livrable Figma, Stitch, export ou maquette n'existe à ce stade | — | — | — |
