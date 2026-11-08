# PH01 — COMPRÉHENSION, SOURCES ET ÉCARTS

**Phase :** PH01 · **Statut :** TERMINÉ pour l'analyse (périmètre non arbitré → G1 ouverte)
**Horodatage :** 2026-11-08T17:35Z (UTC) · **Références :** cahier V3.0 `25c1e051…f1cf`, système @ `a80a478`, DRI `dri/` 13 fichiers
**Nature du document :** analyse. Aucune exigence n'y est créée, aucune décision humaine n'y est simulée.

---

## 1. Ce que le cahier V3 exige réellement (constat de lecture)

Lecture intégrale des 14 pages. Les exigences ci-dessous renvoient à des passages identifiables ; la formulation est condensée, pas paraphrasée en droit.

| Domaine | Exigence V3 | Réf. |
|---|---|---|
| Périmètre | **Une** organisation, **une** application web interne intégrable ; banc synthétique d'abord. Multi-organisation, SaaS multi-tenant, haute disponibilité, hors ligne : **hors première tranche** | §5.1, §4.4 |
| Qualification | Inventorier points d'accès, propriétaires, responsabilités **avant** activation ; un chemin direct non maîtrisé **interdit** de déclarer la cible protégée | REQ-13-01 |
| Mandat | Toute action de gestion d'accès demandée **et approuvée** par rôles mandatés ; sans mandat : refus ou attente | REQ-13-02 |
| Identité | Rapprochement par identifiant stable + preuve adaptée ; correspondance ambiguë ou fondée sur l'e-mail seul → **suspendre et escalader** | REQ-13-03 |
| Enrôlement | Activation après autorisation et vérification du destinataire ; invitation expirée, rejouée, non autorisée → **aucune activation** | REQ-13-04 |
| MFA | **WebAuthn résistante au phishing** pour privilèges et actions sensibles ; OTP seul ou facteur absent → **refus**, sans dégradation silencieuse | REQ-13-05, §4.3 |
| Preuve fraîche | Réauthentification forte **et fraîche** ; un rafraîchissement silencieux n'est **pas** une nouvelle preuve | REQ-13-20 |
| Récupération | Preuve **indépendante** + **double contrôle** par deux personnes distinctes avant tout nouvel authentificateur | REQ-13-08, §4.3 |
| Retrait | Nouvelle connexion refusée immédiatement ; refus **mesuré par cible** ; cible non observée = **INCONNU**, jamais succès global | REQ-13-11/12/13, §11.2 |
| Session | Session serveur, cookies protégés, rotation d'identifiant, CSRF ; déconnexion **précise**, sans promesse globale | REQ-13-18/19 |
| Panne | Contrôle indisponible → action sensible **refusée** ; la MFA **n'est jamais** désactivée globalement | REQ-13-21, §4.3 |
| Droits | Contrôle **côté ressource**, à chaque requête | REQ-13-14 |
| Jetons | Liés à l'audience, conservés **côté serveur** (BFF) ; mauvaise audience → refus | REQ-13-36 |
| Journal | Acteur, événement, cible, horodatage, résultat, **sans secret** ; accès restreint | REQ-13-22/23 |
| Accessibilité | Parcours en **français**, aide humaine, méthodes accessibles **sans abaisser les contrôles** ; WCAG 2.2 dont 3.3.8 ; aucune information résiduelle sur poste partagé | REQ-13-30/31, §11.4 |
| Sortie | Export sous mandat, réenrôlement des facteurs non transférables (clés privées WebAuthn non exportables) | REQ-13-32/33 |
| Preuves | Test-first, 36 exigences ↔ scénarios T13, résultats consignés avec version/environnement ; états succès/**échec**/**inconnu** distingués | §8, §11 |
| Interdits | Ne jamais affaiblir un test pour obtenir un succès ; aucun seuil/SLA/RTO/RPO inventé ; aucune donnée réelle avant qualification | §8.2, §11 |

