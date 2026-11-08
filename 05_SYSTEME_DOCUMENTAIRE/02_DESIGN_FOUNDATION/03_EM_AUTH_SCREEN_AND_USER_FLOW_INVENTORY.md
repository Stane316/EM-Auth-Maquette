# 03 — Inventaire des écrans, états et parcours

**Règle :** un besoin du cahier n'impose pas nécessairement un écran spécifique. E01–E13 proviennent du catalogue P14 historique PROPOSED ; A01–A09 sont des regroupements de conception proposés à partir des exigences V3, **non écrans approuvés**. Avant réalisation, décider pour chacun : interface EM Auth, thème Keycloak, écran OS/navigateur, outil existant ou procédure humaine. L'inventaire couvre les besoins visibles sans inventer de produit livré.

| ID | Écran proposé | Traçabilité V3 | États à explorer | Priorité de maquette |
|---|---|---|---|---|
| E01 | [Invitation et accueil](../04_SCREEN_SPECIFIC_PROMPTS/E01.md) | M02 · REQ-13-03/04 | Lien valide, traitement, expiré ou rejoué | Critique à discuter |
| E02 | [Identification](../04_SCREEN_SPECIFIC_PROMPTS/E02.md) | M03 · REQ-13-06/07 | Vide, saisie, attente, échec générique | Critique à discuter |
| E03 | [Choix du moyen autorisé](../04_SCREEN_SPECIFIC_PROMPTS/E03.md) | M03 · REQ-13-05/06 | Méthodes autorisées, aucune disponible, aide | Critique à discuter |
| E04 | [Défi et preuve fraîche](../04_SCREEN_SPECIFIC_PROMPTS/E04.md) | M03/M08 · REQ-13-05/20 | Prêt, fenêtre native, annulé, expiré, non vérifié | Critique à discuter |
| E05 | [Transition vers application](../04_SCREEN_SPECIFIC_PROMPTS/E05.md) | M07 · REQ-13-16/36 | Chargement, transfert confirmé, retour échoué, résultat inconnu | Conditionnel à arbitrer |
| E06 | [Fin de session](../04_SCREEN_SPECIFIC_PROMPTS/E06.md) | M08/M12 · REQ-13-19/31 | Confirmation, fin locale confirmée, résultat incertain | Critique à discuter |
| E07 | [Perte ou aide](../04_SCREEN_SPECIFIC_PROMPTS/E07.md) | M04/M12 · REQ-13-08/09/30 | Demande, attente, réponse générique | Critique à discuter |
| E08 | [Suivi de récupération](../04_SCREEN_SPECIFIC_PROMPTS/E08.md) | M04 · REQ-13-08/09 | Reçue si confirmé, vérification, décision, nouvel enrôlement, clôture | Critique à discuter |
| E09 | [Demande ou approbation sensible](../04_SCREEN_SPECIFIC_PROMPTS/E09.md) | M01/M06/M08 · REQ-13-02/15/20 | Examen, attente, refus, preuve fraîche, résultat inconnu | Critique à discuter |
| E10 | [Retrait par cible](../04_SCREEN_SPECIFIC_PROMPTS/E10.md) | M05 · REQ-13-11/12/13 | Confirmé, en cours, échec, inconnu | Critique à discuter |
| E11 | [Résultat non confirmé](../04_SCREEN_SPECIFIC_PROMPTS/E11.md) | M05/M08 · REQ-13-12/21 | Réponse perdue, statut vérifiable, vérification indisponible | Critique à discuter |
| E12 | [Expiration et inactivité](../04_SCREEN_SPECIFIC_PROMPTS/E12.md) | M08/M12 · REQ-13-18/20/31 | Avertissement si possible, session expirée | Critique à discuter |
| E13 | [Service indisponible](../04_SCREEN_SPECIFIC_PROMPTS/E13.md) | M08/M11 · REQ-13-21/28 | Panne, action sensible bloquée, assistance | Critique à discuter |
| A01 | [Qualification de l’application](../04_SCREEN_SPECIFIC_PROMPTS/A01.md) | M01/M07 · REQ-13-01/17 | Brouillon, chemin inconnu, prêt à vérifier | Conditionnel à arbitrer |
| A02 | [Identité et mandat d’enrôlement](../04_SCREEN_SPECIFIC_PROMPTS/A02.md) | M01/M02 · REQ-13-02/03/04 | Demande, identité ambiguë, en attente, autorisée | Critique à discuter |
| A03 | [Décision de récupération](../04_SCREEN_SPECIFIC_PROMPTS/A03.md) | M04 · REQ-13-08/09 | Preuve insuffisante, second contrôle requis, refus, traitement | Critique à discuter |
| A04 | [Orchestration du retrait](../04_SCREEN_SPECIFIC_PROMPTS/A04.md) | M05 · REQ-13-11/12/13 | Mandat, confirmation, traitement, partiel, résultat inconnu | Critique à discuter |
| A05 | [Journal d’audit minimal](../04_SCREEN_SPECIFIC_PROMPTS/A05.md) | M09 · REQ-13-22/23/35 | Vide, événements, accès refusé, collecte indisponible | Conditionnel à arbitrer |
| A06 | [Exploitation et reprise](../04_SCREEN_SPECIFIC_PROMPTS/A06.md) | M11 · REQ-13-26/27/28/29 | État inconnu, vérification requise, exercice documenté | Conditionnel à arbitrer |
| A07 | [Sortie et portabilité](../04_SCREEN_SPECIFIC_PROMPTS/A07.md) | M13 · REQ-13-32/33 | Mandat absent, préparation, export autorisé, réenrôlement à prévoir | Conditionnel à arbitrer |
| A08 | [Enrôlement du facteur](../04_SCREEN_SPECIFIC_PROMPTS/A08.md) | M02/M03 · REQ-13-04/05 | Préparation, appel natif, annulé, réussi si confirmé, expiré | Critique à discuter |
| A09 | [Gestion d’urgence](../04_SCREEN_SPECIFIC_PROMPTS/A09.md) | M04 · REQ-13-10 | Mandat absent, preuve forte, action bloquée, événement à examiner | Conditionnel à arbitrer |

