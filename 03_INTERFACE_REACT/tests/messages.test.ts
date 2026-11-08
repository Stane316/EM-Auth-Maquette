import { describe, expect, it } from 'vitest';
import { message, SOURCE_CONTRAT } from '../src/services/contracts/messages';
import type { CodeMessage } from '../src/services/contracts/messages';

/** Comparaison insensible aux accents et aux apostrophes typographiques. */
const normaliser = (texte: string): string =>
  texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

describe('catalogue de messages S05', () => {
  const codes = Object.keys(SOURCE_CONTRAT) as CodeMessage[];

  it('couvre exactement les codes du contrat', () => {
    expect(codes).toHaveLength(29);
    expect(codes.every((code) => typeof message(code) === 'string')).toBe(true);
  });

  it.each(codes)('reprend mot pour mot le texte du contrat : %s', (code) => {
    expect(normaliser(message(code))).toBe(normaliser(SOURCE_CONTRAT[code] ?? ''));
  });
});
