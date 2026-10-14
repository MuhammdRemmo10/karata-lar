'use strict';
(() => {
  const toggle=document.getElementById('menuToggle');
  const menu=document.getElementById('companyMenu');
  if(!toggle||!menu)return;
  function closeMenu(){menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menüyü aç');}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  window.matchMedia('(min-width:1101px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
})();
