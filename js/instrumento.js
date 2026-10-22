/* Cordas jogáveis: Canvas (onda estacionária amortecida) + Web Audio (Karplus-Strong). */
(()=>{
const P=window.PORTFOLIO,sl=document.getElementById('braco'),cv=sl.querySelector('canvas'),g=cv.getContext('2d'),
pegs=sl.querySelector('.pegs'),nota=sl.querySelector('.nota'),nn=sl.querySelector('.nome-nota'),med=sl.querySelector('.medidor'),
fala=document.getElementById('fala'),reduz=matchMedia('(prefers-reduced-motion:reduce)').matches,
fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2}),ESP=[3.4,2.8,2.2,1.7,1.2,.9],NUT=72;
const S=P.afinacao.map((c,i)=>({...c,i,w:ESP[i]||1,x:0,on:0,t:0,p:.3,amp:0,tau:2,last:0}));
let W=0,H=0,K={},raf=0,cur=null,ac,master,somOn=false;const bufs=[];

/* ---------- desenho ---------- */
function cores(){const s=getComputedStyle(document.documentElement),v=n=>s.getPropertyValue(n).trim();K={latao:v('--latao'),prata:v('--prata'),osso:v('--osso')}}
function medir(){
  const r=sl.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;
  cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);
  const m=W*.11;S.forEach(s=>s.x=m+s.i*(W-2*m)/(S.length-1));
  [...pegs.children].forEach((b,i)=>b.style.left=S[i].x+'px');
  cores();pintar(performance.now());
}
function pintar(now){
  g.clearRect(0,0,W,H);const L=(H-NUT)*1.7,mid=(a,b)=>(S[a].x+S[b].x)/2;
  g.lineWidth=1.5;g.strokeStyle=K.prata;g.globalAlpha=.3;                       // trastes
  for(let n=1;n<=14;n++){const y=NUT+L*(1-2**(-n/12));g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.globalAlpha=.45;g.fillStyle=K.osso;                                          // marcações do braço
  [3,5,7,9,12].forEach(n=>{const y=NUT+L*(1-2**(-(n-.5)/12));(n==12?[mid(1,2),mid(3,4)]:[mid(2,3)]).forEach(x=>{g.beginPath();g.arc(x,y,5,0,7);g.fill()})});
  g.globalAlpha=1;g.fillRect(0,NUT-4,W,6);                                       // pestana
  g.lineCap='round';
  S.forEach(s=>{
    const el=(now-s.t)/1000;if(s.on&&el>4.5)s.on=0;
    const A=s.on?s.amp*Math.exp(-el/s.tau):0,f=2.2+(s.hz-82)/248*3.2,sp=Math.sin(Math.PI*s.p);
    g.beginPath();
    for(let y=NUT;y<=H;y+=6){
      const u=(y-NUT)/(H-NUT);let d=0;
      if(A>.05)for(let k=1;k<4;k++)d+=Math.sin(k*Math.PI*u)*Math.sin(k*Math.PI*s.p)/(k*k)*Math.cos(2*Math.PI*f*k*el);
      g.lineTo(s.x+d/sp*A,y);
    }
    g.lineWidth=s.w;g.strokeStyle=s.i<4?K.latao:K.prata;g.stroke();
    if(s.i<4){g.setLineDash([1,2.4]);g.lineWidth=s.w*.7;g.strokeStyle='rgba(255,255,255,.4)';g.stroke();g.setLineDash([])}  // enrolamento
  });
  if(cur){                                                                        // afinador: a corda toca "alta" e assenta
    const c=cur.c0*Math.exp(-(now-cur.t)/450),ok=Math.abs(c)<4;
    med.style.setProperty('--c',c.toFixed(1));med.toggleAttribute('data-ok',ok);
    if(ok!==cur.ok){cur.ok=ok;nn.textContent=`${cur.s.nome}, ${fmt(cur.s.hz)} Hz, ${ok?'afinada':'afinando'}`}
  }
}
function loop(now){pintar(now);raf=(S.some(s=>s.on)||(cur&&Math.abs(cur.c0*Math.exp(-(now-cur.t)/450))>=.5))?requestAnimationFrame(loop):0}

/* ---------- som: Karplus-Strong ---------- */
function buffer(i){
  if(bufs[i])return bufs[i];
  const sr=ac.sampleRate,N=Math.round(sr/S[i].hz-.5),len=sr*4,b=ac.createBuffer(1,len,sr),d=b.getChannelData(0);
  for(let k=0;k<=N;k++)d[k]=Math.random()*2-1;
  for(let k=N+1;k<len;k++)d[k]=.5*(d[k-N]+d[k-N-1])*.9985;
  return bufs[i]=b;
}
function audio(i,v,p){
  if(!somOn)return;
  const t=ac.currentTime,s=ac.createBufferSource(),f=ac.createBiquadFilter(),gn=ac.createGain();
  s.buffer=buffer(i);f.type='lowpass';f.frequency.value=900+v*3500+p*1500;gn.gain.value=.12+v*.3;
  s.playbackRate.setValueAtTime(1+v*.017,t);s.playbackRate.exponentialRampToValueAtTime(1,t+.5);   // pitch sobe com a força e assenta
  s.connect(f).connect(gn).connect(master);s.start(t);s.stop(t+4);gn.gain.setTargetAtTime(0,t+3.2,.3);
}

/* ---------- tocar ---------- */
function tocar(i,p=.3,v=.7,mudo){
  const s=S[i];s.p=Math.min(.88,Math.max(.12,p));s.amp=v*13;s.tau=2.6-i*.25;s.t=performance.now();s.on=1;
  if(!mudo){cur={s,t:s.t,c0:v*30,ok:null};nota.textContent=s.n;audio(i,v,s.p)}
  if(!raf)raf=requestAnimationFrame(loop);
}
const anuncia=s=>{const t=`Corda ${s.nome}, ${fmt(s.hz)} hertz`;fala.textContent='';setTimeout(()=>fala.textContent=t,50)};

S.forEach(s=>{
  const b=document.createElement('button');b.type='button';b.textContent=s.n;
  b.setAttribute('aria-label',`Tocar corda ${s.nome}, ${fmt(s.hz)} hertz`);b.setAttribute('aria-keyshortcuts',s.i+1);
  b.onclick=()=>{tocar(s.i,.4,.8);anuncia(s)};pegs.append(b);
});
addEventListener('keydown',ev=>{
  if(ev.ctrlKey||ev.metaKey||ev.altKey||/INPUT|TEXTAREA/.test(ev.target.tagName)||document.querySelector('dialog[open]'))return;
  const i=+ev.key-1;if(i>=0&&i<S.length){tocar(i,.4,.8);anuncia(S[i])}
});

/* passar o cursor/dedo por cima da corda dedilha; a altura do ponteiro define onde se belisca */
let prev=null;
sl.addEventListener('pointermove',ev=>{
  const r=cv.getBoundingClientRect(),x=ev.clientX-r.left,y=ev.clientY-r.top;
  if(prev&&y>NUT+8){
    const v=Math.min(1,Math.abs(x-prev.x)/Math.max(ev.timeStamp-prev.t,8)/1.6+.25);
    S.forEach(s=>{if((prev.x-s.x)*(x-s.x)<0&&ev.timeStamp-s.last>140){s.last=ev.timeStamp;tocar(s.i,(y-NUT)/(H-NUT),v)}});
  }
  prev={x,t:ev.timeStamp};
});
sl.addEventListener('pointerleave',()=>prev=null);
sl.addEventListener('pointerdown',ev=>{
  const r=cv.getBoundingClientRect(),x=ev.clientX-r.left,y=ev.clientY-r.top;
  if(y<=NUT+8||ev.target.closest('button'))return;
  const s=S.reduce((a,b)=>Math.abs(b.x-x)<Math.abs(a.x-x)?b:a);
  if(Math.abs(s.x-x)<22)tocar(s.i,(y-NUT)/(H-NUT),.8);
});

document.getElementById('dedilhar').onclick=()=>{S.forEach((s,k)=>setTimeout(()=>tocar(k,.35,.6),k*120));fala.textContent='';setTimeout(()=>fala.textContent='Acorde tocado',50)};
document.getElementById('som').onclick=ev=>{
  if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createDynamicsCompressor();master.connect(ac.destination)}
  somOn=!somOn;if(somOn)ac.resume();ev.currentTarget.textContent=somOn?'Som ligado':'Som desligado';
  if(somOn)tocar(0,.4,.6);
};

new ResizeObserver(medir).observe(sl);
addEventListener('tema',()=>{cores();pintar(performance.now())});
if(!reduz)setTimeout(()=>S.forEach((s,k)=>setTimeout(()=>tocar(k,.4,.35,true),k*140)),700);   // abertura: as seis cordas "assentam" em silêncio
})();
