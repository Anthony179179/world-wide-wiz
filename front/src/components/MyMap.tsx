import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import countriesWithRegions from "../data/countries_with_regions.json";
import { shuffle, filterCountriesByRegion, CountryData } from "./utils";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { useParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";

function useStableCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const stableCallback = useCallback((...args: Args) => {
    return callbackRef.current(...args);
  }, []);

  return stableCallback;
}

function MyMap() {
  let [countryColors, setCountryColors] = useState({});
  let [score, setScore] = useState(0);

  const { region } = useParams();

  let countries: CountryData[] = mapData.features;

  let filteredCountries = filterCountriesByRegion(
    countries,
    countriesWithRegions,
    region
  );

  let [countriesArray, setCountriesArray] = useState(
    shuffle(filteredCountries)
  );

  let defaultCountryStyle = {
    fillColor: "grey",
    weight: 2,
    color: "black",
    fillOpacity: 1,
  };

  let checkAnswer = (event: any) => {
    let correctCountryName = countriesArray[0].properties.ADMIN;

    setCountryColors((previousCountryColors) => {
      const updatedColors = { ...previousCountryColors };
      updatedColors[correctCountryName] =
        event.target.feature.properties.ADMIN === correctCountryName
          ? "green"
          : "red";
      return updatedColors;
    });

    setCountriesArray((prevCountriesArray) => prevCountriesArray.slice(1));
  };

  console.log(countryColors);
  const stableCheckAnswer = useStableCallback(checkAnswer);

  let onEachCountry = (country, layer) => {
    layer.on({
      click: stableCheckAnswer,
    });
  };

  return (
    <>
      <div>
        <h1>Map</h1>
        <div>{countriesArray[0].properties.ADMIN}</div>

        <MapContainer
          style={{ height: "80vh" }}
          center={[5, 5]}
          zoom={2}
          attributionControl={false}
        >
          <GeoJSON
            data={filteredCountries}
            style={(country) => ({
              color: "black",
              fillColor: countryColors[country.properties.ADMIN] || "grey",
              fillOpacity: 1,
              weight: 2,
            })}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      </div>
    </>
  );
}

export default MyMap;
