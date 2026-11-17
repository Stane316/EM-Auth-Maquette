# 04 — Cartographie des compétences

## Comment lire ce document

- **Niveau :** Débutant, Intermédiaire, Avancé, ou Non suffisamment documenté.
- **Confiance :** fiabilité de l'estimation, compte tenu des preuves.
- Une technologie présente dans un fichier de dépendances ne compte pas comme compétence.

### Réserve générale sur la confiance

Tes dépôts montrent un usage intensif d'assistants et d'agents IA de développement
(`AGENTS.md` et `CLAUDE.md` dans perscadors, documents de reprise pour agent dans daba-pulse,
commits d'agent dans EM-Auth, 21 000 lignes en 11 jours pour Déo Gracias).

Les dépôts prouvent donc solidement que tu sais **cadrer, faire construire, vérifier et livrer** un système.
Ils prouvent moins solidement que tu sais **écrire seul** chaque brique.
Les niveaux ci-dessous mesurent la première capacité.

**Confirmé par toi le 2026-11-14 :** tu cadres, spécifies et vérifies ; l'IA écrit l'essentiel du code.
Conséquence : dans un entretien technique sans assistance, attends-toi à être un cran en dessous des niveaux affichés
pour l'écriture de code, et au niveau affiché pour l'architecture, la lecture critique et la validation.

---

## Software Development

| Compétence | Niveau | Confiance | Projets | Preuves |
|---|---|---|---|---|
| Frontend | Intermédiaire | Élevée | perscadors, daba-pulse, portfolio | `src/app/**` (App Router, SSR), `frontend/src/screens/*.tsx`, composants de panier et de tunnel de commande |
| Backend | Intermédiaire | Moyenne | perscadors, daba-pulse, Déo Gracias, PIL1 | `src/app/api/*/route.ts`, `backend/app/api/routes.py` (18 routes), `apps/backend/src/app.ts` |
| Full-stack | Intermédiaire | Élevée | perscadors | Application complète en production, de la base à l'interface, tenue six mois |
| Développement d'API | Intermédiaire | Moyenne | daba-pulse, Déo Gracias, perscadors | Schémas Pydantic et zod, codes HTTP soignés (429 avec `Retry-After`, 503), idempotence |
| Conception de bases de données | Intermédiaire | Moyenne | perscadors, Déo Gracias | 32 + 16 migrations, policies RLS, triggers, `CHECK` sur JSONB, rollbacks |
| Architecture logicielle | Intermédiaire | Moyenne | Déo Gracias, daba-pulse, perscadors | Monorepo à quatre paquets, séparation en moteurs, couche de services |
| Tests | Intermédiaire | Élevée | perscadors, Déo Gracias, daba-pulse | 467, 321 et 43 tests rejoués avec succès ; tests de sécurité des routes |
| Sécurité applicative | Intermédiaire | Moyenne | perscadors, Déo Gracias, EM Auth | `rateLimit.ts`, Turnstile, RLS, CSP, webhook HMAC, flux OIDC avec PKCE |
| DevOps | Débutant à Intermédiaire | Moyenne | perscadors, daba-pulse | GitHub Actions, CodeQL, Dependabot, déploiements Vercel, Netlify et Render, Docker Compose (EM Auth) |
| Gestion de versions | Intermédiaire | Élevée | tous | Branches `develop` et `feature/*`, 16 PR, merges de release, résolution de conflits |
| Collaboration et leadership technique | Intermédiaire | Moyenne | perscadors, daba-pulse, PIL1 | Intégration du travail de coéquipiers, merges, CI commune. Le titre de Tech Lead est déclaré, non écrit dans le dépôt. |

## Data Science & Data Engineering

| Compétence | Niveau | Confiance | Projets | Preuves |
|---|---|---|---|---|
| Collecte de données | Débutant | Moyenne | daba-pulse | `services/csv_import.py` : import et validation de CSV |
| Nettoyage | Débutant | Faible | daba-pulse | Validation de colonnes et de types à l'import ; pas de jeu de données réel et sale |
| Analyse exploratoire | Non suffisamment documenté | — | — | Aucun notebook, aucune EDA dans les dépôts |
| Transformation | Débutant à Intermédiaire | Moyenne | daba-pulse | `data_loader.py`, `analytics.py` : agrégations pandas par boutique et produit |
| Feature engineering | Débutant | Faible | daba-pulse | Tendance, jours de couverture, ratio stock sur cible : indicateurs métier, pas des variables de modèle |
| Analyse statistique | Débutant | Faible | daba-pulse | Moyennes glissantes, bornage ; rien au-delà |
| Visualisation | Intermédiaire | Moyenne | perscadors, daba-pulse | Tableau de bord Recharts (`admin/analytics`), `StockDemandChart.tsx` |
| SQL | Intermédiaire | Moyenne | perscadors, Déo Gracias | RPC d'agrégation, policies, triggers, migrations |
| Pipelines de données | Débutant | Moyenne | daba-pulse | Génération synthétique → CSV et SQLite → chargement → moteurs |
| Évaluation de modèles | Non suffisamment documenté | — | — | Aucune métrique de modèle dans les dépôts |

## Artificial Intelligence & Machine Learning

| Compétence | Niveau | Confiance | Projets | Preuves |
|---|---|---|---|---|
| Machine learning | Non suffisamment documenté | — | — | Aucun code d'entraînement dans les 20 dépôts |
| Apprentissage supervisé | Non suffisamment documenté | — | — | Idem |
| Apprentissage non supervisé | Non suffisamment documenté | — | — | Idem |
| Entraînement de modèles | Non suffisamment documenté | — | — | WAXAL et FarmerLedger sont restés au stade du plan |
| Évaluation de modèles | Non suffisamment documenté | — | — | Idem |
| Modélisation prédictive | Débutant | Faible | daba-pulse | Prévision de demande par heuristique, sans modèle appris |
| Intégration d'IA | Débutant à Intermédiaire | Moyenne | daba-pulse | `ai_layer.py` : appel LLM, prompt contraint, analyse de la réponse, repli déterministe |
| Systèmes intelligents | Débutant à Intermédiaire | Moyenne | daba-pulse | Moteur de décision à règles, classification d'intention |
| IA agentique (construire un produit agentique) | Non suffisamment documenté | — | — | Aucun système multi-agent livré |
| Pilotage d'agents IA de développement | Intermédiaire | Élevée | EM Auth, daba-pulse, perscadors | Systèmes de prompts, directives, registres de décisions, vérification des livraisons d'agent |

## Finance & FinTech

| Compétence | Niveau | Confiance | Projets | Preuves |
|---|---|---|---|---|
| Inclusion financière | Non suffisamment documenté | — | — | Le projet Zindi n'est dans aucun dépôt |
| Analyse de données financières | Débutant | Moyenne | daba-pulse, perscadors | Revenu exposé par couple boutique-produit ; chiffre d'affaires, panier moyen, rétention |
| Analyse de risque | Débutant à Intermédiaire | Moyenne | daba-pulse | `risk_engine.py` : sévérité, confiance, facteurs, hypothèses tracées |
| Prévision de revenus | Débutant | Faible | daba-pulse | Moyenne sur 7 jours × tendance |
| Intelligence décisionnelle | Intermédiaire | Moyenne | daba-pulse | Chaîne complète : signal, risque, décision, simulation, explication |
| Modélisation financière | Débutant | Faible | daba-pulse | Simulation avant/après ; pas de modèle financier au sens strict |
| Paiements et automatisation | Débutant à Intermédiaire | Moyenne | Déo Gracias | `fedapay.ts`, machines d'états commande et paiement ; jamais validé en conditions réelles |
| IA appliquée à la finance | Débutant | Moyenne | daba-pulse | Explication par LLM d'indicateurs de risque calculés |

## Technologies : démontrées ou seulement présentes

| Démontrées par du code livré | Présentes sans preuve de maîtrise |
|---|---|
| TypeScript, React, Next.js, Tailwind CSS | PyTorch, Transformers, Whisper (cités dans WAXAL, jamais exécutés) |
| Supabase, PostgreSQL, SQL | scikit-learn (absent de tous les dépôts) |
| Python, FastAPI, pandas, NumPy, Pydantic | TensorFlow, CNN (plan FarmerLedger) |
| Node.js, Fastify, Express | Three.js (dépendance du portfolio) |
| Django (projet académique) | Keycloak, WebAuthn (laboratoire écrit par agent) |
| Vitest, Playwright, pytest | Docker (un seul fichier Compose) |
| Git, GitHub Actions, Vercel, Netlify | C (exercices d'initiation) |
