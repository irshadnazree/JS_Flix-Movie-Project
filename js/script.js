const global = {
  currentPage: window.location.pathname,
};
async function displayMovie() {
  const { results } = await fetchApi('movie/popular');

  results.forEach((tv) => {
    movieToDOM(tv);
  });
}

function movieToDOM(movie) {
  const div = document.createElement('div');
  div.classList.add('card');

  div.appendChild(movieImage(movie));
  div.appendChild(movieBody(movie));

  document.querySelector('#popular-movies').appendChild(div);
}

function movieImage(movie) {
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  movie.poster_path
    ? img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      )
    : img.setAttribute('src', 'images/no-image.jpg');
  img.setAttribute('alt', movie.title);

  return img;
}

function movieBody(movie) {
  const small = document.createElement('small');
  small.classList.add('text-muted');
  small.textContent = `Release: ${movie.release_date}`;

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.appendChild(small);

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.textContent = movie.title;

  const div = document.createElement('div');
  div.classList.add('card-body');
  div.appendChild(h5);
  div.appendChild(p);

  return div;
}

// tv show

async function displayShows() {
  const { results } = await fetchApi('tv/popular');

  results.forEach((show) => {
    showToDOM(show);
  });
}
function showToDOM(show) {
  const div = document.createElement('div');
  div.classList.add('card');

  div.appendChild(showImage(show));
  div.appendChild(showBody(show));

  document.querySelector('#popular-shows').appendChild(div);
}

function showImage(show) {
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  show.poster_path
    ? img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${show.poster_path}`
      )
    : img.setAttribute('src', 'images/no-image.jpg');
  img.setAttribute('alt', show.name);

  return img;
}

function showBody(show) {
  const small = document.createElement('small');
  small.classList.add('text-muted');
  small.textContent = `Aired Date: ${show.first_air_date}`;

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.appendChild(small);

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.textContent = show.name;

  const div = document.createElement('div');
  div.classList.add('card-body');
  div.appendChild(h5);
  div.appendChild(p);

  return div;
}

async function fetchApi(endpoint) {
  const API_KEY = '6768cb488583b784976b97918270df14';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

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
      displayMovie();
      break;
    case '/shows.html':
      displayShows();
      break;
    case '/tv-details.html':
      break;
    case '/tv-details.html':
      break;
    case '/search.html':
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
