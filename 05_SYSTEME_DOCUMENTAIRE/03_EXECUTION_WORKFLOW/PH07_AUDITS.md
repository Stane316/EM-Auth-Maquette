# PH07 — Audits et corrections

**Exécution :** appliquer après les dépendances de l'index ; lire intégralement ce prompt et les prompts associés dans `00_MASTER_ORCHESTRATOR/WORKFLOW_INDEX.md`. **Mode :** agent de développement dans le périmètre autorisé, données fictives, aucune modification de dépôt sans accord distinct.

## Entrées

PH06 terminé, artefacts et états réellement disponibles.

## Prompt opérationnel à appliquer

> Appliquer le prompt QA commun et chacun des huit modules : UX, UI, sécurité de représentation, WCAG, responsive/compatibilité, performance, SEO seulement surfaces publiques pertinentes, cohérence fonctionnelle. Appliquer aussi le prompt spécialisé accessibilité. Produire preuve de méthode et portée, non testé explicite ; une mesure de contraste exige valeurs et outil, la performance réelle une implémentation mesurée. SEO privé : non applicable comme SEO public, contrôle confidentialité/accès maintenu. Corriger dans le périmètre autorisé, retester et escalader problèmes de sécurité ou décisions majeures.
>
> Consigne sources, décisions, versions et preuves ; utilise les cinq registres en zone isolée, sans secrets. Si l'action ne peut pas être exécutée réellement, classe-la en attente ou bloquée, sans déclarer de réussite. Enchaîne uniquement après passage de la porte et sans validation humaine supplémentaire non nécessaire.

## Livrables attendus

RAPPORT_AUDITS.md : module, version, scénario, preuve, P0/P1/P2, résultat, responsable, correction/retest, non testé, limite. Mettre à jour le registre de blocages.

## Porte et contrôle

Les huit modules évalués ou NON_APPLICABLE_JUSTIFIÉ avec raison ; P0 et P1 bloquants fermés ou laissés ouverts avec NON PRÊT ; aucune fausse conformité.
