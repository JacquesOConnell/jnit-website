"""Rebuild the toolkit presentation while retaining the existing tool engines."""
from pathlib import Path
import re,zipfile
root=Path(__file__).resolve().parent.parent
backup=zipfile.ZipFile(root/'design-review/before-redesign-2026-09-26.zip')
home=(root/'index.html').read_text(encoding='utf-8')
header=re.search(r'<a class="next-skip".*?</header>',home,re.S).group(0).replace('href="tools.html">','href="tools.html" aria-current="page">')
footer=re.search(r'<footer class="next-footer".*?</footer>',home,re.S).group(0)
def page(name,title,main,script=''):
 html=f'''<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | JNIT Toolkit</title><meta name="description" content="Practical calculators, planning tools and references from JNIT Cloud Solutions."><meta name="theme-color" content="#071421"><link rel="icon" href="assets/favicon.ico"><link rel="stylesheet" href="jnit-design.css?v=20260926"><link rel="stylesheet" href="jnit-tools.css?v=20260926"><script async src="https://www.googletagmanager.com/gtag/js?id=G-VRVRZRCNWW"></script><script src="site-metrics.js"></script></head><body class="next-site toolkit">{header}<main id="main-content">{main}</main>{footer}<script src="script.js?v=20260926"></script>{script}<script src="jnit-design.js?v=20260926"></script></body></html>'''
 (root/name).write_text(html,encoding='utf-8')
old=backup.read('tools.html').decode('utf-8-sig')
cards=re.findall(r'<a class="tool-card.*?</a>',old,re.S)
assessment=re.search(r'<section class="section assessment".*?</section>',old,re.S).group(0)
assessment=assessment.replace('How ready is your environment?','A clearer view of your cloud readiness.').replace('Choose the description that best reflects your organisation today.','Rate each statement from 1 (not in place) to 5 (consistently in place). This self-assessment helps you identify your next priorities.')
toolhero='''<section class="toolkit-hero"><div class="next-wrap toolkit-hero-grid"><div><p class="next-eyebrow">THE JNIT TOOLKIT / FREE TO USE</p><h1>A sharper toolkit.<br><em>A clearer next step.</em></h1><p>Make sense of the numbers. Check the details. Turn a technical question into something you can act on.</p><a class="next-button" href="#tool-library">Find your tool <span aria-hidden="true">↓</span></a><div class="toolkit-benefits"><span>No account needed</span><span>Clear inputs & results</span><span>Built for everyday use</span></div></div><a class="toolkit-feature" href="cloud-cost-estimator.html"><div class="toolkit-feature-top"><span>FEATURED TOOL</span><span aria-hidden="true">↗</span></div><h2>Plan the cloud<br>before you build.</h2><div class="toolkit-cost-preview"><span>EXAMPLE MONTHLY ESTIMATE</span><strong>R6,419.60<small>/ month</small></strong><div class="toolkit-cost-bar" aria-hidden="true"><i></i><i></i><i></i></div><div class="toolkit-cost-legend"><span>Compute</span><span>Storage & data</span><span>Services & support</span></div></div><p>Adjust the quantities and rates. See where the money goes.</p><b>Open the cost estimator <span aria-hidden="true">→</span></b></a></div></section>'''
controls=f'''<section class="tool-library next-wrap" id="tool-library"><div class="tool-library-heading"><div><p class="next-eyebrow">A LITTLE CLARITY GOES A LONG WAY</p><h2>Find your next useful answer.</h2></div><span class="tool-library-total">{len(cards)} <span>tools & utilities</span></span></div><div class="tool-controls"><label class="tool-search"><span>What are you working on?</span><div class="tool-search-field"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="tool-search" type="search" placeholder="Search cloud, passwords, JSON, subnet…" autocomplete="off"></div></label><div class="filter-group" aria-label="Filter by category">'''+''.join(f'<button class="filter-chip {"active" if key=="all" else ""}" data-filter="{key}" type="button" aria-pressed="{str(key=="all").lower()}">{name}</button>' for key,name in [('all','All tools'),('cloud','Cloud'),('network','Network'),('security','Security'),('business','Business'),('web','Web & design')])+'''</div></div><div class="tool-list-meta"><p id="tool-count" aria-live="polite">All tools</p><button type="button" id="clear-tools">Clear filters ↺</button></div><div class="tool-grid" id="tool-grid">'''+''.join(cards)+'''</div><p class="no-tools" id="no-tools" hidden>No tools match those filters. Try a broader search.</p><div class="tool-load-more"><button id="show-all-tools" class="next-button" type="button">Show all tools <span aria-hidden="true">↓</span></button></div><p class="tool-library-note">These tools are practical starting points. DNS lookup uses a public resolver; the calculators, generators and file utilities run in your browser. Check important outputs against your project requirements.</p></section>'''
page('tools.html','Free tools & useful answers',toolhero+controls+assessment)
names=['cidr-calculator','cloud-cost-estimator','dns-email-check','password-policy-builder','migration-effort-estimator','port-reference','recovery-objective-planner','security-header-check','quick-tool']
for name in names:
 old=backup.read(name+'.html').decode('utf-8-sig')
 main=re.search(r'<main[^>]*>(.*?)</main>',old,re.S).group(1)
 hero=re.search(r'<section class="page-hero tool-page-hero">(.*?)</section>',main,re.S)
 content=hero.group(1)
 content=content.replace('<h1','<h1',1)
 replacement='<section class="tool-detail-hero"><div class="next-wrap"><a class="tool-breadcrumb" href="tools.html">← Toolkit <span>/</span> '+('Quick utility' if name=='quick-tool' else 'Calculator & reference')+'</a>'+content+'</div></section>'
 main=main.replace(hero.group(0),replacement)
 main=re.sub(r'<a class="back-link" href="tools.html">.*?</a>','',main)
 main=main.replace('<section class="section ', '<section class="section tool-workspace ')
 # Preserve technical examples (/24, RTO...) while removing decorative guide numbering.
 main=re.sub(r'<strong>0[123]</strong>','<strong class="guide-mark" aria-hidden="true">↗</strong>',main)
 title=re.search(r'<title>(.*?)</title>',old).group(1).split('|')[0].strip()
 page(name+'.html',title,main,f'<script src="{name}.js?v=20260926"></script>')
print('Rebuilt toolkit directory and all nine tool page templates; retained the existing engines.')
