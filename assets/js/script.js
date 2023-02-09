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
var condEl = document.querySelector('.cond');
var tempEl = document.querySelector('.temp');
var windEl = document.querySelector('.wind');
var humidEl = document.querySelector('.humid');

var forecast = document.querySelector('.forecast');

// push text info to display div 
function renderCurrent(weather) {
  console.log(weather);
  cityName.textContent = weather.city.name;
  dateEl.textContent = `${weather.list[0].dt_txt}`;

  condEl.setAttribute("src", `http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`);
  tempEl.textContent = `Temp: ${weather.list[0].main.temp}°F`;
  windEl.textContent = `Wind: ${weather.list[0].wind.speed}MPH`;
  humidEl.textContent = `Humidity: ${weather.list[0].main.humidity}%`;
}
// get info for 5-day forecast 
function renderForecast(weather) {
  forecast.textContent = "";

  for (let index = 0; index < weather.list.length; index = index + 8) {
    //const element = array[index];
    var date = new Date(weather.list[index].dt * 1000);
    var formattedDate = date.toLocaleDateString();
    console.log(weather.list[index]);

    var card = document.createElement("div");
    var dateCard = document.createElement("p");
    var icon = document.createElement("img");

    card.setAttribute("class", "days");
    dateCard.textContent = formattedDate;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.list[index].weather[0].icon}.png`);
    forecast.appendChild(card);
    card.appendChild(dateCard);
    dateCard.append(icon);
  }
}
// save cities to local storage, display list of cities 
function saveCity() {
  var cityHistory = JSON.parse(localStorage.getItem("history")) || [];
  cityHistory.push(searchInput.value);
  localStorage.setItem("history", JSON.stringify(cityHistory));

}
// start Fetch API request 
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
}

// event listener goes here for click 
submitBtn.addEventListener("click", function (event) {
  // prevent default for form input 
  event.preventDefault();
  // require input in search
  if (!submitBtn) {
    alert('You need a search input value!');
    return;
  }
  // create button to display list of cities in local storage 
  var createBtn = document.createElement("button");
  createBtn.setAttribute("class", "city-btn");
  var BtnList = document.querySelector("#btn-list");
  BtnList.appendChild(createBtn);
  createBtn.textContent = localStorage.getItem(history);

  startApi()

});



// add event listener to create buttons element?
var newBtn = document.createElement('button');

// populate info for each 5-day forecast 
var addForecastInfo = document.createElement('p');

