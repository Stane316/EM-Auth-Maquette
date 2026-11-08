# 09 — Critères de réception du prototype

**Niveaux :** B = bloquant pour la réception du prototype ; A = amélioration à planifier. Ce contrôle porte sur la maquette et sa traçabilité, pas sur une livraison opérationnelle, la sécurité démontrée ou la conformité certifiée. Chaque case exige version, lien de preuve, évaluateur et décision ; absence de preuve = NON ÉVALUÉ, pas réussite.

## Bloquants

| ID | Critère et méthode vérifiable | Résultat / preuve |
|---|---|---|
| B01 | PDF et commit de référence identifiés, source V3 prioritaire, écart temporel signalé ; 100 % des décisions structurantes du lot validées humainement. | … |
| B02 | Une organisation + application fictive ; aucune fonction exclue présentée comme livrée ; écrans E/A clairement classés et propriétaires techniques non décidés marqués à arbitrer. | … |
| B03 | Pour **chaque écran et état du lot validé** : acteur, entrée, action, destination ou sortie, message et état documentés ; toutes les branches prévues parcourues ou explicitement NON TESTÉES. | … |
| B04 | E04/action sensible : aucune validation par simple clic ; absence de preuve forte bloque. Récupération : preuve indépendante et deux personnes distinctes. Aucune méthode faible silencieuse. Revue scénario par scénario. | … |
| B05 | E10 : chaque cible fictive affiche son état et sa portée ; toute cible non observée = INCONNU ; E11 et E06 ne prétendent ni succès ni déconnexion globale sans preuve. | … |
| B06 | Aucune donnée réelle, jeton, code ou secret dans les exports ; droits de diffusion, licences et sources des assets confirmés. | … |
| B07 | Au minimum pour les parcours critiques maquettable : titres, labels, ordre de focus prévu, messages d'erreur et états non fondés seulement sur couleur ; contraste texte mesuré 4,5:1 normal / 3:1 grand, exceptions documentées. Problèmes ou cas impossibles à vérifier inscrits ; accès clavier et lecteur d'écran réels restent à tester. | … |
| B08 | Vérifier manuellement les parcours du périmètre dans Figma, ses liens et les vues aux tailles retenues ; signaler explicitement ce qui ne peut être simulé ou testé (WebAuthn natif, serveur, contrôle d'accès). | … |
| B09 | Handoff : versions, composants, états, hypothèses, API absentes/inconnues, licences, tests et écarts complétés ; absence de P0 et P1 non acceptés par le décideur pour le lot. | … |
| B10 | Aucun prototype ou audit visuel présenté comme preuve de conformité WCAG, de sécurité ou de réussite en composants réels ; tests rapportés/rejoués distingués. | … |

B07 ne prétend pas certifier WCAG et une absence d'essai réel demeure un **blocage pour une réception de produit accessible**, même si la maquette peut être réceptionnée avec une réserve approuvée. Toute dérogation à un bloquant du prototype doit être consignée, justifiée et acceptée humainement ; ne jamais déroger à la confidentialité ou à l'interdiction d'affirmation trompeuse.

## Améliorations A

A01 micro-interactions non essentielles ; A02 variations de marque après charte ; A03 élargissement navigateurs/terminaux après disponibilité ; A04 mesure de performance réelle après implémentation et définition d'un budget ; A05 autres langues après décision ; A06 perfectionnement des illustrations. Aucune n'autorise à omettre l'accessibilité de base ou la lisibilité des états critiques.

## Réception humaine

`Version prototype : … | lot/écrans : … | examinateurs : … | B01–B10 : satisfait / écart / non évalué + preuve | réserves acceptées : … | décision : accepté / ajourné | prochaine étape autorisée : …`.
