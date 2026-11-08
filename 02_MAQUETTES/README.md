# Maquettes fictives — EM AUTH

**Données 100 % fictives. Aucun service connecté. Aucune preuve de sécurité, de conformité ou de disponibilité.**

## Ouvrir les vues

Aucune installation, aucun serveur, aucune dépendance n'est nécessaire :

1. ouvrir `index.html` dans un navigateur ;
2. ou ouvrir directement une vue, par exemple `direction-a/e02-identification.html`.

Les fichiers utilisent une **pile de polices système** : aucune requête réseau, aucune police sous licence tierce, aucun traceur.

## Contenu

| Dossier | Objet |
|---|---|
| `index.html` | portail de comparaison A / B / C (PH03) |
| `direction-a/` | piste « Clarté institutionnelle » — E02 et A03 |
| `direction-b/` | piste « Console de précision » — E02 et A03 |
| `direction-c/` | piste « Accompagnement humain » — E02 et A03 |
| `assets/base.css` | structure commune, focus, lien d'évitement, états |
| `assets/dir-*.css` | jetons et variantes de chaque direction |
| `assets/generer_ph03.py` | générateur des 6 vues (contenus identiques garantis) |

## Limites à ne jamais masquer

- Les vues ont été **produites** mais **pas examinées visuellement par l'agent** : aucun navigateur n'était disponible. Le rendu réel est à évaluer par une personne (porte G2).
- Les **contrastes sont calculés**, pas mesurés à l'écran ; les paires « avertissement » et « inconnu » restent à vérifier.
- Aucun test clavier, lecteur d'écran, zoom 200 %, 320 px ou WebAuthn natif n'a été exécuté.
- Les fenêtres natives du navigateur (WebAuthn) **ne sont pas simulées** ; elles ne peuvent pas être maîtrisées par EM AUTH.
- Aucune identité de marque EM Consulting n'est reprise : logo, couleurs et polices de l'organisation sont **inconnus**.
- Les écrans sont des **propositions** : l'inventaire E01–E13 / A01–A09 n'est pas approuvé (porte G1).
