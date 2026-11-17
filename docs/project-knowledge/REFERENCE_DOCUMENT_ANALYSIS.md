# Analyse du document de référence — « Guide des équipes Epi'AI »

- **Dernière mise à jour :** 2026-11-17
- **Retour au document principal :** [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md)
- **Les dix fiches de cas d'usage sont détaillées dans :** [PROJECT_IDEAS.md](PROJECT_IDEAS.md)

## 1. Identification du document

| Élément | Valeur |
|---|---|
| Titre | « GPU Challenge 2026 · Guide des équipes Epi'AI » |
| Fichier reçu | `GPU_Challenge_2026_Guide_Epi'AI (2).pdf` |
| Volume | 17 pages, environ 2 Mo |
| Date portée | 14 novembre 2026 ; mention « @Kanta » en tête |
| Arrêt des informations | 14 novembre 2026, selon le guide |
| Transmis par | Stane-Junior, le 15 novembre 2026, comme document « fourni par le comité » |
| Lecture | Texte lu en entier, liens extraits. La seule image de chaque page est le logo Epi'AI. |
| Présence dans le dépôt | **Non versé.** Le dépôt est public et le document appartient à Epi'AI. Stane-Junior en a l'original. |

### Qui parle dans ce document

Le guide le dit deux fois :

> Epi'AI l'a rédigé pour ses équipes : ce n'est pas un document des organisateurs.

> Guide rédigé par Epi'AI pour ses équipes. Il ne représente pas les organisateurs du GPU Challenge.

Il sépare lui-même trois niveaux : ce qui est confirmé par les organisateurs ou par une source citée, ce qu'Epi'AI a déduit, et ce qui est marqué « À confirmer ». Cette analyse garde la même séparation.

**Conséquence pour la suite :** les conseils du guide sont un avis informé. Les exigences opposables viennent du formulaire officiel.

## 2. Objectif général

Aider les équipes d'Epi'AI à choisir un seul cas d'usage, à préparer leurs données et leur démo, et à arriver prêtes aux finales des 25 et 26 novembre 2026.

Marche à suivre proposée par le guide :

1. Lire le cadre et le contexte, « finance et IA autour de la même table ».
2. Parcourir les dix fiches et choisir **un seul** cas d'usage.
3. Avant le hackathon, préparer l'environnement, des données de test et la répartition des rôles.
4. Pendant les deux jours, viser une démo qui tourne de bout en bout, puis préparer le pitch.

Sur les équipes, le guide précise : Epi'AI cherche à mettre un à deux profils finance dans chaque équipe. Ils posent le problème, valident les hypothèses et défendent la solution devant un jury de la fintech. Les profils techniques doivent comprendre assez de finance pour ne pas bâtir une solution à côté du sujet.

## 3. Le cadre du challenge selon le guide

### Présenté comme confirmé par l'appel à candidatures

| Sujet | Ce qui est annoncé |
|---|---|
| Finales | 25 et 26 novembre 2026, Epitech Bénin, Cotonou |
| Candidatures | Jusqu'au 15 novembre 2026, une par équipe de 4, remplie par le chef d'équipe |
| Déroulé | Équipes retenues : accès à des GPU, puis présentation des solutions lors des finales |
| Défi | Solutions d'IA appliquées à la finance digitale, sur des problèmes réels de fintechs ; elles doivent exploiter pleinement la puissance des GPU |
| Organisation | Fintech Academia, volet académique du Next Fintech Forum 2026, avec l'Alliance Fintech UEMOA, Udutech, Payfonte et Epitech Bénin |

### Présenté comme non public

Le guide n'a trouvé aucune source sur : le programme heure par heure, les livrables, le jury, les critères de notation, les prix, le fournisseur et le quota de GPU, les règles sur les données et la propriété intellectuelle. Il ajoute : « Ne supposez rien de ces points dans vos plans. »

Il ne sait pas non plus si les finalistes seront invités au Next Fintech Forum (« à confirmer »).

