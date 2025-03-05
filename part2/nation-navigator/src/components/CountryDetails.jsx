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

  /**
   * Helper function to get appropriate weather emoji based on weather ID
   * @param {number} weatherId - The ID representing the weather condition
   * @returns The corresponding weather emoji
   */
  const getWeatherEmoji = (weatherId) => {
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        return "⛈️";
      case weatherId >= 400 && weatherId < 500:
        return "🌧️";
      case weatherId >= 500 && weatherId < 600:
        return "🌧️";
      case weatherId >= 600 && weatherId < 700:
        return "🌨️";
      case weatherId >= 700 && weatherId < 800:
        return "☄️";
      case weatherId == 800:
        return "☀️";
      case weatherId > 800:
        return "☁️";
      default:
        return "";
    }
  };

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
          <h1 className="weather_emoji">
            {getWeatherEmoji(weather.weather[0].id)}
          </h1>
          <div>Wind {weather.wind.speed} m/s</div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
