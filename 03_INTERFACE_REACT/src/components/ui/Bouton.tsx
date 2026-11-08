import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

type Variante = 'primaire' | 'secondaire' | 'discret' | 'danger';

type Commun = {
  readonly variante?: Variante;
  readonly taille?: 'sm' | 'md';
  readonly bloc?: boolean;
  readonly icone?: ReactNode;
  readonly children: ReactNode;
};

const classes = (variante: Variante, taille: 'sm' | 'md', bloc: boolean): string =>
  cx(
    styles.bouton,
    variante !== 'primaire' && styles[`bouton--${variante}`],
    taille === 'sm' && styles['bouton--sm'],
    bloc && styles['bouton--bloc'],
  );

export const Bouton = ({
  variante = 'primaire',
  taille = 'md',
  bloc = false,
  icone,
  children,
  className,
  type = 'button',
  ...reste
}: Commun & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...reste} type={type} className={cx(classes(variante, taille, bloc), className)}>
    {icone ? <span className={styles.iconeBouton}>{icone}</span> : null}
    {children}
  </button>
);

export const BoutonLien = ({
  variante = 'primaire',
  taille = 'md',
  bloc = false,
  icone,
  children,
  vers,
  className,
}: Commun & { readonly vers: string; readonly className?: string }) => (
  <Link to={vers} className={cx(classes(variante, taille, bloc), className)}>
    {icone ? <span className={styles.iconeBouton}>{icone}</span> : null}
    {children}
  </Link>
);
