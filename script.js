document.addEventListener("DOMContentLoaded", () => {
    const currentLocationDisplay = document.getElementById("currentLocation");
    const todayWeatherDataContainer = document.getElementById("todayWeatherData");
    const fiveDayForecastContainer = document.getElementById("interactiveForecast");
    const additionalWeatherDataContainer = document.getElementById("additionalWeatherData");
    const locationInput = document.getElementById("location");
    const apiKey = "b129b1dabde7fa81134c60c161446d16";


    function updateTodayWeatherData(data) {
        const { name, main, weather } = data;
        const { temp, humidity } = main;
        const weatherDescription = weather[0].description;
        const todayWeatherHTML = `
            <h3>${name} - Today's Weather</h3>
            <p>Date: ${getCurrentDate()}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Weather: ${weatherDescription}</p>
        `;
        todayWeatherDataContainer.innerHTML = todayWeatherHTML;
    }

    function updateAdditionalWeatherData(data) {
        const additionalWeatherHTML = `
            <h4>Additional Weather Details</h4>
            <p>Real Feel: ${data.main.feels_like}°C</p>
            <p>UV Index: ${data.uvi}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Cloud Cover: ${data.clouds.all}%</p>
            <p>Visibility: ${data.visibility / 1000} km</p>
        `;
        additionalWeatherDataContainer.innerHTML = additionalWeatherHTML;
    }

    function updateForecastWeatherData(data) {
        const { city, list } = data;
        currentLocationDisplay.innerText = `${city.name}, ${city.country}`;
    
        let forecastHTML = `
            <div class="five-day-forecast-heading">
                ${city.name} - 5 Day Weather Forecast
            </div>
            <div class="five-day-forecast-grid">
        `;
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        list.slice(0, 5).forEach((forecast, index) => {
            const date = new Date(forecast.dt_txt);
            date.setHours(0, 0, 0, 0);
    
            if (date >= today) {
                const forecastDate = new Date(date);
                forecastDate.setDate(date.getDate() + index);
    
                forecastHTML += `
                    <div class="weather-block">
                        <p>Date: ${forecastDate.toDateString()}</p>
                        <p>Temperature: ${forecast.main.temp}°C</p>
                        <p>Weather: ${forecast.weather[0].description}</p>
                        <!-- Add more relevant information here -->
                    </div>
                `;
            }

            if ((index + 1) % 3 === 0) {
                forecastHTML += `</div><div class="five-day-forecast-grid">`;
            }
        });

        forecastHTML += `</div>`;
    fiveDayForecastContainer.innerHTML = forecastHTML;
}

    async function getWeatherData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error("Weather data not available for the given location.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }

    async function getForecastData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error("Forecast data not available for the given location.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            return null;
        }
    }

    function getCurrentDate() {
        const today = new Date();
        return today.toDateString();
    }
    
    document.getElementById("searchBtn").addEventListener("click", async () => {
        const location = locationInput.value;
        const todayWeatherData = await getWeatherData(location);
        const forecastWeatherData = await getForecastData(location);

        if (todayWeatherData) {
            updateTodayWeatherData(todayWeatherData);
            updateAdditionalWeatherData(todayWeatherData);
        }

        if (forecastWeatherData) {
            updateForecastWeatherData(forecastWeatherData);
        }
    });

    document.getElementById("searchBtn").addEventListener("click", async () => {
        if (weatherDescription === 'rain') {
        document.body.style.backgroundImage = "url('https://sukhbinder.files.wordpress.com/2012/10/wpid-rain.jpg')";
        }
        else if (weatherDescription === 'clouds') {
            document.body.style.backgroundImage = "url('https://tenor.com/view/clouds-sky-sun-aesthetic-gif-17342806')";
        } 
        else if (weatherDescription === 'clear') {
            document.body.style.backgroundImage = "url('https://i...')";
        }
        else if (weatherDescription === 'haze') {
              document.body.style.backgroundImage = "url('https://live.staticflickr.com/7192/6814624698_2a45c14996_n.jpg')";
        } 
        else {
            document.body.style.backgroundImage= "url(whether.jpg)";
        }
    });
});