## Parcours indicatifs et embranchements

1. **Qualification préalable :** A01 → décision humaine sur chemins et risques ; statut protégé interdit si chemin non maîtrisé.
2. **Invitation/enrôlement :** A02 (mandat et preuve) → E01 valide → A08 (dialogue natif simulé) → E02 ; expiré/rejoué → E01 refus.
3. **Accès :** E02 → E03 selon politique/identification suffisante → E04 → E05 → application fictive uniquement après confirmation. E03 sans moyen → E07 ; annulation E04 → aide/reprise ; réponse perdue → E11.
4. **Sensibilité :** E09 → séparation de rôles si requise → E04 preuve fraîche → effet confirmé ou E11. E09 n'est pas l'approbation seule ni une preuve cryptographique.
5. **Perte :** E07 → A03 preuve indépendante et deuxième personne → retrait facteur perdu → A08 après autorisation → E08 si suivi autorisé ; preuve insuffisante = arrêt ; notification échouée = escalade.
6. **Départ :** A04 → suspendre nouvelles connexions et traiter sessions/droits → E10 par cible ; résultat partiel/inconnu ≠ retrait global.
7. **Session / panne :** E06 portée locale, E12 expiration, E13 indisponibilité ; E11 si effet d'une action déjà soumise est incertain.
8. **Exploitation et sortie :** A05 journal minimisé, A06 procédures, A07 sortie ; A09 urgence sous mandat séparé. Ils peuvent être documentaires ou outils existants, pas forcément des écrans MVP.

## Matrice de décision et lacunes

- Les modules M01–M13 sont représentés ou renvoyés à une procédure ; M06 concerne aussi le contrôle serveur ressource, **pas une interface d'autorisations métier** ; M10 est essentiellement documentaire, aucune console vie privée inventée.
- E02/E03/E04 et A08 sont susceptibles d'être thémés ou natifs ; décider après étude du `develop` et de Keycloak. E05/E06 dépendent des contrats BFF/session. Les A01–A09 n'impliquent aucune API déjà existante.
- Les types d'utilisateur, seuils, canaux de support, états techniques, données et droits précis sont à valider. Pas de tunnel « inscription », réinitialisation de mot de passe, vérification d'email, tableau de bord générique, rôles métier ou pages publiques imaginés.
- Dans tous les parcours : utilisateur fictif, erreurs locales non révélatrices, focus documenté, clavier, lecteurs d'écran, simulation explicite, aucune preuve supposée.
