import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { env } from '../config/env';
import { services } from '../services';
import type { Role, SessionDto } from '../services/contracts/api';
import type { ResultatDeconnexion } from '../services/ports';

type Valeur = {
  readonly session: SessionDto;
  readonly chargement: boolean;
  readonly erreur: string | null;
  readonly preuveFraiche: boolean;
  readonly rafraichir: () => Promise<void>;
  readonly etablir: (session: SessionDto) => void;
  readonly deconnecter: () => Promise<ResultatDeconnexion | null>;
  readonly aRole: (...roles: readonly Role[]) => boolean;
  /** Démonstration uniquement : bascule le profil simulé. */
  readonly changerProfil: (profil: string) => Promise<void>;
};

const SESSION_ANONYME: SessionDto = { authentifie: false };

/**
 * La fraîcheur de la preuve est calculée **au moment de la réponse du service**,
 * jamais pendant le rendu : un rendu ne doit pas dépendre de l'heure courante.
 */
type EtatSession = { readonly session: SessionDto; readonly preuveFraiche: boolean };

const envelopper = (session: SessionDto): EtatSession => ({
  session,
  preuveFraiche: Boolean(session.preuveFraicheJusqua && Date.parse(session.preuveFraicheJusqua) > Date.now()),
});

const SessionContexte = createContext<Valeur | null>(null);

/**
 * Source unique de l'état de session.
 *
 * La session n'est **jamais** lue depuis le stockage local : en mode réel, elle
 * vit dans un cookie HttpOnly que le JavaScript ne peut pas lire. Ici, elle est
 * demandée au service à intervalle régulier, ce qui suffit à détecter
 * l'expiration (E12) sans exposer de jeton au navigateur.
 */
export const SessionProvider = ({ children }: { readonly children: ReactNode }) => {
  const [etat, setEtat] = useState<EtatSession>(() => envelopper(SESSION_ANONYME));
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const monte = useRef(true);
  const session = etat.session;

  const rafraichir = useCallback(async () => {
    const reponse = await services.auth.sessionCourante();
    if (!monte.current) return;
    if (reponse.ok) {
      setEtat(envelopper(reponse.donnees));
      setErreur(null);
    } else {
      setErreur(reponse.message);
    }
    setChargement(false);
  }, []);

  useEffect(() => {
    monte.current = true;
    // Abonnement à l'état de session : première lecture puis interrogation
    // périodique. `setState` n'a lieu qu'après la réponse du service.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void rafraichir();
    const minuteur = window.setInterval(() => void rafraichir(), env.intervalleSessionMs);
    return () => {
      monte.current = false;
      window.clearInterval(minuteur);
    };
  }, [rafraichir]);

  const etablir = useCallback((prochaine: SessionDto) => {
    setEtat(envelopper(prochaine));
    setErreur(null);
    setChargement(false);
  }, []);

  const deconnecter = useCallback(async () => {
    const reponse = await services.auth.deconnexion();
    if (reponse.ok) setEtat(envelopper(SESSION_ANONYME));
    return reponse.ok ? reponse.donnees : null;
  }, []);

  const aRole = useCallback(
    (...roles: readonly Role[]) =>
      Boolean(session.authentifie && session.utilisateur?.roles.some((role) => roles.includes(role))),
    [session],
  );

  const changerProfil = useCallback(
    async (profil: string) => {
      if (!services.backoffice.changerProfil) return;
      const reponse = await services.backoffice.changerProfil(profil);
      if (reponse.ok) setEtat(envelopper(reponse.donnees));
    },
    [],
  );

  const valeur = useMemo(
    () => ({
      session,
      chargement,
      erreur,
      preuveFraiche: etat.preuveFraiche,
      rafraichir,
      etablir,
      deconnecter,
      aRole,
      changerProfil,
    }),
    [session, chargement, erreur, etat.preuveFraiche, rafraichir, etablir, deconnecter, aRole, changerProfil],
  );

  return <SessionContexte.Provider value={valeur}>{children}</SessionContexte.Provider>;
};

export const useSession = (): Valeur => {
  const contexte = useContext(SessionContexte);
  if (!contexte) throw new Error('useSession doit être utilisé dans SessionProvider');
  return contexte;
};
