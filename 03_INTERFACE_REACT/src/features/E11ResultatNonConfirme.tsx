/**
 * E11 — Résultat non confirmé
 * Exigences : REQ-13-12 · REQ-13-21
 * Acteur : tous (transversal)
 * Rendu pressenti : composant partagé BFF/UI
 * Nature : maquette fictive, aucune vérification réelle
 */
import { CheckCircle2, CircleHelp, LoaderCircle, RefreshCw, ShieldAlert, XCircle } from 'lucide-react';
import { CoquilleEcran } from '../components/layout/CoquilleEcran';
import type { Ecran } from '../donnees/ecrans';
import { EVENEMENTS } from '../donnees/fiction';
import { useEtatEcran } from '../lib/useEtatEcran';
import { Alerte } from '../components/ui/Alerte';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import { Tableau } from '../components/ui/Tableau';

const RESULTATS = {
  'non-confirme': {
    icone: CircleHelp,
    couleur: 'var(--inconnu)',
    voile: 'var(--inconnu-voile)',
    pastille: 'inconnu' as const,
    titre: 'Nous ne savons pas si le retrait a été appliqué',
    texte:
      'La demande a été transmise à trois systèmes. Deux ont répondu, le troisième n’a pas confirmé. Nous n’affichons donc ni succès ni échec.',
  },
  verification: {
    icone: LoaderCircle,
    couleur: 'var(--accent)',
    voile: 'var(--accent-voile)',
    pastille: 'accent' as const,
    titre: 'Vérification en cours',
    texte: 'Nous interrogeons chaque système concerné. Le résultat sera affiché tel qu’il revient, sans arrondi.',
  },
  confirme: {
    icone: CheckCircle2,
    couleur: 'var(--succes)',
    voile: 'var(--succes-voile)',
    pastille: 'succes' as const,
    titre: 'Retrait confirmé par mesure',
    texte:
      'Les trois systèmes ont répondu et la mesure confirme l’absence d’accès. La confirmation est horodatée et conservée au journal.',
  },
  'echec-verifie': {
    icone: XCircle,
    couleur: 'var(--danger)',
    voile: 'var(--danger-voile)',
    pastille: 'danger' as const,
    titre: 'Échec établi : le retrait n’a pas eu lieu',
    texte:
      'La mesure prouve que l’accès est toujours actif. Ce n’est pas une incertitude : c’est un constat, et il appelle une action immédiate.',
  },
} as const;

const VERIFICATIONS = [
  { systeme: 'Sessions actives', etat: 'Mesuré', detail: '3 sessions fermées, 0 restante', quand: '09:32:08' },
  { systeme: 'Jetons d’accès', etat: 'Mesuré', detail: 'Révoqués au prochain renouvellement', quand: '09:32:11' },
  { systeme: 'Caches applicatifs', etat: 'Non observable', detail: 'Aucun accès en lecture à ce système', quand: '—' },
] as const;

