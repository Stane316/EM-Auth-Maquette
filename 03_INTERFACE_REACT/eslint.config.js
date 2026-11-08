import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/**
 * Règles de qualité — volontairement ciblées :
 *  - TypeScript recommandé (sans règles de style, qui n'apportent rien ici) ;
 *  - règles des Hooks React (dépendances, ordre d'appel) ;
 *  - interdiction des `console` oubliés et des `any` explicites.
 */
export default tseslint.config(
  { ignores: ['dist/**', 'dist-rendu/**', 'node_modules/**', 'scripts/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'no-restricted-globals': ['error', { name: 'localStorage', message: 'Aucun état de session ou secret dans le stockage local.' }],
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: { 'no-restricted-globals': 'off' },
  },
);
