const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('.search');

getMovies(APIURL);

async function getMovies(url){
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);
  showMovies(respData.results);
  
}

function showMovies(Movies){
  main.innerHTML='';
  const filteredMovies = Movies.filter(el=>el.backdrop_path !== null);
  
  filteredMovies.forEach(movie =>{

    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${lookColor(vote_average)}">${vote_average}</span>
      </div>
      <div class=overview>${overview}</div>`

    main.appendChild(movieEl);

  })
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  
  const searchTerm = search.value;

  if(searchTerm){
    getMovies(SEARCHAPI + searchTerm);
    search.value ='';
  }
})

function lookColor(num){
  if(num>= 7.5){
    return "green"
  }else if(6.5 <= num){
    return "orange"
  }else{
    return "red"
  }
}



