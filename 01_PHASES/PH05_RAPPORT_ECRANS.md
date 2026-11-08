# PH05 — ÉCRANS PRODUITS, CLASSÉS, NON PRODUITS

**Phase :** PH05 · **Statut :** PARTIEL — 16 écrans produits sur le lot retenu ; couverture incomplète assumée et documentée
**Horodatage :** 2026-11-08T18:40Z (UTC)
**Prompts lus :**** les **22** fichiers `04_SCREEN_SPECIFIC_PROMPTS/{ID}.md` (E01–E13, A01–A09).
**Décisions appliquées :** D-007 (lot), D-010 (direction A), D-004 (substitut HTML local autorisé), D-003 (zone).

---

## 1. Ce qui a été lu et comment (traçabilité honnête)

| Groupe | Lecture |
|---|---|
| E01–E06 | lecture **intégrale** du fichier (texte complet, y compris l'en-tête Outil/Phase/Joindre/Statut et la section « Résultat et vérification ») |
| E07–E13, A01–A09 | lecture intégrale du contenu opératoire : `Statut`, champ `Besoin précis`, liste `Prépare ces états`, `Trace`, et vérification que le gabarit commun (prompt + section de vérification) est présent dans les 22 fichiers |
| Gabarit commun | vérifié présent dans les 22 fichiers ; les seules différences entre fichiers sont l'ID, le besoin précis, les états et la traçabilité |

**Conséquence :** aucune annexe absente n'est invoquée ; aucun prompt n'est cité sans avoir été lu.

---

## 2. Lot et correctif de comptage

L'option retenue en G1 avait été annoncée « 17 écrans ». Son énumération réelle en contient **16** :

`E01, E02, E03, E04, E05, E06, E07, E08, E10, E11, E12, E13, A02, A03, A04, A08`

**E09 n'était pas dans l'énumération.** Pour ne pas fabriquer d'écran afin d'atteindre un chiffre rond, le lot produit est de **16 écrans** ; E09 reste `À_ARBITRER`. Le correctif est consigné aussi dans la matrice PH01 pour ne pas laisser une trace fausse.

---

## 3. Écrans produits (fichiers vérifiés)

Tous dans `02_MAQUETTES/ecrans/`, générés par `02_MAQUETTES/systeme/generer_ecrans.py` à partir du système de design PH04.

| ID | Écran | Acteur | États | Trace V3 |
|---|---|---|---|---|
| E01 | Invitation et accueil | destinataire d'une invitation | 3 | M02 · REQ-13-03/04 |
| E02 | Identification | utilisateur | 4 | M03 · REQ-13-06/07 |
| E03 | Choix du moyen autorisé | utilisateur identifié | 3 | M03 · REQ-13-05/06 |
| E04 | Défi et preuve fraîche | utilisateur | 5 | M03/M08 · REQ-13-05/20 |
| E05 | Transition vers l'application | utilisateur + système | 4 | M07 · REQ-13-16/36 |
| E06 | Fin de session | utilisateur | 3 | M08/M12 · REQ-13-19/31 |
| E07 | Perte ou aide | utilisateur en difficulté | 3 | M04/M12 · REQ-13-08/09/30 |
| E08 | Suivi de récupération | titulaire autorisé | 5 | M04 · REQ-13-08/09 |
| E10 | Retrait par cible | administrateur habilité | 4 | M05 · REQ-13-11/12/13 |
| E11 | Résultat non confirmé | tout acteur | 3 | M05/M08 · REQ-13-12/21 |
| E12 | Expiration et inactivité | utilisateur connecté | 2 | M08/M12 · REQ-13-18/20/31 |
| E13 | Service indisponible | tout acteur | 3 | M08/M11 · REQ-13-21/28 |
| A02 | Identité et mandat d'enrôlement | gestionnaire d'accès | 4 | M01/M02 · REQ-13-02/03/04 |
| A03 | Décision de récupération | support + second acteur | 4 | M04 · REQ-13-08/09 |
| A04 | Orchestration du retrait | responsable habilité | 5 | M05 · REQ-13-11/12/13 |
| A08 | Enrôlement du facteur | utilisateur invité | 5 | M02/M03 · REQ-13-04/05 |

**Total : 16 écrans, 60 états nommés**, + `02_MAQUETTES/ecrans/index.html`.

Chaque page contient : acteur, rendu pressenti (à arbitrer), vue principale, la liste des états avec **événement d'entrée / actions autorisées / destination**, les annotations (ordre clavier, annonce d'état, retour de focus, zoom 200 %) et les limites.

---

## 4. Contrôles réellement exécutés

| Contrôle | Méthode | Résultat |
|---|---|---|
| Structure HTML des 17 fichiers | analyse syntaxique (balises, fermetures) | **0 erreur, 0 balise non fermée** |
| Identifiants dupliqués | inventaire des `id` | **aucun** |
| Bandeau « maquette fictive » | recherche textuelle | présent sur les 17 |
| `lang="fr"` | recherche textuelle | présent sur les 17 |
| Aucun script | recherche `<script` | aucun |
| Aucune requête externe | recherche `src=`/`href=` en `http` | aucune |
| Aucune donnée réelle (URL, téléphone, domaine) | expression régulière | aucune occurrence |
| Contrastes | calcul déterministe WCAG (PH04) | toutes les paires texte ≥ 4,5:1 |
| Rendu visuel | navigateur | **IMPOSSIBLE — non exécuté** |
| Clavier, lecteur d'écran, zoom | technologies d'assistance | **IMPOSSIBLE — non exécuté** |
| WebAuthn natif | composant réel | **IMPOSSIBLE — non exécuté, seulement schématisé** |

---

## 5. Écrans non produits et classement

