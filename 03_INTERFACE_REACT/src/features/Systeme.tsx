/**
 * Galerie du système de design — page de démonstration (hors parcours V3).
 * Elle sert à deux choses : montrer les décisions visuelles, et prouver que les
 * contrastes affichés sont calculés et vérifiés par `scripts/audit.mjs`.
 */
import { Check, MousePointerClick, Palette, Ruler, Type } from 'lucide-react';
import { Alerte } from '../components/ui/Alerte';
import { Bouton } from '../components/ui/Bouton';
import { Champ } from '../components/ui/Champ';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';
import { PAIRES } from '../donnees/contrastes';
import styles from './pages.module.css';

const TONS: ReadonlyArray<{ ton: TonPastille; mot: string }> = [
  { ton: 'neutre', mot: 'Neutre' },
  { ton: 'accent', mot: 'Accent' },
  { ton: 'succes', mot: 'Succès' },
  { ton: 'alerte', mot: 'Alerte' },
  { ton: 'danger', mot: 'Danger' },
  { ton: 'inconnu', mot: 'Inconnu' },
];

const ECHELLE = [
  { nom: '--t-3xl', taille: '44 px', exemple: 'Titre d’écran' },
  { nom: '--t-2xl', taille: '30 px', exemple: 'Titre de section' },
  { nom: '--t-xl', taille: '24 px', exemple: 'Titre de carte' },
  { nom: '--t-l', taille: '18 px', exemple: 'Chapeau' },
  { nom: '--t-m', taille: '16 px', exemple: 'Texte courant' },
  { nom: '--t-s', taille: '14 px', exemple: 'Interface, tableaux' },
  { nom: '--t-xs', taille: '13 px', exemple: 'Aides' },
  { nom: '--t-3xs', taille: '11 px', exemple: 'Étiquettes capitales' },
];

