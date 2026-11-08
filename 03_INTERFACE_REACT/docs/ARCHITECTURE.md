# Architecture — interface EM Auth

## 1. Principe directeur

L'interface ne décide rien en matière de sécurité. Elle **représente** des états,
**appelle** une couche de services typée, et **affiche** ce que le service
répond. Toute autorisation, toute preuve, toute session appartient au serveur.

Deux conséquences structurantes :

1. **Aucun composant d'écran n'importe un service.** Un écran reçoit des données
   et des rappels ; il ne sait pas d'où elles viennent.
2. **La même interface tourne sur deux implémentations** (`demo`, `http`) sans
   modification d'écran. C'est ce qui rend le transfert vers le BFF réel
   possible sans réécriture.

## 2. Couches

```
src/
├── app/                     câblage de l'application
│   ├── providers.tsx        session + notifications
│   ├── regles.ts            rôles requis par écran (garde d'interface)
│   └── routes.ts            chemins déclarés une seule fois
├── config/
│   └── env.ts               variables VITE_*, validées au chargement
├── services/                ⬅ seule couche qui connaît le réseau
│   ├── contracts/
│   │   ├── api.ts           types d'échange (DTO)
│   │   ├── messages.ts      catalogue S05 (29 codes) + messages d'interface
│   │   ├── politique.ts     politique S05 lue depuis le contrat JSON
│   │   ├── s05-messages.json  contrat du projet (source)
│   │   ├── s05-policy.json    politique du projet (source)
│   │   └── users.json         comptes de démonstration
│   ├── ports.ts             interfaces AuthPort / BackofficePort
│   ├── demo/backendDemo.ts  moteur en mémoire, règles du projet appliquées
│   ├── http/client.ts       fetch + CSRF + enveloppe d'erreur
│   ├── http/authHttp.ts     /auth/*, /api/session, /api/csrf
│   ├── http/backofficeHttp.ts  contrats absents → NON_SUPPORTE explicite
│   └── index.ts             sélection par VITE_API_MODE
├── session/
│   ├── SessionProvider.tsx  état de session, fraîcheur de preuve, rôles
│   └── AccesProtege.tsx     garde d'interface (jamais d'autorisation)
├── hooks/
│   └── useSoumission.ts     état d'envoi, anti-double-soumission, erreur
├── components/
│   ├── ui/                  primitives : Bouton, Champ, Carte, Alerte,
│   │                        Pastille, Tableau, Segments, Revele, Notifications
│   └── layout/              CoquilleApp, Navigation, CoquilleEcran,
│                            SceneAuth, EnteteSession, RailEcran, FenetreSimulee
├── features/                17 écrans + Portail, Parcours, Système, Dossier
├── donnees/                 catalogue des écrans et de leurs états, fiction
├── styles/                  tokens.css (source de vérité) + base.css
└── lib/                     utilitaires (cx, useEtatEcran, contrastes)
```

### 2.1 Règle de dépendance

```
features / components  ──▶  hooks  ──▶  services/ports  ──▶  services/contracts
                                                │
                                ┌───────────────┴───────────────┐
                          services/demo                    services/http
```

Aucune flèche ne remonte. `services/http` est le **seul** dossier autorisé à
appeler `fetch` : `scripts/audit.mjs` (contrôle 5) échoue si un appel réseau
apparaît ailleurs.

## 3. Flux d'une action sensible

```
écran (props) ─▶ useSoumission.executer()
                └─▶ services.auth.produirePreuveFraiche()
                     ├─ démo : vérifie le facteur, applique la politique
                     └─ http : POST + en-tête x-csrf-token, cookie HttpOnly
                ◀─ ReponseApi<SessionDto> { ok, donnees | code, message, statut }
     ◀─ état 'succes' | 'echec' + message exact du service
```

Le refus est un **résultat**, pas une exception : il porte un code du catalogue
S05 (`PROOF_STALE`, `OTP_INSUFFICIENT`, `RECOVERY_SELF_APPROVAL`…) que l'écran
affiche tel quel.

## 4. Décisions d'architecture

| Réf. | Décision | Motif | Conséquence |
|---|---|---|---|
| D-018 | Nouvelle couche de services dans `03_INTERFACE_REACT` plutôt qu'une seconde application | Le socle d'écrans v2 (17 écrans, 71 états, design system) reste valable ; le manque était la couche de service et l'interaction | Les écrans v2 sont conservés et branchés progressivement ; aucune duplication d'écrans |
| D-019 | Deux implémentations derrière un même port | Permet de démontrer sans backend, puis de brancher le BFF sans toucher aux écrans | Un contrat non exposé par le BFF doit renvoyer `NON_SUPPORTE`, jamais un faux succès |
| D-020 | Garde de route côté client assumée comme ergonomique | L'autorisation réelle est serveur (`app/lib/authz.mjs`) | L'état « accès refusé » est un écran, pas une redirection silencieuse |

## 5. Ce que cette architecture ne fait pas

- Elle **ne vérifie pas** les identifiants : en mode `http`, la saisie a lieu
  chez Keycloak, et le BFF porte la cérémonie WebAuthn.
- Elle **ne protège pas** les données : aucun jeton n'est stocké en
  `localStorage` (règle ESLint `no-restricted-globals`), la session vit dans un
  cookie HttpOnly inaccessible au JavaScript.
- Elle **ne garantit pas** la révocation : la déconnexion dit « locale
  certaine, distante non confirmée », conformément au message `SESSIONS_NOT_REVOKED`.
