import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

export type TonPastille = 'neutre' | 'accent' | 'succes' | 'alerte' | 'danger' | 'inconnu';

export const Pastille = ({
  ton = 'neutre',
  children,
  className,
}: {
  readonly ton?: TonPastille;
  readonly children: ReactNode;
  readonly className?: string;
}) => <span className={cx(styles.pastille, styles[`pastille--${ton}`], className)}>{children}</span>;
