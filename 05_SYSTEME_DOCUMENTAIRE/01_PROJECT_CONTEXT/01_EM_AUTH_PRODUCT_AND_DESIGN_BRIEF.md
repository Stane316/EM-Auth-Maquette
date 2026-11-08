# 01 — EM Auth : audit des sources et brief produit/design

**Statut :** base documentaire de conception, pas validation d'une maquette ni autorisation de développement. **Référence :** [PDF officiel V3](CAHIER_DES_CHARGES_OFFICIEL_EM_Auth_DEPLOY.pdf), approuvé selon l'utilisateur, SHA-256 `25c1e0513c80461e5855ae50c7dd08733ce45bcb684604bd39b9fc8eb931f1cf`. Les écrans et moyens d'interface constituent des propositions, sauf exigences explicitement attribuées au PDF.

## 1. Sources examinées et niveau d'autorité

| Source | Constat / statut |
|---|---|
| PDF officiel V3 p. 1, 4–13 et notice | Référence active : une organisation et une application web interne intégrable ; 13 modules, 36 REQ et 12 sprints. Ne pas modifier. |
| [P14 catalogue E01–E13](SOURCES_HISTORIQUES/SCREEN_CATALOG.txt), [UX](SOURCES_HISTORIQUES/UX_SPECIFICATION.txt), [tests UX](SOURCES_HISTORIQUES/UX_ACCESSIBILITY_TEST_PLAN.txt) | Catalogue textuel historique proposé, source principale des 13 parcours-écrans. Aucun prototype ni adoption de chaque écran n'est démontré. |
| [Architecture et flux](SOURCES_HISTORIQUES/03-ARCHITECTURE-ET-FLUX.txt), `EM-AUTH/06-ARCHITECTURE/` et P13 | Rôles, contrats, risques et propositions à relire sous priorité V3. |
| [Préparation de développement](SOURCES_HISTORIQUES/PREPARATION-README.txt) | Audit et recommandations historiques ; son état NOT READY ne doit pas masquer un travail ultérieur présent sur le dépôt. |
| Dépôt utilisateur [`Stane316/EM-Auth`](https://github.com/Stane316/EM-Auth), branche `develop` | Lecture distante seule du contenu public accessible, à l'instant de l'audit ; arbre `d7864e247185596ce7faa8c94f5f4409d10fe78b`, 352 fichiers, arbre non tronqué. Aucun clone, test, modification ou accès à l'environnement local de l'utilisateur. Réévaluer le commit avant tout travail. |
| Branche `main` | Arbre `219b91a1144187fe805148507ae6321127bc6e03`, 196 fichiers tous `Blueprint` ; comparaison de 196 fichiers communs : SHA Git identiques ; 156 fichiers supplémentaires sur `develop`. C'est une comparaison de ces deux instantanés, pas l'historique complet. |
| [`Blueprint/dri`](https://github.com/Stane316/EM-Auth/tree/develop/Blueprint/dri) | 12 fichiers Markdown `00`–`11` et `catalogue-dri.csv` disponibles et inventoriés, avec lecture ciblée ; DRI accessible sous forme de dossier, pas d'archive ZIP nécessaire ici. Certains fichiers/annexes cités par son README, notamment `12-*`, HarnAI et `data/`, ne figurent pas dans cet arbre : disponibilité INCONNUE. |
| Contrôle temporel | La date du système de cette conversation (28 octobre 2026) est antérieure aux dates inscrites dans la V3 et certains documents/commits visibles, notamment novembre 2026. Ces dates sont **rapportées telles qu'observées**, sans conclure à leur chronologie réelle ; clarifier la référence temporelle avant décision fondée sur la date. La priorité V3 repose sur l'instruction utilisateur, non sur une date déduite. |

**Limite de profondeur :** inventaire de l'arbre complet, lecture ciblée des documents produit/UX/architecture, 13 fichiers DRI inventoriés et extraits sélectionnés, du code et de rapports de sprint ; ce n'est pas une revue ligne par ligne des 352 fichiers ni une vérification indépendante de chaque test, licence ou source DRI. Les observations de dépôt ne sont pas une validation d'exécution.

## 2. État actuel observé dans `develop`

- `app/server.mjs` contient une page HTML de laboratoire minimale, un BFF OIDC et une ressource fictive ; `app/lab/s05-lab.mjs` fournit un laboratoire MFA. Cela **ne prouve pas** l'existence d'une interface React/Vite ou d'un design system. Le `package.json` lu déclare Express, openid-client et SimpleWebAuthn ; aucune dépendance React/Vite n'y est déclarée. V3 retient React 19/Vite pour l'interface future : ne pas remplacer ni réécrire automatiquement le labo existant.
- Le README d'application rapporte S04.4 exécuté ; le [bilan S05.5](https://github.com/Stane316/EM-Auth/blob/develop/Blueprint/Sprints/Sprint-05/Livrables/S05-5-BILAN-RELAIS-S06.md) rapporte une réalisation/essais partiels S05 et des preuves encore manquantes : navigateur/authentificateur, séparation de deux humains, accessibilité ; S05 n'est pas déclaré clos et S06 n'est pas lancé dans ce bilan. Ce sont des **résultats rapportés par le dépôt**, non tests rejoués ici, susceptibles d'avoir évolué.
- Le README contient des instructions de merge/push ; la contrainte utilisateur permanente actuelle est plus restrictive : aucune PR, aucun merge/rebase/reset sans autorisation explicite, aucun push automatique vers branche protégée. Ne pas appliquer d'anciens workflows en conflit.
- Keycloak peut produire ses propres écrans de connexion et le labo expose d'autres pages. Les maquettes devront préciser **qui rend chaque écran** : thème Keycloak, navigateur/OS WebAuthn, BFF ou future interface React, selon faisabilité et mandat ; ne pas promettre une refonte libre de la fenêtre native.

## 3. Produit, utilisateurs et besoins

**Exigence V3 :** sécuriser l'accès à une application web interne en accompagnant qualification des accès, enrôlement, authentification, récupération, retrait, audit et reprise. Une organisation / une application dans la première tranche, banc synthétique d'abord. **Utilisateurs et rôles fonctionnels à détailler avec responsables :** utilisateur ordinaire ; utilisateur privilégié ; demandeur/gestionnaire d'accès ; approbateur distinct ; support ; administrateur et responsable de sécurité/exploitation. Les capacités exactes par rôle ne sont pas définitivement attribuées ici.

**Parcours structurants :** qualification → invitation/enrôlement autorisés → connexion selon politique → action sensible avec preuve forte et fraîche → perte/récupération vérifiée par voie indépendante et double contrôle → retrait mesuré par cible → audit, soutien et reprise. Séparer identité et autorisation métier ; l'application cible reste responsable de ses droits par ressource.

**Sécurité :** WebAuthn résistante au phishing pour privilèges et actions sensibles, sans repli MFA silencieux ; récupération indépendante avec deux personnes distinctes ; refus si contrôle nécessaire indisponible ; aucune preuve de sécurité par simple affichage. Sessions côté serveur, pas de jetons/secrets affichés, fin de session limitée à la portée confirmée ; retrait par cible confirmé/en cours/échec/inconnu, jamais succès global sans observation de toutes les cibles incluses. Éviter l'énumération des comptes et ne jamais demander de PIN ou de codes à l'assistance.

**Accessibilité et contexte :** interface française, clavier, lecteur d'écran, focus visible et état compréhensible sans couleur seule, principe WCAG 2.2 dont 3.3.8 et essais ; mobilité/équipement partagé et réseau parfois contraint à tester, sans extrapoler à un client précis. Prévoir contenu réactif sans inventer de métriques de performance, seuils ou appareils validés. Les animations doivent être discrètes et respecter la réduction de mouvement.

**Exclusions V3 :** multi-tenant, SAML, SCIM, haute disponibilité, hors ligne, facturation automatisée, intégration universelle ; pas d'agent DLP ni ML. Aucun client, budget, SLA, disponibilité ou conformité certifiée ne doit être inventé. Pas d'inscription ouverte, reset automatique, centre de notifications, inventaire d'appareils ou dashboard marketing s'ils ne sont pas justifiés ; les nommer propositions soumises à arbitrage.

## 4. Choix de stack, preuves et confidentialité

V3 retient Keycloak 26.x/PostgreSQL 18.x, BFF Node 24/TypeScript/Express 5/openid-client 6, interface React 19/Vite, Nginx et HTTPS, Vitest/Playwright : versions correctives, licences et compatibilité à vérifier au moment d'usage. `develop` montre un labo JS/Express et des modules, pas encore la future interface. Éviter de forcer Tailwind, shadcn, un autre IdP ou une nouvelle bibliothèque depuis une maquette. Toute maquette est fictive, sans logos clients réels, noms réels, secrets, jetons, photos ou capture d'un environnement réel sans autorisation.

## 5. Questions ouvertes à valider

1. Quelles actions et informations précises sont autorisées pour chaque rôle, notamment demandeur, approbateur, support et administrateur ?
2. Quelles fonctions d'administration minimale disposeront d'un écran propre EM Auth, d'un écran Keycloak thémé ou d'une procédure externe ?
3. L'identité de marque EM Consulting existante, le logo, les couleurs et polices sont-ils disponibles avec droits d'utilisation ? Une direction proposée n'est pas une identité validée.
4. Quels écrans sont publics (au sens non authentifiés), privés et éventuellement indexables ? Aucune page marketing ou création libre de compte n'est acquise.
5. Quels navigateurs, tailles, facteurs et appareils réels sont accessibles ; quels canaux d'aide et politiques de session ont été approuvés ? Ne pas inventer numéro, SLA ou canal.
6. Peut-on transmettre les extraits autorisés à Stitch/Figma et sous quelles conditions de confidentialité, compte et droits ? Aucun secret ou donnée réelle.

Ces questions bloquent la **validation finale** des parcours concernés, pas la production de pistes visuelles fictives et clairement étiquetées.
