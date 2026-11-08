/**
 * E04 — Défi et preuve fraîche
 * Exigences : REQ-13-05 · REQ-13-20
 * Acteur : utilisateur
 * Rendu pressenti : fenêtre native (non maîtrisée) + page d'attente
 * Nature : maquette fictive, simulation explicitement étiquetée
 */
import { Fingerprint, RefreshCw, TimerReset } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { FenetreSimulee } from '../components/layout/FenetreSimulee';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import scene from '../components/layout/scene.module.css';

const Faits = ({ children }: { readonly children: React.ReactNode }) => <dl className={scene.faits}>{children}</dl>;

const Fait = ({ terme, children }: { readonly terme: string; readonly children: React.ReactNode }) => (
  <div className={scene.fait}>
    <dt className={scene.fait__terme}>{terme}</dt>
    <dd className={scene.fait__valeur}>{children}</dd>
  </div>
);

export const E04PreuveFraiche = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [fenetreOuverte, setFenetreOuverte] = useState(false);

  const succes = actif.cle === 'succes';
  const refus = actif.cle === 'refus';
  const delai = actif.cle === 'delai';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · preuve fraîche"
            titre="Une session valide ne suffit pas toujours"
            texte="Pour une action à effet durable — retrait d’un accès, changement de facteur — la preuve doit être récente. Une session ouverte hier n’autorise pas un retrait aujourd’hui."
            points={[
              'La fenêtre de validité restante est affichée en clair après la preuve.',
              'Le refus côté facteur bloque l’action : aucun succès implicite.',
              'L’expiration est un état à part entière, pas une erreur honteuse.',
            ]}
          />
        }
      >
        <h2 className={scene.carteTitre}>Confirmez avec votre facteur</h2>
        <p className={scene.carteTexte}>
          Action demandée : consulter puis retirer un accès privilégié.
        </p>

        <Faits>
          <Fait terme="Action">Retrait de privilège — usr_0388</Fait>
          <Fait terme="Facteur attendu">Clé de sécurité (WebAuthn)</Fait>
          <Fait terme="Niveau exigé">Preuve fraîche, non réutilisable</Fait>
          <Fait terme="Nature">Maquette : la fenêtre système est simulée</Fait>
        </Faits>

        {succes ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="succes" titre="Preuve obtenue">
              La preuve est valable pour cette action seulement. Durée de validité affichée :{' '}
              <strong>5 minutes</strong> — valeur de démonstration, à fixer dans la politique réelle.
            </Alerte>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/retrait-par-cible?etat=impact" bloc>
                Poursuivre vers le retrait mesuré
              </BoutonLien>
            </div>
          </div>
        ) : null}

        {refus ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="Preuve refusée par le facteur" role="alert">
              L’action sensible reste bloquée. Un refus n’est pas une erreur technique : il peut signaler une clé
              oubliée, un mauvais port, ou un refus volontaire.
            </Alerte>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <Bouton onClick={() => changer('attente')} icone={<RefreshCw aria-hidden="true" size={16} />}>
                Réessayer
              </Bouton>
              <BoutonLien vers="/ecran/perte-ou-aide" variante="secondaire">
                Je n’ai plus mon facteur
              </BoutonLien>
            </div>
          </div>
        ) : null}

        {delai ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Défi expiré">
              Le défi a dépassé sa fenêtre de validité avant réception de la preuve. Aucune action n’a été exécutée :
              il faut relancer un défi.
            </Alerte>
            <div className={scene.formulaire}>
              <Bouton onClick={() => changer('attente')} icone={<TimerReset aria-hidden="true" size={16} />}>
                Relancer le défi
              </Bouton>
            </div>
          </div>
        ) : null}

        {!succes && !refus && !delai ? (
          <div className={scene.formulaire}>
            <Bouton
              bloc
              onClick={() => setFenetreOuverte(true)}
              icone={<Fingerprint aria-hidden="true" size={16} />}
            >
              Ouvrir la fenêtre de sécurité
            </Bouton>
            <Bouton variante="secondaire" bloc onClick={() => changer('delai')}>
              Simuler un défi expiré
            </Bouton>
            <Bouton variante="discret" taille="sm" onClick={() => changer('refus')}>
              Simuler un refus du facteur
            </Bouton>
          </div>
        ) : null}

        <p className={scene.simulation}>
          <Fingerprint aria-hidden="true" />
          <span>
            Dans l’application réelle, cette étape ouvre une fenêtre du navigateur ou du système que l’interface ne
            contrôle pas. Rien de tel n’est déclenché ici : la fenêtre ci-dessous est une représentation HTML, sans
            appel à <span className="mono">navigator.credentials</span>.
          </span>
        </p>
      </SceneAuth>

      <FenetreSimulee
        ouverte={fenetreOuverte}
        onFermer={() => setFenetreOuverte(false)}
        titre="Vérifiez votre identité"
        texte="Em-Auth souhaite vérifier votre identité avant de poursuivre une action sensible. Cette demande expirera rapidement."
        actions={
          <>
            <Bouton variante="secondaire" onClick={() => setFenetreOuverte(false)}>
              Annuler
            </Bouton>
            <Bouton
              onClick={() => {
                setFenetreOuverte(false);
                changer('succes');
              }}
            >
              Confirmer avec la clé
            </Bouton>
          </>
        }
      >
        <ul style={{ display: 'grid', gap: 6, marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
          <li className="mono">em-auth · authentification</li>
          <li className="mono">Défi de démonstration — non signé</li>
        </ul>
      </FenetreSimulee>
    </CoquilleEcran>
  );
};
