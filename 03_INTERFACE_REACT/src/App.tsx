import { Route, Routes, useParams } from 'react-router-dom';
import { CoquilleApp } from './components/layout/CoquilleApp';
import { ecranParSlug } from './donnees/ecrans';
import { Dossier } from './features/Dossier';
import { Introuvable } from './features/Introuvable';
import { Portail } from './features/Portail';
import { Systeme } from './features/Systeme';
import { COMPOSANTS_ECRANS } from './features/registre';

/**
 * Résout un écran par son slug : le composant et ses métadonnées viennent du
 * même registre, donc aucune route orpheline n'est possible.
 */
const EcranRoute = () => {
  const { slug } = useParams();
  const ecran = ecranParSlug(slug);
  const Composant = slug ? COMPOSANTS_ECRANS[slug] : undefined;

  if (!ecran || !Composant) return <Introuvable />;

  return <Composant ecran={ecran} />;
};

export const App = () => (
  <Routes>
    <Route element={<CoquilleApp />}>
      <Route index element={<Portail />} />
      <Route path="ecran/:slug" element={<EcranRoute />} />
      <Route path="systeme" element={<Systeme />} />
      <Route path="dossier" element={<Dossier />} />
      <Route path="*" element={<Introuvable />} />
    </Route>
  </Routes>
);