### Écarts avec le formulaire officiel, relevés par l'assistant

| Point | Guide | Formulaire officiel |
|---|---|---|
| Format | « hackathon de deux jours à Epitech Bénin, sans formation préalable » | « suivront une formation en ligne, puis une phase de développement, avant de présenter leurs projets lors des journées finales » |
| Date limite | « avant le 15 novembre 2026 » | « Dimanche 15 novembre 2026 » |

Le formulaire vient des organisateurs : il prime. Le format réel reste à faire confirmer.

### Le Next Fintech Forum 2026 et les partenaires

- 8e édition, 26 et 27 novembre 2026, Cotonou (Sofitel Marina), organisée par l'Alliance Fintech UEMOA.
- Thème : « From Adoption to Value : Industrializing Fintech to Accelerate UEMOA Growth ».
- Le programme annonce plus de 500 décideurs, dont des représentants de la BCEAO, de la Commission de l'UEMOA, de la BOAD et de l'AMF-UMOA, et un espace Fintech Academia pour universités, chercheurs et étudiants.
- **Alliance Fintech UEMOA :** organisation régionale de fintechs et de startups, annoncée à Abidjan le 27 novembre 2024. Axes : paiements numériques, cadres réglementaires, renforcement de capacités, accès au financement.
- **Payfonte :** orchestration de paiements sur plus de 22 marchés africains ; mobile money, virements et cartes via une seule API. Son métier touche la fraude, le routage et la réconciliation des flux.
- **Udutech :** aucune information publique fiable trouvée par le guide.

## 4. Problématiques financières abordées

### 4.1 Les paiements instantanés : PI-SPI

- PI-SPI est la plateforme de paiement instantané interopérable de la BCEAO, lancée le 30 septembre 2025.
- Selon le communiqué de la BCEAO du 2 octobre 2026 : 175 participants, plus de 38 millions de personnes y ont accès.
- Depuis le 2 novembre 2026, les transferts interopérables de monnaie électronique entre particuliers passent par PI-SPI.
- Envoi gratuit jusqu'à 8 000 FCFA cumulés par jour ; au-delà, frais plafonnés à 0,8 % hors taxes ; réception gratuite. La BCEAO estime qu'environ 75 % des transactions de monnaie électronique restent sous ce seuil.
- Les transferts transfrontaliers dans l'UEMOA suivront les mêmes conditions à partir du 1er juin 2027.

Avis d'Epi'AI : un modèle économique fondé sur les frais de transfert est fragile. La valeur se crée autour du paiement : fraude, scoring, vérification d'identité, outils pour commerçants. Les volumes réels de PI-SPI et ses règles techniques contre la fraude ne sont pas publics : ne pas les inventer dans un pitch.

### 4.2 Le mobile money au Bénin

Chiffres de l'ARCEP Bénin au 30 septembre 2025 (Observatoire SFM, T3 2025) :

| Indicateur | Valeur |
|---|---|
| Comptes actifs | 11,06 millions |
| Comptes dormants | 19,64 millions |
| Part des comptes | MTN 52 %, Celtiis Cash 25 %, Moov 23 % |
| Part de la valeur des transactions | MTN 85 %, Moov 8 %, Celtiis 7 % |
| Agents actifs (au moins une transaction en 90 jours) | 460 699 |
| Accepteurs marchands actifs | 291 632 |

Conseil du guide : toujours préciser « actifs » ou « enregistrés ». Environ deux comptes sur trois sont dormants, et l'écart change tout pour un modèle de crédit ou de liquidité.

### 4.3 Les fraudes observées sur le terrain

La presse décrit surtout des fraudes humaines :

- faux agents d'opérateur qui se font donner des codes SMS (en réalité des codes de réinitialisation) puis vident le portefeuille ;
- échange de carte SIM ;
- détournements par un agent ou un employé ;
- fausses ventes sur les réseaux sociaux ;
- retraits frauduleux aux guichets.

