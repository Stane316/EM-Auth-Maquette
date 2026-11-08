#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur des vues de comparaison PH03 — EM AUTH (maquette fictive).

Pourquoi un générateur : la phase PH03 exige des vues A/B/C aux **mêmes contenus
fictifs**. Générer les 6 pages depuis une source unique garantit que seuls les
jetons visuels et la structure de présentation changent, jamais le texte.

usage : python3 generer_ph03.py
sortie : 02_MAQUETTES/direction-{a,b,c}/{e02-identification,a03-decision-recuperation}.html
Aucune dépendance, aucune requête réseau, aucun service.
"""

from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

DIRECTIONS = {
    "a": {
        "label": "Direction A — Clarté institutionnelle",
        "body": "dir-a",
        "css": "dir-a.css",
        "rail": False,
        "steps": False,
        "mark": False,
    },
    "b": {
        "label": "Direction B — Console de précision",
        "body": "dir-b",
        "css": "dir-b.css",
        "rail": True,
        "steps": False,
        "mark": False,
    },
    "c": {
        "label": "Direction C — Accompagnement humain",
        "body": "dir-c",
        "css": "dir-c.css",
        "rail": False,
        "steps": True,
        "mark": True,
    },
}

# --------------------------------------------------------------------------- #
# Fragments communs
# --------------------------------------------------------------------------- #

HEAD = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — {label} (maquette fictive)</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Maquette fictive EM AUTH, vue de comparaison PH03. Aucune donnée réelle, aucun service connecté.">
<link rel="stylesheet" href="../assets/base.css">
<link rel="stylesheet" href="../assets/{css}">
</head>
<body class="{body}" data-direction="{dir_letter}">
<a class="skip" href="#contenu">Aller au contenu principal</a>
<p class="fiction-banner" role="note"><strong>Maquette fictive</strong> — données inventées, aucun service connecté, aucune preuve de sécurité, de conformité ou de disponibilité.</p>
<header class="site-head">
  <span class="brand">EM AUTH <span class="brand-sub">démonstration</span></span>
  <nav aria-label="Navigation de comparaison">
    <a href="../index.html">Comparer les directions</a>
  </nav>
</header>
"""

FOOT = """<footer class="site-foot">
  <p><strong>{label}</strong> · vue de comparaison PH03 · contenu identique dans les trois directions.</p>
  <p>Maquette statique sans dépendance ni requête réseau. Les fenêtres natives du navigateur (WebAuthn) ne sont pas simulées ici. Contrastes des textes calculés, rendu réel non vérifié par l'agent.</p>
</footer>
</body>
</html>
"""

MARK = """<div class="mark" aria-hidden="true">
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" role="presentation">
    <circle cx="28" cy="28" r="26" stroke="#26355B" stroke-width="2"/>
    <path d="M16 30.5c3.4 0 5.6-2.4 6.4-6.1C23.2 20 25.6 17 28 17s4.8 3 5.6 7.4c.8 3.7 3 6.1 6.4 6.1" stroke="#2F6E5B" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="28" cy="36.5" r="3" fill="#26355B"/>
  </svg>
</div>
"""

# --------------------------------------------------------------------------- #
# E02 — Identification
# --------------------------------------------------------------------------- #

