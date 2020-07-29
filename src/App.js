import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import './App.css'; 

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async() =>{
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
        }));
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="app">

      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
      {
      }
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc" value={country} onChange={onCountryChange} >
            {/* Loop through countries and show options */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country =>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
              
            }

          </Select>
        </FormControl>
      </div>


      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* Infobox */}
      {/* Infobox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
