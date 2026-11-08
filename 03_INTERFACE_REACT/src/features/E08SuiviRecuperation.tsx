/**
 * E08 — Suivi de récupération
 * Exigences : REQ-13-08 · REQ-13-09
 * Acteur : utilisateur + support
 * Rendu pressenti : interface React (démonstration ici)
 * Nature : maquette fictive, aucune décision réelle
 */
import { CalendarClock, CircleDashed, CircleSlash, Clock3, UserCheck } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { ETAPES_RECUPERATION } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

const TON_ETAPE: Readonly<Record<(typeof ETAPES_RECUPERATION)[number]['etat'], { ton: TonPastille; mot: string }>> = {
  fait: { ton: 'succes', mot: 'Fait' },
  'en-cours': { ton: 'accent', mot: 'En cours' },
  'a-venir': { ton: 'neutre', mot: 'À venir' },
  bloque: { ton: 'danger', mot: 'Bloqué' },
};

const STATUT_DOSSIER = {
  'en-cours': { ton: 'accent' as TonPastille, libelle: 'En cours de traitement' },
  'attente-2': { ton: 'alerte' as TonPastille, libelle: 'Second acteur attendu' },
  approuvee: { ton: 'succes' as TonPastille, libelle: 'Approuvé — accès non encore rétabli' },
  refusee: { ton: 'danger' as TonPastille, libelle: 'Refusé' },
  expiree: { ton: 'inconnu' as TonPastille, libelle: 'Expiré' },
};

