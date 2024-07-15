document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetail = document.querySelector('.weather-detail');

    search.addEventListener('click', () => {
        const APIkey = 'a70e403017dc6a5a6c779037ff3deb14';
        const city = document.querySelector('.search-box input').value;

        if (city === '') {
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
            .then(response => response.json())
            .then(json => {
                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-detail .humidity span');
                const wind = document.querySelector('.weather-detail .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'clear.png';
                        break;
                    case 'Rain':
                        image.src = 'rain.png';
                        break;
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'cloud.png';  // Corrected to 'Clouds' for Cloudy weather
                        break;
                    case 'Mist':
                        image.src = 'mist.png';
                        break;
                    default:
                        image.src = 'cloud.png';
                        break;
                }

                temperature.textContent = `${json.main.temp} °C`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${json.wind.speed} Km/h`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
});
