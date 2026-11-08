import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Configuration des tests d'interface.
 *
 * La latence du backend de démonstration est ramenée à 0 ms : elle sert à
 * éprouver les états d'attente à l'écran, pas à ralentir la suite de tests.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    env: { VITE_API_MODE: 'demo', VITE_DEMO_LATENCE_MS: '0' },
    restoreMocks: true,
    clearMocks: true,
  },
});
