# 02 — Direction visuelle proposée et références

**Statut : proposition à comparer et valider ; aucune charte ou marque n'est supposée approuvée.** Fondement : [brief](../01_PROJECT_CONTEXT/01_EM_AUTH_PRODUCT_AND_DESIGN_BRIEF.md), [écrans](03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md) et PDF V3. Source = principe inspirant, non maquette copiée ni adoption de technologie.

## 1. Positionnement et trois pistes à explorer

EM Auth doit évoquer la **confiance explicable** : un outil de travail calme pour utilisateurs ordinaires, approbateurs et support, qui montre clairement ce qu'il sait et ce qui demeure inconnu. Ne pas représenter la sécurité par une avalanche de cadenas, de cartes KPI fictives, de globes ou d'effets cyber.

| Piste | Concept | Accent chromatique suggéré, à tester | Risque / validation |
|---|---|---|---|
| A — Clarté institutionnelle | Fond clair, encre profonde, accents bleu/vert, lignes fines, hiérarchie éditoriale sobre ; recommandation initiale. | Encre `#102B3F`, fond `#F6F8FA`, accent `#17645E` ; ce sont des hypothèses, pas couleurs validées. | Peut paraître trop administrative ; vérifier tous les couples de contrastes et l'identité EM Consulting. |
| B — Console de précision | Surfaces neutres, navigation latérale compacte, états textuels, densité réglée, repères typographiques. | Ardoise + bleu profond + accent cuivre, à définir. | Risque de tableau de bord technique lourd pour usagers ordinaires ; réserver les détails aux rôles habilités. |
| C — Accompagnement humain | Mise en page plus chaleureuse et pédagogique, étapes explicites, illustration abstraite minimale. | Neutres chauds + bleu nuit + vert discret, à définir. | Risque d'esthétique grand public ne convenant pas à l'administration ; évaluer sur opérations sensibles. |

Comparer les trois sur **un même écran E02 et un même écran A03**, avec les mêmes données fictives. Faire choisir une piste humaine avant système graphique ; pas de mélange automatique. Toute preuve par couleurs ou par esthétique n'est pas preuve de sécurité.

## 2. Règles UX/UI transversales

- Police sans sérif lisible, large jeu de caractères français, police sous licence vérifiée et solution système de repli ; recommander une échelle relative et tester rendu plutôt qu'imposer une police commerciale.
- Grille responsive et espacement cohérent par pas de 4/8 px **proposés**, pas dimension officielle ; contrôle à 320/360, 768 et 1440 px comme points d'essai, pas des breakpoints contractualisés. Zoom 200 % et reflow à vérifier.
- États sur texte + icône + couleur ; libellés d'action directs, focus visible, erreurs reliées aux champs, confirmation seulement après preuve. Éviter squelette interminable et toasts qui disparaissent avant lecture.
- Formulaires courts et préremplissage prudent ; navigation clavier, labels, séquence logique ; respect de `prefers-reduced-motion`, animations non essentielles désactivables.
- WCAG 2.2 AA comme **objectif de conception proposé** et principes exigés par V3 : 4,5:1 texte normal / 3:1 grand texte selon 1.4.3, états et exceptions à vérifier ; 3.3.8 authentification accessible. [W3C](https://www.w3.org/TR/WCAG22/) ; vérification réelle ultérieure, pas affirmation de conformité d'une image.
- Performance : peu d'images, SVG légers, icônes parcimonieuses, police raisonnable et aucun effet permanent ; pas de budget chiffré non mesuré. Pas de trackers ou services tiers sans décision.

## 3. Références comparables et limites

| Référence | Intérêt / élément transférable | À éviter / enseignement |
|---|---|---|
| [Keycloak — administration](https://www.keycloak.org/docs/latest/server_admin/index.html) | Séparation console compte/admin, facteurs, rôles et événements ; utile pour comprendre le système existant. | Ne pas reproduire les options hors première tranche ni supposer que chaque action Keycloak est activée. |
| [Auth0 — dashboard](https://auth0.com/docs/get-started/auth0-overview/dashboard) et [permissions](https://auth0.com/docs/dashboard/guides/users/view-user-permissions) | Organisation des identités et contexte des permissions ; documentation fournisseur. | Catalogue multitenant/marketplace et branding hors scope ; ne pas copier l'interface ni transposer ses rôles. |
| [PatternFly — login](https://www.patternfly.org/components/login-page/design-guidelines/) | Hiérarchie des champs, erreurs locales et adaptation mobile. | Les exemples sociaux et reset ne sont pas des exigences EM Auth ; aucune énumération de compte. |
| [Carbon — notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications) et [modales](https://carbondesignsystem.com/components/modal/usage/) | Distinguer information, alerte et action confirmée ; dialogue proportionné. | Éviter toast éphémère pour résultat inconnu, notification globale fictive ou action sensible déclenchée par simple modale. |
| [GOV.UK — erreurs](https://design-system.service.gov.uk/components/error-message/) | Erreur près du champ + résumé exploitable ; langage clair et accessible. | Ne pas copier ses mentions institutionnelles, parcours de vérification ou données réelles. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Critères de contraste, focus, clavier et authentification accessible. | Un prototype visuel ne prouve pas la conformité ; tester navigation et lecteurs en implémentation. |

## 4. Sélection conditionnelle de la DRI réellement présente

| Ressource DRI | Usage proposé | Limite et condition |
|---|---|---|
| [React Aria](https://react-spectrum.adobe.com/react-aria/) | Étudier comportements accessibles des menus, dialogues et formulaires. | Ne pas ajouter au dépôt sans comparer compatibilité, licence exacte, poids et tests réels. |
| [Radix](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/docs) | Référence de composants/états ; shadcn distribue du code, souvent avec Tailwind. | Ni Tailwind ni shadcn ne sont décidés par V3 ; vérifier code copié, dépendances et chaque licence. |
| [Lucide](https://lucide.dev/) | Piste d'icônes cohérentes et sobres. | Vérifier licence version/attribution et qu'un symbole est nécessaire ; ne pas importer un set complet par défaut. |
| [Motion](https://motion.dev/) | Examiner micro-interactions uniquement si utiles. | Dépendance non retenue ; CSS minimal peut suffire ; mouvement réduit et performance. |
| DRI sources de polices et templates | Identifier police et inspiration d'administration. | Vérifier licence de chaque police/fichier et droits commerciaux ; template tiers n'est pas EM Auth et peut contenir des fonctions exclues. |

Les scores, prix, licences et compteurs du catalogue DRI sont des **déclarations historiques**, pas des vérifications actuelles. Les ressources DLP, 3D, dashboards génériques, Next.js, Better Auth, facturation et MCP ne sont pas sélectionnées pour ce MVP.
