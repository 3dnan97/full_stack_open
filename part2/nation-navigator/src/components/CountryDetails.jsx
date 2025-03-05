import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Component to display detailed information about a selected country
 * @param {Object} props
 * @param {Object} props.country - The country object to display
 * @returns {JSX.Element}
 */
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null); // State for storing weather data
  const [error, setError] = useState(null); // State for storing an error

  // Fetch weather data for the country's capital when the component mounts
  useEffect(() => {
    let cancelToken = axios.CancelToken.source(); // Create a cancel token to prevent race conditions
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital[0]
        }&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=metric`,
        { cancelToken: cancelToken.token }
      )
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.error("Error fetching weather data:", error);
          setError("Weather data unavailable");
        }
      });


    return () => cancelToken.cancel(); // Cleanup function
  }, [country]);


  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital.join(", ")}</div>
      <div>Area: {country.area}</div>
      <hr />
      <h2>Languages</h2>
      <ul className="lang_list">
        {Object.entries(country.languages || {}).map(([key, lang]) => (
          <li key={key}>{lang}</li>
        ))}
      </ul>
      <hr />
      <img
        src={country.flags?.png || "fallback-image.png"}
        alt="Country flag"
      />
      <hr />

      {/* Display weather information if available */}
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>Temperature {weather.main.temp.toFixed(2)} °C</div>
          <img className="weather_emoji" 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={`Weather icon of ${weather.weather[0].description}`}
            />
          <div>Wind {weather.wind.speed} m/s</div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
