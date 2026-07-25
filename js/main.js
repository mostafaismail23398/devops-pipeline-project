async function loadContent() {
  const res = await fetch('content/data.json');
  const data = await res.json();

  // Hero
  document.getElementById('nav-name').textContent = data.hero.name;
  document.getElementById('hero-name').textContent = data.hero.name;
  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-tagline').textContent = data.hero.tagline;
  document.getElementById('avatar').textContent = data.hero.avatar_initials || data.hero.name.charAt(0);
  const cta = document.getElementById('hero-cta');
  cta.textContent = data.hero.cta_label;
  cta.href = data.hero.cta_link;
  document.getElementById('footer-name').textContent = data.hero.name;

  // About
  document.getElementById('about-heading').textContent = data.about.heading;
  document.getElementById('about-body').textContent = data.about.body;

  // Skills
  const skillsGrid = document.getElementById('skills-grid');
  data.skills.forEach(skill => {
    const pill = document.createElement('span');
    pill.className = 'skill-pill';
    pill.textContent = skill;
    skillsGrid.appendChild(pill);
  });

  // Projects
  const projectsGrid = document.getElementById('projects-grid');
  data.projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const statusClass = p.status === 'Live' ? 'status-live' : 'status-progress';
    card.innerHTML = `
      <div class="project-head">
        <h3>${p.title}</h3>
        <span class="status-badge ${statusClass}">${p.status}</span>
      </div>
      <p>${p.description}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      ${p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">View project →</a>` : ''}
    `;
    projectsGrid.appendChild(card);
  });

  // Experience
  const timeline = document.getElementById('timeline');
  data.experience.forEach(e => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <h3>${e.role}</h3>
      <p class="timeline-meta">${e.company} · ${e.period}</p>
      <p>${e.description}</p>
    `;
    timeline.appendChild(item);
  });

  // Contact
  document.getElementById('contact-heading').textContent = data.contact.heading;
  document.getElementById('contact-body').textContent = data.contact.body;
  const contactLinks = document.getElementById('contact-links');
  contactLinks.innerHTML = `
    <a href="mailto:${data.contact.email}">Email</a>
    <a href="${data.contact.github}" target="_blank" rel="noopener">GitHub</a>
    <a href="${data.contact.upwork}" target="_blank" rel="noopener">Upwork</a>
  `;
}

loadContent().catch(err => {
  console.error('Failed to load content:', err);
  document.getElementById('hero-name').textContent = 'Content failed to load';
});
