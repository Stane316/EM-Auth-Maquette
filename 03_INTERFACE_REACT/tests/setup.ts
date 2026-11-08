import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

// jsdom n'implémente ni matchMedia ni scrollTo : on fournit des doublures inertes.
if (!window.matchMedia) {
  window.matchMedia = ((requete: string) => ({
    matches: false,
    media: requete,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

window.scrollTo = (() => undefined) as unknown as typeof window.scrollTo;
