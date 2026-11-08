import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

type Props = {
  readonly titre?: string;
  readonly sousTitre?: string;
  readonly action?: ReactNode;
  readonly pied?: ReactNode;
  readonly serre?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
};

export const Carte = ({ titre, sousTitre, action, pied, serre = false, children, className, id }: Props) => (
  <section className={cx(styles.carte, className)} id={id} aria-labelledby={titre ? `${id ?? 'carte'}-titre` : undefined}>
    {titre ? (
      <header className={styles.carte__entete}>
        <div>
          <h2 className={styles.carte__titre} id={`${id ?? 'carte'}-titre`}>
            {titre}
          </h2>
          {sousTitre ? <p className={styles.carte__sousTitre}>{sousTitre}</p> : null}
        </div>
        {action}
      </header>
    ) : null}
    <div className={cx(styles.carte__corps, serre && styles['carte__corps--serre'])}>{children}</div>
    {pied ? <footer className={styles.carte__pied}>{pied}</footer> : null}
  </section>
);
