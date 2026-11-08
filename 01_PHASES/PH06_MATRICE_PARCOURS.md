# PH06 — MATRICE DES PARCOURS ET TRANSITIONS

**Phase :** PH06 · **Statut :** TERMINÉ AVEC RÉSERVES (transitions documentées et liées ; exécution non démontrable)
**Horodatage :** 2026-11-08T18:55Z (UTC) · **Version du prototype :** maquette statique v1, 16 écrans, 60 états

---

## 1. Nature de ce qui a été fait

| Attendu PH06 | Réalisé |
|---|---|
| Matrice source / acteur / action / condition / destination / état | **OUI** (§2) |
| Liens réels entre écrans | **OUI** — 156 liens internes vérifiés, **0 cassé** (§5) |
| Portail de parcours navigable | **OUI** — `02_MAQUETTES/parcours.html` |
| Parcours de chaque branche retenue « parcouru » dans le prototype | **PARTIEL** — navigation d'écran en écran réelle ; **les enchaînements d'états ne sont pas déclenchables** (pages statiques) |
| Boutons sans action, impasses, rôles contradictoires, points natifs simulés | **RECENSÉS** (§4) |
| Liens créés dans Figma | **NON** — aucun Figma (B-008) ; instructions manuelles fournies en PH08 |

---

## 2. Matrice des transitions

### 2.1 Accès — utilisateur

| # | Source | Acteur | Action | Condition | Destination | État porté | Échec / branche |
|---|---|---|---|---|---|---|---|
| T01 | E02 Identification | utilisateur | saisir l'identifiant + Continuer | identifiant non vide | E03 | « saisie » → « attente » | champ vide → E02 (validation locale) ; échec → E02 (message générique) |
| T02 | E02 | système | vérification | — | E03 si identification suffisante | « attente » | échec générique ; jamais d'indication d'existence de compte |
| T03 | E03 Choix du moyen | utilisateur | choisir une méthode | méthode autorisée pour compte et rôle | E04 | « méthodes autorisées » | « aucune disponible » → E07 |
| T04 | E03 | utilisateur | « Je ne peux pas utiliser ces moyens » | — | E07 | « aide » | aucune dégradation automatique |
| T05 | E04 Défi | utilisateur | Continuer | — | fenêtre native | « prêt » → « fenêtre native » | « annulé » → E04/E07 ; « expiré » → E04 |
| T06 | E04 | système | preuve reçue | vérification serveur réussie | E05 | « non vérifié » si échec | jamais E05 sans preuve |
| T07 | E05 Transition | système | session établie | — | application de démonstration | « transfert confirmé » | « retour échoué » → E02/E07 ; « inconnu » → E11 |
| T08 | E06 Fin de session | utilisateur | Se déconnecter | — | page publique | « confirmation » → « fin locale confirmée » | « incertain » → E11 |

### 2.2 Enrôlement — gestionnaire et invité

| # | Source | Acteur | Action | Condition | Destination | État porté | Échec / branche |
|---|---|---|---|---|---|---|---|
| T09 | A02 Mandat | gestionnaire | Émettre l'invitation | identité stable + destinataire vérifié + mandat | E01 (côté invité) | « demande » → « en attente » | identité ambiguë → suspension/escalade |
| T10 | A02 | gestionnaire | Suspendre | — | aucun enrôlement | « identité ambiguë » | — |
| T11 | E01 Invitation | invité | Continuer | lien non expiré, non rejoué | E02 (ou A08 selon ordre retenu) | « lien valide » → « traitement » | « expiré ou rejoué » → refus + nouvelle invitation |
| T12 | A08 Enrôlement | invité | Commencer l'enregistrement | invitation vérifiée | dialogue natif | « préparation » → « appel natif » | « annulé » → A08/E07 ; « expiré » → E01 |
| T13 | A08 | système | enregistrement confirmé | confirmation serveur | E02 | « réussi si confirmé » | jamais « réussi » sans confirmation |

### 2.3 Récupération — deux acteurs distincts

| # | Source | Acteur | Action | Condition | Destination | État porté | Échec / branche |
|---|---|---|---|---|---|---|---|
| T14 | E07 Perte ou aide | utilisateur | Demander de l'aide | — | accusé générique | « demande » → « attente » → « réponse générique » | aucune révélation d'existence de compte |
| T15 | A03 Décision | support | Demander une seconde validation | preuve indépendante établie | décision en attente | « second contrôle requis » | preuve insuffisante → arrêt |
| T16 | A03 | **second acteur** | approuver | acteur ≠ demandeur | E08 / enrôlement | « traitement » | auto-approbation **impossible** |
| T17 | A03 | support | Refuser | — | clôture motivée | « refus » | notification selon procédure |
| T18 | E08 Suivi | titulaire autorisé | consulter | accès autorisé | A08 si décision favorable | 5 étapes | notification non confirmée → escalade, pas de clôture |

