# 05 — Meilleur projet par domaine

Le choix privilégie la pertinence et la preuve, pas le volume de code.

## Synthèse

| Domaine | Projet recommandé | Solidité du choix |
|---|---|---|
| Software Development | HP Collection (`perscadors`) | Forte |
| Finance / FinTech | DabaPulse (complément : Déo Gracias Wi-Fi) | Moyenne |
| Data Science / Data Engineering | DabaPulse | Faible à moyenne — choix par défaut |
| Artificial Intelligence / Machine Learning | DabaPulse | Faible — aucun modèle entraîné dans les dépôts |

DabaPulse est retenu trois fois. Ce n'est pas un signe de force : c'est le seul dépôt
qui contient à la fois un traitement de données, une logique financière et une brique d'IA.
Si le travail Zindi « Financial Inclusion » est retrouvé avec son code, il remplacera
DabaPulse pour les domaines Data et IA/ML.

---

## 1. Software Development — HP Collection

| | |
|---|---|
| Statut | Projet client, équipe de 3, agence GROW TECH |
| Rôle | Tech Lead ; auteur de 97 % des commits |
| Technologies | Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Cloudinary, Vitest, Playwright |
| Compétences | Full-stack, conception de base, sécurité applicative, tests, CI, déploiement |
| Preuves | 6 routes d'API protégées, 32 migrations SQL, 467 tests rejoués, CI de sécurité, déploiements Vercel |

**Pourquoi lui :** c'est le seul produit utilisé par un vrai client et maintenu six mois.
Il montre la durée, la gestion d'incidents de production et le travail en équipe, ce qu'aucun autre dépôt ne montre.

## 2. Finance / FinTech — DabaPulse

| | |
|---|---|
| Statut | Hackathon Startup FairPlay, projet d'équipe |
| Rôle | Engineering Lead : architecture, backend, intégration, CI, déploiement |
| Technologies | Python, FastAPI, pandas, React, TypeScript |
| Compétences | Analyse de risque, intelligence décisionnelle, simulation de scénarios |
| Preuves | `risk_engine.py` (revenu à risque), `simulator.py`, 43 tests rejoués |

**Pourquoi lui :** il traduit un problème métier (ruptures de stock) en exposition financière chiffrée, puis en décision.
C'est exactement la compétence « transformer une problématique métier en solution technique ».

**Complément utile :** Déo Gracias Wi-Fi montre la mécanique des paiements Mobile Money (FedaPay, webhook signé, idempotence).
À citer si le formulaire parle de paiement ou de fintech au sens strict, en précisant qu'il n'est pas en production.

## 3. Data Science / Data Engineering — DabaPulse

| | |
|---|---|
| Compétences | Génération et chargement de données, agrégations pandas, indicateurs, visualisation |
| Preuves | `generate_synthetic_data.py` (6 720 lignes, CSV et SQLite), `data_loader.py`, `analytics.py` |

**Pourquoi lui :** c'est le seul dépôt avec une chaîne de données de bout en bout.
**Limite à assumer :** données synthétiques, pas d'analyse exploratoire, pas de modèle statistique.

## 4. Artificial Intelligence / Machine Learning — DabaPulse

| | |
|---|---|
| Compétences | Intégration d'un LLM avec garde-fous, repli déterministe, classification d'intention par règles |
| Preuves | `ai_layer.py` (911 lignes), `tests/test_ai_intent.py` |

**Pourquoi lui :** c'est la seule brique d'IA réellement livrée et testée.
**Limite à assumer :** il s'agit d'intégration d'IA, pas de machine learning. Aucun modèle n'y est entraîné.

**À ne pas utiliser pour ce domaine :** `Grow-Tech-waxal-asr` et `farmerledger-digitizer`. Ce sont des plans sans code d'entraînement.
