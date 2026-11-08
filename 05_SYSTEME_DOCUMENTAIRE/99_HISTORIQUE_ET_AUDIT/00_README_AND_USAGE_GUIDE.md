# EM Auth — système de prompts de prototypage

Dossier de conception en français pour passer **du cadrage aux explorations Stitch, au prototype Figma, puis au handoff vers agents de développement**, sous décisions humaines. Aucun fichier du dépôt analysé n'a été modifié. Rien dans ce dossier n'est une maquette déjà réalisée, un test exécuté, une approbation produit ou une preuve de sécurité.

## Démarrer en 5 étapes

1. Lire [01 — audit et brief](../01_PROJECT_CONTEXT/01_EM_AUTH_PRODUCT_AND_DESIGN_BRIEF.md), puis confirmer les questions ouvertes ; le [PDF V3 officiel](../01_PROJECT_CONTEXT/CAHIER_DES_CHARGES_OFFICIEL_EM_Auth_DEPLOY.pdf) prévaut. Dates de documents/commits et date de session sont contradictoires : clarifier avant toute décision chronologique.
2. Choisir une direction parmi les [références et pistes](../02_DESIGN_FOUNDATION/02_EM_AUTH_VISUAL_DIRECTION_AND_REFERENCES.md), et le premier lot dans [l'inventaire](../02_DESIGN_FOUNDATION/03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md). E01–E13 sont historiques proposés ; A01–A09 sont des besoins regroupés à titre de propositions, non écrans obligatoires déjà approuvés.
3. Après autorisation de transmission et sélection de données fictives uniquement, copier [04A — Stitch](../10_TOOL_INITIALIZATION/04A_PROMPT_INITIATION_GOOGLE_STITCH.md). Comparer les pistes et choisir humainement avant de créer par petits lots.
4. Avec [04B — Figma](../10_TOOL_INITIALIZATION/04B_PROMPT_INITIATION_FIGMA.md), organiser pages, composants, états, puis relier les parcours manuellement ou par fonctionnalité disponible ; faire l'[audit](../06_QUALITY_ASSURANCE/05_EM_AUTH_QUALITY_ASSURANCE_PROMPTS.md) et valider les [critères](../06_QUALITY_ASSURANCE/09_EM_AUTH_PROTOTYPE_ACCEPTANCE_CRITERIA.md).
5. Remettre le [handoff](../07_HANDOFF/06_EM_AUTH_DESIGN_TO_DEVELOPMENT_HANDOFF.md). Pour une éventuelle implémentation, utiliser [04C — agents](../10_TOOL_INITIALIZATION/04C_PROMPT_INITIATION_CODE_AGENTS.md) en lecture seule, demander un accord distinct avant tout changement.

## Index du dossier

| Fichier | Usage |
|---|---|
| [01 Brief et sources](../01_PROJECT_CONTEXT/01_EM_AUTH_PRODUCT_AND_DESIGN_BRIEF.md) | Statut produit, observations du dépôt, contradictions, questions. |
| [02 Direction et références](../02_DESIGN_FOUNDATION/02_EM_AUTH_VISUAL_DIRECTION_AND_REFERENCES.md) | Trois pistes, benchmarks, DRI et sélection conditionnelle. |
| [03 Inventaire](../02_DESIGN_FOUNDATION/03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md) | Traçabilité, états, parcours E01–E13 + propositions A01–A09. |
| [04A Stitch](../10_TOOL_INITIALIZATION/04A_PROMPT_INITIATION_GOOGLE_STITCH.md) / [04B Figma](../10_TOOL_INITIALIZATION/04B_PROMPT_INITIATION_FIGMA.md) / [04C agents](../10_TOOL_INITIALIZATION/04C_PROMPT_INITIATION_CODE_AGENTS.md) | Prompts initiaux distincts. |
| [05 Audits](../06_QUALITY_ASSURANCE/05_EM_AUTH_QUALITY_ASSURANCE_PROMPTS.md) | UX, UI, sécurité, a11y, performance, SEO, compatibilité, cohérence. |
| [06 Handoff](../07_HANDOFF/06_EM_AUTH_DESIGN_TO_DEVELOPMENT_HANDOFF.md) | Contrat de transfert, matrice et intégration après accord. |
| [07 Workflow](07_EM_AUTH_PROTOTYPING_WORKFLOW.md) | Étapes, outils, livrables et checkpoints. |
| [08 Continuité](08_EM_AUTH_PROMPT_REMINDERS_AND_CONTINUITY.md) | Rappels courts et reprise de session. |
| [09 Réception](../06_QUALITY_ASSURANCE/09_EM_AUTH_PROTOTYPE_ACCEPTANCE_CRITERIA.md) | Critères bloquants, améliorations et preuves. |
| [10 Prompts par écran](../04_SCREEN_SPECIFIC_PROMPTS) | Un fichier pour chacun des 22 écrans proposés ; index et liens détaillés dans 03. |
| [11 Prompts spécialisés](../05_SPECIALIZED_PROMPTS) | Direction, parcours, composants, finitions, responsive, accessibilité, états de sécurité et handoff. |

## Mode d'emploi d'un prompt

Ouvrir le fichier, vérifier **outil, phase, documents et autorisations**, joindre uniquement les extraits autorisés, puis copier le texte sous « Prompt ». Vérifier le résultat demandé et compléter la preuve. Si un outil ne peut pas lire une pièce jointe ou créer une interaction, faire l'étape manuellement ; ne jamais considérer une sortie non vue comme validée. Les écrans fictifs n'ouvrent pas un compte, ne vérifient pas un facteur et ne prouvent pas une révocation.

## Limites et sécurité

- Analyse documentaire du snapshot distant `develop` à `d7864e247185596ce7faa8c94f5f4409d10fe78b` : du code BFF et MFA de laboratoire est présent ; aucune exécution de test pour ce dossier. Les bilans de sprint rapportent leurs propres résultats et lacunes.
- Ce dossier contient des liens vers le PDF et les sources historiques **hors dossier**. Si vous transférez uniquement l'archive du dossier, ajouter séparément les documents nécessaires ou substituer des extraits autorisés ; les liens relatifs vers les sources externes au dossier ne suivront pas.
- Vérifier confidentialité, droits d'utilisation, disponibilité de Stitch/Figma, export/import, abonnement et coût avant usage ; aucune hypothèse de plan gratuit, de coût nul ou de fonctionnalité disponible. Éviter l'envoi de secrets, jetons, données personnelles et captures réelles à un service SaaS.
- Aucun push automatique protégé ni PR ; toute fusion, rebase, cherry-pick, reset ou action affectant autrui nécessite une autorisation expresse. La présente mission n'autorise aucune modification du dépôt, installation, service ou déploiement.
