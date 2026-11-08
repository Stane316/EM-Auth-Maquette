import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { Providers } from '../src/app/providers';
import { Parcours } from '../src/features/Parcours';
import { reinitialiserDonneesDemo } from '../src/services';

const monter = () =>
  render(
    <MemoryRouter initialEntries={['/parcours']}>
      <Providers>
        <Parcours />
      </Providers>
    </MemoryRouter>,
  );

describe('parcours de bout en bout', () => {
  beforeEach(() => reinitialiserDonneesDemo());

  it('identifie, ouvre une session, produit une preuve puis se déconnecte', async () => {
    const utilisateur = userEvent.setup();
    monter();

    const champ = screen.getByLabelText(/Identifiant professionnel/i);
    await utilisateur.clear(champ);
    await utilisateur.type(champ, 'a.sossou');
    await utilisateur.click(screen.getByRole('button', { name: /^Continuer$/ }));

    // Les facteurs arrivent du service, pas d'une liste statique.
    await screen.findByText(/facteur\(s\) enrôlé\(s\)/i);
    const boutons = await screen.findAllByRole('button', { name: /Utiliser/i });
    expect(boutons.length).toBeGreaterThan(0);

    await utilisateur.click(boutons[0] as HTMLElement);

    await waitFor(() => expect(screen.getByText('POST /auth/facteur')).toBeInTheDocument());
    const preuve = screen.getByRole('button', { name: /Produire une preuve fraîche/i });
    expect(preuve).toBeEnabled();

    await utilisateur.click(preuve);
    await waitFor(() => expect(screen.getByText('POST /auth/preuve-fraiche')).toBeInTheDocument());

    const sortie = screen.getByRole('button', { name: /Se déconnecter/i });
    await utilisateur.click(sortie);
    await waitFor(() => expect(screen.getByText('POST /auth/logout')).toBeInTheDocument());
  });

  it('refuse une identification de moins de trois caractères sans appeler le service', async () => {
    const utilisateur = userEvent.setup();
    monter();

    const champ = screen.getByLabelText(/Identifiant professionnel/i);
    await utilisateur.clear(champ);
    await utilisateur.type(champ, 'ab');
    await utilisateur.click(screen.getByRole('button', { name: /^Continuer$/ }));

    expect(await screen.findByText(/3 caractères minimum/i)).toBeInTheDocument();
    expect(screen.queryByText('POST /auth/identification')).not.toBeInTheDocument();
  });

  it('affiche le refus d’auto-approbation avec son code', async () => {
    const utilisateur = userEvent.setup();
    monter();

    const champ = screen.getByLabelText(/Identifiant professionnel/i);
    await utilisateur.clear(champ);
    await utilisateur.type(champ, 'a.sossou');
    await utilisateur.click(screen.getByRole('button', { name: /^Continuer$/ }));
    await screen.findByText(/facteur\(s\) enrôlé\(s\)/i);

    const boutons = await screen.findAllByRole('button', { name: /Utiliser/i });
    await utilisateur.click(boutons[0] as HTMLElement);
    await waitFor(() => expect(screen.getByText('POST /auth/facteur')).toBeInTheDocument());

    await utilisateur.click(screen.getByRole('button', { name: /Ouvrir un dossier/i }));
    await screen.findByText(/Référence/i);

    await utilisateur.click(screen.getByRole('button', { name: /Approuver/i }));

    expect(await screen.findByText(/Décision refusée \(RECOVERY_SELF_APPROVAL\)/)).toBeInTheDocument();
  });
});
