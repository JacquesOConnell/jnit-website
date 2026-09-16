from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
class Scan(HTMLParser):
 def __init__(self): super().__init__();self.links=[];self.ids=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  for k in ('href','src'):
   if k in a:self.links.append(a[k])
files={p.name:p for p in Path('.').glob('*.html') if not p.name.startswith('store-backup')}
parsed={}
for name,p in files.items():
 s=Scan();s.feed(p.read_text(encoding='utf-8'));parsed[name]=s
issues=[]
for name,s in parsed.items():
 for link in s.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  target=unquote(u.path) or name
  if not Path(target).exists():issues.append((name,'missing',link))
  elif u.fragment and target in parsed and u.fragment not in parsed[target].ids:issues.append((name,'anchor',link))
print('Link/asset issues:',issues)
print('Duplicate IDs:',[(n,i) for n,s in parsed.items() for i in set(s.ids) if s.ids.count(i)>1])
