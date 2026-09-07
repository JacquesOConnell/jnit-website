const briefForm = document.querySelector('#project-brief');
briefForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!briefForm.reportValidity()) return;
  const data = new FormData(briefForm);
  const lines = [
    'Hello Jacques,', '',
    'I would like to discuss a project with JNIT Cloud Solutions.', '',
    `Name: ${data.get('name')}`,
    `Business: ${data.get('business') || 'Not provided'}`,
    `Project type: ${data.get('project')}`,
    `Budget: ${data.get('budget')}`,
    `Ideal timing: ${data.get('timing')}`, '',
    'What I want to achieve:',
    data.get('goal'), '',
    'Additional information:',
    data.get('details') || 'None provided', '',
    'Kind regards,',
    data.get('name')
  ];
  const project = data.get('project');
  const subject = encodeURIComponent(`JNIT project enquiry — ${project}`);
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:jacques@jnit.co.za?subject=${subject}&body=${body}`;
});
