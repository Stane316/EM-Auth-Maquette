# Protocole d'exécution et de reprise

## 1. Machine d'état

États de phase : `NON_COMMENCÉ`, `EN_COURS`, `EN_ATTENTE_HUMAIN`, `EN_ATTENTE_OUTIL`, `BLOQUÉ`, `TERMINÉ`, `NON_APPLICABLE_JUSTIFIÉ`. Chaque écran utilise les mêmes états et un classement de périmètre `À_ARBITRER`, `RETENU`, `DIFFÉRÉ`, `HORS_PÉRIMÈTRE` avec source et décideur. Jamais de `TERMINÉ` sur la base d'une intention, d'un résultat imaginé ou d'une sortie d'outil non inspectée.

Transitions : NON_COMMENCÉ → EN_COURS après vérification des entrées ; EN_COURS → TERMINÉ après livrables, contrôles et preuve ; EN_COURS → EN_ATTENTE_HUMAIN ou EN_ATTENTE_OUTIL si la dépendance manque ; EN_COURS → BLOQUÉ si contradiction ou défaut bloquant ; reprise uniquement après résolution vérifiée → EN_COURS. `NON_APPLICABLE_JUSTIFIÉ` exige raison, périmètre et approbation si cela change le lot. Une branche bloquée n'empêche pas la préparation indépendante sans effets externes, mais **pas le passage de la porte globale dépendante**.

## 2. Contrat d'une phase

1. Lire intégralement le fichier PH et les prompts explicitement affectés dans l'index ; vérifier source/version, entrées, autorisations et décisions.
2. Marquer EN_COURS et consigner la lecture effective, l'heure/horloge disponible et la version. Exécuter les instructions applicables dans l'environnement réellement accessible.
3. Créer les sorties dans la zone isolée autorisée ; un résultat textuel ne remplace pas une maquette demandée. Vérifier critères de la phase, les écarts et la présence de preuves.
4. Inscrire fichiers et empreintes si possible ; mettre à jour les cinq registres par transaction logique (journal d'abord, état ensuite). Si erreur à mi-écriture, marquer EN_COURS et réconcilier à la reprise.
5. Si la porte passe et qu'aucun checkpoint n'attend, enchaîner immédiatement ; sinon afficher les blocages et prochaine action. Les prompts optionnels ne se déclenchent que sur demande ou correctif ciblé nécessaire, jamais tous automatiquement.

## 3. Portes humaines et autonomie

| Porte | Déclencheur | Décision à consigner | Sans décision |
|---|---|---|---|
| G0 — source / écriture | Versions contradictoires, branche non claire, zone non autorisée | Source de travail, zone de suivi, permissions | Arrêt des opérations dépendantes |
| G1 — périmètre | Rôles, écrans, propriétaires techniques et portée non approuvés | Lot précis, exclus/différés, responsabilités, données fictives | Pas de fabrication d'écrans supposés approuvés |
| G2 — direction | Piste visuelle structurante non retenue | Piste, variantes et limites | Comparaison possible ; pas de système définitif |
| G3 — communication externe | Envoi Stitch/Figma ou accès partagé | Données autorisées, service, plan/droits et coûts vérifiés | Pas d'envoi ; alternative manuelle/locale si acceptée |
| G4 — structure et réception | Revue du design system, périmètre ou prototype avant handoff | Valider version et réserves | Ne pas déclarer réception finale |
| G5 — sécurité / architecture | Vulnérabilité, changement métier ou architecture, destruction, toute action hors mandat | Mesure et portée explicites | Bloquer la branche affectée ; ne pas contourner |
| G6 — intégration | Toute modification du dépôt, code, installation, tests, services ou production | Accord explicite, périmètre et commandes | Analyse seule ; pas d'exécution technique |

Dans les limites autorisées, un agent peut traiter automatiquement plusieurs écrans et corriger des problèmes graphiques mineurs sans demander approbation écran par écran. Les anciens prompts contiennent des phrases « attends mon accord » : elles sont conservées dans leur usage autonome ; dans ce workflow, elles s'appliquent aux portes ci-dessus, pas à une validation artificielle de chaque composant. Jamais de dérogation aux portes qui protègent métier, sécurité ou écriture.

## 4. Zone persistante et vérité

Ne pas écrire dans le dépôt simplement parce que des modèles y existent. Copier `09_EXECUTION_RECORDS/` dans un répertoire de travail autorisé, isolé du dépôt, puis y écrire les résultats et traces. Si l'utilisateur autorise explicitement une intégration du suivi au dépôt, noter où et éviter données sensibles ; ne pas ajouter ni committer automatiquement. Si aucune écriture n'est possible : état affiché temporairement, `BLOQUÉ` pour suivi persistant, demander une zone autorisée.

L'état est un index vers des **preuves**, non une preuve en soi. Mise à jour minimale après action, décision, incident ou phase ; la source de vérité reste l'artefact et sa version. Les horodatages enregistrent fuseau et source ; si horloge incertaine ou contradictoire, conserver ordre de séquence et signaler l'incertitude. Pas de secrets, PII, captures réelles ou contenus sensibles dans les traces.

## 5. Algorithme de reprise

1. Relire intégralement le maître, l'index, la carte, l'état, les décisions, blocages et livrables. Identifier racine, zone, dernier événement et identifiants sources.
2. Vérifier existence/empreinte ou version de chaque entrée et livrable référencé et cohérence état↔journal↔décisions ; recontrôler droits/outils. Un fichier absent, divergence, source modifiée ou décision révoquée → `BLOQUÉ` ; pas de saut.
3. Réévaluer les phases impactées seulement ; conserver historique, invalider explicitement les livrables affectés, annoncer les contrôles à refaire. Si aucune divergence, reprendre la phase/écran en cours à son prochain pas.
4. Mettre à jour les cinq registres et continuer si autorisé. Si outil ou consentement manquant, inscrire `EN_ATTENTE_*` et fournir instructions manuelles ; jamais simuler une action non réalisée.

## 6. Interactions entre outils

Stitch : exploration, pas preuve de produit. Figma : édition/liaisons seulement si l'agent dispose réellement d'un accès et des droits ; fonctionnalités IA et import/export dépendent du compte. Si inaccessible, préparer prompts et matrice d'opérations, demander passage humain ; ne pas marquer un fichier Figma créé. Un prototype HTML local fictif peut être proposé en substitution **avec accord** et sans dépendances ou services installés ; il ne vaut pas réception Figma. Toute exportation et transmission au SaaS requiert G3. Un audit visuel ne vérifie ni serveur, ni clavier/lecteur réel, ni sécurité.
