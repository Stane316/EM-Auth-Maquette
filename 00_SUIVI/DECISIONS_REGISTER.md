# Registre de décisions — instance EM-AUTH-MAQUETTE

Une **proposition d'agent n'est pas une décision humaine**. Statuts utilisés : `PROPOSÉ`, `APPROUVÉ`, `REFUSÉ`, `REMPLACÉ`.
Aucune décision ci-dessous ne peut être citée comme validée par le directeur, le DRI ou l'utilisateur sans trace explicite.

| ID | Date/fuseau | Sujet et choix / justification | Origine / décideur | Statut | Portée / conséquences / preuve |
|---|---|---|---|---|---|
| D-000 | 2026-11-08 / UTC | Instance documentaire ouverte : workflow PH00→PH09, aucune mise en production, aucune PR | Utilisateur (message de lancement) | APPROUVÉ (instruction) | Cadre de toute l'exécution ; preuve : message de lancement de la session |
| D-001 | 2026-11-08 / UTC | **Source de travail** : `Stane316/EM-Auth` @ `main` `a80a478` en **lecture seule** comme référence projet + système ; écriture dans `EM-Auth-Maquette` seulement | Agent (proposition) | **PROPOSÉ** | Conditionne l'affirmation sur l'état du code, des tests et des écrans ; branche `develop` non examinée |
| D-002 | 2026-11-08 / UTC | **DRI** : substitution du dossier `dri/` (13 fichiers) à une archive ZIP non fournie ; annexes `12*`, `13-harnai`, `14`, `15`, `catalogue-*` déclarées **INCONNUES** | Agent (proposition) | **PROPOSÉ** | PH02 ne pourra recommander aucune ressource issue des annexes absentes |
| D-003 | 2026-11-08 / UTC | **Zone d'écriture et de suivi** : racine de `EM-Auth-Maquette` (branche `arena/53c9aa9d-em-auth-maquette`), registres dans `00_SUIVI/`, livrables dans `01_PHASES/`, maquettes dans `02_MAQUETTES/` | Agent (proposition) | **PROPOSÉ** | Aucune écriture dans le dépôt du projet ; modèles du système laissés intacts |
| D-004 | 2026-11-08 / UTC | **Outils** : aucun navigateur ni Figma/Stitch ; prototype **HTML/CSS/JS local** fictif comme substitut, sans dépendance ni service | Agent (proposition) | **PROPOSÉ** | Si refusé → PH04/PH05 classés `EN_ATTENTE_OUTIL`, paquet transférable seulement ; un prototype local ne vaut pas réception Figma |
| D-005 | 2026-11-08 / UTC | **Transmission externe (G3)** : aucune donnée, capture ou document envoyé à un service tiers | Agent (proposition) | **PROPOSÉ** (refus par défaut appliqué) | Stitch/Figma restent inutilisés ; aucun secret, aucune PII, aucun contenu projet transmis |
| D-006 | 2026-11-08 / UTC | **Priorité documentaire** : cahier V3.0 du 2026-11-01 (SHA-256 `25c1e051…f1cf`) seul texte de référence métier ; brief, inventaire E/A et sources historiques = propositions | Constat vérifié + instruction utilisateur | APPROUVÉ (constat) | Toute divergence métier sera signalée et non arbitrée par l'agent |
| D-007 | 2026-11-08 / UTC | **Lot d'écrans** : 4 options soumises (7 / 13 / 17 / 22 écrans) ; option 4 (17 écrans, cœur + retrait) recommandée | Agent (proposition) | **PROPOSÉ** | Détermine le périmètre PH05 et la couverture B03/B05 |
| D-008 | 2026-11-08 / UTC | **Rôles et capacités** : répartition proposée (utilisateur, privilégié, demandeur, approbateur distinct, support, administrateur, responsable sécurité) | Agent (proposition) | **PROPOSÉ** | Aucune capacité n'est approuvée ; E09/A02/A03/A04/A09 en dépendent |
| D-009 | 2026-11-08 / UTC | **Propriétaire de rendu** par écran : thème Keycloak / page BFF / interface React / fenêtre native / procédure | Agent (proposition) | **PROPOSÉ** | B02 exige que les propriétaires non décidés restent « à arbitrer » |
| D-010 | 2026-11-08 / UTC | **Direction visuelle (G2)** : trois pistes produites sur E02 et A03 ; recommandation de l'agent = A, second choix A + rail pour l'administration | Agent (proposition motivée) | **PROPOSÉ** | Sans décision, PH04 ne peut pas établir de système définitif ; B abaisse les cibles à 38 px (à corriger si retenue) |

## Décisions humaines attendues (portes ouvertes)

| Porte | Décisions attendues | Bloque |
|---|---|---|
| G0 | D-001, D-003, D-004 (+ D-002) | production d'écrans, persistance affirmée |
| G1 | lot d'écrans retenus, rôles et propriétaires | PH05 (aucun écran `RETENU` inventé) |
| G2 | piste visuelle structurante | PH04 (système définitif) |
| G3 | politique de transmission SaaS | PH03/PH04 via Stitch/Figma |
| G4 | réception du design system et du prototype | PH09 |
| G5 | tout changement métier, architecture, sécurité | branches concernées |
| G6 | toute écriture dans le dépôt projet, code, installation, service | intégration technique |
