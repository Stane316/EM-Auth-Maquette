/**
 * E01 — Invitation et accueil
 * Exigences : REQ-13-03 · REQ-13-04
 * Acteur : destinataire invité
 * Rendu pressenti : page publique BFF (démonstration ici)
 * Nature : maquette fictive, aucun service connecté
 */
import { ArrowRight, Clock, Flag, Mail, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

const Faits = ({ children }: { readonly children: React.ReactNode }) => <dl className={scene.faits}>{children}</dl>;

const Fait = ({ terme, children }: { readonly terme: string; readonly children: React.ReactNode }) => (
  <div className={scene.fait}>
    <dt className={scene.fait__terme}>{terme}</dt>
    <dd className={scene.fait__valeur}>{children}</dd>
  </div>
);

export const E01Invitation = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [signale, setSignale] = useState(false);

  const vue = () => {
    switch (actif.cle) {
      case 'expiree':
        return (
          <>
            <h2 className={scene.carteTitre}>Cette invitation a expiré</h2>
            <p className={scene.carteTexte}>
              Un lien d’invitation a une durée de vie limitée. Expiré, il ne peut plus être réactivé : il faut une
              nouvelle invitation, émise par le même service.
            </p>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="alerte" titre="Aucune information sur le compte concerné">
                Par précaution, nous n’indiquons pas à quelle identité ce lien était associé, ni s’il a déjà servi.
              </Alerte>
            </div>
            <div className={scene.actions}>
              <BoutonLien vers="/ecran/perte-ou-aide" variante="secondaire">
                Demander une nouvelle invitation
              </BoutonLien>
              <BoutonLien vers="/" variante="discret" taille="sm">
                Revenir à l’accueil
              </BoutonLien>
            </div>
          </>
        );
      case 'deja-utilisee':
        return (
          <>
            <h2 className={scene.carteTitre}>Ce lien a déjà été utilisé</h2>
            <p className={scene.carteTexte}>
              Chaque invitation ne s’ouvre qu’une fois. Si vous avez déjà accepté cette invitation, connectez-vous
              normalement ; sinon, signalez-le avant de poursuivre.
            </p>
            <Faits>
              <Fait terme="Usage">Lien à usage unique — déjà consommé</Fait>
              <Fait terme="Conséquence">Aucun nouvel accès n’a été créé par cette ouverture</Fait>
              <Fait terme="Trace">L’ouverture est journalisée, sans contenu du lien</Fait>
            </Faits>
            <div className={scene.actions}>
              <BoutonLien vers="/ecran/identification">
                Aller à l’identification
                <ArrowRight aria-hidden="true" size={16} style={{ marginLeft: 8 }} />
              </BoutonLien>
              <BoutonLien vers="/ecran/perte-ou-aide" variante="discret" taille="sm">
                Ce n’était pas moi
              </BoutonLien>
            </div>
          </>
        );
      case 'expediteur-inconnu':
        return (
          <>
            <h2 className={scene.carteTitre}>Vous ne reconnaissez pas l’expéditeur</h2>
            <p className={scene.carteTexte}>
              Une invitation qui ne vient pas d’un service que vous connaissez doit être traitée comme suspecte. Nous
              n’ouvrons pas le parcours tant que vous n’avez pas choisi.
            </p>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="danger" titre="Ne saisissez rien pour l’instant" role="alert">
                Aucun mot de passe ni code ne vous sera jamais demandé depuis un lien d’invitation.
              </Alerte>
            </div>
            <div className={scene.actions}>
              <Bouton variante="danger" onClick={() => setSignale(true)} icone={<Flag aria-hidden="true" size={16} />}>
                Signaler cette invitation
              </Bouton>
              <BoutonLien vers="/" variante="secondaire">
                Quitter sans rien faire
              </BoutonLien>
            </div>
            {signale ? (
              <div style={{ marginTop: 'var(--e-4)' }}>
                <Alerte ton="succes" titre="Signalement enregistré dans cette démonstration">
                  Dans l’application réelle, ce signalement remonterait au responsable sécurité. Ici, rien n’a été
                  transmis : la maquette n’a pas de service derrière elle.
                </Alerte>
              </div>
            ) : null}
          </>
        );
      default:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--e-2)' }}>
              <Pastille ton="accent">Invitation valide</Pastille>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--encre-500)', fontSize: 'var(--t-2xs)' }}>
                <Clock aria-hidden="true" size={13} />
                Expire dans 2 jours
              </span>
            </div>
            <h2 className={scene.carteTitre}>Vous êtes invité à rejoindre Em-Auth</h2>
            <p className={scene.carteTexte}>
              Prenez une minute pour vérifier l’origine de cette invitation avant d’accepter.
            </p>
            <Faits>
              <Fait terme="Service">Portail commercial</Fait>
              <Fait terme="Invité par">A. Sossou — gestionnaire d’accès</Fait>
              <Fait terme="Rôle proposé">Utilisateur (aucun privilège d’administration)</Fait>
              <Fait terme="Adresse visée">Votre adresse professionnelle</Fait>
              <Fait terme="Nature du lien">À usage unique, nominatif</Fait>
            </Faits>
            <div className={scene.formulaire}>
              <BoutonLien vers="/ecran/identification" bloc icone={<ArrowRight aria-hidden="true" size={16} />}>
                Accepter et m’identifier
              </BoutonLien>
              <Bouton variante="secondaire" bloc onClick={() => changer('expediteur-inconnu')}>
                Je ne reconnais pas cette invitation
              </Bouton>
            </div>
            <p className={scene.lienSecondaire}>
              <span>
                <Mail aria-hidden="true" size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                Vérifiez l’adresse d’expédition de votre courriel.
              </span>
              <span className="mono">Réf. inv_8f21c4</span>
            </p>
          </>
        );
    }
  };

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        aurora
        contexte={
          <BlocContexte
            marque="EM AUTH · invitation"
            titre="Une invitation n’est pas une connexion"
            texte="Elle ouvre un droit d’entrer, une seule fois. L’identité n’est prouvée qu’à l’étape suivante, et le rôle n’est accordé qu’après décision."
            points={[
              'L’expéditeur, le rôle proposé et l’échéance sont visibles avant tout clic.',
              'Un lien expiré ou déjà utilisé ne divulgue aucune information sur le compte.',
              'Un doute sur l’origine est un motif suffisant pour ne pas poursuivre.',
            ]}
          />
        }
      >
        {vue()}
      </SceneAuth>

      <div style={{ marginTop: 'var(--e-4)' }}>
        <Alerte ton="inconnu" titre="Écran de démonstration" role="status">
          Cette invitation est fictive. Aucun courriel n’a été envoyé, aucun compte n’existe.{' '}
          <ShieldAlert aria-hidden="true" size={13} style={{ verticalAlign: '-2px' }} /> Les montants, délais et
          effectifs ne sont pas représentés.
        </Alerte>
      </div>
    </CoquilleEcran>
  );
};
