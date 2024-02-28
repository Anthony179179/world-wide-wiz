import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import countriesWithRegions from "../data/countries_with_regions.json";
import {
  shuffle,
  filterCountriesByRegion,
  CountryData,
  useStableCallback,
  CountriesJSONData,
} from "./utils";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MyMap() {
  let [countryColors, setCountryColors] = useState({});
  let [score, setScore] = useState(0);
  let [dialogOpen, setDialogOpen] = useState(false);

  const { region } = useParams();

  const data = mapData as CountriesJSONData;
  let countries = data.features;

  let filteredCountries = filterCountriesByRegion(
    countries,
    countriesWithRegions,
    region
  );

  let numOfCountries: number = filteredCountries.length;

  let [numOfCountriesRemaining, setNumOfCountriesRemaining] = useState(
    filteredCountries.length
  );

  let [countriesArray, setCountriesArray] = useState(
    shuffle(filteredCountries)
  );

  useEffect(() => {
    if (countriesArray.length === 0) {
      setDialogOpen(true);
    }
  }, [countriesArray]);

  let checkAnswer = (event: any) => {
    if (countriesArray.length == 0) {
      let tooltip = event.target
        .bindTooltip(event.target.feature.properties.ADMIN, {
          permanent: true,
        })
        .openTooltip();

      setTimeout(() => {
        event.target.unbindTooltip(tooltip);
      }, 1000);
      return;
    }

    let correctCountryName = countriesArray[0].properties.ADMIN;

    setCountryColors((previousCountryColors) => {
      const updatedColors = { ...previousCountryColors };
      updatedColors[correctCountryName] =
        event.target.feature.properties.ADMIN === correctCountryName
          ? "green"
          : "red";
      return updatedColors;
    });

    if (event.target.feature.properties.ADMIN === correctCountryName) {
      setScore(score + 1);
    } else {
      let tooltip = event.target
        .bindTooltip(event.target.feature.properties.ADMIN, {
          permanent: true,
        })
        .openTooltip();

      setTimeout(() => {
        event.target.unbindTooltip(tooltip);
      }, 1000);
    }
    setCountriesArray((prevCountriesArray) => prevCountriesArray.slice(1));
    setNumOfCountriesRemaining(numOfCountriesRemaining - 1);
  };

  let handleMouseover = (event: any) => {
    if (!countryColors[event.target.feature.properties.ADMIN]) {
      let fillColor = "lightgrey";
      event.target.setStyle({
        fillColor: fillColor,
      });
    }
  };

  let handleMouseout = (event: any) => {
    event.target.setStyle({
      fillColor: countryColors[event.target.feature.properties.ADMIN] || "grey",
    });
  };

  const stableHandleMouseout = useStableCallback(handleMouseout);
  const stableHandleMouseover = useStableCallback(handleMouseover);
  const stableCheckAnswer = useStableCallback(checkAnswer);

  let onEachCountry = (country, layer) => {
    layer.on({
      click: stableCheckAnswer,
      mouseover: stableHandleMouseover,
      mouseout: stableHandleMouseout,
    });
  };

  return (
    <>
      <div>
        <h1>{region[0].toUpperCase() + region.slice(1)} Map Quiz</h1>
        <div>
          {countriesArray.length > 0 && countriesArray[0].properties.ADMIN}
        </div>
        <div>
          Score: {score}/{numOfCountries}
        </div>
        <div>{numOfCountriesRemaining} countries remaining</div>
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
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTitle>Congratulations! You've completed the quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <>
              You got a score of {score}/{numOfCountries}
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
            color="primary"
          >
            Review Answers
          </Button>
          <Link to="/">
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
              color="primary"
            >
              Back to Home
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyMap;
