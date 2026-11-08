# Index d'exécution — référence normative de l'orchestration

Tous les chemins ci-dessous sont relatifs à la racine `EM_AUTH_PROTOTYPING_SYSTEM/`. **Lire chaque fichier en entier**, pas seulement son titre. Si un fichier est inaccessible, bloquer et demander accès. Un prompt signifie : appliquer ses instructions et vérifier les sorties, sans supposer qu'un outil externe est accessible. L'ordre et les portes sont détaillés dans [le protocole](EXECUTION_PROTOCOL.md).

## Lecture initiale obligatoire

1. `00_MASTER_ORCHESTRATOR/MASTER_ORCHESTRATION_PROMPT.md`, `00_MASTER_ORCHESTRATOR/EXECUTION_PROTOCOL.md`, ce fichier, `00_MASTER_ORCHESTRATOR/PROMPT_DEPENDENCY_MAP.md` et `00_MASTER_ORCHESTRATOR/QUICK_START_GUIDE.md`.
2. `01_PROJECT_CONTEXT/CAHIER_DES_CHARGES_OFFICIEL_EM_Auth_DEPLOY.pdf`, `01_PROJECT_CONTEXT/01_EM_AUTH_PRODUCT_AND_DESIGN_BRIEF.md` ; consulter les sources référencées pertinentes et toute version officielle plus récente autorisée, sans remplacer automatiquement le PDF.
3. `02_DESIGN_FOUNDATION/02_EM_AUTH_VISUAL_DIRECTION_AND_REFERENCES.md`, `02_DESIGN_FOUNDATION/03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md`, `06_QUALITY_ASSURANCE/09_EM_AUTH_PROTOTYPE_ACCEPTANCE_CRITERIA.md`.
4. Les cinq modèles `09_EXECUTION_RECORDS/` ; puis la DRI réellement fournie et l'état du projet à examiner suivant PH00–02. `99_HISTORIQUE_ET_AUDIT/` préserve le guide et workflow antérieurs, à consulter pour provenance et continuité, non comme séquence concurrente.

## Registre canonique des phases

| Ordre | Phase obligatoire | Prompt(s) à lire et appliquer en plus du fichier PH | Entrées / porte d'entrée | Sorties / contrôle obligatoire |
|---|---|---|---|---|
| 00 | [PH00 Initialisation](../03_EXECUTION_WORKFLOW/PH00_INITIALISATION.md) | [Code Agents](../10_TOOL_INITIALIZATION/04C_PROMPT_INITIATION_CODE_AGENTS.md) pour audit lecture seule | accès, ressources, G0 si choix ambigu | cartographie, capacités, sources/empreintes, suivi initial |
| 01 | [PH01 Compréhension](../03_EXECUTION_WORKFLOW/PH01_COMPREHENSION.md) | brief, inventaire, PDF + sources techniques accessibles | PH00 | compréhension, écarts dépôt/docs, registre décisions, G1 avant lot |
| 02 | [PH02 DRI](../03_EXECUTION_WORKFLOW/PH02_DRI.md) | direction/références et DRI effective | PH01 | matrice retenus/non retenus, licences inconnues et utilisation continue |
| 03 | [PH03 Fondation](../03_EXECUTION_WORKFLOW/PH03_FONDATION.md) | [direction](../05_SPECIALIZED_PROMPTS/01_DIRECTION_ARTISTIQUE.md) ; [init Stitch](../10_TOOL_INITIALIZATION/04A_PROMPT_INITIATION_GOOGLE_STITCH.md) si Stitch autorisé/disponible | PH02 ; G3 avant SaaS | propositions comparables, G2 avant sélection validée |
| 04 | [PH04 Système](../03_EXECUTION_WORKFLOW/PH04_DESIGN_SYSTEM.md) | [design system](../05_SPECIALIZED_PROMPTS/03_DESIGN_SYSTEM.md), [init Figma](../10_TOOL_INITIALIZATION/04B_PROMPT_INITIATION_FIGMA.md) si Figma autorisé/disponible | PH03 + G2 ; G3 avant SaaS | tokens/composants, états, preuves et G4 structure |
| 05 | [PH05 Écrans](../03_EXECUTION_WORKFLOW/PH05_ECRANS.md) | tous les prompts [04_SCREEN_SPECIFIC_PROMPTS](../04_SCREEN_SPECIFIC_PROMPTS/) ; [responsive](../05_SPECIALIZED_PROMPTS/05_RESPONSIVE.md), [états sécurité](../05_SPECIALIZED_PROMPTS/07_ETATS_SECURITE.md) | PH04 + G1 ; ordre ci-dessous | écrans retenus, états, contrôle par écran, couverture et cohérence |
| 06 | [PH06 Parcours](../03_EXECUTION_WORKFLOW/PH06_PARCOURS.md) | [parcours](../05_SPECIALIZED_PROMPTS/02_PARCOURS.md) | PH05 | transitions, liens réels si outil disponible, simulation et revue des impasses |
| 07 | [PH07 Audits](../03_EXECUTION_WORKFLOW/PH07_AUDITS.md) | [QA commun et 8 modules](../06_QUALITY_ASSURANCE/05_EM_AUTH_QUALITY_ASSURANCE_PROMPTS.md), [accessibilité](../05_SPECIALIZED_PROMPTS/06_ACCESSIBILITE.md) | PH06 | registre d'écarts, corrections autorisées, preuves et NON TESTÉ |
| 08 | [PH08 Handoff](../03_EXECUTION_WORKFLOW/PH08_HANDOFF.md) | [handoff](../07_HANDOFF/06_EM_AUTH_DESIGN_TO_DEVELOPMENT_HANDOFF.md), [contenu/handoff](../05_SPECIALIZED_PROMPTS/08_CONTENU_ET_HANDOFF.md) | PH07 | paquet versionné, traçabilité, contrats et limites inconnues |
| 09 | [PH09 Réception](../03_EXECUTION_WORKFLOW/PH09_VALIDATION.md) | [critères B01–B10](../06_QUALITY_ASSURANCE/09_EM_AUTH_PROTOTYPE_ACCEPTANCE_CRITERIA.md) | PH08 | bilan, preuves, portes, décision humaine G4 et état prêt/non prêt |

