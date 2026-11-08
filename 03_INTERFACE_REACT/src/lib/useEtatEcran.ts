import { useSearchParams } from 'react-router-dom';
import { etatsDe } from '../donnees/ecrans';
import type { EtatEcran } from '../donnees/etats';

const ETAT_NEUTRE: EtatEcran = { cle: 'defaut', libelle: 'État par défaut', nature: 'nominal', preuve: '' };

/**
 * L'état courant vit dans l'URL (`?etat=…`) : un écran peut être montré,
 * partagé et vérifié dans un état précis. C'est aussi ce qui permet de
 * dénombrer les états sans les déclarer deux fois.
 */
export const useEtatEcran = (slug: string) => {
  const [parametres, setParametres] = useSearchParams();
  const etats = etatsDe(slug);
  const demande = parametres.get('etat');
  const actif = etats.find((etat) => etat.cle === demande) ?? etats[0] ?? ETAT_NEUTRE;

  const changer = (cle: string) => {
    const suivant = new URLSearchParams(parametres);
    suivant.set('etat', cle);
    setParametres(suivant, { replace: true });
  };

  return { etats, actif, changer } as const;
};
