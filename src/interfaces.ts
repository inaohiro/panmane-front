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
  weatherAM: string;
  weatherPM: string;
  rainprobability: number;
}

interface Pants {
  max: number;
  current: number;
}
