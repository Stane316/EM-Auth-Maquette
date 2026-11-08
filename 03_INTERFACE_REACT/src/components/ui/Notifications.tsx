import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './notifications.module.css';

export type TonNotification = 'info' | 'succes' | 'alerte';

export type Notification = {
  readonly id: number;
  readonly ton: TonNotification;
  readonly titre: string;
  readonly texte: string;
};

type Contexte = {
  readonly notifier: (notification: Omit<Notification, 'id'>) => void;
  readonly notifications: readonly Notification[];
  readonly fermer: (id: number) => void;
};

const NotificationsContexte = createContext<Contexte | null>(null);

const ICONES = { info: Info, succes: CheckCircle2, alerte: AlertTriangle } as const;

/**
 * Notifications éphémères. La région est `aria-live="polite"` : une notification
 * est annoncée sans interrompre la saisie en cours.
 */
export const NotificationsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [notifications, setNotifications] = useState<readonly Notification[]>([]);

  const fermer = useCallback((id: number) => {
    setNotifications((liste) => liste.filter((notification) => notification.id !== id));
  }, []);

  const notifier = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = Date.now() + Math.random();
      setNotifications((liste) => [...liste, { ...notification, id }].slice(-3));
      window.setTimeout(() => fermer(id), 6000);
    },
    [fermer],
  );

  const valeur = useMemo(() => ({ notifier, notifications, fermer }), [notifier, notifications, fermer]);

  return (
    <NotificationsContexte.Provider value={valeur}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {notifications.map((notification) => {
          const Icone = ICONES[notification.ton];
          return (
            <div key={notification.id} className={`${styles.toast} ${styles[`toast--${notification.ton}`]}`}>
              <Icone aria-hidden="true" className={styles.icone} />
              <div className={styles.contenu}>
                <p className={styles.titre}>{notification.titre}</p>
                <p className={styles.texte}>{notification.texte}</p>
              </div>
              <button
                type="button"
                className={styles.fermer}
                onClick={() => fermer(notification.id)}
                aria-label="Fermer la notification"
              >
                <X aria-hidden="true" size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationsContexte.Provider>
  );
};

export const useNotifications = (): Contexte => {
  const contexte = useContext(NotificationsContexte);
  if (!contexte) throw new Error('useNotifications doit être utilisé dans NotificationsProvider');
  return contexte;
};
