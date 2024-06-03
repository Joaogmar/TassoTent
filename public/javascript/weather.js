async function fetchWeatherData(lat, lng) {
    const apiKey = '0e8814803871411c979143439240306';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();

        const windData = {
            speed_kph: weatherData.current.wind_kph,
            direction_degrees: weatherData.current.wind_degree,
            direction_compass: weatherData.current.wind_dir
        };

        return { ...weatherData, wind: windData };
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

export { fetchWeatherData };