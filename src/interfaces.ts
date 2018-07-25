interface Token {
  token: string;
}

interface WeatherData {
  data: WeatherContainer;
}

interface WeatherContainer {
  weather: Weather[];
}

interface PantsData {
  data: PantsContainer;
}

interface PantsContainer {
  pants: Pants;
}

// interface Items {
//   weather: Weather[];
//   pants: Pants;
// }

interface Weather {
  date: string;
  day_of_the_week: string;
  weatherAM3: string;
  weatherAM9: string;
  weatherPM3: string;
  weatherPM9: string;
  rainprobabilityAM9: number;
  rainprobabilityPM3: number;
  rainprobability: number;
}

interface Pants {
  max: number;
  current: number;
}

interface Location {
  location: string;
}
