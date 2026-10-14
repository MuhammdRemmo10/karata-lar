'use strict';
// Motion enhances the catalog; content remains visible without this script.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const seenProducts = new Set();
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      reveal.unobserve(entry.target);
    });
  }, {threshold: .06, rootMargin: '0px 0px -20px 0px'});
  function prepare(element, index = 0) {
    if (element.classList.contains('reveal')) return;
    const product = element.querySelector('[data-product]')?.dataset.product;
    if (product && seenProducts.has(product)) return;
    if (product) seenProducts.add(product);
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
    element.classList.add('reveal');
    reveal.observe(element);
  }
  document.querySelectorAll('.hero-copy > *, .hero-visual, .section-heading, .contact-section > *, .footer-main > *, .corporate-hero-copy > *, .hero-showcase, .company-about > *, .brand-card, .contact-tiles > *, .address-panel, .company-values > *, .catalog-banner, .pdf-page > *').forEach((element, index) => prepare(element, index));
  const grids = document.querySelectorAll('#products, #featuredCategories, #homeProducts');
  grids.forEach(grid => {
    Array.from(grid.children).forEach(prepare);
    new MutationObserver(() => Array.from(grid.children).forEach(prepare)).observe(grid, {childList: true});
  });
  const header = document.querySelector('header');
  let scheduled = false;
  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateHeader); }
  }, {passive: true});
  updateHeader();
  // Honor a preference change immediately, including elements outside the viewport.
  preference.addEventListener('change', event => {
    if (event.matches) {
      reveal.disconnect();
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-revealed'));
    }
  });
})();
