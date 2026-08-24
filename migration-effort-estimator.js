const migrationForm = document.querySelector('#migration-form');
const numberValue = (id) => Math.max(0, Number(document.querySelector(`#${id}`).value) || 0);

function calculateMigration() {
  const workloads = Math.max(1, numberValue('workloads'));
  const data = numberValue('data-volume');
  const factors = ['complexity', 'dependencies', 'downtime', 'compliance', 'documentation', 'capacity'].map(numberValue);
  const combined = factors.reduce((total, factor) => total * factor, 1);
  const baseDays = 10 + (workloads * 2.6) + (Math.sqrt(data) * 3);
  const central = baseDays * Math.pow(combined, .45);
  const low = Math.max(10, Math.round(central * .8)); const high = Math.round(central * 1.25);
  const averageTeam = central > 180 ? 5 : central > 80 ? 4 : 3;
  const weeksLow = Math.max(2, Math.ceil(low / averageTeam / 5)); const weeksHigh = Math.max(weeksLow + 1, Math.ceil(high / averageTeam / 5));
  const waves = Math.max(1, Math.ceil(workloads / (combined > 4 ? 5 : 8)));
  const risk = Math.round(((high / central) - 1) * 100);
  const size = high < 50 ? 'Focused migration' : high < 130 ? 'Medium programme' : high < 260 ? 'Large programme' : 'Complex transformation';
  document.querySelector('#effort-low').textContent = low; document.querySelector('#effort-high').textContent = high;
  document.querySelector('#migration-size').textContent = size;
  document.querySelector('#migration-summary').textContent = `${workloads} workload${workloads === 1 ? '' : 's'} with approximately ${data.toLocaleString('en-ZA')} TB of data.`;
  document.querySelector('#duration-range').textContent = `${weeksLow}–${weeksHigh} weeks`;
  document.querySelector('#wave-count').textContent = waves; document.querySelector('#risk-allowance').textContent = `${risk}%`;
  const phases = [
    ['Discover and assess', Math.max(3, Math.round(central * .16))],
    ['Design and establish foundations', Math.max(4, Math.round(central * .2))],
    ['Pilot and validate', Math.max(4, Math.round(central * .18))],
    ['Migration waves', Math.max(5, Math.round(central * .36))],
    ['Stabilise and hand over', Math.max(3, Math.round(central * .1))]
  ];
  const list = document.querySelector('#phase-list'); list.replaceChildren();
  phases.forEach(([name, days]) => { const item = document.createElement('li'); const title = document.createElement('span'); const effort = document.createElement('strong'); title.textContent = name; effort.textContent = `${days} days`; item.append(title, effort); list.appendChild(item); });
}

migrationForm?.addEventListener('input', calculateMigration);
migrationForm?.addEventListener('submit', (event) => { event.preventDefault(); calculateMigration(); document.querySelector('#migration-result').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
document.querySelector('#print-migration')?.addEventListener('click', () => window.print());
calculateMigration();
