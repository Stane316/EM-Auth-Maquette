/**
 * A04 — Orchestration du retrait
 * Exigences : REQ-13-11 · REQ-13-12 · REQ-13-13
 * Acteur : responsable / administrateur
 * Rendu prescienti : interface React (démonstration ici)
 * Nature : maquette fictive, aucune révocation réelle
 */
import { Bike, CircleDashed, PlayCircle, RotateCcw, ShieldQuestion } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { CIBLES } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

type EtatExecution = 'fait' | 'en-cours' | 'non-observable' | 'a-faire' | 'echec';

const TON_EXECUTION: Readonly<Record<EtatExecution, { ton: TonPastille; mot: string }>> = {
  fait: { ton: 'succes', mot: 'Effectué' },
  'en-cours': { ton: 'accent', mot: 'En cours' },
  'non-observable': { ton: 'inconnu', mot: 'Non observable' },
  'a-faire': { ton: 'neutre', mot: 'À faire' },
  echec: { ton: 'danger', mot: 'Échec' },
};

const plan = (mode: string): ReadonlyArray<{ id: string; nom: string; etat: EtatExecution; detail: string }> =>
  CIBLES.map((cible, index) => {
    if (mode === 'execution') {
      if (index < 2) return { id: cible.id, nom: cible.nom, etat: 'fait', detail: `Mesuré · ${cible.impact} ${cible.unite}` };
      if (index === 2) return { id: cible.id, nom: cible.nom, etat: 'en-cours', detail: 'Réinitialisation en cours' };
      if (cible.etat === 'non-observable') return { id: cible.id, nom: cible.nom, etat: 'non-observable', detail: 'Aucun accès en lecture' };
      return { id: cible.id, nom: cible.nom, etat: 'a-faire', detail: 'En attente de la cible précédente' };
    }
    if (mode === 'non-observable') {
      if (cible.etat === 'non-observable') return { id: cible.id, nom: cible.nom, etat: 'non-observable', detail: 'Aucun accès en lecture' };
      return { id: cible.id, nom: cible.nom, etat: 'fait', detail: `Mesuré · ${cible.impact} ${cible.unite}` };
    }
    if (mode === 'reprise') {
      if (index === 3) return { id: cible.id, nom: cible.nom, etat: 'echec', detail: 'Annuaire indisponible au moment du retrait' };
      if (index < 3) return { id: cible.id, nom: cible.nom, etat: 'fait', detail: `Mesuré · ${cible.impact} ${cible.unite}` };
      return { id: cible.id, nom: cible.nom, etat: 'a-faire', detail: 'Reprise non démarrée' };
    }
    if (mode === 'cloture') {
      if (cible.etat === 'non-observable') return { id: cible.id, nom: cible.nom, etat: 'non-observable', detail: 'Aucun accès en lecture' };
      if (index === 3) return { id: cible.id, nom: cible.nom, etat: 'echec', detail: 'Annuaire indisponible' };
      return { id: cible.id, nom: cible.nom, etat: 'fait', detail: `Mesuré · ${cible.impact} ${cible.unite}` };
    }
    return { id: cible.id, nom: cible.nom, etat: 'a-faire', detail: cible.portee };
  });