Le guide n'a trouvé aucune statistique officielle de pertes, seulement des cas rapportés. Il conseille de le dire dans le pitch plutôt que d'avancer un chiffre.

### 4.4 Les textes qui encadrent un projet

| Texte | Ce qu'il dit, selon le guide | Pourquoi cela concerne un projet |
|---|---|---|
| Instruction BCEAO 001-01-2024 (services de paiement) | Ouvre les services de paiement aux établissements de paiement agréés, exige une authentification forte, rend l'émetteur responsable des actes de ses agents | Un projet d'étudiants ne peut pas se licencier : il faut vendre à des institutions déjà agréées |
| Instruction BCEAO 020 (8 octobre 2026, en vigueur le 2 novembre) | Plafond du solde de monnaie électronique par client et par émetteur « de 2 à 4 millions FCFA », recharges mensuelles « de 10 à 15 millions FCFA » (formulation du guide) | Plus d'argent dans les portefeuilles : plus de risque et plus de contrôles attendus |
| Instructions BCEAO du 18 mars 2025 (001-03, 002-03, 003-03) | Contrôle interne et conformité ; seuil de déclaration des espèces transfrontalières ; identification et connaissance du client | Base du copilote de conformité et de la vérification d'identité |
| Code du numérique du Bénin (loi 2017-20, livre 5), APDP | Consentement, déclaration préalable à l'autorité de protection des données avant toute collecte, notification des violations | Raison pour laquelle on travaille sur des données synthétiques ou publiques |

Réserves du guide lui-même :

- Epi'AI n'a pas lu le texte intégral des instructions de 2025 ni les articles du Code du numérique sur les décisions automatisées ou les données biométriques. Avant de citer un article, ouvrir le texte.
- Deux dates restent contradictoires selon les sources : l'entrée en vigueur de l'instruction 001-01-2024 et l'échéance de connexion à PI-SPI (30 juin ou septembre 2026). Ne pas les citer.
- Le capital exigé pour une licence, « 10 à 100 millions de FCFA selon le type d'activité », vient d'une source secondaire à vérifier dans le texte.

### 4.5 Une porte d'entrée vers le marché : le LIF BCEAO

La BCEAO a ouvert un laboratoire d'innovation financière. La première cohorte peut candidater jusqu'au 30 novembre 2026. Sont éligibles : paiements, agrégation de comptes, microcrédit, scoring de crédit, épargne digitale, tontines en ligne, vérification d'identité biométrique. Les cryptoactifs sont exclus. Les tests durent environ six mois sous supervision. Pour un projet de scoring ou d'identité, c'est un argument pour la diapositive « après le challenge ».

## 5. Les idées de projets et les cas d'utilisation

Le guide donne dix fiches, en trois familles :

| Famille | Fiches |
|---|---|
| A · Fraude, identité et conformité | 1 Fraude sur paiements instantanés · 2 Arnaques financières numériques · 3 Identité et documents falsifiés · 4 Copilote de conformité KYC/LAB |
| B · Crédit, trésorerie et comptabilité | 5 Risque de crédit des petits commerçants · 6 Liquidité des agents mobile money · 7 Comptabilité des TPE · 8 Flux transfrontaliers |
| C · Relation client et langues locales | 9 Réclamations clients · 10 Assistant vocal en langues locales |

Chaque fiche donne le problème, les données réalistes, une méthode, les pièges et la démo à montrer. Elles sont restituées intégralement dans [PROJECT_IDEAS.md](PROJECT_IDEAS.md).

Mise en garde générale du guide : aucune donnée réelle de fintech béninoise n'est publique. La plupart des projets reposeront sur des données synthétiques ou étrangères ; le dire franchement dans le pitch est mieux perçu qu'un score trop beau. Les licences citées sont à vérifier avant tout usage.

### Le tableau « Comment choisir » du guide

C'est l'avis d'Epi'AI, pas celui des organisateurs. Le guide pose en principe qu'un seul cas d'usage bien fini vaut mieux que deux à moitié faits.

