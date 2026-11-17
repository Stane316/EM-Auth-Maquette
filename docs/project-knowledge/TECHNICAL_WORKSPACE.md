# Environnement technique et état du dépôt

- **Dernière mise à jour :** 2026-11-17
- **Retour au document principal :** [HACKATHON_CONTEXT.md](HACKATHON_CONTEXT.md)

## 1. À retenir

- Ce dépôt a servi de **support à la conversation**. Il n'est pas le dépôt du projet de hackathon.
- **Aucun code, aucune donnée, aucun script, aucune dépendance et aucune expérimentation technique** n'ont été produits pour le challenge.
- Tout le travail versé est de la documentation en Markdown.
- Le dépôt est **public**.

## 2. Identification du dépôt

| Élément | Valeur |
|---|---|
| Dépôt | `Stane316/EM-Auth-Maquette` |
| URL | `https://github.com/Stane316/EM-Auth-Maquette` |
| Visibilité | Publique (vérifiée le 2026-11-17 par l'API GitHub) |
| Remote | `origin` → `https://github.com/Stane316/EM-Auth-Maquette.git` |
| Branche par défaut | `main` |
| Objet d'origine du dépôt | Maquette d'interface du projet EM Auth, sans rapport avec le hackathon |

## 3. Branches

État relevé le 2026-11-17, avant le commit de transfert.

| Branche | Commit de tête | Contenu | Rapport avec le hackathon |
|---|---|---|---|
| `main` | `97fe67e` « Initial commit » | Un seul fichier : `README.md` | Aucun |
| `arena/96c94885-em-auth-maquette` | Issue de `97fe67e` ; reçoit le commit de transfert | `README.md` d'origine, `portfolio-intelligence/`, `docs/project-knowledge/` | **Branche de travail de cette mission** |
| `arena/53c9aa9d-em-auth-maquette` | `300e6ba` (distante seulement) | La maquette React du projet EM Auth, écrite par un agent lors d'une autre session | Aucun ; ne pas la confondre avec la branche de travail |

Avant ce transfert, la branche de travail n'existait pas sur GitHub et rien n'y avait été commité : tout le travail des 14 et 15 novembre était resté en fichiers non suivis.

## 4. Structure du dépôt sur la branche de travail

```
EM-Auth-Maquette/
├── README.md                              préexistant, non modifié
├── docs/
│   └── project-knowledge/                 transfert de contexte du hackathon
│       ├── README.md
│       ├── HACKATHON_CONTEXT.md           document principal
│       ├── PARTICIPATION_FORM.md
│       ├── TEAM_PROFILE.md
│       ├── REFERENCE_DOCUMENT_ANALYSIS.md
│       ├── PROJECT_IDEAS.md
│       ├── DECISIONS_AND_OPEN_QUESTIONS.md
│       └── TECHNICAL_WORKSPACE.md
└── portfolio-intelligence/                audit du portfolio de Stane-Junior
    ├── README.md
    ├── 00_SOURCES_ET_ACCES.md
    ├── 01_PROFIL_ET_POSITIONNEMENT.md
    ├── 02_INVENTAIRE_ET_CLASSIFICATION.md
    ├── 03_AUDITS_PROJETS.md
    ├── 04_CARTOGRAPHIE_COMPETENCES.md
    ├── 05_MEILLEURS_PROJETS_PAR_DOMAINE.md
    ├── 06_DESCRIPTIONS_PRETES_A_COPIER.md
    ├── 07_INCERTITUDES.md
    └── formulaires/
        ├── 2026-11_gpu-challenge-epiai.md
        ├── 2026-11_gpu-challenge-equipe.md
        └── 2026-11_gpu-challenge-guide-notes.md
```

### Comment les deux dossiers s'articulent

| Dossier | Rôle | Quand le lire |
|---|---|---|
| `docs/project-knowledge/` | Vue consolidée du hackathon, écrite pour un lecteur extérieur | En premier ; il se suffit à lui-même |
| `portfolio-intelligence/` | Preuves détaillées sur le profil de Stane-Junior, écrites au fil de l'audit et adressées à lui (« tu ») | Pour vérifier une affirmation sur ses compétences ou reprendre une description de projet |
| `portfolio-intelligence/formulaires/` | Journal de travail des formulaires, dans l'état du 15 novembre | Pour l'historique ; la version consolidée est [PARTICIPATION_FORM.md](PARTICIPATION_FORM.md) |

## 5. Inventaire des modifications

### Fichiers créés pendant la collaboration

| Fichier | Créé le | Contenu |
|---|---|---|
| `portfolio-intelligence/README.md` | 2026-11-14 | Index et règles d'usage de l'audit |
| `portfolio-intelligence/00_SOURCES_ET_ACCES.md` | 2026-11-14 | Sources accessibles ou non, identités Git, tests rejoués |
| `portfolio-intelligence/01_PROFIL_ET_POSITIONNEMENT.md` | 2026-11-14 | Profil, ce que les dépôts prouvent ou non, positionnement IA × finance |
| `portfolio-intelligence/02_INVENTAIRE_ET_CLASSIFICATION.md` | 2026-11-14 | Les 20 dépôts, classements A et B |
| `portfolio-intelligence/03_AUDITS_PROJETS.md` | 2026-11-14 | Audits détaillés avec fichiers de preuve |
| `portfolio-intelligence/04_CARTOGRAPHIE_COMPETENCES.md` | 2026-11-14 | Compétences par domaine, niveau, confiance |
| `portfolio-intelligence/05_MEILLEURS_PROJETS_PAR_DOMAINE.md` | 2026-11-14 | Projet recommandé par domaine |
| `portfolio-intelligence/06_DESCRIPTIONS_PRETES_A_COPIER.md` | 2026-11-14 | Descriptions de projets à plusieurs longueurs |
| `portfolio-intelligence/07_INCERTITUDES.md` | 2026-11-14 | Réponses obtenues et questions ouvertes sur le portfolio |
| `portfolio-intelligence/formulaires/2026-11_gpu-challenge-epiai.md` | 2026-11-14 | Formulaire individuel |
| `portfolio-intelligence/formulaires/2026-11_gpu-challenge-equipe.md` | 2026-11-14 ou 15 | Formulaire d'équipe |
| `portfolio-intelligence/formulaires/2026-11_gpu-challenge-guide-notes.md` | 2026-11-15 | Notes sur le guide Epi'AI |
| `docs/project-knowledge/*.md` (8 fichiers) | 2026-11-17 | Transfert de contexte |

### Fichiers retouchés le 2026-11-17 pour cohérence

| Fichier | Retouche |
|---|---|
| `portfolio-intelligence/README.md` | Avertissement de visibilité mis à jour ; renvoi vers `docs/project-knowledge/` |
| `portfolio-intelligence/00_SOURCES_ET_ACCES.md` | « Trois signatures » corrigé en « Quatre » ; « deux captures » corrigé en « quatre » |
| `portfolio-intelligence/formulaires/2026-11_gpu-challenge-epiai.md` | « lu sur deux captures » corrigé en « quatre » |
| `portfolio-intelligence/formulaires/2026-11_gpu-challenge-equipe.md` | Tableau des questions aligné sur ce qui est réellement connu |

### Autres catégories

| Catégorie | Éléments |
|---|---|
| Fichiers préexistants | `README.md` à la racine (une ligne de titre), non modifié |
| Fichiers supprimés | Aucun |
| Fichiers d'autres auteurs modifiés | Aucun |
| Code source modifié | Aucun |

## 6. Éléments qui ne sont pas dans Git

| Élément | Emplacement d'origine | Pourquoi il n'est pas versé | Où le trouver |
|---|---|---|---|
| Guide Epi'AI, PDF de 17 pages | Pièce jointe de la conversation | Dépôt public ; document appartenant à Epi'AI | Chez Stane-Junior |
| Captures 1 à 4 du formulaire individuel | Pièces jointes | Sans utilité une fois transcrites | Chez Stane-Junior |
| Captures 5 à 7 du formulaire d'équipe | Pièces jointes | Elles montrent les e-mails et numéros des coéquipiers | Chez Stane-Junior |
| Noms complets et coordonnées des coéquipiers | Captures | Données personnelles de tiers dans un dépôt public | Chez Stane-Junior |
| Clones des 20 dépôts audités | Répertoire temporaire de l'environnement | Temporaires ; déjà supprimés | Dépôts d'origine sur GitHub |
| Environnements Python temporaires (tests, lecture du PDF) | Répertoire temporaire | Temporaires | Sans objet |
| La conversation elle-même | Plateforme de discussion | Non exportable | Restituée dans `docs/project-knowledge/` |

## 7. Outils utilisés pendant la collaboration

| Outil | Usage |
|---|---|
| `git`, `gh` | Clonage et audit des 20 dépôts, attribution par auteur, commit et push de ce travail |
| `pytest`, `vitest`, `node --test`, `npm test` | Rejeu des suites de tests des projets audités, le 2026-11-14 |
| PyMuPDF | Extraction du texte et des liens du guide PDF |
| Recherche web | Contexte du Next Fintech Forum, étymologies pour les noms d'équipe, vérification du chiffre MicroSave |
| Lecture de page web | Formulaire Microsoft Forms, lu deux fois |

Limite de l'environnement : le réseau sortant était restreint à GitHub, npm et PyPI. Les sites déployés des projets et le formulaire Tally n'ont pas pu être ouverts.

## 8. Travaux techniques pour le challenge

| Travail | État |
|---|---|
| Dépôt de projet pour l'équipe | Non créé |
| Environnement commun (Docker, dépendances figées) | Non créé |
| Jeu de données ou générateur | Non créé |
| Modèle de base sur CPU | Non créé |
| Essai sur GPU | Aucun ; accès GPU non obtenu |
| Architecture | Non discutée |
| Prototype | Aucun |

## 9. Projet existant réutilisable

DabaPulse (`https://github.com/Stane316/daba-pulse`) est le seul code existant proche du sujet. Son contenu vérifié :

| Brique | Fichier | Ce qu'elle fait |
|---|---|---|
| Estimation de la demande | `backend/app/engines/analytics.py` | Moyenne des ventes sur 7 jours × facteur de tendance borné × horizon |
| Revenu à risque | `backend/app/engines/risk_engine.py` | Déficit × prix unitaire ; sévérité, confiance, facteurs et hypothèses tracés |
| Décision et simulation | `decision_engine.py`, `simulator.py` | Recommandation de réallocation ; comparaison avant/après |
| Couche IA | `ai_layer.py` | Classification d'intention par règles ; appel LLM optionnel ; repli déterministe |
| Données | `scripts/generate_synthetic_data.py` | 5 boutiques × 16 produits × 84 jours, graine fixe |
| API et interface | FastAPI (18 routes), React | Six écrans |
| Tests | `pytest` | 43 réussis le 2026-11-14 |

Limites : moteur déterministe, aucun modèle entraîné, données synthétiques. Le droit de réutiliser du code existant dans le challenge n'est pas connu.
