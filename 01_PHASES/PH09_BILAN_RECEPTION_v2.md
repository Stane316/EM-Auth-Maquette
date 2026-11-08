# PH09 (révision 2) — BILAN DE RÉCEPTION

**Remplace :** `PH09_BILAN_RECEPTION.md` v1 (conservée comme historique)
**Date :** 2026-11-08 · **Objet évalué :** interface React `03_INTERFACE_REACT` (17 écrans, 71 états)
**Nature de la réception :** interne, **niveau démonstration** (décision D-014). La réception client reste à prononcer par le directeur.

---

## Verdict

> ## **PRÊT POUR UNE DÉMONSTRATION — NON PRÊT POUR UNE RÉCEPTION CLIENT**

Ce n'est pas un demi-verdict. C'est la distinction exacte entre deux choses :

| Question | Réponse |
|---|---|
| Peut-on montrer cette interface au directeur et obtenir une décision ? | **Oui.** 17 écrans navigables, 71 états réels, routage fonctionnel, contrôles automatisés passés. |
| Peut-on déclarer la conformité, l'accessibilité ou la sécurité ? | **Non.** Aucun test navigateur, lecteur d'écran, ni audit WCAG n'a été exécuté. |
| Peut-on intégrer ce code dans le dépôt projet ? | **Non.** Porte G6 non franchie, et l'intégration exige le contrat BFF, qui n'existe pas ici. |

**Ce qui a changé depuis la v1 (qui concluait NON PRÊT) :** le défaut P1 majeur de la v1 — des boutons non déclenchables dans une maquette HTML statique — **est levé**. L'interface est désormais une application réelle avec routage, état par URL et transitions effectives. Deux P1 restent ouverts, aucun P0.

---

## 1. Tableau B01–B10 (réévalué)

| Réf. | Critère (résumé) | Preuve en v2 | État |
|---|---|---|---|
| **B01** | Sources identifiées, V3 prioritaire, décisions structurantes validées | PDF V3 SHA-256 vérifié ; `dri/` restauré et **analysé intégralement** (177 lignes de catalogue) ; D-007/D-010/D-011/D-013→D-017 ; **D-002 (confirmation DRI) reste PROPOSÉ** | **SATISFAIT avec réserve** |
| **B02** | Écrans classés, aucun exclu présenté comme livré, propriétaires non décidés signalés | Registre `donnees/ecrans.ts` : 17 écrans, statut d'arbitrage par écran ; E09 porte un bandeau « arbitrage requis » visible à l'écran ; A01/A05/A06/A07/A09 absents et déclarés absents | **SATISFAIT** |
| **B03** | Pour chaque écran et état : acteur, entrée, action, destination, message documentés | `donnees/etats.ts` : **71 états**, chacun avec libellé, nature (nominal/limite/erreur/système) et **ce qu'il démontre** ; destinations réelles par liens et routes ; audit vérifie 71 états / 17 écrans, clés uniques | **SATISFAIT avec réserve** (les tables de transition complètes écran→écran ne sont pas formalisées au-delà de PH06) |
| **B04** | Aucune validation sensible par simple clic ; preuve forte bloquante ; récupération indépendante à deux acteurs | E04 exige une preuve (fenêtre simulée étiquetée) ; E10 exige case de conscience **et** preuve fraîche ; A03 bloque l'auto-approbation avec explication ; E08/A03 imposent deux acteurs distincts | **SATISFAIT avec réserve** (la fenêtre native est simulée, et l'étiquette le dit) |
| **B05** | Retrait mesuré par cible ; non observé = INCONNU ; ni succès ni déconnexion prétendus | E10 : 5 cibles, états mesuré / à mesurer / **non observable** ; A04 : bilan partiel assumé, idempotence par cible ; E11 : « non confirmé » comme état propre ; E06 sépare « déconnecté ici » et « non confirmé ailleurs » | **SATISFAIT** |
| **B06** | Aucune donnée réelle, jeton, code ou secret ; licences et sources | Audit : 0 appel réseau, 0 WebAuthn réel ; données 100 % fictives ; **licences déclarées par le DRI mais non vérifiées à la source** | **SATISFAIT avec réserve** |
| **B07** | Labels, focus, messages, pas de couleur seule ; contraste **mesuré** | Contrastes **recalculés par script** (15 paires, seuil 4,5:1) ; `aria-describedby`, `role="alert"`, onglets clavier, dialogue natif, focus géré au changement de route ; **aucun test navigateur / lecteur d'écran / zoom** | **PARTIEL** |
| **B08** | Vérification manuelle dans Figma | Aucun Figma disponible (B-008) | **NON APPLICABLE JUSTIFIÉ** — substitué par la galerie `/systeme` et le test de rendu automatisé |
| **B09** | Handoff complet, absence de P0 et de P1 non accepté | Handoff livré (`PH08_HANDOFF_TECHNIQUE.md`, `04_HANDOFF/`) ; **P0 = 0** ; **2 P1 ouverts et assumés** (accessibilité non testée, E09 à arbitrer) | **PARTIEL** |
| **B10** | Aucune revendication de conformité, sécurité ou disponibilité | Bandeau « maquette — données fictives » permanent ; rail « ce que cette maquette ne prouve pas » sur **chaque** écran ; mentions explicites en E11, E13, A04 | **SATISFAIT** |

