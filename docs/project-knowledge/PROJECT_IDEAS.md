# Idées de projets — inventaire et grille de comparaison

- **Dernière mise à jour :** 2026-11-17
- **Retour au document principal :** [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md)
- **Contexte financier, réglementaire et GPU :** [REFERENCE_DOCUMENT_ANALYSIS.md](REFERENCE_DOCUMENT_ANALYSIS.md)

## Avertissement

**Aucun projet n'est sélectionné.** Ce fichier conserve toutes les idées disponibles pour que l'équipe puisse en reprendre une telle quelle, en combiner plusieurs, en améliorer une, ou concevoir une solution originale. Le formulaire officiel admet les idées libres.

Les statuts employés :

| Statut | Signification |
|---|---|
| Disponible | Idée fournie par les organisateurs ou le guide ; ni retenue ni écartée |
| Intérêt déclaré | Cochée par l'équipe à la question 12 ; cela ne vaut pas choix de projet |
| Proposition en attente | Idée de l'assistant, non validée |
| Écartée | Rejetée, avec sa raison |

À ce jour, **aucune idée n'est écartée par l'équipe**, et aucune n'est validée.

## 1. Correspondance des numérotations

Les formulaires et le guide listent les mêmes dix cas dans un ordre différent. Ce fichier suit la numérotation du guide (G1 à G10).

| Guide | Cas d'usage | N° dans les formulaires | Famille du guide | Coché par l'équipe (question 12) | Recommandé à Stane-Junior pour sa candidature individuelle |
|---|---|---|---|---|---|
| G1 | Détection de fraude sur les paiements instantanés | 1 | A | Oui | Oui |
| G2 | Détection des arnaques financières numériques | 7 | A | Oui | — |
| G3 | Vérification d'identité et détection de documents falsifiés | 4 | A | Non | Écarté de la recommandation |
| G4 | Copilote de conformité KYC/LAB pour fintechs | 5 | A | Oui | — |
| G5 | Évaluation du risque de crédit des petits commerçants | 3 | B | Oui | — |
| G6 | Prévision de liquidité des agents mobile money | 6 | B | Oui | Oui |
| G7 | Comptabilité intelligente pour les TPE | 8 | B | Non | — |
| G8 | Prévision des flux de paiements transfrontaliers | 9 | B | Non | — |
| G9 | Analyse intelligente des réclamations clients | 10 | C | Oui | Oui |
| G10 | Assistant financier vocal en langues locales | 2 | C | Non | Écarté de la recommandation |

« Écarté de la recommandation » ne concerne que la candidature individuelle de Stane-Junior : ses deux dépôts liés (reconnaissance vocale, lecture de documents) sont restés au stade du plan. Ce n'est pas un jugement sur la valeur du cas pour l'équipe.

## 2. Les dix fiches du guide

Chaque fiche restitue le guide Epi'AI. La ligne « Utilisateurs concernés » est **déduite** de la démo décrite quand le guide ne les nomme pas ; c'est signalé. La ligne « Liens avec l'équipe » vient de l'audit des dépôts de Stane-Junior ; les acquis des trois autres membres ne sont pas documentés.

### G1 — Détection de fraude sur les paiements instantanés

