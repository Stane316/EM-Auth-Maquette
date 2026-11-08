import { BookOpenText, Layers, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ECRANS, GROUPES } from '../../donnees/ecrans';
import { cx } from '../../lib/cx';
import styles from './shell.module.css';

export const Navigation = ({
  fermee,
  ouverteMobile,
  onFermer,
}: {
  /** Fermée par l'utilisateur : sans effet sur mobile, où la navigation est hors écran. */
  readonly fermee: boolean;
  readonly ouverteMobile: boolean;
  readonly onFermer: () => void;
}) => (
  <>
    <button
      type="button"
      className={cx(styles.rideau, ouverteMobile && styles['rideau--visible'])}
      aria-label="Fermer le navigateur de démonstration"
      tabIndex={ouverteMobile ? 0 : -1}
      onClick={onFermer}
    />
    <nav
      className={cx(styles.nav, 'sur-nuit', fermee && styles['nav--fermee'], ouverteMobile && styles['nav--mobileOuverte'])}
      aria-label="Navigateur de démonstration"
      id="navigation-demo"
    >
      <NavLink to="/" className={styles.marque} onClick={onFermer}>
        <span className={styles.marque__signe} aria-hidden="true">
          EM
        </span>
        <span>
          <span className={styles.marque__nom}>EM AUTH</span>
          <span className={styles.marque__mention}>Maquette · démonstration</span>
        </span>
      </NavLink>

      <div className={styles.nav__corps}>
        <div className={styles.nav__groupe}>
          <p className={styles.nav__groupeTitre}>Vue d’ensemble</p>
          <ul className={styles.nav__liste}>
            <li>
              <NavLink to="/" end className={({ isActive }) => cx(styles.lien, isActive && styles['lien--actif'])}>
                <span className={styles.lien__id} aria-hidden="true">
                  ⌂
                </span>
                <span className={styles.lien__titre}>Portail de démonstration</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {GROUPES.map((groupe) => (
          <div className={styles.nav__groupe} key={groupe.id}>
            <p className={styles.nav__groupeTitre}>{groupe.titre}</p>
            <ul className={styles.nav__liste}>
              {ECRANS.filter((ecran) => ecran.groupe === groupe.id).map((ecran) => (
                <li key={ecran.id}>
                  <NavLink
                    to={`/ecran/${ecran.slug}`}
                    className={({ isActive }) => cx(styles.lien, isActive && styles['lien--actif'])}
                    onClick={onFermer}
                    title={ecran.titre}
                  >
                    <span className={styles.lien__id}>{ecran.id}</span>
                    <span className={styles.lien__titre}>{ecran.titre}</span>
                    <span
                      className={cx(styles.point, ecran.statut === 'arbitre' && styles['point--arbitre'])}
                      title={ecran.statut === 'arbitre' ? 'Propriétaire de rendu arbitré (D-015)' : 'Arbitrage en attente'}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.nav__pied}>
        <div className={styles.nav__liensSecondaires}>
          <NavLink to="/systeme" className={styles.lienSecondaire} onClick={onFermer}>
            <Layers aria-hidden="true" />
            Système de design
          </NavLink>
          <NavLink to="/dossier" className={styles.lienSecondaire} onClick={onFermer}>
            <BookOpenText aria-hidden="true" />
            Dossier de démonstration
          </NavLink>
        </div>
        <div className={styles.nav__legende}>
          <p className={styles.nav__legendeItem}>
            <ShieldCheck aria-hidden="true" width={13} height={13} />
            Aucun service connecté
          </p>
          <p className={styles.nav__legendeItem}>
            <span className={cx(styles.point, styles['point--arbitre'])} aria-hidden="true" /> arbitré (D-015)
          </p>
          <p className={styles.nav__legendeItem}>
            <span className={styles.point} aria-hidden="true" /> arbitrage en attente
          </p>
        </div>
      </div>
    </nav>
  </>
);
