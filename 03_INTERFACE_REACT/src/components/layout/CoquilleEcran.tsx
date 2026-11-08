import { Target } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Ecran } from '../../donnees/ecrans';
import type { EtatEcran } from '../../donnees/etats';
import { Revele } from '../ui/Revele';
import { Segments } from '../ui/Segments';
import { EnteteEcran } from './EnteteEcran';
import { RailEcran } from './RailEcran';
import styles from './ecran.module.css';

const ID_PANNEAU = 'panneau-etat';

/**
 * Gabarit commun : en-tête tracé, bandeau d'états, corps d'écran, rail de rigueur.
 * Le corps est fourni par la feature ; il reçoit l'état courant, jamais son propre
 * sélecteur, pour qu'un écran ne puisse pas « oublier » ses états.
 */
export const CoquilleEcran = ({
  ecran,
  etats,
  actif,
  onChangeEtat,
  children,
}: {
  readonly ecran: Ecran;
  readonly etats: readonly EtatEcran[];
  readonly actif: EtatEcran;
  readonly onChangeEtat: (cle: string) => void;
  readonly children: ReactNode;
}) => (
  <div className={styles.ecran}>
    <EnteteEcran ecran={ecran} />

    <section className={styles.bandeau} aria-label="États démontrés">
      <div className={styles.bandeau__ligne}>
        <span className={styles.bandeau__label}>États</span>
        <span className={styles.bandeau__compteur}>
          {etats.length} état{etats.length > 1 ? 's' : ''} pour cet écran
        </span>
      </div>
      <Segments etats={etats} actif={actif.cle} onChange={onChangeEtat} idPanneau={ID_PANNEAU} />
      <p className={styles.preuve}>
        <Target aria-hidden="true" />
        <span>
          <strong>{actif.libelle}</strong> — {actif.preuve}
        </span>
      </p>
    </section>

    <div className={styles.grille}>
      <div className={styles.corps} id={ID_PANNEAU} role="tabpanel" aria-labelledby={`onglet-${actif.cle}`} tabIndex={0}>
        <Revele cle={actif.cle}>{children}</Revele>
      </div>
      <RailEcran ecran={ecran} actif={actif} />
    </div>
  </div>
);
