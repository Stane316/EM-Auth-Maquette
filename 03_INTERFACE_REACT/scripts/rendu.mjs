#!/usr/bin/env node
/**
 * Test de rendu — exécuté hors navigateur, avec jsdom.
 *
 * Ce que ce test PROUVE : l'application se monte, chaque route produit un
 * document non vide, sans erreur JavaScript, et le titre attendu est présent.
 * Ce qu'il NE PROUVE PAS : le rendu visuel, le comportement clavier, la
 * compatibilité lecteur d'écran, le zoom, les media queries. Ces points restent
 * non testés et sont déclarés comme tels.
 */
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const DIST = new URL('../dist-rendu/', import.meta.url).pathname;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};

const ROUTES = [
  { chemin: '/', attendu: 'Une identité qui se laisse' },
  { chemin: '/ecran/invitation', attendu: 'Invitation et accueil' },
  { chemin: '/ecran/identification', attendu: 'Un seul message, quelle que soit la cause' },
  { chemin: '/ecran/moyen-autorise', attendu: 'Comment souhaitez-vous prouver' },
  { chemin: '/ecran/preuve-fraiche', attendu: 'Confirmez avec votre facteur' },
  { chemin: '/ecran/transition', attendu: 'Nous vous connectons' },
  { chemin: '/ecran/fin-de-session', attendu: 'Votre session sur ce navigateur est terminée' },
  { chemin: '/ecran/perte-ou-aide', attendu: 'Deux voies, indépendantes' },
  { chemin: '/ecran/suivi-recuperation', attendu: 'Dossier dem_5512' },
  { chemin: '/ecran/demande-sensible', attendu: 'Élévation temporaire de privilège' },
  { chemin: '/ecran/retrait-par-cible', attendu: 'Choisir la cible du retrait' },
  { chemin: '/ecran/resultat-non-confirme', attendu: 'Nous ne savons pas si le retrait' },
  { chemin: '/ecran/expiration', attendu: 'Votre session va se fermer' },
  { chemin: '/ecran/indisponibilite', attendu: 'Le service d’authentification ne répond pas' },
  { chemin: '/ecran/mandat-enrolement', attendu: 'Émettre un mandat d’enrôlement' },
  { chemin: '/ecran/decision-recuperation', attendu: 'Dossiers en attente de décision' },
  { chemin: '/ecran/orchestration-retrait', attendu: 'Orchestration — retrait usr_0388' },
  { chemin: '/ecran/enrolement-facteur', attendu: 'Enrôler une clé de sécurité' },
  { chemin: '/systeme', attendu: 'Un système de design' },
  { chemin: '/dossier', attendu: 'Ce que cette maquette démontre' },
  // États adressables : l'URL porte l'état, donc on peut vérifier qu'un état
  // précis se rend réellement — et pas seulement l'état par défaut.
  { chemin: '/ecran/identification?etat=erreur-generique', attendu: 'Identifiant ou mot de passe incorrect' },
  { chemin: '/ecran/identification?etat=verrouillage', attendu: 'Trop de tentatives' },
  { chemin: '/ecran/preuve-fraiche?etat=succes', attendu: 'Preuve obtenue' },
  { chemin: '/ecran/retrait-par-cible?etat=impact', attendu: 'Impact du retrait' },
  { chemin: '/ecran/resultat-non-confirme?etat=echec-verifie', attendu: 'Échec établi' },
  { chemin: '/ecran/decision-recuperation?etat=auto-approbation', attendu: 'Vous êtes le demandeur' },
  { chemin: '/ecran/fin-de-session?etat=echec-local', attendu: 'La fermeture locale a échoué' },
  { chemin: '/ecran/invitation?etat=expiree', attendu: 'Cette invitation a expiré' },
  { chemin: '/adresse-inexistante', attendu: 'Cet écran n’existe pas' },
];

const HOTE = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>test de rendu</title>
<link rel="stylesheet" href="/em-auth-maquette.css"></head>
<body><div id="racine"></div><script src="/app.js"></script></body></html>`;

const serveur = createServer(async (requete, reponse) => {
  const cheminBrut = decodeURIComponent((requete.url ?? '/').split('?')[0]);
  const chemin = normalize(cheminBrut).replace(/^(\.\.[/\\])+/, '');
  try {
    const fichier = await readFile(join(DIST, chemin));
    reponse.writeHead(200, { 'Content-Type': TYPES[extname(chemin)] ?? 'application/octet-stream' });
    reponse.end(fichier);
  } catch {
    // Routage côté client : toute adresse reçoit la même page hôte. jsdom
    // n'exécutant pas les modules ES, la variante IIFE est utilisée ici.
    reponse.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    reponse.end(HOTE);
  }
});

await new Promise((resoudre) => serveur.listen(0, '127.0.0.1', resoudre));
const port = serveur.address().port;

let echecs = 0;
for (const route of ROUTES) {
  const erreurs = [];
  const consolee = new VirtualConsole();
  consolee.on('jsdomError', (erreur) => erreurs.push(erreur.message));
  consolee.on('error', (message) => erreurs.push(String(message)));

  let dom;
  try {
    dom = await JSDOM.fromURL(`http://127.0.0.1:${port}${route.chemin}`, {
      runScripts: 'dangerously',
      resources: 'usable',
      pretendToBeVisual: true,
      virtualConsole: consolee,
      beforeParse(fenetre) {
        // jsdom n'implémente ni matchMedia ni scrollTo : on fournit des doubles
        // explicites plutôt que de laisser React échouer silencieusement.
        fenetre.matchMedia = (requete) => ({
          matches: false,
          media: requete,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
          onchange: null,
          dispatchEvent: () => false,
        });
        fenetre.scrollTo = () => {};
        fenetre.HTMLElement.prototype.scrollIntoView = () => {};
      },
    });

    await new Promise((resoudre) => setTimeout(resoudre, 450));
    const texte = dom.window.document.body.textContent ?? '';
    const monte = dom.window.document.querySelector('#contenu, #racine')?.children.length ?? 0;

    if (!monte) {
      echecs += 1;
      console.log(`ÉCHEC ${route.chemin.padEnd(30)} application non montée`);
    } else if (!texte.includes(route.attendu)) {
      echecs += 1;
      console.log(`ÉCHEC ${route.chemin.padEnd(30)} titre attendu absent : « ${route.attendu} »`);
    } else if (erreurs.length) {
      echecs += 1;
      console.log(`ÉCHEC ${route.chemin.padEnd(30)} erreur JS : ${erreurs[0].slice(0, 120)}`);
    } else {
      console.log(`OK    ${route.chemin.padEnd(30)} rendu, ${texte.length} caractères`);
    }
  } catch (erreur) {
    echecs += 1;
    console.log(`ÉCHEC ${route.chemin.padEnd(30)} ${String(erreur).slice(0, 140)}`);
  } finally {
    dom?.window.close();
  }
}

serveur.close();
console.log(`\n${ROUTES.length - echecs}/${ROUTES.length} routes rendues sans erreur.`);
console.log('Non testé ici : rendu visuel, clavier, lecteur d’écran, zoom, largeur 320 px, WebAuthn réel.');
process.exit(echecs === 0 ? 0 : 1);
