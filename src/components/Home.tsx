import * as React from "react";
import Header from "./Header";
import Main from "./Main";
import WeeklyWeather from "./WeeklyWeather";
import "../interfaces";

interface State {
  location: Location;
  weather: Weather[];
  pants: Pants;
}

interface Props {
  s: State;
  handleClickWashed: () => void;
}

const Home = ({ s, handleClickWashed }: Props) => (
  <>
    <Header />

    <Main handleClickWashed={handleClickWashed} pants={s.pants} />

    <WeeklyWeather location_ja={s.location.ja} count={s.pants.current} weather={s.weather} />
  </>
);

export default Home;
