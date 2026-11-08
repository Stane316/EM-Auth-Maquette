/**
 * E02 — Identification
 * Exigences : REQ-13-06 · REQ-13-07
 * Acteur : utilisateur
 * Rendu pressenti : thème Keycloak (démonstration ici)
 * Nature : maquette fictive, aucun service connecté
 */
import { ArrowRight, LifeBuoy, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { useNavigate } from 'react-router-dom';
import { services } from '../services';
import type { FacteurDto } from '../services/contracts/api';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Champ } from '../components/ui/Champ';
import scene from '../components/layout/scene.module.css';

export const E02Identification = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [erreurService, setErreurService] = useState<string | null>(null);
  const [videLocale, setVideLocale] = useState(false);

  const vide = actif.cle === 'vide' || videLocale;
  const verrouille = actif.cle === 'verrouillage';
  const echec = actif.cle === 'erreur-generique';
  const degrade = actif.cle === 'degrade';
  const oidc = services.auth.strategie === 'redirection-oidc';

  const soumettre = async (evenement: React.FormEvent) => {
    evenement.preventDefault();
    if (verrouille || envoi) return;

    if (oidc) {
      // Le mot de passe est saisi chez le fournisseur d'identité, jamais ici.
      await services.auth.redirigerVersConnexion();
      return;
    }

    if (identifiant.trim().length < 3) {
      setVideLocale(true);
      return;
    }
    setVideLocale(false);
    setErreurService(null);
    setEnvoi(true);
    const reponse = await services.auth.identifier(identifiant);
    setEnvoi(false);

    if (!reponse.ok) {
      setErreurService(reponse.message);
      return;
    }

    const etat = { identifiant: reponse.donnees.identifiant, facteurs: reponse.donnees.facteurs as readonly FacteurDto[] };
    navigate('/ecran/moyen-autorise?etat=choix', { state: etat });
  };

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · identification"
            titre="Un seul message, quelle que soit la cause"
            texte="L’écran d’identification ne doit jamais servir à découvrir qui possède un compte. La même formulation couvre l’identifiant inconnu, le mot de passe erroné et le compte désactivé."
            points={[
              'Aucune indication sur l’existence du compte, ni par le texte, ni par un délai visible.',
              'Le nombre de tentatives est limité : le blocage est temporaire et expliqué.',
              'La récupération reste accessible même quand l’identification échoue.',
            ]}
          />
        }
      >
        <h2 className={scene.carteTitre}>Se connecter</h2>
        <p className={scene.carteTexte}>Utilisez votre identifiant professionnel.</p>

        {degrade ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Service partiellement dégradé" role="status">
              L’authentification par clé de sécurité est momentanément indisponible. La connexion par mot de passe et
              code reste possible. Aucune heure de rétablissement n’est annoncée : elle n’est pas connue.
            </Alerte>
          </div>
        ) : null}

        {verrouille ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Trop de tentatives — accès temporairement bloqué">
              Pour protéger le compte, les tentatives suivantes sont refusées pendant une durée limitée. Si vous êtes à
              l’origine de ces essais, patientez ; sinon, utilisez la récupération d’accès.
            </Alerte>
          </div>
        ) : null}

        {echec ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="Identifiant ou mot de passe incorrect" role="alert">
              Le message reste volontairement identique si l’identifiant n’existe pas. Vérifiez la saisie, puis
              réessayez.
            </Alerte>
          </div>
        ) : null}

        {erreurService ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="Identification impossible" role="alert">
              {erreurService}
            </Alerte>
          </div>
        ) : null}

        {oidc ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="info" role="status" titre="Identifiant et mot de passe saisis chez le fournisseur">
              Cette interface ne collecte aucun mot de passe : la saisie a lieu dans le thème Keycloak, puis le BFF ouvre
              une session opaque (cookie HttpOnly) et revient ici.
            </Alerte>
          </div>
        ) : (
          <p style={{ marginTop: 'var(--e-3)', color: 'var(--encre-500)', fontSize: 'var(--t-2xs)', lineHeight: 1.5 }}>
            Mode démonstration : seul l’identifiant est collecté, aucun mot de passe n’est demandé ni vérifié.
          </p>
        )}

        <form className={scene.formulaire} onSubmit={soumettre} noValidate>
          <Champ
            label="Identifiant professionnel"
            name="identifiant"
            autoComplete="username"
            placeholder="prenom.nom"
            value={identifiant}
            onChange={(evenement) => setIdentifiant(evenement.target.value)}
            aide="Format : prenom.nom — sans adresse électronique complète."
            erreur={vide && identifiant.trim() === '' ? 'Saisissez votre identifiant pour continuer.' : undefined}
            obligatoire
            disabled={verrouille}
          />

          <div hidden={oidc}>
            <div style={{ position: 'relative' }}>
              <Champ
                label="Mot de passe (fournisseur d’identité)"
                name="motdepasse"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                obligatoire
                disabled
                aide="Champ non actif : la saisie du secret appartient au thème Keycloak, pas à ce client."
              />
            </div>
            <p style={{ paddingLeft: 0, marginTop: 4, color: 'var(--encre-500)', fontSize: 'var(--t-3xs)' }}>
              Jamais demandé par courriel, par téléphone ou par message.
            </p>
          </div>

          <div className={scene.actions}>
            <Bouton
              type="submit"
              bloc
              disabled={verrouille || envoi}
              icone={envoi ? <Loader2 aria-hidden="true" size={16} /> : <Lock aria-hidden="true" size={16} />}
            >
              {envoi ? 'Vérification…' : oidc ? 'Continuer vers le fournisseur d’identité' : 'Continuer'}
            </Bouton>
            <Bouton
              variante="secondaire"
              bloc
              onClick={() => changer('erreur-generique')}
              aria-describedby="aide-echec"
            >
              Simuler un échec d’identification
            </Bouton>
            <span id="aide-echec" className="visuellement-cache">
              Affiche le message d’erreur générique, identique pour un identifiant inconnu et un mot de passe erroné.
            </span>
          </div>
        </form>

        <p className={scene.lienSecondaire}>
          <BoutonLien vers="/ecran/perte-ou-aide" variante="discret" taille="sm" icone={<LifeBuoy aria-hidden="true" />}>
            Mot de passe oublié ou accès perdu
          </BoutonLien>
          <BoutonLien vers="/ecran/indisponibilite" variante="discret" taille="sm">
            Un problème technique ?
            <ArrowRight aria-hidden="true" size={14} style={{ marginLeft: 4 }} />
          </BoutonLien>
        </p>
      </SceneAuth>
    </CoquilleEcran>
  );
};
