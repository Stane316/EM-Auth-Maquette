# Carte de dépendances et hiérarchie

```text
INSTRUCTIONS UTILISATEUR + sécurité
        ↓
PDF V3 + décisions humaines compatibles + sources réelles et DRI
        ↓
MASTER → EXECUTION_PROTOCOL → WORKFLOW_INDEX → PH00 → PH01 → PH02
                                                           ↓
                    G1 périmètre ← inventaire E/A      PH03 ← prompt direction / Stitch si disponible → G2
                                                           ↓
                  PH04 ← prompt design system / Figma si disponible → G4 structure
                                                           ↓
                  PH05 ← 22 prompts écran + responsive + états sécurité
                                                           ↓
                  PH06 ← prompt parcours → PH07 ← QA 8 domaines + accessibilité
                                                           ↓
                  PH08 ← handoff et microcopie → PH09 ← critères → G4 réception
                                                           ↓
                      plan de développement ; G6 préalable à tout code
```

G0 intervient quand la source ou l'écriture est ambiguë ; G3 précède toute transmission externe ; G5 intervient à tout moment en cas de risque ou changement sensible. Les registres persistants accompagnent chaque étape et constituent l'entrée de reprise, pas une source qui écrase le cahier ou une preuve par elle-même.

| Catégorie | Source | Dépendants | Règle |
|---|---|---|---|
| Référence | PDF, brief, direction, inventaire, critères | Toutes phases | Priorité métier au PDF ; E/A proposés, pas automatiquement validés. |
| Outil | prompts 04A/04B/04C | PH00/03/04 ; handoff | Ne s'exécutent que dans l'outil disponible et autorisé ; Code Agents = lecture seule. |
| Opérationnel | PH00–PH09 | Phase suivante | Strict ordre ; porte NON_APPLICABLE uniquement justifiée. |
| Écran | `04_SCREEN_SPECIFIC_PROMPTS` | PH05, PH06, PH07 | Tous lus, seuls les écrans retenus produits ; autres classés. |
| Qualité | QA commun, huit modules, critères | PH07/09, corrections | Pas d'acceptation avec bloquant ouvert ; non-testé identifié. |
| Complémentaire | `08_OPTIONAL_PROMPTS` et finition | Sur demande ou correction nécessaire | Jamais lancement systématique. |
| Historique | `99_HISTORIQUE_ET_AUDIT` | Contexte/reprise | Préservé ; conflits de pauses résolus par protocole, pas de réécriture métier. |

La classification de l'inventaire ne déduit pas de droits réels et ne change pas le cahier. Des écrans optionnels peuvent être hors lot, mais les contrôles de sécurité correspondants restent applicables à tous les parcours retenus. Une preuve manquante ne peut être remplacée par une dépendance « supposée OK ».
