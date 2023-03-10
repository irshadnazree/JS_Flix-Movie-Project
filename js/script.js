const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') == global.currentPage)
      link.classList.add('active');
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
      console.log('home');
      break;
    case '/shows.html':
      console.log('show');
      break;
    case '/movie-details.html':
      console.log('movie');
      break;
    case '/tv-details.html':
      console.log('tv');
      break;
    case '/search.html':
      console.log('search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