**Décompte :** 3 satisfaits · 4 satisfaits avec réserve · 2 partiels · 1 non applicable justifié · **0 non satisfait**.

---

## 2. Écrans réalisés / incomplets / différés

| Catégorie | Écrans | Détail |
|---|---|---|
| **Réalisés et démontrables** | E01–E08, E10–E13, A02, A03, A04, A08 (**16**) | chacun avec 3 à 5 états réels, adressables par URL |
| **Réalisé mais en attente d'arbitrage** | **E09** (1) | rôles demandeur / approbateur non arbitrés (D-008) ; présenté avec bandeau explicite |
| **Différés, déclarés absents** | A01, A05, A06, A07, A09 (5) | hors lot D-007 ; rien n'est simulé à leur place |

**Total : 17 écrans, 71 états.** Le calcul est vérifié par script (`npm run audit`), pas déclaré.

---

## 3. Contrôles réellement exécutés (avec leurs sorties)

| Contrôle | Commande | Résultat |
|---|---|---|
| Typage strict | `npm run verifier` | **0 erreur** |
| Contrastes recalculés | `npm run audit` | **15/15 paires conformes** |
| Correspondance écrans ↔ composants | `npm run audit` | **17 / 17** |
| Catalogue des états | `npm run audit` | **71 états, clés uniques, 0 orphelin** |
| Destinations de navigation | `npm run audit` | **13 destinations, toutes résolues** |
| Absence d'appel réseau | `npm run audit` | **0 appel, 0 WebAuthn** |
| Couleurs hors jetons | `npm run audit` | **0** |
| Rendu de 29 routes | `npm run rendu` | **29/29 sans erreur JS** |
| Build de production | `npm run build` | **452 kB (133 kB gzip)** |

**Total : 6/6 contrôles d'audit, 29/29 routes rendues.**

---

## 4. Ce qui n'a **pas** été testé — et ne sera pas présenté comme testé

- rendu visuel réel (aucun navigateur dans l'environnement d'exécution) ;
- navigation clavier effective, piège de focus, ordre de tabulation ;
- lecteur d'écran (NVDA, VoiceOver, TalkBack) ;
- zoom 200 %, reflow à 320 px ;
- **axe-core** (paquet non installé) et **Lighthouse** ;
- WebAuthn réel (aucune API invoquée, par construction) ;
- tests de sécurité, de charge, de performance ;
- comportement sur navigateurs réels (Safari, Firefox, Chrome, mobiles).

> **Conséquence directe :** les critères WCAG 2.2 du cahier V3, dont 3.3.8, ne sont **pas démontrés**. Le code est écrit pour les respecter ; personne ne l'a prouvé.

---

## 5. Problèmes ouverts

| ID | Sévérité | Objet | État |
|---|---|---|---|
| UX-1 | ~~P1~~ | Boutons non déclenchables (maquette HTML statique) | **LEVÉ** — routage et états réels |
| UX-3 | **P1** | Accessibilité non mesurée (navigateur, clavier, lecteur d'écran, zoom) | ouvert, assumé |
| G1-E09 | **P1** | Arbitrage des rôles demandeur / approbateur | ouvert |
| JUR-1 | **P2** | Licences déclarées par le DRI, non vérifiées à la source | ouvert |
| FN-2 | **P2** | Exigences V3 non illustrées (celles des écrans différés) | ouvert, périmètre connu |
| B-008 | — | Figma indisponible | NON APPLICABLE justifié |

**Aucun P0.**

---

## 6. Décision de réception (proposée, à contrer si désaccord)

| Élément | Proposition |
|---|---|
| **G4 interne** | **PRONONCÉE au niveau « démonstration »** (D-014) |
| **G4 client** | **NON PRONONCÉE** — réservée au directeur, après démonstration |
| **G6 (intégration)** | **NON FRANCHIE** — aucune écriture dans le dépôt projet |
| Prochaine action recommandée | 1. Démonstration au directeur. 2. Arbitrage E09. 3. Tests navigateur et axe-core. 4. Décision sur les propriétaires de rendu réels. |

---

## 7. Registre de réception

```
Projet            : EM AUTH — maquette de démonstration (v2, interface React)
Date d'évaluation : 2026-11-08 (UTC)
Évaluateur        : agent d'orchestration (réception interne)
B01-B10           : 3 satisfaits · 4 avec réserves · 2 partiels · 1 non applicable · 0 non satisfait
P0                : 0
P1                : 2 (UX-3 accessibilité, G1-E09 arbitrage)
Verdict           : PRÊT POUR DÉMONSTRATION / NON PRÊT POUR RÉCEPTION CLIENT
Décision client   : ☐ acceptée   ☐ acceptée avec réserves   ☐ ajournée
Par               : ______________________   Le : ____ / ____ / ________
```
