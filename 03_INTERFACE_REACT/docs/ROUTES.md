# Routes de l'interface

Toutes les routes sont définies dans `src/App.tsx` et nommées dans
`src/app/routes.ts`.

| Chemin | Écran | Rôle requis | Nature |
|---|---|---|---|
| `/` | Portail de démonstration | — | Navigation |
| `/parcours` | Parcours de bout en bout | — | **Application** : exécute les appels réels |
| `/ecran/invitation` | E01 | — | Galerie d'états |
| `/ecran/identification` | E02 | — | Galerie d'états + **formulaire branché** |
| `/ecran/moyen-autorise` | E03 | — | Galerie d'états + **facteurs du service** |
| `/ecran/preuve-fraiche` | E04 | — | Galerie d'états |
| `/ecran/transition` | E05 | — | Galerie d'états |
| `/ecran/fin-de-session` | E06 | — | Galerie d'états + **déconnexion réelle** |
| `/ecran/perte-ou-aide` | E07 | — | Galerie d'états |
| `/ecran/suivi-recuperation` | E08 | — | Galerie d'états |
| `/ecran/demande-sensible` | E09 | authentifié | Galerie d'états |
| `/ecran/retrait-par-cible` | E10 | gestionnaire | Galerie d'états |
| `/ecran/resultat-non-confirme` | E11 | authentifié | Galerie d'états |
| `/ecran/expiration` | E12 | — | Galerie d'états |
| `/ecran/indisponibilite` | E13 | — | Galerie d'états |
| `/ecran/mandat-enrolement` | A02 | gestionnaire | Galerie d'états |
| `/ecran/decision-recuperation` | A03 | gestionnaire | Galerie d'états |
| `/ecran/orchestration-retrait` | A04 | gestionnaire | Galerie d'états |
| `/ecran/enrolement-facteur` | A08 | gestionnaire | Galerie d'états |
| `/systeme` | Système de design | — | Documentation vivante |
| `/dossier` | Dossier de démonstration | — | Documentation |
| `*` | Introuvable | — | Erreur |

## Paramètre d'état

Chaque écran de galerie accepte `?etat=<clé>` (voir `src/donnees/etats.ts`, 71
états au total). L'état vit dans l'URL : un écran se partage et se vérifie dans
un état précis.

## Garde d'interface

`src/app/regles.ts` associe un rôle à chaque écran. Les écrans protégés sont
enveloppés par `AccesProtege`, qui affiche :

- « Session requise » si aucune session n'est ouverte ;
- « Accès refusé — rôle insuffisant » si le rôle manque.

**Cette garde n'autorise rien.** Le BFF contrôle chaque requête ; l'écran
l'indique explicitement.
