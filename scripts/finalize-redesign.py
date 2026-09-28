from pathlib import Path
from html import escape
import re,zipfile
root=Path(__file__).resolve().parent.parent
backup=zipfile.ZipFile(root/'design-review/before-redesign-2026-09-26.zip')
pages=sorted(p for p in root.glob('*.html') if p.name!='store-backup.html')
for p in pages:
 s=p.read_text(encoding='utf-8-sig')
 for asset in (root/'images/services').glob('*.webp'):
  s=s.replace('images/services/'+asset.stem+'.png','images/services/'+asset.name)
 if p.name.startswith('demo-') and 'class="demo-skip"' not in s:
  s=re.sub(r'(<body[^>]*>)',r'\1<a class="demo-skip" href="#main-content">Skip to content</a>',s,count=1)
 if p.name=='demo-3d.html':
  s=s.replace('Photography is AI-generated concept imagery.','The product is a real-time 3D concept illustration.')
 if p.name=='quick-tool.html':
  s=re.sub(r'id="quick-result-title"(?: aria-live="polite")*','id="quick-result-title" aria-live="polite"',s)
 s=re.sub(r'((?:src|href)=")([^"?:]+\.(?:js|css))(?:\?[^" ]*)?(")',r'\1\2?v=20260926\3',s)
 s=s.replace('site-metrics.js?v=20260926','site-metrics.js?v=20260928')
 if p.name in ('quick-tool.html','backup-storage-calculator.html','website-launch-checklist.html','password-generator.html'):
  s=s.replace('quick-tool.js?v=20260926','quick-tool.js?v=20260928')
 if p.name in ('404.html','quick-tool.html') or p.name.startswith('demo-'):
  if '<meta name="robots"' not in s:
   s=s.replace('</head>','<meta name="robots" content="noindex,follow"></head>')
 if p.name=='tools.html':
  s=s.replace('jnit-tools.css?v=20260926','jnit-tools.css?v=20260926-tools-button')
 # Shared metadata matches the rebuilt page and preserves social sharing.
 title=re.search(r'<title>(.*?)</title>',s,re.S).group(1)
 description=re.search(r'<meta name="description" content="([^"]*)"',s)
 desc=description.group(1) if description else 'JNIT Cloud Solutions'
 canonical='https://jnit.co.za/'+('' if p.name=='index.html' else p.name)
 if p.name.startswith('demo-'):
  key=p.stem.removeprefix('demo-');social='images/demos/'+key+'-preview.webp'
 elif p.name=='pawwatch.html':social='images/products/pawwatch/pawwatch-call-scene.webp'
 elif p.name=='cloudops.html':social='images/cloudops/monitoring-live.png'
 else:social='images/brand/connected-form.webp'
 s=re.sub(r'<meta (?:property|name)="(?:og:|twitter:)[^>]*>','',s)
 s=re.sub(r'<link rel="canonical"[^>]*>','',s)
 meta=f'<link rel="canonical" href="{canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="JNIT Cloud Solutions"><meta property="og:title" content="{escape(title,quote=True)}"><meta property="og:description" content="{desc}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="https://jnit.co.za/{social}"><meta name="twitter:card" content="summary_large_image">'
 s=s.replace('</head>',meta+'</head>')
 # Windows source archives contain CRLF. Normalize once rather than doubling CR.
 s='\n'.join(line.rstrip() for line in s.splitlines())+'\n'
 p.write_text(s,encoding='utf-8',newline='\n')
sitepages=[p for p in pages if p.name not in ('404.html','quick-tool.html') and not p.name.startswith('demo-')]
sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>https://jnit.co.za/{"" if p.name=="index.html" else p.name}</loc></url>\n' for p in sitepages)+'</urlset>\n'
(root/'sitemap.xml').write_text(sitemap,encoding='utf-8',newline='\n')
print(f'Normalized {len(pages)} pages and updated their sharing metadata and sitemap.')
