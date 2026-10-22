(()=>{
const P=window.PORTFOLIO,$=s=>document.querySelector(s),D=document.documentElement,
e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),
li=a=>a.map(x=>`<li>${e(x)}</li>`).join(''),
reduz=matchMedia('(prefers-reduced-motion:reduce)').matches;

document.title=P.nome+', portfólio';
$('meta[name=description]').content=P.descricao;
$('.marca').textContent=P.nome;$('#nome').textContent=P.nome;$('#titulo').textContent=P.titulo;

const sec=(id,t,h)=>`<section class="sec" id="${id}" aria-labelledby="${id}-t"><h2 id="${id}-t">${t}</h2><div>${h}</div></section>`;
$('#conteudo').innerHTML=
 sec('sobre','Sobre',P.sobre.map(t=>`<p>${e(t)}</p>`).join('')+`<h3 style="margin-top:2rem">Agora</h3><ul class="agora">${li(P.agora)}</ul>`)+
 sec('projetos','Projetos',`<ul class="lista">${P.projetos.map((p,i)=>`<li><button class="proj" data-i="${i}" aria-haspopup="dialog"><span class="ano">${e(p.ano)}</span><span><b class="pn">${e(p.nome)}</b><span class="rs">${e(p.resumo)}</span></span><span class="tg">${e(p.tipo)}</span></button></li>`).join('')}</ul>`)+
 sec('stack','Stack',P.stack.map((g,i)=>`<div class="faixa" style="--w:${[3,2.5,2,1.5,1.2,1][i]||1}px"><h3>${e(g.grupo)}</h3><ul>${g.itens.map(([n,l])=>`<li data-n="${l}">${e(n)}</li>`).join('')}</ul></div>`).join('')+`<p class="leg"><span data-n="d">uso no dia a dia</span><span data-n="u">já usei em projetos</span><span data-n="e">estudando</span></p>`)+
 sec('percurso','Percurso',`<ol class="trilha">${P.percurso.map(x=>`<li><span class="ano">${e(x.periodo)}</span><div><h3>${e(x.cargo)}</h3><em>${e(x.local)}</em><p>${e(x.texto)}</p></div></li>`).join('')}</ol>`)+
 sec('contato','Contato',`<p class="grande">${e(P.contato.texto)}</p><div class="acoes"><button class="btn" id="copiar" type="button">Copiar e-mail</button><a href="mailto:${e(P.contato.email)}">Abrir no app de e-mail</a></div><ul class="redes">${P.contato.links.map(l=>`<li><a href="${e(l.url)}" rel="noopener">${e(l.rotulo)}</a></li>`).join('')}</ul>`);

// aviso rápido (toast)
const av=$('#aviso');let tm;
const aviso=t=>{av.textContent=t;av.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>av.classList.remove('on'),2200)};
$('#copiar').onclick=()=>navigator.clipboard.writeText(P.contato.email).then(()=>aviso('E-mail copiado'),()=>aviso('Não foi possível copiar: '+P.contato.email));

// detalhes do projeto em <dialog>
const dl=$('#det');
document.addEventListener('click',ev=>{
  const b=ev.target.closest('.proj');if(!b)return;
  const p=P.projetos[b.dataset.i];
  $('#det article').innerHTML=`<h3>${e(p.nome)}</h3><p>${e(p.resumo)}</p><ul>${li(p.destaques)}</ul><p><em>${e(p.stack.join(', '))}</em></p><p>`+
    [['repo','Ver código'],['demo','Ver online']].filter(([k])=>p[k]).map(([k,t])=>`<a class="btn" href="${e(p[k])}" rel="noopener">${t}</a>`).join('')+`</p>`;
  dl.showModal();
});
dl.onclick=ev=>{if(ev.target===dl)dl.close()};

// tema com revelação circular (View Transitions API)
$('#tema').onclick=ev=>{
  const n=D.dataset.tema=='escuro'?'claro':'escuro',x=ev.clientX||innerWidth-40,y=ev.clientY||30,
  go=()=>{D.dataset.tema=n;try{localStorage.tema=n}catch(_){}dispatchEvent(new Event('tema'))};
  if(!document.startViewTransition||reduz)return go();
  document.startViewTransition(go).ready.then(()=>D.animate(
    {clipPath:[`circle(0 at ${x}px ${y}px)`,`circle(150vmax at ${x}px ${y}px)`]},
    {duration:650,easing:'cubic-bezier(.2,.7,.2,1)',pseudoElement:'::view-transition-new(root)'}));
};

// destaca no menu a seção visível
const links=[...document.querySelectorAll('.topo nav a[href^="#"]')],io=new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting)links.forEach(a=>a.hash=='#'+x.target.id?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'))
}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('.sec').forEach(s=>io.observe(s));

// lembrete de campos de exemplo (só no seu computador)
const ph=[];
(function w(o,k){typeof o=='string'?/\[[^\]]+\]|seu-|seu@/i.test(o)&&ph.push(k):o&&typeof o=='object'&&Object.entries(o).forEach(([a,b])=>w(b,k+'.'+a))})(P,'');
if(ph.length&&(location.protocol=='file:'||/^(localhost|127\.)/.test(location.hostname))){
  $('#ed p').textContent=ph.length+' campo(s) em js/config.js ainda têm texto de exemplo. Este aviso só aparece no seu computador.';
  $('#ed').hidden=false;$('#ed button').onclick=()=>$('#ed').hidden=true;console.info('Campos para editar:',ph);
}
})();
