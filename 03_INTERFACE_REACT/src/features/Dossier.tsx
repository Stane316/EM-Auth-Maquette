/**
 * Dossier de démonstration — page hors parcours.
 * Elle porte ce qu'un écran ne peut pas dire : la couverture réelle, les
 * décisions prises, les ressources employées et les limites de la démonstration.
 */
import { BookOpenText, CircleSlash, FileCheck2, ListChecks, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';
import { ECRANS, etatsDe, exigencesCouvertes } from '../donnees/ecrans';
import { NOMBRE_ETATS } from '../donnees/etats';
import styles from './pages.module.css';

const PHASES = [
  { id: 'PH00', objet: 'Cadrage, sources, périmètre', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH01', objet: 'Compréhension, matrice des 22 écrans', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH02', objet: 'Analyse du DRI et sélection des ressources (v2)', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH03', objet: 'Trois directions visuelles, comparaison', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH04', objet: 'Système de design (galerie du système)', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH05', objet: 'Écrans et états', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH06', objet: 'Parcours et enchaînements', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH07', objet: 'Audits structurels', etat: 'Partiel — sans navigateur', ton: 'alerte' as const },
  { id: 'PH08', objet: 'Handoff développeur', etat: 'Fait', ton: 'succes' as const },
  { id: 'PH09', objet: 'Réception et bilan', etat: 'Réception interne seulement', ton: 'alerte' as const },
];

const RESSOURCES = [
  { nom: 'Motion', usage: 'Transitions, respect de prefers-reduced-motion', licence: 'MIT (DRI §9.1)', etat: 'Déclarée' },
  { nom: 'Lucide', usage: 'Iconographie, toujours doublée de texte', licence: 'ISC (DRI §9.1)', etat: 'Déclarée' },
  { nom: 'Inter / JetBrains Mono', usage: 'Typographie auto-hébergée, aucune requête tierce', licence: 'OFL', etat: 'Déclarée' },
  { nom: 'React 19 + Vite', usage: 'Socle imposé par le cahier V3 §6.1', licence: 'MIT', etat: 'Déclarée' },
  { nom: 'React Bits', usage: 'Patrons visuels réimplémentés — aucun code importé', licence: 'MIT + Commons Clause', etat: 'Écartée' },
  { nom: 'axe-core', usage: 'Contrôle automatisé prévu, non exécuté faute de navigateur', licence: 'MPL-2.0', etat: 'Non exécutée' },
];

const DECISIONS = [
  { id: 'D-011', objet: 'Outillage React 19 + Vite + TypeScript, dépendances déclarées', statut: 'Approuvé' },
  { id: 'D-012', objet: 'React Bits écarté pour raison de licence, patrons réécrits', statut: 'Proposé' },
  { id: 'D-013', objet: 'E09 ajouté à la démonstration, arbitrage en attente', statut: 'Approuvé (délégation)' },
  { id: 'D-014', objet: 'Réception au niveau « démonstration » uniquement', statut: 'Approuvé (délégation)' },
  { id: 'D-015', objet: 'Rendu par l’interface React ; thème Keycloak écarté pour la démo', statut: 'Approuvé (délégation)' },
  { id: 'D-016', objet: 'Renommages motivés et conventions d’écriture', statut: 'Approuvé (délégation)' },
];

export const Dossier = () => (
  <div className={styles.page}>
    <section aria-labelledby="dossier-titre">
      <p className={styles.heros__eyebrow}>
        <BookOpenText aria-hidden="true" size={13} />
        Dossier de démonstration · hors parcours
      </p>
      <h1 className={styles.section__titre} id="dossier-titre" style={{ fontSize: 'var(--t-3xl)', marginTop: 'var(--e-3)' }}>
        Ce que cette maquette démontre — et ce qu’elle ne démontre pas
      </h1>
      <p className={styles.section__texte} style={{ marginTop: 'var(--e-2)', fontSize: 'var(--t-l)' }}>
        Une maquette ne prouve ni sécurité, ni conformité, ni disponibilité. Elle prouve qu’un parcours a été pensé,
        écran par écran, jusqu’aux cas où tout ne se passe pas comme prévu. Voici le compte exact.
      </p>
      <dl className={styles.chiffres} style={{ marginTop: 'var(--e-5)' }}>
        {[
          { valeur: String(ECRANS.length), libelle: 'écrans', detail: 'du lot et hors lot identifiés' },
          { valeur: String(NOMBRE_ETATS), libelle: 'états', detail: 'catalogués, pas décorés' },
          { valeur: String(exigencesCouvertes.length), libelle: 'codes d’exigence cités', detail: 'sur 36 au cahier V3' },
          { valeur: '0', libelle: 'appel réseau', detail: 'aucun service joint' },
        ].map((chiffre) => (
          <div className={styles.chiffre} key={chiffre.libelle}>
            <dt className={styles.chiffre__valeur}>{chiffre.valeur}</dt>
            <dd className={styles.chiffre__libelle}>{chiffre.libelle}</dd>
            <dd className={styles.chiffre__detail}>{chiffre.detail}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section aria-labelledby="soixante-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="soixante-titre">
          En soixante secondes
        </h2>
      </div>
      <div className={styles.deuxColonnes}>
        <div className={styles.panneau}>
          <h3 className={styles.panneau__titre}>
            <FileCheck2 aria-hidden="true" />
            Ce qui est fait
          </h3>
          <ul className={styles.panneau__liste}>
            <li>· Dix-sept écrans navigables, quatre temps de parcours, un système de design réel.</li>
            <li>· Soixante et onze états dont les cas d’erreur, de limite et de défaillance système.</li>
            <li>· Une règle de licence tranchée et documentée plutôt que subie.</li>
            <li>· Contrastes calculés et vérifiés par script, pas estimés à l’œil.</li>
          </ul>
        </div>
        <div className={`${styles.panneau} ${styles['panneau--nuance']}`}>
          <h3 className={styles.panneau__titre}>
            <CircleSlash aria-hidden="true" />
            Ce qui reste ouvert
          </h3>
          <ul className={styles.panneau__liste}>
            <li>· E09 attend un arbitrage sur les rôles demandeur / approbateur (D-008).</li>
            <li>· Cinq écrans du périmètre élargi (A01, A05, A06, A07, A09) ne sont pas représentés.</li>
            <li>· Aucun test avec navigateur, lecteur d’écran, zoom 200 % ni largeur 320 px.</li>
            <li>· Aucune intégration : le code BFF existant n’a pas été modifié.</li>
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="ecrans-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="ecrans-titre">
          <ListChecks aria-hidden="true" size={20} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Couverture écran par écran
        </h2>
      </div>
      <Tableau
        legende="Liste complète des écrans, de leurs états et de leur statut d’arbitrage"
        colonnes={[
          { cle: 'id', titre: 'Id' },
          { cle: 'titre', titre: 'Écran' },
          { cle: 'etats', titre: 'États', aligneDroite: true },
          { cle: 'exigences', titre: 'Exigences' },
          { cle: 'statut', titre: 'Statut' },
        ]}
        lignes={ECRANS.map((ecran) => ({
          cle: ecran.id,
          cellules: {
            id: <Link to={`/ecran/${ecran.slug}`} className="mono" style={{ fontWeight: 600 }}>
              {ecran.id}
            </Link>,
            titre: ecran.titre,
            etats: <span className="mono">{etatsDe(ecran.slug).length}</span>,
            exigences: <span className="mono" style={{ fontSize: 'var(--t-3xs)' }}>{ecran.exigences.join(' · ')}</span>,
            statut: ecran.statut === 'arbitre' ? <Pastille ton="accent">Arbitré</Pastille> : <Pastille ton="inconnu">En attente</Pastille>,
          },
        }))}
      />
      <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
        Les intitulés d’exigence ne sont pas reproduits : reformuler un cahier des charges sans le citer exactement
        introduit des écarts invisibles. Les codes renvoient au §13 du cahier V3.
      </p>
    </section>

    <section aria-labelledby="phases-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="phases-titre">
          Le travail, phase par phase
        </h2>
      </div>
      <Carte id="phases" serre>
        <ul style={{ display: 'grid', gap: 0 }}>
          {PHASES.map((phase) => (
            <li
              key={phase.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(0, 1fr) auto',
                gap: 12,
                alignItems: 'center',
                padding: '9px 0',
                borderBottom: '1px solid var(--trait)',
              }}
            >
              <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                {phase.id}
              </span>
              <span style={{ fontSize: 'var(--t-s)', color: 'var(--encre-900)' }}>{phase.objet}</span>
              <Pastille ton={phase.ton}>{phase.etat}</Pastille>
            </li>
          ))}
        </ul>
      </Carte>
    </section>

    <section aria-labelledby="ressources-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="ressources-titre">
          Ressources employées, licences et statut de vérification
        </h2>
        <p className={styles.section__texte}>
          Les licences sont celles déclarées par le DRI (daté du 5 octobre 2026). Elles n’ont pas été vérifiées à la
          source dans cet environnement : c’est écrit, pas supposé.
        </p>
      </div>
      <Tableau
        legende="Ressources et statut de licence"
        colonnes={[
          { cle: 'nom', titre: 'Ressource' },
          { cle: 'usage', titre: 'Usage réel' },
          { cle: 'licence', titre: 'Licence' },
          { cle: 'etat', titre: 'Statut' },
        ]}
        lignes={RESSOURCES.map((ressource) => ({
          cle: ressource.nom,
          cellules: {
            nom: ressource.nom,
            usage: ressource.usage,
            licence: <span className="mono" style={{ fontSize: 'var(--t-3xs)' }}>{ressource.licence}</span>,
            etat:
              ressource.etat === 'Écartée' ? (
                <Pastille ton="danger">Écartée</Pastille>
              ) : ressource.etat === 'Non exécutée' ? (
                <Pastille ton="inconnu">Non exécutée</Pastille>
              ) : (
                <Pastille ton="succes">Déclarée</Pastille>
              ),
          },
        }))}
      />
    </section>

    <section aria-labelledby="decisions-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="decisions-titre">
          <Scale aria-hidden="true" size={20} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Décisions structurantes
        </h2>
        <p className={styles.section__texte}>
          Une proposition d’agent n’est pas une décision humaine. Le registre complet distingue les deux.
        </p>
      </div>
      <Carte id="decisions" serre>
        <ul style={{ display: 'grid', gap: 0 }}>
          {DECISIONS.map((decision) => (
            <li
              key={decision.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(0, 1fr) auto',
                gap: 12,
                alignItems: 'center',
                padding: '9px 0',
                borderBottom: '1px solid var(--trait)',
              }}
            >
              <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                {decision.id}
              </span>
              <span style={{ fontSize: 'var(--t-s)', color: 'var(--encre-900)' }}>{decision.objet}</span>
              <Pastille ton={decision.statut === 'Proposé' ? 'alerte' : 'succes'}>{decision.statut}</Pastille>
            </li>
          ))}
        </ul>
      </Carte>
    </section>

    <section aria-labelledby="suite-dossier-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="suite-dossier-titre">
          Prochaine action, si vous validez
        </h2>
      </div>
      <div className={styles.panneau}>
        <ol style={{ display: 'grid', gap: 'var(--e-2)', paddingLeft: '1.2em', listStyle: 'decimal', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
          <li>Arbitrer E09 (rôles demandeur / approbateur) — sinon l’écran reste une démonstration.</li>
          <li>Passer les tests navigateur, clavier et lecteur d’écran, qui n’ont pas pu être exécutés ici.</li>
          <li>Décider du propriétaire de rendu réel par écran (Keycloak, BFF, React).</li>
          <li>Seulement ensuite : ouvrir la porte G6 (écriture dans le dépôt projet, intégration).</li>
        </ol>
      </div>
    </section>
  </div>
);
