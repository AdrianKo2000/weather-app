const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherIcon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const error = document.querySelector(".error");
const errorMsg = document.querySelector(".e-message");

const info = document.querySelector(".info");

const apiKey = "99960750d99fc3074544c0d34c9c9678";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get weather data from API and update the DOM
const getWeather = async (cityName) => {
  try {

    if (!cityName) {
        throw new Error("City name is empty");
      }

    // Fetch weather data from API
    const res = await fetch(apiURL + cityName + `&appid=${apiKey}`);
    const data = await res.json();
    

    // // Clear previous error message
    error.style.display = "none";
    info.style.display = "flex";

    // Check if the API returned a 404 error (city not found)
    if (data.cod === "404") {
      // Display error message
      info.style.display = "none";
      error.style.display = "flex";
      errorMsg.innerHTML = "City Not Found.";
    } else {
      // Extract the main weather condition from the data
      const weather = data.weather[0].main;

      // Set weather icon base on the main weather condition
      switch (weather) {
        case "Clouds":
          weatherIcon.src = "./img/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "./img/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "./img/rain.png";
          break;
        case "Snow":
          weatherIcon.src = "./img/snow.png";
          break;
        case "Drizzle":
          weatherIcon.src = "./img/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "./img/mist.png";
          break;
        default:
          weatherIcon.src = "./img/clear.png";
          break;
      }
      // Set the temperature from the data
      temp.innerHTML = `${Math.round(data.main.temp)}°C`;
      // Set the city name from the data
      city.innerHTML = data.name;

      // Set the humidity from the data
      humidity.innerHTML = `${data.main.humidity}%`;
      // Set the wind speed from the data
      wind.innerHTML = `${data.wind.speed} km/h`;
    }
  } catch (e) {
    // Display error message
    info.style.display = "none";
    error.style.display = "flex";
    errorMsg.innerHTML = "Please Enter a City name.";

  }
};

searchBtn.addEventListener("click", () => {
  // Search for a city
  getWeather(searchInput.value);
  searchInput.value = "";
});
