/* Progressive enhancement: all content remains available without animation. */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements = document.querySelectorAll('.premium-site .studio-service-grid article, .premium-site .demo-card, .premium-site .package-card, .premium-site .value-metrics article, .premium-site .app-capability-list article');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([{opacity:0, transform:'translateY(24px)'},{opacity:1, transform:'translateY(0)'}], {duration:580,easing:'cubic-bezier(.2,.7,.2,1)'});
    observer.unobserve(entry.target);
  }), {threshold:.15});
  elements.forEach(element => observer.observe(element));
})();
