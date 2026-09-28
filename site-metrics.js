window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-VRVRZRCNWW');
document.addEventListener('click', event => {
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const method = href.startsWith('https://wa.me/') ? 'whatsapp'
    : href.startsWith('mailto:') ? 'email'
    : null;
  if (method) gtag('event', 'contact_click', { method });
  if (/^(?:\.\/)?quote\.html(?:[?#]|$)/.test(href)) {
    gtag('event', 'project_brief_open', { source_page: location.pathname });
  }
});
