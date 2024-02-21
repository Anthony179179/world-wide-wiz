import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

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

function MyMap() {
  let countries: CountryData[] = mapData.features;
  let randomIndex: number = 0;

  let countryStyle = {
    fillColor: "grey",
    weight: 2,
    color: "black",
    fillOpacity: 1,
  };

  let correctCountryName: string = countries[randomIndex].properties.ADMIN;

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
        randomIndex = Math.floor(Math.random() * mapData.features.length);
        correctCountryName = countries[randomIndex].properties.ADMIN;
        console.log(correctCountryName);
      },
    });
  };

  return (
    <>
      <div>
        <h1>Map</h1>
        <div>{correctCountryName}</div>
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
