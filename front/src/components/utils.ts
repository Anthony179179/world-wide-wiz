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

export { shuffle, filterCountriesByRegion };
export type { CountryData };
