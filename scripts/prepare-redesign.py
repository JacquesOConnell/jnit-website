from pathlib import Path
import re, zipfile, sys
from PIL import Image, ImageDraw
sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parent.parent
out=root/'design-review'
backup=out/'before-redesign-2026-09-26.zip'
if not backup.exists():
    with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
        for p in root.iterdir():
            if p.is_file() and p.suffix.lower() in ('.html','.css','.js','.php','.json','.xml','.txt','.ico'):
                z.write(p,p.relative_to(root))
        for folder in ('images','01-Logos','assets'):
            for p in (root/folder).rglob('*'):
                if p.is_file(): z.write(p,p.relative_to(root))
print('Preserved current website:',backup.name)
assets=['01-Logos/JNIT-Stacked-Transparent.png','images/services/cloud-systems.png','images/services/digital-products.png','images/services/digital-experiences.png','images/studio/construction.png','images/studio/wellness.png','images/studio/restaurant.png','images/products/pawwatch/pawwatch-call-scene.webp','images/cloudops/monitoring-live.png']
sheet=Image.new('RGB',(1200,840),'#102132'); d=ImageDraw.Draw(sheet)
for i,name in enumerate(assets):
    im=Image.open(root/name).convert('RGBA'); im.thumbnail((380,230))
    x=(i%3)*400+(400-im.width)//2; y=(i//3)*280+10
    sheet.paste(im,(x,y),im)
    d.text(((i%3)*400+15,(i//3)*280+245),name.split('/')[-1],fill='white')
sheet.save(out/'asset-review.jpg')
for name in ['web-development.html','tools.html','quote.html','store.html','cloudops.html']:
    s=(root/name).read_text(encoding='utf-8')
    print('\n'+name+'\n'+'\n'.join(re.findall(r'<(?:section|article|form)[^>]*>|<h[123][^>]*>.*?</h[123]>',s,re.S)))
init=root/'.superdesign/init'
pages=['index.html','services.html','work.html','applications.html','web-development.html','tools.html','quote.html','pawwatch.html','cloudops.html','store.html']
source=(root/'index.html').read_text(encoding='utf-8')
layout='\n'.join(re.findall(r'<header.*?</header>|<footer.*?</footer>',source,re.S))
(init/'layouts.md').write_text('# Shared static layouts\nSource: index.html. Navigation and footer repeat across static pages.\n```html\n'+layout+'\n```',encoding='utf-8')
(init/'components.md').write_text('# Shared primitives\nStatic HTML and custom CSS. No frontend framework.\n```html\n<a class="button primary" href="quote.html">Discuss your project ↗</a>\n<a class="button outline" href="work.html">Explore our work</a>\n<p class="eyebrow">Section label</p>\n```',encoding='utf-8')
(init/'routes.md').write_text('# Static routes\n'+'\n'.join('- /'+p+' — '+p for p in pages),encoding='utf-8')
(init/'pages.md').write_text('# Page dependencies\n'+'\n'.join('## '+p+'\n'+'\n'.join('- '+a for a in re.findall(r'(?:href|src)="([^"?]+)(?:\?[^" ]*)?"',(root/p).read_text(encoding='utf-8')) if a.endswith(('.css','.js'))) for p in pages),encoding='utf-8')
(init/'theme.md').write_text('# Existing tokens\nNavy #061525, blue #0f6fff, white #f7f9fc. Manrope headings, DM Sans body. Breakpoints 540, 850, 1050px.\n## Existing source\n```css\n'+(root/'premium.css').read_text(encoding='utf-8')+'\n```',encoding='utf-8')
(init/'extractable-components.md').write_text('# Reusable patterns\n## SiteNavigation\n- Source: index.html header\n- Category: layout\n- Props: activeItem\n- Hardcoded: approved logo and routes\n## SiteFooter\n- Source: index.html footer\n- Category: layout\n- Hardcoded: approved logo and business contacts\n## ProjectCard\n- Source: work.html\n- Category: basic\n- Props: project URL\n',encoding='utf-8')
