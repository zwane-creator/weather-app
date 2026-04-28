function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempValueElement = document.querySelector(".temp");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  if (!tempValueElement || !cityElement) {
    console.error("Temperature or city element not found in HTML!");
    return;
  }

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  tempValueElement.innerHTML = temperature; // Only the number

  getweatherForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (!city) return;

  let apiKey = "dca402bf6e5cod4bb210fdbta88ea4c3"; // ← Replace with real key later
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function getweatherForecast(city) {
  let apiKey = "dca402bf6e5cod4bb210fdbta88ea4c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

// Show current date on load
document.querySelector("#time").innerHTML = formatDate(new Date());

// Inject forecast
function displayWeatherForecast(response) {
  console.log(response.data);
  let weatherForecast = document.querySelector("#weatherForecast");

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="forecast-day">
      <div class="forecast-date">${formatDay(day.time)}</div>
      <div><img src="${day.condition.icon_url}" class="forecast-icon" /></div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature"><strong>${Math.round(
            day.temperature.maximum,
          )}°</strong></div>
          <div class="forecast-temperature">${Math.round(
            day.temperature.minimum,
          )}°</div>
        </div>
      </div>
    `;
    }
  });

  weatherForecast.innerHTML = forecastHTML;
}

// Event listeners
document.querySelector("#search-form").addEventListener("submit", search);
