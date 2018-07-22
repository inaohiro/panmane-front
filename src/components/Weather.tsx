import * as React from "react";
import "../interfaces";

interface Props {
  count: number;
  data: Weather;
  index: number;
}

const Weather = ({ count, data, index }: Props) => {
  const _count = count < 0 ? 0 : count;

  return (
    <li
      className={
        index % 3 === 0 ? "orange" : index % 3 === 1 ? "yellow" : "blue"
      }
    >
      <div className="week-left">
        <p>
          {data.date}
          <br />
          {data.day_of_the_week}
        </p>
      </div>
      <div className="week-right">
        <p className="pants-will">Pants Count：{_count}</p>
        <br />
        {data.weatherAM === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" alt="am-wether" />
        ) : (
          <img src="images/tenki-icon-rain.png" alt="am-wether" />
        )}
        /
        {data.weatherPM === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" alt="am-wether" />
        ) : (
          <img src="images/tenki-icon-rain.png" alt="am-wether" />
        )}
        <p>
          <span>{data.rainprobability}</span>%
        </p>
      </div>
    </li>
  );
};

export default Weather;
