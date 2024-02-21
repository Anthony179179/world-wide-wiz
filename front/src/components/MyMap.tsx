import { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

function MyMap() {
  let randomIndex: number = 0;

  let countryStyle = {
    fillColor: "red",
    weight: 2,
    color: "black",
  };

  let onEachCountry = (country, layer) => {
    layer.on({
      click: (event: any) => {
        if (
          event.target.feature.properties.ADMIN ===
          mapData.features[randomIndex].properties.ADMIN
        ) {
          event.target.setStyle({
            fillColor: "green",
          });
        } else {
          event.target.setStyle({
            fillColor: "red",
          });
        }
        randomIndex = Math.floor(Math.random() * mapData.features.length);
      },
    });
  };

  return (
    <>
      <div>
        <h1>Map</h1>
        <div>{mapData.features[randomIndex].properties.ADMIN}</div>
        <MapContainer></MapContainer>
        <MapContainer
          style={{ height: "80vh" }}
          center={[20, 100]}
          zoom={2}
          attributionControl={false}
        >
          <GeoJSON
            data={mapData.features}
            style={countryStyle}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      </div>
    </>
  );
}

export default MyMap;
