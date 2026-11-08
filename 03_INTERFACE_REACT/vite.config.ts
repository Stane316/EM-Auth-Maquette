import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * L'aperçu de l'espace de travail sert l'application derrière un domaine proxy
 * (`*.e2b.app`). Sans `allowedHosts`, Vite refuse ces requêtes avec
 * « Blocked request. This host is not allowed » et l'aperçu reste blanc.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  build: { target: 'es2022', sourcemap: false },
});
