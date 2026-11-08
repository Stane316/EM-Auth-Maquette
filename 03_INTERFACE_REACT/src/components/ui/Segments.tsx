import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { EtatEcran } from '../../donnees/etats';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

const MARQUE: Record<EtatEcran['nature'], string> = {
  nominal: '',
  limite: styles['segment__marque--limite'] ?? '',
  erreur: styles['segment__marque--erreur'] ?? '',
  systeme: styles['segment__marque--systeme'] ?? '',
};

const NATURE_LISIBLE: Record<EtatEcran['nature'], string> = {
  nominal: 'cas nominal',
  limite: 'état limite',
  erreur: 'cas d’erreur',
  systeme: 'défaillance système',
};

/**
 * Sélecteur d'états conforme au motif d'onglets : une seule tabulation entre
 * dans le groupe, les flèches circulent, `aria-selected` porte l'état.
 */
export const Segments = ({
  etats,
  actif,
  onChange,
  idPanneau,
}: {
  readonly etats: readonly EtatEcran[];
  readonly actif: string;
  readonly onChange: (cle: string) => void;
  readonly idPanneau: string;
}) => {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const surTouche = (evenement: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const dernier = etats.length - 1;
    let cible: number | null = null;
    if (evenement.key === 'ArrowRight') cible = index === dernier ? 0 : index + 1;
    if (evenement.key === 'ArrowLeft') cible = index === 0 ? dernier : index - 1;
    if (evenement.key === 'Home') cible = 0;
    if (evenement.key === 'End') cible = dernier;
    if (cible === null) return;
    evenement.preventDefault();
    const suivant = etats[cible];
    if (!suivant) return;
    onChange(suivant.cle);
    refs.current[cible]?.focus();
  };

  return (
    <div className={styles.segments} role="tablist" aria-label="États démontrés par cet écran">
      {etats.map((etat, index) => {
        const selectionne = etat.cle === actif;
        return (
          <button
            key={etat.cle}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`onglet-${etat.cle}`}
            aria-selected={selectionne}
            aria-controls={idPanneau}
            tabIndex={selectionne ? 0 : -1}
            className={styles.segment}
            onClick={() => onChange(etat.cle)}
            onKeyDown={(evenement) => surTouche(evenement, index)}
          >
            <span className={cx(styles.segment__marque, MARQUE[etat.nature])} aria-hidden="true" />
            {etat.libelle}
            <span className="visuellement-cache"> ({NATURE_LISIBLE[etat.nature]})</span>
          </button>
        );
      })}
    </div>
  );
};
