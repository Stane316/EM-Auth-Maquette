# PH01 — MATRICE DE PÉRIMÈTRE DES ÉCRANS (E01–E13, A01–A09)

**Rôle de ce document :** classer les 22 écrans **proposés** avant toute production.
**Aucun écran n'est `RETENU` à ce stade** : tous sont `À_ARBITRER`, décision humaine G1 requise.
Colonnes « propriétaire pressenti » = **hypothèse technique de conception**, pas une architecture décidée.

---

## 1. Matrice synoptique

| ID | Écran proposé | Acteur principal | Propriétaire technique pressenti (hypothèse) | Traçabilité V3 | Complexité de maquette | Statut |
|---|---|---|---|---|---|---|
| E01 | Invitation et accueil | destinataire invité | Thème Keycloak (page publique) ou page BFF | M02 · REQ-13-03/04 | moyenne | À_ARBITRER |
| E02 | Identification | utilisateur | Thème Keycloak (login) | M03 · REQ-13-06/07 | faible | À_ARBITRER |
| E03 | Choix du moyen autorisé | utilisateur | Thème Keycloak ou page BFF | M03 · REQ-13-05/06 | moyenne | À_ARBITRER |
| E04 | Défi et preuve fraîche | utilisateur | **Fenêtre native navigateur/OS** + page d'attente (non maîtrisée) | M03/M08 · REQ-13-05/20 | moyenne (simulation à étiqueter) | À_ARBITRER |
| E05 | Transition vers application | système + utilisateur | BFF / redirection OIDC (peu d'UI) | M07 · REQ-13-16/36 | faible | À_ARBITRER |
| E06 | Fin de session | utilisateur | Thème Keycloak (logout) ou page BFF | M08/M12 · REQ-13-19/31 | faible | À_ARBITRER |
| E07 | Perte ou aide | utilisateur | Page BFF / portail futé | M04/M12 · REQ-13-08/09/30 | moyenne | À_ARBITRER |
| E08 | Suivi de récupération | utilisateur + support | Interface EM Auth (React) | M04 · REQ-13-08/09 | élevée | À_ARBITRER |
| E09 | Demande ou approbation sensible | demandeur / approbateur | Interface EM Auth (React) | M01/M06/M08 · REQ-13-02/15/20 | élevée | À_ARBITRER |
| E10 | Retrait par cible | administrateur / responsable | Interface EM Auth (React) | M05 · REQ-13-11/12/13 | élevée | À_ARBITRER |
| E11 | Résultat non confirmé | tous (transversal) | Composant partagé BFF/UI | M05/M08 · REQ-13-12/21 | faible | À_ARBITRER |
| E12 | Expiration et inactivité | utilisateur | Composant partagé BFF/UI | M08/M12 · REQ-13-18/20/31 | faible | À_ARBITRER |
| E13 | Service indisponible | tous (transversal) | Composant partagé (proxy/BFF) | M08/M11 · REQ-13-21/28 | faible | À_ARBITRER |
| A01 | Qualification de l'application | propriétaire d'application | Interface EM Auth (React) | M01/M07 · REQ-13-01/17 | moyenne | À_ARBITRER |
| A02 | Identité et mandat d'enrôlement | gestionnaire d'accès | Interface EM Auth (React) | M01/M02 · REQ-13-02/03/04 | élevée | À_ARBITRER |
| A03 | Décision de récupération | support + 2ᵉ acteur | Interface EM Auth (React) | M04 · REQ-13-08/09 | élevée | À_ARBITRER |
| A04 | Orchestration du retrait | responsable / admin | Interface EM Auth (React) | M05 · REQ-13-11/12/13 | élevée | À_ARBITRER |
| A05 | Journal d'audit minimal | responsable sécurité | Interface EM Auth ou outil existant | M09 · REQ-13-22/23/35 | moyenne | À_ARBITRER |
| A06 | Exploitation et reprise | opérateur / suppléant | Procédure + outil existant (documentaire) | M11 · REQ-13-26/27/28/29 | faible (souvent non-écran) | À_ARBITRER |
| A07 | Sortie et portabilité | responsable données / admin | Procédure + interface | M13 · REQ-13-32/33 | moyenne | À_ARBITRER |
| A08 | Enrôlement du facteur | utilisateur + opérateur | **Dialogue natif** + page de préparation EM Auth | M02/M03 · REQ-13-04/05 | moyenne (simulation à étiqueter) | À_ARBITRER |
| A09 | Gestion d'urgence | responsable sécurité | Procédure + interface sous mandat séparé | M04 · REQ-13-10 | élevée | À_ARBITRER |

**Contrôle de complétude :** 13 E + 9 A = **22**. Aucun écran supplémentaire n'est proposé par l'agent sans décision.

---

## 2. Points d'attention par écran (avant arbitrage)

| ID | Question structurante à trancher |
|---|---|
| E01 | L'invitation est-elle un lien à usage unique (donc un écran public) ou une action initiée depuis l'application ? Le canal d'envoi n'est pas choisi. |
| E02 | Identification **avant** révélation des moyens : contrainte anti-énumération. Le champ identifiant est-il obligatoire ou la découverte de compte est-elle déléguée à Keycloak ? |
| E03 | La liste des moyens ne doit apparaître qu'après identification suffisante. Quelles méthodes sont réellement autorisées par la politique ? **Inconnu V3** (probablement WebAuthn + secours selon rôle). |
| E04 | La fenêtre WebAuthn est **rendue par le navigateur/OS** : la maquette ne peut que **simuler** et doit l'étiqueter. Aucun contrôle de son accessibilité n'est acquis. |
| E05 | Écran très pauvre en UI : surtout des états de redirection. Risque de sur-design inutile. |
| E06 | La portée (« cette application seulement ») doit être dite sans promettre une déconnexion globale. |
| E07 | Aucun contact, horaire ou délai ne doit être inventé : les coordonnées restent `[à renseigner après contrat]`. |
| E08 | Suivi accessible **uniquement** après autorisation : un état public de suivi créerait une fuite. |
| E09 | Séparation demandeur/approbateur : l'écran doit-il représenter deux identités distinctes ? Oui selon V3 ; les personnes sont fictives. |
| E10 | Le cœur du critère B05 : statut **par cible**, INCONNU explicite, jamais de « supprimé partout ». |
| E11 | Transversal : doit apparaître comme un état, pas comme un écran isolé. |
| E12 | Durées à ne pas inventer : formulation sans chiffre, ou chiffre marqué `[seuil à convenir]`. |
| E13 | Ne pas transformer une panne en « erreur 500 » technique ; message utilisable + assistance. |
| A01 | Inventaire des chemins : formulaire dense, probablement hors MVP visuel si procédure externe retenue. |
| A02 | Cœur de la conformité « mandat » : qui demande, qui autorise, quel justificatif ? |
| A03 | Double contrôle : doit montrer **deux acteurs distincts** et l'impossibilité d'auto-approbation. |
| A04 | Orchestration : dangereuse si l'UI laisse croire à un succès global. |
| A05 | Journal minimisé : aucun secret, aucun jeton, aucun code. Accès restreint. |
| A06 | Souvent **procédure documentaire** plutôt qu'écran : à trancher, sinon on invente une console d'exploitation. |
| A07 | Export sous mandat + réenrôlement des facteurs non transférables (clés privées non exportables). |
| A08 | Dialogue natif simulé, étiqueté ; aucune promesse sur biométrie. |
| A09 | Urgence : mandat séparé, surveillance, indépendance. Écran à haut risque d'abus s'il est mal conçu. |

---

## 3. Trois options de lot soumises à l'arbitrage G1

Le lot détermine ce qui sera réellement produit en PH05. Les options sont **cumulatives en couverture**, non en effort.

### Option 1 — « Démonstration minimale » (7 écrans)
`E02, E03, E04, E07, E11, E13, A08`
Couvre le cœur « se connecter + preuve forte + aide + états inconnus ». Tout le reste classé `DIFFÉRÉ`.
*Avantage :* production rapide, cohérence forte. *Limite :* ne démontre ni retrait, ni récupération, ni mandat — c'est-à-dire trois exigences majeures du V3.

### Option 2 — « Parcours de bout en bout utilisateur + états » (13 écrans) — **recommandée**
`E01, E02, E03, E04, E05, E06, E07, E08, E11, E12, E13, A02, A08`
Couvre qualification→invitation→accès→perte→session→panne côté utilisateur, plus le mandat d'enrôlement.
*Avantage :* couvre l'expérience complète et les états critiques (B03, B05, B07). *Limite :* l'administration du retrait (E10/A04) et l'urgence (A09) restent hors lot → critère B05 non démontré.

### Option 3 — « Couverture complète » (22 écrans)
Tous les écrans, administration incluse (A01–A07, A09, E09, E10).
*Avantage :* couverture maximale, répond à B05 et à la matrice complète. *Limite :* effort élevé, risque de qualité inégale, plusieurs écrans `conditionnel` selon l'inventaire, et des procédures (A06) qui ne sont pas des écrans.

### Option 4 — « Cœur + retrait » (16 écrans) — **compromis retenu (D-007)**
`E01–E08, E10, E11, E12, E13, A02, A03, A04, A08`
Ajoute à l'option 2 le **retrait mesuré par cible** (E10/A04/A03), qui porte le critère B05, et laisse hors lot `E09, A01, A05, A06, A07, A09`.

> **Correctif du 2026-11-08 (transparence)** : cette option a d'abord été annoncée « 17 écrans ». Son énumération réelle en contient **16** : `E01–E08` (8) + `E10–E13` (4) + `A02, A03, A04, A08` (4). E09 n'était pas inclus et n'a jamais été inclus. L'utilisateur a retenu cette option lors de la porte G1 en lecture du libellé « 17 » ; le lot effectivement produit est donc de **16 écrans**, et E09 reste `À_ARBITRER`. Aucun écran supplémentaire n'a été ajouté pour atteindre un chiffre.
*Avantage :* couvre les exigences les plus sensibles et démontrables visuellement. *Limite :* journal, sortie et urgence restent `DIFFÉRÉ` avec justification.

---

## 4. Rôles et propriétaires — questions à trancher avec le lot

| # | Question | Pourquoi elle bloque |
|---|---|---|
| Q1 | Les **capacités par rôle** (demandeur, approbateur, support, admin, responsable sécurité) sont-elles celles proposées §3 de `PH01_COMPREHENSION_ET_ECARTS.md`, ou faut-il une autre répartition ? | Sans elle, E09/A02/A03/A04/A09 reposeraient sur des droits inventés |
| Q2 | **Qui rend chaque écran** : thème Keycloak, page BFF, interface React future, fenêtre native, ou procédure externe ? | B02 exige que les propriétaires non décidés soient marqués à arbitrer ; une maquette React de E02 contredirait un choix Keycloak |
| Q3 | A06 doit-il être un **écran** ou une **procédure documentaire** ? A05 doit-il réutiliser un outil existant ? | Éviter d'inventer une console d'exploitation |
| Q4 | Les écrans doivent-ils montrer **des variantes par rôle** (même écran, contenu différent) ou un seul profil ? | Double le volume produit |
| Q5 | Faut-il produire **les 4 états** (confiance/attente/refus/inconnu) pour chaque écran, ou seulement les états critiques ? | B03 exige tous les états **du lot validé** |

---

## 5. Porte G1

**État : OUVERTE.** Aucun écran ne sera produit avant réponse aux questions Q1–Q5 et choix d'une option de lot (§3).
Les analyses indépendantes (PH02 DRI, PH03 pistes de direction, PH04 tokens) peuvent progresser sans G1 ; la production d'écrans (PH05) ne le peut pas.
