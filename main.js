window.addEventListener("DOMContentLoaded", main);
const ACCESS_KEY = "";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

// fetch() Méthode I
const retrieveWeatherData = async (CITY) => {
    const res = await fetch(API_URL + CITY + `&appid=${ACCESS_KEY}`);
    if (!res.ok) {
        console.error(
            "🚀 ~ retrieveWeatherData ~ HTTP-Error:",
            `${res.status} ${res.statusText}`
        );
    }
    let data = await res.json();
    return data;
};

// fetch() Méthode II
const checkWeather = async (CITY) => {
    const res = await fetch(API_URL + CITY + `&appid=${ACCESS_KEY}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) =>
            console.error("🚀 ~ checkWeather ~ HTTP-Error:", error)
        );
    return res;
};

const displayWeatherFromCity = async (CITY) => {
    let weatherIcon = document.querySelector(".weather-icon");
    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    const weatherContainer = document.querySelector(".weather");
    const handleMsgError = document.querySelector(".error");

    // let weatherData = await retrieveWeatherData(CITY);
    // or
    let weatherData = await checkWeather(CITY);

    if (weatherData.cod == "400") {
        handleMsgError.innerHTML = "<p>La ville doit être renseigné</p>";
        handleMsgError.classList.remove("hidden");
        weatherContainer.classList.add("hidden");
    } else if (weatherData.cod == "404") {
        handleMsgError.innerHTML = "<p>Nom de ville non valide</p>";
        handleMsgError.classList.remove("hidden");
        weatherContainer.classList.add("hidden");
    } else {
        try {
            city.innerHTML = weatherData["name"];
            temp.innerHTML = Math.round(weatherData.main["temp"]) + "°C";
            humidity.innerHTML = weatherData.main["humidity"] + "%";
            wind.innerHTML = Math.round(weatherData.wind["speed"]) + " km/h";
            let weatherMain = weatherData.weather[0].main;
            if (weatherMain.toLowerCase() == "Clouds".toLowerCase()) {
                weatherIcon.src = "img/clouds.png";
            } else if (weatherMain.toLowerCase() == "Clear".toLowerCase()) {
                weatherIcon.src = "img/clouds.png";
            } else if (weatherMain.toLowerCase() == "Rain".toLowerCase()) {
                weatherIcon.src = "img/rain.png";
            } else if (weatherMain.toLowerCase() == "Drizzle".toLowerCase()) {
                weatherIcon.src = "img/drizzle.png";
            } else if (weatherMain.toLowerCase() == "Mist".toLowerCase()) {
                weatherIcon.src = "img/mist.png";
            } else if (
                weatherMain.toLowerCase() == "Thunderstorm".toLowerCase()
            ) {
                weatherIcon.src = "img/thunderstorm.png";
            }
            handleMsgError.classList.add("hidden");
            weatherContainer.classList.remove("hidden");
        } catch (error) {
            console.error(
                "🚀 ~ main ~ error-message-weatherData:",
                error.message
            );
        }
    }
};

async function main() {
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    searchBtn.addEventListener("click", () => {
        displayWeatherFromCity(searchBox.value);
        searchBox.value = "";
    });
}
