# PH02 — SÉLECTION DRI ET PRÉPARATION

**Phase :** PH02 · **Statut :** TERMINÉ (matrice établie ; **aucune ressource intégrée**)
**Horodatage :** 2026-11-08T17:50Z (UTC)
**Source DRI :** `EM-Auth/dri/` @ `a80a478` — 13 fichiers. Substitution d'une archive ZIP non fournie : **D-002 (PROPOSÉ)**.
**Annexes absentes, non lues, non exploitées :** `12-student-plans`, `12a`, `12b`, `13-harnai/*`, `14`, `15`, `harnai-moc`, `catalogue-student.csv`, `catalogue-harnai.csv`, `data/`.

---

## 1. Nature de la DRI réellement disponible

La DRI est une **bibliothèque de ressources numériques réutilisables** (plateformes, packages, assets, templates), datée du **5 octobre 2026**, avec labels de confiance `[API-gh]`, `[API-npm]`, `[V]`, `[W]`, `[?]`. Ce n'est **pas** un dossier de conception EM Auth, et elle ne contient **aucune** ressource propre à EM Auth.

**Conséquence méthodologique :** la DRI sert à *choisir des briques de mise en œuvre*, pas à *décider du design EM Auth* ni à *valider une exigence V3*. Les scores, étoiles, téléchargements et licences qui y figurent sont des **déclarations historiques** ; ils ne constituent pas une vérification à la date d'usage.

---

## 2. Ressources examinées et décision

| Ressource | Source / chemin | Intérêt pour EM Auth | Version | Licence déclarée (DRI) | Statut licence | Compatibilité | Décision pour cette maquette | Motif |
|---|---|---|---|---|---|---|---|---|
| React Aria | DRI `catalogue-dri.csv`, doc `04` | Référence de comportements accessibles (dialogues, focus, formulaires) | non spécifiée | Apache-2.0 `[W]` | **NON vérifiée à l'usage** | React 19 (cible V3), absent du dépôt actuel | **NON RETENU en intégration** — référence de conception seulement | Aucune dépendance dans la maquette ; licence à vérifier avant tout ajout réel |
| shadcn/ui | DRI `catalogue`, doc `08` canal 1 | Composants React copiés dans le projet, écosystème | non spécifiée | MIT `[API-gh]` | **NON vérifiée à l'usage** | exige Tailwind — **non décidé par la V3** | **NON RETENU** | Le brief interdit d'introduire Tailwind/shadcn depuis une maquette |
| Radix Primitives | DRI `catalogue` | Primitives headless accessibles | non spécifiée | MIT `[W]` | NON vérifiée | React | **NON RETENU** | Dépendance inutile pour une maquette statique ; maintenance signalée ralentie en 2026 |
| Lucide (icônes) | DRI `catalogue` | Jeu d'icônes SVG sobre et cohérent | non spécifiée | ISC `[API-gh/npm]` | NON vérifiée | SVG (aucun runtime) | **RÉFÉRENCE DE STYLE uniquement** | Les pictogrammes de la maquette sont dessinés en SVG inline minimal, sans copier le jeu complet ni sa licence |
| Tabler Icons / Phosphor | DRI `catalogue` | Alternatives d'icônes | — | MIT `[API-gh]` / `[W]` | NON vérifiée | SVG | **NON RETENU** | Redondant avec la décision ci-dessus |
| Motion | DRI `catalogue`, doc `08` | Micro-interactions | non spécifiée | MIT `[API-gh]` | NON vérifiée | JS/React | **NON RETENU** | CSS natif suffit ; `prefers-reduced-motion` respecté sans bibliothèque |
| Google Fonts / Fontshare | DRI `catalogue` | Polices libres | — | OFL `[W]` / « free commercial » `[W]` | NON vérifiée | webfont | **NON RETENU** | Maquette hors ligne sans requête tierce : **pile de polices système** uniquement ; aucune police commerciale supposée |
| axe-core | DRI `catalogue` | Tests d'accessibilité automatisés | — | MPL-2.0 `[API-npm/gh]` | NON vérifiée | JS/navigateur | **NON RETENU (indisponible)** | Aucun navigateur ni installation autorisée : les tests automatisés d'accessibilité ne peuvent pas être exécutés ici |
| Lighthouse CI | DRI `catalogue` | Budgets perf/a11y | — | Apache-2.0 `[API-gh]` | NON vérifiée | Node | **NON RETENU (indisponible)** | Idem : aucune exécution possible, aucun budget chiffré inventé |
| Templates d'administration (Tabler, shadcn-admin, TailAdmin…) | DRI `catalogue`/doc `08` | Inspiration de structure | — | MIT `[W]`/`[API-gh]` | NON vérifiée | Next/Tailwind/React | **NON RETENU** | Un template tiers n'est pas EM Auth et embarque des fonctions hors première tranche |
| Better Auth, Supabase, Clerk, Stripe, Resend, Vercel… | DRI doc `08` | — | — | — | — | — | **HORS SUJET** | La V3 retient Keycloak/PostgreSQL/BFF ; remplacer une famille retenue serait une **proposition de modification**, non une décision de maquette |
| Rive / Lottie / GSAP / three.js / p5.js | DRI `catalogue` | Animation, 3D | — | — | — | — | **EXCLU** | Aucun besoin V3 ; les effets décoratifs sont proscrits par la direction visuelle |

