import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Bouton } from '../src/components/ui/Bouton';
import { AccesProtege } from '../src/session/AccesProtege';
import { SessionProvider } from '../src/session/SessionProvider';

const monter = () =>
  render(
    <MemoryRouter>
      <SessionProvider>
        <AccesProtege roles={['gestionnaire']} titre="A04 — Orchestration du retrait">
          <Bouton>Exécuter le retrait</Bouton>
        </AccesProtege>
      </SessionProvider>
    </MemoryRouter>,
  );

describe('garde d’interface', () => {
  it('affiche un état d’accès refusé plutôt que de masquer l’écran', async () => {
    monter();
    expect(await screen.findByText(/Session requise/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Exécuter le retrait/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Se connecter \(E02\)/i })).toBeInTheDocument();
  });
});
