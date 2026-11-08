/**
 * E09 — Demande sensible
 * Exigences : REQ-13-02 · REQ-13-15 · REQ-13-20
 * Acteur : demandeur / approbateur
 * Rendu pressenti : interface React (démonstration ici)
 * Statut : HORS LOT INITIAL — inclus sur décision D-013, arbitrage D-008 en attente
 * Nature : maquette fictive, aucune demande réelle
 */
import { ArrowLeft, ArrowRight, Scale, ScrollText, ShieldQuestion, UserX } from 'lucide-react';
import { useState } from 'react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { IDENTITE_COURANTE } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Champ } from '../components/ui/Champ';
import { Pastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

const Faits = ({ children }: { readonly children: React.ReactNode }) => <dl className="meta">{children}</dl>;

export const E09DemandeSensible = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const [cible, setCible] = useState('K. Adjo');
  const [motif, setMotif] = useState('Intervention planifiée — fenêtre de 4 h');

  const recapitulatif = actif.cle === 'recapitulatif';
  const envoyee = actif.cle === 'envoyee';
  const conflit = actif.cle === 'conflit';

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <Alerte ton="inconnu" titre="Écran hors lot initial — arbitrage requis avant toute décision">
        E09 n’était pas inclus dans le lot de 16 écrans. Il est présenté ici parce qu’il porte le cœur de la valeur du
        projet : une demande à effet irréversible, validée par deux personnes distinctes. Les rôles demandeur et
        approbateur ne sont pas encore arbitrés (décision D-008) : cet écran ne les invente pas.
      </Alerte>

      {!envoyee && !conflit ? (
        <Carte
          id="demande"
          titre="Élévation temporaire de privilège"
          sousTitre="Demande à effet limité dans le temps, révocable, tracée"
          action={<Pastille ton="alerte">Effet irréversible si accordée</Pastille>}
        >
          {!recapitulatif ? (
            <form
              className="grille-deux"
              style={{ display: 'grid', gap: 'var(--e-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
              onSubmit={(evenement) => {
                evenement.preventDefault();
                changer('recapitulatif');
              }}
            >
              <Champ
                label="Compte concerné"
                name="cible"
                value={cible}
                onChange={(evenement) => setCible(evenement.target.value)}
                aide="Le demandeur ne peut pas être le bénéficiaire d’un privilège sensible."
                obligatoire
              />
              <Champ
                label="Durée souhaitée"
                name="duree"
                defaultValue="4 heures"
                aide="La durée est bornée par la politique ; une valeur supérieure est refusée, pas ajustée."
                obligatoire
              />
              <Champ
                label="Motif professionnel"
                name="motif"
                value={motif}
                onChange={(evenement) => setMotif(evenement.target.value)}
                aide="Ce motif est visible par les approbateurs et conservé au journal."
                obligatoire
              />
              <div>
                <p className="caps" style={{ marginBottom: 4 }}>
                  Approbateurs requis
                </p>
                <p style={{ fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
                  A. Sossou (gestionnaire) — <strong>sauf</strong> si A. Sossou est le demandeur.
                </p>
                <p style={{ fontSize: 'var(--t-xs)', color: 'var(--encre-500)', marginTop: 4 }}>
                  Second acteur imposé par la règle de séparation.
                </p>
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
                <Bouton type="submit" icone={<ArrowRight aria-hidden="true" size={16} />}>
                  Relire la demande
                </Bouton>
                <Bouton variante="secondaire" onClick={() => changer('conflit')}>
                  Simuler un conflit d’intérêt
                </Bouton>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--e-4)' }}>
              <Tableau
                legende="Récapitulatif avant envoi — aucune donnée n’a encore été transmise"
                colonnes={[
                  { cle: 'quoi', titre: 'Élément' },
                  { cle: 'valeur', titre: 'Valeur' },
                ]}
                lignes={[
                  { cle: '1', cellules: { quoi: 'Demandeur', valeur: `${IDENTITE_COURANTE.nom} (vous)` } },
                  { cle: '2', cellules: { quoi: 'Compte concerné', valeur: cible } },
                  { cle: '3', cellules: { quoi: 'Nature', valeur: 'Élévation temporaire de privilège' } },
                  { cle: '4', cellules: { quoi: 'Durée', valeur: '4 heures — valeur de démonstration' } },
                  { cle: '5', cellules: { quoi: 'Motif', valeur: motif } },
                  { cle: '6', cellules: { quoi: 'Approbation', valeur: 'Un acteur distinct, non demandeur' } },
                ]}
              />
              <Alerte ton="alerte" titre="Ce qui se passera si la demande est accordée">
                Le compte recevra un privilège supplémentaire pendant la durée indiquée. À l’échéance, le privilège est
                retiré automatiquement — mais un retrait non observé est un retrait non confirmé.
              </Alerte>
              <div style={{ display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
                <Bouton onClick={() => changer('envoyee')} icone={<ArrowRight aria-hidden="true" size={16} />}>
                  Envoyer la demande
                </Bouton>
                <Bouton variante="secondaire" onClick={() => changer('formulaire')} icone={<ArrowLeft aria-hidden="true" size={16} />}>
                  Modifier
                </Bouton>
              </div>
            </div>
          )}
        </Carte>
      ) : null}

      {envoyee ? (
        <Carte
          id="envoyee"
          titre="Demande transmise — deux approbations requises"
          sousTitre="Référence dem_5488 · aucune action n’a encore été appliquée"
          action={<Pastille ton="accent">En attente</Pastille>}
        >
          <Faits>
            <div>
              <dt className="meta__terme">Demandeur</dt>
              <dd className="meta__valeur">{IDENTITE_COURANTE.nom}</dd>
            </div>
            <div>
              <dt className="meta__terme">Bénéficiaire</dt>
              <dd className="meta__valeur">{cible}</dd>
            </div>
            <div>
              <dt className="meta__terme">Approbateurs requis</dt>
              <dd className="meta__valeur">A. Sossou + un second acteur distinct</dd>
            </div>
            <div>
              <dt className="meta__terme">Effet</dt>
              <dd className="meta__valeur">Aucun avant la double approbation</dd>
            </div>
          </Faits>

          <Alerte ton="info" titre="Le demandeur ne peut pas être approbateur">
            Si le même compte tente d’approuver, la décision est refusée par la règle. Le refus est journalisé, ce qui
            permet de détecter une tentative de contournement.
          </Alerte>

          <div style={{ display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap', marginTop: 'var(--e-4)' }}>
            <BoutonLien vers="/ecran/decision-recuperation?etat=file" variante="secondaire">
              Voir la file d’approbation
            </BoutonLien>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--t-2xs)', color: 'var(--encre-500)' }}>
              <ScrollText aria-hidden="true" size={13} />
              Journal d’audit (A05) hors lot — non représenté
            </span>
          </div>
        </Carte>
      ) : null}

      {conflit ? (
        <Carte
          id="conflit"
          titre="Demande refusée : le demandeur est le bénéficiaire"
          sousTitre="Règle de séparation des acteurs — refus automatique et tracé"
          action={<Pastille ton="danger">Refusé</Pastille>}
        >
          <div style={{ display: 'grid', gap: 'var(--e-3)' }}>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <UserX aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--danger)' }} />
              Vous avez désigné votre propre compte comme bénéficiaire d’une élévation de privilège. Cette demande ne
              peut pas être formulée, quel que soit le motif.
            </p>
            <p style={{ display: 'flex', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
              <Scale aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
              La règle s’applique aussi aux approbations : un approbateur ne peut pas valider sa propre demande, même
              partiellement.
            </p>
            <Alerte ton="inconnu" titre="Aucun contournement proposé">
              L’interface ne suggère ni un autre demandeur, ni un découpage de la demande. Contourner la règle est une
              décision humaine, pas une option d’écran.
            </Alerte>
          </div>
          <div style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
            <Bouton onClick={() => changer('formulaire')}>Revenir au formulaire</Bouton>
            <BoutonLien vers="/ecran/decision-recuperation?etat=auto-approbation" variante="secondaire">
              Voir le refus côté approbateur
            </BoutonLien>
          </div>
        </Carte>
      ) : null}

      <Carte titre="Ce que cet écran ne fait pas" sousTitre="Et pourquoi" id="limites" serre>
        <ul style={{ display: 'grid', gap: 8, fontSize: 'var(--t-s)', color: 'var(--encre-700)' }}>
          <li style={{ display: 'flex', gap: 8 }}>
            <ShieldQuestion aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
            Aucune liste de privilèges réels : le catalogue des droits n’est pas fourni par le cahier des charges.
          </li>
          <li style={{ display: 'flex', gap: 8 }}>
            <ShieldQuestion aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
            Aucune durée maximale affirmée : la borne est une valeur de politique, non une décision de maquette.
          </li>
          <li style={{ display: 'flex', gap: 8 }}>
            <ShieldQuestion aria-hidden="true" size={16} style={{ flex: 'none', marginTop: 2, color: 'var(--encre-500)' }} />
            Aucun envoi réel, aucune notification : l’écran ne simule pas de courriel.
          </li>
        </ul>
      </Carte>
    </CoquilleEcran>
  );
};
