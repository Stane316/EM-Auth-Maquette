import { AlertTriangle, CheckCircle2, CircleHelp, Info, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

export type TonAlerte = 'info' | 'succes' | 'alerte' | 'danger' | 'inconnu';

const ICONES = {
  info: Info,
  succes: CheckCircle2,
  alerte: AlertTriangle,
  danger: ShieldAlert,
  inconnu: CircleHelp,
} as const;

/**
 * Le message est toujours porté par un texte, pas seulement par une couleur :
 * `role="status"` pour une information, `role="alert"` pour une issue bloquante.
 */
export const Alerte = ({
  ton = 'info',
  titre,
  children,
  role,
  className,
}: {
  readonly ton?: TonAlerte;
  readonly titre?: string;
  readonly children: ReactNode;
  readonly role?: 'status' | 'alert';
  readonly className?: string;
}) => {
  const Icone = ICONES[ton];
  return (
    <div
      className={cx(styles.alerte, styles[`alerte--${ton}`], className)}
      role={role ?? (ton === 'danger' || ton === 'alerte' ? 'alert' : 'status')}
    >
      <Icone className={styles.alerte__icone} aria-hidden="true" />
      <div>
        {titre ? <p className={styles.alerte__titre}>{titre}</p> : null}
        <div>{children}</div>
      </div>
    </div>
  );
};
