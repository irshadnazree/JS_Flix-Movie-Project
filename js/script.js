const global = {
  currentPage: window.location.pathname,
};
async function displayMovie() {
  const { results } = await fetchApi('movie/popular');

  results.forEach((movie) => {
    movieToDOM(movie);
  });
}

function movieToDOM(movie) {
  const div = document.createElement('div');
  div.classList.add('card');

  const a = document.createElement('a');
  a.setAttribute('href', `movie-details.html?id=${movie.id}`);
  a.appendChild(displayImage('movie', movie));

  div.appendChild(a);
  div.appendChild(movieBody(movie));

  document.querySelector('#popular-movies').appendChild(div);
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

async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];

  const movie = await fetchApi(`movie/${movieID}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  document.querySelector('#movie-details').appendChild(movieDetailsTop(movie));
  document
    .querySelector('#movie-details')
    .appendChild(movieDetailsBottom(movie));
}

function movieDetailsTop(movie) {
  const a = document.createElement('a');
  const aText = document.createTextNode('Visit Movie Homepage');
  a.href = movie.homepage;
  a.target = '_blank';
  a.classList.add('btn');
  a.appendChild(aText);

  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  ul.innerHTML = movie.genres.map((genre) => `<li>${genre.name}</li>`).join('');

  const h5 = document.createElement('h5');
  h5.textContent = 'Genres';

  const p3 = document.createElement('p');
  p3.textContent = movie.overview;

  const p2 = document.createElement('p');
  p2.classList.add('text-muted');
  p2.textContent = `Release Date: ${movie.release_date}`;

  const i = document.createElement('i');
  const p1 = document.createElement('p');
  const p1Text = document.createTextNode(
    ` ${movie.vote_average.toFixed(1)} / 10`
  );
  i.classList.add('fas', 'fa-star', 'text-primary');
  p1.appendChild(i);
  p1.appendChild(p1Text);

  const h2 = document.createElement('h2');
  h2.textContent = movie.title;

  const div2 = document.createElement('div');
  div2.appendChild(h2);
  div2.appendChild(p1);
  div2.appendChild(p2);
  div2.appendChild(p3);
  div2.appendChild(h5);
  div2.appendChild(ul);
  div2.appendChild(a);

  const div1 = document.createElement('div');
  div1.appendChild(displayImage('movie', movie));

  const top = document.createElement('div');
  top.classList.add('details-top');
  top.appendChild(div1);
  top.appendChild(div2);

  return top;
}

function movieDetailsBottom(movie) {
  const div = document.createElement('div');
  div.classList.add('list-group');

  const span = document.createElement('span');
  span.innerHTML = movie.production_companies
    .map((company) => `${company.name}`)
    .join(', ');

  const h4 = document.createElement('h4');
  h4.textContent = 'Productions Companies';

  const budgetLi = createMovieListItem(movie, 'budget');
  const revenuesLi = createMovieListItem(movie, 'revenue');
  const runtimeLi = createMovieListItem(movie, 'runtime');
  const statusLi = createMovieListItem(movie, 'status');

  const ul = document.createElement('ul');
  ul.appendChild(budgetLi);
  ul.appendChild(revenuesLi);
  ul.appendChild(runtimeLi);
  ul.appendChild(statusLi);

  const h2 = document.createElement('h2');
  h2.textContent = 'Movie Info';

  const bottom = document.createElement('div');
  bottom.classList.add('details-bottom');
  bottom.appendChild(h2);
  bottom.appendChild(ul);
  bottom.appendChild(h4);
  bottom.appendChild(span);
  bottom.appendChild(div);

  return bottom;
}

function createMovieListItem(movie, property) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const str = property;
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  const text = document.createTextNode(capitalizedStr + ': ');
  let value;
  switch (property) {
    case 'budget':
    case 'revenue':
      value = document.createTextNode(` $${numberWithCommas(movie[property])}`);
      break;
    case 'runtime':
      value = document.createTextNode(`${movie[property]} minutes`);
      break;
    case 'status':
      value = document.createTextNode(movie[property]);

      break;
  }
  span.appendChild(text);
  span.classList.add('text-secondary');
  li.appendChild(span);
  li.appendChild(value);
  return li;
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

  const a = document.createElement('a');
  a.setAttribute('href', `tv-details.html?id=${show.id}`);
  a.appendChild(displayImage('show', show));

  div.appendChild(a);
  div.appendChild(showBody(show));

  document.querySelector('#popular-shows').appendChild(div);
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

async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];

  const show = await fetchApi(`tv/${showID}`);

  displayBackgroundImage('tv', show.backdrop_path);

  document.querySelector('#show-details').appendChild(showDetailsTop(show));
  document.querySelector('#show-details').appendChild(showDetailsBottom(show));
  console.log(show);
}

function showDetailsTop(show) {
  const a = document.createElement('a');
  const aText = document.createTextNode('Visit show Homepage');
  a.href = show.homepage;
  a.target = '_blank';
  a.classList.add('btn');
  a.appendChild(aText);

  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  ul.innerHTML = show.genres.map((genre) => `<li>${genre.name}</li>`).join('');

  const h5 = document.createElement('h5');
  h5.textContent = 'Genres';

  const p3 = document.createElement('p');
  p3.textContent = show.overview;

  const p2 = document.createElement('p');
  p2.classList.add('text-muted');
  p2.textContent = `Release Date: ${show.first_air_date}`;

  const i = document.createElement('i');
  const p1 = document.createElement('p');
  const p1Text = document.createTextNode(
    ` ${show.vote_average.toFixed(1)} / 10`
  );
  i.classList.add('fas', 'fa-star', 'text-primary');
  p1.appendChild(i);
  p1.appendChild(p1Text);

  const h2 = document.createElement('h2');
  h2.textContent = show.name;

  const div2 = document.createElement('div');
  div2.appendChild(h2);
  div2.appendChild(p1);
  div2.appendChild(p2);
  div2.appendChild(p3);
  div2.appendChild(h5);
  div2.appendChild(ul);
  div2.appendChild(a);

  const div1 = document.createElement('div');
  div1.appendChild(displayImage('show', show));

  const top = document.createElement('div');
  top.classList.add('details-top');
  top.appendChild(div1);
  top.appendChild(div2);

  return top;
}

function showDetailsBottom(show) {
  const div = document.createElement('div');
  div.classList.add('list-group');

  const span = document.createElement('span');
  span.innerHTML = show.production_companies
    .map((company) => `${company.name}`)
    .join(', ');

  const h4 = document.createElement('h4');
  h4.textContent = 'Productions Companies';

  const numberEpLi = createShowListItem(
    'number_of_episodes',
    'Number Of Episodes',
    show
  );
  const latestLi = createShowListItem(
    'last_episode_to_air',
    'Last Episode To Air',
    show
  );
  const statusLi = createShowListItem('status', 'Status', show);

  const ul = document.createElement('ul');
  ul.appendChild(numberEpLi);
  ul.appendChild(latestLi);
  ul.appendChild(statusLi);

  const h2 = document.createElement('h2');
  h2.textContent = 'show Info';

  const bottom = document.createElement('div');
  bottom.classList.add('details-bottom');
  bottom.appendChild(h2);
  bottom.appendChild(ul);
  bottom.appendChild(h4);
  bottom.appendChild(span);
  bottom.appendChild(div);

  return bottom;
}

function createShowListItem(property, text, show) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const spanText = document.createTextNode(`${text}: `);
  const spanClass = 'text-secondary';
  let liText;

  switch (property) {
    case 'number_of_episodes':
      liText = document.createTextNode(show.number_of_episodes);
      break;
    case 'last_episode_to_air':
      liText = document.createTextNode(show.last_episode_to_air.name);
      break;
    case 'status':
      liText = document.createTextNode(show.status);
      break;
  }

  span.appendChild(spanText);
  span.classList.add(spanClass);
  li.appendChild(span);
  li.appendChild(liText);

  return li;
}

function displayImage(type, data) {
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  data.poster_path
    ? img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${data.poster_path}`
      )
    : img.setAttribute('src', 'images/no-image.jpg');

  type === 'movie'
    ? img.setAttribute('alt', data.title)
    : img.setAttribute('alt', data.name);
  return img;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayBackgroundImage(type, bgPath) {
  const div = document.createElement('div');
  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;
  div.style.backgroundSize = 'cover';
  div.style.backgroundPosition = 'center';
  div.style.backgroundRepeat = 'no-repeat';
  div.style.height = '105.5vh';
  div.style.width = '100vw';
  div.style.position = 'absolute';
  div.style.top = '0';
  div.style.left = '0';
  div.style.zIndex = '-1';
  div.style.opacity = '0.2';

  type === 'movie'
    ? document.querySelector('#movie-details').appendChild(div)
    : document.querySelector('#show-details').appendChild(div);
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
    case '/index.html':
      displayMovie();
      break;
    case '/shows.html':
      displayShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