`05_SPECIALIZED_PROMPTS/04_FINITIONS_UI.md` est complémentaire ; les sept autres sont obligatoires selon le tableau. Stitch/Figma/Code Agents sont des instructions d'outil et non des phases autonomes de remplacement : si outil non disponible ou transfert non autorisé, appliquer le protocole EN_ATTENTE et donner le paquet manuel.

## Plan d'ordonnancement des écrans — PH05

Lire intégralement **tous les 22 fichiers** `04_SCREEN_SPECIFIC_PROMPTS/{ID}.md` à PH05, puis relire chaque fichier juste avant son traitement. Classer chaque ID avec la décision G1 ; aucun `RETENU` inventé. Traiter les `RETENU` dans l'ordre de groupes ci-dessous, en créant d'abord les composants communs PH04, puis utiliser les transitions PH06. Dépendances de navigation sont indicatives, non des conditions d'implémentation serveur.

| Groupe | Séquence précise | Préconditions et contrôle |
|---|---|---|
| État transversal | E11 → E13 → E12 | statuts inconnu/panne/session partagés ; aides sans contact inventé |
| Accès | E02 → E03 → E04 → E05 → E06 | identifier avant moyens ; preuve forte/natif ; retour et portée RP |
| Qualification/enrôlement | A01 → A02 → E01 → A08 | mandat/identité avant invitation ; fenêtre native annotée |
| Récupération et action sensible | E07 → A03 → E08 → E09 → A09 | preuve indépendante, second acteur et rôle, aide, urgence sous mandat |
| Retrait | A04 → E10 | mandat puis statut par cible ; toutes les cibles doivent être observées |
| Exploitation / sortie | A05 → A06 → A07 | outils/procédures et rôle à décider, aucune API présumée |

Si une dépendance n'est pas retenue, documenter le support externe autorisé ou bloquer le parcours, sans créer de fonctionnalité pour combler le vide. Tout ID `DIFFÉRÉ/HORS_PÉRIMÈTRE` conserve raison, décision et conséquence ; non traité ≠ réalisé. Vérifier 13 E + 9 A = 22, puis tous les écrans réellement ajoutés par décision humaine.

## Prompts non automatiques

[Menu complémentaire](../08_OPTIONAL_PROMPTS/OPTIONAL_PROMPT_CATALOG.md) : finition, animation, retouche écran, mobile, composant, audit ciblé. Un correctif indispensable peut mobiliser un prompt pertinent dans le périmètre autorisé, avec traçabilité ; jamais d'exécution automatique de l'ensemble des options.
