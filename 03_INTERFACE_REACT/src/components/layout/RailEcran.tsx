import { ArrowLeft, ArrowRight, Check, Eye, Info, ShieldQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ECRANS } from '../../donnees/ecrans';
import type { Ecran } from '../../donnees/ecrans';
import type { EtatEcran } from '../../donnees/etats';
import { Pastille } from '../ui/Pastille';
import styles from './ecran.module.css';

const NATURE: Readonly<Record<EtatEcran['nature'], { readonly libelle: string; readonly ton: 'neutre' | 'alerte' | 'danger' | 'inconnu' }>> = {
  nominal: { libelle: 'Cas nominal', ton: 'neutre' },
  limite: { libelle: 'État limite', ton: 'alerte' },
  erreur: { libelle: 'Cas d’erreur', ton: 'danger' },
  systeme: { libelle: 'Défaillance système', ton: 'inconnu' },
};

/**
 * Rail de rigueur : il accompagne chaque écran, non pour décorer, mais pour
 * rappeler ce que l'état démontre et ce que la maquette ne démontre pas.
 */
export const RailEcran = ({ ecran, actif }: { readonly ecran: Ecran; readonly actif: EtatEcran }) => {
  const index = ECRANS.indexOf(ecran);
  const precedent = index > 0 ? ECRANS[index - 1] : undefined;
  const suivant = index >= 0 && index < ECRANS.length - 1 ? ECRANS[index + 1] : undefined;
  const nature = NATURE[actif.nature];

  return (
    <aside className={styles.rail} aria-label="Notes de rigueur">
      <section className={styles.railCarte}>
        <h2 className={styles.railTitre}>
          <Eye aria-hidden="true" />
          Cet état démontre
        </h2>
        <p className={styles.railTexte}>
          <strong>{actif.libelle}</strong> — {actif.preuve}
        </p>
        <p className={styles.railTexte} style={{ marginTop: 'var(--e-3)' }}>
          <Pastille ton={nature.ton}>{nature.libelle}</Pastille>
        </p>
      </section>

      <section className={`${styles.railCarte} ${styles['railCarte--nuance']}`}>
        <h2 className={styles.railTitre}>
          <ShieldQuestion aria-hidden="true" />
          Ce que cette maquette ne prouve pas
        </h2>
        <ul className={styles.railListe}>
          <li>
            <Check aria-hidden="true" />
            <span>Aucune sécurité réelle : rien n’est authentifié, rien n’est vérifié côté serveur.</span>
          </li>
          <li>
            <Check aria-hidden="true" />
            <span>Aucune conformité WCAG revendiquée : contrastes calculés, mais pas de test avec lecteur d’écran ni de navigateur.</span>
          </li>
          <li>
            <Check aria-hidden="true" />
            <span>Aucune disponibilité, aucun délai, aucun SLA : ces valeurs restent « à convenir ».</span>
          </li>
        </ul>
      </section>

      <section className={styles.railCarte}>
        <h2 className={styles.railTitre}>
          <Info aria-hidden="true" />
          Statut d’arbitrage
        </h2>
        <p className={styles.railTexte}>
          {ecran.statut === 'arbitre' ? (
            <>
              <Pastille ton="accent">Arbitré</Pastille>
              <span style={{ display: 'block', marginTop: 6 }}>
                Rendu par cette interface pour la démonstration (décision D-015). Dans la cible, le rendu réel peut être
                assuré par Keycloak ou par le BFF.
              </span>
            </>
          ) : (
            <>
              <Pastille ton="inconnu">En attente</Pastille>
              <span style={{ display: 'block', marginTop: 6 }}>
                Écran hors lot initial, ajouté pour la démonstration (D-013). Les rôles demandeur / approbateur ne sont
                pas encore arbitrés (D-008).
              </span>
            </>
          )}
        </p>
      </section>

      <nav className={styles.railNav} aria-label="Écrans voisins">
        {precedent ? (
          <Link to={`/ecran/${precedent.slug}`}>
            <ArrowLeft aria-hidden="true" />
            {precedent.id}
          </Link>
        ) : (
          <span />
        )}
        {suivant ? (
          <Link to={`/ecran/${suivant.slug}`}>
            {suivant.id}
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </aside>
  );
};
