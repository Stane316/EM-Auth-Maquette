# 05 — Prompts d'audit qualité

**Outil / phase :** agent de revue, Figma ou expert humain ; après un lot de maquettes, sans modifier le dépôt. **Joindre :** PDF V3, 01–03, vues, annotations, tableau de parcours et décisions ; pour revue de code après accord, commit et preuves de tests, jamais secrets. **Résultat :** anomalies P0/P1/P2 avec preuve, écran/état, risque, recommandation, responsable et statut. Les constats purement visuels ne valent pas tests en navigateur.

## Prompt commun de revue

> Audite uniquement les éléments effectivement accessibles. Pour chaque constat indique ID, domaine, écran/état, règle et source, preuve observable ou élément non vérifiable, gravité P0 bloquant / P1 avant validation / P2 amélioration, correction proposée, responsable et résultat attendu. Différencie faits, hypothèses et recommandations. Si un test exige une interaction réelle ou des composants réels, marque NON TESTÉ plutôt que CONFORME. Ne modifie rien ; attends validation des corrections.

Compléter ce prompt par chacun des modules ci-dessous :

1. **UX et parcours.** Reconstituer accès, enrôlement, récupération, approbation, retrait, déconnexion et panne ; détecter impasses, ambiguïtés, aides non validées, changement d'acteur, doubles clics et chemins d'annulation. Évaluer cohérence messages et confirmation.
2. **UI et design system.** Contrôler hiérarchie, alignement, composants, variantes, langues, libellés, états et cohérence des tailles ; signaler les éléments décoratifs qui concurrencent une action sensible. Vérifier les noms de frames et les sources des assets.
3. **Sécurité / confidentialité.** Vérifier énumération de compte ; authentification faible pour privilèges ; preuve fraîche ; distinction deux acteurs ; retrait par cible ; absence de secret, nom réel et preuve de succès inventée ; statut incertain après coupure ; portée exacte de déconnexion ; fenêtres natives. Les risques techniques OAuth/CSRF/contrôle ressource demandent une revue et des essais séparés, pas une déduction depuis l'image.
4. **Accessibilité WCAG 2.2.** Examiner ordre, labels, messages, alternatives et contraste ; mesurer 4,5:1 / 3:1 selon conditions, focus et éléments d'interface ; scénarios clavier, lecteur d'écran, zoom 200 %, reflow, mouvements réduits et 3.3.8. Distinguer contrôle visuel, essai prototype et navigateur réel ; noter exceptions applicables et impossibilités de Figma. Référence : https://www.w3.org/TR/WCAG22/.
5. **Responsive et compatibilité.** Examiner 320/360, 768 et 1440 px, contenu long, zoom, rotation si pertinente, commandes tactiles et reflow. Dresser matrice navigateurs/appareils réellement disponibles et WebAuthn natif ; aucun support garanti sans essai.
6. **Performance.** Recenser images, polices, mouvement, dépendances et animation ; ne pas inventer poids ou latence. Dans une implémentation autorisée, mesurer avec environnement, outil, valeurs et budgets approuvés ; séparer réseau et rendu.
7. **SEO / confidentialité.** Déterminer si une page publique indexable existe ; sinon « sans objet ». Formulaires d'identification non authentifiés ne deviennent pas des pages SEO par défaut. Pour pages privées proposer authentification et règles d'indexation défensives, sans considérer `noindex` comme contrôle d'accès ; pas de sitemap privé ni données sensibles indexées.
8. **Fonctionnel et traçabilité.** Matrice PDF REQ / écran / état / acteur / source / contrat / scénario / preuve / responsable ; vérifier que P14 et Axx restent propositions, que E10 ne prouve pas un retrait réel et que les états E11 ne deviennent pas succès.

## Résultat et porte

Classer P0 toute promesse de succès sans preuve, fuite de données ou dégradation MFA ; P1 défaut de parcours critique, absence de source/validation ou accessibilité non évaluée ; P2 finition sans risque critique. Revue humaine des écarts avant nouvel export. Les outils automatiques ne couvrent pas tous les critères WCAG et une maquette ne certifie ni WCAG ni sécurité.
