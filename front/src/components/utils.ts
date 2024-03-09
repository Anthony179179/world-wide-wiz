import { useCallback, useRef } from "react";

const quizIds: { [key: string]: number } = {
  europe: 1,
  americas: 2,
  asia: 3,
  africa: 4,
  oceania: 5,
  europe_flags: 6,
  americas_flags: 7,
  asia_flags: 8,
  africa_flags: 9,
  oceania_flags: 10,
};

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
  type: string;
  features: CountryData[];
}

interface QuizScore {
  quizid: number;
  name: string;
  description: string;
  score: number | null;
  link: string;
}

interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
  score: number;
}

interface Quiz {
  id: number | null;
  name: string;
  description: string;
  username: string | null;
}

type CountryColors = Record<string, "green" | "red">;

export { shuffle, filterCountriesByRegion, useStableCallback, quizIds };
export type {
  CountryData,
  CountriesJSONData,
  Quiz,
  Question,
  CountryColors,
  QuizScore,
};
