const $=s=>document.querySelector(s);
/* ---- Zər simulyatoru ---- */
let cnt=[0,0,0,0,0,0],tot=0;
function drawDice(){
  $('#dice').innerHTML=cnt.map((c,i)=>{const f=tot?c/tot:0;
    return `<div class="row"><span>Xal ${i+1}</span><div class="bar"><i style="width:${Math.min(100,f*300)}%"></i></div><span>${f.toFixed(3)}</span></div>`}).join('');
  $('#dinfo').textContent=tot?`Atış sayı: ${tot}. «6» gəlmə tezliyi: ${(cnt[5]/tot).toFixed(4)} (nəzəri 1/6 ≈ 0,1667)`:'Hələ atış yoxdur.';
}
document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{
  const n=+b.dataset.r;if(!n){cnt=[0,0,0,0,0,0];tot=0}
  for(let i=0;i<n;i++){cnt[Math.floor(Math.random()*6)]++;tot++}drawDice()});
drawDice();
/* ---- Menyu vurğusu ---- */
const links=[...document.querySelectorAll('nav a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-20% 0px -70% 0px'});
document.querySelectorAll('main section, header').forEach(s=>io.observe(s));
/* ---- Suallar ---- */
const Q=[
{t:'n',q:'Qeyri-mümkün hadisənin ehtimalı nəyə bərabərdir?',o:['0','1','0,5','Müəyyən etmək olmaz'],a:0,e:'Qeyri-mümkün hadisə ∅-dir, P(∅) = 0 (Ω = Ω ∪ ∅ ⇒ 1 = 1 + P(∅)).'},
{t:'n',q:'Aşağıdakılardan hansı ehtimal ola bilməz?',o:['0','0,35','1','−0,2'],a:3,e:'Aksiom A1: P(A) ≥ 0, həm də P(A) ≤ 1. Mənfi ədəd ehtimal deyil.'},
{t:'n',q:'Kolmoqorov aksiomlarından hansı «normallıq» aksiomudur?',o:['P(A) ≥ 0','P(Ω) = 1','P(A∪B)=P(A)+P(B), AB=∅','P(∅)=0'],a:1,e:'A1 mənfi olmama, A2 normallıq P(Ω)=1, A3 additivlik. P(∅)=0 isə aksiomlardan çıxan xassədir.'},
{t:'n',q:'Kolmoqorov aksiomlarının ehtimal nəzəriyyəsindəki əsas rolu nədir?',o:['Yalnız zər məsələlərini həll edir','Klassik, statistik və digər təriflərin ümumi riyazi əsasını yaradıb, nəzəriyyəni ciddi elm edib','Ehtimalı təcrübə ilə təyin edir','Kombinatorikanı əvəz edir'],a:1,e:'Aksiomatika bütün təriflərin məhdudiyyətini aradan qaldırıb, ehtimalı ölçü nəzəriyyəsi əsasında qurulan ciddi nəzəriyyəyə çevirdi.'},
{t:'n',q:'Klassik ehtimal düsturu P(A)=m/n hansı şərtlə tətbiq olunur?',o:['Nəticələr sonsuzdur','Nəticələr sonlu və bərabər mümkündür','Təcrübə çox dəfə təkrar edilib','Hadisələr asılıdır'],a:1,e:'Klassik tərif: sonlu sayda, cüt-cüt uyğunsuz və bərabər mümkün nəticə.'},
{t:'n',q:'De Morqan qaydasına görə (A ∪ B)‾ nəyə bərabərdir?',o:['Ā ∪ B̄','Ā ∩ B̄','A ∩ B','Ā \\ B'],a:1,e:'Birləşmənin tamamlayıcısı tamamlayıcıların kəsişməsidir: «A də, B də baş vermədi».'},
{t:'n',q:'A və B uyğunsuz hadisələrdirsə, P(AB) nəyə bərabərdir?',o:['P(A)·P(B)','P(A)+P(B)','0','1'],a:2,e:'Uyğunsuzluq AB = ∅ deməkdir, P(∅) = 0. P(A)P(B) isə müstəqillik üçündür.'},
{t:'n',q:'A ⊂ B olduqda hansı doğrudur?',o:['P(A) ≥ P(B)','P(A) ≤ P(B)','P(A) = P(B)','P(A) + P(B) = 1'],a:1,e:'Monotonluq: B = A ∪ (B\\A), P(B) = P(A) + P(B\\A) ≥ P(A).'},
{t:'n',q:'P(A ∪ B) = P(A) + P(B) bərabərliyi nə vaxt doğrudur?',o:['Həmişə','A və B müstəqil olduqda','A və B uyğunsuz olduqda','A ⊂ B olduqda'],a:2,e:'Ümumi halda P(A∪B)=P(A)+P(B)−P(AB). AB=∅ olduqda sonuncu hədd sıfırdır.'},
{t:'n',q:'Tam qrup təşkil edən hadisələrin ehtimalları cəmi neçədir?',o:['0','1','n','Ədəd dəyişir'],a:1,e:'Tam qrup: cüt-cüt uyğunsuz və birləşməsi Ω. Deməli ΣP = P(Ω) = 1.'},
{t:'n',q:'Aşağıdakılardan hansı Aₙᵏ (yerləşdirmə) üçün düzgün düsturdur?',o:['n!/(k!(n−k)!)','n!/(n−k)!','n!','nᵏ'],a:1,e:'Yerləşdirmə sıranı nəzərə alır: Aₙᵏ = n!/(n−k)!. Birinci variant Cₙᵏ-dır.'},
{t:'n',q:'Nisbi tezlik W(A)=m/n hansı xassəni ödəmir?',o:['0 ≤ W(A) ≤ 1','W(Ω) = 1','Uyğunsuzlar üçün additivlik','n dəyişdikdə hər zaman eyni qalır'],a:3,e:'W(A) hər seriyada dəyişir, yalnız n böyüdükcə dayanıqlaşır. Digər xassələri ödəyir.'},
{t:'p',q:'P(A) = 0,3 olduqda P(Ā) nəyə bərabərdir?',o:['0,3','0,7','1,3','0'],a:1,e:'P(Ā) = 1 − P(A) = 0,7.'},
{t:'p',q:'P(A)=0,5, P(B)=0,4, P(AB)=0,2. P(A ∪ B) = ?',o:['0,9','0,7','0,5','0,1'],a:1,e:'0,5 + 0,4 − 0,2 = 0,7.'},
{t:'p',q:'200 atışda sikkə 108 dəfə gerb üzü ilə düşüb. Gerbin nisbi tezliyi?',o:['0,46','0,5','0,54','0,92'],a:2,e:'W = 108/200 = 0,54.'},
{t:'p',q:'Zər atılır. Cüt xal gəlməsi ehtimalı?',o:['1/6','1/3','1/2','2/3'],a:2,e:'Əlverişli {2,4,6}: m=3, n=6, P = 1/2.'},
{t:'p',q:'C₆² nəyə bərabərdir?',o:['12','15','30','36'],a:1,e:'C₆² = 6!/(2!·4!) = (6·5)/2 = 15.'},
{t:'p',q:'5 fərqli kitab rəfdə neçə üsulla düzülə bilər?',o:['25','60','120','3125'],a:2,e:'P₅ = 5! = 120.'},
{t:'p',q:'Aₙᵏ: A₅² = ?',o:['10','20','25','60'],a:1,e:'A₅² = 5·4 = 20.'},
{t:'p',q:'P(A)=0,6, P(B)=0,7. Ən azı P(AB) neçədir?',o:['0','0,3','0,42','0,6'],a:1,e:'P(AB) = P(A)+P(B)−P(A∪B) ≥ 1,3 − 1 = 0,3, çünki P(A∪B) ≤ 1.'},
{t:'p',q:'Qutuda 6 ağ, 4 qara kürə var. 2 kürə çəkilir. İkisi də ağ olması ehtimalı?',v:1/3,e:'C₆²/C₁₀² = 15/45 = 1/3 ≈ 0,3333.'},
{t:'p',q:'İki zər atılır. Xalların cəmi 8 olması ehtimalı?',v:5/36,e:'Əlverişli: (2,6),(3,5),(4,4),(5,3),(6,2) = 5; n = 36. P = 5/36 ≈ 0,1389.'},
{t:'p',q:'3 sikkə atılır. Düz 2 gerb gəlməsi ehtimalı?',v:3/8,e:'Əlverişli C₃² = 3, bütün hallar 2³ = 8. P = 3/8 = 0,375.'},
{t:'p',q:'Qutuda 5 ağ, 3 qara kürə var. 3 kürə çəkilir. Ən azı biri ağ olması ehtimalı?',v:55/56,e:'Əks hadisə: üçü də qara, C₃³/C₈³ = 1/56. P = 1 − 1/56 = 55/56 ≈ 0,9821.'},
{t:'p',q:'30 məhsuldan 5-i qüsurludur. 3 məhsul seçilir. Düz 1-i qüsurlu olması ehtimalı?',v:1500/4060,e:'C₅¹·C₂₅²/C₃₀³ = 5·300/4060 = 1500/4060 ≈ 0,3695.'},
{t:'p',q:'5 kitab rəfdə təsadüfi düzülür. 2 müəyyən kitabın yanaşı olması ehtimalı?',v:0.4,e:'İkisini bir blok say: 4! blok düzülüşü · 2! içəridə = 48; bütün hallar 5! = 120. P = 48/120 = 0,4.'},
{t:'p',q:'52 kartdan 1 kart çəkilir. Ürək və ya kral gəlməsi ehtimalı?',v:16/52,e:'13/52 + 4/52 − 1/52 = 16/52 ≈ 0,3077.'}
];
let mode='practice',filt='all',list=[],st={},done=false,tm=null,left=0;
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function num(s){s=String(s).trim().replace(',','.');if(!s)return null;if(s.includes('/')){const[p,q]=s.split('/').map(Number);return q?p/q:null}const n=Number(s);return isNaN(n)?null:n}
const ok=x=>{const a=st[x.id];if(a===undefined)return false;return x.o?a===x.a:(num(a)!==null&&Math.abs(num(a)-x.v)<0.0015)};
const fmt=x=>x.o?x.o[x.a]:(x.v).toFixed(4).replace('.',',');
function start(){
  clearInterval(tm);$('#clock').textContent='';
  let pool=Q.map((x,i)=>({...x,id:i})).filter(x=>filt==='all'||x.t===filt);
  if(mode==='exam')pool=shuffle(pool).slice(0,12);
  list=pool;st={};done=false;
  $('#finish').hidden=mode!=='exam';
  if(mode==='exam'){left=1200;tick();tm=setInterval(tick,1000)}
  render();
}
function tick(){const m=Math.floor(left/60),s=left%60;$('#clock').textContent=`Qalan vaxt: ${m}:${String(s).padStart(2,'0')}`;if(left--<=0)finish()}
function finish(){if(done)return;done=true;clearInterval(tm);$('#clock').textContent='';$('#finish').hidden=true;render();
  const r=list.filter(ok).length,p=Math.round(100*r/list.length);
  try{const b=+localStorage.getItem('best')||0;if(p>b)localStorage.setItem('best',p)}catch(e){}
  $('#score').scrollIntoView()}
