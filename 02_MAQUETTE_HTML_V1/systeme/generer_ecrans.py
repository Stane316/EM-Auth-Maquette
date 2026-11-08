#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PH05 — générateur des écrans retenus (lot de 16 écrans, décision D-007).

Sources : les 22 prompts de 04_SCREEN_SPECIFIC_PROMPTS (lus intégralement), le
cahier V3, l'inventaire E/A et le système de design de la direction A (PH04).
Aucune donnée réelle, aucun service, aucun script embarqué : les états sont rendus
statiquement pour être relus et comparés.

Lot retenu : E01 E02 E03 E04 E05 E06 E07 E08 E10 E11 E12 E13 A02 A03 A04 A08  (16)
Hors lot   : A01 A05 A06 A07 A09 (différés — voir PH05_RAPPORT.md)
"""

from pathlib import Path
import re
from html import escape

BASE = Path(__file__).resolve().parent.parent
OUT = BASE / "ecrans"


# --------------------------------------------------------------------------- #
# Petits composants HTML (aucune dépendance)
# --------------------------------------------------------------------------- #

def msg(kind: str, title: str, text: str, extra: str = "") -> str:
    return (f'<div class="msg msg--{kind}"><span class="msg__title">{title}</span>'
            f'<p>{text}</p>{extra}</div>')


def tag(kind: str, text: str) -> str:
    return f'<span class="tag tag--{kind}">{text}</span>'


def btn(label: str, variant: str = "primary", attrs: str = "") -> str:
    cls = f"btn btn--{variant}"
    return f'<button class="{cls}" type="button" {attrs}>{label}</button>'


def link_btn(label: str, href: str, variant: str = "secondary") -> str:
    return f'<a class="btn btn--{variant}" href="{href}">{label}</a>'


def field(fid: str, label: str, hint: str = "", value: str = "",
          invalid: bool = False, required: str = "", err: str = "") -> str:
    described = f' aria-describedby="{fid}-hint' + (f' {fid}-err' if invalid else '') + '"' if hint or invalid else ""
    inv = ' aria-invalid="true"' if invalid else ""
    out = ['<div class="field">',
           f'<label for="{fid}">{label} {required}</label>']
    if hint:
        out.append(f'<p class="hint" id="{fid}-hint">{hint}</p>')
    out.append(f'<input class="input" id="{fid}" type="text" value="{escape(value)}"{inv}{described}>')
    if invalid and err:
        out.append(f'<p class="msg msg--error" id="{fid}-err" style="margin-top:8px">'
                   f'<span class="msg__title">Erreur</span>{err}</p>')
    out.append('</div>')
    return "".join(out)


def native_sim(text: str) -> str:
    return ('<div class="native-sim"><span class="native-sim__badge">Simulation — interface non maîtrisée par EM AUTH</span>'
            f'<p style="margin-bottom:0">{text}</p></div>')


# --------------------------------------------------------------------------- #
# Données des 17 écrans
# --------------------------------------------------------------------------- #

SCREENS = []

# --- E01 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E01", titre="Accéder à votre application", nom="Invitation et accueil",
    trace="M02 · REQ-13-03/04", layout="form",
    acteur="Destinataire d'une invitation vérifiée",
    rendu="Page publique — thème Keycloak ou page du BFF (à arbitrer)",
    vue=f"""
    <p class="eyebrow">Invitation · étape 1</p>
    <h1>Accéder à votre application</h1>
    <p class="lede">Votre organisation vous a adressé une invitation nominative. Elle ne confirme pas à elle seule votre identité : la vérification du destinataire et le mandat sont contrôlés séparément.</p>
    <dl class="defs">
      <dt>Application</dt><dd>Application interne de démonstration <span class="mono">(fictive)</span></dd>
      <dt>Invité</dt><dd>Compte de démonstration <span class="mono">U-0042</span></dd>
      <dt>Validité</dt><dd>Usage unique — durée <span class="mono">[à convenir]</span></dd>
    </dl>
    <p class="hint">Aucun numéro, aucune adresse et aucun horaire d'assistance ne sont affichés : ces informations ne sont pas encore convenues.</p>
    <div class="btn-row">
      {btn("Continuer")}
      <a href="#" class="btn btn--quiet">Besoin d'aide</a>
    </div>
    """,
    etats=[
        dict(nom="Lien valide", declencheur="Ouverture d'un lien d'invitation non expiré et non rejoué",
             actions="Continuer ; Besoin d'aide", destination="E02 — Identification",
             html=msg("info", "Invitation reconnue",
                      "Vous pouvez poursuivre l'enrôlement. L'invitation reste à usage unique : elle sera consommée à l'activation.")),
        dict(nom="Traitement", declencheur="Après activation de « Continuer »",
             actions="Aucune (en attente) ; l'utilisateur peut fermer la page", destination="E02 si le traitement aboutit",
             html=msg("info", "Vérification de l'invitation en cours",
                      "Ne fermez pas cette page. Un indicateur de chargement ne signifie pas que l'invitation a été acceptée.")),
        dict(nom="Expiré ou rejoué", declencheur="Lien hors validité, déjà consommé, ou destinataire non concordant",
             actions="Demander une nouvelle invitation (via l'organisation) ; aucun détail sur le compte",
             destination="Procédure d'aide — hors application",
             html=msg("error", "Ce lien ne peut pas être utilisé",
                      "Demandez une nouvelle invitation par le canal prévu par votre organisation. Aucun compte n'a été activé.")),
    ],
    annotations=[
        ("Ordre clavier", "Lien d'évitement → titre → contenu → « Continuer » → « Besoin d'aide ». Aucun contrôle masqué dans l'ordre de tabulation."),
        ("Annonce d'état", "Le passage en « Traitement » modifie une zone <code>aria-live=\"polite\"</code> unique ; aucun message n'est répété."),
        ("Retour de focus", "En cas de refus, le focus va au titre du message d'erreur ; le bloc est annoncé une seule fois."),
        ("Zoom 200 %", "Aucune information ne dépend d'une largeur fixe ; le contenu doit se réorganiser en une colonne (non testé)."),
    ],
    limites=["Aucun template d'invitation, aucune durée de validité et aucun canal d'envoi ne sont décidés : les valeurs restent « à convenir ».",
             "La vérification réelle du destinataire et l'usage unique sont des comportements serveur, non démontrables par une maquette."],
))

# --- E02 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E02", titre="Se connecter", nom="Identification",
    trace="M03 · REQ-13-06/07", layout="form",
    acteur="Utilisateur (ordinaire ou privilégié)",
    rendu="Page de connexion — thème Keycloak (à arbitrer)",
    vue=f"""
    <p class="eyebrow">Identification · étape 1 sur 2</p>
    <h1>Se connecter</h1>
    <p class="lede">Espace de démonstration EM AUTH. Votre organisation vous a communiqué un identifiant.</p>
    {field("ident", "Identifiant", "Utilisez l'identifiant fourni par votre organisation. Ne saisissez jamais de mot de passe ni de code ici.", required='<span class="required">(obligatoire)</span>')}
    <div class="btn-row">{btn("Continuer")}</div>
    <p class="help-line"><a href="#">Obtenir de l'aide</a> — sans communiquer de mot de passe, de code, de PIN ni d'image de clé d'accès.</p>
    """,
    etats=[
        dict(nom="Vide", declencheur="Soumission sans identifiant",
             actions="Corriger la saisie", destination="Même écran, focus sur le résumé d'erreur",
             html=msg("error", "Corrigez la saisie", "Renseignez votre identifiant.")),
        dict(nom="Saisie", declencheur="Frappe dans le champ, sans soumission",
             actions="Continuer ; Obtenir de l'aide", destination="E03 — Choix du moyen autorisé",
             html=field("ident2", "Identifiant", "Saisie en cours. Aucun préremplissage : sur un poste partagé, l'identifiant précédent ne doit pas apparaître.", value="u.0042")),
        dict(nom="Attente", declencheur="Après « Continuer », pendant la vérification",
             actions="Aucune action sensible ; abandon possible", destination="E03 ou échec générique",
             html=msg("info", "Vérification en cours", "Merci de patienter. Une réponse n'est pas encore disponible.")),
        dict(nom="Échec générique", declencheur="Identifiant inconnu, compte désactivé ou preuve erronée",
             actions="Réessayer ; Obtenir de l'aide", destination="E02 (nouvelle tentative) ou aide",
             html=msg("error", "Connexion impossible",
                      "Vérifiez vos informations ou demandez de l'aide.") +
                  '<p class="small muted">Même message pour un compte inexistant, suspendu ou une preuve erronée : aucune indication sur l\'existence du compte.</p>'),
    ],
    annotations=[
        ("Ordre clavier", "Titre → champ « Identifiant » → « Continuer » → « Obtenir de l'aide »."),
        ("Annonce d'état", "L'échec est annoncé par <code>role=\"alert\"</code> ; le message est unique et non dupliqué dans le résumé."),
        ("Retour de focus", "Après échec, focus sur le résumé d'erreur puis sur le champ, sans perte de la saisie non sensible."),
        ("Zoom 200 %", "Le formulaire tient sur une colonne ; aucune troncature attendue (non testé)."),
    ],
    limites=["Aucune politique de verrouillage, de temporisation ni de limitation de tentatives n'est décidée : la maquette ne montre donc aucun compteur.",
             "La résistance à l'énumération (timing, codes) est un comportement serveur, non démontrable ici."],
))

# --- E03 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E03", titre="Choisir comment vous connecter", nom="Choix du moyen autorisé",
    trace="M03 · REQ-13-05/06", layout="form",
    acteur="Utilisateur identifié",
    rendu="Page de connexion (thème Keycloak) ou page du BFF (à arbitrer)",
    vue=f"""
    <p class="eyebrow">Moyen d'authentification · étape 2 sur 2</p>
    <h1>Choisir comment vous connecter</h1>
    <p class="lede">Seules les méthodes autorisées pour votre compte et votre rôle sont proposées. Aucune méthode plus faible n'est substituée automatiquement.</p>
    <fieldset>
      <legend>Méthodes disponibles</legend>
      <label class="choice" for="m1"><input type="radio" id="m1" name="moyen" checked>
        <span class="choice__body"><span class="choice__title">Utiliser votre clé d'accès</span>Enregistrée sur cet appareil. Le navigateur ou le système peut demander sa propre vérification.</span></label>
      <label class="choice" for="m2"><input type="radio" id="m2" name="moyen">
        <span class="choice__body"><span class="choice__title">Utiliser une clé de sécurité</span>Boîtier personnel à brancher ou à approcher. Disponibilité non garantie sur ce poste.</span></label>
    </fieldset>
    <div class="btn-row">{btn("Continuer")}</div>
    <p class="help-line"><a href="#">Je ne peux pas utiliser ces moyens</a> — ouvre la procédure d'aide (E07).</p>
    """,
    etats=[
        dict(nom="Méthodes autorisées", declencheur="Identification suffisante et politique applicable",
             actions="Choisir une méthode ; Continuer", destination="E04 — Défi et preuve fraîche",
             html='<p>Deux méthodes sont proposées. La liste ne contient que les moyens autorisés par la politique pour ce compte.</p>'),
        dict(nom="Aucune méthode disponible", declencheur="Aucun facteur utilisable sur cet appareil, ou politique vide",
             actions="Contacter l'assistance prévue ; aucune dégradation automatique",
             destination="E07 — Perte ou aide",
             html=msg("warn", "Impossible de poursuivre avec les moyens disponibles",
                      "Contactez l'assistance prévue par votre organisation. Aucune méthode de secours plus faible ne sera proposée automatiquement.")),
        dict(nom="Aide", declencheur="Activation de « Je ne peux pas utiliser ces moyens »",
             actions="Demander de l'aide", destination="E07 — Perte ou aide",
             html=msg("info", "Vous serez accompagné", "La procédure d'aide vérifie votre identité par un canal indépendant avant tout nouvel enrôlement.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → groupe de choix (flèches haut/bas entre options) → « Continuer » → lien d'aide."),
        ("Annonce d'état", "L'absence de méthode disponible est annoncée dans la zone de statut ; aucune liste vide silencieuse."),
        ("Retour de focus", "Après fermeture de l'aide, retour au lien « Je ne peux pas utiliser ces moyens »."),
        ("Zoom 200 %", "Les choix s'empilent verticalement ; les libellés restent entièrement visibles (non testé)."),
    ],
    limites=["La liste réelle des méthodes autorisées dépend de la politique Keycloak, non décidée : la maquette les présente comme une hypothèse.",
             "L'affichage après identification suffisante est une contrainte anti-énumération à vérifier côté serveur."],
))

# --- E04 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E04", titre="Confirmer votre identité", nom="Défi et preuve fraîche",
    trace="M03/M08 · REQ-13-05/20", layout="form",
    acteur="Utilisateur en cours d'authentification ou d'action sensible",
    rendu="Page d'attente EM AUTH + fenêtre native du navigateur/système",
    vue=f"""
    <p class="eyebrow">Preuve · le navigateur peut prendre la main</p>
    <h1>Confirmer votre identité</h1>
    <p class="lede">Votre navigateur ou votre appareil va afficher sa propre fenêtre de vérification. EM AUTH ne contrôle ni son apparence, ni sa langue, ni son accessibilité.</p>
    {native_sim("« Vérifiez votre identité » : l'appareil peut proposer son propre déverrouillage (code, empreinte, visage). <strong>EM AUTH ne demande jamais votre PIN et ne le reçoit jamais.</strong>")}
    <p class="hint" style="margin-top:16px">Aucun succès n'est affiché avant la vérification côté serveur. Si la fenêtre est fermée sans réponse, rien n'est validé.</p>
    <div class="btn-row">{btn("Continuer")}{btn("Annuler", "secondary")}{btn("Besoin d'aide", "quiet")}</div>
    """,
    états=None,
    etats=[
        dict(nom="Prêt", declencheur="Moyen choisi en E03", actions="Continuer ; Annuler", destination="Fenêtre native puis retour",
             html='<p>La page attend le déclenchement de la vérification par l\'utilisateur. Aucune action automatique.</p>'),
        dict(nom="Fenêtre native", declencheur="Activation de « Continuer »",
             actions="Poursuivre ou annuler dans la fenêtre système", destination="Retour sur la page EM AUTH avec un résultat",
             html=native_sim("Fenêtre rendue par l'appareil. Si elle échoue ou est absente, EM AUTH revient en état « non vérifié », sans repli faible.")),
        dict(nom="Annulé", declencheur="Fermeture de la fenêtre native ou « Annuler »",
             actions="Réessayer ; Demander de l'aide", destination="E04 ou E07",
             html=msg("warn", "Vérification non terminée", "Vous pouvez réessayer ou demander de l'aide. Aucune session n'a été ouverte.")),
        dict(nom="Expiré", declencheur="Délai du défi dépassé <span class=\"mono\">[seuil à convenir]</span>",
             actions="Relancer explicitement une nouvelle demande", destination="E04 (nouveau défi) ou E02",
             html=msg("warn", "Cette demande a expiré", "Relancez la vérification depuis le début. Aucune relance automatique n'est effectuée.")),
        dict(nom="Non vérifié", declencheur="Retour de la fenêtre native sans preuve exploitable",
             actions="Réessayer ; Aide", destination="E04 ou E07 ; jamais E05",
             html=msg("error", "Vérification non aboutie", "Aucune preuve n'a été reçue. Vous pouvez réessayer ou demander de l'aide.")),
    ],
    annotations=[
        ("Ordre clavier", "Le focus revient à la page après la fenêtre native, sur le titre de statut, jamais sur un bouton d'action sensible."),
        ("Annonce d'état", "Le résultat est annoncé une seule fois ; un retour silencieux n'annonce ni succès ni échec."),
        ("Retour de focus", "Après échec, focus sur le message ; après succès, sur le titre de la page suivante."),
        ("Zoom 200 %", "La simulation de fenêtre native se réorganise ; le texte reste lisible (non testé)."),
    ],
    limites=["La fenêtre native n'est pas maîtrisée : sa langue, son accessibilité et son ergonomie ne peuvent pas être garanties par EM AUTH.",
             "La fraîcheur de la preuve (durée, plafond depuis la dernière authentification forte) est un comportement serveur non montrable.",
             "Aucune simulation interactive : les états sont rendus statiquement."],
))
SCREENS[-1].pop("états", None)

# --- E05 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E05", titre="Connexion en cours", nom="Transition vers l'application",
    trace="M07 · REQ-13-16/36", layout="form",
    acteur="Utilisateur authentifié + système",
    rendu="BFF — page de transition (peu ou pas d'interface)",
    vue=f"""
    <p class="eyebrow">Transition · aucun code, aucun jeton affiché</p>
    <h1>Connexion en cours</h1>
    <p class="lede">Nous transférons votre session vers l'application de démonstration. Aucun code, aucun jeton et aucune adresse sensible ne sont affichés.</p>
    <p aria-live="polite"><strong>Vérification de la session…</strong></p>
    <p class="hint">Si le transfert n'aboutit pas, aucun accès n'est accordé et vous serez orienté vers l'aide ou vers l'état « Résultat non confirmé ».</p>
    """,
    etats=[
        dict(nom="Chargement", declencheur="Retour d'authentification validé côté serveur",
             actions="Aucune (attente courte)", destination="Application de démonstration",
             html=msg("info", "Transition en cours", "Merci de patienter. Cette page ne dure que le temps du transfert.")),
        dict(nom="Transfert confirmé", declencheur="Session serveur établie et vérifiée",
             actions="Arriver dans l'application", destination="Application interne de démonstration",
             html=msg("ok", "Connexion confirmée", "Vous accédez à l'application de démonstration. Les droits sont contrôlés par l'application à chaque requête.")),
        dict(nom="Retour échoué", declencheur="Paramètres de retour invalides ou transaction non retrouvée",
             actions="Recommencer ; Aide", destination="E02 ou E07",
             html=msg("error", "La connexion n'a pas abouti", "Recommencez la connexion. Si le problème persiste, demandez de l'aide. Aucune session n'a été ouverte.")),
        dict(nom="Résultat inconnu", declencheur="Réponse du fournisseur non reçue après envoi",
             actions="Voir l'état de la demande", destination="E11 — Résultat non confirmé",
             html=msg("unknown", "Résultat non confirmé", "Nous ne pouvons pas confirmer si la connexion a abouti. Vérifiez son état avant de recommencer.")),
    ],
    annotations=[
        ("Ordre clavier", "Page sans contrôle interactif pendant le chargement ; un lien d'aide reste atteignable si un délai anormal se produit."),
        ("Annonce d'état", "Chaque changement est annoncé une seule fois ; pas d'animation de chargement infinie."),
        ("Retour de focus", "Sur échec, focus sur le titre du message ; sur succès, la page suivante reprend le focus au début."),
        ("Zoom 200 %", "Le message reste lisible en une colonne (non testé)."),
    ],
    limites=["Aucun échange OIDC réel n'est effectué : la maquette ne démontre ni validation d'émetteur, d'audience, de signature, d'état ni de nonce.",
             "La conservation des jetons côté serveur est une propriété du BFF, non visible dans une maquette."],
))

# --- E06 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E06", titre="Se déconnecter de cette application", nom="Fin de session",
    trace="M08/M12 · REQ-13-19/31", layout="form",
    acteur="Utilisateur",
    rendu="Thème Keycloak (logout) ou page du BFF (à arbitrer)",
    vue=f"""
    <p class="eyebrow">Déconnexion · portée limitée</p>
    <h1>Se déconnecter de cette application</h1>
    <p class="lede">La déconnexion met fin à la session de <strong>cette application</strong>. D'autres applications ou le fournisseur d'identité peuvent rester connectés : EM AUTH ne le promettra pas sans preuve.</p>
    <ul class="checks">
      <li><span class="check-label">Session de cette application</span>{tag("pending", "Sera invalidée")}</li>
      <li><span class="check-label">Autres applications</span>{tag("neutral", "Non vérifié")}</li>
      <li><span class="check-label">Fournisseur d'identité</span>{tag("neutral", "Non vérifié")}</li>
    </ul>
    <div class="btn-row">{btn("Se déconnecter")}{btn("Annuler", "secondary")}</div>
    <p class="hint">Sur un appareil partagé, verrouillez le poste après la déconnexion et suivez les consignes de votre organisation.</p>
    """,
    etats=[
        dict(nom="Confirmation", declencheur="Ouverture de la page de déconnexion",
             actions="Se déconnecter ; Annuler", destination="État suivant ou retour à l'application",
             html='<p>La portée est explicitée avant l\'action, pas après.</p>'),
        dict(nom="Fin locale confirmée", declencheur="Invalidation de session confirmée par le serveur de l'application",
             actions="Fermer l'onglet ; se reconnecter", destination="Page publique",
             html=msg("ok", "Vous êtes déconnecté de cette application",
                      "D'autres applications ou votre fournisseur d'identité peuvent rester connectés. Sur un appareil partagé, verrouillez le poste.")),
        dict(nom="Résultat incertain", declencheur="Aucune confirmation d'invalidation reçue",
             actions="Contacter l'assistance prévue ; éviter de laisser le poste accessible", destination="E11 / procédure d'aide",
             html=msg("unknown", "Nous ne pouvons pas confirmer la déconnexion",
                      "Contactez l'assistance prévue et évitez de laisser le poste accessible. Fermer la fenêtre ne prouve pas la fin de la session.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → liste de portée (lecture) → « Se déconnecter » → « Annuler »."),
        ("Annonce d'état", "Le résultat est annoncé une fois ; l'état « incertain » n'est jamais remplacé par un succès."),
        ("Retour de focus", "Après annulation, retour à l'application d'origine ; après succès, focus sur le titre de la page publique."),
        ("Zoom 200 %", "La liste de portée s'empile ; les étiquettes restent lisibles (non testé)."),
    ],
    limites=["La déconnexion globale (autres RP, fournisseur d'identité) n'est pas démontrée et ne doit pas être promise.",
             "L'invalidation serveur est un comportement non visible dans une maquette."],
))

# --- E07 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E07", titre="Vous ne pouvez plus vous connecter ?", nom="Perte ou aide",
    trace="M04/M12 · REQ-13-08/09/30", layout="form",
    acteur="Utilisateur ayant perdu un moyen, ou en difficulté",
    rendu="Page publique EM AUTH (BFF)",
    vue=f"""
    <p class="eyebrow">Demande d'aide · aucune confirmation de compte</p>
    <h1>Vous ne pouvez plus vous connecter ?</h1>
    <p class="lede">Indiquez seulement l'identifiant que vous utilisez habituellement. Cette demande ne confirme pas l'existence d'un compte et ne remplace pas la vérification d'identité.</p>
    {msg("warn", "Ne communiquez jamais vos secrets",
         "L'assistance ne vous demandera jamais votre mot de passe, un code, un PIN, une image de clé d'accès ni une copie de pièce d'identité par défaut.")}
    {field("demande-ident", "Identifiant utilisé", "Ne saisissez pas d'adresse électronique si votre organisation utilise un identifiant court.")}
    {field("demande-desc", "Que se passe-t-il ?", "Décrivez brièvement : appareil perdu, clé cassée, changement de poste. Aucun détail sensible.", required='<span class="required">(facultatif)</span>')}
    <div class="btn-row">{btn("Demander de l'aide")}{btn("Annuler", "secondary")}</div>
    """,
    etats=[
        dict(nom="Demande", declencheur="Ouverture de la page depuis E03, E04 ou E06",
             actions="Envoyer la demande ; Annuler", destination="État suivant",
             html='<p>Aucun numéro, aucun horaire et aucun délai ne sont affichés : ils ne sont pas convenus.</p>'),
        dict(nom="Attente", declencheur="Envoi de la demande",
             actions="Aucune (attente) ; quitter la page possible", destination="E08 si un suivi est autorisé",
             html=msg("info", "Demande en cours d'enregistrement", "Ne renvoyez pas la demande en boucle ; un doublon peut retarder le traitement.")),
        dict(nom="Réponse générique", declencheur="Demande enregistrée, quel que soit l'état du compte",
             actions="Suivre la demande si un moyen de suivi est autorisé", destination="E08 ou fin de parcours",
             html=msg("info", "Si la demande peut être traitée, l'assistance utilisera les coordonnées vérifiées par votre organisation",
                      "Aucun message n'indique si un compte existe. Aucun délai de traitement n'est communiqué.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → avertissement (lecture) → champ identifiant → champ description → « Demander de l'aide » → « Annuler »."),
        ("Annonce d'état", "La réponse générique est annoncée par une région de statut ; elle ne révèle rien sur le compte."),
        ("Retour de focus", "Après envoi, focus sur le titre du message de confirmation."),
        ("Zoom 200 %", "Deux champs tiennent en une colonne (non testé)."),
    ],
    limites=["Le canal d'assistance, ses horaires et ses engagements de délai sont inconnus : rien n'est affiché à leur place.",
             "Le formulaire ne doit collecter que le minimum ; la liste définitive des champs exige une validation des finalités (M10)."],
))

# --- E08 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E08", titre="Suivi de votre demande", nom="Suivi de récupération",
    trace="M04 · REQ-13-08/09", layout="default",
    acteur="Titulaire du compte, après autorisation",
    rendu="Interface EM AUTH (React, future) — accès restreint",
    vue=f"""
    <p class="eyebrow">Suivi · accès après autorisation seulement</p>
    <h1>Suivi de votre demande</h1>
    <p class="lede">Vous voyez uniquement l'avancement de votre demande. Aucun détail n'est affiché qui faciliterait une usurpation.</p>
    <ol class="steps" aria-label="Étapes de la demande">
      <li aria-current="step">Demande reçue</li><li>Vérification</li><li>Décision</li><li>Nouvel enrôlement</li><li>Clôture</li>
    </ol>
    <dl class="defs">
      <dt>Référence</dt><dd><span class="mono">R-2041</span></dd>
      <dt>État</dt><dd>{tag("pending", "Vérification en cours")}</dd>
      <dt>Dernière mise à jour</dt><dd><span class="mono">2026-11-08 14:20 UTC</span></dd>
    </dl>
    <p class="hint">Les étapes suivantes ne sont validées qu'après confirmation par le service. Un affichage d'étape n'est pas une preuve.</p>
    """,
    etats=[
        dict(nom="Reçue si confirmé", declencheur="Accusé de réception effectivement enregistré",
             actions="Consulter ; se déconnecter", destination="Étape suivante",
             html=msg("ok", "Demande reçue", "Un accusé de réception a été enregistré. S'il n'est pas confirmé, aucune étape n'est affichée comme reçue.")),
        dict(nom="Vérification", declencheur="Vérification d'identité en cours par canal indépendant",
             actions="Attendre ; aucune relance automatique", destination="Décision",
             html=msg("info", "Vérification en cours", "Votre identité est vérifiée par un canal indépendant. Aucun délai n'est garanti.")),
        dict(nom="Décision", declencheur="Décision prise par deux acteurs distincts",
             actions="Consulter la décision", destination="Nouvel enrôlement ou refus motivé",
             html=msg("info", "Décision enregistrée", "La décision a été prise par une personne distincte du demandeur. Aucun facteur n'est encore actif.")),
        dict(nom="Nouvel enrôlement", declencheur="Décision favorable et enrôlement lancé",
             actions="Poursuivre l'enrôlement", destination="A08 — Enrôlement du facteur",
             html=msg("ok", "Vous pouvez enregistrer un nouveau moyen", "L'enrôlement n'est effectif qu'après confirmation par le service.")),
        dict(nom="Clôture", declencheur="Facteur perdu retiré et notification confirmée",
             actions="Se connecter", destination="E02 — Identification",
             html=msg("ok", "Demande clôturée", "L'ancien moyen a été retiré. Si la notification n'a pas été confirmée, la demande ne doit pas être close.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → étapes (liste) → fiche → actions. Les étapes ne sont pas des contrôles interactifs."),
        ("Annonce d'état", "Un changement d'étape est annoncé une fois ; aucune boucle de rafraîchissement automatique."),
        ("Retour de focus", "Après consultation d'un détail, retour à l'étape en cours."),
        ("Zoom 200 %", "Les cinq étapes se réorganisent en plusieurs lignes (non testé)."),
    ],
    limites=["L'accès au suivi exige une autorisation : la maquette ne montre pas la page de garde, qui reste à concevoir si le suivi est retenu.",
             "Aucune notification réelle n'est envoyée ; un échec de notification est un événement serveur."],
))

# --- E10 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E10", titre="État du retrait d'accès", nom="Retrait par cible",
    trace="M05 · REQ-13-11/12/13", layout="wide",
    acteur="Administrateur ou responsable habilité",
    rendu="Interface EM AUTH (React, future) — accès restreint",
    vue=f"""
    <p class="eyebrow">Retrait · portée par cible · <span class="mono">D-2210</span></p>
    <h1>État du retrait d'accès</h1>
    <p class="lede">Chaque cible porte son propre état et son heure de mesure. Un retrait n'est déclaré global que si <strong>toutes</strong> les cibles prévues sont confirmées.</p>
    <table class="table">
      <caption>Compte de démonstration <span class="mono">U-0042</span> — données fictives</caption>
      <thead><tr><th scope="col">Cible</th><th scope="col">Portée</th><th scope="col">État</th><th scope="col">Mesuré à</th></tr></thead>
      <tbody>
        <tr><th scope="row">Fournisseur d'identité</th><td>Nouvelles connexions</td><td>{tag("ok", "Confirmé")}</td><td class="mono">14:31:05 UTC</td></tr>
        <tr><th scope="row">Application interne</th><td>Session et jetons</td><td>{tag("pending", "En cours")}</td><td class="mono">14:31:12 UTC</td></tr>
        <tr><th scope="row">API métier</th><td>Jetons d'accès</td><td>{tag("unknown", "Non confirmé")}</td><td class="mono">non observé</td></tr>
      </tbody>
    </table>
    {msg("warn", "Certaines cibles ne sont pas confirmées",
         "Une vérification est nécessaire. Le retrait ne peut pas être déclaré complet : une cible non observée reste <strong>inconnue</strong>, jamais réussie.")}
    <div class="btn-row">{btn("Relancer la vérification des cibles non confirmées")}{link_btn("Voir le journal", "#", "secondary")}</div>
    """,
    etats=[
        dict(nom="Confirmé", declencheur="Refus observé sur toutes les cibles incluses",
             actions="Clôturer ; consulter le journal", destination="Clôture de l'opération",
             html=msg("ok", "Retrait confirmé pour toutes les cibles prévues",
                      "Chaque cible a été observée conformément au critère convenu. Cette confirmation vaut pour les cibles listées, pas au-delà.")),
        dict(nom="En cours", declencheur="Ordre autorisé, mesures en cours",
             actions="Attendre ; consulter", destination="État suivant",
             html=msg("info", "Mesure des cibles en cours", "Aucune conclusion n'est tirée avant observation de chaque cible.")),
        dict(nom="Échec", declencheur="Refus non obtenu sur une cible après le délai convenu",
             actions="Escalader ; relancer la vérification", destination="Procédure d'escalade",
             html=msg("error", "Une cible ne refuse pas l'accès",
                      "La cible concernée doit être traitée avant toute conclusion. Les autres cibles conservent leur propre état.")),
        dict(nom="Inconnu", declencheur="Cible non joignable ou mesure impossible",
             actions="Vérifier ultérieurement ; escalader", destination="E11 / escalade",
             html=msg("unknown", "Une ou plusieurs cibles restent non confirmées",
                      "L'état réel est inconnu. Il ne doit être présenté ni comme un succès, ni comme un échec.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → tableau (navigation de lecture) → actions. Le tableau n'est pas rendu interactif sans décision."),
        ("Annonce d'état", "Chaque changement de statut est annoncé par le texte de la cellule ; la couleur seule ne porte pas l'information."),
        ("Retour de focus", "Après relance, focus sur le résumé d'état, pas sur la première ligne du tableau."),
        ("Zoom 200 %", "Tableau large : réorganisation en cartes par cible à prévoir (non implémentée ici)."),
    ],
    limites=["Les cibles réelles, les seuils de délai et les mécanismes d'observation par cible ne sont pas décidés : aucune API n'est présumée.",
             "La maquette affiche un jeu fictif figé ; elle ne démontre aucune mesure réelle."],
))

# --- E11 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E11", titre="Résultat non confirmé", nom="Résultat non confirmé",
    trace="M05/M08 · REQ-13-12/21", layout="form",
    acteur="Tout acteur, après une action dont l'effet est inconnu",
    rendu="Composant partagé BFF / interface (transversal)",
    vue=f"""
    <p class="eyebrow">État transversal · aucune conclusion automatique</p>
    <h1>Résultat non confirmé</h1>
    {msg("unknown", "Nous ne pouvons pas confirmer si votre demande a été traitée",
         "La connexion a été interrompue. Vérifiez son état <strong>avant de recommencer</strong>. Aucun renvoi automatique n'est effectué.")}
    <p class="hint">Une opération sensible rejouée en boucle peut créer un doublon. Le bouton d'action n'est pas réactivé automatiquement.</p>
    <div class="btn-row">{btn("Vérifier l'état de la demande")}{link_btn("Contacter l'assistance prévue", "#", "secondary")}{btn("Fermer", "quiet")}</div>
    """,
    etats=[
        dict(nom="Réponse perdue", declencheur="Envoi effectué, réponse non reçue",
             actions="Vérifier l'état ; contacter l'assistance", destination="État vérifiable si un service autorisé existe",
             html=msg("unknown", "Résultat non confirmé", "La demande a peut-être été traitée. Aucune conclusion n'est affichée avant vérification.")),
        dict(nom="Statut vérifiable", declencheur="Consultation d'un état serveur autorisé",
             actions="Consulter ; décider ensuite", destination="Écran d'origine ou E10",
             html=msg("info", "Un état peut être consulté", "L'état affiché provient d'un service autorisé. S'il n'existe pas, l'état reste inconnu.")),
        dict(nom="Vérification indisponible", declencheur="Service d'état indisponible ou droits insuffisants",
             actions="Contacter l'assistance ; ne pas relancer", destination="E13 / assistance",
             html=msg("warn", "Vérification impossible pour le moment",
                      "L'état reste inconnu. Contactez l'assistance prévue ; ne réémettez pas la demande à l'aveugle.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → message → « Vérifier l'état » → assistance → « Fermer »."),
        ("Annonce d'état", "Le message est annoncé une seule fois : une notification répétée est évitée."),
        ("Retour de focus", "À la fermeture, retour à l'écran d'origine sans relancer l'action."),
        ("Zoom 200 %", "Les trois actions s'empilent ; aucune n'est masquée (non testé)."),
    ],
    limites=["La prévention des doublons (idempotence, identifiant d'opération) relève du service, non de la maquette.",
             "Aucune vérification d'état réelle n'est branchée : le bouton est une intention de conception."],
))

# --- E12 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E12", titre="Votre session se termine", nom="Expiration et inactivité",
    trace="M08/M12 · REQ-13-18/20/31", layout="form",
    acteur="Utilisateur connecté",
    rendu="Interface EM AUTH / BFF (transversal)",
    vue=f"""
    <p class="eyebrow">Session · avertissement</p>
    <h1>Votre session va bientôt se terminer</h1>
    {msg("warn", "Fin de session imminente pour protéger vos informations",
         "Vous pouvez continuer si votre politique l'autorise. Cette action ne remplace ni une preuve fraîche ni le plafond absolu de session.")}
    <p class="hint">Durée restante : <span class="mono">[seuil à convenir]</span>. Aucune valeur n'est inventée.</p>
    <div class="btn-row">{btn("Continuer")}{btn("Se déconnecter", "secondary")}</div>
    """,
    etats=[
        dict(nom="Avertissement si possible", declencheur="Inactivité approchant la limite de politique",
             actions="Continuer si autorisé ; se déconnecter", destination="Session conservée ou E06",
             html=msg("warn", "Avertissement affiché avant expiration",
                      "L'avertissement n'est présenté que si la politique et le contexte le permettent ; aucune durée n'est inventée.")),
        dict(nom="Session expirée", declencheur="Limite atteinte",
             actions="Se connecter ; Besoin d'aide", destination="E02 — Identification",
             html=msg("error", "Votre session est terminée",
                      "Connectez-vous à nouveau. Le contenu protégé n'est plus affiché et aucun travail n'est déclaré sauvegardé.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → message → « Continuer » → « Se déconnecter ». Le focus initial va au message, pas au bouton."),
        ("Annonce d'état", "L'avertissement est annoncé sans répétition ; l'expiration masque immédiatement le contenu protégé."),
        ("Retour de focus", "Après expiration, focus sur le titre de la page de connexion."),
        ("Zoom 200 %", "Le bandeau d'avertissement ne doit pas recouvrir le contenu (non testé)."),
    ],
    limites=["Aucune durée de session, de préavis ni de plafond absolu n'est décidée : tout chiffre serait inventé.",
             "Le comportement réel dépend du serveur (Keycloak et BFF), non de la maquette."],
))

# --- E13 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="E13", titre="Service momentanément indisponible", nom="Service indisponible",
    trace="M08/M11 · REQ-13-21/28", layout="form",
    acteur="Tout acteur",
    rendu="Composant partagé (proxy/BFF)",
    vue=f"""
    <p class="eyebrow">Indisponibilité · aucune reprise automatique</p>
    <h1>Service momentanément indisponible</h1>
    {msg("error", "Aucune action sensible ne peut être confirmée pour le moment",
         "Réessayez plus tard ou contactez l'assistance prévue. La vérification forte n'est pas désactivée : l'action sensible est refusée.")}
    <p class="hint">Aucun délai de rétablissement n'est annoncé : il n'est pas connu.</p>
    <div class="btn-row">{btn("Réessayer")}{link_btn("Contacter l'assistance prévue", "#", "secondary")}</div>
    """,
    etats=[
        dict(nom="Panne", declencheur="Contrôle d'authentification ou de droits indisponible",
             actions="Réessayer ; assistance", destination="E13 ou écran d'origine",
             html=msg("error", "Service indisponible", "Aucune opération n'est engagée. Aucun mode de secours n'est activé.")),
        dict(nom="Action sensible bloquée", declencheur="Tentative d'action sensible pendant l'indisponibilité",
             actions="Attendre ; assistance", destination="Refus explicite",
             html=msg("warn", "Action sensible refusée",
                      "Le contrôle requis est indisponible : l'action est refusée plutôt que dégradée. Aucune MFA n'est désactivée globalement.")),
        dict(nom="Assistance", declencheur="Orientation vers l'aide",
             actions="Suivre la procédure d'aide", destination="E07 / canal convenu",
             html=msg("info", "Orientation vers l'assistance", "L'assistance ne demandera aucun secret et ne contournera pas la vérification.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → message → « Réessayer » → assistance."),
        ("Annonce d'état", "L'indisponibilité est annoncée par <code>role=\"alert\"</code>, une seule fois."),
        ("Retour de focus", "Après « Réessayer », le focus reste sur le message de statut."),
        ("Zoom 200 %", "Le message reste lisible sans défilement horizontal (non testé)."),
    ],
    limites=["Aucun suivi d'incident, aucune page de statut et aucun engagement de délai ne sont décidés.",
             "Le comportement en cas de panne partielle (IdP disponible, base indisponible) doit être spécifié côté service."],
))

# --- A02 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="A02", titre="Autoriser l'enrôlement d'une identité", nom="Identité et mandat d'enrôlement",
    trace="M01/M02 · REQ-13-02/03/04", layout="default",
    acteur="Gestionnaire d'accès mandaté",
    rendu="Interface EM AUTH (React, future) — à arbitrer",
    vue=f"""
    <p class="eyebrow">Demande d'enrôlement · <span class="mono">D-118</span></p>
    <h1>Autoriser l'enrôlement d'une identité</h1>
    <p class="lede">L'activation exige une identité stable, un destinataire vérifié et un mandat. Une correspondance ambiguë suspend la demande au lieu de la forcer.</p>
    <dl class="defs">
      <dt>Identité déclarée</dt><dd>Compte de démonstration <span class="mono">U-0042</span> — identifiant stable fourni par l'organisation</dd>
      <dt>Destinataire</dt><dd>Canal vérifié par l'organisation <span class="mono">[canal à convenir]</span></dd>
      <dt>Mandat</dt><dd>Demande <span class="mono">D-118</span> — gestionnaire habilité</dd>
      <dt>Risque</dt><dd>{tag("pending", "À qualifier")}</dd>
    </dl>
    {msg("info", "Une invitation à usage unique sera émise",
         "L'invitation ne prouve pas l'identité par elle-même : elle sera refusée si elle est expirée, rejouée ou adressée au mauvais destinataire.")}
    <div class="btn-row">{btn("Émettre l'invitation")}{btn("Suspendre la demande", "secondary")}</div>
    """,
    etats=[
        dict(nom="Demande", declencheur="Création d'une demande d'enrôlement par un rôle habilité",
             actions="Compléter ; suspendre", destination="En attente ou suspendue",
             html='<p>Aucune invitation n\'est émise tant que l\'identité et le destinataire ne sont pas vérifiés.</p>'),
        dict(nom="Identité ambiguë", declencheur="Deux identités possibles, ou rapprochement fondé sur la seule adresse électronique",
             actions="Suspendre ; escalader", destination="Escalade — aucun enrôlement",
             html=msg("error", "Correspondance ambiguë",
                      "La demande est suspendue et escaladée. Aucune activation n'est possible tant que l'identité n'est pas levée d'ambiguïté.")),
        dict(nom="En attente", declencheur="Invitation émise, non encore utilisée",
             actions="Consulter ; révoquer l'invitation", destination="E01 côté utilisateur",
             html=msg("info", "Invitation émise", "L'invitation est à usage unique. Sa validité expirée ou son rejeu entraîne un refus.")),
        dict(nom="Autorisée", declencheur="Activation confirmée après vérification du destinataire",
             actions="Consulter le journal", destination="A08 / journal",
             html=msg("ok", "Enrôlement autorisé", "L'activation n'est enregistrée qu'après confirmation par le service.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → fiche (lecture) → message → « Émettre l'invitation » → « Suspendre »."),
        ("Annonce d'état", "La suspension est annoncée par une alerte ; aucune émission silencieuse."),
        ("Retour de focus", "Après suspension, focus sur le titre du message d'état."),
        ("Zoom 200 %", "La fiche se réorganise en une colonne (non testé)."),
    ],
    limites=["Aucune API d'enrôlement n'existe : les actions sont des intentions, sans contrat.",
             "Le canal de vérification du destinataire et les pièces exigées ne sont pas décidés."],
))

# --- A03 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="A03", titre="Décision de récupération d'accès", nom="Décision de récupération",
    trace="M04 · REQ-13-08/09", layout="default",
    acteur="Support mandaté + second acteur distinct",
    rendu="Interface EM AUTH (React, future) — à arbitrer",
    vue=f"""
    <p class="eyebrow">Demande <span class="mono">R-2041</span> · récupération d'accès</p>
    <h1>Décision de récupération d'accès</h1>
    <p class="lede">Une preuve indépendante et un second acteur distinct sont requis avant tout nouvel enrôlement.</p>
    <dl class="defs">
      <dt>Compte</dt><dd><span class="mono">U-0042</span> — compte de démonstration</dd>
      <dt>Moyen perdu</dt><dd>Clé d'accès déclarée perdue</dd>
      <dt>Demandeur</dt><dd>K. ADJOVI — support mandaté</dd>
      <dt>Statut</dt><dd>{tag("pending", "En attente d'un second acteur")}</dd>
    </dl>
    <h2>Preuves examinées</h2>
    <ul class="checks">
      <li><span class="check-label">Vérification par canal indépendant<span class="check-meta">canal convenu avec l'organisation</span></span>{tag("ok", "Vérifiée")}</li>
      <li><span class="check-label">Contrôle du mandat du demandeur</span>{tag("ok", "Vérifié")}</li>
      <li><span class="check-label">Accusé de notification au titulaire</span>{tag("unknown", "Non confirmé")}</li>
      <li><span class="check-label">Second acteur distinct (double contrôle)</span>{tag("pending", "Requis — non fourni")}</li>
    </ul>
    {msg("info", "Deux personnes distinctes", "Le demandeur ne peut pas approuver sa propre demande.")}
    <div class="btn-row">{btn("Demander une seconde validation")}{btn("Refuser la demande", "danger")}</div>
    """,
    etats=[
        dict(nom="Preuve insuffisante", declencheur="Absence de vérification indépendante",
             actions="Compléter la vérification ; refuser", destination="Aucun enrôlement",
             html=msg("error", "Demande non recevable en l'état",
                      "La vérification indépendante n'est pas établie. Aucun nouvel authentificateur ne peut être enrôlé.")),
        dict(nom="Second contrôle requis", declencheur="Preuve établie, approbation manquante",
             actions="Demander une seconde validation ; refuser", destination="Décision",
             html=msg("warn", "Un second acteur distinct doit approuver",
                      "L'approbation par le demandeur lui-même est impossible. La décision reste en attente.")),
        dict(nom="Refus", declencheur="Décision négative motivée",
             actions="Notifier selon la procédure ; clôturer", destination="Clôture avec motif",
             html=msg("error", "Demande refusée", "Le refus est motivé et notifié selon la procédure de l'organisation. Aucun facteur n'est modifié.")),
        dict(nom="Traitement", declencheur="Décision favorable, retrait de l'ancien facteur en cours",
             actions="Suivre l'état ; ne pas relancer", destination="E08 / E11",
             html=msg("info", "Traitement en cours",
                      "Le retrait de l'ancien facteur et la notification doivent être confirmés avant clôture. À défaut, l'état est inconnu.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → fiche → liste de preuves → message → « Demander une seconde validation » → « Refuser »."),
        ("Annonce d'état", "Les changements de statut des preuves sont annoncés individuellement, sans redondance."),
        ("Retour de focus", "Après refus, focus sur le message de confirmation, jamais sur un bouton d'action destructive."),
        ("Zoom 200 %", "Liste de preuves en une colonne (non testé)."),
    ],
    limites=["Les preuves réellement exigées et le canal indépendant ne sont pas décidés : ils restent « à convenir ».",
             "L'impossibilité d'auto-approbation est une règle serveur ; la maquette ne fait que l'exprimer."],
))

# --- A04 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="A04", titre="Demander un retrait d'accès", nom="Orchestration du retrait",
    trace="M05 · REQ-13-11/12/13", layout="default",
    acteur="Responsable habilité",
    rendu="Interface EM AUTH (React, future) — à arbitrer",
    vue=f"""
    <p class="eyebrow">Retrait · demande autorisée</p>
    <h1>Demander un retrait d'accès</h1>
    <p class="lede">Le retrait porte sur des cibles identifiées. Les sessions et les droits sont traités séparément, puis mesurés par cible.</p>
    <dl class="defs">
      <dt>Compte cible</dt><dd><span class="mono">U-0042</span> — compte de démonstration</dd>
      <dt>Motif</dt><dd>Départ de poste <span class="mono">(fictif)</span></dd>
      <dt>Mandat</dt><dd>Demande <span class="mono">D-2210</span> — responsable habilité</dd>
    </dl>
    <fieldset>
      <legend>Cibles incluses dans l'ordre</legend>
      <label class="choice" for="c1"><input type="checkbox" id="c1" checked><span class="choice__body"><span class="choice__title">Fournisseur d'identité</span>Nouvelles connexions refusées</span></label>
      <label class="choice" for="c2"><input type="checkbox" id="c2" checked><span class="choice__body"><span class="choice__title">Application interne</span>Session et jetons invalidés</span></label>
      <label class="choice" for="c3"><input type="checkbox" id="c3" checked><span class="choice__body"><span class="choice__title">API métier</span>Jetons d'accès révoqués</span></label>
    </fieldset>
    {msg("warn", "La confirmation globale dépend de l'observation de chaque cible",
         "Aucun ordre n'est lancé automatiquement depuis cet écran : la demande doit être validée, puis mesurée dans E10.")}
    <div class="btn-row">{btn("Confirmer la demande de retrait")}{btn("Annuler", "secondary")}</div>
    """,
    etats=[
        dict(nom="Mandat", declencheur="Ouverture de la demande sans mandat valide",
             actions="Bloquer ; demander un mandat", destination="Refus / attente",
             html=msg("error", "Mandat absent ou invalide", "Le retrait ne peut pas être demandé. Une demande motivée est requise.")),
        dict(nom="Confirmation", declencheur="Mandat valide, cibles sélectionnées",
             actions="Confirmer ; annuler", destination="Traitement",
             html='<p>L\'écran récapitule les cibles avant confirmation ; aucune action destructive sur simple clic.</p>'),
        dict(nom="Traitement", declencheur="Demande confirmée",
             actions="Suivre l'état", destination="E10 — Retrait par cible",
             html=msg("info", "Demande enregistrée", "Le traitement se poursuit ; l'état par cible est visible dans E10.")),
        dict(nom="Partiel", declencheur="Certaines cibles seulement ont refusé l'accès",
             actions="Escalader ; relancer la vérification", destination="E10 / escalade",
             html=msg("warn", "Retrait partiel", "Certaines cibles ne sont pas confirmées. Aucune conclusion globale n'est affichée.")),
        dict(nom="Résultat inconnu", declencheur="Réponse perdue après confirmation",
             actions="Vérifier l'état", destination="E11 — Résultat non confirmé",
             html=msg("unknown", "Résultat non confirmé", "La demande a peut-être été enregistrée. Vérifiez son état avant de recommencer.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → fiche → groupes de cibles → message → « Confirmer » → « Annuler »."),
        ("Annonce d'état", "La confirmation est annoncée ; aucun message de succès n'est affiché avant l'état par cible."),
        ("Retour de focus", "Après annulation, retour à la fiche ; après confirmation, focus sur le résumé d'état."),
        ("Zoom 200 %", "Les cases et libellés s'empilent (non testé)."),
    ],
    limites=["Aucune API de retrait n'existe : la maquette ne présume aucun contrat.",
             "Les mécanismes par cible (révocation de jetons, sessions) sont des comportements serveur non démontrables."],
))

# --- A08 -------------------------------------------------------------------- #
SCREENS.append(dict(
    id="A08", titre="Enregistrer un moyen d'authentification", nom="Enrôlement du facteur",
    trace="M02/M03 · REQ-13-04/05", layout="form",
    acteur="Utilisateur invité + opérateur selon procédure",
    rendu="Page EM AUTH + dialogue natif navigateur/appareil",
    vue=f"""
    <p class="eyebrow">Enrôlement · invitation vérifiée</p>
    <h1>Enregistrer un moyen d'authentification</h1>
    <p class="lede">L'enregistrement se fait dans une fenêtre du navigateur ou de l'appareil. EM AUTH ne reçoit jamais votre PIN ni vos données biométriques.</p>
    {native_sim("« Créer une clé d'accès pour EM AUTH » : la fenêtre est rendue par le navigateur ou le système. L'appareil peut demander son propre déverrouillage, qu'EM AUTH ne voit pas.")}
    <p class="hint" style="margin-top:16px">L'activation n'est enregistrée qu'après confirmation par le service. Une annulation ou une expiration n'active rien.</p>
    <div class="btn-row">{btn("Commencer l'enregistrement")}{btn("Plus tard", "secondary")}</div>
    """,
    etats=[
        dict(nom="Préparation", declencheur="Invitation vérifiée, écran ouvert",
             actions="Commencer ; plus tard", destination="Dialogue natif",
             html='<p>Les explications précèdent l\'appel natif : l\'utilisateur sait ce qui va s\'ouvrir et pourquoi.</p>'),
        dict(nom="Appel natif", declencheur="Activation de « Commencer l'enregistrement »",
             actions="Poursuivre ou annuler dans la fenêtre système", destination="Retour avec résultat",
             html=native_sim("Fenêtre du navigateur/système. Aucune capture, aucun PIN demandé par EM AUTH, aucune biométrie collectée.")),
        dict(nom="Annulé", declencheur="Fermeture de la fenêtre native",
             actions="Réessayer ; demander de l'aide", destination="A08 ou E07",
             html=msg("warn", "Enregistrement non terminé", "Aucun moyen n'a été activé. Vous pouvez réessayer ou demander de l'aide.")),
        dict(nom="Réussi si confirmé", declencheur="Confirmation serveur de l'enregistrement",
             actions="Continuer vers l'application", destination="E05 / E02",
             html=msg("ok", "Moyen enregistré", "L'enregistrement a été confirmé par le service. Conservez un moyen de secours indépendant : sa procédure reste à définir.")),
        dict(nom="Expiré", declencheur="Délai de l'invitation ou du défi dépassé",
             actions="Demander une nouvelle invitation", destination="E01 / procédure d'aide",
             html=msg("error", "Cette invitation a expiré", "Aucun moyen n'a été enregistré. Une nouvelle invitation doit être demandée par le canal prévu.")),
    ],
    annotations=[
        ("Ordre clavier", "Titre → message natif (lecture) → « Commencer » → « Plus tard »."),
        ("Annonce d'état", "Le résultat est annoncé une seule fois ; « réussi » n'apparaît qu'après confirmation."),
        ("Retour de focus", "Après la fenêtre native, focus sur le titre du message de résultat."),
        ("Zoom 200 %", "Les explications restent lisibles en une colonne (non testé)."),
    ],
    limites=["Le dialogue natif n'est pas maîtrisé ; ses libellés et son accessibilité dépendent du navigateur et du système.",
             "Aucun moyen de secours n'est défini : il doit l'être avant tout déploiement (risque de perte d'accès)."],
))


# --------------------------------------------------------------------------- #
# Rendu des pages
# --------------------------------------------------------------------------- #

PAGE = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{id} — {titre} · maquette fictive EM AUTH</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="../systeme/base.css">
<link rel="stylesheet" href="../systeme/composants.css">
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu principal</a>
<p class="fiction-banner" role="note"><strong>Maquette fictive</strong> — données inventées, aucun service connecté, aucune preuve de sécurité, de conformité ou de disponibilité.</p>
<header class="topbar">
  <span class="brand">EM AUTH <span>maquette · direction A</span></span>
  <nav aria-label="Navigation des écrans"><ul>
    <li><a href="index.html">Tous les écrans</a></li>
    <li><a href="../systeme/galerie.html">Système de design</a></li>
    <li><a href="../index.html">Comparaison A/B/C</a></li>
  </ul></nav>
</header>

<main id="contenu" class="layout layout--{layout}">
  <p class="eyebrow">{id} · {trace}</p>
  <h1>{titre}</h1>
  <p class="lede">{nom} — écran <strong>proposé</strong>, non approuvé.</p>

  <dl class="defs">
    <dt>Acteur</dt><dd>{acteur}</dd>
    <dt>Rendu pressenti</dt><dd>{rendu}</dd>
    <dt>Statut de l'écran</dt><dd><span class="tag tag--neutral">À arbitrer</span> — propriétaire technique non décidé</dd>
  </dl>

  <h2 class="sr-only">Vue principale de l'écran</h2>
  <div class="card">
{etats0}
  </div>

  <section class="section" aria-labelledby="etats">
    <h2 id="etats">États de l'écran ({nb})</h2>
    <p class="scope-note">Chaque état est nommé avec son événement d'entrée, les actions autorisées et sa destination. Aucune réponse serveur n'est inventée : les destinations sont des intentions de conception.</p>
{etats_html}
  </section>

  <section class="section" aria-labelledby="annotations">
    <h2 id="annotations">Annotations de conception</h2>
    <table class="table">
      <caption>À vérifier à l'implémentation : aucune de ces annotations n'a été testée dans cet environnement.</caption>
      <tbody>
{annotations}
      </tbody>
    </table>
  </section>

  <section class="section" aria-labelledby="limites">
    <h2 id="limites">Limites et points non prouvés</h2>
    <ul>
{limites}
    </ul>
    <p class="scope-note">Cette vue est un fichier HTML statique : aucun script, aucune requête réseau, aucune donnée réelle. Elle ne démontre ni sécurité, ni conformité WCAG, ni disponibilité.</p>
  </section>
</main>

<footer class="pagefoot">
  <p>EM AUTH · {id} — {nom} · lot PH05 (décision D-007) · direction A (décision D-010).</p>
  <p>Maquette fictive — rendu non vérifié par l'agent, aucun test clavier/lecteur d'écran/WebAuthn exécuté.</p>
</footer>
</body>
</html>
"""


