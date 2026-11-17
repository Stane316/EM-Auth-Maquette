# GPU Challenge 2026 — Candidature d'équipe (Fintech Academia × Next Fintech Forum)

- **Formulaire :** Microsoft Forms, lu en entier le 2026-11-15
- **Organisateur :** Epitech Bénin, avec l'Alliance Fintech UEMOA, Udutech et Payfonte
- **Date limite :** dimanche 15 novembre 2026
- **Règle :** une seule candidature par équipe de 4, remplie par le chef d'équipe
- **Suite de :** [candidature individuelle Epi'AI](2026-11_gpu-challenge-epiai.md)
- **Version consolidée, avec toutes les versions de chaque réponse :** [docs/project-knowledge/PARTICIPATION_FORM.md](../../docs/project-knowledge/PARTICIPATION_FORM.md)
- **État au 2026-11-17 :** dépôt de la candidature non confirmé dans la conversation

## Les 17 questions

| N° | Question | Type | État |
|---|---|---|---|
| 1 | Nom de l'équipe | Ligne | Propositions ci-dessous ; nom réellement saisi non documenté |
| 2 | Chef d'équipe : nom et prénom | Ligne | Non vu sur les captures |
| 3 | Chef d'équipe : adresse e-mail | Ligne | Non vu sur les captures |
| 4 | Chef d'équipe : numéro WhatsApp | Ligne | Non vu sur les captures |
| 5 | Chef d'équipe : école ou structure, filière ou poste | Ligne | Si c'est toi : IFRI (Université d'Abomey-Calavi) ; filière et année à préciser |
| 6 à 8 | Membres 2, 3, 4 : nom, prénom, e-mail, WhatsApp, école | Texte | Vu rempli sur capture (coordonnées non recopiées) |
| 9 | Pays et ville de résidence de l'équipe | Ligne | Rempli : Bénin, Abomey-Calavi |
| 10 | Domaines de compétence de l'équipe | Cases | Rempli : 4 domaines cochés |
| 11 | Niveau de l'équipe en IA | Choix unique | Rempli : Intermédiaire |
| 12 | Cas d'usage qui intéressent l'équipe | Cases | Rempli : 6 cas cochés, dont la liquidité |
| 13 | Idée de solution : cas, approche, usage des GPU | Texte | Dernière version proposée ci-dessous ; saisie non confirmée |
| 14 | Projet réalisé par un membre | Texte | Dernière version proposée ci-dessous (DabaPulse) ; saisie non confirmée |
| 15 | Pourquoi participer (5 lignes au plus) | Texte | Dernière version proposée ci-dessous ; saisie non confirmée |
| 16 | Engagement de tous les membres | Oui | À confirmer avec chacun |
| 17 | Données et droit à l'image | Choix unique | À confirmer avec chacun |

Les coordonnées personnelles ne sont pas écrites dans ce fichier : le dépôt est public.

## Nom de l'équipe

### Propositions du coéquipier

| Nom | Avis |
|---|---|
| CapitalX | Évoque un fonds d'investissement, rien sur l'IA. Le suffixe « X » est très répandu. |
| Hackflow | Dit « hackathon », rien sur la finance ni l'IA. Utilisable, peu mémorable. |
| FinHack | Terme générique : de nombreux hackathons fintech portent ce nom. Le moins distinctif. |

### Propositions de l'audit

| Nom | Sens | Limite |
|---|---|---|
| **Akwè Labs** (recommandé) | « Akwɛ́ » signifie argent, cauri, pièce de monnaie en fon | À expliquer en une phrase au jury |
| Cauri AI | Le cauri, première monnaie d'Afrique de l'Ouest, étalon à Ouidah | Plusieurs entreprises utilisent déjà « Cauri » |
| FloatSense | Le « float » des agents mobile money | Lie le nom au seul cas « liquidité » |
| Kernel Capital | Noyau de calcul GPU + capital ; proche de CapitalX | En anglais, moins ancré localement |
| Vigie | Celle qui guette : fraude, arnaques | Lie le nom aux cas de détection |

## Choix de l'équipe (captures du 2026-11-15)

- **Composition :** 4 membres — 2 d'Epitech, 1 de l'ENA, 1 de l'IFRI (Stane-Junior, qui remplit le formulaire). Résidence : Bénin, Abomey-Calavi.
- **Question 10 :** IA et machine learning, Data science et data engineering, Développement logiciel, Finance et fintech.
- **Question 11 :** Intermédiaire.
- **Question 12 :** fraude sur paiements instantanés, risque de crédit des petits commerçants, copilote de conformité, prévision de liquidité des agents mobile money, arnaques financières numériques, analyse des réclamations clients.
- Décisions prises par sondage dans le groupe de l'équipe. Les questions 6 à 9 ont été vues remplies ; les questions 1 à 5 n'ont pas été vues. Aucune coordonnée n'est recopiée ici.

## Dernières versions proposées (saisie non confirmée)

### 13 — Idée de solution, alignée sur la fiche 6 du guide Epi'AI (1002 caractères)

```
Cas choisi : prévision de liquidité des agents mobile money. Selon MicroSave, jusqu'à une opération sur cinq est refusée faute de cash ou de float chez l'agent dans certains pays.
Solution : un « radar de liquidité » qui estime, agent par agent, la probabilité de rupture du lendemain, envoie une alerte en français et simule le coût d'un rééquilibrage avant décision.
Approche : un simulateur d'agents écrit par l'équipe (les données réelles sont confidentielles), une base saisonnière et un LightGBM avec calendrier (jours de marché, fins de mois, fêtes), puis des prévisions par quantiles pour fixer un stock de sécurité.
GPU : un modèle de fondation pour séries temporelles (Chronos ou TimesFM), exécuté puis ajusté sur des milliers de séries d'agents, et conservé seulement s'il bat la base sur CPU ; un LLM ouvert exécuté localement pour rédiger les alertes sans sortir les données.
Acquis : un membre a déjà livré la chaîne prévision → risque → décision → simulation pour des stocks (DabaPulse).
```

Le chiffre MicroSave est un maximum (Tanzanie, 20 % ; Sénégal, 3 %) : d'où « jusqu'à » et « dans certains pays ». Les modèles nommés sont un plan, pas un acquis : le membre qui portera la modélisation doit pouvoir les défendre.

### 14 — Projet réalisé par un membre (451 caractères)

```
DabaPulse, par Stane-Junior ANIAMBOSSOU (Engineering Lead, en équipe, hackathon Startup FairPlay) : moteur d'aide à la décision qui estime le revenu exposé au risque à partir des ventes et des stocks, recommande une action et simule son impact ; un LLM explique les résultats sans produire de chiffres. API FastAPI/pandas, interface React, intégration continue, 43 tests automatisés, données synthétiques.
Code : https://github.com/Stane316/daba-pulse
```

DabaPulse ne contient pas de modèle entraîné. Si un coéquipier a un projet de machine learning, l'ajouter sur une ligne.

### 15 — Pourquoi participer (412 caractères)

```
Notre équipe réunit des étudiants d'Epitech, de l'IFRI et de l'ENA et couvre le développement logiciel, la data, l'IA et la finance. Nous voulons traiter un seul problème réel de la finance digitale en zone UEMOA et le mener jusqu'à une démo qui tourne de bout en bout. Les GPU et la formation en ligne nous permettront d'entraîner des modèles hors de portée de nos machines et de les comparer à une base simple.
```

Les domaines cités sont ceux cochés à la question 10 ; les écoles sont celles saisies aux questions 5 à 8. Le formulaire annonce bien une formation en ligne (texte d'introduction et question 16).

Notes sur le guide Epi'AI : [2026-11_gpu-challenge-guide-notes.md](2026-11_gpu-challenge-guide-notes.md)
