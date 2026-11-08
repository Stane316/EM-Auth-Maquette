#!/usr/bin/env python3
"""Contrôles statiques reproductibles du dossier ; aucune action sur le projet."""
from pathlib import Path
import re, hashlib, sys
root=Path(__file__).resolve().parent.parent
errors=[]; checks=[]
def check(label, condition, detail=''):
    checks.append((label, bool(condition), detail))
    if not condition: errors.append(label+(': '+detail if detail else ''))
ids=[f'E{i:02}' for i in range(1,14)]+[f'A{i:02}' for i in range(1,10)]
phase_names=['PH00_INITIALISATION','PH01_COMPREHENSION','PH02_DRI','PH03_FONDATION','PH04_DESIGN_SYSTEM','PH05_ECRANS','PH06_PARCOURS','PH07_AUDITS','PH08_HANDOFF','PH09_VALIDATION']
required=['README.md','00_MASTER_ORCHESTRATOR/MASTER_ORCHESTRATION_PROMPT.md','00_MASTER_ORCHESTRATOR/EXECUTION_PROTOCOL.md','00_MASTER_ORCHESTRATOR/WORKFLOW_INDEX.md','00_MASTER_ORCHESTRATOR/PROMPT_DEPENDENCY_MAP.md','00_MASTER_ORCHESTRATOR/QUICK_START_GUIDE.md']
required += [f'03_EXECUTION_WORKFLOW/{x}.md' for x in phase_names]
required += [f'04_SCREEN_SPECIFIC_PROMPTS/{x}.md' for x in ids]
required += [f'09_EXECUTION_RECORDS/{x}.md' for x in ['EXECUTION_STATE','EXECUTION_LOG','DECISIONS_REGISTER','ISSUES_AND_BLOCKERS','DELIVERABLES_INDEX']]
missing=[x for x in required if not (root/x).is_file()]
check('fichiers obligatoires',not missing,', '.join(missing))
broken=[]
for f in root.rglob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)', f.read_text(encoding='utf8')):
        if target.startswith(('https:','http:','mailto:','#')): continue
        path=target.split('#')[0]
        if path and not (f.parent/path).exists(): broken.append(f'{f.relative_to(root)} → {target}')
check('liens Markdown relatifs',not broken,' ; '.join(broken))
idx=(root/'00_MASTER_ORCHESTRATOR/WORKFLOW_INDEX.md').read_text()
for x in phase_names: check('phase indexée '+x, f'{x}.md' in idx)
screen=(root/'02_DESIGN_FOUNDATION/03_EM_AUTH_SCREEN_AND_USER_FLOW_INVENTORY.md').read_text()
for x in ids: check('écran inventorié et présent '+x, f'| {x} |' in screen and (root/f'04_SCREEN_SPECIFIC_PROMPTS/{x}.md').exists() and re.search(r'\b'+x+r'\b',idx)!=None)
actual={x.stem for x in (root/'04_SCREEN_SPECIFIC_PROMPTS').glob('*.md')}
check('aucun écran omis ou surnuméraire',actual==set(ids),str(sorted(actual^set(ids))))
for x in phase_names:
    t=(root/f'03_EXECUTION_WORKFLOW/{x}.md').read_text()
    check('contrat phase '+x,all(s in t for s in ['## Entrées','## Prompt opérationnel','## Livrables attendus','## Porte et contrôle']))
pdf=root/'01_PROJECT_CONTEXT/CAHIER_DES_CHARGES_OFFICIEL_EM_Auth_DEPLOY.pdf'
check('empreinte PDF V3',pdf.exists() and hashlib.sha256(pdf.read_bytes()).hexdigest()=='25c1e0513c80461e5855ae50c7dd08733ce45bcb684604bd39b9fc8eb931f1cf')
qa=(root/'06_QUALITY_ASSURANCE/05_EM_AUTH_QUALITY_ASSURANCE_PROMPTS.md').read_text()
for word in ['UX','UI','Sécurité','Accessibilité','Responsive','Performance','SEO','Fonctionnel']: check('domaine audit '+word,word.lower() in qa.lower())
for label,ok,detail in checks: print(('OK   ' if ok else 'FAIL ')+label+((' — '+detail) if detail else ''))
print(f'\n{len(checks)} vérifications, {len(errors)} erreur(s). Contrôles statiques uniquement.')
sys.exit(bool(errors))
