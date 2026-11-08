import { ChevronDown, Link2, LogOut, ShieldCheck, Timer, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { message } from '../../services/contracts/messages';
import { POLITIQUE } from '../../services/contracts/politique';
import { services } from '../../services';
import { useSession } from '../../session/SessionProvider';
import { useNotifications } from '../ui/Notifications';
import styles from './enteteSession.module.css';

const formaterHeure = (iso: string): string =>
  new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso));

/**
 * Barre de session : qui est connecté, si la preuve est encore fraîche, et les
 * actions de session. Le menu se ferme à `Échap` et au clic extérieur.
 */
export const EnteteSession = () => {
  const { session, preuveFraiche, deconnecter, changerProfil, rafraichir } = useSession();
  const { notifier } = useNotifications();
  const [ouvert, setOuvert] = useState(false);
  const zone = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ouvert) return;
    const surClic = (evenement: MouseEvent) => {
      if (zone.current && !zone.current.contains(evenement.target as Node)) setOuvert(false);
    };
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') setOuvert(false);
    };
    document.addEventListener('mousedown', surClic);
    document.addEventListener('keydown', surTouche);
    return () => {
      document.removeEventListener('mousedown', surClic);
      document.removeEventListener('keydown', surTouche);
    };
  }, [ouvert]);

  if (!session.authentifie) {
    return (
      <a className={styles.connexion} href="/ecran/identification">
        <UserRound aria-hidden="true" size={15} />
        Se connecter
      </a>
    );
  }

  const nom = session.utilisateur?.nom ?? 'Compte';
  const roles = session.utilisateur?.roles ?? [];

  const quitter = async () => {
    setOuvert(false);
    const resultat = await deconnecter();
    if (resultat) {
      notifier({
        ton: 'succes',
        titre: 'Déconnexion locale effectuée',
        texte: `${resultat.message} Révocation distante : ${resultat.distante === 'non-confirme' ? 'non confirmée' : 'confirmée'}.`,
      });
    }
    navigate('/ecran/fin-de-session');
  };

  const basculerProfil = async (profil: string) => {
    await changerProfil(profil);
    await rafraichir();
    setOuvert(false);
    notifier({ ton: 'info', titre: 'Profil simulé changé', texte: 'Bascule réservée à la démonstration.' });
  };

  return (
    <div className={styles.zone} ref={zone}>
      <span className={cx(styles.preuve, preuveFraiche ? styles['preuve--ok'] : styles['preuve--perimee'])}>
        {preuveFraiche ? <ShieldCheck aria-hidden="true" size={14} /> : <Timer aria-hidden="true" size={14} />}
        {preuveFraiche && session.preuveFraicheJusqua
          ? `Preuve fraîche jusqu’à ${formaterHeure(session.preuveFraicheJusqua)}`
          : `Preuve à renouveler (${POLITIQUE.fraicheurMinutes} min)`}
      </span>

      <button
        type="button"
        className={styles.bouton}
        aria-expanded={ouvert}
        aria-haspopup="menu"
        onClick={() => setOuvert((valeur) => !valeur)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {nom.slice(0, 1)}
        </span>
        <span className={styles.identite}>
          <span className={styles['identite__nom']}>{nom}</span>
          <span className={styles['identite__roles']}>{roles.length ? roles.join(' · ') : 'aucun rôle'}</span>
        </span>
        <ChevronDown aria-hidden="true" size={15} className={cx(styles.chevron, ouvert && styles['chevron--ouvert'])} />
      </button>

      {ouvert ? (
        <div className={styles.menu} role="menu" aria-label="Session">
          <p className={styles.menu__mention}>
            <Link2 aria-hidden="true" size={12} />
            {services.mode === 'demo' ? 'Démonstration — aucune donnée réelle' : 'Connecté via le BFF EM Auth'}
          </p>
          <button type="button" role="menuitem" className={styles.menu__item} onClick={() => void quitter()}>
            <LogOut aria-hidden="true" size={15} />
            Se déconnecter
          </button>
          {services.mode === 'demo' ? (
            <>
              <p className={styles.menu__titre}>Changer de profil (démo)</p>
              <button type="button" role="menuitem" className={styles.menu__item} onClick={() => void basculerProfil('r.houngbedji')}>
                R. Houngbédji — support
              </button>
              <button type="button" role="menuitem" className={styles.menu__item} onClick={() => void basculerProfil('k.adjo')}>
                K. Adjo — lecteur seul
              </button>
            </>
          ) : null}
          <p className={styles.menu__pied}>{message('SESSIONS_NOT_REVOKED')}</p>
        </div>
      ) : null}
    </div>
  );
};
