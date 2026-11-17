# GPU Challenge 2026 — Notes sur le guide des équipes Epi'AI

- **Source :** PDF de 17 pages, daté du 14 novembre 2026, transmis par Stane-Junior le 2026-11-15. Lu en entier (texte extrait ; les images n'ont pas été examinées).
- **Statut :** rédigé par Epi'AI pour ses équipes. Le guide précise qu'il ne représente pas les organisateurs.

## Faits utiles

- Finales : 25 et 26 novembre 2026, Epitech Bénin, Cotonou. Next Fintech Forum : 26 et 27 novembre, Sofitel Marina.
- Non publics selon le guide : programme, livrables, jury, critères, prix, fournisseur et quota de GPU, règles sur les données et la propriété intellectuelle.
- Conseil central : un seul cas d'usage, une démo de bout en bout, un modèle de base sur CPU, le GPU réservé à l'étape qui en a besoin.
- Epi'AI veut un à deux profils finance par équipe, actifs (règles, hypothèses, pitch).

## Écarts relevés

| Point | Guide Epi'AI | Formulaire des organisateurs |
|---|---|---|
| Formation | « hackathon de deux jours, sans formation préalable » | formation en ligne, puis phase de développement, puis finales |
| Date limite | « avant le 15 novembre 2026 » | « dimanche 15 novembre 2026 » |

En cas de doute, le formulaire prime : il vient des organisateurs.

## Fiche 6 — Liquidité des agents mobile money (cas retenu pour la question 13)

- Problème : MicroSave, jusqu'à une transaction sur cinq refusée faute de liquidité. Vérifié le 2026-11-15 : c'est le maximum observé (Tanzanie 20 %, Sénégal 3 %).
- Données : PaySim ou simulateur d'agents écrit par l'équipe ; les données réelles sont confidentielles.
- Méthode : variation nette du lendemain et probabilité de rupture ; LightGBM avec calendrier ; comparaison avec une base saisonnière et un modèle de fondation (Chronos, TimesFM) ; prévisions par quantiles.
- Pièges : simulateur non calibré sur le Bénin, fuite par le calendrier futur, aucune précision « réelle » à annoncer ; WAPE plutôt que MAPE.
- Démo : liste d'agents avec risque de rupture, alerte en français, simulation du coût de rééquilibrage.
- **Tension :** le guide classe ce cas parmi ceux qui n'ont pas besoin de GPU, alors que l'appel exige d'« exploiter pleinement la puissance des GPU ». Usage honnête du GPU : modèle de fondation de séries temporelles et LLM local. Les cas 2 (arnaques) et 3 (documents) donnent au GPU un rôle plus naturel.

## Rôles proposés par le guide

| Rôle | Périmètre | Lien avec le profil audité |
|---|---|---|
| Lead modèle | Modélisation, tâches GPU, évaluation | Non prouvé chez Stane-Junior |
| Lead données et déploiement | Données, pipelines, Docker, mise en service | Partiel |
| **Lead produit et démo** | API, interface, intégrations simulées | Correspond à ses preuves (DabaPulse, perscadors, Déo Gracias) |
| Lead métier et pitch | Problème, hypothèses financières, réglementation, pitch | Profil finance de l'équipe |

## À préparer avant les finales

- Dépôt partagé et environnement identique pour les quatre.
- Essai de bout en bout sur un extrait, avant de consommer des heures de GPU.
- Générateur de données propre, jeu de test séparé et mis de côté dès le début.
- Journal des entraînements ; vidéo de la démo en secours.
- Pitch : problème et utilisateur, démo dans les 90 premières secondes, mesures comparées à la base, mention « données synthétiques », distinction entre l'existant (DabaPulse) et ce qui est construit pendant le challenge.
