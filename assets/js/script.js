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
var submitBtn = document.querySelector("#submit-btn");

var cityBtn = document.querySelector("#city-btn"); 
var cityName = document.querySelector(".city-name");
var dateEl = document.querySelector('.date');
var condEl =document.querySelector('.cond');
var tempEl = document.querySelector('.temp');
var windEl = document.querySelector('.wind');
var humidEl = document.querySelector('.humid');

var forecast1 = document.querySelector('#forecast1');
var forecast2 = document.querySelector('#forecast2');
var forecast3 = document.querySelector('#forecast3');
var forecast4 = document.querySelector('#forecast4');
var forecast5 = document.querySelector('#forecast5');

var forecast = document.querySelector('.forecast');

function renderCurrent (weather) {
  // console.log(weather);

  cityName.textContent = weather.city.name;
  tempEl.textContent = `temp: ${weather.list[0].main.temp}`;
}

function renderForecast (weather) {
  forecast.textContent = "";

  for (let index = 0; index < weather.list.length; index=index+8) {
    //const element = array[index];
    var date = new Date(weather.list[index].dt * 1000);
    var formattedDate = date.toLocaleDateString();
    console.log(weather.list[index]);
    
    var card = document.createElement("div");
    var dateCard = document.createElement("p");
    var icon = document.createElement("img");

    card.setAttribute("class", "days");
    dateCard.textContent = formattedDate;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.list[index].weather[0].icon}.png`)
    forecast.appendChild(card);
    card.appendChild(dateCard);
    dateCard.append(icon);
  }
}

function saveCity() {
  var cityHistory = JSON.parse(localStorage.getItem("history")) || [];
  cityHistory.push(searchInput.value);
  localStorage.setItem("history", JSON.stringify(cityHistory));
}

function startApi() {
  var getGeocode = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&units=imperial&appid=${apiKey}`;

  fetch(getGeocode)
    .then(function (response) {
      return response.json();
    })
    .then(function (geodata) {
      

      renderCurrent(geodata);
      renderForecast(geodata);
      saveCity();
    })
    // do we want a catch error method?
    .catch(err => console.error(err)
    );
  // function for local storage 
  //localStorage.setItem();
  // if cities are saved, display list of cities 
}

// event listener goes here for click 
submitBtn.addEventListener("click", function (event) {
  // prevent default for form input 
  event.preventDefault();
  startApi()

});






// API for GeoCoding URL 
// can this be template literal??


// add event listener to create buttons element?
var newBtn = document.createElement('button');

// add city text into buttons - from local storage
//cityBtn.textContent = ;

// populate info for each 5-day forecast 
var addForecastInfo = document.createElement('p');


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