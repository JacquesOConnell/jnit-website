"""Package the active website and its exact local dependencies, excluding workspace clutter."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re,zipfile,hashlib,json,argparse
root=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser()
parser.add_argument('--output',default='jnit-premium-redesign-2026-09-26.zip',help='ZIP filename placed at the site root')
args=parser.parse_args()
if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]*\.zip',args.output):
 raise SystemExit('Provide a simple .zip filename without directories')
class Refs(HTMLParser):
 def __init__(self):super().__init__();self.refs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for key in ['src','href','poster']:
   if key in a:self.refs.append(a[key])
  if 'srcset' in a:self.refs.extend(part.strip().split()[0] for part in a['srcset'].split(','))
queue=[p.name for p in root.glob('*.html') if p.name!='store-backup.html']+['robots.txt','sitemap.xml','vendor/three/LICENSE.txt']
files=set();issues=[]
exact={p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file()}
while queue:
 name=queue.pop()
 if name in files:continue
 if name not in exact:issues.append('Missing or incorrect case: '+name);continue
 files.add(name);p=root/name;refs=[]
 if p.suffix in ['.html','.css','.js']:
  text=p.read_text(encoding='utf-8-sig')
  if p.suffix=='.html':scan=Refs();scan.feed(text);refs=scan.refs
  if p.suffix=='.css':refs=re.findall(r'url\(\s*[\"\']?([^\)\"\']+)',text)
  if p.suffix=='.js':refs=re.findall(r'(?:from|import)\s*[\"\'](\.[^\"\']+)',text)
  for ref in refs:
   u=urlsplit(ref)
   if u.scheme or u.netloc or not u.path:continue
   path=(Path(name).parent/unquote(u.path)).as_posix()
   if path.startswith('./'):path=path[2:]
   queue.append(path)
if issues:raise SystemExit('\n'.join(issues))
archive=root/args.output
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for name in sorted(files):z.write(root/name,name)
with zipfile.ZipFile(archive) as z:
 assert z.testzip() is None
 for name in files:assert hashlib.sha256(z.read(name)).digest()==hashlib.sha256((root/name).read_bytes()).digest()
manifest={'archive':archive.name,'files':len(files),'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'contents':sorted(files)}
(root/'design-review/upload-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(root/'design-review/UPLOAD-FILES.txt').write_text('\n'.join(sorted(files))+'\n',encoding='utf-8')
print(f'Checked {len(files)} files, exact path case and archive integrity. ZIP: {archive.stat().st_size/1048576:.2f} MB')