export const A04OrchestrationRetrait = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const lignes = plan(actif.cle);

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <Carte
        id="plan"
        titre="Orchestration — retrait usr_0388"
        sousTitre="Cinq cibles, cinq mesures. Aucune cible n’est présumée retirée."
        action={
          <Pastille ton={actif.cle === 'cloture' ? 'alerte' : actif.cle === 'reprise' ? 'danger' : 'accent'}>
            {actif.cle === 'cloture' ? 'Clôturé partiellement' : actif.cle === 'reprise' ? 'Reprise requise' : 'En cours'}
          </Pastille>
        }
        pied={
          <>
            <span style={{ fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
              Opération mrq_4de0 · demandeur A. Sossou · preuve fraîche validée
            </span>
            <BoutonLien vers="/ecran/resultat-non-confirme?etat=non-confirme" variante="secondaire" taille="sm">
              Vue du résultat (E11)
            </BoutonLien>
          </>
        }
      >
        <Tableau
          legende="Plan d’exécution par cible — données fictives"
          colonnes={[
            { cle: 'cible', titre: 'Cible' },
            { cle: 'etat', titre: 'État' },
            { cle: 'detail', titre: 'Détail' },
          ]}
          lignes={lignes.map((ligne) => ({
            cle: ligne.id,
            cellules: {
              cible: ligne.nom,
              etat: <Pastille ton={TON_EXECUTION[ligne.etat].ton}>{TON_EXECUTION[ligne.etat].mot}</Pastille>,
              detail: ligne.detail,
            },
          }))}
        />

        {actif.cle === 'plan' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="info" titre="Le plan est révisable, l’exécution ne l’est pas">
              Vous pouvez encore modifier les cibles. Une fois lancée, chaque action est journalisée et ne peut pas être
              annulée : seule une nouvelle opération peut rétablir un accès.
            </Alerte>
            <div style={{ marginTop: 'var(--e-3)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
              <Bouton onClick={() => changer('execution')} icone={<PlayCircle aria-hidden="true" size={16} />}>
                Lancer l’exécution
              </Bouton>
              <BoutonLien vers="/ecran/retrait-par-cible?etat=impact" variante="secondaire">
                Revérifier l’impact
              </BoutonLien>
            </div>
          </div>
        ) : null}

        {actif.cle === 'execution' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="info" titre="Progression cible par cible">
              Deux cibles sont mesurées, une est en cours, deux sont en attente. Une barre unique afficherait ici « 50 % »
              et masquerait le fait que la cible 3 est une réinitialisation de facteur, plus lente par nature.
            </Alerte>
          </div>
        ) : null}

        {actif.cle === 'non-observable' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="inconnu" titre="Une cible ne répond pas — et ne répondra pas">
              Les caches applicatifs n’exposent pas d’interface de vérification. Le statut restera « non observable »
              dans le bilan final. Ce n’est pas une erreur de l’orchestrateur : c’est une limite de périmètre, écrite
              noir sur blanc.
            </Alerte>
          </div>
        ) : null}

        {actif.cle === 'reprise' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="L’annuaire applicatif n’a pas répondu">
              La cible 4 a échoué. Rejouer l’opération ne redéclenchera pas les cibles déjà effectuées : l’orchestrateur
              est idempotent par cible. C’est ce qui rend une reprise sûre.
            </Alerte>
            <div style={{ marginTop: 'var(--e-3)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
              <Bouton onClick={() => changer('execution')} icone={<RotateCcw aria-hidden="true" size={16} />}>
                Reprendre à la cible 4
              </Bouton>
              <Bouton variante="secondaire" onClick={() => changer('cloture')}>
                Clôturer en l’état
              </Bouton>
            </div>
          </div>
        ) : null}

        {actif.cle === 'cloture' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Clôture partielle — bilan assumé">
              3 cibles sur 5 sont confirmées, 1 a échoué, 1 reste non observable. Le compte est considéré comme retiré
              pour l’essentiel, mais l’incertitude subsiste sur deux points. Elle est conservée telle quelle.
            </Alerte>
            <ul style={{ display: 'grid', gap: 7, marginTop: 'var(--e-3)', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <li style={{ display: 'flex', gap: 7 }}>
                <Bike aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Les sessions et les jetons sont bien révoqués : c’est mesuré.
              </li>
              <li style={{ display: 'flex', gap: 7 }}>
                <CircleDashed aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--danger)' }} />
                L’annuaire applicatif n’a pas confirmé : une action manuelle est nécessaire.
              </li>
              <li style={{ display: 'flex', gap: 7 }}>
                <ShieldQuestion aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--inconnu)' }} />
                Les caches restent non observables : à traiter par la procédure d’exploitation.
              </li>
            </ul>
            <div style={{ marginTop: 'var(--e-3)' }}>
              <BoutonLien vers="/ecran/resultat-non-confirme?etat=echec-verifie">
                Voir le constat d’échec vérifié
              </BoutonLien>
            </div>
          </div>
        ) : null}
      </Carte>

      <Carte titre="Règles tenues par l’orchestrateur" sousTitre="Ce qui le distingue d’un simple bouton" id="regles" serre>
        <ul style={{ display: 'grid', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
          <li>· Chaque cible est traitée indépendamment : une cible en échec ne bloque pas les suivantes.</li>
          <li>· Une cible déjà effectuée n’est jamais rejouée : la reprise est sûre.</li>
          <li>· Une cible muette reste « non observable » ; elle ne devient jamais « effectuée » par défaut.</li>
          <li>· Le bilan final expose les incertitudes au lieu de les arrondir à un pourcentage.</li>
        </ul>
      </Carte>
    </CoquilleEcran>
  );
};