E02_STATES = """<section class="states" aria-labelledby="e02-etats">
  <h2 id="e02-etats">États de l'écran — démonstration statique</h2>
  <p class="state-note">Chaque bloc montre un état tel qu'il serait rendu. Aucune interaction réelle n'est branchée : cette page ne comporte pas de script.</p>

  <div class="panel">
    <h3>Champ vide (validation de forme locale)</h3>
    <p class="state-note">Le focus irait au résumé d'erreur, puis au champ.</p>
    <div class="msg msg-error" role="alert">
      <span class="msg-title">Corrigez la saisie</span>
      <p><a href="#ident-etat">Renseignez votre identifiant.</a></p>
    </div>
    <div class="field">
      <label for="ident-etat">Identifiant</label>
      <p class="hint" id="ident-etat-hint">Identifiant fourni par votre organisation. Ne saisissez jamais de mot de passe ni de code dans ce champ.</p>
      <input id="ident-etat" type="text" value="" aria-invalid="true" aria-describedby="ident-etat-hint ident-etat-err">
      <p class="msg msg-error" id="ident-etat-err" style="margin-top:8px"><span class="msg-title">Erreur</span>Renseignez votre identifiant.</p>
    </div>
  </div>

  <div class="panel">
    <h3>Échec d'authentification (message générique)</h3>
    <p class="state-note">Même famille de réponse pour compte inconnu, désactivé ou preuve erronée : aucune énumération de compte.</p>
    <div class="msg msg-error" role="alert">
      <span class="msg-title">Connexion impossible</span>
      <p>Vérifiez vos informations ou demandez de l'aide.</p>
    </div>
    <p><a href="#">Obtenir de l'aide</a></p>
  </div>

  <div class="panel">
    <h3>Vérification en cours</h3>
    <p class="state-note">Un indicateur de chargement ne certifie pas la réussite.</p>
    <p aria-live="polite">Vérification en cours… Merci de patienter.</p>
    <p><button class="btn btn-secondary" type="button" aria-disabled="true" disabled>Continuer</button></p>
  </div>

  <div class="panel">
    <h3>Issue inconnue après envoi</h3>
    <p class="state-note">La page équivalente est « Résultat non confirmé » (E11) : l'utilisateur ne doit ni lire un succès, ni relancer en boucle.</p>
    <div class="msg msg-unknown" role="status">
      <span class="msg-title">Résultat non confirmé</span>
      <p>La connexion a été interrompue. Nous ne pouvons pas confirmer si votre demande a été traitée. Vérifiez son état avant de recommencer.</p>
    </div>
    <p><a href="#">Vérifier l'état de la demande</a> · <a href="#">Contacter l'assistance prévue</a></p>
  </div>
</section>"""

E02_MAIN = """<main id="contenu" class="shell">
{rail}{content}
</main>
"""

E02_CONTENT = """  <div class="content">
    <div class="panel">
      <p class="lede" style="margin-bottom:4px"><strong>E02 — Identification</strong> · écran public proposé</p>
      <p class="eyebrow">Étape 1 sur 2 — identification</p>
      <h1>Se connecter</h1>
      <p class="lede">Espace de démonstration EM AUTH. Votre organisation vous a communiqué un identifiant.</p>

      <form class="stack" novalidate>
        <div class="field">
          <label for="ident">Identifiant</label>
          <p class="hint" id="ident-hint">Utilisez l'identifiant fourni par votre organisation. Ne saisissez jamais de mot de passe ni de code ici.</p>
          <input id="ident" name="identifiant" type="text" autocomplete="username" spellcheck="false" aria-describedby="ident-hint">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Continuer</button>
        </div>
      </form>

      <p class="help-line"><a href="#">Obtenir de l'aide</a> — sans communiquer de mot de passe, de code, de PIN ni d'image de clé d'accès.</p>
    </div>
  </div>
"""

# --------------------------------------------------------------------------- #
# A03 — Décision de récupération
# --------------------------------------------------------------------------- #

