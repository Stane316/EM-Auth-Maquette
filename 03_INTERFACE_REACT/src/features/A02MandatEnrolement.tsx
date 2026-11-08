/**
 * A02 — Identité et mandat d'enrôlement
 * Exigences : REQ-13-02 · REQ-13-03 · REQ-13-04
 * Acteur : gestionnaire d'accès
 * Rendu pressenti : interface React (démonstration ici)
 * Nature : maquette fictive, aucun mandat réel
 */
import { BadgeCheck, CalendarClock, FileSignature, UserCog, UserX } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { IDENTITES } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

export const A02MandatEnrolement = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [beneficiaire, setBeneficiaire] = useState(IDENTITES[1]?.nom ?? '');

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      {(actif.cle === 'creation' || actif.cle === 'portee') && (
        <Carte
          id="creation"
          titre="Émettre un mandat d’enrôlement"
          sousTitre="Un mandat autorise une opération précise, pour une personne précise, pendant une durée bornée"
          action={<Pastille ton="accent">Étape 1 sur 2</Pastille>}
        >
          <form
            style={{ display: 'grid', gap: 'var(--e-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
            onSubmit={(evenement) => {
              evenement.preventDefault();
              changer('emis');
            }}
          >
            <Champ
              label="Bénéficiaire"
              name="beneficiaire"
              value={beneficiaire}
              onChange={(evenement) => setBeneficiaire(evenement.target.value)}
              aide="La personne qui enrôlera le facteur — pas celle qui l’autorise."
              obligatoire
            />
            <Champ
              label="Facteur concerné"
              name="facteur"
              defaultValue="Clé de sécurité (WebAuthn)"
              aide="Un mandat ne couvre qu’un seul facteur et une seule opération."
              obligatoire
            />
            <Champ
              label="Échéance du mandat"
              name="echeance"
              defaultValue="48 heures"
              aide="Au-delà de l’échéance, le mandat est inutilisable, sans prolongation automatique."
              obligatoire
            />
            <Champ
              label="Motif"
              name="motif"
              defaultValue="Remplacement d’un facteur perdu — dossier dem_5512"
              obligatoire
            />
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
              <Bouton type="submit" icone={<FileSignature aria-hidden="true" size={16} />}>
                Émettre le mandat
              </Bouton>
              <Bouton variante="secondaire" onClick={() => changer('portee')}>
                Vérifier la portée
              </Bouton>
              <Bouton variante="discret" onClick={() => changer('conflit')}>
                Tenter un auto-mandat
              </Bouton>
            </div>
          </form>

          {actif.cle === 'portee' ? (
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Tableau
                legende="Comparaison des droits de l’auteur du mandat et de la portée demandée"
                colonnes={[
                  { cle: 'droit', titre: 'Droit' },
                  { cle: 'auteur', titre: 'Vous (auteur)' },
                  { cle: 'mandat', titre: 'Portée du mandat' },
                  { cle: 'verdict', titre: 'Verdict' },
                ]}
                lignes={[
                  {
                    cle: '1',
                    cellules: { droit: 'Enrôler un facteur', auteur: 'Oui', mandat: 'Oui', verdict: <Pastille ton="succes">Couvert</Pastille> },
                  },
                  {
                    cle: '2',
                    cellules: { droit: 'Réinitialiser un facteur', auteur: 'Non', mandat: 'Demandé', verdict: <Pastille ton="danger">Refusé</Pastille> },
                  },
                  {
                    cle: '3',
                    cellules: { droit: 'Attribuer un privilège', auteur: 'Non', mandat: 'Hors portée', verdict: <Pastille ton="neutre">Non couvert</Pastille> },
                  },
                ]}
              />
              <div style={{ marginTop: 'var(--e-3)' }}>
                <Alerte ton="alerte" titre="Un mandat ne peut pas dépasser les droits de son auteur">
                  La ligne 2 est refusée, y compris si elle est utile au dossier. Élargir un mandat pour « aller plus
                  vite » reviendrait à contourner la séparation des rôles.
                </Alerte>
              </div>
            </div>
          ) : null}
        </Carte>
      )}

      {actif.cle === 'conflit' ? (
        <Carte
          id="conflit"
          titre="Auto-mandat refusé"
          sousTitre="Nul ne s’autorise soi-même à enrôler un facteur"
          action={<Pastille ton="danger">Refusé</Pastille>}
        >
          <div style={{ display: 'grid', gap: 'var(--e-3)' }}>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <UserX aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--danger)' }} />
              Vous avez saisi votre propre compte comme bénéficiaire. Un mandat exige deux personnes : celle qui
              autorise et celle qui enrôle.
            </p>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <UserCog aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
              Si votre propre facteur est perdu, la voie prévue est la récupération à deux acteurs (E08, A03), pas
              l’auto-enrôlement.
            </p>
            <Alerte ton="inconnu" titre="Le refus est journalisé">
              Une tentative d’auto-mandat n’est pas une erreur de manipulation sans conséquence : elle apparaît au
              journal et peut être examinée.
            </Alerte>
          </div>
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton onClick={() => changer('creation')}>Revenir au mandat</Bouton>
            <BoutonLien vers="/ecran/suivi-recuperation?etat=en-cours" variante="secondaire">
              Ouvrir un dossier de récupération
            </BoutonLien>
          </div>
        </Carte>
      ) : null}

      {actif.cle === 'emis' ? (
        <Carte
          id="emis"
          titre="Mandat émis — enrôlement non encore réalisé"
          sousTitre="Référence mdt_31b7 · usage unique · lié à un seul facteur"
          action={<Pastille ton="succes">Émis</Pastille>}
        >
          <dl className="meta">
            <div>
              <dt className="meta__terme">Bénéficiaire</dt>
              <dd className="meta__valeur">{beneficiaire || 'Non renseigné'}</dd>
            </div>
            <div>
              <dt className="meta__terme">Facteur</dt>
              <dd className="meta__valeur">Clé de sécurité (WebAuthn)</dd>
            </div>
            <div>
              <dt className="meta__terme">Auteur du mandat</dt>
              <dd className="meta__valeur">A. Sossou — gestionnaire d’accès</dd>
            </div>
            <div>
              <dt className="meta__terme">Échéance</dt>
              <dd className="meta__valeur">48 heures — valeur de démonstration</dd>
            </div>
          </dl>

          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="info" titre="Émission ≠ enrôlement">
              Le mandat autorise l’opération ; il ne crée aucun facteur. Tant que l’enrôlement n’est pas vérifié côté
              service, le compte reste sans nouveau facteur utilisable.
            </Alerte>
          </div>

          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <BoutonLien vers="/ecran/enrolement-facteur?etat=preparation" icone={<BadgeCheck aria-hidden="true" size={16} />}>
              Passer à l’enrôlement (A08)
            </BoutonLien>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--t-2xs)', color: 'var(--encre-500)' }}>
              <CalendarClock aria-hidden="true" size={13} />
              Journal d’audit (A05) hors lot — non représenté
            </span>
          </div>
        </Carte>
      ) : null}

      <Carte titre="Pourquoi un mandat plutôt qu’un droit permanent" sousTitre="La différence se voit dans le temps" id="doctrine" serre>
        <ul style={{ display: 'grid', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
          <li>· Un mandat expire : un droit oublié ne devient pas un droit définitif.</li>
          <li>· Un mandat est lié à un facteur et à une personne : il ne peut pas être réutilisé ailleurs.</li>
          <li>· Un mandat est journalisé à l’émission et à la consommation : la trace existe même sans usage.</li>
        </ul>
      </Carte>
    </CoquilleEcran>
  );
};