| Si l'équipe a… | Piste la plus réaliste selon le guide |
|---|---|
| Peu de temps GPU et un profil finance solide | 6 (liquidité) ou 5 (crédit) : données synthétiques défendables, pas de GPU |
| Des profils de vision ou de langage | 3 (documents) ou 2 (arnaques) : le GPU a un vrai rôle |
| Un profil juridique ou conformité | 4 (copilote) : la valeur est dans la qualité des citations |
| Envie d'un effet « waouh » et du temps | 10 (voix) : la plus risquée, se limiter à une quinzaine d'intentions |
| Des difficultés pour trouver des données | Éviter 8 |

## 6. Technologies et approches d'IA mentionnées

| Catégorie | Éléments cités |
|---|---|
| Modèles tabulaires | LightGBM, XGBoost (y compris `device="cuda"`), CatBoost, régression logistique |
| Graphes et séquences | GraphSAGE, modèles de séquence, variables de graphe |
| Séries temporelles | Base saisonnière, modèles statistiques, Chronos, TimesFM (2.5 sous Apache-2.0 ; 3.0 non commerciale) |
| Texte | TF-IDF, XLM-R, CamemBERT, LLM avec taxonomie fixe et sortie JSON, RAG avec citations |
| Ajustement de LLM | LoRA, QLoRA |
| Vision | Détection de document, OCR, classificateur de falsification, comparaison de visage, carte de chaleur |
| Parole | MMS-300m, Whisper-small, identification de la langue |
| Explicabilité | SHAP, probabilité calibrée |
| Outils | Docker, MLflow, Weights & Biases, `tmux`, `nohup`, `nvidia-smi` |
| Mesures | PR-AUC, rappel à budget d'alertes fixe, coût attendu, WAPE plutôt que MAPE, WER, latence p95 |
| Jeux de données | PaySim, IBM AMLworld, Sparkov, MOZ-Smishing, SIDTD, DocXPand-25k, Home Credit, German Credit, Give Me Some Credit, jeux Zindi (Xente), Masakhane, ALFFA, FFSTC |

## 7. Possibilités d'exploitation des GPU

Position du guide : « Le défi s'intitule "GPU", mais le jury jugera d'abord un problème résolu. Utilisez le GPU pour la seule étape qui en a besoin, et laissez le reste sur CPU. »

| Avec GPU | Sur CPU suffit |
|---|---|
| Ajustement de modèles de langage (LoRA, QLoRA) | Régression logistique |
| Reconnaissance vocale (fon, yoruba) | LightGBM, XGBoost sur des tableaux de quelques millions de lignes |
| Modèles de vision pour pièces d'identité | Règles de cohérence |
| Vectorisation de gros corpus pour un assistant documentaire | Prévisions statistiques |
| Réseaux de graphes sur de gros graphes | |

Autres points :

- XGBoost sait entraîner sur GPU, et un modèle entraîné ainsi peut tourner sur un ordinateur sans GPU. Pour la fraude ou le crédit, la démo ne dépend alors pas du GPU.
- **Un modèle simple d'abord** (d'après les « Rules of ML » de Google) : construire un modèle de base sur CPU, noter son score, ne garder le modèle GPU que s'il le bat de façon mesurable.
- **QLoRA :** charge le modèle en 4 bits et n'entraîne que de petits adaptateurs ; ajuster un modèle de 7 à 10 milliards de paramètres devient possible sur un seul GPU modeste. Un auteur estime la mémoire à environ 11,6 Go, contre 160 Go pour un ajustement complet ; ce sont des estimations, pas des mesures. L'ajustement enseigne un style plus que des connaissances : pour des connaissances, commencer par le prompt et le RAG.
- **Latence :** un paiement instantané se décide en une fraction de seconde. Le modèle qui note la transaction doit être petit ; les gros LLM servent aux tâches asynchrones. Donner le p95 mesuré, pas la moyenne.

