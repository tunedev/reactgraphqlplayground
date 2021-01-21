import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

function App() {
  const [filterText, setFilterText] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
    setSelectedCountry('');
  };

  const filteredCountries =
    filterText === ''
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filterText.toLowerCase())
        );

  return (
    <div>
      <form>
        <div>
          <label htmlFor='countryName'>Find Country:</label>
          <input
            type='text'
            name='countryName'
            onChange={handleFilterTextChange}
            value={filterText}
          />
        </div>
      </form>
      {filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches specify another filter</p>
      ) : selectedCountry === '' ? (
        filteredCountries.map((country) => (
          <p key={country.numericCode}>
            {country.name}
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </p>
        ))
      ) : (
        <CountryDetails country={selectedCountry} />
      )}
    </div>
  );
}

export default App;