A03_CONTENT = """  <div class="content">
    <div class="panel">
      <p class="lede" style="margin-bottom:4px"><strong>A03 — Décision de récupération</strong> · écran d'administration proposé</p>
      <p class="eyebrow">Demande R-2041 · récupération d'accès</p>
      <h1>Décision de récupération d'accès</h1>
      <p class="lede">Le titulaire a perdu son moyen d'authentification. Une preuve indépendante et un second acteur distinct sont requis avant tout nouvel enrôlement.</p>

      <dl class="defs">
        <dt>Compte</dt><dd><span class="mono">U-0042</span> — compte de démonstration</dd>
        <dt>Moyen perdu</dt><dd>Clé d'accès (passkey) déclarée perdue</dd>
        <dt>Demande reçue</dt><dd><span class="mono">2026-11-08 14:12 UTC</span></dd>
        <dt>Demandeur</dt><dd>K. ADJOVI — support mandaté</dd>
        <dt>Statut</dt><dd><span class="tag tag-pending">En attente d'un second acteur</span></dd>
      </dl>

      <h2>Preuves examinées</h2>
      <ul class="checks">
        <li>
          <span class="check-label">Vérification par canal indépendant <span class="state-note">(canal convenu avec l'organisation)</span></span>
          <span class="tag tag-ok">Vérifiée</span>
        </li>
        <li>
          <span class="check-label">Contrôle du mandat du demandeur</span>
          <span class="tag tag-ok">Vérifié</span>
        </li>
        <li>
          <span class="check-label">Accusé de notification au titulaire</span>
          <span class="tag tag-unknown">Non confirmé</span>
        </li>
        <li>
          <span class="check-label">Second acteur distinct (double contrôle)</span>
          <span class="tag tag-pending">Requis — non fourni</span>
        </li>
      </ul>

      <h2>Double contrôle</h2>
      <div class="msg msg-info">
        <p><strong>Deux personnes distinctes.</strong> Le demandeur ne peut pas approuver sa propre demande. L'approbation par la même personne est impossible dans cette maquette comme dans l'exigence REQ-13-08.</p>
      </div>

      <fieldset style="border:0;padding:0;margin:0 0 16px">
        <legend class="hint" style="font-weight:700;color:var(--ink);margin-bottom:8px">Action à effectuer</legend>
        <div class="btn-row">
          <button class="btn btn-primary" type="button">Demander une seconde validation</button>
          <button class="btn btn-secondary" type="button">Refuser la demande</button>
        </div>
      </fieldset>

      <p class="help-line">Un refus doit être motivé et notifié selon la procédure de l'organisation. Aucun délai ni canal de contact n'est affiché : ils ne sont pas encore convenus.</p>
    </div>
  </div>
"""

A03_STATES = """<section class="states" aria-labelledby="a03-etats">
  <h2 id="a03-etats">États de l'écran — démonstration statique</h2>
  <p class="state-note">Ces états portent le cœur de l'exigence : une preuve manquante, un même acteur ou une réponse perdue ne doivent jamais produire un succès apparent.</p>

  <div class="panel">
    <h3>Preuve insuffisante</h3>
    <div class="msg msg-error" role="alert">
      <span class="msg-title">Demande non recevable en l'état</span>
      <p>La vérification indépendante n'est pas établie. Aucun nouvel authentificateur ne peut être enrôlé. Complétez la vérification ou refusez la demande.</p>
    </div>
    <p><a href="#">Contacter le demandeur par le canal prévu</a></p>
  </div>

  <div class="panel">
    <h3>Le même acteur tente d'approuver</h3>
    <div class="msg msg-warn" role="status">
      <span class="msg-title">Approbation impossible</span>
      <p>Vous êtes le demandeur de cette récupération. L'approbation doit être réalisée par une personne distincte.</p>
    </div>
    <p><button class="btn btn-primary" type="button" aria-disabled="true" disabled>Approuver l'enrôlement</button></p>
  </div>

  <div class="panel">
    <h3>Réponse perdue après envoi</h3>
    <div class="msg msg-unknown" role="status">
      <span class="msg-title">Résultat non confirmé</span>
      <p>La décision a peut-être été enregistrée. Nous ne pouvons pas le confirmer. Vérifiez l'état de la demande avant de recommencer.</p>
    </div>
    <p><a href="#">Vérifier l'état de la demande</a></p>
    <p class="state-note">Aucun renvoi automatique : une opération sensible rejouée en boucle peut créer un doublon.</p>
  </div>

  <div class="panel">
    <h3>Décision prise, enrôlement non réalisé</h3>
    <ul class="checks" style="margin-bottom:12px">
      <li><span class="check-label">Second contrôle</span><span class="tag tag-ok">Fourni</span></li>
      <li><span class="check-label">Retrait de l'ancien facteur</span><span class="tag tag-failed tag-unknown">Non confirmé</span></li>
      <li><span class="check-label">Notification au titulaire</span><span class="tag tag-fail">Échec</span></li>
    </ul>
    <div class="msg msg-warn">
      <span class="msg-title">Décision partielle</span>
      <p>La récupération ne peut pas être close : une notification a échoué et le retrait n'est pas confirmé. Une escalade est nécessaire.</p>
    </div>
  </div>
</section>"""


