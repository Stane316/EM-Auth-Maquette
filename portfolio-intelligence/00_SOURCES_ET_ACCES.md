# 00 — Sources et accès (Phase 1)

## Ce qui a été accessible

| Source | État | Détail |
|---|---|---|
| Compte GitHub `Stane316` | Accessible | Authentifié via l'intégration Arena (installation sur tous les dépôts du compte). Compte créé le 2026-01-07. |
| Dépôts de `Stane316` | 17 dépôts, tous **publics** | Clonés avec tout l'historique et toutes les branches |
| Organisation `GROW-TECH-251` | 3 dépôts, tous **publics** | `perscadors`, `ONG-Dashboard`, `growtech-portfolio` (droits admin) |
| Historique Git, branches, PR | Accessible | Via `git` et l'API GitHub |
| Exécution des tests | Possible | Dépendances installées depuis npm et PyPI dans `/tmp` |

## Ce qui n'a pas été accessible

| Source | État | Conséquence |
|---|---|---|
| Dépôts privés | **Aucun visible** | L'API ne renvoie aucun dépôt privé pour ce compte. Soit il n'y en a pas, soit ils sont sur un autre compte. |
| Ordinateur personnel | Non accessible | L'environnement est un bac à sable qui ne contient que le clone de `EM-Auth-Maquette`. Les projets locaux non poussés sont invisibles. |
| Discord | Non accessible | Connecteur non proposé par la plateforme. |
| Sites déployés | Non vérifiables | Le réseau sortant est limité à GitHub, npm et PyPI. `perscadors.vercel.app`, `dabapulse.netlify.app` et l'API Render n'ont pas pu être ouverts. |
| Formulaire Tally | Non accessible | Seules quatre captures d'écran ont été lues. |
| Liste des collaborateurs d'un dépôt | Refusée (HTTP 403) | Les rôles d'équipe sont déduits des commits et des PR. |
| Zindi, Kaggle, Colab | Non accessibles | Aucune trace d'un travail « Financial Inclusion » n'existe dans les dépôts. |

## Identités Git rencontrées

Quatre signatures correspondent au même titulaire. Elles n'ont pas la même signification :

| Signature | Origine | Lecture |
|---|---|---|
| `Stane` (adresse Gmail) | Poste personnel | Commits faits en local |
| `Stane-Junior ANIAMBOSSOU` (adresse Gmail) | Interface web GitHub | Merges de PR, commits initiaux |
| `Stane316` (adresse `noreply` GitHub) | Sessions d'agent IA Arena | Commits produits par un agent de développement sur des branches `arena/*`, sous ta direction |
| `Tesan-Dev` (adresse Gmail) | Ancien nom local | Commits de mars et mai 2026 |

La troisième ligne compte pour l'attribution : dans `EM-Auth`, `EM-Auth-Maquette` et `mathverse`,
la majorité des commits a été écrite par un agent, puis fusionnée par toi.

## Vérifications rejouées le 2026-11-14

| Projet | Commande | Résultat |
|---|---|---|
| perscadors | `vitest run` | 467 tests réussis sur 467 |
| daba-pulse | `pytest` | 43 tests réussis sur 43 |
| deo-gracias-wifi-system | `npm test` (4 workspaces) | 321 réussis, 58 ignorés (ils exigent une base PostgreSQL) |
| EM-Auth `app/` | `node --test` | 65 réussis, 0 échec, 8 ignorés (ils exigent Keycloak) |
| EM-Auth `bench/` | `node --test` | 16 réussis, 1 ignoré |

Non rejoués : les 64 tests Playwright de perscadors, les tests de `EM-Auth-Maquette`, les tests Django de PIL1.
