# PH03 — DIRECTION VISUELLE ET COMPARAISON A / B / C

**Phase :** PH03 · **Statut :** EN_ATTENTE_HUMAIN (vues produites ; **G2 non tranchée**)
**Horodatage :** 2026-11-08T18:05Z (UTC)
**Prompt appliqué :** `05_SPECIALIZED_PROMPTS/01_DIRECTION_ARTISTIQUE.md` + `03_EXECUTION_WORKFLOW/PH03_FONDATION.md`
**Outil Stitch :** **non disponible** et **non autorisé** → aucun prompt Stitch exécuté, aucun paquet envoyé (G3). Les vues sont produites localement, sans service.

---

## 1. Vues réellement produites (fichiers vérifiés)

| Direction | Écran | Fichier | Taille |
|---|---|---|---|
| A — Clarté institutionnelle | E02 Identification | `02_MAQUETTE_HTML_V1/direction-a/e02-identification.html` | 5 130 o |
| A | A03 Décision de récupération | `02_MAQUETTE_HTML_V1/direction-a/a03-decision-recuperation.html` | 6 670 o |
| B — Console de précision | E02 | `02_MAQUETTE_HTML_V1/direction-b/e02-identification.html` | 5 505 o |
| B | A03 | `02_MAQUETTE_HTML_V1/direction-b/a03-decision-recuperation.html` | 7 050 o |
| C — Accompagnement humain | E02 | `02_MAQUETTE_HTML_V1/direction-c/e02-identification.html` | 5 548 o |
| C | A03 | `02_MAQUETTE_HTML_V1/direction-c/a03-decision-recuperation.html` | 7 423 o |
| Portail de comparaison | — | `02_MAQUETTE_HTML_V1/index.html` | — |
| Feuilles de style | — | `02_MAQUETTE_HTML_V1/assets/{base,dir-a,dir-b,dir-c}.css` | — |
| Générateur (provenance) | — | `02_MAQUETTE_HTML_V1/assets/generer_ph03.py` | — |

**Ce sont de vraies vues HTML/CSS**, pas des descriptions textuelles. Elles s'ouvrent sans serveur, sans réseau, sans dépendance.

**Contrôles effectués (vérifiés, pas déclarés) :**
- structure HTML : 0 balise non fermée, 0 identifiant dupliqué sur les 6 fichiers (analyse syntaxique) ;
- **contenu éditorial identique** entre les trois directions : comparaison caractère par caractère du bloc de contenu, hors éléments de navigation propres à chaque piste → **identique** (1 602 signes pour E02, 2 353 pour A03).

---

## 2. Ce que l'agent n'a **pas** pu faire (à ne pas confondre avec un succès)

| Attendu par PH03 / B01–B10 | État réel |
|---|---|
| « Vues réellement produites **et examinées** » | **produites OUI**, **examinées par l'agent NON** — aucun navigateur dans l'environnement (B-003) |
| Rendu visuel, débordements, alignements | **NON TESTÉ** — aucune capture, aucune mesure de rendu |
| Navigation clavier réelle, focus effectif | **NON TESTÉ** — le CSS définit un `:focus-visible` contrasté, mais rien n'a été parcouru |
| Lecteur d'écran | **NON TESTÉ** — aucune technologie d'assistance disponible |
| Zoom 200 %, reflow, 320 px | **NON TESTÉ** — points d'essai déclarés, non exécutés |
| Fenêtre native WebAuthn (E04/A08) | **NON SIMULÉE** ici (aucun écran E04 en PH03) |
| Contrastes | **CALCULÉS** (formule WCAG 2.x, valeurs ci-dessous), non mesurés à l'écran |

---

## 3. Contrastes réellement calculés

Méthode : luminance relative sRGB et rapport (L1+0,05)/(L2+0,05), calcul déterministe hors navigateur.

| Direction | Paire | Rapport | Seuil texte normal 4,5:1 |
|---|---|---|---|
| A | encre `#102B3F` sur fond `#F6F8FA` | **13,70:1** | conforme |
| A | encre sur surface `#FFFFFF` | **14,59:1** | conforme |
| A | texte secondaire `#4A5A68` sur `#FFFFFF` | **7,11:1** | conforme |
| A | texte secondaire sur fond `#F6F8FA` | **6,68:1** | conforme |
| A | blanc sur accent `#17645E` (bouton) | **6,95:1** | conforme |
| A | anneau de focus `#0B57D0` sur `#FFFFFF` | **6,39:1** | conforme (composant : 3:1 exigé) |
| A | danger `#9A2318` sur `#FFFFFF` | **7,99:1** | conforme |
| B | encre `#1B2430` sur `#FFFFFF` | **15,65:1** | conforme |
| B | encre sur fond `#EEF1F4` | **13,81:1** | conforme |
| B | secondaire `#55606B` sur `#FFFFFF` | **6,42:1** | conforme |
| B | secondaire sur `#EEF1F4` | **5,66:1** | conforme |
| B | blanc sur cuivre `#8A4B24` (bouton) | **6,75:1** | conforme |
| B | focus `#0B57D0` sur `#FFFFFF` | **6,39:1** | conforme |
| C | encre `#1D2430` sur `#FFFFFF` | **15,59:1** | conforme |
| C | encre sur fond `#FBF7F2` | **14,61:1** | conforme |
| C | secondaire `#5A6472` sur `#FFFFFF` | **6,00:1** | conforme |
| C | secondaire sur `#FBF7F2` | **5,62:1** | conforme |
| C | blanc sur navy `#26355B` (bouton) | **12,05:1** | conforme |
| C | blanc sur vert `#2F6E5B` | **6,00:1** | conforme |
| C | danger `#8E2F22` sur `#FFFFFF` | **8,14:1** | conforme |