export const Systeme = () => (
  <div className={styles.page}>
    <section aria-labelledby="systeme-titre">
      <p className={styles.heros__eyebrow}>
        <Palette aria-hidden="true" size={13} />
        Système de design · version 2
      </p>
      <h1 className={styles.section__titre} id="systeme-titre" style={{ fontSize: 'var(--t-3xl)', marginTop: 'var(--e-3)' }}>
        Un système de design, pas une planche de tendances
      </h1>
      <p className={styles.section__texte} style={{ marginTop: 'var(--e-2)', fontSize: 'var(--t-l)' }}>
        Jetons sémantiques, contrastes calculés, composants à états explicites. Tout ce qui suit est utilisé dans les
        dix-sept écrans ; rien n’est là pour remplir une galerie.
      </p>
    </section>

    <section aria-labelledby="contrastes-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="contrastes-titre">
          Contrastes — valeurs calculées
        </h2>
        <p className={styles.section__texte}>
          WCAG 2.x, luminance relative sRGB. Seuil 4,5:1 pour le texte, 3:1 pour les éléments d’interface.
        </p>
      </div>
      <Tableau
        legende="Paires de couleurs utilisées dans l’interface, avec leur ratio calculé"
        colonnes={[
          { cle: 'nom', titre: 'Paire' },
          { cle: 'usage', titre: 'Usage' },
          { cle: 'ratio', titre: 'Ratio', aligneDroite: true },
          { cle: 'seuil', titre: 'Seuil', aligneDroite: true },
          { cle: 'verdict', titre: 'Verdict' },
        ]}
        lignes={PAIRES.map((paire) => ({
          cle: paire.nom,
          cellules: {
            nom: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 30,
                  height: 18,
                  borderRadius: 4,
                  border: '1px solid var(--trait-fort)',
                  background: `linear-gradient(90deg, var(${paire.fondVar}) 50%, var(${paire.texteVar}) 50%)`,
                }}
              />
              {paire.nom}
            </span>,
            usage: paire.usage,
            ratio: <span className="mono">{paire.ratio.toFixed(2)}</span>,
            seuil: <span className="mono">{paire.seuil}</span>,
            verdict: <Pastille ton={paire.ratio >= paire.seuil ? 'succes' : 'danger'}>
              {paire.ratio >= paire.seuil ? 'Conforme' : 'Insuffisant'}
            </Pastille>,
          },
        }))}
      />
      <div style={{ marginTop: 'var(--e-3)' }}>
        <Alerte ton="info" titre="Ces valeurs ne sont pas recopiées à la main">
          L’audit relit <span className="mono">tokens.css</span>, recalcule chaque ratio et échoue si l’affichage diverge
          du jeton. Un rapport non vérifié serait pire qu’aucun rapport.
        </Alerte>
      </div>
    </section>

    <section aria-labelledby="typo-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="typo-titre">
          <Type aria-hidden="true" size={20} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Échelle typographique
        </h2>
        <p className={styles.section__texte}>Inter Variable pour le texte, JetBrains Mono pour les identifiants et les codes.</p>
      </div>
      <Carte id="echelle" serre>
        <ul style={{ display: 'grid', gap: 'var(--e-3)' }}>
          {ECHELLE.map((ligne) => (
            <li
              key={ligne.nom}
              style={{ display: 'grid', gridTemplateColumns: '90px minmax(0, 1fr) 110px', gap: 12, alignItems: 'baseline', borderBottom: '1px solid var(--trait)', paddingBottom: 8 }}
            >
              <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                {ligne.nom}
              </span>
              <span style={{ fontSize: `var(${ligne.nom})`, color: 'var(--encre-900)', fontWeight: 600, lineHeight: 1.1 }}>
                {ligne.exemple}
              </span>
              <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)', textAlign: 'right' }}>
                {ligne.taille}
              </span>
            </li>
          ))}
        </ul>
      </Carte>
    </section>

    <section aria-labelledby="composants-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="composants-titre">
          <MousePointerClick aria-hidden="true" size={20} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Composants et états
        </h2>
        <p className={styles.section__texte}>Chaque composant porte ses états : repos, survol, focus, désactivé, erreur.</p>
      </div>

      <div className={styles.deuxColonnes}>
        <div className={styles.panneau}>
          <h3 className={styles.panneau__titre}>
            <Check aria-hidden="true" />
            Boutons
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-2)', marginTop: 'var(--e-3)' }}>
            <Bouton>Primaire</Bouton>
            <Bouton variante="secondaire">Secondaire</Bouton>
            <Bouton variante="discret">Discret</Bouton>
            <Bouton variante="danger">Destructif</Bouton>
            <Bouton disabled>Désactivé</Bouton>
          </div>
          <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
            Hauteur minimale 44 px — cible tactile, pas une préférence esthétique.
          </p>
        </div>

        <div className={styles.panneau}>
          <h3 className={styles.panneau__titre}>
            <Check aria-hidden="true" />
            Pastilles d’état
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'var(--e-3)' }}>
            {TONS.map((item) => (
              <Pastille key={item.ton} ton={item.ton}>
                {item.mot}
              </Pastille>
            ))}
          </div>
          <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
            La couleur ne porte jamais seule l’information : le mot est toujours présent, et « inconnu » a une forme
            différente des autres.
          </p>
        </div>
      </div>

      <div className={styles.deuxColonnes} style={{ marginTop: 'var(--e-4)' }}>
        <div className={styles.panneau}>
          <h3 className={styles.panneau__titre}>
            <Check aria-hidden="true" />
            Champs
          </h3>
          <div style={{ display: 'grid', gap: 'var(--e-3)', marginTop: 'var(--e-3)' }}>
            <Champ label="Champ nominal" name="demo-1" placeholder="prenom.nom" aide="Une aide courte, reliée au champ." />
            <Champ
              label="Champ en erreur"
              name="demo-2"
              defaultValue="saisie incomplète"
              erreur="Ce message est annoncé et relié au champ."
              obligatoire
            />
          </div>
        </div>

        <div className={styles.panneau}>
          <h3 className={styles.panneau__titre}>
            <Check aria-hidden="true" />
            Alertes
          </h3>
          <div style={{ display: 'grid', gap: 'var(--e-2)', marginTop: 'var(--e-3)' }}>
            <Alerte ton="danger" titre="Bloquant">Une action ne peut pas aboutir.</Alerte>
            <Alerte ton="inconnu" titre="Incertain">Nous ne savons pas — et nous le disons.</Alerte>
            <Alerte ton="succes" titre="Confirmé">Le résultat est mesuré.</Alerte>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="espace-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="espace-titre">
          <Ruler aria-hidden="true" size={20} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Espacement, rayons, mouvement
        </h2>
      </div>
      <div className={styles.socle}>
        <div className={styles.jeton}>
          <span className={styles.jeton__nom}>Échelle de 4 px</span>
          <span className={styles.jeton__role}>e-1 → e-9, de 4 px à 96 px. Aucune valeur arbitraire.</span>
        </div>
        <div className={styles.jeton}>
          <span className={styles.jeton__nom}>Rayons</span>
          <span className={styles.jeton__role}>4 / 8 / 12 / 16 px et pilule. Cohérents par fonction, pas par goût.</span>
        </div>
        <div className={styles.jeton}>
          <span className={styles.jeton__nom}>Mouvement</span>
          <span className={styles.jeton__role}>
            120 / 200 / 320 ms, courbe unique. Un effet signature par page, en transform et opacity.
          </span>
        </div>
        <div className={styles.jeton}>
          <span className={styles.jeton__nom}>Mouvement réduit</span>
          <span className={styles.jeton__role}>
            <span className="mono">prefers-reduced-motion</span> annule animations et durées. Vérifié dans la feuille de
            base, pas laissé à l’appréciation.
          </span>
        </div>
      </div>
    </section>

    <section aria-labelledby="deps-titre">
      <div className={styles.section__entete}>
        <h2 className={styles.section__titre} id="deps-titre">
          Ce qui n’est pas là, et pourquoi
        </h2>
      </div>
      <Tableau
        legende="Ressources écartées et motifs"
        colonnes={[
          { cle: 'ressource', titre: 'Ressource' },
          { cle: 'motif', titre: 'Motif d’exclusion' },
        ]}
        lignes={[
          {
            cle: '1',
            cellules: {
              ressource: 'React Bits',
              motif: 'Licence MIT + Commons Clause (interdit la revente) et composants Pro payants. Patrons réimplémentés, aucun code importé (D-012).',
            },
          },
          {
            cle: '2',
            cellules: {
              ressource: 'Tailwind, shadcn/ui',
              motif: 'Le brief interdit d’imposer un framework de style à la maquette ; le DRI met lui-même en garde contre l’empilement de registries.',
            },
          },
          {
            cle: '3',
            cellules: {
              ressource: 'GSAP, three.js, Lenis, Rive',
              motif: 'Aucun besoin métier. Le « premium » ne dépend pas d’une timeline.',
            },
          },
          {
            cle: '4',
            cellules: {
              ressource: 'MUI, Ant Design, Mantine',
              motif: 'Un design system complet imposerait son langage visuel à EM AUTH.',
            },
          },
          {
            cle: '5',
            cellules: {
              ressource: 'Better Auth, Supabase, Clerk',
              motif: 'Contredisent la V3 (Keycloak / PostgreSQL / BFF). Les substituer serait une proposition, pas une décision de maquette.',
            },
          },
        ]}
      />
    </section>
  </div>
);
