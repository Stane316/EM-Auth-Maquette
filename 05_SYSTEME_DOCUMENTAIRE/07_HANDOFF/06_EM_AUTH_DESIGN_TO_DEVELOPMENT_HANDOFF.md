# 06 — Handoff design → développement

**Objet :** transmettre un prototype vérifié sans transformer une intention graphique en exigence ou en code de production. Lire [brief et état du dépôt](../01_PROJECT_CONTEXT/01_EM_AUTH_PRODUCT_AND_DESIGN_BRIEF.md), [inventaire](../02_DESIGN_FOUNDATION/03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md) et [agent](../10_TOOL_INITIALIZATION/04C_PROMPT_INITIATION_CODE_AGENTS.md). Aucun travail de code sans accord distinct.

## Paquet à remettre

1. Identifiant du commit audité, empreinte PDF, version des maquettes, date/horloge à vérifier, décisions et personnes ayant validé. Accès en lecture par rôle et conditions de partage.
2. Fichier Figma : pages ordonnées, liens partagés sous autorisation, composants/variantes et frames nommés, parcours et destinations, annotations d'états et limites natives, historique des versions ; captures seulement si partage de fichier impossible et après contrôle des données.
3. Tokens sémantiques : noms, valeurs validées, contrastes mesurés, tailles, typographie/licences, espacement, rayon, bordures, focus, animation et mode réduit ; formater en tableau si variables/export non disponibles dans le plan. Ne pas supposer export DTCG compatible.
4. Matrice ci-dessous et messages français validés ; états vide, chargement, erreur, refus, inconnu, succès prouvé et accessibilité. Captures SVG/PNG si droits confirmés, polices et licences ; éviter données réelles et secrets. Figma inspection/export/Dev Mode dépendent du compte : [inspection](https://help.figma.com/hc/en-us/articles/22012921621015-Guide-to-inspecting).
5. Références DRI évaluées, licences des versions réellement retenues, dépendances, propriétaires des écrans, modèles de menace et tests autorisés ; résultats rapportés distincts de tests rejoués.

## Matrice à compléter — exemple fictif

| ID / état | Acteur / droits | Déclencheur → résultat / preuve | Couche potentielle | Contrat / données | Tests | Statut |
|---|---|---|---|---|---|---|
| E04 / annulé | utilisateur éligible ; à préciser | annulation OS → aucune action sensible ; retour focus | navigateur natif + IdP/BFF, à confirmer | contrat exact à inventorier | clavier + WebAuthn réel et simulé, séparés | proposition |
| E10 / inconnu | rôle habilité, à définir | absence d'observation → INCONNU | UI future + service de retrait, à confirmer | aucune API supposée | panne cible et absence de succès global | proposition |
| E06 / confirmé | session RP | confirmation côté serveur → fin locale seule | BFF/IdP, à confirmer | vérifier implémentation | rejeu cookie/session, autres RP | proposition |

## Séquence d'intégration seulement après autorisation

1. Audit lecture seule, état Git/commit, tests existants, structure UI, dépendances, menaces et compatibilité. Ne jamais remplacer labo S05 sans mandat ; résoudre propriétaire de chaque écran et les limites Keycloak/WebAuthn.
2. Proposer tests négatifs et positifs avant code ; lot réversible ; impact sur composants, routes, sessions, observabilité et CI. Faire approuver périmètre et commande par commande si l'autorisation l'exige.
3. Coder un lot seulement, conserver conventions, respecter TypeScript/React V3 dans le cadre décidé sans forcer une migration aveugle. Mocks étiquetés et non utilisés comme preuve d'intégration. Pas de jetons dans navigateur, logs ou captures ; autorisations côté ressource.
4. Exécuter uniquement tests autorisés, consigner commande, environnement, version, résultat, skip et limites ; tester aussi composants réels et navigateur/authentificateur réel quand accessibles. Vérifier accessibilité réelle et cohérence des états.
5. Faire revue humaine et montrer diff ; aucune PR, aucun push automatique protégé, aucune fusion/rebase/cherry-pick/reset sans autorisation expresse. Aucun déploiement ni transfert sans mandat.

## Mini-contrat de livraison

**Version/commit :** à compléter · **Lot :** … · **Décideur :** … · **Sources :** … · **Écrans/états :** … · **Réel/simulé :** … · **Inconnus :** … · **Tests et preuves :** … · **Écarts :** … · **Autorisation suivante :** …
