/**
 * Parcours de bout en bout — la démonstration qui *fait* les actions.
 *
 * Contrairement aux écrans (qui montrent des états), cette page exécute les
 * appels de service réels : identification, preuve fraîche, dossier de
 * récupération, décision indépendante, retrait par cible, journal, déconnexion.
 *
 * Chaque appel est tracé avec son code et son statut : on voit ce que le
 * service répond, y compris quand il refuse.
 */
import {
  ArrowRight,
  Check,
  CircleDashed,
  FilePlus2,
  KeyRound,
  ListOrdered,
  LogOut,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
  X,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './parcours.module.css';
import { Alerte } from '../components/ui/Alerte';
import { Bouton } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import { useNotifications } from '../components/ui/Notifications';
import { useSoumission } from '../hooks/useSoumission';
import { services } from '../services';
import type { DossierDto, FacteurDto, OperationRetraitDto, ReponseApi } from '../services/contracts/api';
import { POLITIQUE } from '../services/contracts/politique';
import { useSession } from '../session/SessionProvider';

type Trace = {
  readonly id: number;
  readonly appel: string;
  readonly ok: boolean;
  readonly code: string;
  readonly statut: number;
  readonly detail: string;
};

type Etape = 'identification' | 'facteur' | 'preuve' | 'recuperation' | 'decision' | 'retrait' | 'journal' | 'sortie';

const ETAPES: ReadonlyArray<{ readonly id: Etape; readonly titre: string; readonly texte: string }> = [
  { id: 'identification', titre: 'Identification', texte: 'Un identifiant, aucune révélation d’existence de compte.' },
  { id: 'facteur', titre: 'Second facteur', texte: 'Seuls les facteurs réellement enrôlés sont proposés.' },
  { id: 'preuve', titre: 'Preuve fraîche', texte: `Exigée pour une action sensible (fenêtre ${POLITIQUE.fraicheurMinutes} min).` },
  { id: 'recuperation', titre: 'Dossier de récupération', texte: 'Ouverture tracée, preuve indépendante requise.' },
  { id: 'decision', titre: 'Décision indépendante', texte: 'Un second acteur décide : jamais le demandeur.' },
  { id: 'retrait', titre: 'Retrait par cible', texte: 'Mesure, exécution, et ce qui reste non observable.' },
  { id: 'journal', titre: 'Journal', texte: 'Traçabilité : qui, quoi, quand, avec quelle corrélation.' },
  { id: 'sortie', titre: 'Déconnexion', texte: 'Locale certaine, distante jamais présumée.' },
];

let compteurTrace = 0;

export const Parcours = () => {
  const { session, etablir, deconnecter, aRole, changerProfil } = useSession();
  const { notifier } = useNotifications();
  const [traces, setTraces] = useState<readonly Trace[]>([]);
  const [identifiant, setIdentifiant] = useState('a.sossou');
  const [facteurs, setFacteurs] = useState<readonly FacteurDto[]>([]);
  const [facteurChoisi, setFacteurChoisi] = useState<string | null>(null);
  const [dossier, setDossier] = useState<DossierDto | null>(null);
  const [operation, setOperation] = useState<OperationRetraitDto | null>(null);
  const [evenements, setEvenements] = useState<number | null>(null);
  const [erreurIdentifiant, setErreurIdentifiant] = useState<string | null>(null);

  const identification = useSoumission<{ facteurs: readonly FacteurDto[] }>();
  const facteur = useSoumission<typeof session>();
  const preuve = useSoumission<typeof session>();
  const recuperation = useSoumission<{ reference: string }>();
  const decision = useSoumission<DossierDto>();
  const mesure = useSoumission<OperationRetraitDto>();
  const retrait = useSoumission<OperationRetraitDto>();
  const journal = useSoumission<readonly unknown[]>();

  const tracer = useCallback((appel: string, reponse: ReponseApi<unknown>, detail = '') => {
    compteurTrace += 1;
    setTraces((liste) =>
      [
        {
          id: compteurTrace,
          appel,
          ok: reponse.ok,
          code: reponse.ok ? 'OK' : reponse.code,
          statut: reponse.ok ? 200 : reponse.statut,
          detail: reponse.message ?? detail,
        },
        ...liste,
      ].slice(0, 12),
    );
  }, []);

  const etatEtape = (id: Etape): 'fait' | 'en-cours' | 'a-faire' | 'echec' => {
    switch (id) {
      case 'identification':
        return facteurs.length ? 'fait' : identification.etat === 'echec' ? 'echec' : 'a-faire';
      case 'facteur':
        return session.authentifie ? 'fait' : facteurChoisi ? 'en-cours' : 'a-faire';
      case 'preuve':
        return session.authentifie ? 'a-faire' : 'a-faire';
      case 'recuperation':
        return dossier ? 'fait' : 'a-faire';
      case 'decision':
        return dossier?.statut === 'approuve' || dossier?.statut === 'refuse' ? 'fait' : 'a-faire';
      case 'retrait':
        return operation?.statut === 'terminee' || operation?.statut === 'partielle' ? 'fait' : 'a-faire';
      case 'journal':
        return evenements !== null ? 'fait' : 'a-faire';
      case 'sortie':
        return session.authentifie ? 'a-faire' : 'fait';
      default:
        return 'a-faire';
    }
  };

  const lancerIdentification = async () => {
    setErreurIdentifiant(null);
    if (identifiant.trim().length < 3) {
      setErreurIdentifiant('Saisissez un identifiant (3 caractères minimum).');
      return;
    }
    const reponse = await identification.executer(() => services.auth.identifier(identifiant));
    tracer('POST /auth/identification', reponse);
    if (reponse.ok) {
      setFacteurs(reponse.donnees.facteurs);
      if (reponse.donnees.facteurs.length === 0) {
        notifier({
          ton: 'alerte',
          titre: 'Aucun facteur proposé',
          texte: 'La réponse est identique à celle d’un compte existant : aucune énumération n’est possible.',
        });
      }
    }
  };

  const lancerFacteur = async (identifiantFacteur: string) => {
    setFacteurChoisi(identifiantFacteur);
    const reponse = await facteur.executer(() => services.auth.verifierFacteur(identifiantFacteur));
    tracer('POST /auth/facteur', reponse);
    if (reponse.ok) {
      etablir(reponse.donnees);
      notifier({ ton: 'succes', titre: 'Session ouverte', texte: 'Preuve forte obtenue pour cette session.' });
    } else {
      notifier({ ton: 'alerte', titre: 'Second facteur refusé', texte: reponse.message });
    }
    setFacteurChoisi(null);
  };

  const lancerPreuve = async () => {
    const reponse = await preuve.executer(() => services.auth.produirePreuveFraiche());
    tracer('POST /auth/preuve-fraiche', reponse);
    if (reponse.ok) {
      etablir(reponse.donnees);
      notifier({ ton: 'succes', titre: 'Preuve fraîche produite', texte: `Valable ${POLITIQUE.fraicheurMinutes} minutes.` });
    } else {
      notifier({ ton: 'alerte', titre: 'Preuve refusée', texte: reponse.message });
    }
  };

  const lancerRecuperation = async () => {
    const reponse = await recuperation.executer(() => services.auth.ouvrirRecuperation(session.utilisateur?.identifiant ?? identifiant));
    tracer('POST /recovery/dossiers', reponse);
    if (reponse.ok) {
      const suivi = await services.auth.suivreRecuperation(reponse.donnees.reference);
      if (suivi.ok) setDossier(suivi.donnees);
      notifier({ ton: 'info', titre: `Dossier ${reponse.donnees.reference}`, texte: reponse.message ?? '' });
    }
  };

  const lancerDecision = async (choix: 'approuver' | 'refuser') => {
    if (!dossier) return;
    const reponse = await decision.executer(() =>
      services.backoffice.deciderRecuperation(dossier.reference, choix, choix === 'refuser' ? 'Preuve insuffisante' : undefined),
    );
    tracer(`POST /recovery/${dossier.reference}/decision`, reponse);
    if (reponse.ok) setDossier(reponse.donnees);
    else notifier({ ton: 'alerte', titre: 'Décision refusée', texte: reponse.message });
  };

  const lancerMesure = async () => {
    const cible = session.utilisateur?.id ?? 'usr_0388';
    const reponse = await mesure.executer(() => services.backoffice.mesurerRetrait(cible));
    tracer('POST /retraits/mesures', reponse);
    if (reponse.ok) setOperation(reponse.donnees);
  };

  const lancerRetrait = async () => {
    const cible = session.utilisateur?.id ?? 'usr_0388';
    const reponse = await retrait.executer(() => services.backoffice.executerRetrait(cible));
    tracer('POST /retraits/executions', reponse);
    if (reponse.ok) setOperation(reponse.donnees);
    else notifier({ ton: 'alerte', titre: 'Retrait refusé', texte: reponse.message });
  };

  const lancerJournal = async () => {
    const reponse = await journal.executer(() => services.backoffice.journal());
    tracer('GET /journal', reponse);
    if (reponse.ok) setEvenements(reponse.donnees.length);
  };

  const quitter = async () => {
    const resultat = await deconnecter();
    tracer(
      'POST /auth/logout',
      resultat
        ? { ok: true, donnees: resultat, message: resultat.message }
        : { ok: false, code: 'INCONNU', message: 'Déconnexion non confirmée', statut: 0 },
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <div>
          <p className={styles.surtitre}>Application · mode {services.mode}</p>
          <h1 className={styles.titre}>Parcours de bout en bout</h1>
          <p className={styles.chapeau}>
            Huit étapes, exécutées réellement sur la couche de services. Chaque appel apparaît à droite avec son code et
            son statut : un refus est une réponse, pas un échec de la démonstration.
          </p>
        </div>
        <div className={styles.enteteActions}>
          {services.mode === 'demo' ? (
            <>
              <Bouton taille="sm" variante="secondaire" onClick={() => void changerProfil('a.sossou')}>
                Profil gestionnaire
              </Bouton>
              <Bouton taille="sm" variante="secondaire" onClick={() => void changerProfil('r.houngbedji')}>
                Profil support
              </Bouton>
            </>
          ) : null}
          <Link to="/" className={styles.lienRetour}>
            Portail <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </header>

      <ol className={styles.etapes} aria-label="Étapes du parcours">
        {ETAPES.map((etape, index) => {
          const etat = etatEtape(etape.id);
          return (
            <li key={etape.id} className={`${styles.etape} ${styles[`etape--${etat}`]}`}>
              <span className={styles.etape__rang} aria-hidden="true">
                {etat === 'fait' ? <Check size={13} /> : etat === 'echec' ? <X size={13} /> : String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.etape__texte}>
                <span className={styles.etape__titre}>{etape.titre}</span>
                <span className={styles.etape__detail}>{etape.texte}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className={styles.colonnes}>
        <div className={styles.colonne}>
          <Carte titre="1 · Identification" sousTitre="Aucun mot de passe n’est collecté par cette interface." id="p-identification">
            <div className={styles.ligne}>
              <Champ
                label="Identifiant professionnel"
                value={identifiant}
                onChange={(evenement) => setIdentifiant(evenement.target.value)}
                aide="Démo : a.sossou, r.houngbedji, k.adjo, m.dossou."
                {...(erreurIdentifiant ? { erreur: erreurIdentifiant } : {})}
                obligatoire
              />
              <Bouton onClick={() => void lancerIdentification()} disabled={identification.enEnvoi}>
                {identification.enEnvoi ? 'Vérification…' : 'Continuer'}
              </Bouton>
            </div>
            {identification.erreur ? (
              <div className={styles.retour}>
                <Alerte ton="danger" role="alert" titre="Identification refusée">
                  {identification.erreur.message}
                </Alerte>
              </div>
            ) : null}
            {facteurs.length ? (
              <p className={styles.note}>
                <UserCheck aria-hidden="true" size={14} /> {facteurs.length} facteur(s) enrôlé(s) pour cet identifiant. La
                réponse serait identique si le compte n’existait pas.
              </p>
            ) : null}
          </Carte>

          <Carte titre="2 · Second facteur" sousTitre="Clé de sécurité, ou code à usage unique." id="p-facteur">
            {facteurs.length === 0 ? (
              <p className={styles.vide}>Commencez par l’identification pour obtenir la liste des facteurs.</p>
            ) : (
              <ul className={styles.liste}>
                {facteurs.map((candidat) => (
                  <li key={candidat.id} className={styles.item}>
                    <span>
                      <strong>{candidat.libelle}</strong>
                      <span className={styles.itemMeta}>
                        {candidat.type === 'cle' ? 'Clé de sécurité' : 'Code à usage unique'} · enrôlé le {candidat.enrole}
                      </span>
                    </span>
                    <Bouton
                      taille="sm"
                      variante={candidat.type === 'cle' ? 'primaire' : 'secondaire'}
                      onClick={() => void lancerFacteur(candidat.id)}
                      disabled={facteur.enEnvoi}
                      icone={<KeyRound size={14} />}
                    >
                      {facteurChoisi === candidat.id ? 'Cérémonie…' : 'Utiliser'}
                    </Bouton>
                  </li>
                ))}
              </ul>
            )}
            {facteur.erreur ? (
              <div className={styles.retour}>
                <Alerte ton="danger" role="alert" titre={`Refus (${facteur.erreur.code})`}>
                  {facteur.erreur.message}
                </Alerte>
              </div>
            ) : null}
          </Carte>

          <Carte
            titre="3 · Preuve fraîche"
            sousTitre={`Action sensible : preuve de moins de ${POLITIQUE.fraicheurMinutes} minutes.`}
            id="p-preuve"
            action={<Pastille ton={session.preuveFraicheJusqua ? 'succes' : 'alerte'}>{session.preuveFraicheJusqua ? 'fraîche' : 'à renouveler'}</Pastille>}
          >
            <div className={styles.ligne}>
              <Bouton onClick={() => void lancerPreuve()} disabled={!session.authentifie || preuve.enEnvoi} icone={<ShieldCheck size={15} />}>
                {preuve.enEnvoi ? 'Cérémonie…' : 'Produire une preuve fraîche'}
              </Bouton>
              <Bouton variante="secondaire" onClick={() => void lancerJournal()} disabled={journal.enEnvoi} icone={<ListOrdered size={15} />}>
                Lire le journal
              </Bouton>
            </div>
            {preuve.erreur ? (
              <div className={styles.retour}>
                <Alerte ton="alerte" role="alert" titre={`Refus (${preuve.erreur.code})`}>
                  {preuve.erreur.message}
                </Alerte>
              </div>
            ) : null}
            {!session.authentifie ? <p className={styles.vide}>Connectez-vous pour produire une preuve.</p> : null}
          </Carte>

          <Carte titre="4 · Dossier de récupération" sousTitre="Preuve indépendante et second acteur." id="p-recuperation">
            <Bouton
              onClick={() => void lancerRecuperation()}
              disabled={!session.authentifie || recuperation.enEnvoi}
              icone={<FilePlus2 size={15} />}
            >
              {recuperation.enEnvoi ? 'Ouverture…' : 'Ouvrir un dossier'}
            </Bouton>
            {dossier ? (
              <div className={styles.retour}>
                <p className={styles.reference}>
                  Référence <code>{dossier.reference}</code> · <Pastille ton="accent">{dossier.statut}</Pastille>
                </p>
                <ol className={styles.frise}>
                  {dossier.etapes.map((etape) => (
                    <li key={etape.titre} className={styles.frise__item}>
                      {etape.etat === 'fait' ? <Check size={13} /> : etape.etat === 'en-cours' ? <CircleDashed size={13} /> : <CircleDashed size={13} />}
                      <span>
                        <strong>{etape.titre}</strong>
                        <span className={styles.itemMeta}>{etape.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </Carte>

          <Carte
            titre="5 · Décision indépendante"
            sousTitre="Le demandeur ne peut jamais approuver son propre dossier."
            id="p-decision"
            action={aRole('gestionnaire', 'support') ? undefined : <Pastille ton="alerte">rôle requis</Pastille>}
          >
            <div className={styles.ligne}>
              <Bouton
                onClick={() => void lancerDecision('approuver')}
                disabled={!dossier || decision.enEnvoi}
                icone={<Check size={15} />}
              >
                Approuver
              </Bouton>
              <Bouton
                variante="secondaire"
                onClick={() => void lancerDecision('refuser')}
                disabled={!dossier || decision.enEnvoi}
                icone={<X size={15} />}
              >
                Refuser
              </Bouton>
            </div>
            {decision.erreur ? (
              <div className={styles.retour}>
                <Alerte ton="danger" role="alert" titre={`Décision refusée (${decision.erreur.code})`}>
                  {decision.erreur.message}
                </Alerte>
              </div>
            ) : null}
            {!dossier ? <p className={styles.vide}>Ouvrez d’abord un dossier.</p> : null}
          </Carte>

          <Carte titre="6 · Retrait par cible" sousTitre="Mesure d’abord, exécution ensuite." id="p-retrait">
            <div className={styles.ligne}>
              <Bouton variante="secondaire" onClick={() => void lancerMesure()} disabled={mesure.enEnvoi}>
                {mesure.enEnvoi ? 'Mesure…' : 'Mesurer l’impact'}
              </Bouton>
              <Bouton variante="danger" onClick={() => void lancerRetrait()} disabled={!operation || retrait.enEnvoi || !session.authentifie}>
                {retrait.enEnvoi ? 'Exécution…' : 'Exécuter le retrait'}
              </Bouton>
            </div>
            {operation ? (
              <div className={styles.retour}>
                <p className={styles.reference}>
                  Opération <code>{operation.reference}</code> · <Pastille ton={operation.statut === 'terminee' ? 'succes' : 'alerte'}>{operation.statut}</Pastille>
                </p>
                <ul className={styles.liste}>
                  {operation.cibles.map((cible) => (
                    <li key={cible.id} className={styles.item}>
                      <span>
                        <strong>{cible.nom}</strong>
                        <span className={styles.itemMeta}>{cible.detail}</span>
                      </span>
                      <Pastille
                        ton={
                          cible.etat === 'effectue'
                            ? 'succes'
                            : cible.etat === 'echec'
                              ? 'danger'
                              : cible.etat === 'non-observable'
                                ? 'inconnu'
                                : 'neutre'
                        }
                      >
                        {cible.etat}
                      </Pastille>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {retrait.erreur ? (
              <div className={styles.retour}>
                <Alerte ton="danger" role="alert" titre={`Refus (${retrait.erreur.code})`}>
                  {retrait.erreur.message}
                </Alerte>
              </div>
            ) : null}
          </Carte>

          <Carte titre="7 · Journal de traçabilité" sousTitre="Chaque action laisse une trace." id="p-journal">
            <Bouton variante="secondaire" onClick={() => void lancerJournal()} disabled={journal.enEnvoi} icone={<ListOrdered size={15} />}>
              {journal.enEnvoi ? 'Chargement…' : 'Afficher les événements'}
            </Bouton>
            {evenements !== null ? (
              <p className={styles.note}>
                <Check aria-hidden="true" size={14} /> {evenements} événement(s) en mémoire, avec corrélation.
              </p>
            ) : null}
            <p className={styles.vide}>
              Le journal réel n’existe pas encore côté BFF : le contrat est défini, l’écran le dit, et ne prétend jamais
              l’avoir lu.
            </p>
          </Carte>

          <Carte titre="8 · Déconnexion" sousTitre="Locale certaine, distante non présumée." id="p-sortie">
            <Bouton variante="secondaire" onClick={() => void quitter()} disabled={!session.authentifie} icone={<LogOut size={15} />}>
              Se déconnecter
            </Bouton>
          </Carte>
        </div>

        <aside className={styles.panneau} aria-label="Journal des appels">
          <div className={styles.panneauEntete}>
            <h2 className={styles.panneauTitre}>Journal des appels</h2>
            <Pastille ton="neutre">{traces.length}</Pastille>
          </div>
          {traces.length === 0 ? (
            <p className={styles.panneauVide}>
              <CircleDashed aria-hidden="true" size={15} /> Aucun appel pour l’instant. Chaque action déclenche un appel
              visible ici.
            </p>
          ) : (
            <ul className={styles.traces}>
              {traces.map((trace) => (
                <li key={trace.id} className={`${styles.trace} ${trace.ok ? styles['trace--ok'] : styles['trace--ko']}`}>
                  <code className={styles.trace__appel}>{trace.appel}</code>
                  <span className={styles.trace__code}>
                    {trace.ok ? <Check aria-hidden="true" size={12} /> : <TriangleAlert aria-hidden="true" size={12} />}
                    {trace.code} · {trace.statut}
                  </span>
                  {trace.detail ? <span className={styles.trace__detail}>{trace.detail}</span> : null}
                </li>
              ))}
            </ul>
          )}
          <p className={styles.panneauNote}>
            Mode <strong>{services.mode}</strong>. En mode <code>http</code>, ces mêmes appels passent par le BFF, la
            session opaque et le jeton CSRF.
          </p>
        </aside>
      </div>
    </div>
  );
};