function render(){
  const rev=x=>done||(mode==='practice'&&st[x.id]!==undefined);
  $('#qs').innerHTML=list.map((x,k)=>{
    const r=rev(x);
    let body;
    if(x.o)body=x.o.map((o,i)=>{let c='';if(r)c=i===x.a?'ok':(st[x.id]===i?'bad':'');else if(st[x.id]===i)c='sel';
      return `<button class="opt ${c}" data-q="${x.id}" data-i="${i}" ${r?'disabled':''}>${o}</button>`}).join('');
    else body=`<div class="num"><input id="n${x.id}" value="${st[x.id]??''}" ${r?'disabled':''} placeholder="məs. 1/3 və ya 0,333" aria-label="Cavab"><button data-q="${x.id}" data-n="1" ${r?'disabled':''}>${mode==='exam'?'Qeyd et':'Yoxla'}</button>${!r&&st[x.id]!==undefined?' <small>cavab qeydə alındı</small>':''}</div>`;
    const ex=r?`<div class="ex"><b>${ok(x)?'Düzgün.':'Səhv.'}</b> ${st[x.id]===undefined?'Cavab verilməyib. ':''}Düzgün cavab: <b>${fmt(x)}</b><br>${x.e}</div>`:'';
    return `<div class="q"><span class="tag">${x.t==='n'?'Nəzəri':'Praktiki'} · sual ${k+1}</span><p>${x.q}</p>${body}${ex}</div>`}).join('');
  const ans=list.filter(x=>st[x.id]!==undefined).length,r=list.filter(ok).length;
  let best='';try{const b=localStorage.getItem('best');if(b)best=` · Ən yaxşı imtahan nəticən: ${b}%`}catch(e){}
  $('#score').innerHTML=done?`<div class="res"><b>${r} / ${list.length}</b> (${Math.round(100*r/list.length)}%)<br>${r/list.length>=.85?'Əla, imtahana hazırsan.':r/list.length>=.6?'Yaxşıdır. Səhv etdiyin suallardakı izahları təkrar oxu.':'Nəzəri hissəni təkrar oxuyub yenidən cəhd et.'}${best}</div>`
   :`<div class="info">Cavablanıb: ${ans} / ${list.length}${mode==='practice'?` · Düzgün: ${r}`:''}${best}</div>`;
}
$('#qs').onclick=e=>{const b=e.target.closest('button');if(!b||done)return;const id=+b.dataset.q;
  if(b.dataset.n){const v=$('#n'+id).value.trim();if(v==='')return;st[id]=v}else st[id]=+b.dataset.i;
  render()};
$('#qs').onkeydown=e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT')e.target.nextElementSibling.click()};
$('#mode').onclick=e=>{const b=e.target.closest('button');if(!b)return;mode=b.dataset.m;[...$('#mode').children].forEach(c=>c.classList.toggle('on',c===b));start()};
$('#filt').onclick=e=>{const b=e.target.closest('button');if(!b)return;filt=b.dataset.f;[...$('#filt').children].forEach(c=>c.classList.toggle('on',c===b));start()};
$('#again').onclick=start;$('#finish').onclick=finish;
start();
