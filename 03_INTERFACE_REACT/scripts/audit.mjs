#!/usr/bin/env node
/**
 * Audit de la maquette — exécutable sans navigateur.
 *
 * Il ne remplace pas un test d'accessibilité réel : il vérifie ce qui est
 * vérifiable hors navigateur, et il le fait sans complaisance.
 *
 *  1. Contrastes : recalculés depuis tokens.css et comparés aux valeurs affichées.
 *  2. Registre : les slugs des écrans et les clés des composants sont identiques.
 *  3. États : chaque écran a des états, les clés sont uniques, le total est cohérent.
 *  4. Navigation : tout lien interne pointe vers une route qui existe.
 *  5. Réseau : les appels sortants sont confinés au client HTTP (`src/services/http`).
 *     Aucun écran, aucun hook, aucun composant n'appelle le réseau directement,
 *     et aucune cérémonie WebAuthn n'est exécutée côté navigateur.
 *  6. Jetons : détection des couleurs écrites en dehors de tokens.css.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const RACINE = new URL('..', import.meta.url).pathname;
const SRC = join(RACINE, 'src');

const resultats = [];
const echec = (controle, detail) => resultats.push({ controle, ok: false, detail });
const succes = (controle, detail) => resultats.push({ controle, ok: true, detail });

/* --- Utilitaires ---------------------------------------------------------- */
const lire = (chemin) => readFile(chemin, 'utf8');

const fichiers = async (dossier, extension = '.tsx') => {
  const entrees = await readdir(dossier, { withFileTypes: true });
  const trouves = [];
  for (const entree of entrees) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) trouves.push(...(await fichiers(chemin, extension)));
    else if (entree.name.endsWith(extension)) trouves.push(chemin);
  }
  return trouves;
};

const canal = (composante) => {
  const c = composante / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const propre = hex.replace('#', '');
  const [r, v, b] = [0, 2, 4].map((i) => parseInt(propre.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(v) + 0.0722 * canal(b);
};
const contraste = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* --- 1. Contrastes -------------------------------------------------------- */
const tokens = await lire(join(SRC, 'styles/tokens.css'));
const jetons = {};
const blocRacine = tokens.slice(tokens.indexOf(':root'), tokens.indexOf('}', tokens.indexOf(':root')));
for (const ligne of blocRacine.split('\n')) {
  const correspondance = ligne.match(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})/);
  if (correspondance) jetons[correspondance[1]] = correspondance[2];
}

const sourceContrastes = await lire(join(SRC, 'donnees/contrastes.ts'));
const paires = [...sourceContrastes.matchAll(/\{ nom: '([^']+)'[^}]*texteVar: '([^']+)'[^}]*fondVar: '([^']+)'[^}]*ratio: ([\d.]+)[^}]*seuil: ([\d.]+)/g)].map(
  (m) => ({ nom: m[1], texte: m[2], fond: m[3], declare: Number(m[4]), seuil: Number(m[5]) }),
);

if (paires.length === 0) {
  echec('1. Contrastes', 'aucune paire lue dans donnees/contrastes.ts — le test ne prouve rien');
} else {
  for (const paire of paires) {
    const couleurTexte = jetons[paire.texte];
    const couleurFond = jetons[paire.fond];
    if (!couleurTexte || !couleurFond) {
      echec('1. Contrastes', `${paire.nom} : jeton introuvable (${paire.texte} / ${paire.fond})`);
      continue;
    }
    const calcule = contraste(couleurTexte, couleurFond);
    const ecart = Math.abs(calcule - paire.declare);
    if (ecart > 0.05) {
      echec('1. Contrastes', `${paire.nom} : affiché ${paire.declare}, calculé ${calcule.toFixed(2)}`);
    } else if (calcule < paire.seuil) {
      echec('1. Contrastes', `${paire.nom} : ${calcule.toFixed(2)} < seuil ${paire.seuil}`);
    }
  }
  if (!resultats.some((r) => r.controle === '1. Contrastes')) {
    succes('1. Contrastes', `${paires.length} paires recalculées, toutes conformes au seuil annoncé`);
  }
}

/* --- 2. Registre des écrans ---------------------------------------------- */
const sourceEcrans = await lire(join(SRC, 'donnees/ecrans.ts'));
const slugsEcrans = [...sourceEcrans.matchAll(/^\s{4}slug: '([^']+)',/gm)].map((m) => m[1]);
const sourceRegistre = await lire(join(SRC, 'features/registre.ts'));
const clesRegistre = [...sourceRegistre.matchAll(/^\s{2}'?([a-z-]+)'?: [A-Z]/gm)].map((m) => m[1]);

const manquants = slugsEcrans.filter((slug) => !clesRegistre.includes(slug));
const orphelins = clesRegistre.filter((cle) => !slugsEcrans.includes(cle));
if (slugsEcrans.length === 0) echec('2. Registre', 'aucun slug lu dans donnees/ecrans.ts');
else if (manquants.length || orphelins.length) {
  echec('2. Registre', `sans composant : ${manquants.join(', ') || '—'} · sans écran : ${orphelins.join(', ') || '—'}`);
} else {
  succes('2. Registre', `${slugsEcrans.length} écrans, ${clesRegistre.length} composants, correspondance exacte`);
}