Le guide rappelle qu'il ne connaît ni le modèle de GPU, ni le nombre d'heures, ni le mode d'accès.

## 8. Contraintes techniques et préparation

### Avant le hackathon

- Un dépôt partagé et un environnement identique pour les quatre (image Docker ou dépendances figées).
- Un essai de bout en bout sur un extrait des données, en local, avant de consommer des heures de GPU.
- Un journal de chaque entraînement, avec les graines aléatoires.
- Un jeu de test écrit par l'équipe et mis de côté dès le début.

### Le jour de l'accès GPU

- Tester l'accès le premier jour : `nvidia-smi`, une installation de bibliothèques, un petit entraînement.
- Lancer les tâches longues dans `tmux` ou `nohup` ; enregistrer des points de reprise sur un stockage durable.
- Partager les heures comme un budget, avec un calendrier de réservation.

### Erreurs qui gaspillent des heures de GPU

GPU inactif parce que le chargement des données est trop lent, lots trop petits, balayages d'hyperparamètres avant que le modèle de base fonctionne, notebooks oubliés allumés, pas de point de reprise, débogage sur toutes les données. Le guide précise que ces points viennent de la pratique courante, pas d'une source citée.

### Données

- Vérifier la licence de chaque jeu et garder la trace de son origine. Certains (Home Credit, IEEE-CIS) interdisent la redistribution.
- Jamais de vraies données de clients dans un dépôt public ou une API de LLM publique ; les secrets restent dans des variables d'environnement.
- Si l'on synthétise, écrire le générateur proprement : c'est un livrable en soi.
- Un jeu de test généré avec le même modèle que l'entraînement donne des scores flatteurs et trompeurs : les séparer.

## 9. S'organiser en équipe mixte IA et finance

Selon des témoignages de juges cités par le guide, qui précise que ce ne sont pas les critères de ce challenge : une démo qui marche de bout en bout, une portée limitée, un utilisateur précis et une faiblesse reconnue pèsent plus que l'ambition.

