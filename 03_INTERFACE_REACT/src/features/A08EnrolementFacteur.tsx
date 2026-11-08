/**
 * A08 — Enrôlement du facteur
 * Exigences : REQ-13-04 · REQ-13-05
 * Acteur : utilisateur + opérateur
 * Rendu pressenti : dialogue natif + page de préparation (démonstration ici)
 * Nature : maquette fictive, simulation explicitement étiquetée
 */
import { BadgeCheck, KeyRound, MonitorSmartphone, ShieldX, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import { FenetreSimulee } from '../components/layout/FenetreSimulee';
import { BlocContexte, SceneAuth } from '../components/layout/SceneAuth';
import type { Ecran } from '../donnees/ecrans';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Pastille } from '../components/ui/Pastille';
import scene from '../components/layout/scene.module.css';

export const A08EnrolementFacteur = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [fenetreOuverte, setFenetreOuverte] = useState(false);
  const succes = actif.cle === 'succes';
  const annule = actif.cle === 'annule';
  const echec = actif.cle === 'echec';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <SceneAuth
        contexte={
          <BlocContexte
            marque="EM AUTH · enrôlement"
            titre="Le succès ne s’affiche qu’après vérification"
            texte="Enrôler une clé produit deux choses différentes : une cérémonie côté navigateur, et un enregistrement côté service. La seconde peut échouer alors que la première a réussi."
            points={[
              'Le mandat (A02) autorise l’opération ; il ne la réalise pas.',
              'La fenêtre native est représentée, jamais invoquée réellement ici.',
              'Une annulation ne laisse aucun facteur fantôme.',
            ]}
          />
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Pastille ton={succes ? 'succes' : echec ? 'danger' : annule ? 'neutre' : 'accent'}>
            {succes ? 'Facteur vérifié' : echec ? 'Échec' : annule ? 'Annulé' : 'En préparation'}
          </Pastille>
          <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
            mandat mdt_31b7
          </span>
        </div>

        <h2 className={scene.carteTitre} style={{ marginTop: 'var(--e-3)' }}>
          Enrôler une clé de sécurité
        </h2>

        {!succes && !annule && !echec ? (
          <>
            <p className={scene.carteTexte}>
              Vous allez enregistrer un nouveau facteur pour le compte <span className="mono">usr_0207</span>. Munissez-vous
              de la clé, puis lancez la cérémonie.
            </p>
            <ul style={{ display: 'grid', gap: 7, marginTop: 'var(--e-4)', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <li style={{ display: 'flex', gap: 7 }}>
                <KeyRound aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Une clé de sécurité compatible WebAuthn, non déjà enregistrée pour ce compte.
              </li>
              <li style={{ display: 'flex', gap: 7 }}>
                <MonitorSmartphone aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Un navigateur qui autorise les fenêtres de sécurité.
              </li>
              <li style={{ display: 'flex', gap: 7 }}>
                <TriangleAlert aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--alerte)' }} />
                Vous devez pouvoir toucher la clé physiquement pendant l’opération.
              </li>
            </ul>
            <div className={scene.formulaire} style={{ marginTop: 'var(--e-4)' }}>
              <Bouton bloc onClick={() => setFenetreOuverte(true)} icone={<KeyRound aria-hidden="true" size={16} />}>
                Démarrer l’enrôlement
              </Bouton>
              <Bouton variante="secondaire" bloc onClick={() => changer('annule')}>
                Simuler une annulation
              </Bouton>
              <Bouton variante="discret" taille="sm" onClick={() => changer('echec')}>
                Simuler un échec d’enregistrement
              </Bouton>
            </div>
            <p className={scene.simulation}>
              <MonitorSmartphone aria-hidden="true" />
              <span>
                La fenêtre qui s’ouvrira est une représentation HTML. Aucune clé réelle n’est lue, aucun secret n’est créé.
              </span>
            </p>
          </>
        ) : null}

        {succes ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="succes" titre="Facteur enregistré et vérifié côté service">
                La clé « porte-clés » est désormais utilisable pour ce compte. Le mandat a été consommé : il ne peut plus
                servir une seconde fois.
              </Alerte>
            </div>
            <dl className={scene.faits} style={{ marginTop: 'var(--e-4)' }}>
              <div className={scene.fait}>
                <dt className={scene.fait__terme}>Identifiant du facteur</dt>
                <dd className={scene.fait__valeur}><span className="mono">fct_9c21</span></dd>
              </div>
              <div className={scene.fait}>
                <dt className={scene.fait__terme}>Vérification</dt>
                <dd className={scene.fait__valeur}>Cérémonie réussie · enregistrement confirmé</dd>
              </div>
              <div className={scene.fait}>
                <dt className={scene.fait__terme}>Mandat</dt>
                <dd className={scene.fait__valeur}>mdt_31b7 — consommé</dd>
              </div>
            </dl>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/moyen-autorise?etat=choix" bloc>
                Se connecter avec le nouveau facteur
              </BoutonLien>
              <BoutonLien vers="/ecran/suivi-recuperation?etat=approuvee" variante="secondaire" bloc>
                Revenir au dossier
              </BoutonLien>
            </div>
          </>
        ) : null}

        {annule ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="alerte" titre="Enrôlement annulé — aucun facteur créé">
                L’opération a été interrompue avant l’enregistrement. Le compte conserve exactement ses facteurs
                précédents. Le mandat reste utilisable si sa fenêtre de validité n’est pas dépassée.
              </Alerte>
            </div>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <Bouton onClick={() => changer('preparation')}>Recommencer</Bouton>
              <BoutonLien vers="/ecran/perte-ou-aide" variante="secondaire">
                Je n’ai pas la bonne clé
              </BoutonLien>
            </div>
          </>
        ) : null}

        {echec ? (
          <>
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="danger" titre="L’enregistrement a échoué après la cérémonie">
                La clé a répondu, mais le service a refusé l’enregistrement. Aucun facteur n’a été créé. Le motif renvoyé
                est traduit sans détail technique exploitable : « mandat expiré ou déjà consommé ».
              </Alerte>
            </div>
            <ul style={{ display: 'grid', gap: 7, marginTop: 'var(--e-3)', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <li style={{ display: 'flex', gap: 7 }}>
                <ShieldX aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--danger)' }} />
                Le mandat ne peut pas être réutilisé : un nouveau mandat est nécessaire.
              </li>
              <li style={{ display: 'flex', gap: 7 }}>
                <BadgeCheck aria-hidden="true" size={15} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
                Aucun état intermédiaire n’est conservé : le compte n’a pas de facteur « à moitié » enregistré.
              </li>
            </ul>
            <div className={scene.actions} style={{ marginTop: 'var(--e-4)' }}>
              <BoutonLien vers="/ecran/mandat-enrolement?etat=creation" bloc>
                Émettre un nouveau mandat
              </BoutonLien>
              <Bouton variante="secondaire" bloc onClick={() => changer('preparation')}>
                Rester sur cet écran
              </Bouton>
            </div>
          </>
        ) : null}
      </SceneAuth>

      <FenetreSimulee
        ouverte={fenetreOuverte}
        onFermer={() => setFenetreOuverte(false)}
        titre="Enregistrer une clé de sécurité"
        texte="Em-Auth souhaite enregistrer une clé de sécurité pour votre compte. Insérez la clé, puis touchez-la lorsque le voyant clignote."
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
              Toucher la clé
            </Bouton>
          </>
        }
      >
        <p className="mono" style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
          em-auth · enrôlement · cérémonie de démonstration
        </p>
      </FenetreSimulee>
    </CoquilleEcran>
  );
};
