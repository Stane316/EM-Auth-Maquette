# RESSOURCES ET CAPACITÉS — PH00

**Instance :** `EM-AUTH-MAQUETTE` · **Phase :** PH00 · **Statut :** TERMINÉ (sous réserve de la porte G0, voir §7)
**Horodatage de rédaction :** 2026-11-08T17:20Z (fuseau UTC, horloge du bac à sable ; source : `date -Is`)
**Rédigé par :** agent d'orchestration documentaire (Arena Agent Mode) — et non par un humain mandaté.

> Ce document inventorie ce qui est **réellement accessible**, ce qui a été **effectivement lu**, et ce qui est **absent ou non vérifiable**.
> Aucune ressource n'est déclarée disponible sur la base d'une intention.

---

## 1. Environnement d'exécution et droits effectifs

| Élément | Constat vérifié | Commande / preuve |
|---|---|---|
| Système | Linux `e2b.local` 6.1.158+, x86_64, bac à sable isolé | `uname -a` |
| Utilisateur | `user` (non root) | `whoami` |
| Horloge | 2026-11-08T17:15Z, fuseau **UTC** ; fuseau local utilisateur annoncé : UTC | `date -Is` |
| Écriture | Dépôt `EM-Auth-Maquette` inscriptible | test `touch` → OK |
| Espace disque | 21 G, 823 M utilisés, 20 G libres | `df -h /home/user` |
| Réseau sortant | `github.com`, `api.github.com`, `codeload.github.com`, `registry.npmjs.org`, `pypi.org`, `files.pythonhosted.org` | politique du bac à sable |
| Git | 2.39.5 ; identité configurée `Stane316` | `git --version`, `git config user.name` |
| GitHub CLI | `gh` 2.23.0, authentifié | `gh repo view`, `gh api user` → `Stane316` |
| Node / npm | v22.22.3 / 10.9.8 | `node --version` |
| Python | 3.11.2 / pip 23.0.1 | `python3 --version` |
| `pdftotext`, `pypdf`, `pymupdf` | **ABSENTS** | `command -v`, `import` |
| Navigateur (Chromium, Firefox, Chrome) | **ABSENT** | `command -v` |
| Playwright / Vitest / Figma / Stitch | **NON INSTALLÉS, NON AUTORISÉS** | aucune intégration disponible |

**Conséquence directe :** aucune capture d'écran rendue, aucun test navigateur, aucun test clavier/lecteur d'écran, aucune mesure de performance ne pourra être produit dans cette instance sans autorisation d'installation (porte G6). Tout contrôle visuel restera **déclaratif ou non testé** et sera étiqueté comme tel.

---

## 2. Lecture du PDF officiel V3 (contrainte de méthode levée sans installation)

`pdftotext` étant absent, le PDF a été lu **en lecture seule** par extraction textuelle de la page distante, sans installation ni conversion du fichier local :

- Fichier local vérifié : `EM_AUTH_PROTOTYPING_SYSTEM/01_PROJECT_CONTEXT/CAHIER_DES_CHARGES_OFFICIEL_EM_Auth_DEPLOY.pdf`
- **SHA-256 observé :** `25c1e0513c80461e5855ae50c7dd08733ce45bcb684604bd39b9fc8eb931f1cf`
- **Empreinte documentée** dans `Blueprint/Documentation/00-REFERENCE-OFFICIELLE-CAHIER-DES-CHARGES.md`, `Blueprint/Audit-transfert/00-RAPPORT-AUDIT.md` et `EM_AUTH_PROTOTYPING_SYSTEM/12_VALIDATION/validate_system.py`
- **Conclusion : empreintes IDENTIQUES** → la copie embarquée dans le système de prompts est bien le cahier V3.0 du 1er novembre 2026, 14 pages, aucune divergence à signaler.
- Lecture effective : intégralité des 5 blocs de texte (sections 1 à 12 + annexes A et B), soit 14 pages.
- **Réserve :** extraction textuelle automatique ; la mise en page, les figures (Figure 1 parcours, Figure 2 architecture, Figure 3 calendrier) et les tableaux ont été lus comme texte, pas contrôlés visuellement.

---

## 3. Racine du système de prompts — localisation et unicité

| Élément | Constat |
|---|---|
| Recherche | `find /` limité aux ressources fournies ; `gh api search/code` sur le compte `Stane316` |
| Occurrence trouvée | **une seule** : `Stane316/EM-Auth` (branche `main`) → `EM_AUTH_PROTOTYPING_SYSTEM/` |
| Copies concurrentes | **aucune** détectée dans les ressources accessibles |
| Empreinte de l'arbre de référence | commit `a80a47855277ae851679790b56d7e640c7e9b41d` (2026-11-08 18:09:37 +0100, auteur `Stane`, message « first commit ») |
| Volume | 77 fichiers (00_MASTER_ORCHESTRATOR … 99_HISTORIQUE_ET_AUDIT), 1,2 Mo environ |
| Empreintes unitaires | `00_SUIVI/EMPREINTES_SOURCES.txt` (SHA-256 fichier par fichier) |

