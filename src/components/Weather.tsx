import * as React from "react";
import "../interfaces";

interface Props {
  count: number;
  data: Weather;
  index: number;
}

const Weather = ({ count, data, index }: Props) => {
  const _count = count < 0 ? 0 : count;
  
  var bgcolor;
  if(Math.max(data.rainprobabilityAM9,data.rainprobabilityPM3) < 21){
    bgcolor = "orange";
    }else if(Math.max(data.rainprobabilityAM9,data.rainprobabilityPM3) < 41){
      bgcolor = "yellow";
    }else if(Math.max(data.rainprobabilityAM9,data.rainprobabilityPM3) < 61){
      bgcolor = "green";
    }else{
      bgcolor = "blue";
  }

  return (
    <li
      className={bgcolor}
    >
      <div className="week-left">
        <p>
          {data.date}
          <br />
          {data.day_of_the_week}
        </p>
      </div>
      <div className="week-right">
        <p className="pants-will">この日のパンツ枚数：{_count}</p>
        <br />
        {data.weatherAM9 === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" />
        ) : (
          <img src="images/tenki-icon-rain.png" />
        )}
        <p>
          <span>{data.rainprobabilityAM9}</span>%
        </p>
        <p className="slash">/</p>
        {data.weatherPM3 === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" />
        ) : (
          <img src="images/tenki-icon-rain.png" />
        )}
        <p>
          <span>{data.rainprobabilityPM3}</span>%
        </p>
      </div>
    </li>
  );
};

export default Weather;
