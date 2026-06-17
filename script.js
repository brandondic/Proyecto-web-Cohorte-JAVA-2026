const profiles = [
  {
    name: 'Alum Ejemplo',
    role: 'Estudiante de JAVA',
    bio: 'Descripción breve del alumno. Intereses, stack tecnológico o lo que quiera destacar.',
    image: 'images/gatoHacker.png', // Ruta de la imagen de perfil
    banner: '#2563eb', // Color del banner detrás del avatar
    github: '#',
    linkedin: '#',
    cvPath: 'CVs/CV-AlumEjemplo/index.html',
  },
  {
    name: 'Renato Campos',
    role: 'Estudiante de JAVA',
    bio: 'Apasionado por el desarrollo de software, con experiencia en proyectos académicos y personales. Interesado en aprender nuevas tecnologías y mejorar mis habilidades de programación.',
    image: 'CVs/Cv-RenaCampos/src/perfil.jpg', // Ruta de la imagen de perfil
    banner: '#2563eb', // Color del banner detrás del avatar
    github: '#',
    linkedin: '#',
    cvPath: 'CVs/Cv-RenaCampos/index.html',
  },
  {
    name: 'Valentina Llantèn Robles',
    role: 'Estudiante de JAVA',
    bio: 'Me considero una persona proactiva, responsable y con gran capacidad de aprendizaje. Me gusta trabajar en equipo y estoy siempre dispuesta a enfrentar nuevos desafíos. Mi objetivo es seguir creciendo profesionalmente y aportar valor a los proyectos en los que participo.',
    banner: '#db2777',
    github: 'https://github.com/CodeMochi-dev',
    linkedin: 'https://www.linkedin.com/in/valentina-llant%C3%A9n-robles-a2684a276/',
    cvPath: 'CVs/CV-ValentinaLLanten/index.html',
  },
  {
    name: 'Brandon Inostroza',
    role: 'QA Automation · Full Stack Java',
    bio: 'Ingeniero en Informática con base técnica sólida en desarrollo de aplicaciones y automatización de pruebas. Actualmente profundizando en el ecosistema Java a través del Bootcamp Full Stack de Generation Chile.',
    image: 'CVs/CV-BDIC/img/foto.jpg',
    banner: '#0891b2',
    github: 'https://github.com/brandondic',
    linkedin: 'https://linkedin.com/in/brandondic',
    cvPath: 'CVs/CV-BDIC/index.html',
  },
];

const AVATAR_COLORS = [
  '#2563eb',
  '#e07b54',
  '#16a34a',
  '#9333ea',
  '#ca8a04',
  '#db2777',
  '#0891b2',
  '#65a30d',
];

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const htmlElement = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const icon = themeToggle.querySelector('.theme-toggle__icon');

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    htmlElement.setAttribute('data-theme', isLight ? 'light' : '');
    themeToggle.classList.toggle('light-mode', isLight);
    themeToggle.setAttribute('aria-checked', String(isLight));
    icon.textContent = isLight ? '☀️' : '🌙';
  };

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
};

/* ==========================================================================
   GALLERY
   ========================================================================== */

const getInitials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

const createCardHTML = (profile, index) => {
  const initials = getInitials(profile.name);
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const bannerColor = profile.banner || avatarColor;

  // Determinar qué avatar mostrar
  let avatarHTML;
  
  if (profile.image) {
    // Si tiene imagen, mostrar foto
    avatarHTML = `<img src="${profile.image}" alt="Foto de perfil de ${profile.name}" class="card__image">`;
  } else {
    // Si no, mostrar iniciales con color
    avatarHTML = `<div class="card__avatar" style="background-color: ${avatarColor}" aria-hidden="true">${initials}</div>`;
  }

  const githubDisabled = !profile.github || profile.github === '#' ? ' card__link--disabled' : '';
  const linkedinDisabled = !profile.linkedin || profile.linkedin === '#' ? ' card__link--disabled' : '';

  return `
    <article class="card">
      <div class="card__avatar-wrapper">
        <div class="card__banner" style="background-color: ${bannerColor}"></div>
        ${avatarHTML}
      </div>
      <div class="card__body">
        <h3 class="card__name">${profile.name}</h3>
        <p class="card__role">${profile.role}</p>
        <p class="card__bio">${profile.bio}</p>
      </div>
      <nav class="card__links" aria-label="Links de ${profile.name}">
        <a class="card__link card__link--primary" href="${profile.cvPath}">Ver CV</a>
        <a class="card__link${githubDisabled}" href="${profile.github}" target="_blank" rel="noopener noreferrer" ${githubDisabled ? 'aria-disabled="true"' : ''}>GitHub</a>
        <a class="card__link${linkedinDisabled}" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" ${linkedinDisabled ? 'aria-disabled="true"' : ''}>LinkedIn</a>
      </nav>
    </article>
  `;
};

const renderGallery = () => {
  const grid = document.querySelector('#profiles-grid');
  if (!grid) return;

  grid.innerHTML = profiles.map(createCardHTML).join('');
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderGallery();

  const countEl = document.querySelector('#dev-count');
  if (countEl) countEl.textContent = profiles.length;
});
