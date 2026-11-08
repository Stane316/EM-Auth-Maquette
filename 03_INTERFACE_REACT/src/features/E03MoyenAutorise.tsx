/**
 * E03 — Choix du moyen autorisé
 * Exigences : REQ-13-05 · REQ-13-06
 * Acteur : utilisateur
 * Rendu pressenti : thème Keycloak ou page BFF (démonstration ici)
 * Nature : maquette fictive, aucun service connecté
 */
import { KeyRound, LifeBuoy, Smartphone, Usb } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import { APPAREILS } from '../donnees/fiction';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { services } from '../services';
import type { FacteurDto } from '../services/contracts/api';
import { useSession } from '../session/SessionProvider';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

const ICONES = { cle: Usb, telephone: Smartphone, ordinateur: KeyRound } as const;

type Appareil = { readonly id: string; readonly libelle: string; readonly type: 'cle' | 'telephone' | 'ordinateur'; readonly enrole: string; readonly dernierUsage: string };

const convertir = (facteur: FacteurDto): Appareil => ({
  id: facteur.id,
  libelle: facteur.libelle,
  type: facteur.type,
  enrole: facteur.enrole,
  dernierUsage: facteur.dernierUsage,
});

export const E03MoyenAutorise = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const navigate = useNavigate();
  const emplacement = useLocation();
  const { etablir } = useSession();
  const transmis = (emplacement.state as { facteurs?: readonly FacteurDto[] } | null)?.facteurs;
  // Les facteurs viennent du service ; à défaut (ouverture directe de l'écran),
  // le jeu de démonstration sert de repli et l'écran le signale.
  const appareils: readonly Appareil[] = transmis?.length ? transmis.map(convertir) : APPAREILS;
  const [choix, setChoix] = useState(appareils[0]?.id ?? '');
  const [envoi, setEnvoi] = useState(false);
  const [erreurService, setErreurService] = useState<string | null>(null);

  const continuer = async () => {
    if (envoi) return;
    setEnvoi(true);
    setErreurService(null);
    const reponse = await services.auth.verifierFacteur(choix);
    setEnvoi(false);
    if (!reponse.ok) {
      setErreurService(reponse.message);
      return;
    }
    etablir(reponse.donnees);
    navigate('/ecran/preuve-fraiche?etat=attente');
  };

  const cleAbsente = actif.cle === 'cle-absente';
  const codeNonRecu = actif.cle === 'code-non-recu';
  const repli = actif.cle === 'repli';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · second facteur"
            titre="On ne propose que ce qui existe"
            texte="Un écran qui liste un moyen non enrôlé fabrique un cul-de-sac. La liste ci-contre ne contient que les facteurs réellement attachés à ce compte fictif."
            points={[
              'Chaque facteur affiche sa date d’enrôlement et son dernier usage.',
              'Un facteur absent n’est pas remplacé par un code envoyé à l’aveugle.',
              'Les codes de secours restent une voie distincte, avec un coût annoncé.',
            ]}
          />
        }
      >
        <h2 className={scene.carteTitre}>Comment souhaitez-vous prouver votre identité ?</h2>
        <p className={scene.carteTexte}>
          Un facteur est attendu, pas un mot de passe supplémentaire.
        </p>

        {cleAbsente ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Votre clé de sécurité n’est pas détectée">
              Branchez la clé, puis réessayez. Si elle est perdue, n’enrôlez pas un nouveau facteur seul : la
              récupération à deux acteurs est la voie prévue.
            </Alerte>
          </div>
        ) : null}

        {codeNonRecu ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="alerte" titre="Code non reçu" role="status">
              Le renvoi est limité par la politique anti-abus. Aucun délai de livraison n’est garanti : si le code
              n’arrive pas, utilisez un autre facteur déjà enrôlé.
            </Alerte>
          </div>
        ) : null}

        {repli ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="inconnu" titre="Repli sur un code de secours">
              Un code de secours à usage unique sera consommé définitivement. Utilisez cette voie seulement si aucun
              facteur n’est disponible.
            </Alerte>
          </div>
        ) : null}

        {!transmis?.length ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="info" role="status" titre="Facteurs du jeu de démonstration">
              Aucun facteur n’a été transmis par l’étape d’identification : l’écran affiche le jeu de démonstration. La
              cérémonie réelle sera exécutée par le BFF.
            </Alerte>
          </div>
        ) : null}

        {erreurService ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" role="alert" titre="Second facteur refusé">
              {erreurService}
            </Alerte>
          </div>
        ) : null}

        <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
          <legend className="visuellement-cache">Moyens d’authentification disponibles</legend>
          <div className={scene.choix}>
            {appareils.map((appareil) => {
              const Icone = ICONES[appareil.type];
              const indisponible = cleAbsente && appareil.type !== 'cle';
              return (
                <label
                  key={appareil.id}
                  className={`${scene.option} ${indisponible ? scene['option--indisponible'] : ''}`}
                >
                  <input
                    type="radio"
                    name="moyen"
                    value={appareil.id}
                    checked={choix === appareil.id}
                    onChange={() => setChoix(appareil.id)}
                    disabled={indisponible}
                  />
                  <span>
                    <span className={scene.option__titre}>{appareil.libelle}</span>
                    <span className={scene.option__detail}>
                      Enrôlé le {appareil.enrole} · dernier usage {appareil.dernierUsage}
                    </span>
                  </span>
                  <Icone className={scene.option__icone} aria-hidden="true" />
                </label>
              );
            })}
          </div>
        </fieldset>

        {repli ? (
          <div className={scene.formulaire}>
            <Champ
              label="Code de secours"
              name="code-secours"
              placeholder="XXXX-XXXX"
              inputMode="text"
              autoComplete="one-time-code"
              aide="Un code par ligne, tel qu’il vous a été remis à l’enrôlement."
              obligatoire
            />
            <Bouton bloc onClick={() => navigate('/ecran/preuve-fraiche?etat=attente')}>
              Utiliser ce code
            </Bouton>
          </div>
        ) : (
          <div className={scene.formulaire}>
            <Bouton bloc disabled={codeNonRecu || envoi} onClick={() => void continuer()}>
              {envoi ? 'Cérémonie en cours…' : 'Continuer avec ce facteur'}
            </Bouton>
            <Bouton variante="secondaire" bloc onClick={() => changer('cle-absente')}>
              Mon facteur ne fonctionne pas
            </Bouton>
          </div>
        )}

        <p className={scene.lienSecondaire}>
          <BoutonLien vers="/ecran/perte-ou-aide" variante="discret" taille="sm" icone={<LifeBuoy aria-hidden="true" />}>
            Aucun de ces moyens n’est disponible
          </BoutonLien>
          <span>
            <Pastille ton="succes">2 facteurs vérifiés</Pastille>
          </span>
        </p>
      </SceneAuth>
    </CoquilleEcran>
  );
};

/** Note : le formulaire de code de secours utilise `Champ`, qui porte déjà
 *  `aria-describedby` vers l'aide — aucun texte d'aide n'est orphelin. */
