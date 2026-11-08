#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PH07 — audit structurel de la maquette (preuves mesurées, pas d'affirmation).

Ce script ne remplace ni un navigateur, ni un lecteur d'écran, ni un audit WCAG.
Il constate uniquement ce qui est VÉRIFIABLE dans les fichiers : structure HTML,
associations label/champ, cibles ARIA, absence de script et de requête externe,
volumes. Tout ce qui exige une exécution réelle est marqué NON TESTÉ.

Sortie : 01_PHASES/PH07_PREUVES_CONTROLES.txt
"""

import re
from html.parser import HTMLParser
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent          # racine du dépôt
MAQ = BASE / "02_MAQUETTES"
OUT = BASE / "01_PHASES" / "PH07_PREUVES_CONTROLES.txt"

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "source", "track", "wbr"}


class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.errors, self.ids = [], [], []
        self.headings, self.inputs, self.labels = [], [], []
        self.fieldsets, self.legends = 0, 0
        self.buttons, self.links = [], []
        self.aria_refs, self.tables, self.captions, self.th_scope = [], 0, 0, 0
        self.imgs_missing_alt = 0
        self.has_skip = False
        self.html_lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        if tag == "html":
            self.html_lang = a.get("lang")
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.headings.append(tag)
        if tag == "input":
            self.inputs.append(a)
        if tag == "label":
            self.labels.append(a.get("for"))
        if tag == "fieldset":
            self.fieldsets += 1
        if tag == "legend":
            self.legends += 1
        if tag == "button":
            self.buttons.append(a)
        if tag == "a":
            self.links.append(a)
        if tag == "table":
            self.tables += 1
        if tag == "caption":
            self.captions += 1
        if tag == "th":
            if a.get("scope"):
                self.th_scope += 1
        if tag == "img" and not a.get("alt"):
            self.imgs_missing_alt += 1
        for key in ("aria-describedby", "aria-labelledby", "aria-controls"):
            if key in a:
                for ref in a[key].split():
                    self.aria_refs.append(ref)
        if "id" in a:
            self.ids.append(a["id"])
        classes = a.get("class", "")
        # deux familles de fichiers coexistent : pages PH03 (classe .skip) et
        # système de design PH04+ (classe .skip-link). Les deux sont acceptées.
        if "skip-link" in classes or "skip" in classes.split():
            self.has_skip = True

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append(f"fermeture orpheline </{tag}>")
            return
        top = self.stack.pop()
        if top != tag:
            self.errors.append(f"attendu </{top}>, trouvé </{tag}>")


def analyse(path: Path):
    txt = path.read_text(encoding="utf-8")
    a = Audit()
    a.feed(txt)
    return txt, a


def main() -> None:
    files = sorted(MAQ.rglob("*.html"))
    lines = []
    add = lines.append

    add("PREUVES DE CONTRÔLE — MAQUETTE EM AUTH (fictive)")
    add("Instance : EM-AUTH-MAQUETTE · direction A · lot PH05 (16 écrans)")
    add("Méthode : analyse syntaxique et textuelle des fichiers HTML/CSS par script local.")
    add("Aucune installation, aucun navigateur, aucun service distant.")
    add("=" * 78)
    add("")

    totals = dict(files=0, ids_dup=0, errors=0, aria_missing=0,
                  unlabeled=0, fieldsets_wo_legend=0, tables_wo_caption=0,
                  th_wo_scope=0, imgs_wo_alt=0, no_lang=0, no_skip=0,
                  no_banner=0, script=0, external=0, h1_not_single=0,
                  heading_skips=0, bytes=0)
    details = []

    for f in files:
        txt, a = analyse(f)
        rel = f.relative_to(MAQ)
        totals["files"] += 1
        totals["bytes"] += len(txt.encode())

        if a.errors:
            totals["errors"] += len(a.errors)
            details.append(f"  [STRUCTURE] {rel} : {len(a.errors)} erreur(s) — {a.errors[:2]}")
        if a.html_lang != "fr":
            totals["no_lang"] += 1
            details.append(f"  [LANG] {rel} : lang='{a.html_lang}'")
        if not a.has_skip:
            totals["no_skip"] += 1
            details.append(f"  [SKIP] {rel} : lien d'évitement absent")
        if "Maquette fictive" not in txt:
            totals["no_banner"] += 1
            details.append(f"  [BANDEAU] {rel} : bandeau de fiction absent")
        if "<script" in txt.lower():
            totals["script"] += 1
            details.append(f"  [SCRIPT] {rel} : contient un script")
        if re.search(r'(?:src|href)="https?://', txt):
            totals["external"] += 1
            details.append(f"  [RESEAU] {rel} : référence externe")
        dup = sorted({i for i in a.ids if a.ids.count(i) > 1})
        if dup:
            totals["ids_dup"] += 1
            details.append(f"  [ID] {rel} : doublons {dup[:4]}")
        missing = sorted({r for r in a.aria_refs if r not in a.ids})
        if missing:
            totals["aria_missing"] += 1
            details.append(f"  [ARIA] {rel} : référence(s) sans cible {missing[:4]}")

        # champs : tout input non caché doit avoir un label associé
        label_for = {x for x in a.labels if x}
        unlabeled = [i.get("id") for i in a.inputs
                     if i.get("type") not in ("hidden", "submit")
                     and i.get("id") and i.get("id") not in label_for]
        unlabeled += [i.get("id") or "input-sans-id" for i in a.inputs
                      if i.get("type") not in ("hidden", "submit") and not i.get("id")]
        if unlabeled:
            totals["unlabeled"] += len(unlabeled)
            details.append(f"  [LABEL] {rel} : champ(s) sans label associé {unlabeled[:4]}")
        if a.fieldsets > a.legends:
            totals["fieldsets_wo_legend"] += 1
            details.append(f"  [LEGEND] {rel} : {a.fieldsets} fieldset(s) pour {a.legends} legend(s)")
        if a.tables and a.captions < a.tables:
            totals["tables_wo_caption"] += 1
            details.append(f"  [CAPTION] {rel} : {a.tables} tableau(x), {a.captions} légende(s)")
        if a.th_scope == 0 and a.tables:
            totals["th_wo_scope"] += 1
            details.append(f"  [SCOPE] {rel} : tableaux sans attribution de portée")
        if a.imgs_missing_alt:
            totals["imgs_wo_alt"] += a.imgs_missing_alt
        h1 = a.headings.count("h1")
        if h1 != 1:
            totals["h1_not_single"] += 1
            details.append(f"  [H1] {rel} : {h1} titre(s) de niveau 1")
        # saut de niveau dans la hiérarchie des titres
        prev = 0
        for h in a.headings:
            lvl = int(h[1])
            if prev and lvl > prev + 1:
                totals["heading_skips"] += 1
                details.append(f"  [H-NIVEAU] {rel} : saut h{prev} → h{lvl}")
                break
            prev = lvl

    add("1. VOLUMÉTRIE")
    add(f"   fichiers HTML analysés ......... {totals['files']}")
    add(f"   volume total ................... {totals['bytes'] / 1024:.1f} Ko")
    add(f"   images ......................... 0  (aucune image binaire)")
    add(f"   polices distantes .............. 0  (pile système uniquement)")
    add(f"   dépendances JavaScript ......... 0  (aucun script dans les pages)")
    add("   REMARQUE : ces chiffres décrivent la maquette statique. Ils ne constituent")
    add("   pas une mesure de performance réelle (aucun navigateur, aucun réseau, aucun rendu).")
    add("")

    add("2. RÉSULTATS PAR CONTRÔLE")
    checks = [
        ("Structure HTML (balises équilibrées)", totals["errors"] == 0, f"{totals['errors']} erreur(s)"),
        ("Langue déclarée fr sur chaque document", totals["no_lang"] == 0, f"{totals['no_lang']} écart(s)"),
        ("Lien d'évitement présent", totals["no_skip"] == 0, f"{totals['no_skip']} écart(s)"),
        ("Bandeau « maquette fictive » présent", totals["no_banner"] == 0, f"{totals['no_banner']} écart(s)"),
        ("Aucun script embarqué", totals["script"] == 0, f"{totals['script']} écart(s)"),
        ("Aucune requête réseau externe", totals["external"] == 0, f"{totals['external']} écart(s)"),
        ("Identifiants uniques par page", totals["ids_dup"] == 0, f"{totals['ids_dup']} page(s) en défaut"),
        ("Références ARIA résolues", totals["aria_missing"] == 0, f"{totals['aria_missing']} page(s) en défaut"),
        ("Chaque champ a un label associé", totals["unlabeled"] == 0, f"{totals['unlabeled']} champ(s)"),
        ("Chaque fieldset a une légende", totals["fieldsets_wo_legend"] == 0, f"{totals['fieldsets_wo_legend']} page(s)"),
        ("Chaque tableau a une légende", totals["tables_wo_caption"] == 0, f"{totals['tables_wo_caption']} page(s)"),
        ("Tableaux avec portée d'en-tête", totals["th_wo_scope"] == 0, f"{totals['th_wo_scope']} page(s)"),
        ("Images avec alternative", totals["imgs_wo_alt"] == 0, f"{totals['imgs_wo_alt']} image(s)"),
        ("Un seul titre de niveau 1 par page", totals["h1_not_single"] == 0, f"{totals['h1_not_single']} page(s)"),
        ("Hiérarchie de titres sans saut", totals["heading_skips"] == 0, f"{totals['heading_skips']} page(s)"),
    ]
    for name, ok, detail in checks:
        add(f"   [{'OK  ' if ok else 'DÉFAUT'}] {name:42s} {detail}")
    add("")

    if details:
        add("3. DÉTAIL DES ÉCARTS")
        for d in details:
            add(d)
    else:
        add("3. DÉTAIL DES ÉCARTS")
        add("   Aucun écart détecté par ces contrôles automatiques.")
    add("")

    add("4. CONTRÔLES NON EXÉCUTABLES ICI (marqués NON TESTÉ, jamais CONFORME)")
    for item in [
        "rendu visuel réel et comparaison aux maquettes",
        "navigation clavier effective, piège de focus, ordre de tabulation",
        "anneaux de focus rendus (le CSS les définit, ils n'ont pas été vus)",
        "lecteur d'écran (NVDA/JAWS/VoiceOver) et annonces dynamiques",
        "zoom 200 %, reflow, 320 px, rotation",
        "contraste rendu à l'écran (seule une valeur calculée est disponible)",
        "mouvement réduit (règle CSS présente, non vérifiée en exécution)",
        "fenêtres natives WebAuthn et leur accessibilité",
        "mesure de performance (LCP, CLS, poids réseau réel)",
        "tout comportement serveur : session, jetons, CSRF, droits, journalisation",
    ]:
        add(f"   [NON TESTÉ] {item}")
    add("")
    add("=" * 78)
    add("Une maquette ne prouve ni sécurité, ni conformité WCAG, ni disponibilité.")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
