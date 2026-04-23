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

// Event listeners
document.querySelector("#search-form").addEventListener("submit", search);

// Show current date on load
const currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
