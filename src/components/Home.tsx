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
  handleClickSettings: () => void;
}

const Home = ({ s, handleClickSettings }: Props) => (
  <>
    <Header place={s.location} />

    <Main handleClick={handleClickSettings} pants={s.pants} />

    <WeeklyWeather count={s.pants.current} weather={s.weather} />
  </>
);

export default Home;
