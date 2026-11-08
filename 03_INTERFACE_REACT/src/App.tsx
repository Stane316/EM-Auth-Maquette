import { Route, Routes, useParams } from 'react-router-dom';
import { rolesRequis } from './app/regles';
import { ROUTES } from './app/routes';
import { CoquilleApp } from './components/layout/CoquilleApp';
import { ecranParSlug } from './donnees/ecrans';
import { Dossier } from './features/Dossier';
import { Introuvable } from './features/Introuvable';
import { Parcours } from './features/Parcours';
import { Portail } from './features/Portail';
import { Systeme } from './features/Systeme';
import { COMPOSANTS_ECRANS } from './features/registre';
import { AccesProtege } from './session/AccesProtege';

/**
 * Résout un écran par son slug : le composant et ses métadonnées viennent du
 * même registre, donc aucune route orpheline n'est possible.
 *
 * Les écrans qui exigent un rôle sont enveloppés dans `AccesProtege` : la garde
 * est ergonomique, jamais une autorisation (le BFF décide).
 */
const EcranRoute = () => {
  const { slug } = useParams();
  const ecran = ecranParSlug(slug);
  const Composant = slug ? COMPOSANTS_ECRANS[slug] : undefined;

  if (!ecran || !Composant || !slug) return <Introuvable />;

  const roles = rolesRequis(slug);

  if (roles.length === 0) return <Composant ecran={ecran} />;

  return (
    <AccesProtege roles={roles} titre={`${ecran.id} — ${ecran.titre}`}>
      <Composant ecran={ecran} />
    </AccesProtege>
  );
};

export const App = () => (
  <Routes>
    <Route element={<CoquilleApp />}>
      <Route index element={<Portail />} />
      <Route path="parcours" element={<Parcours />} />
      <Route path="ecran/:slug" element={<EcranRoute />} />
      <Route path="systeme" element={<Systeme />} />
      <Route path="dossier" element={<Dossier />} />
      <Route path="*" element={<Introuvable />} />
    </Route>
  </Routes>
);

export { ROUTES };
