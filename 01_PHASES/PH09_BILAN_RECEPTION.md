# PH09 — BILAN DE RÉCEPTION

**Version présentée :** `maquette-v1` — direction A, 16 écrans, 60 états, 26 fichiers HTML
**Horodatage :** 2026-11-08T19:40Z (UTC)
**Évaluateur :** agent d'orchestration (évaluation technique). **Décideur humain (G4) :** non prononcé.
**Référence :** cahier V3.0 `25c1e051…f1cf` · système `a80a478` · critères `09_EM_AUTH_PROTOTYPE_ACCEPTANCE_CRITERIA.md`

---

## ⚠️ VERDICT : **NON PRÊT**

Trois critères ne sont pas satisfaits (B03 partiellement, **B08**, **B09**) et trois P1 restent ouverts. Aucune réception ne peut être prononcée ; une réception **avec réserves explicitement acceptées** reste possible sur décision humaine (G4).

---

## 1. Tableau B01–B10

| ID | Critère | Preuve / méthode | Évaluateur | État |
|---|---|---|---|---|
| **B01** | PDF et commit identifiés, source V3 prioritaire, écart temporel signalé ; 100 % des décisions structurantes du lot validées humainement | PDF SHA-256 vérifié ; commit `a80a478` ; écart temporel B-005 ; D-004/D-007/D-010 approuvées ; D-001/D-003 précisées ; **D-002 (DRI) non confirmée explicitement** | agent | **SATISFAIT avec réserve** (D-002 à confirmer) |
| **B02** | Une organisation + application fictive ; aucune fonction exclue présentée comme livrée ; écrans E/A classés ; propriétaires non décidés marqués à arbitrer | 16 écrans, tous marqués « à arbitrer » ; index PH05 avec 5 différés + E09 ; exclusions V3 respectées (aucune inscription ouverte, aucun reset, aucun dashboard marketing) | agent | **SATISFAIT** |
| **B03** | Pour **chaque écran et état du lot** : acteur, entrée, action, destination, message, état documentés ; toutes les branches prévues **parcourues ou explicitement NON TESTÉES** | 60 états documentés (acteur / événement d'entrée / actions / destination) ; 23 transitions (PH06) ; **branches non parcourues** : pages statiques, aucun bouton actif | agent | **PARTIEL** — documentation OUI, parcours NON |
| **B04** | E04 / action sensible : aucune validation par simple clic ; absence de preuve forte bloque ; récupération avec preuve indépendante et deux personnes distinctes ; aucune méthode faible silencieuse | E04 : 5 états, aucun succès sans preuve ; A03 : preuve indépendante + second acteur, auto-approbation impossible ; E03 : aucun repli OTP/SMS ; E13 : refus si contrôle indisponible. **E09 (action sensible dédiée) non produite** | agent | **SATISFAIT sur le lot, réserve E09** |
| **B05** | E10 : chaque cible affiche son état et sa portée ; cible non observée = INCONNU ; E11 et E06 ne prétendent ni succès ni déconnexion globale | E10 : tableau 4 états par cible, « Non confirmé » explicite ; E11 : « Résultat non confirmé », aucune relance ; E06 : portée locale, autres sessions « Non vérifié » | agent | **SATISFAIT** (conception ; mesure réelle non démontrée) |
| **B06** | Aucune donnée réelle, jeton, code ou secret ; droits de diffusion, licences et sources des assets confirmés | contrôle automatique : aucune URL, aucun téléphone, aucun script, aucune ressource externe ; **0 dépendance, 0 police tierce, 0 image** ; données fictives signalées | agent | **SATISFAIT** |
| **B07** | Titres, labels, ordre de focus, messages d'erreur, états non fondés sur la couleur ; contraste **mesuré** 4,5:1 / 3:1 ; problèmes et impossibilités inscrits | labels/legend/caption/scope vérifiés automatiquement (0 écart) ; contrastes **calculés** ≥ 4,5:1 sur toutes les paires texte ; ordre de focus documenté par écran ; états toujours textuels ; limites inscrites (PH07 §6) | agent | **SATISFAIT avec réserves** — contrastes calculés et non mesurés au rendu ; essais clavier/lecteur **NON TESTÉS** |
| **B08** | Vérifier **manuellement dans Figma** les parcours, liens et vues aux tailles retenues ; signaler ce qui ne peut être simulé | **Aucun Figma accessible** ; aucun transfert SaaS autorisé (D-005) ; instructions manuelles fournies (PAQUET_HANDOFF §8) | agent | **NON SATISFAISABLE ici** — écart B-008 |
| **B09** | Handoff complet : versions, composants, états, hypothèses, API absentes, licences, tests, écarts ; **absence de P0 et de P1 non acceptés** | `PAQUET_HANDOFF.md` : versions, jetons, matrice écran/contrat, inconnues, licences, séquence | agent | **NON SATISFAIT** — 3 P1 ouverts non acceptés |
| **B10** | Aucun prototype ou audit visuel présenté comme preuve WCAG, sécurité ou réussite en composants réels | avertissements sur chaque page, PH07 §6, PH09 §4 ; aucune revendication de conformité | agent | **SATISFAIT** |

**Décompte :** 5 satisfaits · 2 satisfaits avec réserves · 1 partiel · 2 non satisfaits.

---

## 2. Bilan des 22 écrans

| Classement | Écrans | Nombre |
|---|---|---|
| **Produits** (maquette + états + annotations) | E01, E02, E03, E04, E05, E06, E07, E08, E10, E11, E12, E13, A02, A03, A04, A08 | **16** |
| **À arbitrer** (non produit) | E09 | **1** |
| **Différés** (décision G1) | A01, A05, A06, A07, A09 | **5** |
| **Réalisés mais incomplets** | aucun écart de ce type : chaque écran produit couvre les états demandés par son prompt | **0** |

**Incomplets au sens de la couverture V3 :** 8 exigences sur 36 ne sont illustrées par aucun écran (REQ-13-07, 10, 14, 22/23, 26/27, 32/33, 34) — voir PH05 §6.

---

## 3. Audits effectivement réalisés / non réalisés

| Réalisé | Non réalisé |
|---|---|
| audit structurel outillé (26 pages, 15 contrôles) avec **correction puis retest** de 3 défauts | audit en navigateur (rendu, débordements, 320 px) |
| calcul déterministe des contrastes (27 paires) | mesure de contraste rendue à l'écran |
| vérification des liens internes (156, 0 cassé) | navigation clavier réelle, piège de focus |
| vérification d'absence de script, de requête externe, de donnée réelle | lecteur d'écran (NVDA/JAWS/VoiceOver) |
| cohérence des parcours et des rôles (23 transitions) | tests de sécurité (OIDC, CSRF, session, droits) |
| contrôle de la traçabilité écran ↔ exigence | test WebAuthn réel, authentificateur physique |
| — | mesure de performance (aucun budget inventé) |
| — | audit WCAG (aucun, aucune revendication) |

---

## 4. Corrections apportées pendant le workflow

| # | Correction | Phase | Vérification |
|---|---|---|---|
| 1 | Doublon de `h1` sur 17 pages (titre de page + titre de vue) | PH07 | retest : 0 écart |
| 2 | Légende de tableau manquante dans la galerie | PH07 | retest : 0 écart |
| 3 | Incohérence de nommage du lien d'évitement entre deux familles de fichiers | PH07 | détection alignée, 0 écart |
| 4 | **Erreur de comptage** : option de lot annoncée « 17 » alors qu'elle en contient 16 | PH05 | corrigée et documentée dans PH01 et PH05 |

---

## 5. Problèmes ouverts

| ID | Gravité | Problème | Condition de clôture |
|---|---|---|---|
| UX-1 | **P1** | Boutons statiques : aucun parcours cliquable | autorisation d'un prototype JS local, ou acceptation formelle de la réserve |
| UX-2 / FN-1 | **P1** | 5 écrans différés + E09 non arbitré | décision G1 |
| SEC-5 | **P1** | Fenêtres natives simulées (E04, A08) | acceptation de la réserve ou production Figma avec annotations hors-maquette |
| A11Y/RESP | **P1** | Aucun essai clavier, lecteur d'écran, zoom, rendu | essais réels (navigateur + technologies d'assistance) |
| B-008 | **P1** | B08 (Figma) inapplicable | accès Figma (G3) ou réserve G4 explicite |
| B-002 | P2 | Annexes DRI `12*`–`15` absentes | fourniture ou maintien en INCONNU |
| B-004 | P2 | Branche `develop` non examinée | décision D-001 définitive |
| B-005 | P2 | Incohérence de dates | clarification de la référence temporelle |
| FN-2 | **P1** | 8 exigences V3 non illustrées | arbitrage de lot ou acceptation |
| D-002 | — | DRI de substitution non confirmée | confirmation explicite |

