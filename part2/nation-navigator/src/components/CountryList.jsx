import CountryDetails from "./CountryDetails";

/**
 * Component to display a list of filtered countries or a specific country's details
 * @param {Object} props
 * @param {Array} props.filteredCountries - The list of countries matching the search term
 * @param {string} props.searchTerm - The current search term
 * @param {Object|null} props.selectedCountry - The currently selected country
 * @param {Function} props.onSelectedCountry - Callback to set the selected country
 * @returns {JSX.Element|null}
 */
const CountryList = ({
  filteredCountries,
  searchTerm,
  selectedCountry,
  onSelectedCountry,
}) => {
  // Don't show anything if search is empty
  if (searchTerm === "") return null;
  // If too many matches, prompt the user to refine their search
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }
  // If no matches, inform the user
  else if (filteredCountries.length === 0) {
    return <div>No matches, specify another filter.</div>;
  }
  // If only one country matches, display its details directly
  else if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }
  // If a country is selected, display its details
  else if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />;
  }
  // Otherwise, show the list of matching countries with a "show" button
  else {
    return (
      <div className="country_list">
        {filteredCountries.map((filteredCountry) => (
          <div key={filteredCountry.name.common} className="country_item">
            <span>{filteredCountry.name.common}</span>
            <button onClick={() => onSelectedCountry(filteredCountry)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default CountryList;
