import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from "./Map";
import Table from "./Table";
import './Table.css';
import './App.css'; 
import { sortData } from './util.js';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data) =>{
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async() =>{
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) => ({
            name: country.country, //United States, United Kingdom, France, etc.
            value: country.countryInfo.iso2 //USA, UK, FR, etc.
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/countries' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  
    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode);
      setCountryInfo(data);
    })
    
  };

  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          {
          }
            <FormControl className="app__dropdown">
              <Select variant="outlined" value="abc" value={country} onChange={onCountryChange} >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map(country =>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}  />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3> Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwid new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
