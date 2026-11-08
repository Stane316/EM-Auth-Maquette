import type { ReactNode } from 'react';
import { NotificationsProvider } from '../components/ui/Notifications';
import { SessionProvider } from '../session/SessionProvider';

/** Ordre des fournisseurs : session d'abord, notifications ensuite (indépendantes). */
export const Providers = ({ children }: { readonly children: ReactNode }) => (
  <SessionProvider>
    <NotificationsProvider>{children}</NotificationsProvider>
  </SessionProvider>
);
