console.log("page loaded");

//Global Constants
const apiKey = "OOGABOOGA";
const limit = 9;
const rating = "g";

//DOM Reference Consts
const movieForm = document.querySelector("form");
const movieHeader = document.querySelector("#header");
const attribution = document.querySelector("#attribution");
const topper = document.querySelector(".top");
const search = document.querySelector("#search-bar");
const submit = document.querySelector("#submit");
const results = document.querySelector(".results");
const movieArea = document.querySelector("#movie-area");

const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

//Display default without form submit
window.onload = function () {
  getPlayingResults();
}
// 1. control form submit behavior with JS
movieForm.addEventListener("submit", getResults);

//Create a new function, getResults, that get results from the API. 
async function getResults(evt) {
    evt.preventDefault();
    const movieInput = evt.target.searchBar;
    const movie = movieInput.value;
    console.log("Movie search", movie)
    const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${movie}
    //`;
    console.log("api URL is", apiSearchUrl);
        
    // 2. On form submit, go to the Giphy API
    const response = await fetch(apiSearchUrl);
    const responseData = await response.json();
    console.log("response stuff", response, responseData.results);
    responseData.results.forEach(element => displayMovies(element.poster_path, element.original_title, element.vote_average));
}

async function getPlayingResults() {
  const apiPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1
  `;
  console.log("api URL is", apiPlayingUrl);
      
  // 2. On form submit, go to the Giphy API
  const response = await fetch(apiPlayingUrl);
  const responseData = await response.json();
  console.log("response stuff", response, responseData.results);
  responseData.results.forEach(element => displayMovies(element.poster_path, element.original_title, element.vote_average));
}

function displayMovies(poster, title, rating) {
    movieArea.innerHTML = movieArea.innerHTML + `<div class="myMovie">
      <img src="https://image.tmdb.org/t/p/w500${poster}" class="pic" alt="${title}"/>` + `<br><div class="title">${title}</div>` + `<div class="rating">${rating}</div></myMovie>`
    ;
  } 
  
function handleFormSubmit(evt) {
    movieArea.innerHTML = "";
    const term = apiUrl + movie.value;
    generateHTML(responseData);
}