# 07 — Workflow progressif et points d'arrêt

| Étape | Action / outil | Livrable | Décision humaine / sortie |
|---|---|---|---|
| 0. Préparer | Vérifier PDF, commit, permissions SaaS, données fictives, compte et droits ; lire 00–03 | Journal de sources et questions | Aucune donnée réelle ou secret n'est transmis ; source indispensable manquante = arrêt. |
| 1. Cadrer | Parcourir brief et inventaire avec les responsables | Périmètre et rôles à arbitrer | Décider le lot, propriétaire de chaque écran et les inconnus. |
| 2. Explorer | 04A Stitch : E02 et A03, 3 directions, une étape | Comparaison A/B/C fictive | Choix de la piste ou nouvelle exploration, documenté. |
| 3. Systématiser | Prompt spécialisé système, puis 04B Figma | Tokens et composants proposés | Contraste/états vérifiés et système validé ; pas de création massive automatique. |
| 4. Maquetter | Prompts `10/` par lots : accès et enrôlement ; récupération/approbation ; retrait/états ; exploitation conditionnelle | Vues bureau/mobile et états | Valider chaque lot et ses hypothèses ; geler version. |
| 5. Relier | Figma : matrice de transitions et liens manuels ou AI disponible | Prototype fictif, points de départ | Parcourir succès, erreur, aide, inconnu et retour ; rectifier les impasses. |
| 6. Auditer | Prompts 05 et 11, revue humaine | Registre P0/P1/P2, preuves et non-testé | Corriger les bloquants et valider version. |
| 7. Transmettre | Compléter 06, exporter sous droits autorisés | Handoff et décisions | Décider si l'audit du dépôt par agent est autorisé. |
| 8. Réaliser plus tard | Prompt 04C, lecture seule d'abord | Plan d'intégration test-first | Accord explicite pour chaque lot ; jamais PR ni action Git sensible non autorisée. |

## Passerelles pratiques

- Stitch → Figma : essai sur un écran et vérification texte/calques ; si collage/import indisponible, exporter une image fictive comme référence puis reconstruire manuellement les composants et les parcours. Une image n'est pas un fichier structuré.
- Figma : l'agent peut avoir des capacités différentes de l'outil AI d'interactions. En cas d'indisponibilité, dessiner frames et composants, ajouter manuellement les liens via l'onglet Prototype ; documenter les actions non simulables (OS, serveur).
- Figma → code : export, CSS ou inspection n'est qu'une indication ; dev étudie le dépôt et les contrats réels avant toute création. Contrôler licences d'assets et politique de confidentialité.
- WinSCP : uniquement transfert de fichiers sur destination et mandat explicites, avec contrôle d'intégrité ; jamais une intégration automatique.

## Décisions à journaliser

`ID | date/horloge | décideur | source/version | décision | alternatives | hypothèses | portée | preuve | prochaine révision`. Ne pas utiliser les dates futures des fichiers observés pour reconstituer automatiquement la chronologie.
