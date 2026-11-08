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
| 18 | 2026-11-08T18:00Z / UTC | PH03 — production des vues A/B/C sur E02 et A03 | Agent (écriture zone isolée, zéro dépendance) | 6 fichiers HTML + 4 CSS + générateur + portail `02_MAQUETTE_HTML_V1/index.html` | Vues **réellement produites** ; contenu éditorial identique vérifié ; structure HTML valide (0 balise non fermée, 0 id dupliqué) |
| 19 | 2026-11-08T18:03Z / UTC | PH03 — limite de rendu | Agent (constat) | `command -v chromium/firefox` → absents | **Aucune vue examinée visuellement** : rendu, clavier, zoom et lecteur d'écran **NON TESTÉS** ; examen humain requis |
| 20 | 2026-11-08T18:05Z / UTC | PH03 — porte G2 | Agent (analyse) | `01_PHASES/PH03_DIRECTION_ET_COMPARAISON.md` §7 | **EN_ATTENTE_HUMAIN** : recommandation A formulée, aucune direction retenue |
| 21 | 2026-11-08T18:25Z / UTC | Portes G0/G1/G2 — décisions utilisateur | Décideur humain | Réponses du 2026-11-08 | **D-001** précisée (dépôt de travail = `EM-Auth-Maquette`), **D-004** approuvée (serveur statique local), **D-007** approuvée (lot), **D-010** approuvée (direction A) |
| 22 | 2026-11-08T18:30Z / UTC | Aperçu local | Agent (service autorisé) | `python3 -m http.server 8000 --bind 0.0.0.0` | Serveur statique lancé, aucune installation, aucune donnée externe ; vues consultables |
| 23 | 2026-11-08T18:35Z / UTC | PH04 — système de design | Agent (écriture zone isolée) | `systeme/tokens.css`, `base.css`, `composants.css`, `galerie.html` | Jetons, composants, variantes et états créés ; 10 paires de contraste calculées, toutes ≥ 4,5:1 |
| 24 | 2026-11-08T18:40Z / UTC | PH05 — lecture des 22 prompts d'écran | Agent (lecture) | `04_SCREEN_SPECIFIC_PROMPTS/*` | 22 fichiers lus ; gabarit commun vérifié ; états et traçabilité relevés |
| 25 | 2026-11-08T18:45Z / UTC | PH05 — production de 16 écrans | Agent (écriture zone isolée) | `02_MAQUETTE_HTML_V1/ecrans/` (16 pages + index) | 60 états documentés ; contrôles structure/labels/liens exécutés |
| 26 | 2026-11-08T18:50Z / UTC | PH05 — correctif de comptage | Agent | PH01 §3 et PH05 §2 | Option de lot annoncée « 17 » corrigée en **16** ; E09 reste à arbitrer ; aucun écran inventé pour atteindre un chiffre |
| 27 | 2026-11-08T18:55Z / UTC | PH06 — parcours | Agent | `02_MAQUETTE_HTML_V1/parcours.html`, `01_PHASES/PH06_MATRICE_PARCOURS.md` | 23 transitions documentées ; 156 liens internes vérifiés, **0 cassé** |
| 28 | 2026-11-08T19:05Z / UTC | PH07 — audit outillé | Agent | `systeme/audit_structurel.py` → `01_PHASES/PH07_PREUVES_CONTROLES.txt` | 15 contrôles sur 26 pages ; 3 défauts réels détectés |
| 29 | 2026-11-08T19:10Z / UTC | PH07 — corrections et retest | Agent (périmètre autorisé) | h1 dupliqué (17 pages), légende de tableau, nommage du lien d'évitement | Corrigés ; **retest : 0 écart** ; aucun P0 |
| 30 | 2026-11-08T19:25Z / UTC | PH08 — paquet de transfert | Agent | `04_HANDOFF/PAQUET_HANDOFF.md` | Versions, jetons, matrice écran/contrat, inconnues, licences, instructions Figma manuelles |
| 31 | 2026-11-08T19:40Z / UTC | PH09 — bilan de réception | Agent (évaluation) | `01_PHASES/PH09_BILAN_RECEPTION.md` | **NON PRÊT** : B03 partiel, B08 et B09 non satisfaits ; 3 P1 ouverts ; G4 non prononcée |

