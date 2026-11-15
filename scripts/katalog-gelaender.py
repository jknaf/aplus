# Geländer der Katalog-Beispielparks richten, damit Verbinder und Endstücke an den Feldern sitzen.
# Felder: Handlauf über der Kante (zum Beton hin). 90°-Bögen: drehen und an Feld/Endstück anlegen.
# Endstücke an Bögen: links/rechts und Richtung so, dass das gerade Ende am Bogen liegt, Handlauf innen.
# Gerade Verbinder: auf die Handlauflinie der Felder legen. Was sich so nicht schließen lässt, steht als REST im Protokoll.
# Aufruf: python3 scripts/katalog-gelaender.py [--fix]   (prüft public/katalog/parks.json und components/katalog/park-startseite.json)
# parks_web.py (08_CAD_Blender/08_Preisliste) ruft dieses Skript am Ende mit --fix auf.
import json,sys,os,math,re,itertools,struct
WEB=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOD=os.path.join(WEB,'public','katalog','modelle'); FIX='--fix' in sys.argv
def _verts(slug):
    """Stahl-Eckpunkte eines Katalogmodells (glTF, y oben), ohne Schattenplatte"""
    g=json.load(open(f'{MOD}/{slug}.gltf')); b=open(f"{MOD}/{g['buffers'][0]['uri']}",'rb').read(); out=[]
    for n in g['nodes']:
        if 'mesh' not in n or n.get('name')=='Schatten': continue
        for pr in g['meshes'][n['mesh']]['primitives']:
            a=g['accessors'][pr['attributes']['POSITION']]; bv=g['bufferViews'][a['bufferView']]
            o=bv.get('byteOffset',0)+a.get('byteOffset',0); st=bv.get('byteStride',12)
            out+=[struct.unpack_from('<3f',b,o+i*st) for i in range(a['count'])]
    return out
V={}
def top(slug):
    if slug not in V: V[slug]=[q for q in ((x,-z,y) for x,y,z in _verts(slug)) if q[2]>1.0]
    return V[slug]
def ende(v,ax,sg):
    ext=max(sg*p[ax] for p in v); w=[p for p in v if sg*p[ax]>ext-0.003]; o=1-ax
    c=[0,0,0]; c[ax]=sg*ext; c[o]=(min(p[o] for p in w)+max(p[o] for p in w))/2; c[2]=(min(p[2] for p in w)+max(p[2] for p in w))/2
    d=[0,0]; d[ax]=sg; return (tuple(c),tuple(d))
def lang(slug):
    v=top(slug); return 1 if max(p[1] for p in v)-min(p[1] for p in v)>max(p[0] for p in v)-min(p[0] for p in v) else 0
SEITEN={'verbindung-90':[(0,-1),(1,1)],'verbindung-gerade':[(0,-1),(0,1)],'ende-rechts':[(0,1)],'ende-links':[(0,-1)],'einzl':[],'sger':[]}
E={}
def lokal(slug):
    if slug not in E:
        s=next((s for k,s in SEITEN.items() if k in slug),None)
        if s is None: s=[(lang(slug),-1),(lang(slug),1)]
        E[slug]=[ende(top(slug),a,g) for a,g in s]
    return E[slug]
def welt(m,e):
    (c,d)=e; return ((m[0]*c[0]+m[1]*c[1]+m[3], m[4]*c[0]+m[5]*c[1]+m[7], m[11]+c[2]), (m[0]*d[0]+m[1]*d[1], m[4]*d[0]+m[5]*d[1]))
def drehe(m,k):
    c,s=[(1,0),(0,1),(-1,0),(0,-1)][k%4]; a,b,e,f=m[0],m[1],m[4],m[5]
    n=list(m); n[0],n[1],n[4],n[5]=a*c+b*s,-a*s+b*c,e*c+f*s,-e*s+f*c; return n
