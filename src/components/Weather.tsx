import * as React from "react";
import "../interfaces";

interface Props {
  count: number;
  data: Weather;
}

const Weather = ({ count, data }: Props) => {
  const _count = count < 0 ? 0 : count;

  var bgcolor;
  const rainp_am9 = data && data.rainprobabilityAM9 || 0;
  const rainp_pm3 = data && data.rainprobabilityPM3 || 0;
  if (Math.max(rainp_am9, rainp_pm3) < 21) {
    bgcolor = "orange";
  } else if (Math.max(rainp_am9, rainp_pm3) < 41) {
    bgcolor = "yellow";
  } else if (Math.max(rainp_am9, rainp_pm3) < 61) {
    bgcolor = "green";
  } else {
    bgcolor = "blue";
  }

  return (
    <li
      className={bgcolor}
    >
      <div className="week-left">
        <p>
          {data && data.date || ""}
          <br />
          {data && data.day_of_the_week || ""}
        </p>
      </div>
      <div className="week-right">
        <p className="pants-will">この日のパンツ枚数：{_count}</p>
        <br />
        {(data && data.weatherAM9 || "") === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" />
        ) : (
            <img src="images/tenki-icon-rain.png" />
          )}
        <p>
          <span>{data && data.rainprobabilityAM9 || ""}</span>%
        </p>
        <p className="slash">/</p>
        {(data && data.weatherPM3 || "") === "晴れ" ? (
          <img src="images/tenki-icon-sunny.png" />
        ) : (
            <img src="images/tenki-icon-rain.png" />
          )}
        <p>
          <span>{data && data.rainprobabilityPM3 || ""}</span>%
        </p>
      </div>
    </li>
  );
};

export default Weather;
