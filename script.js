const apiKey = ""; //write your openwither api key here
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherImages = {
  Clouds: "images/clouds.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
  Clear: "images/clear.png",
};

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    weatherIcon.src = weatherImages[data.weather[0].main];

    document.querySelector(".weather").style.display = "block";

    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
