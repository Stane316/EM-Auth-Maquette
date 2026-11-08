import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Révélation douce du contenu d'un écran quand l'état change.
 *
 * C'est le seul usage de Motion dans la maquette, et il est délibéré : un
 * changement d'état doit se voir, sinon l'utilisateur croit que son clic n'a
 * rien fait. Motion n'est pas employé pour décorer — le mouvement est annulé
 * dès que l'utilisateur demande moins d'animation.
 */
export const Revele = ({ children, cle }: { readonly children: ReactNode; readonly cle: string }) => {
  const reduit = useReducedMotion();

  if (reduit) return <div>{children}</div>;

  return (
    <motion.div
      key={cle}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
