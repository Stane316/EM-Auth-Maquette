import { Compass } from 'lucide-react';
import { BoutonLien } from '../components/ui/Bouton';
import { Carte } from '../components/ui/Carte';

export const Introuvable = () => (
  <Carte titre="Cet écran n’existe pas dans la maquette" sousTitre="Adresse inconnue ou écran retiré du lot." id="introuvable">
    <p style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--encre-700)' }}>
      <Compass aria-hidden="true" size={18} />
      Aucun écran ne correspond à cette adresse. Le portail liste les 17 écrans démontrés.
    </p>
    <p style={{ marginTop: 'var(--e-4)' }}>
      <BoutonLien vers="/" variante="secondaire">
        Revenir au portail
      </BoutonLien>
    </p>
  </Carte>
);