export const E11ResultatNonConfirme = ({ ecran }: { readonly ecran: Ecran }) => {
  const { etats, actif, changer } = useEtatEcran(ecran.slug);
  const resultat = RESULTATS[actif.cle as keyof typeof RESULTATS] ?? RESULTATS['non-confirme'];
  const Icone = resultat.icone;

  return (
    <CoquilleEcran ecran={ecran} etats={etats} actif={actif} onChangeEtat={changer}>
      <section
        aria-labelledby="resultat-titre"
        style={{
          padding: 'var(--e-5)',
          border: '1px solid var(--trait)',
          borderLeft: `4px solid ${resultat.couleur}`,
          borderRadius: 'var(--r-3)',
          background: resultat.voile,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Icone aria-hidden="true" size={22} style={{ color: resultat.couleur }} />
          <Pastille ton={resultat.pastille}>{actif.libelle}</Pastille>
          <span className="mono" style={{ fontSize: 'var(--t-3xs)', color: 'var(--encre-500)' }}>
            opération mrq_4de0
          </span>
        </div>
        <h2 id="resultat-titre" style={{ marginTop: 'var(--e-3)', fontSize: 'var(--t-xl)', color: 'var(--encre-900)' }}>
          {resultat.titre}
        </h2>
        <p style={{ marginTop: 'var(--e-2)', maxWidth: '62ch', fontSize: 'var(--t-s)', lineHeight: 1.6, color: 'var(--encre-700)' }}>
          {resultat.texte}
        </p>

        <div style={{ display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap', marginTop: 'var(--e-4)' }}>
          {actif.cle !== 'verification' ? (
            <Bouton onClick={() => changer('verification')} icone={<RefreshCw aria-hidden="true" size={16} />}>
              Vérifier maintenant
            </Bouton>
          ) : (
            <Bouton disabled icone={<LoaderCircle aria-hidden="true" size={16} />}>
              Vérification en cours
            </Bouton>
          )}
          <BoutonLien vers="/ecran/orchestration-retrait?etat=plan" variante="secondaire">
            Voir le plan de retrait (A04)
          </BoutonLien>
        </div>
      </section>

      <Carte
        titre="Ce qui est vérifié, et par qui"
        sousTitre="Chaque système répond pour lui-même ; aucun ne parle au nom d’un autre"
        id="verifications"
      >
        <Tableau
          legende="État de vérification par système — données fictives"
          colonnes={[
            { cle: 'systeme', titre: 'Système' },
            { cle: 'etat', titre: 'État' },
            { cle: 'detail', titre: 'Détail' },
            { cle: 'quand', titre: 'Relevé' },
          ]}
          lignes={VERIFICATIONS.map((ligne) => ({
            cle: ligne.systeme,
            cellules: {
              systeme: ligne.systeme,
              etat:
                ligne.etat === 'Mesuré' ? (
                  <Pastille ton="succes">Mesuré</Pastille>
                ) : (
                  <Pastille ton="inconnu">Non observable</Pastille>
                ),
              detail: ligne.detail,
              quand: <span className="mono">{ligne.quand}</span>,
            },
          }))}
        />

        {actif.cle === 'confirme' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="succes" titre="Passage de « non confirmé » à « confirmé » — tracé">
              Le changement d’état est lui-même journalisé : on peut savoir quand l’incertitude a été levée, et sur
              quelle mesure.
            </Alerte>
          </div>
        ) : null}

        {actif.cle === 'echec-verifie' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="danger" titre="Action requise : l’accès est toujours actif">
              Un échec mesuré n’est pas un incident de confort. Le responsable sécurité doit être informé et une
              nouvelle tentative planifiée. L’interface ne relance rien toute seule.
            </Alerte>
          </div>
        ) : null}

        {actif.cle === 'non-confirme' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <Alerte ton="inconnu" titre="Pourquoi nous n’affichons pas « terminé »">
              Les deux systèmes muets représentent 1 cible sur 3. Une interface qui afficherait « 67 % » laisserait
              croire que le reste est fait. Ici, la part incertaine reste nommée.
            </Alerte>
          </div>
        ) : null}
      </Carte>

      <Carte titre="Journal de l’opération" sousTitre="Extrait des événements liés à mrq_4de0" id="journal" serre>
        <Tableau
          legende="Événements d’audit — données fictives"
          colonnes={[
            { cle: 'quand', titre: 'Horodatage' },
            { cle: 'acteur', titre: 'Acteur' },
            { cle: 'action', titre: 'Action' },
            { cle: 'resultat', titre: 'Résultat' },
          ]}
          lignes={EVENEMENTS.filter((evenement) => evenement.correlation === 'mrq_4de0').map((evenement) => ({
            cle: evenement.horodatage,
            cellules: {
              quand: <span className="mono">{evenement.horodatage.replace('2026-11-08T', '').replace('Z', '')}</span>,
              acteur: evenement.acteur,
              action: evenement.action,
              resultat:
                evenement.resultat === 'non-confirme' ? (
                  <Pastille ton="inconnu">Non confirmé</Pastille>
                ) : evenement.resultat === 'succes' ? (
                  <Pastille ton="succes">Succès</Pastille>
                ) : (
                  <Pastille ton="danger">Refusé</Pastille>
                ),
            },
          }))}
        />
        <p style={{ display: 'flex', gap: 7, marginTop: 'var(--e-3)', fontSize: 'var(--t-xs)', color: 'var(--encre-500)' }}>
          <ShieldAlert aria-hidden="true" size={14} style={{ flex: 'none', marginTop: 2 }} />
          Le journal complet (A05) est hors lot : cet extrait ne remplace pas un journal d’audit.
        </p>
      </Carte>
    </CoquilleEcran>
  );
};
