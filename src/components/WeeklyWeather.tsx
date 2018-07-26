import * as React from "react";
import Weather from "./Weather";
import "../interfaces";

interface Props {
  count: number;
  weather: Weather[];
  location_ja: string;
}

const WeeklyWeather = ({ location_ja, count, weather }: Props) => (
  <div className="weekly-weather">
    <p className="weekly-weather-title">{location_ja} の１週間の天気</p>
    <div className="week-box">
      {weather.slice(0, weather.length - 1).map((w, index) => (
        // count should be decrease one by one
        <Weather data={w} count={count - index} />
      ))}
    </div>
  </div>
);

export default WeeklyWeather;
