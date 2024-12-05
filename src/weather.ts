import axios from 'axios';

export const getWeather = async (city: string): Promise<string> => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY!;
    const apiUrl = process.env.WEATHER_API!;
    const url = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const { data } = await axios.get(url);

        if (data.error) return `${data.error.message}`;

        const temperature = data.current.temp_c;
        return `Weather in ${city}: ${temperature}°C`;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) { return "can't fetch temperature of location provided" }
        return `Failed to fetch weather data.`;
    }
};