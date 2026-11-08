/**
 * E10 — Retrait par cible
 * Exigences : REQ-13-11 · REQ-13-12 · REQ-13-13
 * Acteur : administrateur / responsable
 * Rendu pressenti : interface React (démonstration ici)
 * Nature : maquette fictive, aucun retrait réel
 */
import { AlertOctagon, Gauge, Lock, Search, ShieldX } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { CIBLES, IDENTITES } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

const TON_CIBLE: Readonly<Record<string, { ton: TonPastille; mot: string }>> = {
  mesure: { ton: 'succes', mot: 'Mesuré' },
  'a-mesurer': { ton: 'alerte', mot: 'À mesurer' },
  'non-observable': { ton: 'inconnu', mot: 'Non observable' },
};

const totale = CIBLES.reduce((somme, cible) => somme + cible.impact, 0);

const Barre = ({ valeur, max }: { readonly valeur: number; readonly max: number }) => (
  <span
    aria-hidden="true"
    style={{ display: 'inline-flex', gap: 3, verticalAlign: 'middle' }}
  >
    {Array.from({ length: max }, (_, index) => (
      <span
        key={index}
        style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: index < valeur ? 'var(--accent)' : 'var(--trait-fort)',
        }}
      />
    ))}
  </span>
);

export const E10RetraitParCible = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [cible, setCible] = useState('usr_0388');
  const [confirme, setConfirme] = useState(false);
  const cibleChoisie = IDENTITES.find((identite) => identite.id === cible) ?? IDENTITES[3];

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      {actif.cle === 'selection' ? (
        <Carte
          id="selection"
          titre="Choisir la cible du retrait"
          sousTitre="Un retrait s’exprime toujours par une cible et une portée, jamais par un « tout »"
        >
          <Champ
            label="Rechercher un compte"
            name="recherche"
            placeholder="Nom, identifiant ou fonction"
            aide="Recherche fictive : trois comptes sont proposés pour la démonstration."
          />
          <div style={{ display: 'grid', gap: 8, marginTop: 'var(--e-4)' }}>
            {IDENTITES.map((identite) => (
              <label
                key={identite.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 12,
                  alignItems: 'center',
                  padding: '11px 13px',
                  border: `1px solid ${cible === identite.id ? 'var(--accent)' : 'var(--trait-fort)'}`,
                  background: cible === identite.id ? 'var(--accent-voile)' : 'var(--surface)',
                  borderRadius: 'var(--r-2)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="cible"
                  value={identite.id}
                  checked={cible === identite.id}
                  onChange={() => setCible(identite.id)}
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span>
                  <span style={{ display: 'block', fontWeight: 600, color: 'var(--encre-900)', fontSize: 'var(--t-s)' }}>
                    {identite.nom} — {identite.fonction}
                  </span>
                  <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                    {identite.id} · dernier accès {identite.dernierAcces}
                  </span>
                </span>
                <Pastille ton={identite.etatCompte === 'actif' ? 'succes' : identite.etatCompte === 'suspendu' ? 'alerte' : 'neutre'}>
                  {identite.etatCompte}
                </Pastille>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Bouton onClick={() => changer('impact')} icone={<Gauge aria-hidden="true" size={16} />}>
              Mesurer l’impact du retrait
            </Bouton>
          </div>
        </Carte>
      ) : null}

      {actif.cle === 'impact' || actif.cle === 'non-observable' ? (
        <Carte
          id="impact"
          titre={`Impact du retrait — ${cibleChoisie?.nom ?? 'compte inconnu'}`}
          sousTitre="Chaque cible est mesurée séparément : un total global masquerait les angles morts"
          action={<Pastille ton="accent">{totale} éléments mesurés</Pastille>}
        >
          <Tableau
            legende="Cibles du retrait et résultat de la mesure — données fictives"
            colonnes={[
              { cle: 'cible', titre: 'Cible' },
              { cle: 'portee', titre: 'Portée' },
              { cle: 'mesure', titre: 'Mesure' },
              { cle: 'etat', titre: 'État' },
            ]}
            lignes={CIBLES.map((ligne) => ({
              cle: ligne.id,
              cellules: {
                cible: ligne.nom,
                portee: ligne.portee,
                mesure: (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <Barre valeur={Math.min(ligne.impact, 4)} max={4} />
                    <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
                      {ligne.etat === 'non-observable' ? '—' : `${ligne.impact} ${ligne.unite}`}
                    </span>
                  </span>
                ),
                etat: <Pastille ton={TON_CIBLE[ligne.etat]?.ton ?? 'neutre'}>{TON_CIBLE[ligne.etat]?.mot ?? ligne.etat}</Pastille>,
              },
            }))}
          />

          {actif.cle === 'non-observable' ? (
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="inconnu" titre="Une cible ne peut pas être mesurée : les caches applicatifs">
                L’orchestrateur n’a pas d’accès en lecture à ces systèmes. Après exécution, leur état restera « non
                confirmé » — et non « retiré ». C’est cette nuance qui distingue un retrait vérifié d’un retrait
                supposé.
              </Alerte>
            </div>
          ) : (
            <div style={{ marginTop: 'var(--e-4)' }}>
              <Alerte ton="alerte" titre="Une cible non observable est présente dans ce plan">
                Le retrait peut être exécuté, mais son résultat ne pourra pas être totalement confirmé. Cette limite est
                annoncée avant l’exécution, pas découverte après.
              </Alerte>
            </div>
          )}

          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton variante="danger" onClick={() => changer('confirmation')} icone={<AlertOctagon aria-hidden="true" size={16} />}>
              Préparer le retrait
            </Bouton>
            <Bouton variante="secondaire" onClick={() => changer('selection')}>
              Changer de cible
            </Bouton>
          </div>
        </Carte>
      ) : null}

      {actif.cle === 'confirmation' ? (
        <Carte
          id="confirmation"
          titre="Confirmer le retrait"
          sousTitre="Action irréversible — une preuve fraîche est exigée"
          action={<Pastille ton="danger">Effet immédiat</Pastille>}
        >
          <Alerte ton="danger" titre="Ce qui va se produire">
            {cibleChoisie?.nom} perdra l’accès à l’ensemble des applications rattachées à ce compte. Les sessions
            actives seront révoquées. Les caches applicatifs ne pourront pas être vérifiés. Aucun retour arrière
            automatique n’existe : un nouvel accès devra être demandé.
          </Alerte>

          <div style={{ marginTop: 'var(--e-4)', display: 'grid', gap: 'var(--e-3)' }}>
            <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <input
                type="checkbox"
                checked={confirme}
                onChange={(evenement) => setConfirme(evenement.target.checked)}
                style={{ marginTop: 4, accentColor: 'var(--accent)' }}
              />
              <span>
                Je comprends que le retrait est immédiat, qu’il concerne toutes les applications rattachées, et que
                l’état des caches restera non confirmé.
              </span>
            </label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
              <Lock aria-hidden="true" size={14} />
              Preuve fraîche exigée à l’étape suivante (écran E04).
            </div>
          </div>

          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <BoutonLien
              vers="/ecran/preuve-fraiche?etat=attente"
              variante={confirme ? 'danger' : 'secondaire'}
              icone={<Lock aria-hidden="true" size={16} />}
            >
              Exiger la preuve et poursuivre
            </BoutonLien>
            <Bouton variante="discret" onClick={() => changer('selection')}>
              Annuler
            </Bouton>
          </div>
          {!confirme ? (
            <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--alerte)' }}>
              Sans la case cochée, le bouton reste disponible pour la démonstration mais l’action est réputée bloquée
              dans un vrai produit.
            </p>
          ) : null}
        </Carte>
      ) : null}

      {actif.cle === 'refus' ? (
        <Carte
          id="refus"
          titre="Retrait refusé"
          sousTitre="Le périmètre d’administration ne couvre pas cette cible"
          action={<Pastille ton="danger">Refusé</Pastille>}
        >
          <div style={{ display: 'grid', gap: 'var(--e-3)' }}>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <ShieldX aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--danger)' }} />
              Votre rôle permet de retirer des accès sur les applications dont vous êtes responsable. Ce compte dépend
              d’une autre entité : la demande doit être adressée à son gestionnaire.
            </p>
            <Alerte ton="info" titre="Aucun contournement d’urgence n’est affiché ici">
              L’urgence a sa propre procédure, sous mandat séparé. Elle n’est pas intégrée à cet écran, et elle ne
              consiste jamais à élargir silencieusement un droit.
            </Alerte>
          </div>
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton onClick={() => changer('selection')}>Choisir une autre cible</Bouton>
            <BoutonLien vers="/ecran/demande-sensible" variante="secondaire">
              Formuler une demande (E09)
            </BoutonLien>
          </div>
        </Carte>
      ) : null}

      <Carte titre="Rappel de méthode" sousTitre="Pourquoi mesurer plutôt que compter" id="methode" serre>
        <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
          <Search aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
          Une barre de progression globale donnerait l’illusion d’un retrait complet. Ici, cinq cibles, cinq mesures,
          trois issues possibles — et aucune ne prétend couvrir ce qu’elle ne voit pas.
        </p>
      </Carte>
    </CoquilleEcran>
  );
};
