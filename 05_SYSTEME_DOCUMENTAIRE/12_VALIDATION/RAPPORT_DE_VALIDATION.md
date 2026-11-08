# Validation du système et simulation de découverte

## Portée et résultats

- `python 12_VALIDATION/validate_system.py` : 54 contrôles statiques, 0 erreur au moment de la livraison ; voir [résultats](RESULTATS_CONTROLES.txt). Ils vérifient existence des principaux fichiers, liens Markdown relatifs, présence des dix phases dans l'index, E01–E13/A01–A09 dans l'inventaire et sur disque, structure des phases, empreinte PDF et présence de termes des domaines QA. Ces tests n'évaluent pas exhaustivement le sens des documents, l'intégrité des sites externes ni les capacités des outils.
- `python 12_VALIDATION/simulate_gates.py` : neuf cas d'un modèle abstrait très simplifié des portes ; voir [résultats](RESULTATS_SIMULATION.txt). Ce modèle vérifie ses propres règles, pas le comportement réel d'un agent. Les scripts n'accèdent ni au dépôt ni au réseau et ne modifient pas le projet.
- Lien vers tous les sous-prompts d'écran : résolu via l'inventaire, dossier et convention d'ID ; l'index impose lecture intégrale de 22 et production seulement pour ceux approuvés. Les huit domaines QA sont rattachés à PH07 et les critères B01–B10 à PH09.

## Simulation de lecture — nouvel agent, scénario fictif

Cette simulation est une revue documentaire manuelle, non un lancement de Windsurf, Cursor ou Antigravity.

1. **Découverte.** L'agent reçoit le texte maître, un projet local, une URL, un ZIP DRI et ce dossier. Il localise la racine ; le maître lui indique de lire le protocole, l'index, la carte et le guide. Le PDF fourni est présent et son empreinte connue ; il n'utilise aucune source distante comme écrasement local.
2. **Écart source.** Si le commit local diffère de GitHub et qu'aucune source de travail n'est désignée, PH00 passe `EN_ATTENTE_HUMAIN` G0. L'agent ne fusionne pas et ne remplace pas le local. Si les fichiers de suivi ne peuvent pas être écrits, il demande une zone autorisée avant persistance.
3. **DRI et cadrage.** PH01 compare sources et rôles, PH02 lit la DRI réellement disponible et produit une matrice. Une archive introuvable ou une DRI contradictoire bloque ou demande une substitution autorisée ; rien n'est installé. G1 classe les écrans proposés au lieu d'inventer un lot.
4. **Conception.** PH03 demande les vues des pistes et G2. Si aucun outil ne peut les produire, `EN_ATTENTE_OUTIL`, pas de succès déclaré. Si Figma n'est pas accessible, les instructions manuelles sont préparées ; le fichier et les liens Figma ne sont pas prétendus créés. Les autorisations SaaS précèdent tout envoi.
5. **Parcours et QA.** Après les décisions et capacités nécessaires, PH04 crée les fondations ; PH05 lit tous les prompts puis traite les seuls écrans retenus par groupe ; PH06 branche réellement les parcours ; PH07 applique les huit domaines et consigne les non-testés ; PH08 produit le handoff ; PH09 demande réception. Un P0/P1 bloquant signifie NON PRÊT.
6. **Reprise.** Si interrompu pendant PH05, l'agent relit l'état et les quatre autres registres, vérifie les preuves et versions du dernier écran, vérifie les droits, reprend au premier pas non exécuté ; si une preuve a disparu, il bloque et ne marque pas de réussite.

## Limites et point de vigilance

Aucune simulation ne garantit qu'un IDE obéira, qu'il disposera d'une fenêtre de contexte suffisante ou qu'il saura agir dans Figma. Les portes et le suivi sont des instructions, pas un moteur d'exécution logiciel ou une garantie de sécurité. Les exemples ne démontrent aucune mise en œuvre produit. Rejouer les scripts après modification du dossier ; examiner manuellement les conflits sémantiques, droits, dépendances et limites propres à l'environnement.
