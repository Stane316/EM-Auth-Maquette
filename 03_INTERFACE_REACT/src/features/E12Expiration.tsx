/**
 * E12 — Expiration et inactivité
 * Exigences : REQ-13-18 · REQ-13-20 · REQ-13-31
 * Acteur : utilisateur
 * Rendu pressenti : composant partagé BFF/UI
 * Nature : maquette fictive, compte à rebours de démonstration
 */
import { Hourglass, RotateCcw, Save } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

export const E12Expiration = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const expiree = actif.cle === 'expiree';
  const reprise = actif.cle === 'reprise';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · inactivité"
            titre="Prévenir plutôt que jeter le travail"
            texte="Une expiration silencieuse fait perdre la saisie en cours et pousse les utilisateurs à désactiver les délais. L’avertissement, lui, est une mesure de sécurité qui se respecte."
            points={[
              'L’échéance est annoncée avant, pas au moment de la coupure.',
              'Le travail en cours est conservé, jamais détruit par le délai.',
              'La reprise réauthentifie, mais ramène à l’écran quitté.',
            ]}
          />
        }
      >
        {!expiree && !reprise ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pastille ton="alerte">Inactivité détectée</Pastille>
              <span style={{ color: 'var(--encre-500)', fontSize: 'var(--t-2xs)' }}>échéance proche</span>
            </div>
            <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
              Votre session va se fermer
            </h2>
            <p className={scene.carteTexte}>
              Vous n’avez pas eu d’activité depuis un moment. Par sécurité, la session se fermera automatiquement pour
              éviter qu’un poste laissé ouvert reste utilisable.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 'var(--e-4)',
                padding: 'var(--e-3) var(--e-4)',
                border: '1px solid var(--alerte)',
                borderRadius: 'var(--r-2)',
                background: 'var(--alerte-voile)',
              }}
            >
              <Hourglass aria-hidden="true" size={20} style={{ color: 'var(--alerte)' }} />
              <div>
                <p className="mono" style={{ fontSize: 'var(--t-xl)', color: 'var(--encre-900)', fontWeight: 600 }}>
                  01:42
                </p>
                <p style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                  compte à rebours de démonstration — la durée réelle relève de la politique
                </p>
              </div>
            </div>

            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <Bouton bloc onClick={() => changer('reprise')} icone={<Save aria-hidden="true" size={16} />}>
                Rester connecté et continuer
              </Bouton>
              <Bouton variante="secondaire" bloc onClick={() => changer('expiree')}>
                Laisser expirer
              </Bouton>
            </div>

            <p className={scene.simulation}>
              <Save aria-hidden="true" />
              <span>Votre brouillon est conservé localement tant que l’onglet reste ouvert.</span>
            </p>
          </>
        ) : null}

        {expiree ? (
          <>
            <Pastille ton="inconnu">Session expirée</Pastille>
            <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
              La session est fermée
            </h2>
            <p className={scene.carteTexte}>
              Aucune action n’a été exécutée depuis l’expiration. Votre travail n’a pas été perdu : il attend une
              réauthentification.
            </p>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="info" titre="Ce qui a été conservé">
                Le brouillon de la demande en cours et la position dans le parcours sont conservés. Les jetons de
                session, eux, ont été invalidés.
              </Alerte>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/identification" bloc icone={<RotateCcw aria-hidden="true" size={16} />}>
                Se reconnecter et reprendre
              </BoutonLien>
              <BoutonLien vers="/" variante="discret" taille="sm">
                Quitter
              </BoutonLien>
            </div>
          </>
        ) : null}

        {reprise ? (
          <>
            <Pastille ton="succes">Reprise effectuée</Pastille>
            <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
              Vous êtes revenu là où vous étiez
            </h2>
            <p className={scene.carteTexte}>
              La réauthentification a été ciblée sur la session, sans redémarrer le parcours. Le brouillon conservé est
              restauré tel quel.
            </p>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="succes" titre="Reprise sans perte">
                Vous pouvez poursuivre la demande de récupération ou le retrait en cours.
              </Alerte>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/retrait-par-cible?etat=impact" bloc>
                Reprendre le retrait en cours
              </BoutonLien>
              <BoutonLien vers="/ecran/suivi-recuperation?etat=en-cours" variante="secondaire" bloc>
                Reprendre le dossier de récupération
              </BoutonLien>
            </div>
          </>
        ) : null}
      </SceneAuth>
    </CoquilleEcran>
  );
};
