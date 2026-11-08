#!/usr/bin/env python3
"""Modèle simplifié des portes ; ne lance ni agent ni service externe."""
def decide(*, source=True, dri=True, storage=True, visual=True, choice=True, figma=True, blockers=False, human_accept=True):
    if not source or not storage: return 'PH00:EN_ATTENTE_HUMAIN'
    if not dri: return 'PH02:EN_ATTENTE_HUMAIN'
    if not visual: return 'PH03:EN_ATTENTE_OUTIL'
    if not choice: return 'PH03:EN_ATTENTE_HUMAIN'
    if not figma: return 'PH04:EN_ATTENTE_OUTIL'
    if blockers: return 'PH07:BLOQUÉ'
    if not human_accept: return 'PH09:EN_ATTENTE_HUMAIN'
    return 'PH09:TERMINÉ'
cases=[('source ambiguë',dict(source=False),'PH00:EN_ATTENTE_HUMAIN'),('suivi non autorisé',dict(storage=False),'PH00:EN_ATTENTE_HUMAIN'),('DRI manquante',dict(dri=False),'PH02:EN_ATTENTE_HUMAIN'),('vues indisponibles',dict(visual=False),'PH03:EN_ATTENTE_OUTIL'),('direction non validée',dict(choice=False),'PH03:EN_ATTENTE_HUMAIN'),('Figma inaccessible',dict(figma=False),'PH04:EN_ATTENTE_OUTIL'),('anomalie bloquante',dict(blockers=True),'PH07:BLOQUÉ'),('réception absente',dict(human_accept=False),'PH09:EN_ATTENTE_HUMAIN'),('hypothèse toutes portes satisfaites',{},'PH09:TERMINÉ')]
for name,inputs,expected in cases:
    got=decide(**inputs)
    print(('OK ' if got==expected else 'FAIL ')+name+' → '+got)
    assert got==expected
print('9 scénarios abstraits réussis ; aucune exécution d’agent ni d’outil réel.')
