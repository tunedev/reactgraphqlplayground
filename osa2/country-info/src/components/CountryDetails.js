import React, { useEffect, useState } from 'react';
import axios from 'axios';

const weatherApi = process.env.REACT_APP_WEATHER_API;

const CountryDetails = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState('');
  useEffect(() => {
    console.log('api_key', weatherApi);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${weatherApi}&query=${country.capital}`
      )
      .then((response) => {
        setCapitalWeather(response.data);
      });
  }, [country.capital]);

  console.log('Capital Weather', capitalWeather);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt='flag' width='300px' />
      {capitalWeather === '' ? undefined : (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {capitalWeather.current.temperature}</p>
          <img
            src={capitalWeather.current.weather_icons[0]}
            alt='Weather'
            width='50px'
          />
          <p>
            Wind:{' '}
            {`${capitalWeather.current.wind_speed} mph direction ${capitalWeather.current.wind_dir}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
