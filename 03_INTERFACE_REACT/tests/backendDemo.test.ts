import { describe, expect, it } from 'vitest';
import { creerBackendDemo } from '../src/services/demo/backendDemo';

const connecter = async (backend: ReturnType<typeof creerBackendDemo>) => {
  const identification = await backend.auth.identifier('a.sossou');
  expect(identification.ok).toBe(true);
  if (!identification.ok) throw new Error('identification impossible');
  const facteur = identification.donnees.facteurs[0];
  if (!facteur) throw new Error('aucun facteur');
  const session = await backend.auth.verifierFacteur(facteur.id);
  expect(session.ok).toBe(true);
  return facteur;
};

describe('backend de démonstration', () => {
  it('ne révèle pas l’existence d’un compte', async () => {
    const backend = creerBackendDemo();
    const inconnu = await backend.auth.identifier('inconnu.inexistant');
    const connu = await backend.auth.identifier('a.sossou');
    expect(inconnu.ok).toBe(connu.ok);
    if (!inconnu.ok || !connu.ok) return;
    // La forme de la réponse est identique ; seule la liste de facteurs diffère,
    // et c'est l'écran suivant qui la traite, comme le ferait le BFF.
    expect(Object.keys(inconnu.donnees)).toEqual(Object.keys(connu.donnees));
    expect(inconnu.donnees.facteurs).toHaveLength(0);
  });

  it('refuse l’auto-approbation d’un dossier de récupération', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const ouverture = await backend.auth.ouvrirRecuperation('a.sossou');
    expect(ouverture.ok).toBe(true);
    if (!ouverture.ok) return;

    const decision = await backend.backoffice.deciderRecuperation(ouverture.donnees.reference, 'approuver');
    expect(decision.ok).toBe(false);
    if (decision.ok) return;
    expect(decision.code).toBe('RECOVERY_SELF_APPROVAL');
  });

  it('exige un rôle habilité pour approuver', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const ouverture = await backend.auth.ouvrirRecuperation('m.dossou');
    if (!ouverture.ok) throw new Error('ouverture impossible');

    await backend.backoffice.changerProfil?.('k.adjo');
    const decision = await backend.backoffice.deciderRecuperation(ouverture.donnees.reference, 'approuver');
    expect(decision.ok).toBe(false);
    if (decision.ok) return;
    expect(decision.code).toBe('RECOVERY_APPROVER_NOT_AUTHORIZED');
  });

  it('approuve avec un second acteur distinct', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const ouverture = await backend.auth.ouvrirRecuperation('m.dossou');
    if (!ouverture.ok) throw new Error('ouverture impossible');

    await backend.backoffice.changerProfil?.('r.houngbedji');
    const decision = await backend.backoffice.deciderRecuperation(ouverture.donnees.reference, 'approuver');
    expect(decision.ok).toBe(true);
    if (!decision.ok) return;
    expect(decision.donnees.statut).toBe('approuve');
    expect(decision.donnees.decideur).toBe('R. Houngbédji');
  });

  it('laisse une cible non observable non traitée, jamais « retirée »', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const mesure = await backend.backoffice.mesurerRetrait('usr_0388');
    if (!mesure.ok) throw new Error('mesure impossible');
    const execution = await backend.backoffice.executerRetrait('usr_0388');
    expect(execution.ok).toBe(true);
    if (!execution.ok) return;

    const caches = execution.donnees.cibles.find((cible) => cible.id === 'cbl_cac');
    const annuaire = execution.donnees.cibles.find((cible) => cible.id === 'cbl_ann');
    expect(caches?.etat).toBe('non-observable');
    expect(annuaire?.etat).toBe('echec');
    expect(execution.donnees.statut).toBe('partielle');
  });

  it('refuse un retrait sans preuve fraîche', async () => {
    // Fenêtre de fraîcheur raccourcie : 50 ms au lieu des 5 minutes de la politique.
    const backend = creerBackendDemo({ fraicheurMs: 50 });
    await connecter(backend);
    const mesure = await backend.backoffice.mesurerRetrait('usr_0388');
    expect(mesure.ok).toBe(true);

    await new Promise((resoudre) => setTimeout(resoudre, 80));

    const execution = await backend.backoffice.executerRetrait('usr_0388');
    expect(execution.ok).toBe(false);
    if (execution.ok) return;
    expect(execution.code).toBe('PROOF_STALE');
  });

  it('ne présume jamais la révocation distante à la déconnexion', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const sortie = await backend.auth.deconnexion();
    expect(sortie.ok).toBe(true);
    if (!sortie.ok) return;
    expect(sortie.donnees.locale).toBe(true);
    expect(sortie.donnees.distante).toBe('non-confirme');

    const apres = await backend.auth.sessionCourante();
    expect(apres.ok && apres.donnees.authentifie).toBe(false);
  });

  it('refuse un code à usage unique seul comme preuve d’action sensible', async () => {
    const backend = creerBackendDemo();
    const identification = await backend.auth.identifier('a.sossou');
    if (!identification.ok) throw new Error('identification impossible');
    const telephone = identification.donnees.facteurs.find((facteur) => facteur.type === 'telephone');
    if (!telephone) throw new Error('facteur téléphone attendu');

    const session = await backend.auth.verifierFacteur(telephone.id);
    expect(session.ok).toBe(true);

    const preuve = await backend.auth.produirePreuveFraiche();
    expect(preuve.ok).toBe(false);
    if (preuve.ok) return;
    expect(preuve.code).toBe('OTP_INSUFFICIENT');
  });

  it('consomme un mandat une seule fois', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const mandat = await backend.backoffice.emettreMandat('m.dossou', 'Clé de sécurité');
    if (!mandat.ok) throw new Error('mandat impossible');

    const premier = await backend.backoffice.consommerMandat(mandat.donnees.reference);
    expect(premier.ok).toBe(true);

    const second = await backend.backoffice.consommerMandat(mandat.donnees.reference);
    expect(second.ok).toBe(false);
    if (second.ok) return;
    expect(second.code).toBe('CHALLENGE_INVALID');
  });

  it('refuse un auto-mandat', async () => {
    const backend = creerBackendDemo();
    await connecter(backend);
    const mandat = await backend.backoffice.emettreMandat('a.sossou', 'Clé de sécurité');
    expect(mandat.ok).toBe(false);
    if (mandat.ok) return;
    expect(mandat.code).toBe('RECOVERY_SELF_APPROVAL');
  });
});