| Rubrique | Contenu |
|---|---|
| Problème | Avec PI-SPI, l'argent circule en quelques secondes. Un portefeuille vidé après un échange de SIM, ou un compte « mule » qui éclate les fonds entre plusieurs réseaux, ne laisse presque pas de temps pour réagir. |
| Utilisateurs concernés | Déduit : équipes fraude d'un émetteur de monnaie électronique, d'une banque ou d'un agrégateur de paiement |
| Données | PaySim (mobile money synthétique, Kaggle `ealaxi/paysim1`), IBM AMLworld (CDLA-Sharing-1.0), Sparkov (CC0). Aucune n'est béninoise. Licence de PaySim à vérifier avant redistribution. |
| Fonctionnement envisagé | Commencer par un LightGBM ou un XGBoost sur des variables de comportement : nombre et montant par compte sur 1 min, 1 h, 24 h ; nouveau bénéficiaire ; montant rapporté à la médiane du compte. |
| Contribution de l'IA | Score de risque par transaction, raisons de la décision |
| Pertinence du GPU | Selon le guide, « le GPU ne sert vraiment qu'à une comparaison avec un réseau de graphes (GraphSAGE) ou un modèle de séquence ». XGBoost peut aussi s'entraîner sur GPU. |
| Difficultés et pièges | PaySim fuit l'information par les soldes avant et après (les fraudes vident le compte) : découper par temps, retirer ou auditer ces variables. Ne pas juger sur l'exactitude : PR-AUC, rappel à budget d'alertes fixe, coût attendu. Contrainte de latence : la décision se prend en une fraction de seconde. |
| Démo attendue | Un flux rejoué dans une petite API ; un tableau de bord avec score, trois raisons en français (« nouveau bénéficiaire, montant 8 fois la médiane ») et trois décisions : laisser passer, demander un code, bloquer. |
| Liens avec l'équipe | Stane-Junior connaît la mécanique d'un paiement Mobile Money (Déo Gracias Wi-Fi), pas la modélisation de la fraude. Payfonte, partenaire du challenge, travaille sur la fraude et le routage. |
| Statut | Disponible · intérêt déclaré |

### G2 — Détection des arnaques financières numériques

| Rubrique | Contenu |
|---|---|
| Problème | Faux agents d'opérateur, faux gains, fausse erreur de transfert, vente fantôme sur les réseaux sociaux. Les victimes livrent elles-mêmes leurs codes. |
| Utilisateurs concernés | Déduit : le client final qui reçoit un message suspect ; l'opérateur qui veut le protéger |
| Données | Pas de corpus francophone ouest-africain public connu. Générer des messages synthétiques par familles d'arnaques, mélangés à de vrais messages d'opérateurs légitimes, et écrire à la main un jeu de test séparé. MOZ-Smishing (portugais, Mozambique) existe ; licence non confirmée. |
| Fonctionnement envisagé | Base de référence TF-IDF et régression logistique, puis un encodeur multilingue (XLM-R, CamemBERT) ajusté. |
| Contribution de l'IA | Classification du message ; un LLM peut expliquer le verdict, pas décider seul |
| Pertinence du GPU | Ajustement de l'encodeur sur GPU, « quelques dizaines de minutes ». Le guide range ce cas parmi ceux où « le GPU a un vrai rôle ». |
| Difficultés et pièges | Des modèles de messages trop proches gonflent le score ; les reçus légitimes ressemblent aux arnaques ; un faux positif fait ignorer les avertissements. |
| Démo attendue | On colle un message ; on obtient un verdict, la raison en français et le geste à faire (ne pas composer le code, appeler le numéro officiel). |
| Liens avec l'équipe | Aucun acquis documenté en classification de texte entraînée. Les fraudes humaines sont celles que la presse béninoise décrit le plus. |
| Statut | Disponible · intérêt déclaré |

### G3 — Vérification d'identité et détection de documents falsifiés

