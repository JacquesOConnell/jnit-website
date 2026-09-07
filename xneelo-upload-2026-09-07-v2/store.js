const laptopSearch = document.querySelector('#laptop-search');
const brandFilter = document.querySelector('#brand-filter');
const laptopCards = [...document.querySelectorAll('.laptop-card')];
const laptopCount = document.querySelector('#laptop-count');
const noLaptops = document.querySelector('#no-laptops');

function filterLaptops() {
  const query = laptopSearch?.value.trim().toLowerCase() || '';
  const brand = brandFilter?.value || 'all';
  let visible = 0;

  laptopCards.forEach((card) => {
    const matchesBrand = brand === 'all' || card.dataset.brand === brand;
    const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
    card.hidden = !(matchesBrand && matchesSearch);
    if (!card.hidden) visible += 1;
  });

  if (laptopCount) laptopCount.textContent = `${visible} ${visible === 1 ? 'product' : 'products'} shown`;
  if (noLaptops) noLaptops.hidden = visible !== 0;
}

laptopSearch?.addEventListener('input', filterLaptops);
brandFilter?.addEventListener('change', filterLaptops);
if (laptopCards.length) filterLaptops();