def schiebe(m,dx,dy): n=list(m); n[3]+=dx; n[7]+=dy; return n
def gegen(q,r): return abs(q[0][2]-r[0][2])<0.02 and q[1][0]*r[1][0]+q[1][1]*r[1][1]<-0.9
def abst(q,ziele): return min([math.dist(q[0][:2],r[0][:2]) for r in ziele if gegen(q,r)]+[9.9])
def variante(t,o):
    s=t['slug']
    if o&2: s=s.replace('rechts','X').replace('links','rechts').replace('X','links')
    return {'slug':s,'m':drehe(t['m'],2) if o&1 else t['m']}
def handlauf_innen(t,beton):
    """Handlauf (quer zur Längsachse) zeigt zum nächsten Betonelement, liegt also über der Kante"""
    v=top(t['slug']); L=lang(t['slug']); q=[0,0]; q[1-L]=sum(p[1-L] for p in v)/len(v)
    m=t['m']; off=(m[0]*q[0]+m[1]*q[1], m[4]*q[0]+m[5]*q[1])
    n=min(beton,key=lambda u: math.dist((u['m'][3],u['m'][7]),(m[3],m[7])))
    return off[0]*(n['m'][3]-m[3])+off[1]*(n['m'][7]-m[7])>0
TOL=0.01; protokoll=[]
def log(p,txt): protokoll.append(f"Park {p['nr']:>2}: {txt}")
def richten(parks):
  for p in parks:
      g=[t for t in p['teile'] if t['slug'].startswith('gelaender')]
      if not any('verbindung' in t['slug'] for t in g): continue
      beton=[u for u in p['teile'] if not u['slug'].startswith('gelaender')]
      wo=lambda t:'%.2f/%.2f'%(t['m'][3],t['m'][7])
      # 1) Felder: Handlauf nach innen
      for t in g:
          if re.search(r'gelaender-\d+$',t['slug']) and not handlauf_innen(t,beton):
              t['m']=drehe(t['m'],2); log(p,f"{t['slug']} {wo(t)} um 180° gedreht (Handlauf nach innen)")
      felder=lambda: [welt(t['m'],e) for t in g if 'verbindung' not in t['slug'] for e in lokal(t['slug'])]
      # 2) gerade Verbinder: an ein Feldende anlegen
      for t in [t for t in g if 'gerade' in t['slug']]:
          Z=felder(); best=None
          for k in (0,2):
              m=drehe(t['m'],k)
              for i,q in enumerate(welt(m,e) for e in lokal(t['slug'])):
                  for r in Z:
                      if not gegen(q,r): continue
                      dx,dy=r[0][0]-q[0][0],r[0][1]-q[0][1]
                      if math.hypot(dx,dy)>0.12: continue
                      m2=schiebe(m,dx,dy); f=sorted(abst(welt(m2,e),Z) for e in lokal(t['slug']))
                      c=(f[1]>TOL, f[1], math.hypot(dx,dy))
                      if best is None or c<best[0]: best=(c,m2,f)
          vor=sorted(abst(welt(t['m'],e),Z) for e in lokal(t['slug']))
          if best and best[2]<vor and math.dist(best[1][3:8:4],t['m'][3:8:4])>0.001: t['m']=best[1]; log(p,f"{t['slug']} {wo(t)} versetzt, Enden jetzt {best[2][0]*100:.1f}/{best[2][1]*100:.1f} cm")
      # 3) 90°-Bögen: drehen, anlegen; Endstücke in der Nähe dürfen gedreht/getauscht und bis 12 cm geschoben werden
      for t in [t for t in g if 'verbindung-90' in t['slug']]:
          cx,cy=t['m'][3],t['m'][7]
          nah=[i for i,u in enumerate(g) if 'ende-' in u['slug'] and math.dist((u['m'][3],u['m'][7]),(cx,cy))<0.9]
          andere=[welt(u['m'],e) for i,u in enumerate(g) if i not in nah and u is not t and 'verbindung-90' not in u['slug'] for e in lokal(u['slug'])]
          vor=[abst(welt(t['m'],e),andere+[welt(g[i]['m'],e2) for i in nah for e2 in lokal(g[i]['slug'])]) for e in lokal(t['slug'])]
          best=None
          for wahl in itertools.product(range(4),repeat=len(nah)):
              vv=[variante(g[i],o) for i,o in zip(nah,wahl)]
              for k in range(4):
                  m=drehe(t['m'],k); qs=[welt(m,e) for e in lokal(t['slug'])]
                  for a in (0,1):
                      for r in andere:
                          if not gegen(qs[a],r): continue
                          dx,dy=r[0][0]-qs[a][0][0],r[0][1]-qs[a][0][1]
                          if math.hypot(dx,dy)>0.12: continue
                          m2=schiebe(m,dx,dy); q=welt(m2,lokal(t['slug'])[1-a])
                          # Gegenende: anderes Teil oder ein (verschobenes) Endstück
                          f=abst(q,andere); neu=[dict(x) for x in vv]; sch=0
                          if f>TOL:
                              for x in neu:
                                  for e in lokal(x['slug']):
                                      w=welt(x['m'],e)
                                      if gegen(q,w):
                                          d=(q[0][0]-w[0][0],q[0][1]-w[0][1])
                                          if math.hypot(*d)<=0.12 and math.hypot(*d)<f: f=0; x['m']=schiebe(x['m'],*d); sch=math.hypot(*d)
                          innen=all(handlauf_innen(x,beton) for x in neu)
                          c=(f>TOL, not innen, round(f,3), round(sch+math.hypot(dx,dy),2), sum(o>0 for o in wahl)+(k>0))   # nächste Lage zum Archicad-Stand zuerst
                          if best is None or c<best[0]: best=(c,m2,neu,wahl,k,f)
          if max(vor)<=TOL and best and not best[0][1]: continue
          if best is None or best[0][0]:
              log(p,f"OFFEN {t['slug']} {wo(t)}: kein sauberer Anschluss (vorher {vor[0]*100:.0f}/{vor[1]*100:.0f} cm)"); continue
          t['m']=best[1]; txt=[f"{t['slug']} {wo(t)}: "+(f"um {best[4]*90}° gedreht" if best[4] else "angelegt")+f" (vorher {vor[0]*100:.0f}/{vor[1]*100:.0f} cm daneben)"]
          for i,x,o in zip(nah,best[2],best[3]):
              if x['slug']!=g[i]['slug'] or x['m']!=g[i]['m']:
                  txt.append(f"{g[i]['slug']}→{x['slug']}"+(" 180°" if o&1 else "")); g[i]['slug']=x['slug']; g[i]['m']=x['m']
          log(p,'; '.join(txt))
      for t in g: t['m']=[round(x,5)+0.0 for x in t['m']]
      # Schlusskontrolle
      alle=[(t,welt(t['m'],e)) for t in g for e in lokal(t['slug'])]
      for t,q in alle:
          if 'verbindung' in t['slug'] and abst(q,[r for u,r in alle if u is not t])>TOL: log(p,f"REST {t['slug']} {wo(t)}: Ende {abst(q,[r for u,r in alle if u is not t])*100:.0f} cm frei")
      for t in g:
          if 'verbindung' not in t['slug'] and 'sger' not in t['slug'] and not handlauf_innen(t,beton): log(p,f"REST {t['slug']} {wo(t)}: Handlauf außen")

P=os.path.join(WEB,'public','katalog','parks.json'); H=os.path.join(WEB,'components','katalog','park-startseite.json')
parks=json.load(open(P)); start=json.load(open(H)); start.setdefault('nr','Startseite')
richten(parks['parks']); richten([start]); start.pop('nr')
print('\n'.join(protokoll) or 'alles passt')
if FIX:
    open(P,'w').write(json.dumps(parks,ensure_ascii=False,separators=(',',':')))
    open(H,'w').write(json.dumps(start,ensure_ascii=False,separators=(',',':')))
