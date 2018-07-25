import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import "../interfaces";
import Tutorial from "./Tutorial";
import Settings from "./Settings";

interface State {
  initial: boolean;
  pants: Pants;
  weather: Weather[];
  location: Location;
}

interface SettingsParams {
  max: number;
  current: number;
  location_en: string;
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    const local_token = JSON.parse(localStorage.getItem("token"));
    const local_pants = JSON.parse(localStorage.getItem("item"));
    const local_location = JSON.parse(localStorage.getItem("location"));

    // if token is not exist (!null -> true), initial should be true
    this.state = {
      initial: !local_token || false,
      pants: local_pants && local_pants.pants || { max: 0, current: 0 },
      weather: [],
      location: local_location && local_location.location || { en: "", ja: "" }
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClickWashed = this.handleClickWashed.bind(this);
  }

  // Settings button is clicked
  handleClick(e: SettingsParams) {
    this.setState(
      {
        initial: false,
        location: {
          ...this.state.location,
          en: e.location_en
        },
        pants: {
          ...this.state.pants,
          max: e.max,
          current: e.current
        }
      },
      () => {
        // post pants and location
        fetch("/api/items", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            item: this.state.pants,
            location: this.state.location
          })
        }).then(() => {
          // store data to localStorage
          localStorage.setItem("item",
            JSON.stringify({
              pants: this.state.pants
            }))
          localStorage.setItem("location",
            JSON.stringify({
              location: this.state.location
            })
          )
        }).then(() => {
          // fetch weather data
          fetch("/api/weathers", {
            credentials: "same-origin"
          }).then((data: any): WeatherData => data.json())
            .then(json => {
              this.setState({
                weather: json.data.weather,
                location: {
                  ...this.state.location,
                  ja: (String)(json.data.weather.slice(-1))
                }
              })
            })
        })

      }
    );
  }

  // when washed button is clicked
  handleClickWashed() {
    this.setState({
      pants: {
        ...this.state.pants,
        current: this.state.pants.max
      },
    },
      () => {
        // update pants count
        fetch("/api/update", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            item: {
              current: this.state.pants.current
            }
          })
        })
          .then(() => {
            localStorage.setItem("item", JSON.stringify({ pants: this.state.pants }))
          })
      })
  }


  componentDidMount() {
    // register token to session cookie
    const local_token = JSON.parse(localStorage.getItem("token"));
    fetch("/api/token", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: local_token && JSON.stringify({ token: local_token.token }) || ""
    })
      .then((data: any): Token => data.json())
      .then(json => {
        // TODO: check local_token.token === json.token
        localStorage.setItem("token", JSON.stringify({ token: json.token }));
      })

    // when not first access
    if (!this.state.initial) {
      fetch("/api/weathers", {
        credentials: "same-origin"
      })
        .then((data: any): WeatherData => data.json())
        .then(json => {
          this.setState({
            weather: json.data.weather
            // location.ja
          })
        })
    }

    // user somehow doesn't have pants
    if (!this.state.initial && this.state.pants.max === 0) {
      fetch("/api/items", {
        credentials: "same-origin"
      })
        .then((data: any): PantsData => data.json())
        .then(json => {
          this.setState({
            pants: json.data.pants
          })
        })
        .then(() => {
          localStorage.setItem("item", JSON.stringify({ pants: this.state.pants }))
        })
        .then(() => {
          console.log("why user does not have pants ???")
        }).catch((e) => {
          console.log(e);
        })
    }
  }

  render(): any {
    return (
      <Router>
        <>
          {this.state.initial ? (
            <Route exact path="/" render={() => <Tutorial />} />
          ) : (
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Home
                    {...routeProps}
                    s={this.state}
                    handleClickWashed={this.handleClickWashed}
                  />
                )}
              />
            )}
          <Route
            path="/settings"
            render={routeProps => (
              <Settings
                {...routeProps}
                handleClick={this.handleClick}
                max={this.state.pants.max}
                current={this.state.pants.current}
                location_en={this.state.location.en}
              />
            )}
          />
        </>
      </Router>
    );
  }
}

export default App;
