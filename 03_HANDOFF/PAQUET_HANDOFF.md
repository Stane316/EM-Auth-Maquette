# PAQUET DE TRANSFERT (HANDOFF) — EM AUTH

**Phase :** PH08 · **Statut :** PAQUET CONSTITUÉ, RÉSERVES OUVERTES (pas de conclusion « prêt »)
**Version du prototype :** `maquette-v1` · **Horodatage :** 2026-11-08T19:25Z (UTC)
**Destination :** équipe de développement future, sous **autorisation distincte (G6)**. Aucun code de production, aucune installation, aucune intégration n'a été réalisée.

---

## 1. Identifiants et versions

| Élément | Valeur |
|---|---|
| Dépôt de référence (lecture seule) | `Stane316/EM-Auth` · branche `main` · commit **`a80a47855277ae851679790b56d7e640c7e9b41d`** |
| Cahier officiel | V3.0 du 2026-11-01 · **SHA-256 `25c1e0513c80461e5855ae50c7dd08733ce45bcb684604bd39b9fc8eb931f1cf`** (vérifié identique à l'empreinte documentée) |
| Système de prompts | `EM_AUTH_PROTOTYPING_SYSTEM/`, 77 fichiers · empreintes fichier par fichier : `00_SUIVI/EMPREINTES_SOURCES.txt` |
| DRI | `dri/` 13 fichiers · annexes `12*`–`15`, `catalogue-student/harnai`, `data/` **absentes** |
| Zone de travail et livrables | dépôt `EM-Auth-Maquette`, branche `arena/53c9aa9d-em-auth-maquette` |
| Version de maquette | **maquette-v1** — 16 écrans, 60 états, 26 fichiers HTML, 37 fichiers, ≈ 336 Ko |
| Fuseau / horloge | UTC, bac à sable. **Incertitude temporelle signalée** : dates du PDF (2026-11-01) et du commit (2026-11-08 18:09 +01:00) non réconciliées (B-005) |

### Décisions humaines appliquées

| ID | Décision | Statut |
|---|---|---|
| D-000 | Workflow PH00→PH09, aucune mise en production, aucune PR | approuvée (instruction) |
| D-001 | Dépôt de travail = `EM-Auth-Maquette` ; `EM-Auth` = référence distante en lecture seule | précisée par l'utilisateur |
| D-002 | DRI = dossier `dri/`, annexes manquantes déclarées inconnues | proposée, non contredite |
| D-003 | Zone d'écriture = ce dépôt | précisée par l'utilisateur |
| D-004 | Substitut HTML local + serveur statique autorisé (aperçu) | **approuvée** |
| D-007 | Lot d'écrans (16 produits) | **approuvée** (libellé initial « 17 » corrigé) |
| D-010 | Direction visuelle **A — Clarté institutionnelle** | **approuvée** |
| D-005 | Aucune transmission à un service tiers (Stitch/Figma) | maintenue |
| G4 (réception) | **non prononcée** | en attente |

---

## 2. Fichiers réellement livrés

| Chemin | Objet | Empreinte SHA-256 (16 premiers) |
|---|---|---|
| `02_MAQUETTES/ecrans/` (16 pages + index) | écrans du lot, 60 états | voir §7 |
| `02_MAQUETTES/systeme/tokens.css` | jetons sémantiques | `c749089dc13afcb5` |
| `02_MAQUETTES/systeme/base.css` | socle, focus, gabarits | `c6fbf91ef46530b3` |
| `02_MAQUETTES/systeme/composants.css` | composants et variantes | `631b71f39a304730` |
| `02_MAQUETTES/systeme/galerie.html` | galerie de composants rendue | `e5c891697b2bf53e` |
| `02_MAQUETTES/parcours.html` | portail de parcours (liens réels) | `9c9babfff5d466f6` |
| `02_MAQUETTES/index.html` | comparaison A/B/C | `82bceb62772d8b97` |
| `02_MAQUETTES/direction-{a,b,c}/` | archive de la comparaison PH03 (6 vues) | voir §7 |
| `02_MAQUETTES/systeme/generer_ecrans.py` | générateur (provenance, reproductibilité) | `97cb1c3630250500` |
| `02_MAQUETTES/systeme/generer_ph03.py` | générateur des vues de comparaison | `69f6c3ca64591b10` |
| `02_MAQUETTES/systeme/audit_structurel.py` | audit outillé (preuves PH07) | `c67773351c0f1c89` |
| `01_PHASES/` | rapports PH01, PH02, PH03, PH05, PH06, PH07, PH09 | — |
| `00_SUIVI/` | 5 registres + capacités + manifeste d'empreintes | — |

**Aucun export Figma, aucun fichier Stitch, aucune capture d'écran.** Les seules « vues » sont les fichiers HTML eux-mêmes.

---

## 3. Jetons sémantiques (direction A)

| Jeton | Valeur | Usage | Contraste mesuré |
|---|---|---|---|
| `--c-ink` | `#102B3F` | texte principal | 14,59:1 sur blanc · 13,70:1 sur fond |
| `--c-muted` | `#4A5A68` | texte secondaire | 7,11:1 sur blanc |
| `--c-accent` | `#17645E` | action principale | 6,95:1 (blanc dessus) |
| `--c-link` | `#14615B` | liens | 6,95:1 |
| `--c-focus` | `#0B57D0` | anneau de focus | 6,39:1 |
| `--c-danger` / `--c-warn` / `--c-info` / `--c-unknown` / `--c-ok` | `#9A2318` / `#7A4A00` / `#1B4C7E` / `#4A3A63` / `#14614B` | états | 7,23 / 6,97 / 7,96 / 8,99 / 6,62 :1 |
| Typographie | pile **système** uniquement | — | aucune licence tierce, aucune requête |
| Échelle | 13 / 14 / 16 / 18 / 22 / 28 px, relative (`rem`) | — | zoom navigateur respecté (non testé) |
| Espacements | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px | — | grille compatible 8 px |
| Rayons | 4 · 6 · 999 px | — | — |
| Cible interactive | **44 px** minimum | — | non mesuré au rendu |
| Mouvement | aucun ; `prefers-reduced-motion` neutralise tout | — | règle présente, non vérifiée |

**Ces valeurs sont des propositions de conception**, pas une charte validée : l'identité EM Consulting (logo, couleurs, polices, droits) est **inconnue**.

---

## 4. Matrice écran / acteur / contrat / état / test / propriété

| ID | Acteur / droits (proposés) | Déclencheur → résultat | Couche potentielle | Contrat / données | Tests prévus | Propriété |
|---|---|---|---|---|---|---|
| E01 | destinataire d'invitation ; public | lien valide → accueil ; expiré → refus | thème Keycloak **ou** BFF | invitation à usage unique — **contrat inconnu** | lien expiré/rejoué, annonce d'état | **à arbitrer** |
| E02 | utilisateur ; public | identifiant → étape suivante | thème Keycloak (login) | policy IdP — inconnu | message générique, anti-énumération (serveur) | à arbitrer |
| E03 | utilisateur identifié | moyen choisi → défi | thème Keycloak / BFF | politique par rôle — inconnue | absence de repli faible | à arbitrer |
| E04 | utilisateur ; preuve fraîche | défi → preuve vérifiée | **navigateur natif** + BFF | WebAuthn — contrat à inventorier | WebAuthn réel et simulé, séparés | à arbitrer |
| E05 | système + utilisateur | retour OIDC → application | BFF (openid-client) | issuer/audience/state/nonce — inconnu | jeux négatifs OIDC | à arbitrer |
| E06 | utilisateur | déconnexion → fin locale | Keycloak logout / BFF | portée de session — inconnue | rejeu de cookie, autres RP | à arbitrer |
| E07 | utilisateur en difficulté ; public | demande → réponse générique | BFF / portail | canal de support — **inconnu** | non-révélation, minimisation | à arbitrer |
| E08 | titulaire autorisé | suivi → étapes | interface React future | aucun contrat | autorisation d'accès, escalade | à arbitrer |
| E10 | rôle habilité | ordre → état par cible | interface React + service de retrait | **aucune API présumée** | panne de cible, INCONNU | à arbitrer |
| E11 | tout acteur | réponse perdue → vérification | composant partagé | idempotence — non décidée | absence de relance automatique | à arbitrer |
| E12 | utilisateur connecté | inactivité → expiration | BFF / Keycloak | durées — **non décidées** | masquage du contenu | à arbitrer |
| E13 | tout acteur | contrôle indisponible → refus | proxy / BFF | — | action sensible refusée | à arbitrer |
| A02 | gestionnaire mandaté | demande → invitation | interface React | aucun contrat | identité ambiguë | à arbitrer |
| A03 | support + **second acteur** | preuve + approbation → enrôlement | interface React | aucun contrat | auto-approbation impossible | à arbitrer |
| A04 | responsable habilité | confirmation → retrait | interface React | aucun contrat | partiel / inconnu | à arbitrer |
| A08 | utilisateur invité | enrôlement → confirmation | **navigateur natif** + BFF | WebAuthn création — à inventorier | annulation, expiration | à arbitrer |

**Contrats confirmés : aucun.** Chaque ligne marque explicitement l'absence d'API, ce qui interdit toute implémentation « au fil de l'eau ».

---

## 5. Divergences et inconnues à porter au dossier

1. **Aucune interface React 19/Vite n'existe** dans l'arbre observé : `app/` est un BFF + laboratoire JS. La maquette anticipe une UI qui reste à créer.
2. **`develop` non examinée** : l'état du code sur cette branche est inconnu (B-004).
3. **Keycloak peut rendre lui-même E02–E04** : toute décision de thème change le propriétaire des écrans.
4. **Fenêtres natives non maîtrisées** : le rendu WebAuthn dépend du navigateur et du système ; son accessibilité n'est pas garantie par EM AUTH.
5. **Seuils inconnus** : fraîcheur, expiration, plafond absolu, délais de retrait, SLO, RTO/RPO — aucun n'est inventé, tous marqués « à convenir ».
6. **Journal, sauvegarde, sortie** : sans écran (A05/A06/A07 différés), donc sans inventaire de contrats.

---

## 6. Sources, licences et dépendances

| Élément | État |
|---|---|
| Dépendances logicielles de la maquette | **aucune** (0 npm, 0 CDN, 0 police distante, 0 image binaire) |
| Polices | pile système — aucune licence à vérifier |
| Icônes | SVG inline minimal, dessinées pour la maquette ; **aucun jeu tiers importé** |
| Ressources DRI | **aucune intégrée** (PH02 §2) ; licences non vérifiées à l'usage |
| Contenus textuels | rédigés pour la maquette ; aucune reprise d'un produit tiers |
| Marque | **aucun logo ni couleur EM Consulting** — identité inconnue |
| Données | 100 % fictives (`U-0042`, `R-2041`, `D-2210`, `K. ADJOVI` sont des exemples inventés) |

---

## 7. Empreintes des fichiers de maquette

Les 37 fichiers de `02_MAQUETTES/` sont versionnés dans le dépôt ; les empreintes sont recalculables par `sha256sum`. Extrait (16 premiers caractères) :

```
tokens.css c749089dc13afcb5 · base.css c6fbf91ef46530b3 · composants.css 631b71f39a304730
galerie.html e5c891697b2bf53e · parcours.html 9c9babfff5d466f6 · index.html 82bceb62772d8b97
ecrans/e01 31fdbd543e8a6082 · e02 86ee5a905ccdf5eb · e03 6fe945ec10965651 · e04 13f9de50cde8e630
e05 186f113c18c49340 · e06 8ff49477b41141fe · e07 2492a7ad0312b762 · e08 c34d35ebd5fdde52
e10 1abe928c171db6b2 · e11 66d006e20240fb01 · e12 d6a6e25a4d1f1bad · e13 ecb518d337d0503a
a02 6f6d5a499a0aa335 · a03 3e52b4cdc926e40e · a04 cd2baca41274db5b · a08 890fc13d71af3b26
```

---

## 8. Instructions manuelles — si un fichier Figma est exigé (critère B08)

Aucun accès Figma n'existe ici : le critère B08 n'est **pas** satisfait. Pour qu'un humain le réalise, voici l'opération à effectuer, **sans transmission de données réelles** (G3) :

1. Créer un fichier « EM AUTH — Maquette (fictive) », pages : `00 Tokens`, `01 Composants`, `02 Parcours utilisateur`, `03 Administration`, `04 États transversaux`.
2. Nommer les frames `{ID}/desktop/{état}` et `{ID}/mobile/{état}`, par exemple `E04/desktop/annulé`, conformément aux prompts d'écran.
3. Poser les jetons du §3 en variables (couleurs, espacements, rayons, typographie) ; documenter les contrastes mesurés.
4. Créer les composants : bouton (4 variantes + désactivé), champ (normal/erreur/désactivé), message (5 niveaux), étiquette d'état (5), carte, liste de vérification, tableau, étapes, rail.
5. Reproduire les 16 écrans et leurs 60 états depuis les fichiers HTML de `02_MAQUETTES/ecrans/`, en **hors-maquette** pour les fenêtres natives (annotation « non maîtrisée par EM AUTH »).
6. Relier uniquement les transitions documentées en `01_PHASES/PH06_MATRICE_PARCOURS.md` ; vérifier chaque destination manuellement.
7. Consigner dans le fichier l'avertissement : maquette fictive, aucune preuve de sécurité ni de conformité.

---

## 9. Séquence d'intégration proposée (proposition test-first — **rien n'est exécuté**)

| Étape | Contenu | Prérequis |
|---|---|---|
| 0 | Trancher G1 pour E09 et les 5 écrans différés ; décider le propriétaire de chaque écran (Keycloak / BFF / React / natif / procédure) | décision humaine |
| 1 | Audit lecture seule du dépôt réel (branche retenue), état Git, tests existants, dépendances, menaces | **G6** |
| 2 | Écrire les tests d'abord (négatifs et positifs) pour un lot réversible ; établir l'échec attendu | G6 |
| 3 | Implémenter un seul lot en React 19/Vite selon la V3, sans imposer de bibliothèque UI depuis la maquette | G6 |
| 4 | Exécuter les tests autorisés, consigner commande, environnement, version, résultat, écarts | G6 |
| 5 | Revue humaine, diff montré, aucune PR, aucun push vers branche protégée | G6 |

---

## 10. Mini-contrat de livraison

**Version/commit :** `maquette-v1` sur `arena/53c9aa9d-em-auth-maquette`, référence `a80a478` · **Lot :** 16 écrans (D-007) · **Décideur :** utilisateur (D-004, D-007, D-010), réception G4 **non prononcée** · **Sources :** PDF V3 `25c1e051…f1cf`, système `a80a478`, DRI `dri/` · **Écrans/états :** 16 écrans / 60 états · **Réel/simulé :** tout est simulé et statique ; fenêtres natives schématisées · **Inconnus :** contrats serveur, seuils, canaux, marque, `develop`, annexes DRI · **Tests et preuves :** analyses structurelles (`PH07_PREUVES_CONTROLES.txt`), contrastes calculés ; **aucun test navigateur, clavier, lecteur d'écran, WebAuthn ni performance** · **Écarts :** 3 P1 ouverts (boutons statiques, écrans différés, fenêtres natives simulées) + réserve accessibilité · **Autorisation suivante :** décision G4 (réception avec ou sans réserves), puis G6 distincte pour toute intégration de code.

---

## 11. Porte PH08

| Critère | État |
|---|---|
| Paquet complet pour le périmètre retenu | **OUI** — fichiers, jetons, matrice, inconnues, licences |
| Liens et droits vérifiés | **OUI** — 156 liens internes, 0 cassé ; aucune dépendance, donc aucune licence tierce |
| Inconnus explicites | **OUI** — §5 et matrice §4 |
| Conclusion « prêt » | **NON** — des blocages restent ouverts (PH07 §11) |

**Verdict : PH08 TERMINÉ — paquet transférable constitué, sans conclusion de disponibilité.**