| 32 | 2026-11-08T20:10Z / UTC | Restauration du DRI | Agent | `dri/` (13 fichiers copiés depuis la seule copie existante) | Empreintes SHA-256 relevées ; absence constatée dans le dépôt avant restauration |
| 33 | 2026-11-08T20:20Z / UTC | PH02 v2 — analyse complète du DRI | Agent | `01_PHASES/PH02_SELECTION_DRI_v2.md` | 177 lignes de catalogue analysées ; 16 familles, 24 natures, classes de licence ; React Bits `MIT + Commons Clause` identifié et écarté (D-012) |
| 34 | 2026-11-08T20:25Z / UTC | Conventions et renommages | Agent | `00_SUIVI/CONVENTIONS.md` · `02_MAQUETTES`→`02_MAQUETTE_HTML_V1` · `03_HANDOFF`→`04_HANDOFF` · création `03_INTERFACE_REACT` | 10 fichiers de référence mis à jour ; **aucun fichier supprimé** (D-016) |
| 35 | 2026-11-08T20:30Z / UTC | Outillage de l'interface | Agent (autorisé) | `03_INTERFACE_REACT/package.json` | `npm install` : 80 paquets ; React 19.3.1, Vite 7.3.7, TS 5.9.3, Motion, Lucide, fontsource (D-011) |
| 36 | 2026-11-08T21:05Z / UTC | PH04 v2 — système de design en code | Agent | `src/styles/tokens.css`, `base.css`, `components/ui/` (9 primitives) | 15 paires de contraste déclarées puis recalculées ; 0 couleur hors jetons |
| 37 | 2026-11-08T21:50Z / UTC | PH05 v2 — 17 écrans, 71 états | Agent | `src/features/` (17 écrans + portail + système + dossier) | États adressables par URL ; catalogue `donnees/etats.ts` comme source unique |
| 38 | 2026-11-08T22:05Z / UTC | PH07 v2 — audit outillé | Agent | `scripts/audit.mjs` | **3 défauts réels détectés** : ratio de contraste erroné (8,9 → 9,69), couleurs en dur dans 6 feuilles, faux positif réseau → corrigés |
| 39 | 2026-11-08T22:20Z / UTC | PH07 v2 — retest | Agent | `npm run audit` | **6/6 contrôles réussis** après correction |
| 40 | 2026-11-08T22:35Z / UTC | Test de rendu hors navigateur | Agent | `scripts/rendu.mjs` + `vite.rendu.config.ts` | 21 routes : échec initial (`process is not defined`, jsdom sans modules ES) → variante IIFE ; **29/29 routes rendues, 0 erreur JS** |
| 41 | 2026-11-08T22:45Z / UTC | PH08 v2 — handoff technique | Agent | `01_PHASES/PH08_HANDOFF_TECHNIQUE.md` | Procédure d'ajout d'écran, versions installées, dette assumée, ce qui n'est pas réutilisable |
| 42 | 2026-11-08T22:55Z / UTC | PH09 v2 — réception interne | Agent (évaluation) | `01_PHASES/PH09_BILAN_RECEPTION_v2.md` | **PRÊT POUR DÉMONSTRATION / NON PRÊT POUR RÉCEPTION CLIENT** ; UX-1 levé ; 0 P0, 2 P1 |

