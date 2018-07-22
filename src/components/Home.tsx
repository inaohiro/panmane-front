import * as React from "react";
import Header from "./Header";
import Main from "./Main";
import WeeklyWeather from "./WeeklyWeather";
import "../interfaces";

interface State {
  location: string;
  weather: Weather[];
  pants: Pants;
}

interface Props {
  s: State;
  handleClick: (e: Pants) => void;
}

const Home = ({ s }: Props) => (
  <>
    <Header place={s.location} />

    <Main current={s.pants.current} />

    <WeeklyWeather count={s.pants.current} weather={s.weather} />
  </>
);

export default Home;
