/**
 * E02 — Identification
 * Exigences : REQ-13-06 · REQ-13-07
 * Acteur : utilisateur
 * Rendu pressenti : thème Keycloak (démonstration ici)
 * Nature : maquette fictive, aucun service connecté
 */
import { ArrowRight, Eye, EyeOff, LifeBuoy, Lock } from 'lucide-react';
import { useState } from 'react';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { useNavigate } from 'react-router-dom';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Champ } from '../components/ui/Champ';
import scene from '../components/layout/scene.module.css';

export const E02Identification = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [identifiant, setIdentifiant] = useState('');

  const vide = actif.cle === 'vide';
  const verrouille = actif.cle === 'verrouillage';
  const echec = actif.cle === 'erreur-generique';
  const degrade = actif.cle === 'degrade';

  const soumettre = (evenement: React.FormEvent) => {
    evenement.preventDefault();
    if (verrouille) return;
    if (echec) return;
    navigate('/ecran/moyen-autorise?etat=choix');
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

          <div>
            <div style={{ position: 'relative' }}>
              <Champ
                label="Mot de passe"
                name="motdepasse"
                type={motDePasseVisible ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••"
                erreur={vide ? 'Le mot de passe ne peut pas être vide.' : undefined}
                obligatoire
                disabled={verrouille}
                aide="Jamais demandé par courriel, par téléphone ou par message."
              />
            </div>
            <Bouton
              variante="discret"
              taille="sm"
              onClick={() => setMotDePasseVisible((valeur) => !valeur)}
              aria-pressed={motDePasseVisible}
              icone={motDePasseVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              style={{ paddingLeft: 0, marginTop: 2 }}
            >
              {motDePasseVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            </Bouton>
          </div>

          <div className={scene.actions}>
            <Bouton type="submit" bloc disabled={verrouille} icone={<Lock aria-hidden="true" size={16} />}>
              Continuer
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
