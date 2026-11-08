import type { ComponentType } from 'react';
import type { Ecran } from '../donnees/ecrans';
import { A02MandatEnrolement } from './A02MandatEnrolement';
import { A03DecisionRecuperation } from './A03DecisionRecuperation';
import { A04OrchestrationRetrait } from './A04OrchestrationRetrait';
import { A08EnrolementFacteur } from './A08EnrolementFacteur';
import { E01Invitation } from './E01Invitation';
import { E02Identification } from './E02Identification';
import { E03MoyenAutorise } from './E03MoyenAutorise';
import { E04PreuveFraiche } from './E04PreuveFraiche';
import { E05Transition } from './E05Transition';
import { E06FinDeSession } from './E06FinDeSession';
import { E07PerteOuAide } from './E07PerteOuAide';
import { E08SuiviRecuperation } from './E08SuiviRecuperation';
import { E09DemandeSensible } from './E09DemandeSensible';
import { E10RetraitParCible } from './E10RetraitParCible';
import { E11ResultatNonConfirme } from './E11ResultatNonConfirme';
import { E12Expiration } from './E12Expiration';
import { E13Indisponibilite } from './E13Indisponibilite';

/**
 * Correspondance slug → composant. La clé est le slug déclaré dans
 * `donnees/ecrans.ts` ; `scripts/audit.mjs` vérifie que les deux ensembles sont
 * identiques, dans les deux sens.
 */
export const COMPOSANTS_ECRANS: Readonly<Record<string, ComponentType<{ ecran: Ecran }>>> = {
  invitation: E01Invitation,
  identification: E02Identification,
  'moyen-autorise': E03MoyenAutorise,
  'preuve-fraiche': E04PreuveFraiche,
  transition: E05Transition,
  'fin-de-session': E06FinDeSession,
  'perte-ou-aide': E07PerteOuAide,
  'suivi-recuperation': E08SuiviRecuperation,
  'demande-sensible': E09DemandeSensible,
  'retrait-par-cible': E10RetraitParCible,
  'resultat-non-confirme': E11ResultatNonConfirme,
  expiration: E12Expiration,
  indisponibilite: E13Indisponibilite,
  'mandat-enrolement': A02MandatEnrolement,
  'decision-recuperation': A03DecisionRecuperation,
  'orchestration-retrait': A04OrchestrationRetrait,
  'enrolement-facteur': A08EnrolementFacteur,
};