export const E08SuiviRecuperation = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const statut = STATUT_DOSSIER[actif.cle as keyof typeof STATUT_DOSSIER] ?? STATUT_DOSSIER['en-cours'];

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <Carte
        id="dossier"
        titre="Dossier dem_5512 — récupération d’accès"
        sousTitre="Ouvert par K. Adjo · clé de sécurité égarée, aucun code de secours disponible"
        action={<Pastille ton={statut.ton}>{statut.libelle}</Pastille>}
        pied={
          <>
            <span style={{ fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
              Aucun délai de traitement n’est affiché : il n’est pas fixé dans le cahier des charges.
            </span>
            <BoutonLien vers="/ecran/decision-recuperation?etat=dossier" variante="secondaire" taille="sm">
              Vue du décideur (A03)
            </BoutonLien>
          </>
        }
      >
        {actif.cle === 'attente-2' ? (
          <Alerte ton="alerte" titre="La décision exige un second acteur, distinct du premier">
            R. Houngbédji a réalisé la première vérification. La décision ne peut pas être prise par la même personne :
            le dossier attend A. Sossou. Cette séparation est une règle, pas une courtoisie.
          </Alerte>
        ) : null}

        {actif.cle === 'approuvee' ? (
          <Alerte ton="succes" titre="Dossier approuvé — l’accès n’est pas rétabli pour autant">
            L’approbation autorise l’émission d’un mandat d’enrôlement. Tant que le nouveau facteur n’est pas vérifié, le
            compte reste inutilisable. Confondre les deux états est une erreur fréquente.
          </Alerte>
        ) : null}

        {actif.cle === 'refusee' ? (
          <Alerte ton="danger" titre="Dossier refusé — motif communicable">
            Les pièces fournies ne permettent pas d’établir l’identité avec un niveau suffisant. Le demandeur peut
            rouvrir un dossier avec des pièces complémentaires ; aucun contournement n’est proposé.
          </Alerte>
        ) : null}

        {actif.cle === 'expiree' ? (
          <Alerte ton="inconnu" titre="Dossier expiré sans effet rétroactif">
            L’échéance est dépassée. Aucun droit n’a été accordé, aucune donnée n’a été modifiée. Une nouvelle demande
            est nécessaire et repartira de la première étape.
          </Alerte>
        ) : null}

        <ol style={{ display: 'grid', gap: 0, marginTop: 'var(--e-4)' }}>
          {ETAPES_RECUPERATION.map((etape, index) => {
            const ton = TON_ETAPE[etape.etat];
            const inactif = actif.cle === 'expiree' && etape.etat !== 'fait';
            return (
              <li
                key={etape.titre}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 14,
                  paddingBottom: 'var(--e-4)',
                  paddingTop: index === 0 ? 0 : 0,
                  position: 'relative',
                }}
              >
                <span style={{ display: 'grid', justifyItems: 'center', gap: 0 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      border: `2px solid ${etape.etat === 'fait' ? 'var(--succes)' : etape.etat === 'en-cours' ? 'var(--accent)' : 'var(--trait-fort)'}`,
                      background: etape.etat === 'fait' ? 'var(--succes)' : 'var(--surface)',
                      color: etape.etat === 'fait' ? '#fff' : 'var(--encre-500)',
                      fontSize: 'var(--t-3xs)',
                      fontWeight: 700,
                    }}
                  >
                    {etape.etat === 'fait' ? '✓' : index + 1}
                  </span>
                  {index < ETAPES_RECUPERATION.length - 1 ? (
                    <span
                      aria-hidden="true"
                      style={{ width: 2, flex: 1, minHeight: 18, background: 'var(--trait)', marginTop: 2 }}
                    />
                  ) : null}
                </span>
                <div style={{ paddingTop: 2 }}>
                  <p style={{ color: 'var(--encre-900)', fontSize: 'var(--t-s)', fontWeight: 600 }}>{etape.titre}</p>
                  <p style={{ color: 'var(--encre-500)', fontSize: 'var(--t-xs)', marginTop: 2 }}>{etape.detail}</p>
                </div>
                <div style={{ paddingTop: 2, textAlign: 'right' }}>
                  <Pastille ton={inactif ? 'neutre' : ton.ton}>{inactif ? 'Sans suite' : ton.mot}</Pastille>
                  <p style={{ color: 'var(--encre-500)', fontSize: 'var(--t-3xs)', marginTop: 4 }}>{etape.echeance}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Carte>

      <Carte titre="Traçabilité du dossier" sousTitre="Ce que le demandeur peut vérifier lui-même" id="tracabilite">
        <Tableau
          legende="Événements du dossier dem_5512 — données fictives"
          colonnes={[
            { cle: 'quand', titre: 'Horodatage' },
            { cle: 'qui', titre: 'Acteur' },
            { cle: 'quoi', titre: 'Action' },
            { cle: 'resultat', titre: 'Résultat' },
          ]}
          lignes={[
            {
              cle: '1',
              cellules: {
                quand: <span className="mono">aujourd’hui 08:20</span>,
                qui: 'K. Adjo',
                quoi: 'Ouverture du dossier',
                resultat: <Pastille ton="succes">Enregistré</Pastille>,
              },
            },
            {
              cle: '2',
              cellules: {
                quand: <span className="mono">aujourd’hui 08:41</span>,
                qui: 'R. Houngbédji',
                quoi: 'Vérification d’identité (acteur 1)',
                resultat: <Pastille ton="succes">Favorable</Pastille>,
              },
            },
            {
              cle: '3',
              cellules: {
                quand: <span className="mono">—</span>,
                qui: 'A. Sossou (attendu)',
                quoi: 'Décision indépendante (acteur 2)',
                resultat: <Pastille ton="alerte">En attente</Pastille>,
              },
            },
            {
              cle: '4',
              cellules: {
                quand: <span className="mono">—</span>,
                qui: 'système',
                quoi: 'Émission du mandat d’enrôlement',
                resultat: <Pastille ton="neutre">Non déclenché</Pastille>,
              },
            },
          ]}
        />
        <ul style={{ display: 'grid', gap: 6, marginTop: 'var(--e-4)', fontSize: 'var(--t-xs)', color: 'var(--encre-700)' }}>
          <li style={{ display: 'flex', gap: 6 }}>
            <UserCheck aria-hidden="true" size={14} style={{ marginTop: 2, color: 'var(--encre-500)' }} />
            Deux personnes, deux regards : le premier acteur constate, le second décide.
          </li>
          <li style={{ display: 'flex', gap: 6 }}>
            <CalendarClock aria-hidden="true" size={14} style={{ marginTop: 2, color: 'var(--encre-500)' }} />
            Les échéances restent « à convenir » : la maquette ne fabrique pas de délai.
          </li>
          <li style={{ display: 'flex', gap: 6 }}>
            <Clock3 aria-hidden="true" size={14} style={{ marginTop: 2, color: 'var(--encre-500)' }} />
            Le silence du support n’équivaut pas à un refus : l’état reste « en attente ».
          </li>
        </ul>
      </Carte>

      <Carte titre="Et si le dossier n’avance pas ?" sousTitre="Les issues prévues, aucune impasse" id="issues">
        <div style={{ display: 'grid', gap: 'var(--e-3)' }}>
          <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
            <CircleDashed aria-hidden="true" size={16} style={{ marginTop: 3, flex: 'none', color: 'var(--alerte)' }} />
            Un dossier bloqué est signalé au responsable sécurité. Il n’est jamais clôturé silencieusement.
          </p>
          <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
            <CircleSlash aria-hidden="true" size={16} style={{ marginTop: 3, flex: 'none', color: 'var(--encre-500)' }} />
            Un refus peut être contesté une fois, avec des pièces complémentaires ; il n’existe pas de recours
            automatique.
          </p>
        </div>
      </Carte>
    </CoquilleEcran>
  );
};
