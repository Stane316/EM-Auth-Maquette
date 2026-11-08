import { ArrowRight, Check, CircleSlash, FileCheck2, Gauge, Lock, ScanFace, ScrollText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BoutonLien } from '../components/ui/Bouton';
import { ECRANS, GROUPES, etatsDe } from '../donnees/ecrans';
import { NOMBRE_ETATS } from '../donnees/etats';
import styles from './pages.module.css';

const CHIFFRES = [
  { valeur: String(ECRANS.length), libelle: 'écrans navigables', detail: '16 du lot + E09 en attente' },
  { valeur: String(NOMBRE_ETATS), libelle: 'états démontrables', detail: 'nominaux, erreurs, limites' },
  { valeur: '0', libelle: 'service connecté', detail: 'aucune authentification réelle' },
  { valeur: '0', libelle: 'donnée personnelle', detail: 'identités fictives' },
] as const;

const SOCLE = [
  { nom: 'React 19 + TypeScript', role: 'Interface, typage strict, aucune donnée implicite', origine: 'V3 §6.1' },
  { nom: 'Vite 7', role: 'Développement et construction, sans configuration superflue', origine: 'V3 §6.1' },
  { nom: 'Motion', role: 'Transitions et révélation, désactivées si mouvement réduit', origine: 'DRI §9.1' },
  { nom: 'Lucide', role: 'Iconographie cohérente, jamais seule porteuse de sens', origine: 'DRI §9.1' },
  { nom: 'Inter + JetBrains Mono', role: 'Auto-hébergées, aucune requête vers un tiers', origine: 'DRI assets' },
  { nom: 'CSS Modules + jetons', role: 'Aucun framework de style imposé à votre code', origine: 'Choix assumé' },
] as const;

