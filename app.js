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
const reset = document.querySelector("#reset");
const results = document.querySelector(".results");
var movieArea = document.querySelector("#movie-area");

const loadMore = document.querySelector(".loadMore");
var page = 1;
var otherP = 1;
var movieName = "";
const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;

//Display default without form submit
window.onload = function () {
  getPlayingResults();
}
// 1. control form submit behavior with JS
movieForm.addEventListener("submit", getResults);
loadMore.addEventListener("click", showMore);

reset.addEventListener("click", function() {
  movieArea.innerHTML = "";
  page = 1;
  getPlayingResults();
});

function showMore() {
  page++;
  getMoreResults();
}

async function getMoreResults() {
  const playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  console.log("api URL is", playingURL, page);
  // 2. On form submit, go to the Giphy API
  const response = await fetch(playingURL);
  const responseData = await response.json();
  console.log("response stuff", response, responseData.results);
  responseData.results.forEach(element => displayMovies(element.poster_path, element.original_title, element.vote_average));
  loadMore.classList.remove("hidden");
  search.value = "";
}

//Create a new function, getResults, that get results from the API. 
async function getResults(evt) {
    evt.preventDefault();
    const movieInput = evt.target.searchBar;
    const movie = movieInput.value;
    movieName = movie;
    console.log("Movie search", movie)
    const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${otherP}&include_adult=false&query=${movie}
    //`;
    console.log("api URL is", apiSearchUrl);
        
    // 2. On form submit, go to the Giphy API
    const response = await fetch(apiSearchUrl);
    const responseData = await response.json();
    console.log("response stuff", response, responseData.results);
    movieArea.innerHTML = "";
    responseData.results.forEach(element => displayMovies(element.poster_path, element.original_title, element.vote_average));
    loadMore.classList.add("hidden");  
    search.value = "";
}

async function getPlayingResults() {
  const apiPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}
  `;
  console.log("api URL is", apiPlayingUrl);
      
  // 2. On form submit, go to the Giphy API
  const response = await fetch(apiPlayingUrl);
  const responseData = await response.json();
  console.log("response stuff", response, responseData.results);
  movieArea.innerHTML = "";
  responseData.results.forEach(element => displayMovies(element.poster_path, element.original_title, element.vote_average));
  loadMore.classList.remove("hidden");
}

function displayMovies(poster, title, rating) {
    movieArea.innerHTML = movieArea.innerHTML + `<div class="myMovie">
      <img src="https://image.tmdb.org/t/p/w500${poster}" width="500" height="750" class="pic" alt="${title}"/>` + `<br><div class="title">${title}</div>` + `<div class="rating"><img src="https://www.pinclipart.com/picdir/big/31-311255_star-clipart-star-with-black-background-png-download.png" width="20px" height="20px"/>${rating}</div></myMovie>`
    ;
  } 
  
  
function handleFormSubmit(evt) {
    movieArea.innerHTML = "";
    const term = apiUrl + movie.value;
    generateHTML(responseData);
}