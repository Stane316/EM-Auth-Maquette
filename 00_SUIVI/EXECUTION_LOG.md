# Journal d'exécution — instance EM-AUTH-MAQUETTE

Journal **append-only**. Une correction se fait par une entrée liée, jamais par effacement.
Aucune donnée sensible, aucun secret, aucune PII.

| N° | Horodatage / fuseau | Phase / action | Acteur / permission | Preuve / version | Résultat / prochain pas |
|---|---|---|---|---|---|
| 1 | 2026-11-08T17:15Z / UTC | PH00 — inventaire de l'environnement | Agent (agent de dev, lecture + écriture limitée au dépôt de session) | `uname -a`, `df -h`, `command -v`, `gh api user` | Linux x86_64, user non-root, git 2.39.5, node 22.22.3, python 3.11.2, gh authentifié ; **pas de navigateur**, pas de pdftotext, pas de Figma/Stitch |
| 2 | 2026-11-08T17:15Z / UTC | PH00 — inventaire du dépôt assigné | Agent (lecture) | `git log`, `git ls-tree` | `EM-Auth-Maquette` = 1 fichier `README.md`, commit `97fe67e`, branche `arena/53c9aa9d-em-auth-maquette` ; aucun contenu projet |
| 3 | 2026-11-08T17:16Z / UTC | PH00 — recherche du système de prompts | Agent (lecture, ressources fournies) | `find /`, `gh api search/code`, `gh repo view` | Aucune copie locale ; trouve `Stane316/EM-Auth` (public) contenant `EM_AUTH_PROTOTYPING_SYSTEM/`, `dri/`, `Blueprint/`, `app/`, `bench/` |
| 4 | 2026-11-08T17:16Z / UTC | PH00 — clone de lecture hors dépôt | Agent (lecture seule) | `git clone --depth 1` → `/tmp/em-auth-ref`, commit `a80a47855277ae851679790b56d7e640c7e9b41d` | Référence épinglée ; aucun écrasement d'un local, aucune écriture dans `EM-Auth` |
| 5 | 2026-11-08T17:17Z / UTC | PH00 — lecture du maître, du protocole, de l'index, de la carte, du quick start, de PH00 et de 04C | Agent (lecture) | SHA-256 consignés dans `EMPREINTES_SOURCES.txt` | Règles d'autorité, portes G0–G6 et machine d'état intégrées |
| 6 | 2026-11-08T17:18Z / UTC | PH00 — contrôle d'empreinte du cahier V3 | Agent (lecture) | `sha256sum` PDF = `25c1e0513c80461e5855ae50c7dd08733ce45bcb684604bd39b9fc8eb931f1cf` | **Identique** à l'empreinte documentée (notice officielle, rapport d'audit, `validate_system.py`) ; aucune divergence |
| 7 | 2026-11-08T17:18Z / UTC | PH00 — lecture intégrale du cahier V3 (14 p.) | Agent (lecture) | Extraction textuelle en lecture seule de la page distante (pdftotext absent) | 13 modules M01–M13, 36 exigences REQ-13-01…36, 12 sprints, critères §11 lus ; figures non contrôlées visuellement |
| 8 | 2026-11-08T17:19Z / UTC | PH00 — inventaire DRI | Agent (lecture) | `ls dri/`, vérification des annexes citées | 13 fichiers présents ; `12*`, `13-harnai/*`, `14`, `15`, `catalogue-student.csv`, `catalogue-harnai.csv`, `data/` **ABSENTS** → INCONNUS |
| 9 | 2026-11-08T17:19Z / UTC | PH00 — audit lecture seule du projet (04C) | Agent (lecture) | `app/package.json`, arborescence `app/tests*`, `bench/`, rapports racine | BFF synthétique + labo S05 présents ; aucune dépendance React/Vite ; résultats S04/T10 = **déclarés, non rejoués** ; `develop` non examiné |
| 10 | 2026-11-08T17:20Z / UTC | PH00 — initialisation du suivi en zone isolée | Agent (écriture limitée à `EM-Auth-Maquette`) | `00_SUIVI/*` créés comme copies de travail ; modèles `09_EXECUTION_RECORDS/` **non modifiés** | 5 registres + `RESSOURCES_ET_CAPACITES.md` + manifeste d'empreintes (156 lignes) |
| 11 | 2026-11-08T17:21Z / UTC | PH00 — porte G0 | Agent (analyse) | §7 de `RESSOURCES_ET_CAPACITES.md` | Porte **ouverte** sur D-001 (source), D-003 (zone), D-004 (outils) ; propositions consignées, aucune décision humaine acquise |
| 12 | 2026-11-08T17:22Z / UTC | PH00 — clôture de phase | Agent | `EXECUTION_STATE.md` mis à jour | PH00 **TERMINÉ** pour la découverte ; PH01 engagée en analyse |
| 13 | 2026-11-08T17:30Z / UTC | PH01 — lecture des références obligatoires | Agent (lecture) | PDF V3 (5 blocs), brief intégral, inventaire E/A, critères B01–B10, direction visuelle, sources historiques P14 | Compréhension établie ; 10 écarts documentés (É-1…É-10) |
| 14 | 2026-11-08T17:35Z / UTC | PH01 — livrables | Agent (écriture zone isolée) | `01_PHASES/PH01_COMPREHENSION_ET_ECARTS.md`, `01_PHASES/PH01_MATRICE_PERIMETRE_ECRANS.md` | Matrice des 22 écrans produite, tous `À_ARBITRER` ; 4 options de lot proposées ; G1 ouverte |
| 15 | 2026-11-08T17:36Z / UTC | PH01 — porte | Agent (analyse) | §5 de la matrice ; §8 du rapport | Porte **ouverte** : périmètre non arbitré ; analyses indépendantes poursuivies, PH05 bloquée |
| 16 | 2026-11-08T17:50Z / UTC | PH02 — sélection DRI | Agent (lecture + analyse) | `dri/` : `00-README`, `01`, `02` partiel, `08`, `catalogue-dri.csv` | Matrice `01_PHASES/PH02_SELECTION_DRI.md` : 13 ressources examinées, **0 intégrée**, licences non vérifiées à l'usage, annexes absentes signalées |
| 17 | 2026-11-08T17:55Z / UTC | PH03 — calcul des contrastes | Agent (calcul déterministe) | formule WCAG 2.x sur les paires de chaque direction | 27 paires ≥ 4,5:1 ; paires « avertissement/inconnu » **non mesurées** (réserves consignées) |
| 18 | 2026-11-08T18:00Z / UTC | PH03 — production des vues A/B/C sur E02 et A03 | Agent (écriture zone isolée, zéro dépendance) | 6 fichiers HTML + 4 CSS + générateur + portail `02_MAQUETTES/index.html` | Vues **réellement produites** ; contenu éditorial identique vérifié ; structure HTML valide (0 balise non fermée, 0 id dupliqué) |
| 19 | 2026-11-08T18:03Z / UTC | PH03 — limite de rendu | Agent (constat) | `command -v chromium/firefox` → absents | **Aucune vue examinée visuellement** : rendu, clavier, zoom et lecteur d'écran **NON TESTÉS** ; examen humain requis |
| 20 | 2026-11-08T18:05Z / UTC | PH03 — porte G2 | Agent (analyse) | `01_PHASES/PH03_DIRECTION_ET_COMPARAISON.md` §7 | **EN_ATTENTE_HUMAIN** : recommandation A formulée, aucune direction retenue |

## Entrées à venir

Les entrées suivantes sont ajoutées à chaque phase, décision, blocage, correction et reprise. Le journal ne remplace pas la preuve : il pointe vers elle.
