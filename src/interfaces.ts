interface Token {
  token: string;
}

interface Data {
  data: Items;
}

interface Items {
  weather: Weather[];
  pants: Pants;
}

interface Weather {
  date: string;
  day_of_the_week: string;
  weatherAM3: string;
  weatherAM9: string;
  weatherPM3: string;
  weatherPM9: string;
  rainprobability: number;
}

interface Pants {
  max: number;
  current: number;
}

interface Location {
  location: string;
}
