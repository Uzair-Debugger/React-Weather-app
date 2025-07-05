const apiKey = 'cb5c089e90d8b25b7bca8167ecf6fee9';

const getWeather = async (city) => {
    console.log(city)
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}

const getCitySuggestions = async (query) => {
    
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`);
    const data = await response.json();
    return data.map(city => `${city.name}, ${city.country}`);
}

const getCurrentLocation = async () =>{
    try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!res.ok)
            throw new Error('Fetch is unsuccessful')

        const location = await res.json();
        console.log(location.city)
        return location.city
    } catch (error) {
        console.log(error)
    }
}
export { getWeather, getCitySuggestions, getCurrentLocation };