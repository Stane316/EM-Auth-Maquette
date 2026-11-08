# Prompts complémentaires — seulement à la demande ou pour un correctif nécessaire

Ces prompts ne constituent pas une phase principale supplémentaire. Un correctif doit respecter le lot approuvé, le design system, les contrôles de sécurité et l'autorisation d'écriture ; sinon demander une décision. Chaque prompt : **outil** = Figma, Stitch ou agent selon accès ; **phase** = après un premier résultat ; **joindre** = PDF/brief, inventaire, design system, écran(s) et décisions autorisés, données fictives. **Vérification commune** : diff, éléments modifiés, état avant/après, risques, test réel ou non testé, référence de version. Ne pas transmettre de données sensibles.

## Retoucher un écran

> Sur `[ID / état / version]`, améliore `[problème constaté]` uniquement ; conserve acteur, rôle, textes de sécurité, composants et transitions. Présente le résultat, les différences et contrôles responsive/accessibilité ; n'invente aucun contrat serveur. Si le changement modifie le métier ou la direction, propose-le et attends l'accord.

## Nouvelle direction artistique

> Pour le même périmètre fictif, propose deux directions distinctes et compare-les à la direction approuvée, sur E02 et A03 à contenu identique. Indique impacts, risques et coûts de reprise ; ne remplace rien avant décision humaine G2.

## Animation ou micro-interaction

> Étudie `[composant]` : explique la fonction utilisateur du mouvement, propose une option minimale et une alternative sans animation ; respecte mouvement réduit. Ne crée aucun indicateur de réussite avant confirmation. Présente mesures disponibles et ce qui reste à tester.

## Composant ou mise en page

> Améliore `[composant / écran]` sans changer son contrat ; identifie toutes ses instances, variantes et états avant de proposer un diff. Vérifie focus, erreur, contenu long et cohérence ; une modification globale structurante exige validation.

## Mobile ou accessibilité

> Diagnostique `[écran / état]` à la largeur ou avec la technologie indiquée. Propose correction ciblée, ordre clavier, reflow, contraste et impacts ; indique ce qui a été mesuré et ce qui reste non testé. Ne revendique pas conformité à partir d'une image.

## Parcours ou audit complémentaire

> Examine `[parcours / périmètre]` depuis le point d'entrée jusqu'aux issues confirmées, refusées et inconnues ; documente acteurs, conditions, destinations, preuves et manques. Applique le module approprié de `06_QUALITY_ASSURANCE/05_EM_AUTH_QUALITY_ASSURANCE_PROMPTS.md` et fournis les anomalies classées, sans modifier les rôles.

## Finitions préexistantes

Sur demande, lire et appliquer aussi [04_FINITIONS_UI.md](../05_SPECIALIZED_PROMPTS/04_FINITIONS_UI.md). Ces options n'autorisent pas l'installation de packages, la modification du dépôt ou une transmission SaaS.
