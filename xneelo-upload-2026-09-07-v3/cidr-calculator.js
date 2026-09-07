const cidrForm = document.querySelector('#cidr-form');
const cidrInput = document.querySelector('#cidr-input');
const cidrError = document.querySelector('#cidr-error');

function ipToNumber(ip) {
  return ip.split('.').reduce((value, octet) => (value * 256) + Number(octet), 0) >>> 0;
}

function numberToIp(value) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.');
}

function parseCidr(value) {
  const match = value.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!match) throw new Error('Enter an IPv4 address followed by a prefix, such as 192.168.1.10/24.');
  const octets = match.slice(1, 5).map(Number);
  const prefix = Number(match[5]);
  if (octets.some((octet) => octet > 255) || prefix > 32) throw new Error('Use octets from 0–255 and a prefix from /0–/32.');
  return { ip: octets.join('.'), prefix };
}

function calculateSubnet(ip, prefix) {
  const address = ipToNumber(ip);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcard = (~mask) >>> 0;
  const network = (address & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = 2 ** (32 - prefix);
  const pointToPoint = prefix === 31;
  const singleHost = prefix === 32;
  return {
    cidr: `${numberToIp(network)}/${prefix}`,
    mask: numberToIp(mask), wildcard: numberToIp(wildcard),
    network: numberToIp(network), broadcast: numberToIp(broadcast),
    first: numberToIp(singleHost ? network : pointToPoint ? network : network + 1),
    last: numberToIp(singleHost ? network : pointToPoint ? broadcast : broadcast - 1),
    total, usable: singleHost ? 1 : pointToPoint ? 2 : Math.max(total - 2, 0),
    note: singleHost ? 'A /32 identifies one individual IPv4 address.' : pointToPoint ? 'RFC 3021 permits both addresses in a /31 on point-to-point links.' : 'Traditional IPv4 host calculation reserves the network and broadcast addresses.'
  };
}

function showSubnet(value) {
  try {
    const parsed = parseCidr(value);
    const result = calculateSubnet(parsed.ip, parsed.prefix);
    cidrError.textContent = '';
    Object.entries(result).forEach(([key, item]) => {
      const element = document.querySelector(`#result-${key}`);
      if (element) element.textContent = typeof item === 'number' ? item.toLocaleString('en-ZA') : item;
    });
    document.querySelector('#subnet-note').textContent = result.note;
  } catch (error) { cidrError.textContent = error.message; }
}

cidrForm?.addEventListener('submit', (event) => { event.preventDefault(); showSubnet(cidrInput.value); });
document.querySelectorAll('[data-prefix]').forEach((button) => button.addEventListener('click', () => {
  const ip = cidrInput.value.split('/')[0] || '192.168.1.10';
  cidrInput.value = `${ip}/${button.dataset.prefix}`;
  showSubnet(cidrInput.value);
}));
document.querySelector('#copy-results')?.addEventListener('click', async (event) => {
  const text = [...document.querySelectorAll('.result-grid div')].map((row) => `${row.querySelector('dt').textContent}: ${row.querySelector('dd').textContent}`).join('\n');
  await navigator.clipboard.writeText(`${document.querySelector('#result-cidr').textContent}\n${text}`);
  event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy results'; }, 1600);
});
