const costForm = document.querySelector('#cost-form');
const symbols = { ZAR: 'R', USD: '$', EUR: '€', GBP: '£' };
const defaults = { instances: 2, hours: 730, 'compute-rate': 2.10, 'storage-gb': 250, 'storage-rate': 1.90, 'backup-gb': 500, 'backup-rate': .85, 'transfer-gb': 100, 'transfer-rate': 1.70, 'managed-cost': 1200, 'security-cost': 500, 'other-cost': 0, 'support-percent': 10 };

function amount(id) { return Math.max(0, Number(document.querySelector(`#${id}`).value) || 0); }
function money(value) {
  const currency = document.querySelector('#currency').value;
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}
function updateEstimate() {
  const compute = amount('instances') * amount('hours') * amount('compute-rate');
  const storage = amount('storage-gb') * amount('storage-rate');
  const backup = amount('backup-gb') * amount('backup-rate');
  const transfer = amount('transfer-gb') * amount('transfer-rate');
  const services = amount('managed-cost') + amount('security-cost') + amount('other-cost');
  const subtotal = compute + storage + backup + transfer + services;
  const support = subtotal * amount('support-percent') / 100;
  const monthly = subtotal + support;
  const values = { compute, storage, backup, transfer, services, support };
  Object.entries(values).forEach(([key, value]) => { document.querySelector(`#${key}-total`).textContent = money(value); });
  document.querySelector('#currency-symbol').textContent = symbols[document.querySelector('#currency').value];
  document.querySelector('#monthly-total').textContent = new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(monthly);
  document.querySelector('#annual-total').textContent = money(monthly * 12);
}
costForm?.addEventListener('input', updateEstimate);
document.querySelector('#print-estimate')?.addEventListener('click', () => window.print());
document.querySelector('#reset-estimate')?.addEventListener('click', () => {
  Object.entries(defaults).forEach(([id, value]) => { document.querySelector(`#${id}`).value = value; });
  document.querySelector('#currency').value = 'ZAR'; updateEstimate();
});
updateEstimate();
