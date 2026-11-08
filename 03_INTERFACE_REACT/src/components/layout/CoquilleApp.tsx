import { Menu, PanelLeftClose } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ecranParSlug, GROUPES } from '../../donnees/ecrans';
import { cx } from '../../lib/cx';
import { EnteteSession } from './EnteteSession';
import { Navigation } from './Navigation';
import styles from './shell.module.css';

const TITRES_SIMPLES: Readonly<Record<string, string>> = {
  '/': 'Portail de démonstration',
  '/parcours': 'Parcours de bout en bout',
  '/systeme': 'Système de design',
  '/dossier': 'Dossier de démonstration',
};

/** Déduit le fil d'Ariane du chemin courant, sans table de correspondance dupliquée. */
const filAriane = (chemin: string): readonly string[] => {
  if (chemin.startsWith('/ecran/')) {
    const ecran = ecranParSlug(chemin.replace('/ecran/', ''));
    if (ecran) {
      const groupe = GROUPES.find((g) => g.id === ecran.groupe);
      return [groupe?.titre ?? 'Parcours', `${ecran.id} — ${ecran.titre}`];
    }
    return ['Écran inconnu'];
  }
  return [TITRES_SIMPLES[chemin] ?? 'Démonstration'];
};

export const CoquilleApp = () => {
  const { pathname } = useLocation();
  const [navAffichee, setNavAffichee] = useState(true);
  const [mobileOuverte, setMobileOuverte] = useState(false);
  const [estMobile, setEstMobile] = useState(false);
  const refContenu = useRef<HTMLElement | null>(null);
  const cheminPrecedent = useRef<string | null>(null);

  useEffect(() => {
    const requete = window.matchMedia('(max-width: 1000px)');
    const appliquer = () => setEstMobile(requete.matches);
    appliquer();
    requete.addEventListener('change', appliquer);
    return () => requete.removeEventListener('change', appliquer);
  }, []);

  // À chaque changement d'écran : retour en haut et focus sur le contenu,
  // sinon les lecteurs d'écran restent sur le lien de navigation précédent.
  useEffect(() => {
    if (cheminPrecedent.current !== null && cheminPrecedent.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      refContenu.current?.focus();
      setMobileOuverte(false);
    }
    cheminPrecedent.current = pathname;
  }, [pathname]);

  const tronçons = filAriane(pathname);
  const fermee = estMobile ? !mobileOuverte : !navAffichee;

  const basculer = () => {
    if (estMobile) {
      setMobileOuverte((valeur) => !valeur);
    } else {
      setNavAffichee((valeur) => !valeur);
    }
  };

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu principal
      </a>

      <div className={cx(styles.app, !estMobile && !navAffichee && styles['app--fermee'])}>
        <Navigation fermee={fermee} ouverteMobile={estMobile && mobileOuverte} onFermer={() => setMobileOuverte(false)} />

        <div className={styles.colonne}>
          <header className={styles.entete}>
            <button type="button" className={styles.bascule} onClick={basculer} aria-expanded={!fermee} aria-controls="navigation-demo">
              {fermee ? (
                <Menu aria-hidden="true" />
              ) : (
                <PanelLeftClose aria-hidden="true" />
              )}
              <span className="visuellement-cache">
                {fermee ? 'Afficher' : 'Masquer'} le navigateur de démonstration
              </span>
              <span aria-hidden="true">{fermee ? 'Écrans' : 'Masquer'}</span>
            </button>

            <p className={styles.entete__fil}>
              <span>Démonstration</span>
              {tronçons.map((tronçon, index) => (
                <span key={tronçon} style={{ display: 'contents' }}>
                  <span className={styles.entete__filSeparateur} aria-hidden="true">
                    /
                  </span>
                  {index === tronçons.length - 1 ? <strong aria-current="page">{tronçon}</strong> : <span>{tronçon}</span>}
                </span>
              ))}
            </p>

            <div className={styles.entete__actions}>
              <EnteteSession />
            </div>
          </header>

          <main id="contenu" tabIndex={-1} className={styles.contenu} ref={refContenu}>
            <div className={styles.contenu__interieur}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