**Aucun P0.** Aucune fausse sécurité, aucune conformité revendiquée.

---

## 6. Ce que cette version permet et ne permet pas

**Permet :** relire la conception écran par écran, vérifier la cohérence des états critiques (inconnu, preuve insuffisante, retrait par cible), auditer les jetons et les contrastes calculés, transmettre un dossier structuré à une équipe de développement, reproduire les pages à partir des générateurs.

**Ne permet pas :** démontrer un parcours utilisateur réel, prouver une sécurité ou une conformité WCAG, valider un rendu visuel, tester WebAuthn, mesurer une performance, ni servir de base directe à du code de production sans décisions complémentaires.

---

## 7. Décision et prochaines actions

### Décision demandée (G4) — une des trois

| Option | Conséquence |
|---|---|
| **A. Réception avec réserves** | Accepter explicitement les P1 listés §5 et l'écart B08 ; le prototype est « reçu comme document de conception », pas comme prototype testé |
| **B. Ajournement** | Produire les éléments manquants avant réception : Figma (G3) et/ou prototype cliquable (G6) et/ou essais réels |
| **C. Arbitrage de lot** | Décider E09 + les 5 écrans différés, puis compléter le lot |

### Prochaine action recommandée (une seule, sans engagement)

**Trancher la porte G4** sur la base de ce bilan, en parallèle de l'arbitrage G1 restant (E09 et A01/A05/A06/A07/A09). Tant que G4 n'est pas prononcée, l'état reste `EN_ATTENTE_HUMAIN` et **aucune intégration de code** ne doit être lancée : celle-ci exige un mandat distinct (G6).

---

## 8. Registre de réception (à compléter par le décideur)

```
Version prototype : maquette-v1 (16 écrans, 60 états, direction A)
Lot / écrans      : D-007 — E01-E08, E10-E13, A02, A03, A04, A08
Examinateurs      : ................ (humain requis)
B01-B10           : 5 satisfaits · 2 avec réserves · 1 partiel · 2 non satisfaits
Réserves acceptées: ................
Décision          : accepté / ajourné   (non prononcée à ce jour)
Prochaine étape   : ................
```