| 43 | 2026-11-08T23:10Z / UTC | Transfert du référentiel de prompts dans le dépôt | Agent | `05_SYSTEME_DOCUMENTAIRE/` | 77 fichiers, 1,3 Mo copiés depuis `EM_AUTH_PROTOTYPING_SYSTEM` ; plus aucune affirmation d'indisponibilité |
| 44 | 2026-11-08T23:20Z / UTC | v3 — contrats et configuration | Agent | `src/config/env.ts`, `src/services/contracts/` | Types DTO, catalogue S05 (29 codes, texte contractuel), politique S05 lue depuis le JSON du projet |
| 45 | 2026-11-08T23:35Z / UTC | v3 — backend de démonstration | Agent | `src/services/demo/backendDemo.ts` | Règles appliquées : anti-énumération, OTP seul refusé, auto-approbation refusée, approbateur habilité, preuve fraîche, cible non observable non traitée |
| 46 | 2026-11-08T23:50Z / UTC | v3 — client HTTP | Agent | `src/services/http/{client,authHttp,backofficeHttp}.ts` | CSRF, cookie HttpOnly, `RESEAU`/`CSRF_INVALIDE`/`SESSION_EXPIREE` ; contrats absents → `NON_SUPPORTE` |
| 47 | 2026-11-09T00:05Z / UTC | v3 — session, garde, notifications, soumission | Agent | `src/session/`, `src/hooks/useSoumission.ts`, `src/components/ui/Notifications.tsx` | Fraîcheur calculée à la réception, jamais au rendu ; anti-double-soumission |
| 48 | 2026-11-09T00:20Z / UTC | v3 — parcours de bout en bout | Agent | `src/features/Parcours.tsx` (+ CSS) | 8 étapes exécutées réellement, journal des appels avec code et statut |
| 49 | 2026-11-09T00:35Z / UTC | v3 — écrans branchés | Agent | `E02Identification`, `E03MoyenAutorise`, `E06FinDeSession` | E02 : mot de passe non collecté (saisie Keycloak) ; E03 : facteurs du service ; E06 : déconnexion réelle |
| 50 | 2026-11-09T00:50Z / UTC | v3 — tests exécutés | Agent | `tests/` (4 fichiers) | **44 tests, 44 réussis** : contrat S05, 10 règles du backend, 3 parcours de test, garde d'accès ; 3 défauts réels trouvés et corrigés (négation OTP inversée, attente manquante, sélecteur ambigu) |
| 51 | 2026-11-09T01:05Z / UTC | v3 — lint | Agent | `eslint.config.js` | 2 erreurs réelles (`setState` dans un effet, `Date.now()` au rendu) → `SessionProvider` restructuré → **0 erreur** |
| 52 | 2026-11-09T01:15Z / UTC | v3 — audit et rendu mis à jour | Agent | `scripts/audit.mjs`, `scripts/rendu.mjs`, `vite.rendu.config.ts` | Contrôle 5 reformulé (appels confinés à `services/http`) : **6/6** ; rendu cassé par le fournisseur de session (19/29) → session de démonstration pré-ouverte pour le test seul : **30/30** |
| 53 | 2026-11-09T01:30Z / UTC | v3 — documentation | Agent | `README.md` (12 sections), `docs/` (4 documents), `.env.example` | Commandes vérifiées, chiffres issus des exécutions, limites déclarées |
| 54 | 2026-11-09T01:40Z / UTC | v3 — contrôle complet | Agent | `npm run controle` | lint 0 · typecheck 0 · tests 44/44 · audit 6/6 · rendu 30/30 · build 616,81 kB (188,11 kB gzip) |

| 55 | 2026-11-09T02:10Z / UTC | Constat de deux dépôts non liés | Agent (constat) | `00_SUIVI/DECISIONS_REGISTER.md` (D-022) | `origin` du poste du directeur = `EM-Auth_Maquette` (souligné) ; merge refusé : histoires non liées. **Aucune opération destructive exécutée** |

## Entrées à venir

Les entrées suivantes sont ajoutées à chaque phase, décision, blocage, correction et reprise. Le journal ne remplace pas la preuve : il pointe vers elle.
