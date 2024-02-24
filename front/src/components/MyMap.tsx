import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import countriesWithRegions from "../data/countries_with_regions.json";

import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface CountryData {
  type: string;
  properties: {
    ADMIN: string;
    ISO_A3: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

function filterCountriesByRegion(countries, countriesWithRegions, region) {
  return countries.filter((country) => {
    const countryData = countriesWithRegions.find(
      (countryWithRegion) =>
        countryWithRegion["alpha-3"] === country.properties.ISO_A3
    );
    return (
      countryData &&
      countryData.region.toLowerCase().trim() === region.toLowerCase().trim()
    );
  });
}

function MyMap() {
  let [correctCountryName, setCorrectCountryName] = useState("Aruba");

  const { region } = useParams();

  let countries: CountryData[] = mapData.features;
  let randomIndex: number = 0;

  let filteredCountries = filterCountriesByRegion(
    countries,
    countriesWithRegions,
    region
  );

  let countryStyle = {
    fillColor: "grey",
    weight: 2,
    color: "black",
    fillOpacity: 1,
  };

  // let correctCountryName: string =
  //   filteredCountries[randomIndex].properties.ADMIN;

  let onEachCountry = (country, layer) => {
    layer.on({
      click: (event: any) => {
        if (country.properties.ADMIN === correctCountryName) {
          event.target.setStyle({
            fillColor: "green",
          });
        } else {
          event.target.setStyle({
            fillColor: "red",
          });
        }
        randomIndex = Math.floor(Math.random() * filteredCountries.length);
        setCorrectCountryName(filteredCountries[randomIndex].properties.ADMIN);
        console.log(correctCountryName);
      },
    });
  };

  return (
    <>
      <div>
        <h1>Map</h1>
        <div>{correctCountryName}</div>

        <MapContainer
          style={{ height: "80vh" }}
          center={[5, 5]}
          zoom={2}
          attributionControl={false}
        >
          <GeoJSON
            data={filteredCountries}
            style={countryStyle}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      </div>
    </>
  );
}

export default MyMap;
