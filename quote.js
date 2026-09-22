const briefForm = document.querySelector('#project-brief');
const briefStatus = document.querySelector('#brief-status');
const packages = {
  launch: 'One-page launch website',
  business: 'Professional business website',
  commerce: 'Online store'
};
const services = { cloud: 'Cloud foundation for a client product developed or deployed by JNIT', devops: 'DevOps or business automation', operations: 'Cloud operations for a client product developed or deployed by JNIT', care: 'Hosting and website maintenance' };
const params = new URLSearchParams(window.location.search);
const cloudChoice = briefForm?.querySelector('input[value="Cloud infrastructure or migration"]')?.closest('label');
if (cloudChoice) {
  const input = cloudChoice.querySelector('input');
  input.value = services.cloud;
  cloudChoice.querySelector('span').innerHTML = 'Cloud foundation<small>For a product JNIT develops or deploys</small>';
}
briefForm?.querySelector('input[value="Microsoft 365, security or IT consulting"]')?.closest('label')?.remove();
const selectedPackage = packages[params.get('package')] || services[params.get('service')];
if (selectedPackage && briefForm) {
  [...briefForm.querySelectorAll('input[name="project"]')].forEach(input => {
    input.checked = input.value === selectedPackage;
  });
}
function prepareBrief() {
  if (!briefForm || !briefForm.reportValidity()) return null;
  const data = new FormData(briefForm);
  return {
    subject: 'JNIT project enquiry — ' + data.get('project'),
    body: [
      'Hello Jacques,', '',
      'I would like to discuss a project with JNIT Cloud Solutions.', '',
      'Name: ' + data.get('name'),
      'Business: ' + (data.get('business') || 'Not provided'),
      'Project type: ' + data.get('project'),
      'Budget: ' + data.get('budget'),
      'Ideal timing: ' + data.get('timing'), '',
      'What I want to achieve:', data.get('goal'), '',
      'Additional information:', data.get('details') || 'None provided', '',
      'Kind regards,', data.get('name')
    ].join('\n')
  };
}
briefForm?.addEventListener('submit', event => {
  event.preventDefault();
  const brief = prepareBrief();
  if (!brief) return;
  if (briefStatus) briefStatus.textContent = 'Opening your email app. Nothing has been sent. If it does not open, use “Copy my brief instead”.';
  window.location.href = 'mailto:info@jnit.co.za?subject=' + encodeURIComponent(brief.subject) + '&body=' + encodeURIComponent(brief.body);
});
document.querySelector('#copy-brief')?.addEventListener('click', async () => {
  const brief = prepareBrief();
  if (!brief) return;
  const text = brief.subject + '\n\n' + brief.body;
  try {
    await navigator.clipboard.writeText(text);
    if (briefStatus) briefStatus.textContent = 'Brief copied. Paste it into your email or WhatsApp, review it, then send when ready.';
    document.querySelector('#brief-fallback').hidden = true;
  } catch {
    const fallback = document.querySelector('#brief-fallback');
    const textarea = document.querySelector('#brief-text');
    fallback.hidden = false;
    textarea.value = text;
    textarea.focus();
    textarea.select();
    if (briefStatus) briefStatus.textContent = 'Automatic copying is unavailable. Your brief is selected below; copy it manually.';
  }
});
