# Formulaires de participation — historique et réponses

- **Dernière mise à jour :** 2026-11-17
- **Retour au document principal :** [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md)
- **Journal de travail d'origine :** [`portfolio-intelligence/formulaires/`](../../portfolio-intelligence/formulaires/)

## Règles de lecture

- **« Réponse préparée »** : texte ou choix proposé par l'assistant.
- **« Réponse retenue »** : ce qui a été réellement saisi. Elle n'est connue que lorsqu'une capture d'écran la montre.
- **« Non documenté »** : l'information n'existe ni dans la conversation ni dans les captures.
- Les réponses ne sont pas réécrites ici : quand plusieurs versions ont existé, elles sont toutes conservées, dans l'ordre.
- Les coordonnées (e-mails, numéros) vues sur les captures ne sont pas recopiées : le dépôt est public.

## Vue d'ensemble

| | Formulaire A — individuel | Formulaire B — équipe |
|---|---|---|
| Titre | « GPU Challenge 2026 · Candidature Epi'AI » | « GPU Challenge 2026 · Fintech Academia × Next Fintech Forum » |
| Outil | Tally, `https://tally.so/r/EqdZ0X` | Microsoft Forms (lien dans [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md#20-références-et-sources)) |
| Destinataire | Epi'AI, qui compose les équipes | Organisateurs du challenge |
| Objectif | Connaître chaque candidat pour composer des équipes mixtes IA et finance | Candidature officielle, une par équipe de 4 |
| Rempli par | Stane-Junior | Le chef d'équipe |
| Accès de l'assistant | Quatre captures d'écran ; formulaire jamais ouvert | Formulaire lu en entier ; trois captures des réponses |
| État | Déposé, selon Stane-Junior | Questions 6 à 12 vues remplies ; dépôt non confirmé |

---

# Formulaire A — Candidature individuelle Epi'AI (Tally)

Seuls les champs visibles sur les quatre captures sont connus. Les autres pages du formulaire (identité, coordonnées, école, éventuelles autres questions) sont **non documentées**.

Deux indications du formulaire éclairent l'intention d'Epi'AI :

- sous l'échelle IA et programmation : « Si tu viens de la finance, 1 est une réponse tout à fait normale » ;
- sous le champ d'idée : « Une idée forte compte dans la composition des équipes ».

## A1. Question tronquée

| | |
|---|---|
| Intitulé | Illisible : la capture commence à l'option C, « Non, mais je suis prêt(e) à apprendre vite » |
| Réponse préparée | Aucune, faute d'intitulé |
| Réponse retenue | Non documenté |

## A2. Tes domaines de compétence

| | |
|---|---|
| Type | Cases à cocher, obligatoire, « Coche tout ce qui s'applique » |
| Options | Intelligence artificielle et machine learning · Deep learning (PyTorch, TensorFlow) · Data science et data engineering · Développement backend / API · Développement frontend / mobile · Finance et fintech · Design et produit · Pitch et présentation · Autre |
| État sur la capture | Cochés par Stane-Junior : IA et machine learning, Développement backend / API, Développement frontend / mobile, Pitch et présentation |
| Réponse retenue | Non documenté au-delà de la capture |

Avis de l'assistant sur chaque case :

| Case | Avis | Raison |
|---|---|---|
| Développement backend / API | Garder | Trois projets avec API testées |
| Développement frontend / mobile | Garder | Web seulement ; aucun projet mobile |
| IA et machine learning | Défendable, à assumer | Intégration de LLM prouvée ; aucun modèle entraîné |
| Pitch et présentation | À garder seulement s'il a réellement pitché | Aucune trace dans les dépôts ; **question restée sans réponse** |
| Deep learning | Ne pas cocher | Aucun code |
| Data science et data engineering | Ne pas cocher | Une seule chaîne de données, synthétique |
| Finance et fintech | Ne pas cocher | Cohérent avec un niveau finance de 1 ou 2 |

## A3. Ton niveau en intelligence artificielle et programmation

| | |
|---|---|
| Type | Échelle de 1 à 10, obligatoire. « 1 = débutant (ou pas du tout), 5 = à l'aise, 10 = expert. » |
| État sur la capture | 4 |
| Avis de l'assistant | 4 est cohérent avec l'audit (programmation 4 à 5, IA et ML 2 à 3) |
| Réponse retenue | Non documenté au-delà de la capture |

## A4. Ton niveau en finance, banque ou fintech

| | |
|---|---|
| Type | Échelle de 1 à 10, obligatoire. « 1 = débutant, 10 = expert (formation, stage, expérience, compétenc… » (texte coupé) |
| État sur la capture | 1 |
| Avis de l'assistant | 1 ou 2 ; 2 se défend par DabaPulse et l'intégration Mobile Money |
| Réponse retenue | Non documenté au-delà de la capture |

## A5. Langages, frameworks et outils que tu maîtrises

| | |
|---|---|
| Type | Texte libre, obligatoire. Exemple affiché : « Python, PyTorch, scikit-learn, FastAPI, React, SQL... » |
| Réponse retenue | Non documenté |

Réponse préparée :

```
TypeScript/JavaScript (React, Next.js, Node.js), Python (FastAPI, pandas), SQL/PostgreSQL (Supabase), Tailwind CSS, tests (Vitest, Playwright, pytest), Git et GitHub Actions, déploiement Vercel/Netlify. Développement assisté par agents IA (cadrage, revue, tests), intégration d'API LLM. Notions : Django, C, Docker.
```

PyTorch et scikit-learn n'y figurent pas : aucun dépôt ne les utilise.

## A6. Ton meilleur projet en IA, data ou dev

| | |
|---|---|
| Type | Texte libre, facultatif. « Décris-le en 2-3 lignes et ajoute un lien GitHub ou une démo si tu en as. » |
| Projet retenu par l'assistant | DabaPulse, seul dépôt qui croise données, finance et IA |
| Réponse retenue | Non documenté |

Réponse préparée :

```
DabaPulse (hackathon Startup FairPlay, en équipe) : moteur d'aide à la décision qui estime le revenu exposé au risque à partir des ventes et des stocks, recommande une action et simule son impact ; un LLM explique les résultats sans inventer de chiffres. Engineering Lead : architecture, API FastAPI/pandas, interface React, CI et déploiement (43 tests, données synthétiques). https://github.com/Stane316/daba-pulse
```

## A7. Ton expérience en hackathon / compétition

| | |
|---|---|
| Type | Choix unique, obligatoire |
| Options | A Aucune · B 1 à 2 participations · C 3 participations ou plus · D J'ai déjà gagné ou été classé(e) |
| Réponse préparée | **B**, pour la participation à Startup FairPlay |
| Réponse retenue | Non documenté |

## A8. Quels cas d'usage t'intéressent le plus ?

| | |
|---|---|
| Type | Cases à cocher, obligatoire, « Choisis jusqu'à 3 » |
| Options | Les dix cas d'usage du challenge |
| Réponse retenue | Non documenté |

Réponse préparée :

| Choix recommandé | Lien avec ses réalisations |
|---|---|
| Prévision de liquidité des agents mobile money | DabaPulse : prévision de demande, déficit, réallocation, simulation. La rupture de liquidité est l'analogue d'une rupture de stock. |
| Détection des fraudes sur les paiements instantanés | Déo Gracias Wi-Fi : flux de paiement Mobile Money, webhook signé, anti-rejeu, idempotence. Aucune expérience de modèle de fraude. |
| Analyse intelligente des réclamations clients | DabaPulse : classification d'intention et réponses LLM contraintes |

Écartés de la recommandation faute de preuve : l'assistant vocal (le dépôt WAXAL est resté un plan) et les documents falsifiés (le dépôt FarmerLedger est resté un plan). L'assistant a précisé que la question porte sur l'intérêt et que le choix final revenait à Stane-Junior.

## A9. As-tu déjà une idée de solution ?

| | |
|---|---|
| Type | Texte libre, facultatif. « Cas choisi, approche, et comment tu utiliserais les GPU. » |
| Réponse retenue | Non documenté |

Réponse préparée (701 caractères) :

```
Cas : prévision de liquidité des agents mobile money. Idée : un « radar de liquidité » qui prédit les besoins en cash et en float de chaque agent sur 24 à 72 h, signale les ruptures probables et recommande un rééquilibrage (quel agent, quel montant, quand), avec simulation avant décision. Approche : un modèle de séries temporelles entraîné sur l'historique de tous les agents (jours de marché, fins de mois, fêtes), puis un moteur de décision et une explication en langage clair par LLM. GPU : entraînement sur des milliers de séries, simulations en parallèle, inférence locale d'un LLM ouvert. J'ai déjà construit cette chaîne prévision → risque → décision → simulation pour des stocks (DabaPulse).
```

## A10. Pourquoi devrait-on te choisir ? (5 lignes max)

| | |
|---|---|
| Type | Texte libre, obligatoire. Exemple affiché : « Ta motivation, ce que tu apportes à une équipe... » |
| Réponse retenue | Non documenté |

Réponse préparée (421 caractères) :

```
Je sais amener une idée jusqu'à un produit testé et déployé. Tech Lead d'un e-commerce client en production (467 tests) et Engineering Lead en hackathon sur DabaPulse, un moteur de revenu à risque avec couche LLM. En équipe, je construis l'API, la chaîne de données, l'interface et la démo, en pilotant des agents IA. Je débute en machine learning et en finance : je viens apprendre vite auprès de profils data et métier.
```

Version courte préparée (304 caractères) :

```
Je sais amener une idée jusqu'à un produit testé et déployé : Tech Lead d'un e-commerce client en production, Engineering Lead en hackathon sur DabaPulse (revenu à risque + LLM). En équipe, je construis l'API, les données, l'interface et la démo. Je débute en ML et en finance et je viens apprendre vite.
```

## A11. Quel rôle prends-tu naturellement dans une équipe ?

| | |
|---|---|
| Type | Choix unique, obligatoire. « Profil finance : choisis simplement ce qui te correspond, tu n'as pas besoin de coder. » |
| Options | A Je code et je construis (IA / dev) · B Je gère la data et les modèles · C Je cadre le produit et le pitch · D Je coordonne l'équipe (chef d'équipe) · E Je m'adapte à ce qui manque · F J'apporte l'expertise finance (réglementation, risque, métier) · G Je construis le business case et l'analyse financière du projet |
| État sur la capture | **A**, sélectionné par Stane-Junior |
| Avis de l'assistant | A est cohérent avec ses rôles passés ; D est une alternative défendable |
| Réponse retenue | Non documenté au-delà de la capture |

---

# Formulaire B — Candidature d'équipe (Microsoft Forms)

## Texte d'introduction du formulaire (cité)

> Dans le cadre de Fintech Academia, le volet académique du Next Fintech Forum 2026, Epitech Bénin lance le GPU Challenge, en partenariat avec l'Alliance Fintech UEMOA, Udutech et Payfonte.
>
> Les candidatures se font par équipe de 4 personnes. Une seule candidature par équipe, remplie par le chef d'équipe.
>
> Le défi : concevoir des solutions d'intelligence artificielle appliquées à la finance digitale, pour répondre à des problématiques réelles de fintechs. Les équipes retenues auront accès à des GPU et suivront une formation en ligne, puis une phase de développement, avant de présenter leurs projets lors des journées finales à Epitech Bénin, à Cotonou.
>
> Les équipes travailleront sur des cas d'usage réels de l'IA appliquée à la finance, notamment : détection des fraudes sur les paiements instantanés, assistant financier vocal en langues locales, détection de documents falsifiés et comptabilité intelligente pour les TPE. Les solutions devront exploiter pleinement la puissance des GPU.
>
> Si vous avez déjà une idée de solution, n'hésitez pas à la proposer dans votre candidature.
>
> Date limite de candidature : Dimanche 15 novembre 2026

Toutes les questions sont obligatoires.

## Tableau des 17 questions

| N° | Intitulé exact | Type | Réponse préparée | Réponse retenue | Reste à confirmer |
|---|---|---|---|---|---|
| 1 | Nom de l'équipe | Ligne | Huit noms discutés (voir B1) | **Non documenté** | Le nom saisi |
| 2 | Chef d'équipe : nom et prénom | Ligne | — | Non vu | Que Stane-Junior est bien le chef d'équipe |
| 3 | Chef d'équipe : adresse e-mail | Ligne | — | Non vu | — |
| 4 | Chef d'équipe : numéro WhatsApp | Ligne | — | Non vu | — |
| 5 | Chef d'équipe : école ou structure, et filière ou poste | Ligne | « IFRI (Université d'Abomey-Calavi) », filière et année à préciser par lui | Non vu | Filière et année actuelles |
| 6 | Membre 2 : nom, prénom, adresse e-mail, numéro WhatsApp, école ou structure | Texte | — | **Vu rempli** : M. G., école « EPITECH » | — |
| 7 | Membre 3 : mêmes informations | Texte | — | **Vu rempli** : C. G., école « EPITECH » | — |
| 8 | Membre 4 : mêmes informations | Texte | — | **Vu rempli** : B. A., école « ENA » | Signification exacte de « ENA » |
| 9 | Pays et ville de résidence de l'équipe | Ligne | — | **Vu rempli** : « Pays : Bénin ; Ville : Abomey Calavi » | — |
| 10 | Domaines de compétence de l'équipe | Cases | Voir B10 | **Vu rempli** : 4 cases | — |
| 11 | Niveau de l'équipe en intelligence artificielle | Choix unique | Voir B11 | **Vu rempli** : Intermédiaire | — |
| 12 | Quel(s) cas d'usage intéresse(nt) le plus votre équipe ? | Cases | Voir B12 | **Vu rempli** : 6 cases | — |
| 13 | Votre équipe a-t-elle déjà une idée de solution pour l'un de ces cas d'usage ? Décrivez-la en quelques lignes : le cas choisi, votre approche et la façon dont vous utiliseriez les GPU | Texte | Quatre versions (voir B13) | **Non documenté** | Le texte saisi |
| 14 | Présentez un projet en IA, data ou développement réalisé par un membre de l'équipe (lien GitHub ou démo bienvenu) | Texte | Deux versions (voir B14) | **Non documenté** | Le texte saisi |
| 15 | Pourquoi votre équipe souhaite-t-elle participer au GPU Challenge ? (5 lignes maximum) | Texte | Trois versions (voir B15) | **Non documenté** | Le texte saisi |
| 16 | Tous les membres de l'équipe s'engagent à suivre l'ensemble du challenge : formation en ligne, phase de développement et journées finales | Choix unique : « Oui » | À confirmer avec chacun | Non vu | Accord des quatre |
| 17 | Tous les membres acceptent que leurs données soient utilisées pour l'organisation du GPU Challenge et qu'ils puissent être photographiés ou filmés lors des journées finales | « Oui » ou « Oui, mais certains membres refusent d'être photographiés ou filmés » | À confirmer avec chacun | Non vu | Choix fait |

Les réponses 6 à 12 ont été décidées par l'équipe, par sondages dans un groupe créé pour l'occasion (déclaration de Stane-Junior). L'assistant n'y a pas contribué.

## B1. Nom de l'équipe

Proposés par un coéquipier, avec l'avis de l'assistant :

| Nom | Avis |
|---|---|
| CapitalX | Évoque un fonds d'investissement, rien sur l'IA ; le suffixe « X » est très répandu |
| Hackflow | Dit « hackathon », rien sur la finance ni l'IA ; utilisable, peu mémorable |
| FinHack | Terme générique ; le moins distinctif des trois |

Proposés par l'assistant :

| Nom | Sens | Limite |
|---|---|---|
| Akwè Labs (recommandé par l'assistant) | « Akwɛ́ » signifie cauri, argent, pièce de monnaie en fon | À expliquer en une phrase au jury |
| Cauri AI | Le cauri a servi de monnaie en Afrique de l'Ouest, notamment à Ouidah | Disponibilité du nom non vérifiée |
| Kernel Capital | Noyau de calcul GPU et capital | En anglais, sans ancrage local |
| FloatSense | Le « float » des agents mobile money | Lie le nom au seul cas « liquidité » |
| Vigie | Celle qui guette la fraude | Lie le nom aux cas de détection |

**Nom retenu : non documenté.** Stane-Junior n'a pas dit lequel l'équipe a choisi.

## B10. Domaines de compétence de l'équipe

| Option | Cochée par l'équipe |
|---|---|
| Intelligence artificielle et machine learning | Oui |
| Data science et data engineering | Oui |
| Développement logiciel | Oui |
| Finance et fintech | Oui |
| Design et produit | Non |
| Autre | Non |

Avant de voir ces choix, l'assistant avait indiqué que le seul apport prouvé de Stane-Junior était « Développement logiciel » et que les autres cases dépendaient des coéquipiers.

## B11. Niveau de l'équipe en intelligence artificielle

Options : Débutant, Intermédiaire, Avancé. **Choix de l'équipe : Intermédiaire.**

L'assistant avait noté que, seul, Stane-Junior est débutant en machine learning. Le niveau « Intermédiaire » repose donc sur les trois autres membres, dont les réalisations ne sont pas documentées.

## B12. Cas d'usage qui intéressent l'équipe

| Cas d'usage | Coché |
|---|---|
| Détection des fraudes sur les paiements instantanés | Oui |
| Assistant financier vocal en langues locales | Non |
| Évaluation du risque de crédit des petits commerçants | Oui |
| Vérification d'identité et détection de documents falsifiés | Non |
| Copilote de conformité pour les fintechs | Oui |
| Prévision de liquidité des agents mobile money | Oui |
| Détection des arnaques financières numériques | Oui |
| Comptabilité intelligente pour les TPE | Non |
| Prévision des flux de paiements transfrontaliers | Non |
| Analyse intelligente des réclamations clients | Oui |

Cette question mesure un intérêt. Elle ne fixe pas le projet.

## B13. Idée de solution — quatre versions préparées

Aucune n'a été validée explicitement par Stane-Junior. Le texte réellement saisi n'est pas documenté.

**Version 1 — avant les captures (727 caractères).** Reprise de l'idée du formulaire individuel, tournée pour une équipe.

```
Cas : prévision de liquidité des agents mobile money. Idée : un « radar de liquidité » qui prédit les besoins en cash et en float de chaque agent sur 24 à 72 h, signale les ruptures probables et recommande un rééquilibrage (quel agent, quel montant, quand), avec simulation avant décision. Approche : un modèle de séries temporelles entraîné sur l'historique de tous les agents (jours de marché, fins de mois, fêtes), puis un moteur de décision et une explication en langage clair par LLM. GPU : entraînement sur des milliers de séries, simulations en parallèle, inférence locale d'un LLM ouvert. Un membre de l'équipe a déjà construit cette chaîne prévision → risque → décision → simulation pour des stocks (projet DabaPulse).
```

**Version 2 — après les captures, structurée (1 204 caractères).**

```
Cas d'usage : prévision de liquidité des agents mobile money.
Problème : un agent à court de cash ou de float refuse des opérations ; le client repart, l'agent perd sa commission et le réseau perd en fiabilité.
Solution : un « radar de liquidité » qui prévoit, agent par agent, les besoins en cash et en float sur 24 à 72 h, signale les ruptures probables et recommande un rééquilibrage (quel agent, quel montant, à quel moment), avec une simulation de l'impact avant décision.
Approche : un modèle global de séries temporelles entraîné sur l'historique de tous les agents (jours de marché, fins de mois, fêtes), comparé à une prévision simple de référence ; un moteur de décision chiffré ; une explication en langage clair par un LLM qui ne produit aucun chiffre lui-même. Données : celles fournies par les partenaires, sinon un jeu simulé réaliste.
Utilisation des GPU : entraînement d'un seul modèle sur des milliers de séries, simulation de milliers de scénarios en parallèle, inférence locale d'un LLM ouvert pour que les données ne quittent pas l'infrastructure.
Acquis : un membre de l'équipe a déjà livré cette chaîne prévision → risque → décision → simulation pour des stocks (projet DabaPulse).
```

**Version 2 bis — même date, en un paragraphe (695 caractères).**

```
Cas : prévision de liquidité des agents mobile money. Solution : un « radar de liquidité » qui prévoit les besoins en cash et en float de chaque agent sur 24 à 72 h, signale les ruptures probables et recommande un rééquilibrage (quel agent, quel montant, quand), avec simulation avant décision. Approche : un modèle de séries temporelles entraîné sur l'historique de tous les agents, un moteur de décision chiffré, puis une explication en langage clair par LLM. GPU : entraînement sur des milliers de séries, simulations en parallèle, inférence locale d'un LLM ouvert. Un membre de l'équipe a déjà livré cette chaîne prévision → risque → décision → simulation pour des stocks (projet DabaPulse).
```

**Version 3 — après lecture du guide Epi'AI (1 002 caractères). Dernière version proposée.**

```
Cas choisi : prévision de liquidité des agents mobile money. Selon MicroSave, jusqu'à une opération sur cinq est refusée faute de cash ou de float chez l'agent dans certains pays.
Solution : un « radar de liquidité » qui estime, agent par agent, la probabilité de rupture du lendemain, envoie une alerte en français et simule le coût d'un rééquilibrage avant décision.
Approche : un simulateur d'agents écrit par l'équipe (les données réelles sont confidentielles), une base saisonnière et un LightGBM avec calendrier (jours de marché, fins de mois, fêtes), puis des prévisions par quantiles pour fixer un stock de sécurité.
GPU : un modèle de fondation pour séries temporelles (Chronos ou TimesFM), exécuté puis ajusté sur des milliers de séries d'agents, et conservé seulement s'il bat la base sur CPU ; un LLM ouvert exécuté localement pour rédiger les alertes sans sortir les données.
Acquis : un membre a déjà livré la chaîne prévision → risque → décision → simulation pour des stocks (DabaPulse).
```

Ce qui a changé entre la version 2 et la version 3, et pourquoi :

| Changement | Raison |
|---|---|
| Ajout du chiffre MicroSave, avec « jusqu'à » et « dans certains pays » | Chiffre vérifié : 20 % est le maximum (Tanzanie), 3 % au Sénégal |
| « Données fournies par les partenaires » remplacé par « simulateur d'agents écrit par l'équipe » | Le guide indique que les données réelles d'agents sont confidentielles |
| Modèle simple nommé (base saisonnière, LightGBM), prévisions par quantiles | Méthode de la fiche « liquidité » du guide |
| GPU : « simulations en parallèle » retiré ; modèle de fondation gardé seulement s'il bat la base | Le guide classe ce cas parmi ceux qui n'ont pas besoin de GPU et met en garde contre un GPU utilisé pour lui-même |
| Texte raccourci | La question demande « quelques lignes » |

Réserve émise par l'assistant : LightGBM, Chronos et TimesFM sont un plan, pas un acquis de l'audit. Le coéquipier qui porterait la modélisation doit pouvoir les défendre.

## B14. Projet réalisé par un membre — deux versions préparées

**Version 1 (426 caractères).**

```
DabaPulse, par Stane-Junior ANIAMBOSSOU (Engineering Lead, hackathon Startup FairPlay, en équipe) : moteur d'aide à la décision qui estime le revenu exposé au risque à partir des ventes et des stocks, recommande une action et simule son impact ; un LLM explique les résultats sans inventer de chiffres. API FastAPI/pandas, interface React, CI, 43 tests automatisés, données synthétiques. https://github.com/Stane316/daba-pulse
```

**Version 2 (451 caractères). Dernière version proposée ; inchangée après lecture du guide.**

```
DabaPulse, par Stane-Junior ANIAMBOSSOU (Engineering Lead, en équipe, hackathon Startup FairPlay) : moteur d'aide à la décision qui estime le revenu exposé au risque à partir des ventes et des stocks, recommande une action et simule son impact ; un LLM explique les résultats sans produire de chiffres. API FastAPI/pandas, interface React, intégration continue, 43 tests automatisés, données synthétiques.
Code : https://github.com/Stane316/daba-pulse
```

Conseil donné deux fois : si un coéquipier a un projet avec un modèle réellement entraîné, l'ajouter ou le préférer, car DabaPulse ne contient pas de machine learning. **Suite donnée : non documentée.**

## B15. Pourquoi participer — trois versions préparées

**Version 1 — avant les captures (410 caractères).**

```
Nous sommes quatre profils complémentaires et nous voulons résoudre un problème réel de la finance digitale en zone UEMOA, pas seulement faire une démonstration. Les GPU et la formation nous donneront les moyens d'entraîner des modèles hors de portée de nos machines. Notre objectif : arriver aux journées finales avec un prototype qui fonctionne, testé sur des données réalistes et utilisable par une fintech.
```

**Version 2 — après les captures (405 caractères).** « Quatre profils complémentaires » remplacé par les écoles et les domaines cochés.

```
Notre équipe réunit des étudiants d'Epitech, de l'IFRI et de l'ENA et couvre le développement logiciel, la data, l'IA et la finance. Nous voulons traiter un problème réel de la finance digitale en zone UEMOA, pas seulement faire une démonstration. Les GPU et la formation nous permettront d'entraîner des modèles hors de portée de nos machines. Objectif : un prototype qui fonctionne aux journées finales.
```

**Version 3 — après lecture du guide (412 caractères). Dernière version proposée.**

```
Notre équipe réunit des étudiants d'Epitech, de l'IFRI et de l'ENA et couvre le développement logiciel, la data, l'IA et la finance. Nous voulons traiter un seul problème réel de la finance digitale en zone UEMOA et le mener jusqu'à une démo qui tourne de bout en bout. Les GPU et la formation en ligne nous permettront d'entraîner des modèles hors de portée de nos machines et de les comparer à une base simple.
```

Les domaines cités sont ceux que l'équipe a cochés à la question 10. « Formation en ligne » a été conservé après relecture du formulaire, qui l'annonce dans son introduction et à la question 16, alors que le guide Epi'AI parle d'un hackathon « sans formation préalable ».

## Ce qu'il faut demander à Stane-Junior pour clore ce dossier

1. La candidature d'équipe a-t-elle été envoyée avant la clôture ? Un accusé a-t-il été reçu ?
2. Quel nom d'équipe a été saisi ?
3. Quels textes ont été collés aux questions 13, 14 et 15 ?
4. Quelle option a été choisie à la question 17 ?
5. Qu'a-t-il saisi à la question 5 (filière et année) ?
