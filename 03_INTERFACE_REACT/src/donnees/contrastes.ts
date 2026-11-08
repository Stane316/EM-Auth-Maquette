/**
 * Contrastes déclarés, vérifiés par `scripts/audit.mjs`.
 *
 * Les valeurs ne sont pas des estimations : elles sont recalculées à partir des
 * jetons de `styles/tokens.css` (WCAG 2.x, luminance relative sRGB). Si une
 * couleur change sans que ce fichier soit mis à jour, l'audit échoue.
 * Un rapport affiché à l'écran qui ne serait pas vérifié serait pire qu'aucun.
 */

export type PaireContraste = {
  readonly nom: string;
  readonly texteVar: string;
  readonly fondVar: string;
  readonly ratio: number;
  readonly seuil: number;
  readonly usage: string;
};

export const PAIRES: readonly PaireContraste[] = [
  { nom: 'Titre principal', texteVar: '--encre-900', fondVar: '--surface', ratio: 18.07, seuil: 4.5, usage: 'h1, h2, valeurs de méta' },
  { nom: 'Texte courant', texteVar: '--encre-700', fondVar: '--surface', ratio: 10.82, seuil: 4.5, usage: 'paragraphes, tableaux' },
  { nom: 'Texte secondaire', texteVar: '--encre-500', fondVar: '--surface', ratio: 6.39, seuil: 4.5, usage: 'aides, libellés, légendes' },
  { nom: 'Texte secondaire sur canvas', texteVar: '--encre-500', fondVar: '--canvas', ratio: 6.0, seuil: 4.5, usage: 'aides dans les scènes' },
  { nom: 'Lien accentué', texteVar: '--accent-fonce', fondVar: '--surface', ratio: 8.4, seuil: 4.5, usage: 'liens, boutons discrets' },
  { nom: 'Blanc sur accent', texteVar: '--surface', fondVar: '--accent', ratio: 5.99, seuil: 4.5, usage: 'bouton primaire' },
  { nom: 'Blanc sur danger', texteVar: '--surface', fondVar: '--danger', ratio: 7.37, seuil: 4.5, usage: 'bouton destructif' },
  { nom: 'Succès', texteVar: '--succes', fondVar: '--surface', ratio: 6.25, seuil: 4.5, usage: 'pastilles et alertes de succès' },
  { nom: 'Alerte', texteVar: '--alerte', fondVar: '--surface', ratio: 6.8, seuil: 4.5, usage: 'avertissements' },
  { nom: 'Danger', texteVar: '--danger', fondVar: '--surface', ratio: 7.37, seuil: 4.5, usage: 'erreurs bloquantes' },
  { nom: 'Inconnu (non confirmé)', texteVar: '--inconnu', fondVar: '--surface', ratio: 9.69, seuil: 4.5, usage: 'état « non confirmé »' },
  { nom: 'Navigation — texte principal', texteVar: '--surface', fondVar: '--nuit', ratio: 16.13, seuil: 4.5, usage: 'barre latérale' },
  { nom: 'Navigation — texte atténué', texteVar: '--nuit-texte-attenue', fondVar: '--nuit', ratio: 7.56, seuil: 4.5, usage: 'libellés et légendes de la barre latérale' },
  { nom: 'Navigation — titre de groupe', texteVar: '--nuit-titre', fondVar: '--nuit', ratio: 6.54, seuil: 4.5, usage: 'intitulés de sections' },
  { nom: 'Navigation — lien actif', texteVar: '--nuit-lien-actif', fondVar: '--nuit-3', ratio: 5.86, seuil: 4.5, usage: 'identifiant de l’écran actif' },
];