| Rubrique | Contenu |
|---|---|
| Problème | Pièces volées ou détournées pour ouvrir des comptes ; enrôlements biométriques abusés par des agents malhonnêtes. |
| Utilisateurs concernés | Déduit : équipes d'ouverture de compte et de conformité |
| Données | Aucun jeu public de pièces béninoises. SIDTD (CC BY-SA 2.5) contient des faux européens (découpe-remplacement, retouche) ; DocXPand-25k (CC BY-NC-SA 4.0) des pièces fictives. La méthode est transférable, pas les données. Créer un générateur de pièces fictives béninoises est en soi une contribution. Ne jamais copier de vrais éléments de sécurité ni utiliser de vraie pièce. |
| Fonctionnement envisagé | Chaîne en étapes : détection du document, OCR, contrôles de cohérence (dates, formats), classificateur de falsification, comparaison de visage. |
| Contribution de l'IA | Vision par ordinateur, OCR, détection de retouche |
| Pertinence du GPU | Seuls les modèles de vision utilisent le GPU ; les contrôles de cohérence tournent sur CPU. Le guide range ce cas parmi ceux où « le GPU a un vrai rôle ». |
| Difficultés et pièges | Le modèle apprend les artefacts du générateur : entraîner sur un type de falsification, tester sur un autre. La compression WhatsApp efface les traces. Les erreurs de reconnaissance faciale varient selon les teints : les rapporter par groupe. La détection du vivant est hors de portée en 48 h, sauf version très simple. |
| Démo attendue | Photo de pièce et selfie ; champs extraits ; carte de chaleur de la zone retouchée ; décision (accepter, revue manuelle, refuser) avec raisons. |
| Liens avec l'équipe | Le dépôt `farmerledger-digitizer` de Stane-Junior est le plan d'un projet de numérisation par réseau de neurones : 13 documents, aucun code. Éligible au LIF BCEAO (vérification d'identité biométrique). |
| Statut | Disponible · non coché par l'équipe |

### G4 — Copilote de conformité KYC/LAB pour fintechs

| Rubrique | Contenu |
|---|---|
| Problème | Les fintechs doivent suivre les instructions BCEAO de 2025 sur l'identification client, le contrôle interne et la lutte contre le blanchiment, avec peu de juristes. |
| Utilisateurs concernés | Responsables conformité et analystes d'alertes d'une fintech |
| Données | Les PDF des instructions 001-03-2025 et 003-03-2025 ; IBM AMLworld pour le tri d'alertes (HI-Small : 5 millions de transactions, une sur 981 est du blanchiment). |
| Fonctionnement envisagé | Deux prototypes possibles. **A :** un assistant de recherche documentaire (RAG) qui répond en français avec l'article cité et dit « je ne sais pas » si la source est faible. **B :** un modèle de tri d'alertes (XGBoost avec variables de graphe), puis un LLM qui rédige un résumé du cas pour l'analyste. |
| Contribution de l'IA | Recherche documentaire avec citations ; tri d'alertes ; rédaction de résumés |
| Pertinence du GPU | Non précisée dans la fiche. Le tableau GPU du guide cite la vectorisation de gros corpus et les réseaux de graphes. Le guide note que, dans les benchmarks d'AMLworld, les arbres boostés avec variables de graphe font aussi bien que les réseaux de graphes. |
| Difficultés et pièges | Numéros d'articles inventés par le modèle ; règles périmées (l'instruction 020 change les plafonds le 2 novembre 2026 : indexer les dates) ; ne jamais envoyer de données clients à une API externe ; ce n'est pas un conseil juridique. Le guide n'a pas lu le détail des obligations : ne pas les affirmer sans les avoir lues. |
| Démo attendue | À gauche, un dialogue avec citations cliquables ; à droite, une file d'alertes avec score, schéma du motif et résumé rédigé. |
| Liens avec l'équipe | Stane-Junior a intégré un LLM contraint qui sépare faits et hypothèses (DabaPulse). Le guide recommande ce cas aux équipes ayant un profil juridique ou conformité : non documenté chez nous. |
| Statut | Disponible · intérêt déclaré |

### G5 — Évaluation du risque de crédit des petits commerçants

