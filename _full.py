import sys, subprocess, os
from PIL import Image
pag, saida, altura = sys.argv[1], sys.argv[2], int(sys.argv[3])
html = '''<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:#000}iframe{border:0;width:390px;height:%dpx;display:block}</style>
<iframe id="f" src="%s"></iframe>
<script>var f=document.getElementById('f');f.onload=function(){var d=f.contentDocument;
setTimeout(function(){d.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.add('is-revealed');e.style.transition='none';});
d.querySelectorAll('.split-word,[data-split] *').forEach(function(e){e.style.transform='none';e.style.opacity=1;});
var p=d.querySelector('.preloader');if(p)p.remove();
d.querySelectorAll('.wa-float,.to-top').forEach(function(e){e.style.display='none';});},800);};</script>''' % (altura, pag)
open('_full.html','w',encoding='utf-8').write(html)
subprocess.run([r'C:\Program Files\Google\Chrome\Application\chrome.exe','--headless=new','--disable-gpu','--hide-scrollbars',
  '--force-prefers-reduced-motion','--window-size=400,%d'%altura,'--virtual-time-budget=15000',
  '--screenshot='+saida+'.png','http://127.0.0.1:8899/_full.html'],capture_output=True)
os.remove('_full.html')
im=Image.open(saida+'.png').crop((0,0,390,altura))
# corta o preto do fim (pagina menor que a janela)
px=im.convert('L').load(); fim=altura
for y in range(altura-1,0,-40):
    if any(px[x,y]>12 for x in range(0,390,13)): fim=min(altura,y+40); break
im=im.crop((0,0,390,fim))
col=2400; n=(fim+col-1)//col
folha=Image.new('RGB',(n*400,min(fim,col)),(40,40,40))
for i in range(n):
    folha.paste(im.crop((0,i*col,390,min(fim,(i+1)*col))),(i*400,0))
folha=folha.resize((folha.width*7//10, folha.height*7//10))
folha.save(saida+'_folha.jpg',quality=85)
print(saida, 'altura', fim, 'colunas', n)
