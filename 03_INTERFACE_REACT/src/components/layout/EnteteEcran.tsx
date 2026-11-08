import { ECRANS, GROUPES } from '../../donnees/ecrans';
import type { Ecran } from '../../donnees/ecrans';
import { cx } from '../../lib/cx';
import { Pastille } from '../ui/Pastille';
import styles from './ecran.module.css';

const COMPLEXITE: Readonly<Record<Ecran['complexite'], string>> = {
  faible: 'Faible',
  moyenne: 'Moyenne',
  elevee: 'Élevée',
};

/**
 * En-tête d'écran : identité (id + groupe), intention, puis méta de traçabilité.
 * Les exigences sont affichées en clair pour qu'on puisse remonter au cahier V3
 * sans quitter l'écran.
 */
export const EnteteEcran = ({ ecran }: { readonly ecran: Ecran }) => {
  const groupe = GROUPES.find((candidat) => candidat.id === ecran.groupe);
  const nombre = ECRANS.length;

  return (
    <header className={styles.entete}>
      <div className={styles.eyebrow}>
        <span className={styles.id}>{ecran.id}</span>
        <span className={styles.groupe}>
          {groupe?.titre} · écran {ECRANS.indexOf(ecran) + 1} sur {nombre}
        </span>
        {ecran.statut === 'en-attente' ? <Pastille ton="inconnu">Arbitrage en attente</Pastille> : null}
      </div>

      <h1 className={styles.titre}>{ecran.titre}</h1>
      <p className={styles.resume}>{ecran.resume}</p>

      <dl className={cx('meta', styles.meta)}>
        <div>
          <dt className="meta__terme">Acteur</dt>
          <dd className="meta__valeur">{ecran.acteur}</dd>
        </div>
        <div>
          <dt className="meta__terme">Couverture V3</dt>
          <dd className="meta__valeur mono">{ecran.exigences.join(' · ')}</dd>
        </div>
        <div>
          <dt className="meta__terme">Rendu pressenti</dt>
          <dd className="meta__valeur">{ecran.proprietaire}</dd>
        </div>
        <div>
          <dt className="meta__terme">Complexité de maquette</dt>
          <dd className="meta__valeur">{COMPLEXITE[ecran.complexite]}</dd>
        </div>
      </dl>
    </header>
  );
};