| Rubrique | Contenu |
|---|---|
| Problème | Un commerçant sans dossier bancaire a pourtant des mois d'historique de paiements mobiles qui disent beaucoup de lui. |
| Utilisateurs concernés | Déduit : institutions de microfinance et prêteurs ; le commerçant demandeur |
| Données | Aucun jeu public de commerçants ouest-africains confirmé. Les jeux Zindi (Xente, mobile money en Tanzanie) existent ; taille et licence non vérifiées par le guide. Pour la méthode : Home Credit (307 511 lignes, règles Kaggle sans redistribution), German Credit, Give Me Some Credit. Pour la démo : relevés mobile money synthétiques. |
| Fonctionnement envisagé | LightGBM ou CatBoost contre une base de régression logistique. Variables : entrées et sorties à 30, 60, 90 jours, régularité, diversité des contreparties. Raisons principales par SHAP, probabilité calibrée, seuil fixé par la perte attendue. |
| Contribution de l'IA | Score de crédit explicable |
| Pertinence du GPU | **« Pas de GPU nécessaire »**, selon le guide |
| Difficultés et pièges | L'AUC sur Home Credit ne se transfère pas à des commerçants informels ; mélange des flux personnels et professionnels ; variables qui servent de substituts au genre ou à la région ; consentement. |
| Démo attendue | On charge six mois de relevé fictif ; on obtient score, plafond, trois raisons, un curseur « et si » et un panneau d'équité (taux d'acceptation par groupe). |
| Liens avec l'équipe | Éligible au LIF BCEAO (scoring de crédit, microcrédit). Le guide le recommande avec un profil finance solide. |
| Statut | Disponible · intérêt déclaré |

### G6 — Prévision de liquidité des agents mobile money

| Rubrique | Contenu |
|---|---|
| Problème | Selon MicroSave, jusqu'à une transaction sur cinq peut échouer faute de liquidité chez l'agent. Il manque de monnaie électronique ou d'espèces, et chaque tournée de rééquilibrage coûte du temps. |
| Utilisateurs concernés | Déduit : gestionnaires de réseau d'agents chez un émetteur ; super-agents ; l'agent lui-même |
| Données | PaySim, ou un simulateur d'agents écrit par l'équipe. Les vraies données d'agents sont confidentielles. |
| Fonctionnement envisagé | Prévoir la variation nette du lendemain et la probabilité de rupture, avec LightGBM et un calendrier (jours de marché, fin de mois, Tabaski, rentrée scolaire). Comparer avec une base saisonnière et un modèle de fondation (Chronos, TimesFM) en zéro exemple. La décision est un stock de sécurité : préférer des prévisions par quantiles. |
| Contribution de l'IA | Prévision probabiliste, alerte, aide à la décision de rééquilibrage |
| Pertinence du GPU | La fiche n'en parle pas. Le tableau « Comment choisir » classe ce cas avec la mention « pas de GPU ». Un modèle de fondation de séries temporelles est la seule étape citée qui pourrait en tirer parti. |
| Difficultés et pièges | Simulateur non calibré sur le Bénin ; fuite via le calendrier futur ; ne jamais annoncer une précision réelle. Utiliser WAPE plutôt que MAPE, qui explose près de zéro. |
| Démo attendue | Liste d'agents avec « risque de rupture avant 15 h », message d'alerte en français et simulation du coût de rééquilibrage. |
| Liens avec l'équipe | DabaPulse traite le problème analogue pour des stocks : estimation de la demande, déficit, réallocation, simulation avant/après, explication par LLM. Le Bénin compte 460 699 agents actifs (ARCEP, T3 2025, cité par le guide). |
| Vérification faite | Le chiffre MicroSave est un maximum : 20 % en Tanzanie, 3 % au Sénégal. |
| Statut | Disponible · intérêt déclaré · support de la proposition P1 (voir §3) |

### G7 — Comptabilité intelligente pour les TPE

| Rubrique | Contenu |
|---|---|
| Problème | Les petits commerçants tiennent un cahier, des notes vocales et des SMS de paiement, pas un livre comptable. |
| Utilisateurs concernés | Petits commerçants et très petites entreprises |
| Données | Aucune source fiable sur leurs pratiques ; aucun jeu de cahiers manuscrits africains. Tout est à synthétiser : SMS fictifs, lignes de cahier en français mêlé de langues locales. |
| Fonctionnement envisagé | Extraire montant, contrepartie et frais des SMS ; lire un reçu ou une page de cahier (OCR ou modèle de vision) ; classer avec un LLM dans un plan comptable simple, en sortie structurée ; vérifier l'arithmétique contre le solde du SMS. |
| Contribution de l'IA | Extraction, lecture d'écriture, classification comptable |
| Pertinence du GPU | Non précisée dans la fiche. Les modèles de vision relèvent du GPU dans le tableau général du guide. |
| Difficultés et pièges | Montants inventés par le LLM ; écriture manuscrite mal lue ; noms de clients. Ne pas affirmer la conformité au SYSCOHADA. |
| Démo attendue | Photo de page et trois SMS ; un tableau de comptes et un « bilan du jour » en français, avec confirmation par l'utilisateur. |
| Liens avec l'équipe | Cité en exemple dans l'introduction du formulaire officiel. Le dépôt `farmerledger-digitizer` de Stane-Junior est un plan de numérisation resté sans code. |
| Statut | Disponible · non coché par l'équipe |

