from pathlib import Path
import zipfile,re
root=Path(__file__).resolve().parent.parent
backup=zipfile.ZipFile(root/'design-review/before-redesign-2026-09-26.zip')
home=(root/'index.html').read_text(encoding='utf-8')
header=re.search(r'<a class="next-skip".*?</header>',home,re.S).group(0)
footer=re.search(r'<footer class="next-footer".*?</footer>',home,re.S).group(0)
for file,theme in [('cloudops.html','cloudops-case'),('store.html','hardware'),('pawwatch.html','pawwatch-page'),('404.html','not-found')]:
 src=backup.read(file).decode('utf-8-sig');main=re.search(r'<main[^>]*>(.*?)</main>',src,re.S).group(1)
 if file=='cloudops.html':
  shot=re.search(r'<figure class="cloudops-feature-image">.*?</figure>',main,re.S).group(0)
  hero=re.search(r'<section class="page-hero cloudops-hero">(.*?)</section>',main,re.S)
  copy=hero.group(1).replace('Operate AWS with visibility.','A clearer view of the cloud.').replace('Portfolio engineering environment. Runtime was destroyed after evidence capture to avoid ongoing costs; the screenshots document the validated deployment.','Engineering demonstration, validated on AWS. These are captured results; the runtime is not continuously running.')
  main=main.replace(hero.group(0),'<section class="project-hero"><div class="project-hero-copy">'+copy+'</div>'+shot+'</section>')
  main=re.sub(r'<section class="section cloudops-showcase".*?</section>','',main,flags=re.S)
  main=main.replace('<section class="section cloudops-summary">','<section class="section cloudops-summary" id="platform">')
  main=main.replace('Need practical AWS engineering?','Building something that needs a cloud foundation?').replace('JNIT combines infrastructure design, automation, application development and operational visibility into maintainable cloud solutions.','JNIT develops applications and creates the cloud foundation for products we build or deploy for you. AWS is our primary platform; Azure and Google Cloud are available when required.')
  main=re.sub(r'(<img src="images/cloudops/[^>]+)>',r'\1 loading="lazy">',main)
 if file=='store.html':
  icons={'laptop':'<rect x="42" y="25" width="176" height="112" rx="8"/><path d="M42 140 20 163Q20 174 34 174h192q14 0 14-11l-22-23Z"/><path d="M54 39h152v84H54Z"/>','desktop':'<rect x="77" y="14" width="106" height="173" rx="10"/><path d="M88 30h83v42H88ZM88 86h83"/><circle cx="160" cy="102" r="4"/><path d="M92 135h32M92 145h32M92 155h32"/>','monitor':'<rect x="30" y="17" width="200" height="127" rx="7"/><path d="M42 29h176v100H42ZM130 144v31M88 183h84"/>'}
  for kind,path in icons.items():
   pattern=r'(<div class="store-category-visual '+kind+r'-category">)(.*?)(</div>)'
   main=re.sub(pattern,lambda m:m.group(1)+f'<svg class="device-illustration" aria-hidden="true" viewBox="0 0 260 200">{path}</svg>'+m.group(2)+m.group(3),main,flags=re.S)
 if file=='404.html':
  main='<section class="next-page-hero"><div class="next-wrap"><p class="next-eyebrow">PAGE NOT FOUND / 404</p><h1>A small detour.<br><em>Let’s get you back.</em></h1><p>The page may have moved or the link may be incomplete. Explore our work or head back to the home page.</p><div class="next-actions"><a class="next-button" href="index.html">Back to JNIT ↗</a><a class="next-text-link" href="work.html">Explore our work ↗</a></div></div></section>'
 title=re.search(r'<title>(.*?)</title>',src).group(1)
 desc=re.search(r'<meta name="description" content="([^"]*)"',src)
 extra='<link rel="stylesheet" href="pawwatch.css?v=20260926">' if file=='pawwatch.html' else ''
 scripts='<script src="store.js"></script>' if file=='store.html' else ''
 (root/file).write_text(f'''<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><meta name="description" content="{desc.group(1) if desc else 'JNIT Cloud Solutions'}"><link rel="icon" href="assets/favicon.ico"><link rel="stylesheet" href="jnit-design.css?v=20260926">{extra}<link rel="stylesheet" href="jnit-projects.css?v=20260926"><script async src="https://www.googletagmanager.com/gtag/js?id=G-VRVRZRCNWW"></script><script src="site-metrics.js"></script></head><body class="next-site project-page {theme}">{header}<main id="main-content">{main}</main>{footer}<script src="jnit-design.js?v=20260926"></script>{scripts}</body></html>''',encoding='utf-8')
print('Redesigned CloudOps, PawWatch, hardware and 404; preserved project evidence, scenes and store details.')
