import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800,
    },
    recovered: {
        hex: "#2E8125",
        rgb: "rgb(46,129,37)",
        multiplier: 800,
    },
    deaths: {
        hex: "#FB4443",
        rgb: "rgb(251, 68, 67)",
        multiplier: 800,
    },
};

export const sortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on map with interactive tooltips
export const showDataOnMap = (data, casesType='cases') => 
    data.map(country =>(
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div 
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className="info-name">
                        {country.country}
                    </div>
                    <div className="info-confirmed">
                        <b>Cases:</b> {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        <b>Recovered:</b> {numeral(country.recovered).format("0,0")}
                        </div>
                    <div className="info-deaths">
                        <b>Deaths:</b> {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

