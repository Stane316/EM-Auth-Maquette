# PH07 — RAPPORT D'AUDITS (8 modules + accessibilité)

**Phase :** PH07 · **Statut :** TERMINÉ AVEC RÉSERVES — 8 modules évalués, 3 défauts corrigés, réserves non levables ici
**Version auditée :** maquette statique v1 · direction A · 16 écrans · 60 états · 26 fichiers HTML
**Horodatage :** 2026-11-08T19:10Z (UTC)
**Preuves mesurées :** `01_PHASES/PH07_PREUVES_CONTROLES.txt` (généré par `02_MAQUETTE_HTML_V1/systeme/audit_structurel.py`)

> **Portée.** Cet audit porte sur des **fichiers HTML/CSS statiques**. Il ne remplace ni un navigateur, ni un lecteur d'écran, ni un audit WCAG, ni un test de sécurité. Les constats visuels ne valent pas essais en navigateur. Les modules 5, 6 et 7 sont partiellement ou totalement **NON APPLICABLES** ici, avec justification.

---

## 1. Synthèse des modules

| # | Module | Statut | Constats | P0 | P1 | P2 |
|---|---|---|---|---|---|---|
| 1 | UX et parcours | évalué | 5 | 0 | 2 | 3 |
| 2 | UI et design system | évalué | 4 | 0 | 1 | 3 |
| 3 | Sécurité / confidentialité de représentation | évalué | 4 | 0 | 1 | 3 |
| 4 | Accessibilité WCAG 2.2 | **partiel** | 6 | 0 | 2 | 4 |
| 5 | Responsive et compatibilité | **NON TESTÉ** (aucun navigateur) | 2 | 0 | 1 | 1 |
| 6 | Performance | **NON APPLICABLE** comme mesure ; faits documentés | 2 | 0 | 0 | 2 |
| 7 | SEO / confidentialité | évalué (faible surface) | 3 | 0 | 0 | 3 |
| 8 | Fonctionnel et traçabilité | évalué | 4 | 0 | 2 | 2 |

**Aucun P0 détecté.** Deux P1 restent ouverts et bloquent une réception (voir §10).

---

## 2. Contrôles automatiques réellement exécutés puis **retestés après correction**

| Contrôle | Avant correction | Après correction |
|---|---|---|
| Structure HTML équilibrée | OK (0 erreur) | OK |
| `lang="fr"` | OK | OK |
| Lien d'évitement | **7 écarts** | **0** après normalisation de la détection (deux familles de fichiers : `.skip` pour PH03, `.skip-link` pour PH04+) |
| Bandeau « maquette fictive » | OK | OK |
| Scripts embarqués | OK (aucun) | OK |
| Requêtes réseau externes | OK (aucune) | OK |
| Identifiants uniques | OK | OK |
| Références ARIA résolues | OK | OK |
| Labels de champs | OK | OK |
| Légendes de `fieldset` | OK | OK |
| Légendes de tableaux | **1 écart** (galerie) | **0** — légende ajoutée |
| Portée des en-têtes de tableau | OK | OK |
| Alternatives d'images | OK (aucune image) | OK |
| Un seul `h1` par page | **17 écarts** | **0** — les vues d'écran ne dupliquent plus le titre |
| Hiérarchie de titres sans saut | OK | OK |

**Défauts corrigés dans le périmètre autorisé (vérifiés après correction) :** doublon de `h1` sur 17 pages ; légende de tableau manquante dans la galerie ; incohérence de nommage du lien d'évitement entre les deux familles de fichiers (détection alignée, pas de régression visuelle).

---

## 3. Module 1 — UX et parcours

| ID | Constat | Règle / source | Preuve | Gravité | Correction proposée | Statut |
|---|---|---|---|---|---|---|
| UX-1 | Les **boutons sont statiques** : aucune transition déclenchable par l'interface | PH06 porte : « 100 % des transitions parcourues » | `parcours.html` §7 ; pages sans script | **P1** | Autoriser un prototype cliquable (JS local) ou accepter formellement la réserve | **OUVERT** |
| UX-2 | 5 écrans différés laissent des **impasses** (A01, A05, A06, A07, A09) + E09 non arbitré | index PH05 §3 | `ecrans/index.html` | **P1** | Trancher G1 sur ces écrans ou acter leur absence | **OUVERT** |
| UX-3 | Deux ordres possibles pour l'invitation (E01 avant/après A08) | dépend du propriétaire technique | `MATRICE_PARCOURS` T09/T11 | P2 | Décider du propriétaire de rendu | ouvert |
| UX-4 | Absence de page de garde pour E08 | accès « après autorisation » | E08 | P2 | Concevoir la garde si E08 est retenu | ouvert |
| UX-5 | Messages d'erreur génériques correctement non révélateurs | REQ-13-07 / anti-énumération | E02, E07 | — | aucune | conforme à la conception |

