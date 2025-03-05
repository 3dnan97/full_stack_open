import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CountryList from "./components/CountryList";

function App() {
  // State variables
  const [country, setCountry] = useState(""); // User input for country search
  const [countries, setCountries] = useState(null); // All countries data
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered results
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected country details
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch country data on mount
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setIsLoading(false);
      });
  }, []);

  // Show loading text while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

   /**
   * Handles user input in the search field and updates the filtered countries list
   * @param {Event} event - The input change event
   */
  const handleCountryInput = (event) => {
    const searchedCountry = event.target.value;
    if (searchedCountry === country) return; // Avoid unnecessary updates

    setCountry(searchedCountry);

    // Filter countries based on search input
    const searchedCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
    );
    setFilteredCountries(searchedCountries);
    setSelectedCountry(null);// Reset selected country when searching
  };

  /**
   * Handles the selection of a country from the list
   * @param {Object} country - The selected country object
   */
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setCountry(country.name.common);
  };

  return (
    <>
      <div className="search_input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg_icon bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
        <input
          value={country}
          onChange={handleCountryInput}
          placeholder="Enter a country name!"
        />
      </div>
      <CountryList
        filteredCountries={filteredCountries}
        searchTerm={country}
        selectedCountry={selectedCountry}
        onSelectedCountry={handleSelectCountry}
      />
    </>
  );
}

export default App;
