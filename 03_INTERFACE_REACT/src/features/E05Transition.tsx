/**
 * E05 — Transition vers l'application
 * Exigences : REQ-13-16 · REQ-13-36
 * Acteur : système + utilisateur
 * Rendu pressenti : BFF / redirection OIDC (démonstration ici)
 * Nature : maquette fictive, aucun service connecté
 */
import { ArrowRight, LoaderCircle, ShieldCheck, TriangleAlert } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

const ETAPES = ['Session établie', 'Échange avec l’application', 'Redirection'] as const;

export const E05Transition = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const echec = actif.cle === 'echec';
  const etapeCourante = echec ? 1 : actif.cle === 'redirection' ? 2 : 1;

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · transition"
            titre="Ce que l’utilisateur voit pendant l’échange"
            texte="L’échange OIDC manipule des codes et des jetons. Aucun d’eux ne doit apparaître à l’écran, dans l’historique ou dans une capture d’écran."
            points={[
              'Aucun jeton, code d’autorisation ou paramètre de requête n’est affiché.',
              'L’application de destination est nommée, jamais une URL brute.',
              'Un échange interrompu ramène au point de départ, sans session fantôme.',
            ]}
          />
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {echec ? (
            <Pastille ton="danger">Échange interrompu</Pastille>
          ) : actif.cle === 'redirection' ? (
            <Pastille ton="succes">Redirection</Pastille>
          ) : (
            <Pastille ton="accent">En cours</Pastille>
          )}
          <span className="mono" style={{ color: 'var(--encre-500)', fontSize: 'var(--t-3xs)' }}>
            corrélation mrq_71fa
          </span>
        </div>

        <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
          {echec ? 'L’échange n’a pas abouti' : 'Nous vous connectons à Portail commercial'}
        </h2>
        <p className={scene.carteTexte}>
          {echec
            ? 'La session n’a pas été transmise. Rien n’a été ouvert côté application : vous pouvez reprendre l’identification.'
            : 'Ne fermez pas cet onglet. Vous serez redirigé automatiquement vers l’application qui a demandé l’accès.'}
        </p>

        <ol style={{ display: 'grid', gap: 'var(--e-3)', marginTop: 'var(--e-4)' }}>
          {ETAPES.map((etape, index) => {
            const faite = index < etapeCourante || actif.cle === 'redirection';
            const enCours = index === etapeCourante && !echec;
            const bloquee = echec && index === 1;
            return (
              <li key={etape} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center' }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: bloquee ? 'var(--danger-voile)' : faite ? 'var(--succes-voile)' : 'var(--canvas-creux)',
                    color: bloquee ? 'var(--danger)' : faite ? 'var(--succes)' : 'var(--encre-500)',
                    fontSize: 'var(--t-3xs)',
                    fontWeight: 700,
                  }}
                >
                  {bloquee ? '!' : faite ? '✓' : index + 1}
                </span>
                <span style={{ fontSize: 'var(--t-s)', color: bloquee ? 'var(--danger)' : 'var(--encre-900)', fontWeight: 500 }}>
                  {etape}
                </span>
                {enCours ? (
                  <LoaderCircle aria-hidden="true" size={16} className="mono" style={{ animation: 'rotation 1.4s linear infinite' }} />
                ) : null}
              </li>
            );
          })}
        </ol>

        {echec ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="Motif possible : application indisponible ou échange expiré">
              Les deux causes sont distinctes mais l’écran ne les détaille pas, pour ne pas exposer la configuration
              interne. La reprise est identique dans les deux cas.
            </Alerte>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/identification" bloc>
                Reprendre depuis l’identification
              </BoutonLien>
              <BoutonLien vers="/ecran/indisponibilite" variante="secondaire" bloc>
                Voir l’état du service
              </BoutonLien>
            </div>
          </div>
        ) : (
          <div className={scene.actions}>
            <BoutonLien vers="/ecran/fin-de-session" variante="secondaire" bloc>
              Revenir à la session
              <ArrowRight aria-hidden="true" size={15} style={{ marginLeft: 6 }} />
            </BoutonLien>
          </div>
        )}

        <p className={scene.simulation}>
          <ShieldCheck aria-hidden="true" />
          <span>
            Aucun code d’autorisation ni jeton n’est affiché sur cette page — c’est une exigence, pas une omission. La
            mécanique OIDC réelle est décrite dans le cahier V3, pas démontrée ici.
          </span>
        </p>
        <p style={{ marginTop: 'var(--e-3)', display: 'flex', gap: 6, alignItems: 'center', color: 'var(--encre-500)', fontSize: 'var(--t-3xs)' }}>
          <TriangleAlert aria-hidden="true" size={13} />
          Durée de l’échange : non mesurée dans cette maquette.
        </p>
      </SceneAuth>
    </CoquilleEcran>
  );
};
