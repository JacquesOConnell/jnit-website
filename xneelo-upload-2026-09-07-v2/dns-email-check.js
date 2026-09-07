const dnsForm = document.querySelector('#dns-form');
const domainInput = document.querySelector('#domain-input');
const selectorInput = document.querySelector('#selector-input');
const dnsError = document.querySelector('#dns-error');
const dnsResults = document.querySelector('#dns-results');

function cleanDomain(value) {
  const domain = value.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].replace(/\.$/, '');
  if (!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)) throw new Error('Enter a valid domain name, such as example.co.za.');
  return domain;
}

async function lookup(name, type) {
  const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, { headers: { accept: 'application/dns-json' } });
  if (!response.ok) throw new Error('The public DNS service could not complete the lookup. Please try again.');
  const data = await response.json();
  return (data.Answer || []).filter((answer) => answer.type !== 5).map((answer) => answer.data.replace(/^"|"$/g, '').replace(/"\s+"/g, ''));
}

function addRecordGroup(container, label, values) {
  const group = document.createElement('div'); group.className = 'record-group';
  const title = document.createElement('strong'); title.textContent = label; group.appendChild(title);
  if (!values.length) { const empty = document.createElement('span'); empty.textContent = 'No record found'; group.appendChild(empty); }
  values.forEach((value) => { const code = document.createElement('code'); code.textContent = value; group.appendChild(code); });
  container.appendChild(group);
}

function renderCheck(container, status, title, detail) {
  const item = document.createElement('article'); item.className = `health-check ${status}`;
  const icon = document.createElement('span'); icon.textContent = status === 'pass' ? '✓' : status === 'warn' ? '!' : '×';
  const copy = document.createElement('div'); const heading = document.createElement('h3'); const text = document.createElement('p');
  heading.textContent = title; text.textContent = detail; copy.append(heading, text); item.append(icon, copy); container.appendChild(item);
}

dnsForm?.addEventListener('submit', async (event) => {
  event.preventDefault(); dnsError.textContent = ''; dnsResults.hidden = true;
  const button = document.querySelector('#dns-submit'); button.disabled = true; button.textContent = 'Checking…';
  try {
    const domain = cleanDomain(domainInput.value); const selector = selectorInput.value.trim().toLowerCase();
    if (selector && !/^[a-z0-9_-]+$/.test(selector)) throw new Error('The DKIM selector contains unsupported characters.');
    const [addresses, mx, txt, dmarc, dkim] = await Promise.all([
      lookup(domain, 'A'), lookup(domain, 'MX'), lookup(domain, 'TXT'), lookup(`_dmarc.${domain}`, 'TXT'), selector ? lookup(`${selector}._domainkey.${domain}`, 'TXT') : Promise.resolve([])
    ]);
    const spf = txt.filter((value) => value.toLowerCase().startsWith('v=spf1'));
    const dmarcRecords = dmarc.filter((value) => value.toLowerCase().startsWith('v=dmarc1'));
    const dkimRecords = dkim.filter((value) => /v=dkim1|p=/i.test(value));
    const checks = [
      [addresses.length ? 'pass' : 'warn', 'Website DNS', addresses.length ? 'The domain has an IPv4 address.' : 'No IPv4 address was found. This can be intentional if the domain is used only for email.'],
      [mx.length ? 'pass' : 'fail', 'Mail routing (MX)', mx.length ? `${mx.length} mail exchanger record${mx.length === 1 ? '' : 's'} found.` : 'No MX record was found, so the domain may not receive email.'],
      [spf.length === 1 ? 'pass' : spf.length > 1 ? 'fail' : 'warn', 'Sender policy (SPF)', spf.length === 1 ? 'One SPF policy was found.' : spf.length > 1 ? 'Multiple SPF records were found; these should be consolidated.' : 'No SPF policy was found.'],
      [dmarcRecords.length ? (/\bp=(reject|quarantine)\b/i.test(dmarcRecords[0]) ? 'pass' : 'warn') : 'fail', 'DMARC policy', dmarcRecords.length ? (/\bp=(reject|quarantine)\b/i.test(dmarcRecords[0]) ? 'An enforcing DMARC policy is published.' : 'DMARC exists but does not appear to enforce quarantine or rejection.') : 'No DMARC policy was found.'],
      [!selector ? 'warn' : dkimRecords.length ? 'pass' : 'fail', 'DKIM signing', !selector ? 'Provide a selector to check DKIM.' : dkimRecords.length ? `A DKIM record was found for “${selector}”.` : `No DKIM record was found for “${selector}”.`]
    ];
    const points = checks.reduce((sum, check) => sum + (check[0] === 'pass' ? 20 : check[0] === 'warn' ? 10 : 0), 0);
    document.querySelector('#health-score').textContent = points;
    document.querySelector('#health-label').textContent = points >= 80 ? 'Strong foundations' : points >= 60 ? 'Needs attention' : 'Action recommended';
    document.querySelector('#health-summary-text').textContent = `Public DNS review for ${domain}.`;
    const checkList = document.querySelector('#check-list'); checkList.replaceChildren(); checks.forEach((check) => renderCheck(checkList, ...check));
    const records = document.querySelector('#record-list'); records.replaceChildren();
    addRecordGroup(records, 'A', addresses); addRecordGroup(records, 'MX', mx); addRecordGroup(records, 'SPF', spf); addRecordGroup(records, 'DMARC', dmarcRecords); if (selector) addRecordGroup(records, `DKIM · ${selector}`, dkimRecords);
    dnsResults.hidden = false; dnsResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) { dnsError.textContent = error.message; }
  finally { button.disabled = false; button.textContent = 'Check domain →'; }
});