**Écart notable :** le paramètre de lancement indiquait « DRI : racine du repo » et « Racine du système : EM_AUTH_PROTOTYPING_SYSTEM » en supposant leur présence dans le dépôt de travail. Le dépôt de travail assigné (`Stane316/EM-Auth-Maquette`, branche `arena/53c9aa9d-em-auth-maquette`, commit `97fe67e`) ne contenait **qu'un fichier `README.md` d'une ligne**. Le système, la DRI et le projet se trouvent dans le dépôt **`Stane316/EM-Auth`**, qui est public et donc lisible en lecture seule. Décision proposée D-001 (§7).

### Documents du système lus intégralement à ce stade

| Document | Empreinte SHA-256 (début) | Statut |
|---|---|---|
| `00_MASTER_ORCHESTRATOR/MASTER_ORCHESTRATION_PROMPT.md` | `35c825b6d8e59c3f…` | lu |
| `00_MASTER_ORCHESTRATOR/EXECUTION_PROTOCOL.md` | `63b1f6beeafcee7a…` | lu |
| `00_MASTER_ORCHESTRATOR/WORKFLOW_INDEX.md` | `5d04078378850aea…` | lu |
| `00_MASTER_ORCHESTRATOR/PROMPT_DEPENDENCY_MAP.md` | `e03ec80ed7f7c84e…` | lu |
| `00_MASTER_ORCHESTRATOR/QUICK_START_GUIDE.md` | `7b29348f0a402bd5…` | lu |
| `03_EXECUTION_WORKFLOW/PH00_INITIALISATION.md` | `83450dbbc6f32b0b…` | lu |
| `10_TOOL_INITIALIZATION/04C_PROMPT_INITIATION_CODE_AGENTS.md` | `904233979734dcee…` | lu (audit lecture seule, appliqué en §5) |
| `09_EXECUTION_RECORDS/*.md` (5 modèles + README) | voir manifeste | lus ; copies de travail initialisées |

---

## 4. DRI — inventaire effectif et annexes manquantes

Dossier accessible : `dri/` à la racine de `Stane316/EM-Auth`. **Aucune archive ZIP de DRI n'a été fournie** ; le dossier tient lieu de source, conformément à la possibilité offerte par PH00 (« DRI accessible ou substitution acceptée »), substitution à confirmer (D-002).

**Présents (13 fichiers) :** `00-README.md`, `01-global-resource-map.md`, `02-taxonomy.md`, `03-platform-directory.md`, `04-resource-catalog.md`, `05-technology-map.md`, `06-ai-resource-map.md`, `07-use-case-index.md`, `08-decision-matrix.md`, `09-resource-stack.md`, `10-verticals.md`, `11-cost-at-scale.md`, `catalogue-dri.csv` (177 ressources consolidées).

**Annoncés par `00-README.md` mais ABSENTS de l'arbre** — ne pas affirmer les avoir lus :
`12-student-plans.md`, `12a-student-catalog.md`, `12b-student-africa.md`, `13-harnai/*`, `14-harnai-recommendations.md`, `15-harnai-custom-mcp.md`, `harnai-moc.md`, `catalogue-student.csv`, `catalogue-harnai.csv`, `data/`.

**Chemin `Blueprint/dri` mentionné dans le prompt maître :** inexistant dans l'arbre observé ; la DRI est à `dri/` à la racine. Écart de chemin signalé, sans conséquence : la source existe.

**Portée du DRI pour ce projet :** la DRI est une bibliothèque de ressources numériques réutilisables, non un dossier de conception EM Auth. Toute réutilisation d'une ressource qui y figure exige une vérification de licence, version, compatibilité, maintenance et coût **au moment de l'usage** — les labels du DRI datent du 5 octobre 2026 et ne constituent pas une vérification actuelle.

---

## 5. Projet, code et tests réellement disponibles (audit lecture seule — 04C)

| Élément | Constat vérifié | Ce que cela ne prouve pas |
|---|---|---|
| `app/` | BFF Node.js « synthétique » : `server.mjs`, `lib/` (oidc, session, csrf, authz, keycloak, mfa), `lab/s05-lab.mjs`, `fixtures/` fictives, `tests/` (7 fichiers) et `tests-s05/` (9 fichiers) | aucun résultat de test n'est démontré par la présence des fichiers |
| `app/package.json` | dépendances déclarées : `@simplewebauthn/browser`, `@simplewebauthn/server`, `express`, `openid-client` — **aucune dépendance React/Vite** | le cahier V3 retient React 19/Vite pour l'interface cible : l'interface n'existe pas encore |
| `bench/` | `compose.yaml`, `fixtures`, `lib`, `tests`, README | la présence de la configuration ne prouve ni image épinglée ni banc opérationnel ici |
| Rapports racine | `EM-AUTH-S04-TESTS.txt`, `EM-AUTH-T10-VERT.txt` (`1 test, 1 pass`), `EM-AUTH-DIGESTS-*.txt`, `EM-AUTH-ENV-CHECK`, `-PROC-CHECK`, `-DISK-CHECK` | **résultats déclarés** par le dépôt, **non rejoués** dans cette instance |
| Digests d'images | Keycloak `26.8.1` → `sha256:3f3c5f8e…`, Postgres `18.6` → `sha256:3a426452…` (2026-11-04) | un digest identifie des octets, pas une sécurité |
| Documents `Blueprint/` | Audit-reprise, Audit-transfert, Audit-agentique, Consolidation-Partie-I, Documentation, Preparation-developpement, Sprints | documents d'analyse historiques, non rejoués ; leur verdict « NOT READY » du 4 novembre ne vaut pas pour aujourd'hui sans revérification |
| Branche `main` uniquement | l'arbre observé contient `app/` et `bench/` ; le brief mentionne une branche `develop` plus riche (352 fichiers) | l'état `develop` **n'a pas été examiné ici** : divergence possible, à arbitrer (D-001) |