**Réserves :** les paires « avertissement » (`#7A4A00` sur `#FFF6E5` en A, `#6E4300` sur `#FCF3E2` en B, `#6E4A16` sur `#FBF3E3` en C) et « inconnu » n'ont **pas** été mesurées dans ce lot : à vérifier au lot suivant, et de toute façon au rendu réel. Un contraste calculé ne prouve pas la lisibilité effective (taille, graisse, transparence, anti-aliasing, thème du système).

---

## 4. Comparaison structurée des trois pistes

| Axe | A — Clarté institutionnelle | B — Console de précision | C — Accompagnement humain |
|---|---|---|---|
| Intention | confiance sobre, lisibilité éditoriale | outil de travail dense, repères techniques | pédagogie, étapes visibles, chaleur maîtrisée |
| Hiérarchie | titre fort, filet d'accent en haut de panneau | rail latéral + en-tête de contexte | pastilles d'étapes + titre + illustration |
| Densité | aérée, 1 colonne 560 px | compacte, 2 colonnes 860 px | très aérée, 1 colonne 620 px |
| Typographie | pile système, titres 650 | pile système + chasse fixe pour les identifiants | pile système, titres 620, interligne 1,6 |
| Formes | angles 4 px, ombre très légère | angles 2 px, filet cuivre à gauche | angles 14 px, boutons arrondis |
| Adéquation usager ordinaire | **forte** | moyenne — peut intimider | **forte** |
| Adéquation administration / support | moyenne | **forte** — file de décisions lisible | moyenne — moins dense pour traiter du volume |
| Accessibilité (au vu du CSS) | focus visible, cibles ≥ 44 px, états textuels | focus visible, cibles **38 px** — à réévaluer (2.5.8) | focus visible, cibles 44–48 px, états textuels |
| Risque principal | froideur administrative | lourdeur, surcharge visuelle pour E02 | esthétique grand public peu crédible en administration |
| Effort de déclinaison | faible | moyen (rail, tableaux) | moyen (illustrations à produire) |

**Point de vigilance identifié par l'agent dans sa propre production :** la direction B abaisse la hauteur des cibles interactives à 38 px. C'est **accepté pour une comparaison**, mais **inacceptable pour un lot retenu** au regard du critère 2.5.8 (cible) et de l'usage tactile. À corriger en PH04 si B est retenue.

---

## 5. Recommandation de l'agent — **non décision**

À titre de proposition motivée : **direction A**, pour trois raisons vérifiables dans ce document — (i) elle tient le meilleur compromis entre usager ordinaire et administration, (ii) ses cibles interactives respectent 44 px, (iii) elle nécessite le moins de production supplémentaire.

Second choix : **A comme base + rail contextuel de B** pour les écrans d'administration (A01–A07, E09, E10). Cette hybridation **n'est pas** une piste validée : elle mélange deux systèmes et exige une décision explicite, conformément à la direction (« pas de mélange automatique »).

**Cette recommandation n'est pas la décision G2.** Aucune piste n'est retenue, aucun système graphique définitif n'est établi, aucun token n'est encore promu en référence.

---

## 6. Principes de navigation, responsive et interaction (communs, proposés)

- **Navigation** : un objectif principal par page ; titre descriptif ; lien d'évitement ; retour au contexte après action ; jamais de lancement d'authentification sur simple prise de focus.
- **Responsive** : points d'essai 320 / 360 / 768 / 1440 px — **déclarés comme essais**, non comme points de rupture contractuels. Une seule colonne sous 640 px ; rail B replié en tête sous 760 px. **Aucun essai réel effectué.**
- **Interaction** : aucune animation essentielle ; `prefers-reduced-motion` neutralise transitions et animations ; pas de toast éphémère pour un résultat inconnu ; pas de confirmation sans preuve.
- **Langue** : français ; `lang="fr"` sur chaque document.
- **États** : texte + bordure + libellé explicite ; la couleur n'est jamais le seul véhicule de l'information (étiquettes `Vérifiée / Requis — non fourni / Non confirmé / Échec`).
- **Poste partagé** : pas de préremplissage d'identité, pas de « se souvenir de moi », pas de persistance locale.
- **Ce qu'aucune vue ne contient** : contact, horaire, délai, numéro, SLA, logo client, donnée personnelle réelle, jeton, code, secret.

---

## 7. Porte G2

| Critère de porte | État |
|---|---|
| Vues réellement produites | **OUI** (6 fichiers + portail, contrôlés syntaxiquement) |
| Vues examinées visuellement | **NON** — aucune capacité de rendu ; **examen humain requis** |
| Variantes comparables | **OUI** (mêmes contenus, 3 systèmes) |
| Choix documenté | **AUCUN** — décision humaine attendue (D-010) |
| Limites écrites | **OUI** (§2, §3 réserves, §4 vigilance) |

**Verdict : PH03 EN_ATTENTE_HUMAIN.** La phase ne peut pas être déclarée TERMINÉE avant la décision G2. PH04 (système de design) en dépend directement ; les analyses indépendantes peuvent se poursuivre.
