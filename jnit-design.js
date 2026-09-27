(() => {
  const toggle = document.querySelector('.next-menu');
  const nav = document.querySelector('.next-nav');
  const close = () => { nav?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); if(toggle) toggle.textContent='Menu'; };
  toggle?.addEventListener('click', () => { const open=nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded',String(open)); toggle.textContent=open?'Close':'Menu'; });
  nav?.addEventListener('click', e => { if(e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape' && nav?.classList.contains('is-open')) { close(); toggle.focus(); } });
  const breakpoint=matchMedia('(min-width: 901px)'); breakpoint.addEventListener('change', e=>{if(e.matches) close();});
  document.querySelectorAll('.next-year').forEach(e=>e.textContent=new Date().getFullYear());
})();
