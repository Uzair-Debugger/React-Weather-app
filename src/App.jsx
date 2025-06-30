import './App.css';
import {Search, MapPin, Wind} from 'react-feather';
import { getWeather, getCitySuggestions } from './api/api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    console.log(weatherData);
    setWeather(weatherData);
    setCity("");
    setSuggestions([]); // Clear suggestions after search
  }

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length >= 3) {
      const citySuggestions = await getCitySuggestions(value);
      setSuggestions(citySuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setSuggestions([]); // Clear suggestions after selection
    getWeatherbyCity(); // Fetch weather for the selected city
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={handleInputChange} 
        placeholder='Enter City Name' />
        <button onClick={()=>getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, index) => (
            <li key={index} onClick={() => handleSuggestionClick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}

      {weather && weather.weather && 
      <div className="content">
        
        <div className="location d-flex">
          <MapPin></MapPin>
          <h2>{weather.name} <span>({weather.sys.country})</span></h2>
        </div>
        <p className="datetext">{renderDate()}</p>

        <div className="weatherdesc d-flex flex-c">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <h3>{weather.weather[0].description}</h3>
        </div>

        <div className="tempstats d-flex flex-c">
          <h1>{weather.main.temp} <span>&deg;C</span></h1>
          <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
          <h3>Humidity {weather.main.humidity}<span>%</span></h3>
        </div>

        <div className="windstats d-flex">
          <Wind></Wind>
          <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
        </div>

      </div>
      }

      {!weather.weather && <div className="content">
        <h4>No Data found !</h4>
      </div>}

      {/* <p>{JSON.stringify(weather)}</p> */}

    </div>
  );
}

export default App;
