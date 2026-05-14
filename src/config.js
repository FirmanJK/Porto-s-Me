module.exports = {
  email: 'jatikusuma76@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/FirmanJK',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/dika__dik?igsh=NmMzM2M3MHNmbjZ6',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/mochammad-firmandika-jati-kusuma-9ba1b724b/',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Certifications',
      url: '/#certifications',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#10b981',
    navy: '#1e293b',
    darkNavy: '#0f172a',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '30px',
    duration: 600,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 0.95,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
