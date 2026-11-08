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
  define: { 'process.env.NODE_ENV': '"production"' },
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
