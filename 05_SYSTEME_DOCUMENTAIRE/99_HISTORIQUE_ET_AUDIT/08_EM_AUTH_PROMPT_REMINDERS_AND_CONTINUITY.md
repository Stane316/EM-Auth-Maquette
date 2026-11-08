# 08 — Rappels et continuité inter-outils

## Bloc court à préfixer à tout prompt

> EM Auth : une organisation, une application fictive ; pas de multi-tenant ni de fonctions métier inventées. P14 et les écrans A sont des propositions. WebAuthn forte pour privilèges/actions sensibles ; récupération indépendante et double contrôle ; pas de dégradation silencieuse ; cible non observée = INCONNU. Des maquettes ne prouvent aucune sécurité. Ne joins aucun secret ni donnée réelle. Travaille uniquement sur le lot et les documents autorisés, liste les limites et attends validation humaine avant l'étape suivante.

## Relance si dérive

> Compare ta dernière sortie au PDF V3, à l'inventaire et au journal des décisions. Liste ce qui est factuel, simulé, proposé ou inconnu ; supprime de la proposition les fonctions hors scope et corrige les messages trompeurs. Ne modifie aucun dépôt ; présente les différences et demande mon accord.

## Reprise de session

> Lis les éléments accessibles et indique explicitement ceux qui manquent. État actuel : `[outil et version]`, source PDF `[empreinte]`, dépôt `[commit]`, maquette `[version]`, piste `[décision]`, lot `[IDs et états]`, validations `[décideur / date]`, blocages `[liste]`. Reconstitue la prochaine action et ses préconditions sans la lancer, puis attends mon accord. Les valeurs entre crochets sont à renseigner ou à dire inconnues, jamais à inventer.

## Checkpoint compact

| Champ | À remplir |
|---|---|
| Dernière source et version | … |
| Écran / état / acteur | … |
| Résultat réel ou simulation | … |
| Décision / responsable / preuve | … |
| Risques et inconnus | … |
| Prochain prompt et autorisation | … |

## Règles récurrentes

Le contenu généré est une hypothèse ; tester avant approbation. Vérifier les droits et coûts des outils et des assets au moment de les utiliser. Aucun merge, rebase, cherry-pick, reset ou action touchant autrui sans autorisation expresse ; pas de PR ni push automatique protégé. Aucune modification du dépôt pendant la mission de conception actuelle.
