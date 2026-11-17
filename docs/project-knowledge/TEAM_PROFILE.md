# Équipe — composition, profils et complémentarité

- **Dernière mise à jour :** 2026-11-17
- **Retour au document principal :** [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md)

## 1. Ce qui est établi

| Fait | Source | Statut |
|---|---|---|
| L'équipe compte 4 personnes | Règle du challenge et formulaire d'équipe | Fait confirmé |
| Elle a été composée par « le comité » (Epi'AI), avec des « profils complémentaires », après les candidatures individuelles | Déclaration de Stane-Junior | Fait confirmé |
| Les membres ne se sont pas choisis eux-mêmes | Idem | Fait confirmé |
| L'équipe dispose d'un groupe de discussion et décide par sondages | Idem | Fait confirmé |
| Résidence déclarée : Bénin, Abomey-Calavi | Capture de la question 9 | Fait confirmé |
| Epi'AI cherche à placer un à deux profils finance par équipe | Guide Epi'AI | Fait confirmé |

## 2. Les membres

Les noms complets et les coordonnées des coéquipiers figurent sur les captures que Stane-Junior a partagées. **Ils ne sont pas recopiés ici, parce que ce dépôt est public.** Stane-Junior les détient et peut les donner directement au nouvel agent.

| Réf. | Membre | École, telle que saisie | Rôle | Compétences | Expérience | Responsabilité envisagée |
|---|---|---|---|---|---|---|
| M1 | Stane-Junior ANIAMBOSSOU | IFRI, Université d'Abomey-Calavi | Remplit le formulaire ; chef d'équipe par déduction (hypothèse) | Documentées au §3 | Documentée au §3 | Non décidée |
| M2 | M. G. | EPITECH | Non documenté | Non documenté | Non documenté | Non décidée |
| M3 | C. G. | EPITECH | Non documenté | Non documenté | Non documenté | Non décidée |
| M4 | B. A. | ENA | Non documenté | Non documenté | Non documenté | Non décidée |

Précisions :

- **« ENA »** n'est pas développé sur la capture. Y lire « École Nationale d'Administration » est une hypothèse.
- **Filière et année de Stane-Junior :** il était en Licence 1 à l'IFRI en 2025-2026 (d'après son dépôt de projet académique). Son année en cours n'est pas confirmée.
- Un coéquipier a proposé trois noms d'équipe. La conversation ne dit pas lequel.

## 3. Profil prouvé de Stane-Junior ANIAMBOSSOU

Ce profil vient d'un audit de 20 dépôts GitHub mené le 14 novembre 2026 : lecture du code, attribution des commits par auteur, rejeu des suites de tests. Le détail et les preuves sont dans [`portfolio-intelligence/`](../../portfolio-intelligence/README.md).

### Ce qu'il apporte, preuves à l'appui

| Capacité | Preuve | Niveau estimé |
|---|---|---|
| Livrer un produit web complet | HP Collection : e-commerce pour un client réel, en production, maintenu six mois ; il signe 449 des 464 commits humains ; 467 tests rejoués avec succès | Intermédiaire, confiance élevée |
| Construire une API et une chaîne de données | DabaPulse : API FastAPI de 18 routes, moteurs en pandas, 43 tests rejoués | Intermédiaire, confiance moyenne |
| Concevoir une base de données | 32 et 16 migrations SQL, policies RLS, triggers | Intermédiaire |
| Tester et sécuriser | Trois suites de tests qui passent ; limitation de débit, signature de webhook, flux OIDC | Intermédiaire |
| Intégrer un LLM avec garde-fous | DabaPulse : prompt contraint, réponse en quatre blocs, repli déterministe | Débutant à intermédiaire |
| Traduire un besoin métier en décision chiffrée | DabaPulse : estimation de la demande, revenu à risque, recommandation, simulation avant/après | Intermédiaire |
| Comprendre la mécanique d'un paiement Mobile Money | Déo Gracias Wi-Fi : intégration FedaPay, webhook signé, anti-rejeu, idempotence ; jamais mis en production | Débutant à intermédiaire |
| Piloter des agents IA de développement | Directives, registres de décisions et vérification des livraisons d'agent dans EM Auth, DabaPulse et HP Collection | Intermédiaire, confiance élevée |
| Coordonner techniquement une équipe | Tech Lead sur HP Collection (équipe de 3), Engineering Lead sur DabaPulse, intégrateur sur un projet académique à six | Intermédiaire |

### Ce que ses dépôts ne prouvent pas

| Domaine | État |
|---|---|
| Machine learning : entraînement, évaluation, métriques | **Non suffisamment documenté.** Aucun modèle entraîné dans les 20 dépôts. |
| Analyse exploratoire, data science sur données réelles | Non suffisamment documenté. Le seul traitement de données porte sur un jeu synthétique. |
| Deep learning, PyTorch, scikit-learn | Aucune preuve |
| Exploitation de GPU | Aucune preuve |
| Finance : formation ou expérience | Aucune preuve ; exposition par deux projets seulement |
| Pitch | Aucune trace ; il a coché « Pitch et présentation » dans le formulaire individuel, sans confirmer qu'il a déjà pitché |

### Comment il travaille (fait confirmé par lui)

Il cadre, spécifie et vérifie ; l'IA écrit l'essentiel du code. Les verbes exacts pour décrire son travail sont donc : concevoir, architecturer, piloter, intégrer, livrer, vérifier. « Codé seul » serait inexact.

