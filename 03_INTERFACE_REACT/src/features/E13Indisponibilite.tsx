/**
 * E13 — Service indisponible
 * Exigences : REQ-13-21 · REQ-13-28
 * Acteur : tous (transversal)
 * Rendu pressenti : composant partagé (proxy/BFF)
 * Nature : maquette fictive, aucun service surveillé
 */
import { Activity, CheckCircle2, Clock, ServerCrash, Wrench } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { APPLICATIONS } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

const TON: Readonly<Record<string, { ton: TonPastille; mot: string }>> = {
  operationnel: { ton: 'succes', mot: 'Opérationnel' },
  degrade: { ton: 'alerte', mot: 'Dégradé' },
  indisponible: { ton: 'danger', mot: 'Indisponible' },
  inconnu: { ton: 'inconnu', mot: 'État inconnu' },
};

export const E13Indisponibilite = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const panne = actif.cle === 'panne';
  const degrade = actif.cle === 'degrade';
  const maintenance = actif.cle === 'maintenance';
  const retour = actif.cle === 'retour';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        large
        contexte={
          <BlocContexte
            marque="EM AUTH · disponibilité"
            titre="Dire la vérité sur ce qu’on ignore"
            texte="Un écran d’incident qui invente un délai de rétablissement crée un faux contrat. Ici, la durée est inconnue, et c’est écrit."
            points={[
              'Aucune heure de retour annoncée sans engagement réel.',
              'Ce qui fonctionne encore est listé, sans surpromesse.',
              'La voie de secours est humaine quand la technique ne suffit pas.',
            ]}
          />
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {panne ? <Pastille ton="danger">Indisponibilité totale</Pastille> : null}
          {degrade ? <Pastille ton="alerte">Mode dégradé</Pastille> : null}
          {maintenance ? <Pastille ton="accent">Maintenance annoncée</Pastille> : null}
          {retour ? <Pastille ton="succes">Service rétabli</Pastille> : null}
          <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
            incident inc_2026_11_08
          </span>
        </div>

        <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
          {panne ? 'Le service d’authentification ne répond pas' : null}
          {degrade ? 'Le service fonctionne partiellement' : null}
          {maintenance ? 'Une maintenance est en cours' : null}
          {retour ? 'Le service est revenu' : null}
        </h2>

        <p className={scene.carteTexte}>
          {panne
            ? 'Nous ne pouvons ni vérifier votre identité, ni ouvrir de session. La durée de rétablissement est inconnue : nous ne l’annonçons pas.'
            : null}
          {degrade
            ? 'L’authentification par mot de passe et code fonctionne. Les clés de sécurité ne sont pas acceptées pour le moment.'
            : null}
          {maintenance
            ? 'La fenêtre de maintenance est prévue et peut être prolongée. Aucun engagement de fin n’est affiché tant qu’il n’est pas tenu.'
            : null}
          {retour
            ? 'Le service répond de nouveau. Le retour est constaté par mesure, pas annoncé par avance.'
            : null}
        </p>

        {panne ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="danger" titre="Aucune action ne peut aboutir maintenant" role="alert">
                Toute saisie serait perdue. Ne réessayez pas en boucle : cela aggrave la charge et ne rétablit rien.
              </Alerte>
            </div>
            <div style={{ marginTop: 'var(--e-4)', display: 'grid', gap: 8 }}>
              <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
                <Clock aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Durée de rétablissement : <strong>inconnue</strong>.
              </p>
              <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
                <ServerCrash aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Si votre accès est indispensable, contactez votre responsable hiérarchique selon la procédure interne.
              </p>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/fin-de-session" variante="secondaire" bloc>
                Vérifier ma session
              </BoutonLien>
            </div>
          </>
        ) : null}

        {degrade ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="alerte" titre="Ce qui marche encore">
                Mot de passe + code à usage unique. Les opérations exigeant une preuve fraîche (retrait, enrôlement)
                sont suspendues : elles ne peuvent pas être faites « au mieux ».
              </Alerte>
            </div>
            <div className={scene.formulaire}>
              <BoutonLien vers="/ecran/identification" bloc>
                Se connecter par mot de passe et code
              </BoutonLien>
              <BoutonLien vers="/ecran/preuve-fraiche" variante="secondaire" bloc>
                Voir l’écran de preuve fraîche (suspendu)
              </BoutonLien>
            </div>
          </>
        ) : null}

        {maintenance ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="info" titre="Fenêtre de maintenance">
                Une opération de maintenance est en cours sur le service d’authentification. Elle peut se prolonger :
                aucune heure de fin n’est garantie.
              </Alerte>
            </div>
            <div className={scene.actions}>
              <BoutonLien vers="/" variante="secondaire" bloc>
                Revenir au portail
              </BoutonLien>
            </div>
          </>
        ) : null}

        {retour ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="succes" titre="Retour constaté">
                Le service répond. Si votre session a expiré pendant l’incident, la reprise se fait depuis
                l’identification ; aucun travail n’est perdu côté données.
              </Alerte>
            </div>
            <div className={scene.actions}>
              <BoutonLien vers="/ecran/identification" bloc icone={<CheckCircle2 aria-hidden="true" size={16} />}>
                Se connecter
              </BoutonLien>
            </div>
          </>
        ) : null}

        <div style={{ marginTop: 'var(--e-5)' }}>
          <p className={scene.carteTexte} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity aria-hidden="true" size={15} />
            État déclaré des applications rattachées
          </p>
          <ul style={{ display: 'grid', gap: 6, marginTop: 'var(--e-3)' }}>
            {APPLICATIONS.map((application) => (
              <li
                key={application.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '8px 10px',
                  border: '1px solid var(--trait)',
                  borderRadius: 'var(--r-2)',
                  background: '#fbfcfe',
                  fontSize: 'var(--t-xs)',
                }}
              >
                <span>
                  <span style={{ color: 'var(--encre-900)', fontWeight: 500 }}>{application.nom}</span>
                  <span style={{ color: 'var(--encre-500)' }}> · {application.portee}</span>
                </span>
                <Pastille ton={TON[application.etat]?.ton ?? 'neutre'}>{TON[application.etat]?.mot ?? application.etat}</Pastille>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
            <Wrench aria-hidden="true" size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
            Ces états sont fictifs et ne proviennent d’aucune supervision réelle.
          </p>
        </div>
      </SceneAuth>
    </CoquilleEcran>
  );
};
