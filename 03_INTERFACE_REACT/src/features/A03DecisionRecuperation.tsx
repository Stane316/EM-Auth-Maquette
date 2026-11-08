/**
 * A03 — Décision de récupération
 * Exigences : REQ-13-08 · REQ-13-09
 * Acteur : support + 2ᵉ acteur
 * Rendu pressenti : interface React (démonstration ici)
 * Nature : maquette fictive, aucune décision réelle
 */
import { CheckCircle2, CircleSlash, FileText, Lock, ShieldCheck, UserCheck, XCircle } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { DEMANDES, ETAPES_RECUPERATION } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import type { TonPastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

const ETAT: Readonly<Record<string, { ton: TonPastille; mot: string }>> = {
  'en-attente': { ton: 'alerte', mot: 'En attente' },
  approuvee: { ton: 'succes', mot: 'Approuvée' },
  refusee: { ton: 'danger', mot: 'Refusée' },
  expiree: { ton: 'inconnu', mot: 'Expirée' },
  brouillon: { ton: 'neutre', mot: 'Brouillon' },
};

export const A03DecisionRecuperation = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [motif, setMotif] = useState('');

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      {actif.cle === 'file' ? (
        <Carte
          id="file"
          titre="Dossiers en attente de décision"
          sousTitre="Traités par ordre d’ancienneté — aucune priorité n’est inventée"
          action={<Pastille ton="alerte">2 dossiers en attente</Pastille>}
        >
          <Tableau
            legende="Dossiers de démonstration, données fictives"
            colonnes={[
              { cle: 'ref', titre: 'Référence' },
              { cle: 'objet', titre: 'Objet' },
              { cle: 'demandeur', titre: 'Demandeur' },
              { cle: 'creee', titre: 'Ouvert' },
              { cle: 'etat', titre: 'État' },
            ]}
            lignes={DEMANDES.map((demande) => ({
              cle: demande.id,
              cellules: {
                ref: <span className="mono">{demande.id}</span>,
                objet: demande.objet,
                demandeur: demande.demandeur,
                creee: demande.creee,
                etat: <Pastille ton={ETAT[demande.etat]?.ton ?? 'neutre'}>{ETAT[demande.etat]?.mot ?? demande.etat}</Pastille>,
              },
            }))}
          />
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton onClick={() => changer('dossier')} icone={<FileText aria-hidden="true" size={16} />}>
              Ouvrir le dossier dem_5512
            </Bouton>
            <Bouton variante="secondaire" onClick={() => changer('auto-approbation')}>
              Tenter d’approuver sa propre demande
            </Bouton>
          </div>
        </Carte>
      ) : null}

      {actif.cle === 'dossier' || actif.cle === 'auto-approbation' ? (
        <>
          <Carte
            id="dossier"
            titre="Dossier dem_5512 — décision demandée"
            sousTitre="Récupération d’accès après perte de facteur · demandeur K. Adjo"
            action={<Pastille ton="alerte">Acteur 2 requis</Pastille>}
          >
            <dl className="meta">
              <div>
                <dt className="meta__terme">Premier acteur</dt>
                <dd className="meta__valeur">R. Houngbédji — vérification favorable</dd>
              </div>
              <div>
                <dt className="meta__terme">Second acteur attendu</dt>
                <dd className="meta__valeur">A. Sossou — décision indépendante</dd>
              </div>
              <div>
                <dt className="meta__terme">Pièces</dt>
                <dd className="meta__valeur">2 pièces d’identité vérifiées hors ligne</dd>
              </div>
              <div>
                <dt className="meta__terme">Effet en cas d’accord</dt>
                <dd className="meta__valeur">Mandat d’enrôlement — pas un accès immédiat</dd>
              </div>
            </dl>

            <ol style={{ display: 'grid', gap: 6, marginTop: 'var(--e-4)' }}>
              {ETAPES_RECUPERATION.slice(0, 3).map((etape) => (
                <li key={etape.titre} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 'var(--t-xs)', color: 'var(--encre-700)' }}>
                  {etape.etat === 'fait' ? (
                    <CheckCircle2 aria-hidden="true" size={15} style={{ color: 'var(--succes)', flex: 'none' }} />
                  ) : (
                    <CircleSlash aria-hidden="true" size={15} style={{ color: 'var(--alerte)', flex: 'none' }} />
                  )}
                  <span>
                    <strong style={{ color: 'var(--encre-900)' }}>{etape.titre}</strong> — {etape.detail}
                  </span>
                </li>
              ))}
            </ol>

            {actif.cle === 'auto-approbation' ? (
              <div style={{ marginTop: 'var(--e-4)' }}>
                <Alerte ton="danger" titre="Vous êtes le demandeur de ce dossier">
                  L’approbation est impossible : la séparation des acteurs est une règle du système, pas une préférence
                  d’organisation. Le bouton ci-dessous est bloqué et le motif est affiché.
                </Alerte>
                <div style={{ marginTop: 'var(--e-3)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
                  <Bouton disabled icone={<Lock aria-hidden="true" size={15} />}>
                    Approuver — indisponible
                  </Bouton>
                  <BoutonLien vers="/ecran/suivi-recuperation?etat=attente-2" variante="secondaire">
                    Voir l’attente côté demandeur
                  </BoutonLien>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
                <Bouton
                  onClick={() => changer('approuvee')}
                  icone={<ShieldCheck aria-hidden="true" size={16} />}
                >
                  Approuver en tant que second acteur
                </Bouton>
                <Bouton variante="secondaire" onClick={() => changer('refusee')} icone={<XCircle aria-hidden="true" size={16} />}>
                  Refuser
                </Bouton>
              </div>
            )}
          </Carte>

          <Carte titre="Traçabilité attendue de la décision" sousTitre="Ce qui sera conservé, quel que soit le choix" id="trace" serre>
            <ul style={{ display: 'grid', gap: 7, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <li>· Identité du décideur, horodatage, référence du dossier.</li>
              <li>· Motif en cas de refus — obligatoire, non facultatif.</li>
              <li>· Preuve que le décideur n’est pas le demandeur.</li>
              <li>· Aucune modification du dossier après décision : une correction passe par un nouveau dossier.</li>
            </ul>
          </Carte>
        </>
      ) : null}

      {actif.cle === 'approuvee' ? (
        <Carte
          id="approuvee"
          titre="Décision enregistrée : approuvée"
          sousTitre="Deux acteurs distincts · mandat d’enrôlement autorisé"
          action={<Pastille ton="succes">Approuvée</Pastille>}
        >
          <div style={{ display: 'grid', gap: 'var(--e-3)' }}>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <UserCheck aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--succes)' }} />
              R. Houngbédji (vérification) et A. Sossou (décision) sont deux personnes distinctes. La décision est
              conservée en écriture seule.
            </p>
            <Alerte ton="info" titre="Ce que l’approbation ne fait pas">
              Elle n’ouvre pas l’accès. Le demandeur doit encore enrôler son facteur avec le mandat émis, et cet
              enrôlement doit être vérifié.
            </Alerte>
          </div>
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <BoutonLien vers="/ecran/mandat-enrolement?etat=emis">
              Voir le mandat émis (A02)
            </BoutonLien>
            <BoutonLien vers="/ecran/suivi-recuperation?etat=approuvee" variante="secondaire">
              Vue du demandeur (E08)
            </BoutonLien>
          </div>
        </Carte>
      ) : null}

      {actif.cle === 'refusee' ? (
        <Carte
          id="refusee"
          titre="Refuser le dossier"
          sousTitre="Le motif est obligatoire : un refus muet n’est pas un refus opposable"
          action={<Pastille ton="danger">Motif requis</Pastille>}
        >
          <Champ
            label="Motif du refus, communiqué au demandeur"
            name="motif-refus"
            value={motif}
            onChange={(evenement) => setMotif(evenement.target.value)}
            placeholder="Ex. : la seconde pièce d’identité est illisible."
            aide="Ce texte est transmis au demandeur et conservé au journal. Il ne doit contenir aucune donnée sensible."
            obligatoire
            erreur={motif.trim().length === 0 ? 'Un refus sans motif ne peut pas être enregistré.' : undefined}
          />
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton variante="danger" disabled={motif.trim().length === 0}>
              Enregistrer le refus
            </Bouton>
            <BoutonLien vers="/ecran/suivi-recuperation?etat=refusee" variante="secondaire">
              Voir l’effet côté demandeur
            </BoutonLien>
          </div>
          <p style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
            Le bouton reste inopérant tant que le motif est vide : c’est la démonstration de la règle, pas une
            décoration.
          </p>
        </Carte>
      ) : null}
    </CoquilleEcran>
  );
};
