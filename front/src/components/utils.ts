import { useCallback, useRef } from "react";

function shuffle(array: any) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
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

interface CountriesJSONData {
  type: string,
  features: CountryData[]
}

export { shuffle, filterCountriesByRegion, useStableCallback };
export type { CountryData, CountriesJSONData };
