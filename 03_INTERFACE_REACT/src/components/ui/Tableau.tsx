import type { ReactNode } from 'react';
import styles from './ui.module.css';

type Colonne = { readonly cle: string; readonly titre: string; readonly aligneDroite?: boolean };

export const Tableau = ({
  legende,
  colonnes,
  lignes,
}: {
  readonly legende: string;
  readonly colonnes: readonly Colonne[];
  readonly lignes: ReadonlyArray<{ readonly cle: string; readonly cellules: Readonly<Record<string, ReactNode>> }>;
}) => (
  <div className={styles.tableauEnveloppe}>
    <table className={styles.tableau}>
      <caption>{legende}</caption>
      <thead>
        <tr>
          {colonnes.map((colonne) => (
            <th key={colonne.cle} scope="col" style={colonne.aligneDroite ? { textAlign: 'right' } : undefined}>
              {colonne.titre}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((ligne) => (
          <tr key={ligne.cle}>
            {colonnes.map((colonne) => (
              <td key={colonne.cle} style={colonne.aligneDroite ? { textAlign: 'right' } : undefined}>
                {ligne.cellules[colonne.cle] ?? '—'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
