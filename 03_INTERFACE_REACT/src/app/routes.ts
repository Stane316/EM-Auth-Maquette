/** Chemins de l'application, déclarés une seule fois. */
export const ROUTES = {
  portail: '/',
  parcours: '/parcours',
  ecran: (slug: string) => `/ecran/${slug}`,
  systeme: '/systeme',
  dossier: '/dossier',
} as const;