### G8 — Prévision des flux de paiements transfrontaliers

| Rubrique | Contenu |
|---|---|
| Problème | Anticiper les volumes entre pays de l'UEMOA et vers le Nigeria, partenaire commercial majeur du Bénin. |
| Utilisateurs concernés | Déduit : trésoriers d'opérateurs de paiement, banques, autorités |
| Données | « Le goulot d'étranglement. » Aucune donnée de corridor publique trouvée. Pistes à vérifier : séries macro de la Banque mondiale, de la BCEAO et du FMI ; un simulateur de corridors. |
| Fonctionnement envisagé | Modèles de fondation en zéro exemple (TimesFM 2.5 sous Apache-2.0 ; la version 3.0 est non commerciale) comparés à des modèles statistiques, avec validation à origine glissante. |
| Contribution de l'IA | Prévision de séries temporelles |
| Pertinence du GPU | Non précisée |
| Difficultés et pièges | Peu de points annuels, donc surapprentissage ; un simulateur ne prouve rien sur de vrais corridors ; ne pas prétendre faire de la lutte antiblanchiment. |
| Démo attendue | Tableau de bord de corridors avec bandes de prévision, étiqueté « simulé ». |
| Avis du guide | « C'est le cas le plus risqué en 48 h : ne le choisissez que si vous avez une source de données. » |
| Liens avec l'équipe | Les transferts transfrontaliers UEMOA passeront aux conditions de PI-SPI le 1er juin 2027 (selon le guide). |
| Statut | Disponible · non coché par l'équipe |

### G9 — Analyse intelligente des réclamations clients

| Rubrique | Contenu |
|---|---|
| Problème | Les réclamations arrivent par WhatsApp, appel ou agence, en français mêlé de fon ou de yoruba, avec des tournures SMS. |
| Utilisateurs concernés | Service client d'une fintech ou d'un opérateur |
| Données | Aucun corpus public béninois. Générer des réclamations synthétiques et étiqueter à la main environ 300 exemples pour l'évaluation. Les jeux Masakhane servent à tester la robustesse ; licences à vérifier. |
| Fonctionnement envisagé | Un LLM avec taxonomie fixe et sortie JSON, contre une base TF-IDF ; au besoin, ajuster CamemBERT ou XLM-R. Extraire montant et identifiant d'agent ; rédiger un brouillon de réponse. |
| Contribution de l'IA | Classification, extraction d'entités, rédaction assistée |
| Pertinence du GPU | Non précisée dans la fiche. L'ajustement d'un encodeur ou d'un LLM relève du GPU dans le tableau général. |
| Difficultés et pièges | Les données synthétiques gonflent la précision ; masquer numéros de téléphone et identifiants de transaction avant tout appel à une API externe ; résumés qui inventent des faits. |
| Démo attendue | Boîte de réception → catégorie, urgence, entités, réponse proposée ; puis tableau de bord hebdomadaire des causes. |
| Liens avec l'équipe | DabaPulse contient une classification d'intention par règles et des réponses LLM contraintes. La source que le guide cite sur le CONOBAFI mentionne, dans son titre, un comité technique sur les réclamations. Risque signalé par le guide : « un chatbot de plus, sans rien qui le distingue ». |
| Statut | Disponible · intérêt déclaré |

### G10 — Assistant financier vocal en langues locales