## 4. Module 2 — UI et design system

| ID | Constat | Preuve | Gravité | Statut |
|---|---|---|---|---|
| UI-1 | Système de jetons cohérent, **aucune couleur en dur** dans les composants | `systeme/tokens.css` + revue des CSS | — | conforme |
| UI-2 | **Deux systèmes de styles coexistent** : pages PH03 (`assets/base.css`) et système PH04 (`systeme/`) | arborescence | P2 | assumé : PH03 = archive de comparaison ; à fusionner ou archiver en PH08 |
| UI-3 | Cibles interactives ≥ 44 px dans le système retenu | `--target-min: 44px` | — | conforme (valeur déclarée, rendu non mesuré) |
| UI-4 | Direction B (non retenue) avait des cibles à 38 px | `assets/dir-b.css` | P2 | sans objet après D-010 ; signalé pour mémoire |
| UI-5 | Aucun élément décoratif ne concurrence une action sensible | revue des vues | — | conforme |

## 5. Module 3 — Sécurité et confidentialité de représentation

| ID | Constat | Règle | Preuve | Gravité | Statut |
|---|---|---|---|---|---|
| SEC-1 | Aucune promesse de succès sans preuve : E05, E04, A08, A03, E10 conditionnent l'affichage à une confirmation | V3 §4.3, B04/B05 | textes des 60 états | — | conforme à la conception |
| SEC-2 | « Non confirmé » employé partout où une cible n'est pas observée ; jamais remplacé par « Échec » ou « Confirmé » | REQ-13-12 | E10, A04, E11 | — | conforme |
| SEC-3 | Deux acteurs distincts explicités ; auto-approbation déclarée impossible | REQ-13-08 | A03 | — | conforme (règle serveur non démontrée) |
| SEC-4 | Aucun secret, jeton, code ni donnée personnelle dans les fichiers | contrôle automatique : aucune URL/téléphone ; revue de contenu | `PREUVES_CONTROLES` | — | conforme |
| SEC-5 | **Fenêtres natives simulées** (E04, A08) : risque de confusion avec un fonctionnement réel | B10 | étiquette « Simulation — interface non maîtrisée » | **P1** si le lecteur confond | **OUVERT** (mitigation par étiquetage) |
| SEC-6 | Aucun contrôle technique démontré (OIDC, CSRF, sessions, droits par ressource, journalisation) | 04C / PH07 module 3 | — | — | **NON TESTÉ**, hors maquette |
| SEC-7 | `noindex` présent, jamais présenté comme contrôle d'accès | module 7 | `<meta name="robots">` | — | conforme |

## 6. Module 4 — Accessibilité (partiel)

### Ce qui est vérifiable et vérifié
- Labels associés à chaque champ ; `fieldset`/`legend` présents ; légendes de tableaux et portée d'en-têtes ; références ARIA résolues ; un seul `h1` ; langue déclarée ; lien d'évitement ; aucun contenu porté par la couleur seule (étiquettes textuelles) ; `prefers-reduced-motion` prévu dans le CSS ; anneau de focus défini et contrasté (6,39:1) ; cibles ≥ 44 px déclarées.
- Contrastes **calculés** : toutes les paires texte ≥ 4,5:1 (tableau complet en PH04 §3 et PH07 preuves).

