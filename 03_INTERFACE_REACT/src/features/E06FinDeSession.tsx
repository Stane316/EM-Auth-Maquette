/**
 * E06 — Fin de session
 * Exigences : REQ-13-19 · REQ-13-31
 * Acteur : utilisateur
 * Rendu pressenti : thème Keycloak / BFF (démonstration ici)
 * Nature : maquette fictive, aucune révocation réelle
 */
import { Check, DoorClosed, LogOut, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { SESSIONS } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

export const E06FinDeSession = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [fermees, setFermees] = useState(false);
  const partielle = actif.cle === 'revocation-partielle';
  const echec = actif.cle === 'echec-local';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        large
        contexte={
          <BlocContexte
            marque="EM AUTH · fin de session"
            titre="« Déconnecté ici » n’est pas « déconnecté partout »"
            texte="La déconnexion d’un navigateur est fiable et immédiate. La fermeture des autres sessions dépend de services tiers : elle se constate, elle ne se présume pas."
            points={[
              'La certitude locale est affirmée sans réserve.',
              'Le sort des autres sessions est annoncé comme non confirmé, avec sa conséquence.',
              'Un échec local n’est jamais présenté comme une déconnexion réussie.',
            ]}
          />
        }
      >
        {echec ? (
          <>
            <Pastille ton="danger">Déconnexion non garantie</Pastille>
            <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
              La fermeture locale a échoué
            </h2>
            <p className={scene.carteTexte}>
              Le navigateur n’a pas pu supprimer l’état de session. Sur un poste partagé, cela signifie que la session
              peut rester utilisable.
            </p>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="danger" titre="Que faire maintenant">
                Fermez complètement le navigateur, puis signalez ce poste à votre support. Ne laissez pas la machine
                sans surveillance en attendant.
              </Alerte>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <Bouton variante="danger" onClick={() => changer('confirmation')}>
                Réessayer la déconnexion
              </Bouton>
              <BoutonLien vers="/ecran/identification" variante="secondaire">
                Retour à l’identification
              </BoutonLien>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pastille ton="succes">Déconnecté de cet appareil</Pastille>
              <span style={{ color: 'var(--encre-500)', fontSize: 'var(--t-2xs)' }}>à l’instant</span>
            </div>
            <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
              Votre session sur ce navigateur est terminée
            </h2>
            <p className={scene.carteTexte}>
              L’état de session a été supprimé localement. Ce qui suit concerne les autres appareils, et n’a pas le
              même degré de certitude.
            </p>

            <div style={{ marginTop: 'var(--e-4)', display: 'grid', gap: 8 }}>
              {SESSIONS.filter((session) => !session.courante).map((session) => (
                <div
                  key={session.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: 10,
                    alignItems: 'center',
                    padding: '10px 12px',
                    border: '1px solid var(--trait)',
                    borderRadius: 'var(--r-2)',
                    background: '#fbfcfe',
                  }}
                >
                  <Smartphone aria-hidden="true" size={16} style={{ color: 'var(--encre-500)' }} />
                  <span>
                    <span style={{ display: 'block', fontSize: 'var(--t-s)', color: 'var(--encre-900)', fontWeight: 500 }}>
                      {session.appareil}
                    </span>
                    <span style={{ fontSize: 'var(--t-2xs)', color: 'var(--encre-500)' }}>
                      {session.emplacement} · activité {session.activite}
                    </span>
                  </span>
                  {fermees ? <Pastille ton="inconnu">Non confirmé</Pastille> : <Pastille ton="neutre">Ouverte</Pastille>}
                </div>
              ))}
            </div>

            {fermees || partielle ? (
              <div style={{ marginTop: 'var(--e-4)' }}>
                <Alerte ton="inconnu" titre="Fermeture des autres sessions demandée, non confirmée">
                  La demande a été transmise. Nous n’avons pas reçu de confirmation de chaque application : certaines
                  sessions peuvent rester actives quelques instants. Une vérification est possible depuis l’écran des
                  sessions actives.
                </Alerte>
              </div>
            ) : null}

            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              {!fermees ? (
                <Bouton
                  variante="secondaire"
                  bloc
                  onClick={() => {
                    setFermees(true);
                    changer('revocation-partielle');
                  }}
                  icone={<LogOut aria-hidden="true" size={16} />}
                >
                  Fermer aussi les autres sessions
                </Bouton>
              ) : null}
              <BoutonLien vers="/ecran/identification" variante={fermees ? 'primaire' : 'discret'} bloc>
                Terminer
              </BoutonLien>
            </div>

            <p className={scene.lienSecondaire}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Check aria-hidden="true" size={13} />
                Fermeture locale effectuée
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <DoorClosed aria-hidden="true" size={13} />
                Révocation distante : non confirmée
              </span>
            </p>
          </>
        )}
      </SceneAuth>
    </CoquilleEcran>
  );
};
