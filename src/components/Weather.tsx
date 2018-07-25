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
  if(data.rainprobability < 21){
    bgcolor = "orange";
    }elseif(data.rainprobability < 41){
      bgcolor = "yellow";
    }elseif(data.rainprobability < 61){
      bgcolor = "green";
    }else{
      bgcolor = "blue";
    }
  }

  return (
    <li
      className={bgcolor};
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
