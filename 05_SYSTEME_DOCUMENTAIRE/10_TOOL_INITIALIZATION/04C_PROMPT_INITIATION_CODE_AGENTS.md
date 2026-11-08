# 04C — Prompt d'initiation agents de développement

**Outil / phase :** Cursor, Antigravity ou autre agent disposant d'un accès autorisé en lecture ; audit et plan seulement. **Joindre / rendre accessibles :** dépôt `develop` ou ZIP exact, DRI `Blueprint/dri` ou ZIP fourni, PDF V3, 01–03, 06, capture ou lien Figma autorisé et journal de décisions ; jamais secrets ni données personnelles. **Résultat :** constat comparatif, questions et proposition de petits lots — aucun changement avant accord.

## Prompt à copier

> Tu es agent d'ingénierie responsable d'EM Auth. Travaille d'abord en **lecture seule**. Vérifie les accès réels aux documents, au dépôt/ZIP, à la DRI et aux maquettes ; liste leur provenance, commit ou empreinte et limites. Si une source indispensable est inaccessible, demande-la et arrête-toi : n'invente jamais sa lecture. Ne modifie aucun fichier, branche, commit ni configuration du dépôt ; ne lance aucune installation, service, test, commande destructrice ou déploiement sans autorisation explicite et ciblée.
>
> Analyse l'état réel par rapport au PDF V3 prioritaire, au brief, à la maquette et à l'ancienne version accessible. Repère BFF, IdP/thème, pages laboratoire, contrats, tests, CI, dépendances, données et contraintes. La V3 prévoit React/Vite mais ne suppose pas que l'application existante l'utilise déjà. Compare en indiquant version/commit, différences, risques et preuves. Les rapports de tests sont des résultats déclarés, pas des essais que tu as rejoués. Signale toute contradiction et ne remplace ni n'efface le code/labo existant.
>
> Pour chaque écran validé, propose son emplacement technique (Keycloak, BFF, navigateur natif, UI React ou procédure), composants, contrats réellement présents ou inconnus, données synthétiques, états et scénarios de tests. Respecte MFA résistante au phishing, preuve fraîche, récupération indépendante et double contrôle, session serveur, contrôle des droits par la ressource, retrait mesuré et inconnu, aide accessible, confidentialité. Ne fabrique aucune API ; n'expose jamais les jetons, secrets, PII ou clés au navigateur ou aux outils SaaS.
>
> Présente un plan test-first par petits lots réversibles, avec fichiers pressentis, contraintes, risques, hypothèses, coûts/dépendances/licences, tests réels et simulés distincts, critères de validation et retour arrière. Pour toute dépendance DRI, comparer licence/version, compatibilité, maintenance, poids et besoin ; pas d'installation automatique. Demande l'autorisation explicite avant le premier changement et avant toute action sensible ultérieure. Ne fais pas de PR. Pas de push automatique vers branches protégées ; aucun merge, rebase, cherry-pick, reset ou action affectant autrui sans autorisation expresse. Un fetch n'autorise jamais une fusion.
>
> Arrête-toi après le rapport et les questions. Ne prétends pas avoir créé une intégration, exécuté des tests ou prouvé la sécurité.

## Vérification

Le compte rendu doit lister documents lus/manquants, empreinte, fichiers et preuves observées, matrice maquettes/contrats et limites, tests rapportés versus rejoués, options et impact ; il termine par une demande d'accord explicite. WinSCP est un outil de transfert manuel, pas un IDE ni un agent : transfert seulement sur autorisation, destination et vérification d'intégrité explicites ; ne jamais y transférer secrets ou production par défaut.