def render(screen: dict) -> str:
    # le titre de page (h1) est unique : on retire le titre répété dans le fragment
    vue = re.sub(r"<h1>.*?</h1>", "", screen["vue"], count=1, flags=re.S)
    btn_primary = screen["etats"][0]["nom"]
    etats_html = []
    for i, e in enumerate(screen["etats"], 1):
        etats_html.append(f"""    <div class="card card--plain" id="etat-{i}">
      <div class="card__head"><h3 style="margin:0">État {i} — {escape(e['nom'])}</h3></div>
      <dl class="defs">
        <dt>Événement d'entrée</dt><dd>{e['declencheur']}</dd>
        <dt>Actions autorisées</dt><dd>{e['actions']}</dd>
        <dt>Destination</dt><dd>{e['destination']}</dd>
      </dl>
      {e['html']}
    </div>""")

    annotations = "\n".join(
        f"        <tr><th scope=\"row\">{k}</th><td>{v}</td></tr>" for k, v in screen["annotations"])
    limites = "\n".join(f"      <li>{l}</li>" for l in screen["limites"])

    return PAGE.format(
        id=screen["id"], titre=screen["titre"], nom=screen["nom"], trace=screen["trace"],
        layout=screen["layout"], acteur=screen["acteur"], rendu=screen["rendu"],
        etats0=vue.strip(), nb=len(screen["etats"]),
        etats_html="\n".join(etats_html), annotations=annotations, limites=limites,
    )


