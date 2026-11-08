import { Lock, ShieldAlert, UserCog } from 'lucide-react';
import type { ReactNode } from 'react';
import { Bouton, BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';
import { Pastille } from '../components/ui/Pastille';
import type { Role } from '../services/contracts/api';
import { services } from '../services';
import { useSession } from './SessionProvider';

/**
 * Garde d'interface — et garde d'interface **seulement**.
 *
 * Masquer un écran ne protège rien : le BFF décide à chaque requête
 * (`app/lib/authz.mjs`). Ce composant évite d'afficher des actions qui
 * échoueraient de toute façon, et le dit explicitement.
 */
export const AccesProtege = ({
  roles,
  children,
  titre,
}: {
  readonly roles: readonly Role[];
  readonly children: ReactNode;
  readonly titre: string;
}) => {
  const { session, chargement, aRole, changerProfil } = useSession();

  if (chargement) {
    return (
      <Carte titre={titre} sousTitre="Vérification de la session…" id="acces-chargement">
        <p style={{ color: 'var(--encre-500)', fontSize: 'var(--t-s)' }}>Chargement de la session en cours.</p>
      </Carte>
    );
  }

  if (!session.authentifie) {
    return (
      <Carte
        titre="Session requise"
        sousTitre={`${titre} — cet écran n’est accessible qu’à un compte authentifié.`}
        action={<Pastille ton="alerte">Non authentifié</Pastille>}
        id="acces-session"
      >
        <p style={{ display: 'flex', gap: 8, color: 'var(--encre-700)', fontSize: 'var(--t-s)' }}>
          <Lock aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2 }} />
          Aucune session n’est ouverte. L’écran est affiché dans son état « accès refusé » plutôt que masqué : c’est un
          état à concevoir, pas un cas à cacher.
        </p>
        <p style={{ marginTop: 'var(--e-4)', display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
          <BoutonLien vers="/ecran/identification">Se connecter (E02)</BoutonLien>
          <BoutonLien vers="/" variante="secondaire">
            Revenir au portail
          </BoutonLien>
        </p>
      </Carte>
    );
  }

  if (!aRole(...roles)) {
    return (
      <Carte
        titre="Accès refusé — rôle insuffisant"
        sousTitre={`${titre} exige l’un des rôles : ${roles.join(', ')}.`}
        action={<Pastille ton="danger">403</Pastille>}
        id="acces-refuse"
      >
        <p style={{ display: 'flex', gap: 8, color: 'var(--encre-700)', fontSize: 'var(--t-s)' }}>
          <ShieldAlert aria-hidden="true" size={17} style={{ flex: 'none', marginTop: 2 }} />
          Votre compte (<strong>{session.utilisateur?.nom}</strong>) ne dispose pas du rôle requis. Aucune donnée
          n’est affichée, et aucune action ne peut être déclenchée.
        </p>
        <p style={{ marginTop: 'var(--e-3)', color: 'var(--encre-500)', fontSize: 'var(--t-xs)', lineHeight: 1.5 }}>
          Cette garde est un confort d’interface : le contrôle d’autorisation réel est effectué côté serveur, à chaque
          requête, par le BFF. Masquer un écran ne protège rien.
        </p>

        {services.mode === 'demo' ? (
          <div style={{ marginTop: 'var(--e-4)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--encre-500)', fontSize: 'var(--t-3xs)', marginBottom: 8 }}>
              <UserCog aria-hidden="true" size={13} />
              Démonstration : changez de profil pour poursuivre la visite.
            </p>
            <div style={{ display: 'flex', gap: 'var(--e-2)', flexWrap: 'wrap' }}>
              <Bouton taille="sm" onClick={() => void changerProfil('a.sossou')}>
                Profil gestionnaire (A. Sossou)
              </Bouton>
              <Bouton taille="sm" variante="secondaire" onClick={() => void changerProfil('r.houngbedji')}>
                Profil support (R. Houngbédji)
              </Bouton>
            </div>
          </div>
        ) : null}
      </Carte>
    );
  }

  return <>{children}</>;
};