Les quatre rôles proposés sont repris dans [TEAM_PROFILE.md](TEAM_PROFILE.md#rôles-proposés-par-le-guide-epiai).

Le profil finance n'est pas un spectateur : il écrit les règles d'étiquetage et les scénarios de risque, juge si les résultats ont du sens, teste l'outil comme un utilisateur réel et traduit les scores en conséquences (argent économisé, coût d'un faux positif, taux d'acceptation). Les profils techniques lui expliquent chaque décision de modèle en langage simple : « si le financier ne comprend pas, le jury non plus ».

### Découpage du temps suggéré

| Phase | Part du temps | Objectif |
|---|---|---|
| Cadrage | 20 % | Un problème, un utilisateur, des données, un modèle de base qui tourne |
| Construction | 50 % | Le modèle principal et la chaîne de démo, de bout en bout |
| Finition | 30 % | Robustesse, preuves d'IA responsable, répétitions du pitch |

Gel des fonctionnalités vers 70 % du temps. Prévoir une vidéo de la démo en secours : le Wi-Fi ou l'accès GPU peuvent lâcher.

### Pourquoi des équipes échouent

- Un chatbot de plus, sans rien qui le distingue.
- Un périmètre trop large, plusieurs cas d'usage à moitié faits.
- Aucun modèle de base de comparaison, ou un GPU utilisé pour lui-même.
- Des métriques irréalistes (fuite d'information, jeu de test tiré des mêmes données).
- Aucune validation par un profil finance.

Routine proposée : un point de dix minutes par jour, un seul tableau de tâches, une décision prise en cinq minutes ou tranchée par le lead concerné.

## 10. Réussir le pitch

Le guide ne connaît ni le jury ni la grille de notation. Ses conseils viennent de pratiques observées en hackathon et en présentation à des investisseurs africains.

Ce que les jurys récompensent, selon ces sources :

- Un problème que la salle reconnaît, dit en une phrase : ce que le produit fait, pour qui.
- Une démo qui marche, montrée dans les 90 premières secondes, avec un seul parcours et des champs pré-remplis.
- Une distinction claire entre ce qui a été construit pendant le challenge et ce qui existait déjà ; une faiblesse nommée plutôt que cachée.
- Pour des investisseurs africains : preuve de demande, modèle économique précis, prise en compte de la réglementation et de la concurrence.

Structure de quatre minutes proposée :

| Moment | Contenu |
|---|---|
| 0:00 – 0:30 | Le problème et l'utilisateur, avec un cas concret du Bénin |
| 0:30 – 1:30 | La démo, en direct ou enregistrée |
| 1:30 – 2:30 | Comment ça marche, les mesures, la comparaison avec le modèle de base |
| 2:30 – 3:30 | Modèle économique, cadre réglementaire, plan de pilote |
| 3:30 – 4:00 | L'équipe et la demande |

La durée réelle du pitch et la possibilité d'une démo en direct ne sont pas connues.

Chiffres qui convainquent : précision et rappel à taux de faux positifs fixé, ou coût pondéré ; latence p95 et comparaison à un modèle simple ; écart d'erreur entre groupes si le modèle décide d'une personne ; mention nette « données réelles ou synthétiques ».

Modèle économique : ne pas s'appuyer sur des frais de transfert. Vendre à des institutions déjà agréées est plus réaliste qu'une demande de licence. Un calcul de marché « par le bas » convainc plus qu'un pourcentage d'un grand marché. Sans chiffres de coût, dire ce qu'on mesurerait pendant un pilote de huit à douze semaines avec un partenaire.

À éviter : parler d'une fonction qui n'existe pas, lire ses diapositives, empiler le jargon, annoncer un chiffre de marché sans source. Un seul orateur déroule le fil.

## 11. IA responsable et données

- À la connaissance du guide, il n'existe pas de règlement contraignant de la BCEAO sur l'IA.
- Le gouverneur de la BCEAO a dit en mai 2025 que les décisions prises par l'IA doivent être transparentes, explicables et non discriminatoires, et met en garde contre une dépendance aux seules solutions étrangères, surtout dans le cloud.
- Le CONOBAFI a annoncé un comité technique sur l'IA, dont les sorties seront des recommandations.
- Le guide insiste : ce sont des signaux, pas des règles.

Liste de contrôle proposée :

| Point | Contenu |
|---|---|
| Explications | Raisons principales de chaque décision (SHAP ou équivalent), en français. SHAP est approximatif : une aide, pas une preuve. |
| Surveillance humaine | Une personne valide les décisions à fort impact (refus de crédit, gel de compte) |
| Équité | Comparer les taux d'erreur entre groupes (genre, région, tranche d'âge, urbain ou rural) et publier l'écart |
| Fiche du modèle | Données, mesures, limites connues, sur une page |
| Données | Synthétiques ou anonymisées ; jamais de vrais clients dans un dépôt public ou une API publique |
| Hallucinations | Recherche documentaire avec citations, sortie structurée, refus quand la source est faible, aucun montant produit par le LLM sans calculatrice |
| Honnêteté | Dire que des résultats sur données synthétiques ne prouvent pas la performance réelle |

Protection des données au Bénin : selon un résumé secondaire, le consentement est la base légale principale, le traitement doit être déclaré à l'APDP avant la collecte et les violations lui sont notifiées sans délai. Le guide n'a pas vérifié les règles sur les décisions automatisées, la biométrie ou les transferts hors du pays. Règle pratique : si des personnes réelles sont concernées (messages, voix, photos de pièces), obtenir leur accord écrit ; pour les pièces d'identité, n'utiliser que des documents fictifs.

Impression finale du guide, présentée comme une conviction et non comme un critère publié : une équipe qui sait où son modèle peut se tromper, qui le dit, et qui a pensé à la personne en face de la décision, gagne en crédibilité.

## 12. Exigences des organisateurs que le guide rapporte

Le guide n'ajoute aucune exigence à celles de l'appel : équipe de 4, une candidature par équipe, solutions d'IA pour la finance digitale sur des problèmes réels, exploitation pleine des GPU. Tout le reste est conseil.

## 13. Pistes à examiner pour notre équipe

Ce sont des observations pour l'étude comparative, **pas une sélection**.

| Observation | Fondement |
|---|---|
| Les six cas cochés par l'équipe couvrent les trois familles du guide | Question 12 du formulaire d'équipe |
| Parmi ces six, le guide juge que le GPU a « un vrai rôle » pour les arnaques ; pour la fraude, seulement via un réseau de graphes ou un modèle de séquence ; pour le crédit et la liquidité, pas de GPU nécessaire | Fiches et tableau « Comment choisir » |
| Le copilote de conformité et les réclamations reposent sur des LLM ; le GPU y sert à l'ajustement ou à la vectorisation | Tableau GPU du guide |
| Le seul acquis logiciel documenté de l'équipe (DabaPulse) ressemble au cas « liquidité » : prévision, risque, décision, simulation | Audit des dépôts |
| Le guide valorise ce que l'équipe sait déjà faire côté produit : démo de bout en bout, API, intégrations simulées | Sections 6 et 7 du guide |
| Le choix dépend du profil finance et des compétences ML des coéquipiers, tous deux inconnus | [TEAM_PROFILE.md](TEAM_PROFILE.md) |

## 14. Sources citées par le guide

Aucune n'a été ouverte par l'assistant, sauf MicroSave. Les liens sont ceux du PDF.

| Sujet | Source | Lien |
|---|---|---|
| Next Fintech Forum 2026 | Digital Mag CI | `https://digitalmag.ci/next-fintech-forum-2026-cotonou-devient-la-capitale-de-la-fintech-en-afrique-de-louest/` |
| Next Fintech Forum 2026 | Financial Afrik | `https://www.financialafrik.com/en/event/cotonou-next-fintech-forum-2026-8th-edition/` |
| Alliance Fintech UEMOA | Financial Afrik | `https://www.financialafrik.com/2024/12/03/linitiative-alliance-fintech-uemoa-desormais-sur-les-rails` |
| Payfonte | Payfonte | `https://payfonte.com/about` |
| PI-SPI | Communiqué BCEAO du 2 octobre 2026 | `https://www.bceao.int/sites/default/files/2026-10/Communiqu%C3%A9%20du%202%20octobre%202026.pdf` |
| Mobile money au Bénin | ARCEP Bénin, Observatoire SFM T3 2025 | `https://arcep.bj/wp-content/uploads/2025/12/Observatoire-SFM-T3_2025_TAB.pdf` |
| Faux agents | La Nouvelle Tribune | `https://lanouvelletribune.info/2026/09/mobile-money-au-benin-attention-a-ces-faux-agents-qui-prennent-le-controle-des-comptes/` |
| Retraits frauduleux | Benin Web TV | `https://beninwebtv.com/en/benin-fraudster-specializing-in-fraudulent-withdrawals-from-momo-booths-arrested/` |
| Fraude et responsabilité de l'émetteur | Financial Afrik | `https://www.financialafrik.com/2026/10/07/theme-fraude-au-mobile-money-et-responsabilite-de-lemetteur-de-monnaie-electronique-dans-luemoa/` |
| Instruction 001-03-2025 (blanchiment) | Commission bancaire de l'UMOA | `https://www.cb-umoa.org/sites/default/files/2025-08/Instruction%20n%C2%B0001-03-2025%20du%2018%20mars%2025%20portant%20modalit%C3%A9s%20de%20mise%20en%20oeuvre%20par%20les%20IF%20de%20leurs%20obligations%20en%20mati%C3%A8re%20de%20lutte%20contre%20le%20blanchiment%20de%20capitaux.pdf` |
| Instruction 003-03-2025 (identification) | Commission bancaire de l'UMOA | `https://cb-umoa.org/sites/default/files/2025-08/Instruction%20n%C2%B0003-03-2025%20du%2018%20mars%2025relative%20%C3%A0%20l%27identification-%20la%20v%C3%A9rification%20de%20l%27identit%C3%A9%20et%20la%20connaissance%20de%20la%20client%C3%A8le%20par%20les%20IF.pdf` |
| Code du numérique du Bénin | Loi 2017-20 | `https://sgg.gouv.bj/doc/loi-2017-20/download` |
| Résumé du Code du numérique | ConsentStack | `https://www.consentstack.io/regulations/bj-code-numerique` |
| LIF BCEAO | Droit Médias Finance | `https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1413-uemoa-sandbox-reglementaire-la-bceao-lance-la-1ere-cohorte-des-fintechs-pour-le-bac-a-sable-de-tests-reglementaire-en-excluant-les-cryptoactifs` |
| Comités du CONOBAFI | Droit Médias Finance | `https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1221-uemoa-le-conobafi-met-en-place-trois-comites-techniques-sur-lia-la-cybersecurite-et-les-reclamations-pour-renforcer-le-secteur-financier` |
| BCEAO et IA | OSIRIS | `https://www.osiris.sn/bceao-et-intelligence-artificielle-le-challenge-de-la-gouvernance.html` |
| Liquidité des agents | MicroSave | `https://www.microsave.net/liquidity-solving-agents-perennial-problem/` |
| XGBoost sur GPU | Documentation XGBoost | `https://xgboost.readthedocs.io/en/stable/gpu/` |
| Rules of ML | Google | `https://developers.google.com/machine-learning/guides/rules-of-ml/` |
| QLoRA | Towards Data Science | `https://towardsdatascience.com/qlora-how-to-fine-tune-an-llm-on-a-single-gpu-4e44d6b5be32` |
| Conseils de juges | JetBrains | `https://blog.jetbrains.com/ai/2026/06/how-to-win-a-hackathon-notes-from-the-judging-table/` |
| Conseils de juges | DEV Community | `https://dev.to/kurbaitaev/what-judges-actually-score-notes-from-a-year-of-hackathon-judging-3p4l` |
| Pitch | TechCabal | `https://techcabal.com/2025/10/10/pitch-deck-2025/` |
| Pitch | Y Combinator | `https://www.ycombinator.com/blog/guide-to-demo-day-pitches/` |
| SHAP | GOV.UK | `https://www.gov.uk/ai-assurance-techniques/nvidia-explainable-ai-for-credit-risk-management-applying-accelerated-computing-to-enable-explainability-at-scale-for-ai-powered-credit-risk-management-using-shapley-values-and-shap` |
| Jeu de données AML | IBM AMLworld | `https://github.com/IBM/AML-Data` |
| Jeu de documents | SIDTD | `https://github.com/Oriolrt/SIDTD_Dataset` |
| Jeu mobile money | PaySim | `https://www.kaggle.com/datasets/ealaxi/paysim1` |

Cités sans lien dans le PDF : Sparkov, MOZ-Smishing, DocXPand-25k, Home Credit, German Credit, Give Me Some Credit, jeux Zindi (Xente), Masakhane, ALFFA, FFSTC, MMS-300m, Chronos, TimesFM, Francoscope 2023, instruction BCEAO 020, instruction 001-01-2024.

## 15. Ce que l'assistant a vérifié lui-même

| Point | Résultat |
|---|---|
| « Jusqu'à une transaction sur cinq » refusée faute de liquidité (MicroSave) | Confirmé comme un maximum. MicroSave écrit que les agents ne peuvent pas réaliser jusqu'à une transaction sur cinq ; le détail par pays donne 20 % en Tanzanie et 3 % au Sénégal. À citer avec « jusqu'à » et « dans certains pays ». |
| Formation en ligne | Le formulaire officiel l'annonce ; le guide dit l'inverse |
| Tout le reste | Non vérifié |