### Niveaux qu'il a déclarés ou que l'audit juge défendables

| Question | Valeur | Origine |
|---|---|---|
| IA et programmation, sur 10 | 4 | Sélectionné par lui sur la capture ; cohérent avec l'audit |
| Finance, banque ou fintech, sur 10 | 1 | Sélectionné par lui ; l'audit admet 1 ou 2 |
| Rôle naturel en équipe | « Je code et je construis (IA / dev) » | Sélectionné par lui |
| Expérience de hackathon | Une participation : Startup FairPlay, avec DabaPulse | Déclaré par lui ; résultat non documenté |

### Ses projets utiles au challenge

| Projet | Lien | Intérêt pour le challenge | Limite à dire |
|---|---|---|---|
| DabaPulse | `https://github.com/Stane316/daba-pulse` | Chaîne prévision → risque → décision → simulation → explication par LLM | Moteur déterministe, données synthétiques, aucun modèle entraîné |
| Déo Gracias Wi-Fi | `https://github.com/Stane316/deo-gracias-wifi-system` | Flux de paiement Mobile Money, machines d'états | Pas en production, aucun paiement réel |
| HP Collection | `https://github.com/GROW-TECH-251/perscadors` | Preuve de livraison et de rigueur | Projet client ; ce n'est pas de la fintech |
| Grow-Tech-waxal-asr | `https://github.com/Stane316/Grow-Tech-waxal-asr` | Cadrage d'un défi de reconnaissance vocale | Plan seul : aucun entraînement, aucune soumission |

Un travail « Financial Inclusion — Zindi » a été annoncé par Stane-Junior. Il n'a été trouvé dans aucun des 20 dépôts accessibles. Il ne doit être cité nulle part tant qu'il n'est pas retrouvé.

## 4. Le profil finance

| Élément | État |
|---|---|
| Besoin | Epi'AI veut un à deux profils finance par équipe. Selon le guide, ce profil pose le problème, valide les hypothèses, écrit les règles d'étiquetage et les scénarios de risque, et défend la solution devant un jury de la fintech. |
| Déclaration de l'équipe | « Finance et fintech » cochée à la question 10 |
| Membre identifié comme profil finance | **Aucun dans la conversation** |
| Stane-Junior | Niveau finance déclaré : 1 sur 10. Il n'est pas le profil finance. |
| Membre de l'ENA | Hypothèse plausible, non vérifiée |

**À faire en priorité :** savoir qui, dans l'équipe, porte la finance, avec quelle formation et quelle expérience. Sans cela, on ne peut pas juger quels cas d'usage sont à la portée de l'équipe.

## 5. Grille de complémentarité

Cette grille sert à l'analyse. Ce n'est pas une attribution de responsabilités.

| Compétence nécessaire | Ce qu'elle recouvre | Couverture connue | Ce qui manque pour conclure |
|---|---|---|---|
| Finance et compréhension métier | Problème, hypothèses, réglementation, modèle économique, pitch métier | Déclarée par l'équipe (question 10) ; aucun membre identifié | Nom et parcours du profil finance |
| Data science et machine learning | Données, variables, entraînement, évaluation, comparaison à une base | Déclarée par l'équipe (questions 10 et 11) ; non prouvée chez M1 | Réalisations de M2, M3, M4 |
| Développement logiciel et architecture | API, interface, intégrations simulées, tests, démo de bout en bout | **Prouvée chez M1** | Apport des autres membres |
| IA, optimisation et exploitation des GPU | Ajustement de modèles, tâches GPU, suivi des essais | Aucune preuve chez M1 | Expérience GPU de M2, M3, M4 |

### Rôles proposés par le guide Epi'AI

Le guide suggère quatre rôles, « à adapter ». Une personne peut en porter deux, mais chaque rôle a un responsable.

| Rôle | Responsable de | Profil typique | Lien avec ce qu'on sait |
|---|---|---|---|
| Lead modèle | Modélisation, tâches GPU, évaluation, comparaison avec le modèle de base | IA / data | Non attribué ; non prouvé chez M1 |
| Lead données et déploiement | Nettoyage ou génération des données, pipelines, Docker, suivi des essais, mise en service | IA / ingénierie | Non attribué ; M1 a une expérience partielle (générateur de données synthétiques, CI) |
| Lead produit et démo | API, interface, simulation des intégrations (mobile money, PI-SPI simulé) | Développement | Non attribué ; **correspond aux preuves de M1** (proposition de l'assistant) |
| Lead métier et pitch | Définition du problème, hypothèses financières, cadre réglementaire, interviews de praticiens, script du pitch | Finance | Non attribué |

## 6. Informations à recueillir

Pour chacun des trois coéquipiers :

1. École, filière, année.
2. Compétences réelles en IA, data, développement ou finance.
3. Un projet réalisé, avec un lien si possible, et dire s'il contient un modèle entraîné.
4. Expérience d'un GPU ou d'un environnement de calcul (Colab, Kaggle, serveur).
5. Disponibilité d'ici aux finales.
6. Rôle souhaité.

Pour l'équipe :

1. Qui est le chef d'équipe.
2. Qui porte la finance.
3. Sur quoi repose le niveau « Intermédiaire » déclaré en IA.
