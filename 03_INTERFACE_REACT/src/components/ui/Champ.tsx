import { AlertCircle } from 'lucide-react';
import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import styles from './ui.module.css';

type Props = {
  readonly label: string;
  readonly aide?: string;
  readonly erreur?: string;
  readonly obligatoire?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * L'aide et l'erreur sont reliées au champ par `aria-describedby`, l'erreur est
 * annoncée (`role="alert"`), et le champ invalide porte `aria-invalid`.
 */
export const Champ = ({ label, aide, erreur, obligatoire = false, id, className, ...reste }: Props) => {
  const auto = useId();
  const idChamp = id ?? `champ-${auto}`;
  const idAide = `${idChamp}-aide`;
  const idErreur = `${idChamp}-erreur`;
  const decrit = [aide ? idAide : null, erreur ? idErreur : null].filter(Boolean).join(' ');

  return (
    <div className={cx(styles.champ, className)}>
      <label className={styles.champ__label} htmlFor={idChamp}>
        {label}
        {obligatoire ? (
          <span className={styles.champ__requis}>
            obligatoire<span className="visuellement-cache"> (champ obligatoire)</span>
          </span>
        ) : null}
      </label>
      <input
        {...reste}
        id={idChamp}
        className={cx(styles.champ__saisie, erreur && styles['champ__saisie--erreur'])}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={decrit || undefined}
        aria-required={obligatoire || undefined}
      />
      {aide ? (
        <p className={styles.champ__aide} id={idAide}>
          {aide}
        </p>
      ) : null}
      {erreur ? (
        <p className={styles.champ__erreur} id={idErreur} role="alert">
          <AlertCircle aria-hidden="true" />
          {erreur}
        </p>
      ) : null}
    </div>
  );
};
