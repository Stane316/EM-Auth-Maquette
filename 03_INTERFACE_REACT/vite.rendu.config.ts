import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configuration dédiée au test de rendu : jsdom n'exécute pas les modules ES,
 * on produit donc une variante IIFE. Elle ne sert qu'à `npm run rendu` et n'est
 * jamais publiée.
 */
export default defineConfig({
  plugins: [react()],
  // Certaines dépendances lisent `process.env.NODE_ENV` : le bundle navigateur
  // doit la recevoir figée, sinon le montage échoue hors toolchain Node.
  define: {
    'process.env.NODE_ENV': '"production"',
    // Le test de rendu part d'une session de démonstration ouverte : il vérifie
    // que les écrans protégés se montent, pas leur garde (testée par Vitest).
    'import.meta.env.VITE_DEMO_SESSION_INITIALE': '"1"',
  },
  build: {
    outDir: 'dist-rendu',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.tsx',
      formats: ['iife'],
      name: 'MaquetteEMAuth',
      fileName: () => 'app.js',
    },
  },
});
