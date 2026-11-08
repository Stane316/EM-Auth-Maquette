/**
 * E07 — Perte d'accès ou aide
 * Exigences : REQ-13-08 · REQ-13-09 · REQ-13-30
 * Acteur : utilisateur
 * Rendu pressenti : page BFF (démonstration ici)
 * Nature : maquette fictive, aucun envoi réel
 */
import { ArrowRight, KeyRound, MailQuestion, Send } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Champ } from '../components/ui/Champ';
import scene from '../components/layout/scene.module.css';

export const E07PerteOuAide = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [identifiant, setIdentifiant] = useState('');
  const envoyee = actif.cle === 'envoyee';
  const sansReponse = actif.cle === 'sans-reponse';
  const indisponible = actif.cle === 'voies-indisponibles';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        large
        aurora={actif.cle === 'accueil'}
        contexte={
          <BlocContexte
            marque="EM AUTH · perte d’accès"
            titre="Deux voies, indépendantes l’une de l’autre"
            texte="Perdre son facteur et perdre sa boîte aux lettres ne se réparent pas de la même manière. Les deux voies ne s’appuient pas l’une sur l’autre, sinon une seule perte suffirait à tout bloquer."
            points={[
              'Facteur perdu : récupération à deux acteurs, sans passage par le courriel.',
              'Adresse inaccessible : procédure de support avec vérification d’identité.',
              'La réponse est identique que le compte existe ou non — aucune énumération.',
            ]}
          />
        }
      >
        <h2 className={scene.carteTitre}>Vous n’arrivez plus à accéder à votre compte</h2>
        <p className={scene.carteTexte}>Choisissez la situation qui correspond à la vôtre.</p>

        {envoyee ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="succes" titre="Demande enregistrée">
                Si un compte correspond aux informations fournies, un dossier de récupération est ouvert et le support
                est prévenu. Le message est identique dans le cas contraire : cet écran ne permet pas de savoir si un
                compte existe.
              </Alerte>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/suivi-recuperation?etat=en-cours" bloc>
                Suivre le dossier de démonstration
              </BoutonLien>
              <BoutonLien vers="/ecran/identification" variante="secondaire" bloc>
                Revenir à l’identification
              </BoutonLien>
            </div>
          </>
        ) : null}

        {sansReponse ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="inconnu" titre="Aucune confirmation reçue">
                La demande a peut-être été enregistrée, mais nous n’avons pas de confirmation. Nous ne dirons ni
                « envoyé » ni « échoué » : nous ne le savons pas.
              </Alerte>
            </div>
            <ul style={{ display: 'grid', gap: 8, marginTop: 'var(--e-4)', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <li>· Attendez avant de renvoyer une demande : plusieurs demandes ralentissent le traitement.</li>
              <li>· Le dossier, s’il existe, est visible dans le suivi de récupération.</li>
              <li>· Aucun délai de traitement n’est annoncé, car il n’est pas fixé.</li>
            </ul>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/suivi-recuperation?etat=en-cours" variante="secondaire" bloc>
                Vérifier le suivi
              </BoutonLien>
            </div>
          </>
        ) : null}

        {indisponible ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="danger" titre="Les deux voies de récupération sont indisponibles">
                Le service de récupération ne répond pas. Nous ne pouvons ni ouvrir de dossier, ni promettre une heure
                de rétablissement.
              </Alerte>
            </div>
            <p className={scene.carteTexte} style={{ marginTop: 'var(--e-3)' }}>
              Si votre accès est indispensable maintenant, contactez votre responsable hiérarchique : la continuité
              passe par une procédure humaine, pas par un contournement technique.
            </p>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/indisponibilite?etat=panne" bloc>
                Voir l’état du service
              </BoutonLien>
            </div>
          </>
        ) : null}

        {!envoyee && !sansReponse && !indisponible ? (
          <>
            <div className={scene.choix} style={{ marginTop: 'var(--e-4)' }}>
              <div className={scene.option} style={{ gridTemplateColumns: 'auto 1fr auto', cursor: 'default' }}>
                <KeyRound aria-hidden="true" size={18} style={{ color: 'var(--accent)' }} />
                <span>
                  <span className={scene.option__titre}>J’ai perdu mon facteur d’authentification</span>
                  <span className={scene.option__detail}>
                    Clé égarée, téléphone remplacé, codes de secours épuisés.
                  </span>
                </span>
                <BoutonLien vers="/ecran/suivi-recuperation?etat=en-cours" variante="secondaire" taille="sm">
                  Ouvrir
                </BoutonLien>
              </div>
              <div className={scene.option} style={{ gridTemplateColumns: 'auto 1fr auto', cursor: 'default' }}>
                <MailQuestion aria-hidden="true" size={18} style={{ color: 'var(--encre-500)' }} />
                <span>
                  <span className={scene.option__titre}>Je n’ai plus accès à mon adresse professionnelle</span>
                  <span className={scene.option__detail}>
                    Procédure de support, vérification d’identité par un second acteur.
                  </span>
                </span>
                <BoutonLien vers="/ecran/decision-recuperation?etat=file" variante="secondaire" taille="sm">
                  Voir le support
                </BoutonLien>
              </div>
            </div>

            <form
              className={scene.formulaire}
              onSubmit={(evenement) => {
                evenement.preventDefault();
                changer(identifiant.trim() === '' ? 'sans-reponse' : 'envoyee');
              }}
            >
              <Champ
                label="Identifiant ou adresse professionnelle"
                name="identifiant-recuperation"
                autoComplete="username"
                value={identifiant}
                onChange={(evenement) => setIdentifiant(evenement.target.value)}
                aide="Sert uniquement à retrouver un éventuel dossier — aucune réponse ne confirmera son existence."
              />
              <Bouton type="submit" bloc icone={<Send aria-hidden="true" size={16} />}>
                Envoyer une demande de récupération
              </Bouton>
            </form>
          </>
        ) : null}

        <p className={scene.lienSecondaire}>
          <BoutonLien vers="/ecran/identification" variante="discret" taille="sm">
            Retour à la connexion
            <ArrowRight aria-hidden="true" size={14} style={{ marginLeft: 4 }} />
          </BoutonLien>
        </p>
      </SceneAuth>
    </CoquilleEcran>
  );
};