/* --- 3. États ------------------------------------------------------------ */
const sourceEtats = await lire(join(SRC, 'donnees/etats.ts'));
const blocs = [...sourceEtats.matchAll(/^  '?([a-z-]+)'?: \[(.*?)^  \],/gms)];
const clesEtats = blocs.map((m) => m[1]);
const totalEtats = blocs.reduce((somme, m) => somme + [...m[2].matchAll(/cle: '([^']+)'/g)].length, 0);

const doublons = [];
for (const [, nom, contenu] of blocs) {
  const cles = [...contenu.matchAll(/cle: '([^']+)'/g)].map((m) => m[1]);
  if (new Set(cles).size !== cles.length) doublons.push(nom);
}
const sansEtats = slugsEcrans.filter((slug) => !clesEtats.includes(slug));
const etatsOrphelins = clesEtats.filter((cle) => !slugsEcrans.includes(cle));

if (sansEtats.length || etatsOrphelins.length || doublons.length) {
  echec(
    '3. États',
    `sans états : ${sansEtats.join(', ') || '—'} · orphelins : ${etatsOrphelins.join(', ') || '—'} · clés dupliquées : ${doublons.join(', ') || '—'}`,
  );
} else {
  succes('3. États', `${totalEtats} états sur ${blocs.length} écrans, clés uniques, aucun orphelin`);
}

/* --- 4. Navigation interne ----------------------------------------------- */
const routesSimples = new Set(['/', '/systeme', '/dossier']);
const liens = new Set();
for (const fichier of await fichiers(SRC)) {
  const contenu = await lire(fichier);
  for (const m of contenu.matchAll(/(?:vers|to)=["`]\/([a-z0-9/-]*)["`]/g)) liens.add('/' + m[1]);
  for (const m of contenu.matchAll(/(?:vers|to)=\{`\/ecran\/\$\{[^}]+\}`\}/g)) liens.add('/ecran/<dynamique>');
}
const casses = [...liens].filter((lien) => {
  if (lien === '/ecran/<dynamique>' || routesSimples.has(lien)) return false;
  const correspondance = lien.match(/^\/ecran\/([a-z-]+)(\?.*)?$/);
  return correspondance ? !slugsEcrans.includes(correspondance[1]) : true;
});
if (casses.length) echec('4. Navigation', `liens sans destination : ${casses.join(', ')}`);
else succes('4. Navigation', `${liens.size} destinations citées, toutes résolues (routes fixes + 17 slugs)`);

/* --- 5. Réseau ----------------------------------------------------------- */
const appelsReseau = [];
for (const fichier of [...(await fichiers(SRC)), ...(await fichiers(SRC, '.ts'))]) {
  const contenu = await lire(fichier);
  // On ne cherche que des APPELS : une mention de `navigator.credentials` dans un
  // texte explicatif ne doit pas être signalée comme un appel réseau.
  if (/\bfetch\s*\(|new\s+XMLHttpRequest|\baxios\.|new\s+WebSocket\s*\(|navigator\.credentials\./.test(contenu)) {
    appelsReseau.push(relative(RACINE, fichier));
  }
}
const CLIENT_HTTP = join('src', 'services', 'http');
const horsClient = appelsReseau.filter((fichier) => !fichier.startsWith(CLIENT_HTTP));
if (horsClient.length) {
  echec('5. Réseau', `appel sortant hors du client HTTP : ${horsClient.join(', ')}`);
} else if (appelsReseau.length) {
  succes(
    '5. Réseau',
    `${appelsReseau.length} fichier(s) d'appel, tous dans src/services/http ; aucun écran n'appelle le réseau`,
  );
} else {
  succes('5. Réseau', 'aucun appel réseau, aucun WebAuthn réel dans le code de l’interface');
}

/* --- 6. Couleurs hors jetons --------------------------------------------- */
const horsJetons = [];
for (const fichier of await fichiers(SRC, '.css')) {
  if (fichier.endsWith('tokens.css')) continue;
  const contenu = await lire(fichier);
  const couleurs = [...contenu.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0]);
  if (couleurs.length) horsJetons.push(`${relative(SRC, fichier)} (${couleurs.length})`);
}
if (horsJetons.length) {
  echec('6. Jetons', `couleurs écrites en dur hors tokens.css : ${horsJetons.join(', ')}`);
} else {
  succes('6. Jetons', 'toutes les couleurs passent par les jetons sémantiques');
}

/* --- Rapport -------------------------------------------------------------- */
const largeur = Math.max(...resultats.map((r) => r.controle.length));
let echecs = 0;
for (const resultat of resultats) {
  if (!resultat.ok) echecs += 1;
  console.log(`${resultat.ok ? 'OK  ' : 'ÉCHEC'} ${resultat.controle.padEnd(largeur)}  ${resultat.detail}`);
}
console.log(`\n${resultats.length - echecs}/${resultats.length} contrôles réussis.`);
process.exit(echecs === 0 ? 0 : 1);