def slug(screen: dict) -> str:
    table = {
        "E01": "e01-invitation", "E02": "e02-identification", "E03": "e03-moyen-autorise",
        "E04": "e04-preuve-fraiche", "E05": "e05-transition", "E06": "e06-fin-de-session",
        "E07": "e07-perte-ou-aide", "E08": "e08-suivi-recuperation", "E10": "e10-retrait-par-cible",
        "E11": "e11-resultat-non-confirme", "E12": "e12-expiration", "E13": "e13-indisponibilite",
        "A02": "a02-mandat-enrolement", "A03": "a03-decision-recuperation",
        "A04": "a04-orchestration-retrait", "A08": "a08-enrolement-facteur",
    }
    return table[screen["id"]]


def write_index() -> None:
    rows = []
    for s in SCREENS:
        rows.append(
            f'      <tr><th scope="row"><a href="{slug(s)}.html">{s["id"]}</a></th>'
            f'<td>{s["nom"]}</td><td>{s["acteur"]}</td><td class="mono">{s["trace"]}</td>'
            f'<td>{len(s["etats"])}</td></tr>')
    diff = """
      <tr><th scope="row">A01</th><td>Qualification de l'application</td><td colspan="3">DIFFÉRÉ — procédure probable plutôt qu'écran ; décision G1</td></tr>
      <tr><th scope="row">A05</th><td>Journal d'audit minimal</td><td colspan="3">DIFFÉRÉ — réutilisation d'un outil existant possible ; décision G1</td></tr>
      <tr><th scope="row">A06</th><td>Exploitation et reprise</td><td colspan="3">DIFFÉRÉ — procédure documentaire ; décision G1</td></tr>
      <tr><th scope="row">A07</th><td>Sortie et portabilité</td><td colspan="3">DIFFÉRÉ — mandat contractuel non disponible ; décision G1</td></tr>
      <tr><th scope="row">A09</th><td>Gestion d'urgence</td><td colspan="3">DIFFÉRÉ — mandat séparé requis ; décision G1</td></tr>
      <tr><th scope="row">E09</th><td>Demande ou approbation sensible</td><td colspan="3">DIFFÉRÉ — recoupe A03/A04 ; décision G1 (le lot de 17 ne le comprend pas)</td></tr>
"""
    html = f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Écrans de la maquette EM AUTH (fictive)</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="../systeme/base.css">