### 2.4 Retrait

| # | Source | Acteur | Action | Condition | Destination | État porté | Échec / branche |
|---|---|---|---|---|---|---|---|
| T19 | A04 Orchestration | responsable | Confirmer la demande | mandat valide + cibles choisies | E10 | « mandat » → « confirmation » → « traitement » | « partiel » → E10/escalade ; « inconnu » → E11 |
| T20 | E10 Retrait par cible | système | mesurer chaque cible | — | clôture ou escalade | confirmé / en cours / échec / **inconnu** | aucune conclusion globale si une cible n'est pas observée |

### 2.5 États transversaux

| # | Source | Condition | Destination | Règle |
|---|---|---|---|---|
| T21 | Toute action envoyée sans réponse | réponse perdue | E11 | aucune relance automatique |
| T22 | Toute page authentifiée | inactivité / expiration | E12 puis E02 | contenu masqué, aucune sauvegarde promise |
| T23 | Toute page | contrôle indisponible | E13 | action sensible refusée, MFA jamais désactivée |

**Total : 23 transitions documentées** couvrant accès, enrôlement, récupération à deux acteurs, retrait, session et panne.

---

## 3. Rôles : cohérence vérifiée

| Règle | Vérification | Résultat |
|---|---|---|
| Demandeur ≠ approbateur (V3 §4.3) | A03 affiche un demandeur nommé et exige « second acteur distinct » ; message d'impossibilité d'auto-approbation | **cohérent** |
| Retrait réservé aux habilités | A04 et E10 annoncent « accès restreint » | **cohérent**, mais le contrôle réel est serveur |
| Suivi E08 réservé | E08 annonce « accès après autorisation seulement » | **cohérent** ; la page de garde n'est pas conçue |
| Support sans secret | E07 affiche « ne communiquez jamais… » | **cohérent** |
| Aucun rôle inventé au-delà de la proposition | rôles issus du brief §3 / matrice PH01 | **cohérent** |

---

## 4. Défauts recensés (et ce qu'il en est fait)

| ID | Défaut | Gravité | Traitement |
|---|---|---|---|
| D-P1 | Les boutons des écrans sont **statiques** : aucune transition n'est déclenchable par l'interface | P1 (pour une démonstration) | Assumé : substitution HTML autorisée porte sur la revue statique. Un prototype cliquable exigerait du JavaScript, non produit ici pour éviter toute apparence de fonctionnalité |
| D-P2 | E04 et A08 représentent une **fenêtre native simulée** | P1 si confondue avec le réel | Étiquette « Simulation — interface non maîtrisée par EM AUTH » sur les deux vues |
| D-P3 | Le parcours d'invitation a **deux ordres possibles** (E01 avant ou après A08) | P2 | Documenté en T09/T11 ; l'ordre définitif dépend du propriétaire technique (Keycloak vs BFF) |
| D-P4 | Aucun écran ne précède E08 (page de garde du suivi) | P2 | Signalé ; E08 suppose un accès déjà autorisé, non maquetté |
| D-P5 | 5 écrans différés créent des **impasses de parcours** (A01, A05, A06, A07, A09, E09) | P1 pour la couverture | Classement explicite ; un parcours dépendant d'eux s'arrête, ce qui est documenté et non masqué |

---

## 5. Contrôles réellement exécutés

| Contrôle | Méthode | Résultat |
|---|---|---|
| Liens internes | parcours de tous les fichiers HTML, résolution des cibles | **156 liens · 0 cassé** |
| Présence de chaque écran du lot | inventaire des fichiers | **16/16** |
| Cohérence des destinations citées dans la matrice | correspondance avec les fichiers existants | **toutes résolues** |
| Navigation réelle d'écran en écran | clic effectif dans un navigateur | **NON TESTÉ** (pas de navigateur) |
| Enchaînement des états | exécution d'interactions | **NON TESTÉ** — pages statiques |

---

## 6. Porte PH06

| Critère | État |
|---|---|
| Transitions documentées | **OUI** — 23/23 |
| Parcours parcourus dans le prototype | **PARTIEL** — navigation entre pages réelle et vérifiée ; états non déclenchables |
| Impasses et boutons sans action recensés | **OUI** (§4) |
| Points natifs simulés signalés | **OUI** |

**Verdict : PH06 TERMINÉ AVEC RÉSERVES.** La réserve D-P1 (boutons statiques) est structurelle et ne peut être levée sans autorisation d'écrire du JavaScript, ce qui sortirait du cadre « maquette statique » accepté.
