function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


function showCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = `${cityInput.value}`;

  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let city = `${cityInput.value}`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

axios.get(apiUrl).then(showTemperature);
axios.get(apiUrl).then(showHumidity);
axios.get(apiUrl).then(showWind);
axios.get(apiUrl).then(function (response) {
  showDescription(response);
});
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);


let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
let city = "London";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;


function showTemperature(response) {
  let tempCity = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let message = `${temperature}`;

  tempCity.innerHTML = message;
}

axios.get(apiUrl).then(showTemperature);


function showHumidity(response) {
  
  let currentHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  let message = `${humidity}`;

  currentHumidity.innerHTML = message;
}

axios.get(apiUrl).then(showHumidity);


function showWind(response) {
let currentWind = document.querySelector("#wind");
let wind = response.data.wind.speed;
let windKph = Math.round(wind * 3.6);
let message = `${windKph}`;

currentWind.innerHTML = message;
}

axios.get(apiUrl).then(showWind);


function showDescription(response) {
  
  let currentDescription = document.querySelector("#weather-description");

  currentDescription.innerHTML = `${response.data.weather[0].description}`;
}

axios.get(apiUrl).then(function (response) {
  showDescription(response);
});


function showLocation(response) {
  let currentLocation = document.querySelector("#city");
  let city = response.data.name;
  let message = `${city}`;

  currentLocation.innerHTML = message;
}

axios.get(apiUrl).then(showLocation);


function showCurrentData(event) {
  event.preventDefault();

  function showPosition(position) {
    let latitude = Math.round(position.coords.latitude);
    let longitude = Math.round(position.coords.longitude);
    let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(showHumidity);
    axios.get(apiUrl).then(showWind);
    axios.get(apiUrl).then(function (response) {
      showDescription(response);
    });
    axios.get(apiUrl).then(showLocation);
  }

  navigator.geolocation.getCurrentPosition(showPosition);

}

let currentData = document.querySelector("#current-city-button");
currentData.addEventListener("click", showCurrentData);