<link rel="stylesheet" href="../systeme/composants.css">
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu principal</a>
<p class="fiction-banner" role="note"><strong>Maquette fictive</strong> — données inventées, aucun service connecté, aucune preuve de sécurité, de conformité ou de disponibilité.</p>
<header class="topbar">
  <span class="brand">EM AUTH <span>écrans · direction A</span></span>
  <nav aria-label="Navigation"><ul>
    <li><a href="../index.html">Comparaison A/B/C</a></li>
    <li><a href="../systeme/galerie.html">Système de design</a></li>
  </ul></nav>
</header>
<main id="contenu" class="layout layout--default">
  <p class="eyebrow">PH05 · lot de 16 écrans (décision D-007)</p>
  <h1>Écrans de la maquette</h1>
  <p class="lede">Seize écrans du lot sont accessibles ci-dessous ; E02 et A03 sont également disponibles dans la comparaison PH03. Chaque page présente une vue principale, ses états nommés et ses annotations de conception.</p>
  <p class="scope-note">Aucun écran n'est approuvé : tous restent « à arbitrer » quant à leur propriétaire technique (thème Keycloak, page BFF, interface React, fenêtre native, procédure).</p>

  <table class="table">
    <caption>Écrans du lot retenu</caption>
    <thead><tr><th scope="col">ID</th><th scope="col">Écran</th><th scope="col">Acteur</th><th scope="col">Traçabilité</th><th scope="col">États</th></tr></thead>
    <tbody>
{chr(10).join(rows)}
    </tbody>
  </table>

  <h2 style="margin-top:32px">Écrans non produits — décision G1</h2>
  <table class="table">
    <caption>Classement explicite : un écran non traité n'est pas un écran réalisé.</caption>
    <thead><tr><th scope="col">ID</th><th scope="col">Écran</th><th scope="col" colspan="3">Classement et raison</th></tr></thead>
    <tbody>
{diff}
    </tbody>
  </table>
  <p class="small muted">Note : le lot retenu (D-007) comprend 16 écrans : E01–E08, E10–E13, A02, A03, A04, A08. E09 n'en fait pas partie et reste à arbitrer. Le nombre « 17 » annoncé au PH01 était une erreur d'étiquetage de ma part, corrigée ici. ; A01, A05, A06, A07 et A09 sont différés.</p>
</main>
<footer class="pagefoot">
  <p>EM AUTH · écrans PH05 · direction A · fichiers générés par <span class="mono">systeme/generer_ecrans.py</span>.</p>
  <p>Maquette fictive — aucun test réel exécuté.</p>
</footer>
</body>
</html>
"""
    (OUT / "index.html").write_text(html, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for s in SCREENS:
        path = OUT / f"{slug(s)}.html"
        path.write_text(render(s), encoding="utf-8")
        print(f"écrit {path.relative_to(BASE)} ({len(render(s))} o, {len(s['etats'])} états)")
    write_index()
    print(f"écrit ecrans/index.html — {len(SCREENS)} écrans")


if __name__ == "__main__":
    main()