RAIL = """  <aside class="rail" aria-label="Repères de navigation (démonstration)">
    <h2>Parcours</h2>
    <ul>
      <li class="rail-current">Identification</li>
      <li>Moyen autorisé</li>
      <li>Preuve fraîche</li>
      <li>Application</li>
    </ul>
    <h2 style="margin-top:12px">Contexte</h2>
    <p class="rail-meta">E02 · public<br>Fictif · non testé</p>
  </aside>
"""

RAIL_A03 = """  <aside class="rail" aria-label="Repères de navigation (démonstration)">
    <h2>File de décisions</h2>
    <ul>
      <li>Inscriptions</li>
      <li class="rail-current">Récupérations (1)</li>
      <li>Retraits</li>
      <li>Journal</li>
    </ul>
    <h2 style="margin-top:12px">Contexte</h2>
    <p class="rail-meta">A03 · administration<br>R-2041 · fictif</p>
  </aside>
"""

STEPS_A03 = """<ol class="steps" aria-label="Étapes de la procédure">
  <li aria-current="step"><span class="step-num">1.</span> Demande reçue</li>
  <li><span class="step-num">2.</span> Preuve indépendante</li>
  <li><span class="step-num">3.</span> Second acteur</li>
  <li><span class="step-num">4.</span> Nouvel enrôlement</li>
</ol>
"""


def build(direction_key: str, cfg: dict) -> None:
    title_suffix = cfg["label"]
    shell_parts = {}

    for screen, content, states, rail_text in (
        ("e02-identification", E02_CONTENT, E02_STATES, RAIL),
        ("a03-decision-recuperation", A03_CONTENT, A03_STATES, RAIL_A03),
    ):
        content_final = content
        if cfg["mark"] and screen == "e02-identification":
            content_final = content_final.replace(
                '<h1>Se connecter</h1>', MARK + '<h1>Se connecter</h1>'
            )
        if cfg["mark"] and screen == "a03-decision-recuperation":
            content_final = content_final.replace(
                '<h1>Décision de récupération d\'accès</h1>',
                MARK + '<h1>Décision de récupération d\'accès</h1>',
            )
        if cfg["steps"] and screen == "a03-decision-recuperation":
            content_final = content_final.replace(
                "<dl class=\"defs\">", STEPS_A03 + "\n      <dl class=\"defs\">"
            )

        rail = rail_text if cfg["rail"] else ""
        page_title = "Se connecter" if screen.startswith("e02") else "Décision de récupération d'accès"

        html = (
            HEAD.format(title=page_title, label=title_suffix, css=cfg["css"],
                        body=cfg["body"], dir_letter=direction_key.upper())
            + E02_MAIN.format(rail=rail, content=content_final)
            + states
            + "\n"
            + FOOT.format(label=title_suffix)
        )

        out_dir = BASE / f"direction-{direction_key}"
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / f"{screen}.html").write_text(html, encoding="utf-8")
        print(f"écrit : {out_dir.name}/{screen}.html ({len(html)} octets)")


if __name__ == "__main__":
    for key, cfg in DIRECTIONS.items():
        build(key, cfg)
