# GPU Challenge 2026 — Candidature Epi'AI

- **Formulaire :** https://tally.so/r/EqdZ0X (non accessible depuis l'audit ; lu sur quatre captures)
- **Date :** 2026-11-14
- **Statut :** réponses rédigées après validation de Q1, Q3, Q4 et Q5 ; le projet Zindi (Q2) n'est pas utilisé

## Champs visibles sur les captures

| Champ | Type | Obligatoire | Limite visible | État sur la capture |
|---|---|---|---|---|
| Tes domaines de compétence | Cases à cocher | Oui | — | Cochés : IA et ML, backend/API, frontend/mobile, pitch |
| Ton niveau en IA et programmation | Échelle de 1 à 10 | Oui | — | 4 |
| Ton niveau en finance, banque ou fintech | Échelle de 1 à 10 | Oui | — | 1 |
| Langages, frameworks et outils que tu maîtrises | Texte libre | Oui | Aucune | Vide |
| Ton meilleur projet en IA, data ou dev | Texte libre | Non | « 2-3 lignes », lien ou démo | Vide |
| Ton expérience en hackathon / compétition | Choix unique | Oui | — | Vide |

Une question est coupée en haut de la première capture (option C : « Non, mais je suis prêt(e) à apprendre vite »). Son intitulé n'est pas lisible.

## Réponses

### Langages, frameworks et outils que tu maîtrises

```
TypeScript/JavaScript (React, Next.js, Node.js), Python (FastAPI, pandas), SQL/PostgreSQL (Supabase), Tailwind CSS, tests (Vitest, Playwright, pytest), Git et GitHub Actions, déploiement Vercel/Netlify. Développement assisté par agents IA (cadrage, revue, tests), intégration d'API LLM. Notions : Django, C, Docker.
```

PyTorch et scikit-learn ne sont pas cités : aucun dépôt ne les utilise.

### Ton meilleur projet en IA, data ou dev

Projet retenu : DabaPulse (seul projet qui croise données, finance et IA).

```
DabaPulse (hackathon Startup FairPlay, en équipe) : moteur d'aide à la décision qui estime le revenu exposé au risque à partir des ventes et des stocks, recommande une action et simule son impact ; un LLM explique les résultats sans inventer de chiffres. Engineering Lead : architecture, API FastAPI/pandas, interface React, CI et déploiement (43 tests, données synthétiques). https://github.com/Stane316/daba-pulse
```

Variante orientée développement (HP Collection) : voir [06](../06_DESCRIPTIONS_PRETES_A_COPIER.md).

### Ton expérience en hackathon / compétition

Option **B — 1 à 2 participations** (Startup FairPlay).

### Tes domaines de compétence

| Case | Avis | Raison |
|---|---|---|
| Développement backend / API | Garder | Trois projets avec API testées |
| Développement frontend / mobile | Garder | Web seulement ; aucun projet mobile |
| Intelligence artificielle et machine learning | Défendable, à assumer | Intégration de LLM prouvée ; aucun modèle entraîné |
| Pitch et présentation | À garder seulement si tu as réellement pitché | Aucune trace dans les dépôts |
| Deep learning | Ne pas cocher | Aucun code |
| Data science et data engineering | Ne pas cocher | Une seule chaîne de données, synthétique |
| Finance et fintech | Ne pas cocher | Cohérent avec un niveau finance de 1 ou 2 |

### Niveaux

- IA et programmation : **4** — cohérent avec l'audit.
- Finance, banque, fintech : **1 ou 2** — 2 se défend par DabaPulse et l'intégration Mobile Money.

---

## Captures 3 et 4 (reçues le 2026-11-14)

| Champ | Type | Obligatoire | Limite visible | État sur la capture |
|---|---|---|---|---|
| Quels cas d'usage t'intéressent le plus ? | Cases à cocher | Oui | 3 choix au plus | Vide |
| As-tu déjà une idée de solution ? | Texte libre | Non | « quelques lignes » | Vide |
| Pourquoi devrait-on te choisir ? | Texte libre | Oui | 5 lignes au plus | Vide |
| Quel rôle prends-tu naturellement dans une équipe ? | Choix unique | Oui | — | A — « Je code et je construis (IA / dev) » |

### Quels cas d'usage t'intéressent le plus ?

| Choix recommandé | Lien avec les réalisations |
|---|---|
| Prévision de liquidité des agents mobile money | DabaPulse : prévision de demande, déficit, réallocation, simulation. La rupture de liquidité est l'analogue d'une rupture de stock. |
| Détection des fraudes sur les paiements instantanés | Déo Gracias Wi-Fi : flux de paiement Mobile Money, webhook signé, anti-rejeu, idempotence. Aucune expérience de modèle de fraude. |
| Analyse intelligente des réclamations clients | DabaPulse : classification d'intention et réponses LLM contraintes. |

Écartés faute de preuve : assistant vocal (WAXAL est resté un plan), documents falsifiés (FarmerLedger est resté un plan).
La question porte sur l'intérêt : le choix final est le tien.

### As-tu déjà une idée de solution ?

```
Cas : prévision de liquidité des agents mobile money. Idée : un « radar de liquidité » qui prédit les besoins en cash et en float de chaque agent sur 24 à 72 h, signale les ruptures probables et recommande un rééquilibrage (quel agent, quel montant, quand), avec simulation avant décision. Approche : un modèle de séries temporelles entraîné sur l'historique de tous les agents (jours de marché, fins de mois, fêtes), puis un moteur de décision et une explication en langage clair par LLM. GPU : entraînement sur des milliers de séries, simulations en parallèle, inférence locale d'un LLM ouvert. J'ai déjà construit cette chaîne prévision → risque → décision → simulation pour des stocks (DabaPulse).
```

L'idée ne prétend pas que tu as déjà entraîné un tel modèle. Elle s'appuie sur DabaPulse pour la partie décision.

### Pourquoi devrait-on te choisir ?

```
Je sais amener une idée jusqu'à un produit testé et déployé. Tech Lead d'un e-commerce client en production (467 tests) et Engineering Lead en hackathon sur DabaPulse, un moteur de revenu à risque avec couche LLM. En équipe, je construis l'API, la chaîne de données, l'interface et la démo, en pilotant des agents IA. Je débute en machine learning et en finance : je viens apprendre vite auprès de profils data et métier.
```

421 caractères. Tient en 5 lignes à partir d'environ 90 caractères par ligne ; version courte ci-dessous si le champ est plus étroit.

Version courte (304 caractères) :

```
Je sais amener une idée jusqu'à un produit testé et déployé : Tech Lead d'un e-commerce client en production, Engineering Lead en hackathon sur DabaPulse (revenu à risque + LLM). En équipe, je construis l'API, les données, l'interface et la démo. Je débute en ML et en finance et je viens apprendre vite.
```

### Quel rôle prends-tu naturellement dans une équipe ?

Option **A — Je code et je construis (IA / dev)**. Cohérent avec les rôles d'Engineering Lead et de Tech Lead.
Alternative défendable : D (chef d'équipe), si tu veux coordonner plutôt que construire.