export const Portail = () => (
  <div className={styles.page}>
    <section className={`${styles.heros} aurora`} aria-labelledby="portail-titre">
      <p className={styles.heros__eyebrow}>
        <ScanFace aria-hidden="true" size={13} />
        Maquette de démonstration · 8 novembre 2026
      </p>
      <h1 className={styles.heros__titre} id="portail-titre">
        Une identité qui se laisse <em>démontrer</em>.
      </h1>
      <p className={styles.heros__chapo}>
        Dix-sept écrans de la plateforme d’authentification EM AUTH, montrés dans leurs bons jours et dans leurs
        mauvais : identification, preuve fraîche, récupération à deux acteurs, retrait mesuré par cible, et surtout les
        états que l’on cache d’habitude — l’incertitude, l’expiration, la panne.
      </p>

      <div className={styles.heros__actions}>
        <BoutonLien vers="/ecran/invitation" icone={<ArrowRight aria-hidden="true" />}>
          Entrer par l’invitation (E01)
        </BoutonLien>
        <BoutonLien vers="/dossier" variante="secondaire" icone={<FileCheck2 aria-hidden="true" />}>
          Dossier de démonstration
        </BoutonLien>
      </div>

      <dl className={styles.chiffres}>
        {CHIFFRES.map((chiffre) => (
          <div className={styles.chiffre} key={chiffre.libelle}>
            <dt className={styles.chiffre__valeur}>{chiffre.valeur}</dt>
            <dd className={styles.chiffre__libelle}>{chiffre.libelle}</dd>
            <dd className={styles.chiffre__detail}>{chiffre.detail}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section aria-labelledby="parcours-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="parcours-titre">
          Les quatre temps du parcours
        </h2>
        <p className={styles.section__texte}>
          Chaque écran s’ouvre avec ses états ; l’adresse garde l’état choisi, donc un constat peut être partagé tel
          quel.
        </p>
      </div>

      <div className={styles.groupes}>
        {GROUPES.map((groupe) => {
          const ecrans = ECRANS.filter((ecran) => ecran.groupe === groupe.id);
          const etats = ecrans.reduce((total, ecran) => total + etatsDe(ecran.slug).length, 0);
          return (
            <article className={styles.groupe} key={groupe.id}>
              <div className={styles.groupe__entete}>
                <h3 className={styles.groupe__titre}>{groupe.titre}</h3>
                <span className={styles.groupe__compte}>
                  {ecrans.length} écrans · {etats} états
                </span>
              </div>
              <p className={styles.groupe__sousTitre}>{groupe.sousTitre}</p>
              <ul className={styles.groupe__liste}>
                {ecrans.map((ecran) => (
                  <li key={ecran.id}>
                    <Link to={`/ecran/${ecran.slug}`} className={styles.lienEcran}>
                      <span className={styles.lienEcran__id}>{ecran.id}</span>
                      <span>{ecran.titre}</span>
                      <span className={styles.lienEcran__etats}>{etatsDe(ecran.slug).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>

    <section aria-labelledby="ligne-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="ligne-titre">
          La ligne de conduite
        </h2>
        <p className={styles.section__texte}>
          Ce qui est tenu ici, et ce qui ne l’est pas. Cette seconde colonne compte autant que la première.
        </p>
      </div>

      <div className={styles.deuxColonnes}>
        <div className={styles.panneau}>
          <h3 className={`${styles.panneau__titre}`}>
            <ShieldCheck aria-hidden="true" />
            Ce que la maquette montre
          </h3>
          <ul className={styles.panneau__liste}>
            <li>
              <Check className={styles.ok} aria-hidden="true" />
              <span>
                Un échec d’identification ne dit jamais si le compte existe — un seul message, aucune variation de
                latence affichée.
              </span>
            </li>
            <li>
              <Check className={styles.ok} aria-hidden="true" />
              <span>La récupération exige deux acteurs distincts ; l’auto-approbation est refusée et expliquée.</span>
            </li>
            <li>
              <Check className={styles.ok} aria-hidden="true" />
              <span>Le retrait est mesuré cible par cible ; ce qui n’est pas observable est écrit « non observable ».</span>
            </li>
            <li>
              <Check className={styles.ok} aria-hidden="true" />
              <span>« Non confirmé » est un état à part entière, avec ses actions de vérification.</span>
            </li>
          </ul>
        </div>

        <div className={`${styles.panneau} ${styles['panneau--nuance']}`}>
          <h3 className={styles.panneau__titre}>
            <CircleSlash aria-hidden="true" />
            Ce que la maquette ne montre pas
          </h3>
          <ul className={styles.panneau__liste}>
            <li>
              <CircleSlash className={styles.non} aria-hidden="true" />
              <span>Aucune authentification réelle, aucun appel WebAuthn : les fenêtres natives sont simulées et étiquetées.</span>
            </li>
            <li>
              <CircleSlash className={styles.non} aria-hidden="true" />
              <span>Aucun test avec navigateur, lecteur d’écran, zoom 200 % ou largeur 320 px n’a pu être exécuté ici.</span>
            </li>
            <li>
              <CircleSlash className={styles.non} aria-hidden="true" />
              <span>Aucun délai, SLA, effectif ou budget : ces valeurs restent « à convenir ».</span>
            </li>
            <li>
              <CircleSlash className={styles.non} aria-hidden="true" />
              <span>Une maquette ne prouve ni sécurité, ni conformité, ni disponibilité.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="socle-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="socle-titre">
          Socle technique assumé
        </h2>
        <p className={styles.section__texte}>
          Six briques, pas davantage. Chacune est remplaçable ; aucune n’impose son langage visuel.
        </p>
      </div>

      <div className={styles.socle}>
        {SOCLE.map((brique) => (
          <div className={styles.jeton} key={brique.nom}>
            <span className={styles.jeton__nom}>{brique.nom}</span>
            <span className={styles.jeton__role}>{brique.role}</span>
            <span className={styles.jeton__origine}>{brique.origine}</span>
          </div>
        ))}
      </div>

      <p className={styles.noteFinn}>
        <strong>Décision de licence (D-012).</strong> React Bits figurait parmi les ressources les plus tentantes du
        DRI. Sa licence <span className="mono">MIT + Commons Clause</span> interdit la revente, et une partie de ses
        composants est payante. Ses patrons visuels ont donc été réécrits ici en CSS et en Motion : aucun code n’est
        importé, aucune ambiguïté juridique n’est transmise au projet.
      </p>

      <p style={{ marginTop: 'var(--e-4)' }}>
        <Link to="/systeme" className="mono">
          Voir les jetons, les composants et les contrastes calculés →
        </Link>
      </p>
    </section>

    <section aria-labelledby="suite-titre" className={styles.panneau}>
      <h2 className={styles.panneau__titre} id="suite-titre">
        <Gauge aria-hidden="true" />
        Par où continuer
      </h2>
      <div className={styles.deuxColonnes} style={{ marginTop: 'var(--e-4)' }}>
        <p className={styles.section__texte}>
          <strong style={{ color: 'var(--encre-900)' }}>Si vous découvrez le projet</strong> : commencez par E01 puis
          E02, et terminez par A04 — l’écran qui montre comment un retrait se vérifie au lieu de se supposer.
        </p>
        <p className={styles.section__texte}>
          <strong style={{ color: 'var(--encre-900)' }}>Si vous cherchez les points durs</strong> : E09 attend un
          arbitrage, A03 démontre la séparation des acteurs, et E11 est l’état que la plupart des interfaces ratent.
        </p>
      </div>
      <p style={{ marginTop: 'var(--e-4)', display: 'flex', flexWrap: 'wrap', gap: 'var(--e-2)' }}>
        <BoutonLien vers="/ecran/resultat-non-confirme" variante="secondaire" taille="sm" icone={<Lock aria-hidden="true" />}>
          Voir l’état « non confirmé » (E11)
        </BoutonLien>
        <BoutonLien vers="/ecran/decision-recuperation" variante="secondaire" taille="sm" icone={<ScrollText aria-hidden="true" />}>
          Voir la décision à deux acteurs (A03)
        </BoutonLien>
      </p>
    </section>
  </div>
);
