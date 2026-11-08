# 04B — Prompt d'initiation Figma Design

**Outil / phase :** Figma Design, agent si disponible + opérations manuelles ; après validation d'une direction. **Joindre :** PDF V3/extraits autorisés, fichiers 01–03, vues Stitch fictives validées, prompts E/A concernés, références et éventuelle charte autorisée. **Résultat :** fichier organisé, composants, frames et prototype de parcours simulés, après checkpoints.

## Prompt à copier

> Tu es designer UI/UX et documentaliste Figma pour EM Auth. Lis les documents fournis ; dis lesquels manquent et ne prétends pas les avoir lus. Respecte le périmètre d'une organisation et d'une application fictives, les exigences de sécurité et les états inconnus. Aucune fonction ajoutée sans décision humaine, aucun secret ou patient/client réel.
>
> Reprends uniquement les vues et la direction expressément approuvées. D'abord propose un plan de fichier et un inventaire de composants avec variantes, états et règles d'accessibilité, sans créer tous les écrans. Structure proposée : `00_Cadrage`, `01_Tokens`, `02_Composants`, `03_Parcours`, `04_Ecrans`, `05_Annotations_Handoff`, `99_Archives`. Les pages ou sections indisponibles seront créées manuellement. Nomme les frames `E02/desktop/default`, composants `Button/Primary`, variantes `state=default|hover|focus|disabled|loading`. Conserve les sources et décisions ; aucune suppression silencieuse.
>
> Propose tokens sémantiques de couleur, type, espacements, bordures et focus, en vérifiant lisibilité et contrastes avec les outils réellement disponibles ; note toutes les mesures non effectuées. Réutilise composants et auto-layout quand l'outil le permet. Maquette les états principaux et négatifs du lot explicitement demandé, en français, sur bureau et mobile ; ne stylise pas comme contrôlables les fenêtres natives OS/WebAuthn.
>
> Dessine ensuite un tableau source/action/destination/condition pour les parcours. Ne branche les liens qu'après accord ; tous les états d'authentification sont simulés. Si l'agent ne peut pas ajouter interactions, variables ou composants dans ce contexte, fournis instructions manuelles précises. Présente le plan et **attends mon accord avant création massive**.

## Capacités et procédure manuelle

[Figma Design — prototypage](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma) : sélectionner un frame > onglet Prototype > choisir hotspot > relier frame cible > choisir déclencheur/action > nommer point de départ > prévisualiser et parcourir chaque branche. [Agent Figma Design](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files) et [Add interactions AI](https://help.figma.com/hc/en-us/articles/24004778051479-Make-interactions-with-AI) sont **fonctionnalités distinctes** ; la seconde peut ajouter des liens simples selon plan/droits, tandis que l'agent a ses propres limites. Variables, modes, Dev Mode, nombre de fichiers et coût varient selon plan et accès ; vérifier avant usage. Import Stitch : tester un échantillon et contrôler hiérarchie des calques, textes, auto-layout, composants et fidélité ; corriger manuellement.

**Vérifier :** pages nommées, variantes distinctes, destinations et erreurs parcourues, données fictives, fichier et droits partageables sans exposer de données sensibles. Marquer non relié ou non testable plutôt qu'inventer une interaction.
