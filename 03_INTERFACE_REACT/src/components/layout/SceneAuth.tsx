import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './scene.module.css';

/**
 * Scène d'authentification : colonne étroite centrée, contexte à gauche.
 * `aurora` n'est activé que sur les écrans publics (règle DRI : un seul effet
 * signature par page, jamais sur un écran de décision sensible).
 */
export const SceneAuth = ({
  contexte,
  children,
  large = false,
  aurora = false,
}: {
  readonly contexte: ReactNode;
  readonly children: ReactNode;
  readonly large?: boolean;
  readonly aurora?: boolean;
}) => (
  <div className={cx(styles.scene, aurora && 'aurora')}>
    <div className={cx(styles.scene__grille, large && styles['scene__grille--large'])}>
      <div className={styles.scene__contexte}>{contexte}</div>
      <div className={styles.scene__carte}>{children}</div>
    </div>
  </div>
);

export const BlocContexte = ({
  marque,
  titre,
  texte,
  points,
}: {
  readonly marque: string;
  readonly titre: string;
  readonly texte: string;
  readonly points?: readonly string[];
}) => (
  <div className={cx(styles.contexte, 'aurora')}>
    <span className={styles.contexte__marque}>{marque}</span>
    <h2 className={styles.contexte__titre}>{titre}</h2>
    <p className={styles.contexte__texte}>{texte}</p>
    {points ? (
      <ul className={styles.contexte__points}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    ) : null}
  </div>
);
