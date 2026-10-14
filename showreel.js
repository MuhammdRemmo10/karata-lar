'use strict';
(() => {
  const hero=document.getElementById('signatureHero');
  if(!hero)return;
  const slides=Array.from(hero.querySelectorAll('.hero-scene'));
  const tabs=Array.from(hero.querySelectorAll('[data-scene-to]'));
  const playback=document.getElementById('scenePlayback');
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration=7000;
  let active=0, timer=null, paused=preference.matches, hovered=false, inView=true;
  function clearTimer(){if(timer!==null){clearTimeout(timer);timer=null;}}
  function isRunning(){return !paused&&!preference.matches&&!hovered&&!document.hidden&&inView&&!document.querySelector('dialog[open]');}
  function sync(){
    clearTimer();
    const running=isRunning();
    hero.classList.toggle('is-playing',running);
    hero.classList.toggle('is-paused',!running);
    playback.setAttribute('aria-pressed',String(paused||preference.matches));
    playback.setAttribute('aria-label',preference.matches?'Otomatik geçiş kapalı · hareket azaltıldı':paused?'Otomatik geçişi başlat':'Otomatik geçişi durdur');
    playback.disabled=preference.matches;
    playback.innerHTML=paused||preference.matches?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
    if(running)timer=setTimeout(()=>{timer=null;show(active+1,false);},duration);
  }
  function show(index,manual=true){
    active=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{const on=i===active;slide.classList.toggle('is-active',on);slide.setAttribute('aria-hidden',String(!on));slide.inert=!on;});
    tabs.forEach((tab,i)=>{tab.classList.toggle('is-active',i===active);tab.setAttribute('aria-pressed',String(i===active));});
    hero.dataset.activeScene=String(active);
    document.getElementById('sceneCurrent').textContent=String(active+1).padStart(2,'0');
    if(manual){paused=true;document.getElementById('sceneAnnouncement').textContent=slides[active].getAttribute('aria-label');}
    sync();
  }
  hero.querySelector('.hero-scene-tabs').hidden=false;
  hero.querySelector('.scene-controls').hidden=false;
  tabs.forEach((tab,i)=>tab.addEventListener('click',()=>show(i)));
  document.getElementById('sceneNext').addEventListener('click',()=>show(active+1));
  document.getElementById('scenePrev').addEventListener('click',()=>show(active-1));
  playback.addEventListener('click',()=>{paused=!paused;sync();});
  // Keyboard focus stops automatic changes. Only an explicit Play action restarts them.
  hero.addEventListener('focusin',event=>{if(event.target!==playback){paused=true;sync();}});
  hero.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;sync();}});
  hero.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){hovered=false;sync();}});
  document.addEventListener('visibilitychange',sync);
  preference.addEventListener('change',()=>{if(preference.matches)paused=true;sync();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.12}).observe(hero);
  // A modal pauses the showroom while customers inspect or share products.
  document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open']}));
  sync();
})();