**Aucun fichier du dépôt de référence n'a été modifié, aucun test n'a été lancé, aucune installation effectuée, aucun service démarré.**

---

## 6. Zone de travail, zone d'écriture et suivi

| Élément | Constat |
|---|---|
| Dépôt assigné à la session | `Stane316/EM-Auth-Maquette`, branche `arena/53c9aa9d-em-auth-maquette`, commit de départ `97fe67e` |
| Contenu initial | `README.md` uniquement — aucune collision, aucun écrasement possible |
| Zone d'écriture utilisée | **racine de ce dépôt** : c'est la seule zone inscriptible persistante de la session, et elle est **isolée du dépôt du projet** (`EM-Auth`), donc conforme à l'esprit du protocole §4 |
| Registres | copies de travail dans `00_SUIVI/` — les modèles de `09_EXECUTION_RECORDS/` ne sont **pas** modifiés |
| Preuves | `00_SUIVI/EMPREINTES_SOURCES.txt` (156 lignes, SHA-256) |
| Référence distante | clone de lecture **hors dépôt**, `/tmp/em-auth-ref`, commit épinglé `a80a478` ; jetable et reproductible, jamais utilisé pour écraser un local |
| Secrets / PII | aucun secret, aucune donnée personnelle, aucune capture réelle dans les traces |

---

## 7. Porte G0 — points soumis à décision humaine

Ces points ne sont pas bloquants pour la lecture et l'analyse (PH01/PH02), mais le deviennent pour toute production d'écrans et pour l'affirmation d'une réception.

| ID | Question | Proposition par défaut de l'agent |
|---|---|---|
| D-001 | **Source de travail** : le dépôt assigné est vide ; le projet réel est `Stane316/EM-Auth` (branche `main` lue ici). Faut-il travailler sur `main` (commit `a80a478`), sur une autre branche/commit, ou sur une archive ? | Lecture seule de `main@a80a478` comme référence ; écriture uniquement dans `EM-Auth-Maquette` |
| D-002 | **DRI** : substitution du dossier `dri/` (13 fichiers, annexes 12–15 absentes) à une archive ZIP attendue. | Accepter `dri/` comme source ; annexes absentes = INCONNUES, non exploitées |
| D-003 | **Zone d'écriture et de suivi** : la racine de `EM-Auth-Maquette` (branche de session), avec registres dans `00_SUIVI/`. | Cette zone, sans écriture dans `EM-Auth` |
| D-004 | **Outils** : aucun navigateur, aucun Figma, aucun Stitch, aucune installation autorisée. | Prototype HTML/CSS/JS local fictif, sans dépendance ni service, comme substitut **accepté explicitement** ; Figma/Stitch classés `EN_ATTENTE_OUTIL` |
| D-005 | **Transmission externe (G3)** : aucune donnée ne doit être envoyée à un SaaS (Stitch, Figma, autre). | Refus par défaut ; rien n'est transmis |

**Aucune de ces propositions n'est appliquée comme décision approuvée** : le registre de décisions les porte au statut `PROPOSÉ`.

---

## 8. Synthèse de la porte PH00

| Critère de la porte | État |
|---|---|
| Racine du système identifiée et unique | **OUI** — `EM-AUTH/EM_AUTH_PROTOTYPING_SYSTEM` @ `a80a478` |
| Index et ressources indispensables accessibles | **OUI** — index, protocole, carte, quick start, PH00, 04C, modèles lus |
| Cahier V3 officiel disponible et empreinte concordante | **OUI** — SHA-256 identique à l'empreinte documentée |
| DRI accessible ou substitution acceptée | **ACCESSIBLE**, substitution **à confirmer** (D-002) |
| Zone d'écriture autorisée | **UTILISÉE**, autorisation **à confirmer** (D-003) |
| Conflit G0 | **OUI, partiel** — dépôt de travail vide, source réelle dans un autre dépôt (D-001) |

**Verdict PH00 : TERMINÉ pour la découverte ; la porte G0 reste OUVERTE sur D-001/D-003/D-004.** Les phases suivantes sont menées en analyse, sans production d'écran avant arbitrage du lot (G1).