**Total :** 0 ressource intégrée, 0 dépendance ajoutée, 0 installation.

---

## 3. Critères de sélection appliqués (et ce qui n'a pas pu être vérifié)

| Critère (DRI doc 08 §8.1) | Application ici |
|---|---|
| Licence | *Déclarations* DRI datées du 2026-10-05. **Aucune vérification à la source** n'a été menée : pas de lecture de fichier LICENSE, pas d'appel registry. Toute intégration future exige cette vérification (G5/G6) |
| Coût total | Maquette statique : coût nul, aucune ressource facturée, aucun service |
| Effort d'intégration | Nul (zéro dépendance) ; c'est le critère décisif pour une maquette transférable |
| Autonomie / lock-in | Maximale : HTML/CSS/JS natif, lisible et remplaçable |
| AI-readiness | Sans objet : aucun outil IA introduit |
| Maintenance | Sans objet : aucun code tiers importé |
| Adéquation au contexte | La V3 impose React 19/Vite pour l'interface cible : la maquette **anticipe** des composants traduisibles, sans imposer de bibliothèque |

---

## 4. Points restés INCONNUS (à ne pas présenter comme résolus)

1. **Licences exactes et versions** de toute ressource DRI : non vérifiées à l'usage. `[?]` et `NOASSERTION` ne sont pas des licences.
2. **Compatibilité réelle** avec React 19/Vite : non testée (aucune installation).
3. **Annexes DRI `12*` à `15`** : indisponibles — aucune recommandation n'en dépend, mais un besoin futur (ex. polices, plans étudiants) pourrait s'y trouver.
4. **Identité de marque EM Consulting** (logo, couleurs, polices, droits) : **inconnue** — le brief la pose en question 3. Aucune charte n'est supposée.
5. **Contraintes de confidentialité** d'un transfert vers un SaaS : non décidées (G3), donc aucun envoi.

---

## 5. Porte PH02

| Critère | État |
|---|---|
| Contenu réel de la DRI inventorié | **OUI** (13 fichiers, annexes manquantes signalées) |
| Fichiers liés au design/composants/réutilisation lus | **OUI** (`00`, `01`, `02` partiel, `08`, `catalogue-dri.csv` ciblé) |
| Licence / compatibilité vérifiées avant intégration | **SANS OBJET** — aucune intégration ; les inconnues sont consignées |
| Aucune installation | **OUI** — vérifié (aucun `npm install`, aucun service) |
| Non retenus et raisons | **OUI** (§2) |

**Verdict : PH02 TERMINÉ.** Ressources disponibles inventoriées, critères justifiés, inconnues signalées, zéro composant intégré sans licence vérifiée.
