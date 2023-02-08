/* Psuedo code starts here  */

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// declare all variables 
var apiKey = "311ffd901dcf798ae2fbc6d7d4ce62de";
var searchInput = document.querySelector("#search-input");
var submitBtn = document.querySelector("submit-btn");

var forecast1 = document.querySelector('#forecast1');
var forecast2 = document.querySelector('#forecast2');
var forecast3 = document.querySelector('#forecast3');
var forecast4 = document.querySelector('#forecast4');
var forecast5 = document.querySelector('#forecast5');

function startApi() {
  // function for local storage 
  localStorage.setItem();
  // if cities are saved, display list of cities 
}

// event listener goes here for click 
submit.addEventListener("click", function(event) {
  // prevent default for form input 
  event.preventDefault();

 
});
startApi()

// API fetch method 
// can this be template literal??
var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

fetch(requestURL)
.then(function(response) {
  return response.json();
})
.then(function (data) {
   console.log(data);
  }
  // do we want a catch error method?
  .catch(err => console.error(err)
  ));
  
// API for GeoCoding URL 
// can this be template literal??
var getGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=5&appid=311ffd901dcf798ae2fbc6d7d4ce62de`;

fetch(getGeocode)
.then(function(response) {
  return response.json();
})
.then(function (geodata) {
   console.log(geodata);
  });

/* 
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
*/