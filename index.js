function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let tempValueElement = document.querySelector(".temp");
  let cityElement = document.querySelector("#current-city");

  if (!tempValueElement || !cityElement) {
    console.error("Temperature or city element not found in HTML!");
    return;
  }

  cityElement.innerHTML = response.data.city;
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
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

// Event listeners
document.querySelector("#search-form").addEventListener("submit", search);

// Show current date on load
const currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
