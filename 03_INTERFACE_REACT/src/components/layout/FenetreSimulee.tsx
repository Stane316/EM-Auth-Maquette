import { MonitorSmartphone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import styles from './ecran.module.css';

/**
 * Représente la fenêtre native du navigateur / du système (WebAuthn).
 *
 * C'est délibérément une simulation : aucune API `navigator.credentials` n'est
 * appelée, et le bandeau le dit. L'élément `<dialog>` natif fournit le piège de
 * focus, la fermeture par Échap et l'inertie de l'arrière-plan sans dépendance.
 */
export const FenetreSimulee = ({
  ouverte,
  onFermer,
  titre,
  texte,
  actions,
  children,
}: {
  readonly ouverte: boolean;
  readonly onFermer: () => void;
  readonly titre: string;
  readonly texte: string;
  readonly actions: ReactNode;
  readonly children?: ReactNode;
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogue = ref.current;
    if (!dialogue) return;
    if (ouverte && !dialogue.open) dialogue.showModal();
    if (!ouverte && dialogue.open) dialogue.close();
  }, [ouverte]);

  return (
    <dialog ref={ref} className={styles.fenetreSimulee} onClose={onFermer} aria-labelledby="fenetre-simulee-titre">
      <p className={styles.fenetreSimulee__bandeau}>
        <MonitorSmartphone aria-hidden="true" />
        Fenêtre native simulée — aucune API WebAuthn invoquée
      </p>
      <div className={styles.fenetreSimulee__corps}>
        <h2 className={styles.fenetreSimulee__titre} id="fenetre-simulee-titre">
          {titre}
        </h2>
        <p className={styles.fenetreSimulee__texte}>{texte}</p>
        {children}
      </div>
      <div className={styles.fenetreSimulee__pied}>{actions}</div>
    </dialog>
  );
};
