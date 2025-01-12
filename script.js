const weatherForm = document.querySelector(".weatherRorm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "e3a7aca6379e5a7be35a53d539fbad07";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim(); // Use .value and trim whitespace

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            showWeatherData(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();
}

function showWeatherData(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
    } = data;

    card.textContent = ""; // Clear card content
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 300: 
            return "🌩️"; 
        case weatherId >= 300 && weatherId < 400: 
            return "🌦️"; 
        case weatherId >= 500 && weatherId < 600: 
            return "🌧️";
        case weatherId >= 600 && weatherId < 700: 
            return "❄️"; 
        case weatherId >= 700 && weatherId < 800: 
            return "🌫️";
        case weatherId === 800:
            return "☀️"; 
        case weatherId === 801: 
            return "🌤️"; 
        case weatherId === 802: 
            return "⛅"; 
        case weatherId === 803 || weatherId === 804: 
            return "☁️"; 
        default:
            return "🌍"; 
    }
}


function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    card.textContent = ""; // Clear previous content
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