**Conséquence pour la conception :** plusieurs exigences V3 **ne sont pas maquettables** (contrôle côté ressource, validation de jetons, rotation de session, restauration, journalisation serveur). Une maquette peut seulement **montrer l'intention et les états** ; elle ne démontre rien de leur exécution. Cette limite sera rappelée dans chaque livrable (B-007).

---

## 2. Faits, propositions et inconnues — séparation stricte

| Catégorie | Contenu | Statut |
|---|---|---|
| **Exigence (V3)** | 13 modules M01–M13, 36 exigences REQ-13-01…36, 12 sprints, critères §11, stack retenue §6 | **Fait documentaire** (empreinte vérifiée) |
| **Proposition (système de prompts)** | Inventaire E01–E13 + A01–A09, direction visuelle 3 pistes, critères B01–B10, parcours indicatifs | **Proposition** — l'inventaire l'écrit lui-même : « non écrans approuvés » |
| **Proposition historique (P14, 28-10-2026, PROPOSED)** | Catalogue textuel E01–E13, spécification UX, plan de tests UX | **Proposition historique**, statut `PROPOSED`, antérieure au V3 |
| **Fait de dépôt (observé)** | `app/` = BFF + labo S05 synthétiques, dépendances Express/openid-client/SimpleWebAuthn, **aucune** dépendance React/Vite ; `bench/` = compose + fixtures ; `dri/` 13 fichiers | **Constat vérifié** par lecture, à `main@a80a478` |
| **Résultat déclaré (non rejoué)** | `EM-AUTH-S04-TESTS.txt`, `EM-AUTH-T10-VERT.txt` (1 test, 1 pass), digests d'images du 2026-11-04, verdicts « NOT READY » du 2026-11-04 | **Déclaration** du dépôt, **non reproduite ici** |
| **Inconnu** | Annexe DRI `12*`…`15`, état de `develop`, identité de marque EM Consulting et droits, rôles/capacités exactes, canaux de support, navigateurs/appareils réels, seuils de session, RTO/RPO, SLO, budget, domaines | **INCONNU** — non inventé |

---

## 3. Rôles : ce qui est proposé, ce qui n'est pas attribué

Acteurs mentionnés (proposition, non attribution de droits) :

| Acteur | Intention fonctionnelle proposée | Ce qui reste **non attribué** |
|---|---|---|
| Utilisateur ordinaire | Se connecter selon politique, se déconnecter, demander de l'aide | méthodes réellement autorisées, politique par criticité |
| Utilisateur privilégié | Action sensible avec preuve fraîche | liste des actions sensibles, seuil de fraîcheur |
| Demandeur d'accès | Initier une demande d'enrôlement / de retrait | périmètre exact, formulaire, champs |
| Approbateur (distinct) | Approuver après vérification indépendante | incompatibilité stricte avec le demandeur (proposée par V3, à contractualiser) |
| Support mandaté | Aider **sans** demander de secret et sans créer de voie faible | canal, horaires, procédure, suppléance |
| Administrateur | Administrer comptes, rôles, retraits | séparation des tâches, nombre de personnes |
| Responsable sécurité / exploitation | Journal, panne, reprise, incident | accès au journal, astreinte |

**Aucun de ces rôles n'a de capacité approuvée.** Le V3 exige la séparation demandeur/approbateur (REQ-13-08, §4.3) ; il **ne fixe pas** qui tient chaque rôle dans l'organisation. Cette attribution est une **question G1** obligatoire (brief §5, question 1).

---

## 4. Écarts et contradictions relevés (signalés, non arbitrés)

