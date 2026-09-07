const policyForm = document.querySelector('#policy-form');
const value = (id) => document.querySelector(`#${id}`).value;
const checked = (id) => document.querySelector(`#${id}`).checked;

function buildPolicy() {
  const risk = value('risk-level'); const mfa = value('mfa-coverage');
  const minimum = risk === 'critical' ? 16 : risk === 'sensitive' ? 14 : 12;
  const sections = [
    ['Password requirements', [`Use a minimum of ${minimum} characters for user-created passwords and favour memorable passphrases.`, 'Block commonly used, predictable and known-compromised passwords.', 'Do not impose routine expiry where there is no evidence of compromise; require a change after suspected exposure or account recovery.', 'Never reuse work passwords on personal or unrelated services.']],
    ['Multi-factor authentication', [mfa === 'strong' ? 'Maintain MFA for every account and prefer phishing-resistant methods for sensitive access.' : mfa === 'all' ? 'Maintain MFA for all users and strengthen methods for administrators and sensitive applications.' : mfa === 'partial' ? 'Expand MFA from selected accounts to all users, beginning with email, remote access and privileged roles.' : 'Introduce MFA urgently, beginning with administrators, email and remote access.', 'Do not use knowledge-based questions as an authentication factor.']],
    ['Privileged access', [value('admin-accounts') === 'separate' ? 'Continue using separate, named administrative accounts for privileged work.' : 'Replace shared or everyday administrative access with separate, named admin accounts.', 'Apply stronger authentication, logging and shorter sessions to privileged access.', 'Use emergency access accounts only through a documented and monitored process.']],
    ['Credential handling', [value('password-manager') === 'managed' ? 'Use the organisation-managed password manager to generate and store unique credentials.' : 'Provide an approved, managed password manager for unique credential generation and storage.', 'Never send passwords through ordinary email, chat or unprotected documents.', 'Store application secrets in an approved secret-management system rather than source code or configuration files.']],
    ['Account recovery', [value('recovery') === 'verified' ? 'Continue using the documented identity-verification process before resetting authentication methods.' : 'Introduce documented identity verification before password or MFA resets.', 'Record recovery events and notify the account owner promptly.', 'Revoke active sessions and review recent activity after a suspected compromise.']]
  ];
  if (value('sso') !== 'most') sections.push(['Single sign-on', ['Expand managed single sign-on for core applications to reduce separate credentials and centralise access control.', 'Disable access centrally when a user leaves or changes role.']]);
  if (checked('include-contractors')) sections.push(['Contractors and third parties', ['Apply the same authentication requirements to third parties.', 'Use named, time-limited access with a responsible internal owner.']]);
  if (checked('include-service')) sections.push(['Service accounts', ['Prohibit interactive use of service accounts unless explicitly approved.', 'Use managed identities or rotated secrets, document ownership and monitor usage.']]);
  if (checked('include-review')) sections.push(['Review and enforcement', ['Review user and privileged access at a defined interval and after role changes.', 'Measure MFA coverage, dormant accounts, exceptions and recovery events.', 'Document approved exceptions with an owner, reason, compensating controls and expiry date.']]);
  const title = document.querySelector('#policy-name').value.trim() || 'Authentication and password policy';
  document.querySelector('#output-title').textContent = title;
  document.querySelector('#policy-strength').textContent = risk === 'critical' ? 'High assurance' : risk === 'sensitive' ? 'Enhanced' : 'Baseline';
  document.querySelector('#policy-intro').textContent = 'This outline defines minimum authentication and credential-handling expectations for users, administrators and connected systems.';
  const container = document.querySelector('#policy-sections'); container.replaceChildren();
  sections.forEach(([heading, items], index) => { const section = document.createElement('section'); const h = document.createElement('h3'); const list = document.createElement('ul'); h.textContent = `${index + 1}. ${heading}`; items.forEach((item) => { const li = document.createElement('li'); li.textContent = item; list.appendChild(li); }); section.append(h, list); container.appendChild(section); });
}

policyForm?.addEventListener('submit', (event) => { event.preventDefault(); buildPolicy(); document.querySelector('#policy-output').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
policyForm?.addEventListener('change', buildPolicy);
document.querySelector('#copy-policy')?.addEventListener('click', async (event) => { const output = document.querySelector('#policy-output'); const text = [...output.querySelectorAll('h2,h3,p,li')].map((node) => node.tagName === 'LI' ? `• ${node.textContent}` : node.textContent).join('\n'); await navigator.clipboard.writeText(text); event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy policy'; }, 1600); });
document.querySelector('#print-policy')?.addEventListener('click', () => window.print());
buildPolicy();
