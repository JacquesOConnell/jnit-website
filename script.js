const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

const whatsappLink = document.createElement('a');
whatsappLink.className = 'whatsapp-contact';
whatsappLink.href = 'https://wa.me/27833297992?text=Hello%20JNIT%20Cloud%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project.';
whatsappLink.target = '_blank';
whatsappLink.rel = 'noopener';
whatsappLink.setAttribute('aria-label', 'Chat with JNIT on WhatsApp');
whatsappLink.innerHTML = '<span>WhatsApp</span><b aria-hidden="true">↗</b>';
document.body.appendChild(whatsappLink);

if (navigation && !navigation.querySelector('a[href="web-development.html"]')) {
  const servicesLink = navigation.querySelector('a[href="services.html"]');
  const webLink = document.createElement('a');
  webLink.href = 'web-development.html';
  webLink.textContent = 'Web development';
  servicesLink?.after(webLink);
}

const navCta = navigation?.querySelector('.nav-cta');
if (navCta) {
  navCta.href = 'quote.html';
  navCta.textContent = 'Discuss your project ↗';
}

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const questions = [
  ['Cloud strategy', 'Our organisation has a documented cloud roadmap aligned with measurable business goals.'],
  ['Security', 'We consistently apply least-privilege access, security monitoring and data protection controls.'],
  ['Backup and recovery', 'Our backups are automated, monitored and regularly tested through recovery exercises.'],
  ['Monitoring', 'Our teams use centralised logs, metrics, dashboards and alerts to manage application health.'],
  ['Automation and CI/CD', 'Application testing and deployment are automated through repeatable delivery pipelines.'],
  ['Cost optimisation', 'We actively track cloud ownership, budgets, resource usage and optimisation opportunities.']
];

const recommendations = [
  'Define a phased cloud adoption roadmap aligned with business goals.',
  'Strengthen identity management, least-privilege access and security monitoring.',
  'Implement automated backups and regularly test disaster recovery procedures.',
  'Centralise application metrics, logs, dashboards and operational alerts.',
  'Automate application testing and deployment through a controlled CI/CD pipeline.',
  'Introduce tagging, budgets, usage monitoring and regular cost reviews.'
];

const questionsContainer = document.querySelector('#questions');
const assessmentForm = document.querySelector('#assessment-form');
const formError = document.querySelector('#form-error');
const resultsSection = document.querySelector('#results');

const toolSearch = document.querySelector('#tool-search');
const statusFilter = document.querySelector('#status-filter');
const toolCards = [...document.querySelectorAll('.tool-card')];
let activeCategory = 'all';

function filterTools() {
  const query = toolSearch?.value.trim().toLowerCase() || '';
  const status = statusFilter?.value || 'all';
  let visible = 0;
  toolCards.forEach((card) => {
    const categoryMatch = activeCategory === 'all' || card.dataset.category.includes(activeCategory);
    const statusMatch = status === 'all' || card.dataset.status === status;
    const searchMatch = !query || card.textContent.toLowerCase().includes(query);
    card.hidden = !(categoryMatch && statusMatch && searchMatch);
    if (!card.hidden) visible += 1;
  });
  const count = document.querySelector('#tool-count');
  if (count) count.textContent = `${visible} ${visible === 1 ? 'tool' : 'tools'} shown`;
  const empty = document.querySelector('#no-tools');
  if (empty) empty.hidden = visible !== 0;
}

toolSearch?.addEventListener('input', filterTools);
statusFilter?.addEventListener('change', filterTools);
document.querySelectorAll('.filter-chip').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter-chip.active')?.classList.remove('active');
  button.classList.add('active');
  activeCategory = button.dataset.filter;
  filterTools();
}));
if (toolCards.length) filterTools();

if (questionsContainer) questionsContainer.innerHTML = questions.map((question, index) => `
  <fieldset class="question-card">
    <legend><span>${String(index + 1).padStart(2, '0')}</span>${question[0]}</legend>
    <p>${question[1]}</p>
    <div class="question-options" aria-label="${question[0]} rating">
      ${[1, 2, 3, 4, 5].map((rating) => `<label><input type="radio" name="question-${index}" value="${rating}"><span>${rating}</span></label>`).join('')}
    </div>
  </fieldset>`).join('');

assessmentForm?.addEventListener('change', () => {
  document.querySelector('#answered-count').textContent = assessmentForm.querySelectorAll('input:checked').length;
});

function maturityMessage(maturity) {
  return {
    Foundation: 'You have an opportunity to establish secure cloud foundations and a focused adoption roadmap.',
    Developing: 'Your cloud capabilities are progressing. Prioritised improvements can increase reliability, security and delivery speed.',
    'Cloud Ready': 'Your organisation has strong foundations and is ready to focus on optimisation, resilience and continuous improvement.'
  }[maturity];
}

assessmentForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = questions.map((_, index) => assessmentForm.querySelector(`input[name="question-${index}"]:checked`)?.value).map(Number);
  if (answers.some((answer) => !answer)) {
    formError.textContent = 'Please rate all six capabilities before calculating your result.';
    assessmentForm.querySelector('fieldset:not(:has(input:checked))')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  formError.textContent = '';
  const score = Math.round((answers.reduce((sum, answer) => sum + answer, 0) / 30) * 100);
  const maturity = score < 40 ? 'Foundation' : score < 70 ? 'Developing' : 'Cloud Ready';
  const priorities = answers.map((rating, index) => ({ rating, category: questions[index][0], recommendation: recommendations[index] })).filter((item) => item.rating < 4).sort((a, b) => a.rating - b.rating).slice(0, 3);

  document.querySelector('#result-score').textContent = score;
  document.querySelector('#result-maturity').textContent = maturity;
  document.querySelector('#result-message').textContent = maturityMessage(maturity);
  document.querySelector('#priority-list').innerHTML = priorities.length ? priorities.map((priority) => `<article><span>${priority.category}</span><p>${priority.recommendation}</p></article>`).join('') : '<article><span>Maintain your momentum</span><p>Continue reviewing security, resilience, architecture and cost controls as your environment evolves.</p></article>';
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#print-result')?.addEventListener('click', () => window.print());
document.querySelector('#restart-assessment')?.addEventListener('click', () => {
  assessmentForm.reset();
  formError.textContent = '';
  document.querySelector('#answered-count').textContent = '0';
  resultsSection.hidden = true;
  document.querySelector('#assessment').scrollIntoView({ behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation?.classList.contains('open')) { navigation.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.focus(); } });

if (document.body.classList.contains('cloud-home')) {
  const legacySection = { '#demos': 'demos', '#websites': 'packages' }[window.location.hash];
  if (legacySection) window.location.replace('web-development.html#' + legacySection);
}