| # | Écart | Preuve | Conséquence |
|---|---|---|---|
| É-1 | **Dépôt de travail vide** vs système/projet dans `EM-Auth` | `EM-Auth-Maquette` = 1 fichier ; `EM-Auth` = système + DRI + code | G0 / D-001. Aucune production d'écran ne s'appuie sur `EM-Auth-Maquette` comme contenu projet |
| É-2 | **`main` vs `develop`** : le brief décrit `develop` (352 fichiers) ; seul `main` a été examiné (code `app/`, `bench/`, `Blueprint/`) | brief §1 ; arbre `main` observé | L'état du code sur `develop` est **INCONNU** ici. Aucune affirmation sur les fonctions réellement implémentées |
| É-3 | **Pas d'interface React/Vite** malgré V3 §6.1 | `app/package.json` (aucune dépendance React) ; brief §2 | Les écrans sont des **propositions de conception**, pas la description d'une UI existante. Keycloak thémé peut rendre E02–E04 : à arbitrer |
| É-4 | **Dates** : V3 daté 2026-11-01 ; commit du dépôt 2026-11-08 18:09:37 **+01:00** ; horloge de session 2026-11-08T17:2xZ ; le brief signalait déjà une incohérence temporelle (28-10 vs novembre) | métadonnées PDF ; `git log` ; `date -Is` | Aucune chronologie reconstruite. Les dates sont rapportées **telles qu'observées** avec leur fuseau (B-005) |
| É-5 | **`Blueprint/dri`** annoncé par le prompt maître, inexistant ; DRI réelle à `dri/` | `ls -d Blueprint/dri` → absent | Chemin corrigé, source unique confirmée (D-002) |
| É-6 | **Annexes DRI manquantes** (`12-student-plans`, `12a`, `12b`, `13-harnai/*`, `14`, `15`, `catalogue-student.csv`, `catalogue-harnai.csv`, `data/`) | `dri/00-README.md` vs `ls dri/` | Interdiction d'affirmer leur lecture ; aucune recommandation n'en dépendra (B-002) |
| É-7 | **Critère B08 suppose Figma** (« vérifier manuellement les parcours dans Figma ») ; aucun Figma accessible | capacités PH00 | B08 ne pourra pas être satisfait en l'état → **écart de critère** à arbitrer (réserve G4) |
| É-8 | **B07 exige un contraste mesuré** ; aucun navigateur ni outil de mesure installé | capacités PH00 | Mesure possible par calcul déterministe des couleurs (contraste WCAG calculable hors navigateur), mais **rendu réel non vérifié** |
| É-9 | Les anciens prompts imposent des pauses à chaque composant ; le protocole les remplace par les portes G0–G6 | `EXECUTION_PROTOCOL` §3 | Aucune pause artificielle ; seules les portes structurantes arrêtent la production |
| É-10 | Le brief déclare « 42 anciens documents préservés » et un audit antérieur ; non vérifiés ici | `AUDIT_ET_CHANGEMENTS.md` non lu intégralement | Aucune affirmation sur cet audit |

---

## 5. Risques de conception (projetés, non mesurés)

| Risque | Effet si non traité | Traitement maquettable |
|---|---|---|
| Faux succès (retrait, session, action sensible) | Confiance injustifiée, incident réel | États `confirmé / en cours / échec / INCONNU` explicites, portée par cible (E10, E11, E06) |
| Dégoût de l'énumération | Fuite d'existence de comptes | Messages génériques identiques (E02, E07, E08) |
| Complexité WebAuthn incomprise | Abandon utilisateur, perte d'accès | Explications en français + aide sans secret (E04, A08, E07) |
| Panne interprétée comme échec bénin | Action sensible rejouée à l'aveugle | E13 + E11, refus explicite, aucune relance automatique |
| Poste partagé | Session résiduelle | E06 avec portée locale explicite, E12, consignes de verrouillage |
| Accessibilité traitée après coup | Parcours inutilisable → contournement du contrôle | Structures sémantiques, focus, erreurs liées aux champs dès PH04 |
| Dépendance à des écrans natifs non maîtrisés | Promesse impossible | Annoter « fenêtre native simulée » dans E04/A08 ; ne rien promettre sur l'OS |

---

## 6. Matrice besoin → écran (traçabilité V3)

