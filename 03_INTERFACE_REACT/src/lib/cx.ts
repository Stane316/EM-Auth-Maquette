/** Concatène des classes conditionnelles sans dépendance externe. */
export const cx = (...classes: ReadonlyArray<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