### Ce qui ne peut pas être affirmé
| ID | Point | Statut |
|---|---|---|
| A11Y-1 | Navigation clavier réelle, piège de focus, ordre de tabulation | **NON TESTÉ** |
| A11Y-2 | Lecteur d'écran, annonces dynamiques effectives | **NON TESTÉ** |
| A11Y-3 | Zoom 200 %, reflow, 320 px | **NON TESTÉ** |
| A11Y-4 | Contraste **rendu** (le calcul ne tient pas compte de l'anti-aliasing, du thème système, des transparences) | **NON TESTÉ** |
| A11Y-5 | Critère 3.3.8 (authentification accessible) sur parcours complet, y compris fenêtre native | **NON TESTÉ** — la fenêtre native n'est pas maîtrisée |
| A11Y-6 | 🚩 **Aucun audit WCAG n'est réalisé** ; aucune conformité n'est revendiquée | **NON ÉVALUÉ** |

**Point P1 :** l'absence d'essai réel signifie que la réception « accessible » **ne peut pas** être prononcée ; seule une réception **avec réserve** est possible.

## 7. Module 5 — Responsive et compatibilité — **NON TESTÉ**

| ID | Constat | Gravité | Statut |
|---|---|---|---|
| RESP-1 | Points d'essai déclarés (320/360/768/1440) et une règle de repli à 640/760 px existent | — | déclaratif |
| RESP-2 | **Aucun rendu exécuté** : débordements, tableaux larges (E10), empilement des actions ne sont pas constatés | **P1** | **NON TESTÉ** |
| RESP-3 | Navigateurs et appareils réellement disponibles : **inconnus** ; WebAuthn natif non évalué | P2 | inconnu |

## 8. Module 6 — Performance

**Hors de portée comme mesure.** Faits documentés, sans prétention de performance :
- 26 fichiers HTML, **187,9 Ko** au total, **0 image**, **0 police distante**, **0 dépendance JavaScript**, aucun traceur ;
- aucune mesure de LCP/CLS/latence n'a été faite — **aucun budget chiffré n'est inventé** ;
- toute mesure réelle exige une implémentation et un navigateur (G6).

## 9. Module 7 — SEO / confidentialité

| ID | Constat | Gravité | Statut |
|---|---|---|---|
| SEO-1 | Aucune page destinée à l'indexation publique : `noindex, nofollow` sur toutes les pages | — | conforme à la décision |
| SEO-2 | Les écrans d'identification ne sont pas des pages SEO | — | sans objet |
| SEO-3 | `noindex` n'est pas un contrôle d'accès ; aucun sitemap, aucune donnée sensible | — | conforme |

## 10. Module 8 — Fonctionnel et traçabilité

| ID | Constat | Preuve | Gravité | Statut |
|---|---|---|---|---|
| FN-1 | 16 écrans du lot produits ; **5 écrans différés + E09 non arbitré** | `PH05_RAPPORT_ECRANS.md` | **P1** | **OUVERT** |
| FN-2 | **8 exigences sur 36** ne sont illustrées par aucun écran (REQ-13-07, 10, 14, 22/23, 26/27, 32/33, 34) | PH05 §6 | **P1** | **OUVERT** |
| FN-3 | Aucune API, aucun contrat serveur présumé : les destinations sont des intentions | toutes les vues | — | conforme |
| FN-4 | P14 et A01–A09 restent **propositions** ; E10 ne prouve aucun retrait réel ; E11 n'est jamais un succès | inventaire + vues | — | conforme |

---

## 11. Défauts restant ouverts et conséquences

| ID | Gravité | Conséquence sur la réception |
|---|---|---|
| UX-1 boutons statiques | P1 | pas de démonstration de parcours cliquable |
| UX-2 / FN-1 écrans différés | P1 | couverture partielle du V3 |
| SEC-5 fenêtres natives simulées | P1 | risque de confusion, limité par étiquetage |
| A11Y-1 à 3, RESP-2 | P1 | **réception « accessible » impossible** ; réserve obligatoire |
| FN-2 exigences non illustrées | P1 | traçabilité incomplète |

**Aucun P0.** Aucune fausse conformité n'est revendiquée.

---

## 12. Porte PH07

| Critère | État |
|---|---|
| Les 8 modules évalués ou `NON_APPLICABLE_JUSTIFIÉ` | **OUI** (module 5 `NON TESTÉ` justifié ; module 6 requalifié en faits) |
| Preuves de méthode et portée | **OUI** — `PH07_PREUVES_CONTROLES.txt` |
| Corrections autorisées effectuées et retestées | **OUI** — 3 défauts corrigés, 0 régression détectée |
| P0 / P1 | **0 P0 · 3 P1 ouverts** → **NON PRÊT** à ce stade |
| Aucune fausse conformité | **OUI** — aucune revendication de sécurité ni de WCAG |

**Verdict : PH07 TERMINÉ AVEC RÉSERVES — et NON PRÊT pour une réception** tant que les P1 ne sont pas acceptés explicitement ou levés.
