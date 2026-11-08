# Audit de la documentation précédente et journal de restructuration

## Avant

Le dossier précédent contient 42 fichiers Markdown : 12 transversaux, 22 prompts par écran E01–E13/A01–A09 et 8 spécialisés. Il dispose d'un inventaire de propositions, de prompts initiaux, d'audits et de critères. Il était conçu pour un passage progressif humain entre outils ; il ne comportait ni registre de phases exécutable, ni map exhaustive des dépendances, ni état persistant, ni règle de reprise mécanique. Les multiples « attends mon accord » pouvaient entraîner une pause à chaque sous-prompt. L'ancien prompt code est volontairement limité à l'audit avant toute autorisation d'implémentation.

## Ce qui a changé

- L'original `Blueprint/EM_AUTH_PROTOTYPING_PROMPT_SYSTEM/` et son archive restent intacts. Les 42 documents ont été copiés puis classés dans ce nouveau dossier ; les liens Markdown locaux ont été adaptés. Le cahier PDF est copié à l'identique ; 5 sources historiques textuelles sont copiées sous `.txt` pour lecture hors connexion, sans prétendre constituer un dépôt complet. Les contenus de spécification et prompts ont été conservés, hormis l’actualisation d’un chemin textuel dans le prompt Stitch ; les noms historiques dans des exemples textuels peuvent rester comme traces de provenance, l'index fait autorité pour les chemins.
- Nouvelle hiérarchie : maître/protocole/index/carte ; références ; 10 phases ; prompts écran ; spécialisés ; QA ; handoff ; options ; modèles de suivi ; initialisation outils ; historique. Le README et workflow antérieurs sont conservés dans ce dossier historique, non utilisés comme séquence concurrente.
- Distinction explicite entre lecture obligatoire des 22 prompts et réalisation des écrans **retenus par décision** ; les 22 sont des propositions historiques/déduites, pas 22 fonctionnalités validées. Prompts de contrôle associés à leur phase ; finition à la demande.
- Précédente règle « attendre » : conservée pour usage autonome des prompts ; orchestration centralise les décisions aux portes G0–G6. Aucune suppression de contrôle de sécurité, de validation structurante ou de consentement à l'écriture.
- Un agent ne crée ni Figma ni Stitch par magie : blocage et procédure manuelle si capacité absente. Les registres sont des modèles, copiés hors dépôt par défaut. L'implémentation exige un mandat distinct ; ce livrable aboutit au handoff.

## Limites de cet audit

Inspection des 42 fichiers et de leurs relations, des chemins et de l'inventaire ; ce n'est pas une nouvelle vérification du dépôt distant, des prix/licences courants, des outils ni une exécution d'un agent commercial. Les constats du brief précédent restent un instantané à vérifier à la reprise. Le catalogue P14 et les sources historiques ne deviennent pas une validation du produit. La contradiction des dates mentionnée dans le brief reste ouverte.