| Rubrique | Contenu |
|---|---|
| Problème | Environ deux tiers des Béninois ne parlent pas français (Francoscope, 2023 : 33,7 % de francophones), alors que la plupart des services financiers numériques sont en français écrit. |
| Utilisateurs concernés | Clients non francophones ou non lecteurs |
| Données | Pour le fon, un modèle MMS-300m ajusté existe (WER 9,5 % sur le jeu de test ALFFA de lecture, licence non commerciale) : s'attendre à bien pire sur de la parole spontanée. FFSTC (environ 31 h fon-français) n'a ni licence ni lien publiés. Pour le goun, rien de vérifié : prévoir d'enregistrer soi-même 100 à 300 commandes avec une dizaine de voix. |
| Fonctionnement envisagé | Parole → identification de la langue → une quinzaine d'intentions fermées (solde, envoi, taux, FAQ) → outils bancaires simulés → réponse par modèle de phrase. Pas de réponse libre d'un LLM sur de l'argent : relire le montant à voix haute. |
| Contribution de l'IA | Reconnaissance vocale, détection d'intention |
| Pertinence du GPU | Ajustement de MMS ou de Whisper-small, « quelques heures sur un GPU de 16 à 24 Go » |
| Difficultés et pièges | Orthographe et tons du fon ; licences non commerciales ; voix surtout masculines et lues ; capture accidentelle d'un code PIN. Pas de biométrie vocale pour l'authentification. |
| Démo attendue | Interface type téléphone : appui pour parler, transcription, intention reconnue, relecture en français. Montrer le tableau des WER honnêtement, avec un cas d'échec. |
| Avis du guide | « La plus risquée » ; se limiter à une quinzaine d'intentions |
| Liens avec l'équipe | Cité en exemple dans l'introduction du formulaire officiel. Le dépôt `Grow-Tech-waxal-asr` de Stane-Junior est le cadrage d'un défi de reconnaissance vocale : configuration seule, aucun entraînement. |
| Statut | Disponible · non coché par l'équipe |

## 3. Idées issues de nos échanges

### P1 — « Radar de liquidité » pour les agents mobile money

