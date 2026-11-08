import { useCallback, useRef, useState } from 'react';
import type { ReponseApi } from '../services/contracts/api';

export type EtatSoumission = 'repos' | 'envoi' | 'succes' | 'echec';

/**
 * Pilote une action asynchrone : état d'envoi, protection contre les doubles
 * soumissions, message d'échec à afficher, et remise à zéro explicite.
 */
export const useSoumission = <T>() => {
  const [etat, setEtat] = useState<EtatSoumission>('repos');
  const [resultat, setResultat] = useState<T | null>(null);
  const [erreur, setErreur] = useState<{ code: string; message: string } | null>(null);
  const enCours = useRef(false);

  const executer = useCallback(async (action: () => Promise<ReponseApi<T>>): Promise<ReponseApi<T>> => {
    if (enCours.current) {
      return { ok: false, code: 'DEJA_EN_COURS', message: 'Action déjà en cours.', statut: 0 };
    }
    enCours.current = true;
    setEtat('envoi');
    setErreur(null);
    try {
      const reponse = await action();
      if (reponse.ok) {
        setResultat(reponse.donnees);
        setEtat('succes');
      } else {
        setErreur({ code: reponse.code, message: reponse.message });
        setEtat('echec');
      }
      return reponse;
    } catch {
      const reponse: ReponseApi<T> = {
        ok: false,
        code: 'INCONNU',
        message: 'Une erreur inattendue est survenue. Aucune action n’a été enregistrée.',
        statut: 0,
      };
      setErreur({ code: reponse.code, message: reponse.message });
      setEtat('echec');
      return reponse;
    } finally {
      enCours.current = false;
    }
  }, []);

  const reinitialiser = useCallback(() => {
    setEtat('repos');
    setResultat(null);
    setErreur(null);
  }, []);

  return { etat, resultat, erreur, executer, reinitialiser, enEnvoi: etat === 'envoi' } as const;
};