| Besoin V3 | Écrans proposés | Ce que l'écran peut montrer | Ce qu'il **ne peut pas** prouver |
|---|---|---|---|
| REQ-13-03/04 Enrôlement contrôlé | E01, A02, A08 | invitation, mandat, dialogue natif simulé | validité réelle de l'invitation, unicité de l'identité côté serveur |
| REQ-13-05/06/07 MFA, politique, essais massifs | E02, E03, E04 | méthodes autorisées, absence de repli faible | résistance réelle au phishing, limitation réelle des tentatives |
| REQ-13-20 Fraîcheur | E04, E09 | exigence de preuve fraîche | fraîcheur effective côté serveur |
| REQ-13-08/09 Récupération | E07, E08, A03 | indépendance, double contrôle, suivi | preuve réellement indépendante |
| REQ-13-11/12/13 Retrait | A04, E10 | statut par cible, INCONNU | refus réellement observé sur chaque cible |
| REQ-13-18/19/31 Session | E05, E06, E12 | portée locale, expiration | invalidation serveur réelle |
| REQ-13-21 Panne | E13, E11 | refus visible, issue inconnue | indisponibilité réelle du contrôle |
| REQ-13-16/36 Fédération, jetons | E05 | transition, résultat | validation OIDC réelle |
| REQ-13-22/23 Journal | A05 | minimisation, accès restreint | journalisation réelle |
| REQ-13-26/27/28/29 Exploitation | A06 | procédures, état incertain | restauration réelle |
| REQ-13-32/33 Sortie | A07 | mandat, portabilité, réenrôlement | export réel |
| REQ-13-01/17 Qualification | A01 | inventaire des chemins, risque | absence réelle de contournement |
| REQ-13-02/15 Mandat, séparation | A02, A04, E09 | demande/appréciation, rôles | application réelle des rôles |
| REQ-13-10 Urgence | A09 | mandat séparé, surveillance | efficacité réelle en panne |
| REQ-13-30 Accessibilité | tous | intentions, focus, messages | conformité WCAG (aucun audit possible ici) |

---

## 7. État du dépôt confronté aux attentes (audit lecture seule, 04C)

| Attendu par V3 | Observé à `main@a80a478` | Écart |
|---|---|---|
| Interface React 19 / Vite | **Absente** — `app/` est un BFF + labo HTML minimal | É-3 : l'UI cible n'existe pas |
| BFF Node/TypeScript, Express 5, openid-client 6 | `server.mjs` (JS, pas TS) + `lib/{oidc,session,csrf,authz,keycloak,mfa}` | Langage différent (JS vs TS) : à confirmer, non un défaut en soi |
| WebAuthn (SimpleWebAuthn) | dépendances déclarées `@simplewebauthn/{browser,server}` §14.x | présence déclarée ≠ flux fonctionnel prouvé |
| IdP Keycloak 26.x, PostgreSQL 18.x | `bench/compose.yaml` + digests du 2026-11-04 (`26.8.1`, `18.6`) | non démarré ici (aucune installation autorisée) |
| Tests Vitest/Playwright | tests Node (`node --test`) dans `app/tests`, `app/tests-s05` | Vitest/Playwright **non observés** ; 16 fichiers de test existent |
| Contrôle des droits côté ressource | `app/lib/authz.mjs` existe | comportement **non exécuté** ici |
| Journal, sauvegarde, reprise | non observés dans `app/` | **INCONNU** pour la maquette (hors périmètre visuel) |

**Conclusion de l'écart :** la conception graphique ne peut s'appuyer sur aucune interface existante. Toute maquette est **spécification visuelle prospective**, cohérente avec V3 et avec les limites du code réel.

---

## 8. Porte PH01 et questions G1

| Critère de porte | État |
|---|---|
| Références obligatoires lues intégralement | **OUI** (PDF V3 14 p., brief, inventaire, critères B01–B10, sources historiques, direction visuelle) |
| Écarts étayés | **OUI** (É-1…É-10) |
| Registres mis à jour | **OUI** |
| Périmètre arbitré | **NON** — G1 ouverte, cf. `PH01_MATRICE_PERIMETRE_ECRANS.md` §5 |

**Verdict : PH01 TERMINÉ pour l'analyse ; production d'écrans bloquée par G1.**