| Rubrique | Contenu |
|---|---|
| Origine | Proposée par l'assistant pour le champ « idée de solution » du formulaire individuel, puis adaptée pour la question 13 du formulaire d'équipe |
| Cas d'usage support | G6 |
| Description, dernière version | Estimer, agent par agent, la probabilité de rupture de cash ou de float du lendemain ; envoyer une alerte en français ; simuler le coût d'un rééquilibrage avant décision |
| Approche envisagée | Simulateur d'agents écrit par l'équipe ; base saisonnière et LightGBM avec calendrier ; prévisions par quantiles pour fixer un stock de sécurité |
| Usage du GPU envisagé | Un modèle de fondation pour séries temporelles (Chronos ou TimesFM), exécuté puis ajusté sur des milliers de séries, gardé seulement s'il bat la base sur CPU ; un LLM ouvert exécuté localement pour rédiger les alertes |
| Acquis invoqué | DabaPulse : même chaîne prévision → risque → décision → simulation, pour des stocks |
| Pourquoi cette idée | C'est le cas d'usage le plus proche d'une réalisation prouvée de Stane-Junior |
| Faiblesses connues | Le guide juge que ce cas n'a pas besoin de GPU ; les modèles nommés ne sont pas un acquis de l'équipe ; DabaPulse ne contient aucun modèle entraîné ; données entièrement simulées |
| Évolution | Quatre versions, conservées dans [PARTICIPATION_FORM.md](PARTICIPATION_FORM.md#b13-idée-de-solution--quatre-versions-préparées) |
| Validation | Jamais validée explicitement par Stane-Junior ni par l'équipe |
| Présence dans la candidature | Inconnue : le texte saisi à la question 13 n'est pas documenté |
| **Statut** | **Proposition en attente de validation** |

### Pistes seulement évoquées

| Piste | Contexte | Statut |
|---|---|---|
| Préférer un cas où le GPU a un rôle plus naturel (G2 arnaques, G3 documents) | Remarque de l'assistant après lecture du guide : l'idée P1 reste défendable, mais il faut préparer la réponse à « pourquoi un GPU ? » | À approfondir |
| Appuyer la candidature sur un projet de machine learning d'un coéquipier | Conseil répété pour la question 14 | En attente : aucun projet de coéquipier n'est documenté |

Aucune architecture technique n'a été discutée. Aucune autre idée originale n'a été formulée.

## 4. Grille de comparaison

Cette grille rassemble ce qui est connu. **Elle ne classe pas les idées.** Les colonnes « GPU » et « Risque » reprennent l'avis du guide ; « Acquis documenté » ne couvre que Stane-Junior.

| Cas | Coché par l'équipe | Données, selon le guide | Rôle du GPU, selon le guide | Risque signalé par le guide | Acquis documenté |
|---|---|---|---|---|---|
| G1 Fraude | Oui | Jeux synthétiques publics (PaySim, AMLworld, Sparkov) | Seulement pour comparer avec un réseau de graphes ou un modèle de séquence | Fuite d'information dans PaySim ; latence | Flux de paiement Mobile Money |
| G2 Arnaques | Oui | À générer ; jeu de test à écrire à la main | « Un vrai rôle » : ajustement d'un encodeur | Scores gonflés par des messages trop proches | Aucun |
| G3 Documents | Non | Jeux européens ou fictifs ; générateur à écrire | « Un vrai rôle » : modèles de vision | Apprentissage des artefacts ; détection du vivant hors de portée | Aucun (un plan sans code) |
| G4 Conformité | Oui | Textes BCEAO, AMLworld | Non précisé dans la fiche | Articles inventés ; règles périmées | Intégration d'un LLM contraint |
| G5 Crédit | Oui | Jeux étrangers ; relevés synthétiques | « Pas de GPU nécessaire » | Transfert impossible aux commerçants informels ; équité | Aucun |
| G6 Liquidité | Oui | PaySim ou simulateur à écrire | « Pas de GPU » | Simulateur non calibré | Chaîne analogue (DabaPulse) |
| G7 Comptabilité | Non | Tout à synthétiser | Non précisé | Montants inventés ; écriture manuscrite | Aucun (un plan sans code) |
| G8 Transfrontalier | Non | Aucune donnée de corridor | Non précisé | « Le plus risqué en 48 h » | Aucun |
| G9 Réclamations | Oui | À générer ; 300 exemples à étiqueter | Non précisé dans la fiche | « Un chatbot de plus » | Classification d'intention par règles, LLM contraint |
| G10 Voix | Non | Ressources fon limitées, licences non commerciales | Ajustement de modèles de parole | « La plus risquée » | Aucun (cadrage sans entraînement) |

## 5. Critères à instruire avant de choisir

Ces critères n'ont pas été évalués. Ils sont proposés au nouvel agent comme point de départ.

1. **Justification du GPU :** quelle étape précise l'exige, et quel gain mesurable contre une base sur CPU ?
2. **Adéquation à l'équipe :** quelles compétences réelles de machine learning, de finance et de développement chez les quatre membres ?
3. **Données :** peut-on obtenir ou générer des données défendables dans le délai, avec un jeu de test séparé ?
4. **Démo de bout en bout :** un parcours unique, montrable en 90 secondes ?
5. **Problème reconnu :** un utilisateur précis et un cas concret au Bénin ou dans l'UEMOA ?
6. **Différenciation :** qu'est-ce qui distingue la solution d'un chatbot ou d'un modèle standard ?
7. **Cadre réglementaire et modèle économique :** vente à des institutions agréées, éligibilité au LIF BCEAO ?
8. **Délai :** réalisable avant les 25 et 26 novembre 2026, selon le format réel du challenge ?
9. **Réutilisation de l'existant :** que peut-on reprendre de DabaPulse ou d'un projet d'un coéquipier, en le disant clairement au jury ?
