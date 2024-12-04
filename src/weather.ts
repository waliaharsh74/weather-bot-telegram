export const getWeather = async (city: string): Promise<string> => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY!;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no
`;

    try {
        const response = await fetch(url);
        // console.log(object);
        const data = await response.json();
        // const weatherDescription = data.weather[0].description;
        if (data.error) return `${data.error.message}`;
        const temperature = data.current.temp_c;
        return `Weather in ${city}: ${temperature}°C`;
    } catch (error) {
        console.log(error);
        return `Failed to fetch weather data.`;
    }
};