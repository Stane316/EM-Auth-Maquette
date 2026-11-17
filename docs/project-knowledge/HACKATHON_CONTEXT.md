# GPU Challenge 2026 — Contexte complet et instructions de reprise

- **Dernière mise à jour :** 2026-11-17 (horloge de l'environnement de travail, UTC)
- **Rédigé pour :** un nouvel agent de recherche, d'analyse stratégique et d'idéation, qui n'a pas accès à la conversation d'origine
- **Porteur :** Stane-Junior ANIAMBOSSOU (GitHub `Stane316`)
- **Document principal.** Les détails sont dans les fichiers liés ; ce document suffit pour comprendre la situation.

## Comment lire ce document

Chaque information importante porte l'un de ces statuts. Ils ne sont jamais mélangés.

| Statut | Signification |
|---|---|
| **Fait confirmé** | Dit explicitement par Stane-Junior, lu dans un document, ou vérifié dans une source |
| **Décision validée** | Orientation effectivement retenue par Stane-Junior ou par l'équipe |
| **Proposition** | Idée avancée par l'assistant ou par un coéquipier, non adoptée à ce jour |
| **Hypothèse** | Déduction plausible, à vérifier |
| **Question ouverte** | Point qui attend une décision ou une clarification |
| **Réalisé** | Action effectivement accomplie |
| **Restant** | Action non exécutée |
| **Non documenté** | Information absente de la conversation et des documents |

## Table des matières

1. [Présentation générale du hackathon](#1-présentation-générale-du-hackathon)
2. [Objectifs et thématique](#2-objectifs-et-thématique)
3. [Historique de notre participation](#3-historique-de-notre-participation)
4. [Informations du formulaire](#4-informations-du-formulaire)
5. [État de la candidature](#5-état-de-la-candidature)
6. [Composition et complémentarité de l'équipe](#6-composition-et-complémentarité-de-léquipe)
7. [Le document de référence](#7-le-document-de-référence)
8. [Inventaire des idées proposées](#8-inventaire-des-idées-proposées)
9. [Historique des réflexions](#9-historique-des-réflexions)
10. [Orientations validées](#10-orientations-validées)
11. [Hypothèses et pistes non validées](#11-hypothèses-et-pistes-non-validées)
12. [Contraintes et exigences identifiées](#12-contraintes-et-exigences-identifiées)
13. [État actuel du travail](#13-état-actuel-du-travail)
14. [Environnement technique](#14-environnement-technique)
15. [Travaux réalisés dans le dépôt](#15-travaux-réalisés-dans-le-dépôt)
16. [Questions ouvertes](#16-questions-ouvertes)
17. [Risques et points de vigilance](#17-risques-et-points-de-vigilance)
18. [Prochaines étapes](#18-prochaines-étapes)
19. [Instructions de reprise pour un nouvel agent](#19-instructions-de-reprise-pour-un-nouvel-agent)
20. [Références et sources](#20-références-et-sources)
21. [Informations non vérifiées et limites de ce document](#21-informations-non-vérifiées-et-limites-de-ce-document)

---

## 1. Présentation générale du hackathon

| Élément | Ce qui est connu | Source | Statut |
|---|---|---|---|
| Nom officiel | « GPU Challenge 2026 · Fintech Academia × Next Fintech Forum » | Titre du formulaire d'équipe | Fait confirmé |
| Lanceur | Epitech Bénin | Introduction du formulaire d'équipe | Fait confirmé |
| Cadre | Fintech Academia, « volet académique du Next Fintech Forum 2026 » | Idem | Fait confirmé |
| Partenaires | Next Fintech Forum, Alliance Fintech UEMOA, Udutech, Payfonte, Epitech Bénin | Idem | Fait confirmé |
| Défi | « Concevoir des solutions d'intelligence artificielle appliquées à la finance digitale, pour répondre à des problématiques réelles de fintechs » | Idem | Fait confirmé |
| Exigence GPU | « Les solutions devront exploiter pleinement la puissance des GPU » | Idem | Fait confirmé |
| Format des équipes | 4 personnes ; une seule candidature par équipe, remplie par le chef d'équipe | Idem | Fait confirmé |
| Parcours annoncé | Équipes retenues : accès à des GPU, formation en ligne, phase de développement, puis journées finales à Epitech Bénin, Cotonou | Idem | Fait confirmé |
| Date limite de candidature | Dimanche 15 novembre 2026 | Idem | Fait confirmé |
| Journées finales | 25 et 26 novembre 2026, Epitech Bénin, Cotonou | Guide Epi'AI, qui l'attribue à l'appel à candidatures. Les dates ne figurent pas dans le texte du formulaire. | Fait confirmé par une source secondaire |
| Next Fintech Forum 2026 | 8e édition, 26 et 27 novembre 2026, Sofitel Cotonou Marina, organisé par l'Alliance Fintech UEMOA | Guide Epi'AI et recherche web de l'assistant | Fait confirmé |
| Critères d'évaluation | Non publics | Guide Epi'AI | Non documenté |
| Jury, prix, livrables, programme horaire | Non publics | Guide Epi'AI | Non documenté |
| Fournisseur, modèle et quota de GPU, mode d'accès | Non publics | Guide Epi'AI | Non documenté |
| Règles sur les données et la propriété intellectuelle | Non publiques | Guide Epi'AI | Non documenté |

### Les acteurs

| Acteur | Rôle connu | Ce qui n'est pas documenté |
|---|---|---|
| Epitech Bénin | Lance le challenge et accueille les finales | — |
| Alliance Fintech UEMOA | Organise le Next Fintech Forum ; organisation régionale de fintechs annoncée le 27 novembre 2024 (selon le guide) | — |
| Payfonte | Partenaire ; plateforme d'orchestration de paiements sur plus de 22 marchés africains (selon le guide) | Son rôle exact dans le challenge |
| Udutech | Partenaire | Tout le reste : le guide n'a trouvé aucune information publique fiable |
| **Epi'AI** | A recueilli les candidatures individuelles (formulaire Tally « Candidature Epi'AI »), a composé les équipes de 4, a rédigé le guide des équipes | Sa nature exacte et son lien avec Epitech Bénin. Stane-Junior l'appelle « le comité ». |

**Point à ne pas confondre.** Il y a deux niveaux : Epi'AI sélectionne des personnes et compose ses équipes, puis chaque équipe dépose la candidature officielle auprès des organisateurs. Le guide dit lui-même : « Epi'AI l'a rédigé pour ses équipes : ce n'est pas un document des organisateurs. »

## 2. Objectifs et thématique

Le sujet est l'IA appliquée à la finance digitale en zone UEMOA, avec des solutions qui tirent réellement parti du calcul GPU.

**Ce sujet ne se réduit pas à l'usage d'un modèle de langage.** Les dix cas d'usage proposés mobilisent des familles d'IA différentes :

| Famille d'IA | Cas d'usage concernés | Besoin de GPU selon le guide |
|---|---|---|
| Modèles tabulaires (arbres boostés : LightGBM, XGBoost, CatBoost) | Fraude, crédit, tri d'alertes de conformité, liquidité | CPU suffisant ; XGBoost peut s'entraîner sur GPU |
| Réseaux de graphes (GraphSAGE) et modèles de séquence | Fraude, blanchiment | GPU utile sur de gros graphes |
| Prévision de séries temporelles, modèles de fondation (Chronos, TimesFM) | Liquidité, flux transfrontaliers | Non précisé ; les prévisions statistiques tournent sur CPU |
| Encodeurs de texte multilingues (XLM-R, CamemBERT) | Arnaques, réclamations | GPU pour l'ajustement |
| LLM, recherche documentaire (RAG), sortie structurée | Conformité, réclamations, comptabilité | GPU pour l'ajustement (LoRA, QLoRA) et la vectorisation de gros corpus |
| Vision et OCR | Documents falsifiés, comptabilité (cahiers, reçus) | GPU pour les modèles de vision |
| Reconnaissance vocale (MMS, Whisper) | Assistant vocal en langues locales | GPU pour l'ajustement |

**Les dix cas d'usage** (formulaire Tally, formulaire d'équipe et guide donnent la même liste) :

1. Détection des fraudes sur les paiements instantanés
2. Assistant financier vocal en langues locales
3. Évaluation du risque de crédit des petits commerçants
4. Vérification d'identité et détection de documents falsifiés
5. Copilote de conformité pour les fintechs
6. Prévision de liquidité des agents mobile money
7. Détection des arnaques financières numériques
8. Comptabilité intelligente pour les TPE
9. Prévision des flux de paiements transfrontaliers
10. Analyse intelligente des réclamations clients

Cette numérotation suit l'ordre des formulaires. Le guide numérote autrement ; la correspondance est dans [PROJECT_IDEAS.md](PROJECT_IDEAS.md).

**Une idée libre est permise.** Le formulaire dit : « Si vous avez déjà une idée de solution, n'hésitez pas à la proposer dans votre candidature. »

**La tension centrale du sujet.** L'appel exige d'exploiter « pleinement » les GPU. Le guide Epi'AI conseille l'inverse en pratique : un modèle simple d'abord, le GPU réservé à la seule étape qui en a besoin, et il cite « un GPU utilisé pour lui-même » parmi les causes d'échec. Tout projet devra répondre à la question « pourquoi un GPU ? » de façon mesurable.

Détail du contexte financier et réglementaire : [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md).

## 3. Historique de notre participation

Les dates viennent de l'horloge de l'environnement de travail. Quand elle n'a pas été relevée, la date est donnée comme approximative.

| Date | Étape | Statut |
|---|---|---|
| 2026-11-14 | Stane-Junior ouvre la mission « GitHub Portfolio Intelligence, Skills Audit & Application Assistant » : auditer ses dépôts GitHub pour remplir des candidatures à partir de preuves. Le challenge visé est une candidature « IA dans la finance ». | Réalisé |
| 2026-11-14 | Audit de 20 dépôts (clonage, lecture du code, attribution par auteur, rejeu des tests). Création de la base `portfolio-intelligence/`. | Réalisé |
| 2026-11-14 | Stane-Junior répond à cinq questions de validation (voir [§10](#10-orientations-validées)). | Réalisé |
| 2026-11-14 | Formulaire individuel Tally « GPU Challenge 2026 · Candidature Epi'AI » : réponses rédigées à partir de quatre captures d'écran. | Réalisé |
| 2026-11-14 ou 15 | Stane-Junior annonce avoir déposé sa candidature individuelle. Le comité a formé une équipe de 4 « aux profils complémentaires » et transmis le formulaire d'équipe (Microsoft Forms). | Fait confirmé (déclaration) |
| 2026-11-14 ou 15 | Lecture complète du formulaire d'équipe. Avis sur trois noms proposés par un coéquipier, cinq autres noms proposés, brouillons des questions 13, 14 et 15. | Réalisé |
| 2026-11-15, vers 21 h 20 UTC | Stane-Junior envoie trois captures : les questions 6 à 12 sont remplies. Il précise que l'équipe a décidé par sondages dans un groupe créé pour l'occasion. Réponses finales rédigées pour les questions 13 à 15. | Réalisé |
| 2026-11-15, vers 21 h 40 UTC | Stane-Junior transmet le guide PDF d'Epi'AI. Lecture complète ; questions 13 et 15 réécrites à la lumière du guide. | Réalisé |
| 2026-11-15 | Date limite de la candidature d'équipe. | **Dépôt non confirmé dans la conversation** |
| 2026-11-17 | Demande de transfert de contexte, de commit et de push. Stane-Junior précise que le choix du projet reste à faire collectivement. | Réalisé (ce document) |

## 4. Informations du formulaire

Il y a deux formulaires. Le détail champ par champ, avec toutes les versions de chaque réponse, est dans [PARTICIPATION_FORM.md](PARTICIPATION_FORM.md).

| Formulaire | Outil | Destinataire | Rempli par | État connu |
|---|---|---|---|---|
| « GPU Challenge 2026 · Candidature Epi'AI » | Tally (`https://tally.so/r/EqdZ0X`) | Epi'AI | Stane-Junior, à titre individuel | Déposé, selon Stane-Junior. Valeurs finales saisies : non documentées. |
| « GPU Challenge 2026 · Fintech Academia × Next Fintech Forum » | Microsoft Forms, 17 questions | Organisateurs | Le chef d'équipe, pour l'équipe | Questions 6 à 12 vues remplies. Dépôt non confirmé. |

**Résumé des réponses d'équipe vues sur captures (fait confirmé) :**

- Question 9 : « Pays : Bénin ; Ville : Abomey Calavi ».
- Question 10, domaines de compétence : IA et machine learning, Data science et data engineering, Développement logiciel, Finance et fintech. Non cochés : Design et produit, Autre.
- Question 11, niveau de l'équipe en IA : Intermédiaire.
- Question 12, cas d'usage qui intéressent l'équipe : fraude sur paiements instantanés, risque de crédit des petits commerçants, copilote de conformité, prévision de liquidité, arnaques financières numériques, analyse des réclamations. Non cochés : assistant vocal, documents falsifiés, comptabilité des TPE, flux transfrontaliers.

**Réponses rédigées par l'assistant pour les questions 13, 14 et 15 (proposition) :** une idée de « radar de liquidité » pour les agents mobile money, le projet DabaPulse de Stane-Junior, et un texte de motivation. Rien n'indique dans la conversation que ces textes ont été collés tels quels.

## 5. État de la candidature

| Élément | État | Statut |
|---|---|---|
| Candidature individuelle auprès d'Epi'AI | Déposée | Fait confirmé (déclaration de Stane-Junior) |
| Affectation à une équipe de 4 par Epi'AI | Faite | Fait confirmé (déclaration) |
| Questions 6 à 12 du formulaire d'équipe | Remplies | Fait confirmé (captures) |
| Questions 1 à 5, 13 à 17 | Contenu final saisi inconnu | Non documenté |
| Dépôt de la candidature d'équipe avant la date limite | Inconnu | Question ouverte |
| Accusé de réception | Inconnu | Non documenté |
| Sélection de l'équipe par les organisateurs (« équipes retenues ») | Inconnue | Question ouverte |
| Accès GPU, formation en ligne, calendrier | Rien de communiqué | Dépend des organisateurs |

## 6. Composition et complémentarité de l'équipe

Détail : [TEAM_PROFILE.md](TEAM_PROFILE.md).

| Membre | École (telle que saisie) | Rôle dans l'équipe | Compétences documentées |
|---|---|---|---|
| Stane-Junior ANIAMBOSSOU | IFRI, Université d'Abomey-Calavi | Remplit le formulaire ; chef d'équipe par déduction | Auditées sur 20 dépôts : développement logiciel solide, intégration de LLM, aucun modèle entraîné, finance débutant |
| Membre 2 (M. G.) | EPITECH | Non documenté | Non documenté |
| Membre 3 (C. G.) | EPITECH | Non documenté | Non documenté |
| Membre 4 (B. A.) | ENA | Non documenté | Non documenté |

Les noms complets des coéquipiers sont connus de Stane-Junior. Ils sont volontairement réduits à des initiales, et leurs coordonnées sont absentes, parce que ce dépôt est public.

**Profil finance.** L'équipe a coché « Finance et fintech » à la question 10, et Epi'AI dit chercher un à deux profils finance par équipe. **Aucun membre n'est identifié comme profil finance dans la conversation.** Supposer que c'est le membre de l'ENA serait une hypothèse.

## 7. Le document de référence

Analyse complète : [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md).

| Élément | Valeur |
|---|---|
| Titre | « GPU Challenge 2026 · Guide des équipes Epi'AI » |
| Fichier reçu | `GPU_Challenge_2026_Guide_Epi'AI (2).pdf`, 17 pages, environ 2 Mo |
| Date et auteur | 14 novembre 2026, mention « @Kanta » |
| Auteur institutionnel | **Epi'AI, pour ses équipes.** Le guide précise qu'il ne représente pas les organisateurs. |
| Contenu | Cadre du challenge, contexte financier et réglementaire UEMOA, dix fiches de cas d'usage, préparation GPU et données, organisation d'équipe, pitch, IA responsable, sources |
| Présence dans le dépôt | **Non versé** : le dépôt est public et le document n'est pas le nôtre. Stane-Junior en détient l'original. |

Stane-Junior a présenté ce document comme « fourni par le comité ». Il faut le lire comme le conseil d'Epi'AI, pas comme un règlement. Deux écarts avec le formulaire officiel ont été relevés ([§12](#12-contraintes-et-exigences-identifiées)).

## 8. Inventaire des idées proposées

Inventaire détaillé, fiche par fiche, avec grille de comparaison : [PROJECT_IDEAS.md](PROJECT_IDEAS.md).

| Origine | Idées | Statut |
|---|---|---|
| Organisateurs et guide Epi'AI | Les dix cas d'usage, chacun avec problème, données, méthode, pièges et démo | Disponibles ; aucune n'est choisie |
| Équipe | Six cas cochés comme « intéressants » à la question 12 | Décision validée sur l'intérêt, pas sur le projet |
| Assistant | « Radar de liquidité » pour les agents mobile money, quatre versions successives | Proposition, en attente de validation |

## 9. Historique des réflexions

1. **Point de départ : le profil réel de Stane-Junior.** L'audit montre un profil de constructeur de produits (API, interface, tests, livraison) qui pilote des agents IA de développement. Il ne montre ni modèle entraîné ni formation en finance. Toutes les réponses de formulaire ont été écrites dans cette limite.
2. **Choix de DabaPulse comme projet de référence.** C'est le seul dépôt qui croise données, logique financière et brique d'IA : moteur déterministe de « revenu à risque », simulation, explication par LLM contraint. Il ne contient aucun machine learning ; les réponses le disent.
3. **Trois cas d'usage recommandés pour la candidature individuelle.** Liquidité (analogue de la rupture de stock traitée par DabaPulse), fraude (expérience des flux de paiement Mobile Money de Déo Gracias Wi-Fi, sans modèle de fraude), réclamations (classification d'intention de DabaPulse). L'assistant vocal et les documents falsifiés ont été écartés **de la recommandation individuelle** faute de preuve : les deux dépôts correspondants sont restés au stade du plan.
4. **Naissance de l'idée « radar de liquidité ».** Proposée pour le champ « idée de solution » du formulaire individuel, puis reformulée pour l'équipe.
5. **Révision après lecture du guide.** La fiche « liquidité » du guide confirme la méthode (simulateur d'agents, modèle simple, quantiles) mais classe ce cas parmi ceux qui n'ont pas besoin de GPU. L'idée a été réécrite pour donner au GPU un rôle réel et limité : un modèle de fondation pour séries temporelles, gardé seulement s'il bat la base sur CPU, et un LLM local.
6. **Vérification d'un chiffre.** Le guide cite « jusqu'à une transaction sur cinq » refusée faute de liquidité. La source MicroSave le confirme comme un maximum (Tanzanie, 20 %), très au-dessus du Sénégal (3 %).
7. **Rôle naturel de Stane-Junior.** Parmi les quatre rôles que le guide propose, « Lead produit et démo » est celui que ses dépôts prouvent. C'est une observation de l'assistant, pas une attribution décidée par l'équipe.
8. **Recadrage du 17 novembre.** Stane-Junior demande de ne présumer d'aucun projet : le choix se fera collectivement après une phase de recherche.

## 10. Orientations validées

| N° | Décision ou fait validé | Par qui | Statut |
|---|---|---|---|
| D1 | Participer au GPU Challenge 2026 | Stane-Junior | Décision validée |
| D2 | Toute affirmation sur son profil doit s'appuyer sur une preuve ; pas de compétence, de score ni de rôle inventé | Stane-Junior (consigne initiale) | Décision validée |
| D3 | « PM Authentication » désigne le dépôt `Stane316/EM-Auth` | Stane-Junior | Fait confirmé |
| D4 | Mode de travail : il cadre, spécifie et vérifie ; l'IA écrit l'essentiel du code | Stane-Junior | Fait confirmé |
| D5 | Une seule participation antérieure à un hackathon : Startup FairPlay | Stane-Junior | Fait confirmé |
| D6 | Déo Gracias Wi-Fi est un projet pour un proche, jamais un projet « client » | Stane-Junior (correction) | Fait confirmé |
| D7 | Sur HP Collection, il était Tech Lead d'une équipe de 3 pour un client réel ; il n'est pas propriétaire du produit | Stane-Junior (consigne initiale) | Fait confirmé (déclaration, cohérente avec Git) |
| D8 | Réponses de l'équipe aux questions 9 à 12 | Équipe, par sondages | Décision validée |
| D9 | **Aucun projet n'est sélectionné.** Le choix sera collectif, après recherche et évaluation. | Stane-Junior | Décision validée |
| D10 | Les coordonnées des coéquipiers ne sont pas écrites dans le dépôt public | Assistant, sans objection de Stane-Junior | Règle appliquée |

## 11. Hypothèses et pistes non validées

| N° | Élément | Nature | Ce qu'il faudrait pour trancher |
|---|---|---|---|
| H1 | Stane-Junior est le chef d'équipe | Hypothèse (il remplit le formulaire ; les trois autres sont saisis comme membres 2 à 4) | Sa confirmation |
| H2 | « ENA » désigne l'École Nationale d'Administration du Bénin | Hypothèse | Confirmation du membre |
| H3 | Le membre de l'ENA est le profil finance | Hypothèse | Filière et expérience du membre |
| H4 | Epi'AI est une structure liée à Epitech Bénin | Hypothèse fondée sur le nom | Confirmation |
| P1 | Idée « radar de liquidité » | Proposition de l'assistant | Décision de l'équipe |
| P2 | Nom d'équipe : CapitalX, Hackflow, FinHack (coéquipier) ; Akwè Labs, Cauri AI, Kernel Capital, FloatSense, Vigie (assistant) | Propositions | Nom réellement saisi : non documenté |
| P3 | Stane-Junior en « Lead produit et démo » | Proposition de l'assistant | Répartition des rôles par l'équipe |
| P4 | Textes des questions 13, 14 et 15 | Propositions | Savoir ce qui a été saisi |

## 12. Contraintes et exigences identifiées

| Contrainte | Détail | Source |
|---|---|---|
| Exploitation des GPU | Exigée « pleinement » par l'appel | Formulaire officiel |
| Problèmes réels | Les solutions répondent à des problématiques réelles de fintechs | Formulaire officiel |
| Engagement | Tous les membres suivent la formation en ligne, la phase de développement et les finales (question 16) | Formulaire officiel |
| Droit à l'image | Photo ou vidéo possible aux finales (question 17) | Formulaire officiel |
| Délai | Finales les 25 et 26 novembre 2026, soit huit jours après la rédaction de ce document | Guide Epi'AI |
| Données | Aucune donnée réelle de fintech béninoise n'est publique ; données synthétiques ou étrangères, à déclarer comme telles | Guide Epi'AI |
| Ressources GPU | Inconnues (modèle, heures, accès) | Guide Epi'AI |
| Compétences prouvées du porteur | Pas de machine learning prouvé ; forte capacité de livraison | Audit des dépôts |

**Écarts entre le guide Epi'AI et le formulaire officiel :**

| Point | Guide Epi'AI | Formulaire officiel | Lecture retenue |
|---|---|---|---|
| Formation | « hackathon de deux jours […] sans formation préalable » | « suivront une formation en ligne, puis une phase de développement » | Le formulaire prime ; à faire confirmer |
| Date limite | « avant le 15 novembre 2026 » | « Dimanche 15 novembre 2026 » | Sans objet aujourd'hui |
| Format | Hackathon de deux jours | Phase de développement, puis « journées finales » | À faire confirmer : la durée réelle de construction change tout le plan |

## 13. État actuel du travail

| Catégorie | Éléments |
|---|---|
| **Terminé** | Audit du portfolio ; réponses du formulaire individuel ; lecture du formulaire d'équipe ; rédaction des questions 13 à 15 ; lecture complète du guide ; vérification du chiffre MicroSave ; présente documentation |
| **Validé** | Participation ; composition de l'équipe ; réponses 9 à 12 ; principe de preuve ; absence de projet sélectionné |
| **En préparation** | Rien n'est en cours de développement : aucun code, aucune donnée, aucun dépôt de projet |
| **À décider par l'équipe** | Cas d'usage, idée, rôles, nom d'équipe (s'il n'est pas déjà saisi), outils de travail commun |
| **Dépend des organisateurs** | Sélection de l'équipe, accès GPU, formation, programme, critères, jury, règles sur les données |
| **Dépend de l'équipe** | Profils et disponibilités des trois coéquipiers, identification du profil finance, confirmation du dépôt |

## 14. Environnement technique

Détail : [TECHNICAL_WORKSPACE.md](TECHNICAL_WORKSPACE.md).

- Dépôt : `Stane316/EM-Auth-Maquette`, **public**, `https://github.com/Stane316/EM-Auth-Maquette`.
- Branche de travail : `arena/96c94885-em-auth-maquette`, issue du commit `97fe67e` de `main`.
- Ce dépôt a servi de support à la conversation. **Il n'a aucun lien avec le hackathon** : c'est la maquette d'un autre projet. Il ne contient aucun code de challenge.
- Aucun script, aucune dépendance, aucune expérimentation technique n'a été produit pour le hackathon.

## 15. Travaux réalisés dans le dépôt

| Dossier | Contenu | Origine |
|---|---|---|
| `docs/project-knowledge/` | Les huit documents de transfert du hackathon | Créé le 2026-11-17 |
| `portfolio-intelligence/` | Audit des 20 dépôts, compétences, descriptions prêtes à copier, incertitudes | Créé les 14 et 15 novembre |
| `portfolio-intelligence/formulaires/` | Journal de travail des deux formulaires et notes sur le guide | Créé les 14 et 15 novembre |
| `README.md` (racine) | Fichier initial du dépôt | Préexistant, non modifié |

## 16. Questions ouvertes

Liste complète et classée : [DECISIONS_AND_OPEN_QUESTIONS.md](DECISIONS_AND_OPEN_QUESTIONS.md).

Les six plus bloquantes :

1. La candidature d'équipe a-t-elle été déposée, et avec quels textes ?
2. L'équipe est-elle retenue par les organisateurs ?
3. Qui sont les trois coéquipiers, en compétences réelles, et qui porte la finance ?
4. Quel est le format réel : deux jours de hackathon, ou une phase de développement plus longue avec formation en ligne ?
5. Quelles ressources GPU, et à partir de quand ?
6. Quels sont les critères de notation ?

## 17. Risques et points de vigilance

| Risque | Pourquoi | Parade envisageable |
|---|---|---|
| Usage du GPU non justifié | Plusieurs cas d'usage se traitent sur CPU ; le jury peut y voir un GPU « utilisé pour lui-même » | Choisir un cas où une étape précise exige le GPU, et mesurer le gain contre une base sur CPU |
| Écart entre niveau déclaré et niveau prouvé | L'équipe a déclaré « Intermédiaire » en IA et coché « Data science » ; le porteur n'a aucun modèle entraîné à montrer | Connaître les réalisations des coéquipiers avant de choisir |
| Délai très court | Huit jours avant les finales, format réel inconnu | Un seul cas d'usage, périmètre réduit, démo de bout en bout |
| Données | Aucune donnée réelle disponible | Générateur de données propre, jeu de test séparé, mention « synthétique » |
| Chiffres avancés sans source | Le guide lui-même signale des dates contradictoires et des textes non lus | Ouvrir chaque source avant de la citer en finale |
| Présenter DabaPulse comme du machine learning | Le moteur est déterministe | Dire « intégration d'IA et moteur de décision », jamais « modèle entraîné » |
| Confondre l'existant et le travail du challenge | Les jurys attendent cette distinction | L'annoncer dans le pitch |
| Dépôt public | Cette documentation et l'audit du profil sont lisibles par tous | Pas de coordonnées ; déplacer dans un dépôt privé si souhaité |
| Projet présumé choisi | L'idée « radar de liquidité » figure peut-être dans la candidature | La traiter comme une option parmi d'autres |

## 18. Prochaines étapes

| N° | Action | Qui | Statut |
|---|---|---|---|
| 1 | Confirmer le dépôt de la candidature d'équipe et conserver les textes réellement saisis | Stane-Junior | Restant |
| 2 | Obtenir des organisateurs ou d'Epi'AI : sélection, calendrier, format, GPU, critères | Équipe | Restant |
| 3 | Recueillir pour chaque coéquipier : filière, compétences, un projet, disponibilité | Stane-Junior | Restant |
| 4 | Identifier le ou les profils finance | Équipe | Restant |
| 5 | Mener l'étude comparative des cas d'usage et des idées nouvelles | Nouvel agent avec l'équipe | Restant |
| 6 | Choisir un seul cas d'usage et une idée | Équipe | Restant |
| 7 | Répartir les rôles | Équipe | Restant |
| 8 | Préparer l'environnement commun, les données de test et une base sur CPU | Équipe | Restant |
| 9 | Définir l'architecture, puis le MVP | Nouvel agent avec l'équipe | Restant |

## 19. Instructions de reprise pour un nouvel agent

### Ton rôle

Tu interviens comme analyste stratégique, chercheur en IA appliquée à la finance, conseiller en innovation, architecte de solutions et expert en faisabilité technique.

### Ta mission

À partir de ce contexte, aide l'équipe à :

1. Comprendre les opportunités offertes par le hackathon.
2. Étudier les problématiques financières pertinentes en zone UEMOA.
3. Explorer les applications possibles de l'IA.
4. Identifier les cas d'usage qui justifient réellement le GPU.
5. Évaluer les dix idées du guide.
6. Repérer des opportunités supplémentaires.
7. Proposer de nouvelles idées de projet.
8. Comparer les orientations.
9. Évaluer leur faisabilité.
10. Dégager une solution différenciante et réalisable par cette équipe.
11. Définir progressivement une architecture technique.
12. Préparer la conception et le développement du MVP.

### Règles à respecter

- **Aucun projet n'est sélectionné.** Le « radar de liquidité » est une proposition de l'assistant précédent. Traite-le comme une option à évaluer au même titre que les autres.
- La sélection est une décision collective de l'équipe, après recherche et évaluation.
- Appuie-toi sur les faits confirmés, signale les incertitudes, demande les clarifications nécessaires.
- Ne suppose pas les compétences des trois coéquipiers : elles ne sont pas documentées.
- N'attribue à Stane-Junior aucune compétence absente de [TEAM_PROFILE.md](TEAM_PROFILE.md). Son niveau prouvé en machine learning est « non suffisamment documenté ».
- Ne cite aucun chiffre du guide en finale sans avoir ouvert la source.
- Le guide est l'avis d'Epi'AI, pas le règlement des organisateurs.

### Par où commencer

1. Lis ce document, puis [PROJECT_IDEAS.md](PROJECT_IDEAS.md) et [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md).
2. Lis [TEAM_PROFILE.md](TEAM_PROFILE.md) et [DECISIONS_AND_OPEN_QUESTIONS.md](DECISIONS_AND_OPEN_QUESTIONS.md).
3. Demande à Stane-Junior le PDF original du guide, les réponses aux six questions du [§16](#16-questions-ouvertes) et les profils des coéquipiers.
4. Propose ensuite une méthode de comparaison des cas d'usage, avant toute recommandation.

## 20. Références et sources

| Source | Nature | Accès |
|---|---|---|
| Conversation d'origine avec l'assistant (14 au 17 novembre 2026) | Source principale | Non transférable ; restituée dans ces documents |
| Formulaire d'équipe Microsoft Forms | Source officielle des organisateurs | `https://forms.cloud.microsoft/pages/responsepage.aspx?id=yrQckGK4KUCTBuXND22fhiwBaI7zSCNMhtPrLrHSiO9UMk9MVDYwNEFSVUJVVDVBUEI2RUdMQkFZQi4u&route=shorturl` — lu deux fois, la dernière le 2026-11-15 |
| Formulaire individuel Tally | Source Epi'AI | `https://tally.so/r/EqdZ0X` — jamais ouvert ; lu sur quatre captures |
| Sept captures d'écran | Pièces jointes de la conversation | Non versées au dépôt (elles contiennent des coordonnées) |
| Guide des équipes Epi'AI (PDF, 17 pages) | Source Epi'AI | Non versé au dépôt ; détenu par Stane-Junior |
| Dépôts GitHub de `Stane316` et `GROW-TECH-251` | Preuves du profil | Publics ; audit dans [`portfolio-intelligence/`](../../portfolio-intelligence/README.md) |
| MicroSave, « Liquidity — Solving agents' perennial problem » | Vérification d'un chiffre | `https://www.microsave.net/2017/08/31/liquidity-solving-agents-perennial-problem/` |
| MicroSave, « Fitting the Pieces of the Liquidity Management Puzzle » | Idem | `https://www.microsave.net/wp-content/uploads/2018/11/Liquidity_Management_Puzzle.pdf` |
| Sources citées par le guide (BCEAO, ARCEP, presse, jeux de données) | Sources secondaires | Liste complète avec liens dans [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md) |

Documents de ce dossier :

| Fichier | Contenu |
|---|---|
| [README.md](README.md) | Point d'entrée et ordre de lecture |
| [PARTICIPATION_FORM.md](PARTICIPATION_FORM.md) | Les deux formulaires, champ par champ, avec toutes les versions |
| [TEAM_PROFILE.md](TEAM_PROFILE.md) | Équipe, profil prouvé de Stane-Junior, grille de complémentarité |
| [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md) | Analyse du guide Epi'AI |
| [PROJECT_IDEAS.md](PROJECT_IDEAS.md) | Les dix fiches, les idées proposées, la grille de comparaison |
| [DECISIONS_AND_OPEN_QUESTIONS.md](DECISIONS_AND_OPEN_QUESTIONS.md) | Décisions, propositions, hypothèses, questions ouvertes |
| [TECHNICAL_WORKSPACE.md](TECHNICAL_WORKSPACE.md) | État du dépôt, inventaire des fichiers, éléments non versés |

## 21. Informations non vérifiées et limites de ce document

### Limite d'accès à la conversation

La première partie de la conversation (audit du portfolio, formulaire individuel, premiers échanges sur le formulaire d'équipe) n'était plus disponible mot pour mot au moment de la rédaction. Elle a été restituée à partir d'un résumé de session et des fichiers écrits au fil de l'eau dans `portfolio-intelligence/`. Les trois derniers échanges (captures des questions 6 à 12, guide PDF, demande de transfert) étaient disponibles en entier. Les sept captures et le PDF ont été relus pour ce document.

Conséquence : une formulation exacte de Stane-Junior dans les premiers échanges a pu se perdre. Les faits, décisions et textes de réponse sont conservés.

### Ce qui n'a pas pu être vérifié

| Élément | Raison |
|---|---|
| Dépôt effectif des deux candidatures | Jamais confirmé par une preuve ; la candidature individuelle est déclarée déposée |
| Valeurs réellement saisies dans les formulaires | Seules des captures partielles ont été vues |
| Questions 1 à 5 et 13 à 17 du formulaire d'équipe | Aucune capture |
| Pages du formulaire Tally hors des quatre captures | Formulaire inaccessible depuis l'environnement |
| Identité professionnelle des coéquipiers | Seuls le nom et l'école ont été vus |
| Dates des finales | Données par le guide, absentes du texte du formulaire |
| Chiffres et textes réglementaires cités par le guide | Non ouverts par l'assistant, sauf MicroSave |
| Existence d'un travail « Financial Inclusion — Zindi » de Stane-Junior | Déclaré par lui, introuvable dans les 20 dépôts accessibles |
| Sites déployés de ses projets | Réseau de l'environnement limité à GitHub, npm et PyPI |