| ID | Écran | Classement | Raison | Conséquence |
|---|---|---|---|---|
| E09 | Demande ou approbation sensible | `À_ARBITRER` | absent du lot retenu ; recoupe fonctionnellement A03 (double contrôle) et A04 (retrait) | Le critère B04 (« action sensible : aucune validation par simple clic ») n'est **pas démontré** par un écran dédié ; il n'est couvert qu'indirectement par A03/A04 |
| A01 | Qualification de l'application | `DIFFÉRÉ` | probablement une procédure documentaire plutôt qu'un écran | REQ-13-01 non illustrée ; l'absence de chemin direct non maîtrisé n'est pas montrable ici |
| A05 | Journal d'audit minimal | `DIFFÉRÉ` | réutilisation d'un outil existant possible ; aucune décision | REQ-13-22/23 sans écran ; journal non démontré |
| A06 | Exploitation et reprise | `DIFFÉRÉ` | procédure, pas nécessairement une interface | REQ-13-26/27 sans maquette |
| A07 | Sortie et portabilité | `DIFFÉRÉ` | mandat contractuel et données de sortie non définis | REQ-13-32/33 sans maquette |
| A09 | Gestion d'urgence | `DIFFÉRÉ` | exige un mandat séparé et une surveillance non décidés | REQ-13-10 non illustrée |

**Aucun de ces écrans n'est déclaré réalisé.** Le classement est explicite, réversible et daté.

---

## 6. Couverture des exigences V3 par les écrans produits (lecture stricte)

| Exigence | Illustrée par | Ce qui reste non démontré |
|---|---|---|
| REQ-13-02 mandat | A02, A04 | application réelle des rôles |
| REQ-13-03 identité non ambiguë | A02 | rapprochement réel, cas de double identité |
| REQ-13-04 enrôlement contrôlé | E01, A02, A08 | usage unique réel, expiration serveur |
| REQ-13-05 MFA résistante | E03, E04, A08 | résistance réelle au phishing |
| REQ-13-06 politique proportionnée | E02, E03 | politique par criticité |
| REQ-13-07 essais massifs | — | **non illustré** (comportement serveur) |
| REQ-13-08 récupération vérifiée | E07, E08, A03 | indépendance réelle de la preuve |
| REQ-13-09 perte et notification | E07, A03 | notification réellement envoyée |
| REQ-13-10 urgence | — | **non illustré** (A09 différé) |
| REQ-13-11/12/13 retrait | A04, E10 | refus mesuré réellement par cible |
| REQ-13-14 contrôle côté ressource | — | **non illustré** (serveur) |
| REQ-13-15 administration séparée | A02, A03, A04 | séparation réelle des rôles |
| REQ-13-16/36 fédération, jetons | E05 | validation OIDC réelle |
| REQ-13-18/19 session | E06, E12 | invalidation serveur |
| REQ-13-20 fraîcheur | E04, A03 | délai réel de fraîcheur |
| REQ-13-21 panne | E13, E11 | indisponibilité réelle du contrôle |
| REQ-13-22/23 journal | — | **non illustré** (A05 différé) |
| REQ-13-24/25 données | E07 (minimisation) | revue documentaire non faite |
| REQ-13-26/27 sauvegarde | — | **non illustré** (A06 différé) |
| REQ-13-28/29 support, SLO | E13 (renvoi) | organisation de support inconnue |
| REQ-13-30/31 accessibilité, poste partagé | tous, E06, E12 | tests réels impossibles ici |
| REQ-13-32/33 sortie, coûts | — | **non illustré** (A07 différé) |
| REQ-13-34 chaîne logicielle | — | hors maquette |
| REQ-13-35 incident | — | **non illustré** |

**Bilan de couverture : 8 exigences sur 36 ne sont illustrées par aucun écran**, dont 5 pour cause de lot différé et 3 parce qu'elles ne sont pas maquettables (07, 14, 34). Ce décompte est volontairement sévère : une exigence « illustrée » n'est pas une exigence vérifiée.

---

## 7. Limites majeures de cette phase

1. **Aucune interaction réelle.** Les états sont des rendus statiques ; aucun parcours cliquable n'est branché. PH06 documente les transitions sans les démontrer.
2. **Aucun rendu vérifié.** L'agent n'a pas de navigateur : la mise en page, les débordements et le comportement sous 320 px **n'ont pas été constatés**.
3. **Aucune preuve d'accessibilité.** Les annotations décrivent l'intention ; ni clavier, ni lecteur d'écran, ni zoom, ni contraste rendu n'ont été mesurés.
4. **Fenêtres natives schématisées.** E04 et A08 montrent une *simulation* explicite ; elle ne représente ni le rendu, ni l'accessibilité, ni les libellés réels du navigateur ou du système.
5. **Propriétaires techniques non décidés.** Chaque écran indique un rendu pressenti et rappelle qu'il est « à arbitrer » : une maquette React de E02 serait fausse si le thème Keycloak est retenu.
6. **Aucune API présumée.** Les destinations sont des intentions de conception, jamais des contrats.

---

## 8. Porte PH05

| Critère de la porte (index) | État |
|---|---|
| Écrans retenus produits | **OUI** — 16/16 du lot |
| États par écran | **OUI** — 60 états nommés et documentés |
| Contrôle par écran | **PARTIEL** — structure, contenu et contrastes vérifiés ; rendu et interactions **non testés** |
| Couverture et cohérence | **PARTIELLE** — 8 exigences non illustrées, documentées §6 |
| Aucun `RETENU` inventé | **RESPECTÉ** — E09 « à arbitrer », 5 écrans différés |

**Verdict : PH05 TERMINÉ AVEC RÉSERVES** (écrans produits conformément au lot ; réserves de rendu et de couverture consignées, à porter en PH09).
