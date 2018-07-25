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
  location: string;
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    const json_token = JSON.parse(localStorage.getItem("token"));
    const json_pants = JSON.parse(localStorage.getItem("pants"));

    if (!!(json_token && json_token.token || null)) {
      this.state = {
        initial: false,
        pants: json_pants && json_pants.pants || { max: 0, current: 0 },
        weather: [...Array(10)],
        location: ""
      };
    } else {
      this.state = {
        initial: true,
        pants: {
          max: 0,
          current: 0
        },
        weather: [...Array(10)],
        location: ""
      }
    }

    console.log(this.state);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  handleClick(e: Pants & Location) {
    this.setState(
      {
        initial: false,
        location: e.location,
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
          // TODO FIX
          body: JSON.stringify(this.state.pants)
        }).then(() => {
          localStorage.setItem("item",
            JSON.stringify({
              pants: {
                max: this.state.pants.max,
                current: this.state.pants.current
              }
            }))
        });

        // TODO check is this code necessary?
        /*
        fetch("/api/items", {
          credentials: "same-origin"
        })
          .then((data: any): Data => data.json())
          .then(json => {
            this.setState({
              weather: json.data.weather,
              pants: json.data.pants
            })
          })
          */
      }
    );
  }

  handleClickSettings() {
    this.setState({
      pants: {
        ...this.state.pants,
        current: this.state.pants.max
      }
    },
      () => {
        // update pants count
        fetch("/api/items", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(this.state.pants)
        })
      })
  }


  componentDidMount() {
    // register token to session cookie
    const json_token = JSON.parse(localStorage.getItem("token"));
    fetch("/api/token", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: json_token && JSON.stringify({ token: json_token.token }) || ""
    })
      .then((data: any): Token => data.json())
      .then(json => {
        localStorage.setItem("token", JSON.stringify({ token: json.token }));
      })

    // not first access
    if (!this.state.initial) {
      // TODO: get weather api
      fetch("/api/items", {
        credentials: "same-origin"
      })
        .then((data: any): Data => data.json())
        .then(json => {
          this.setState({
            weather: json.data.weather
          })
        })
    }

    // user somehow doesn't have pants
    if (!this.state.initial && this.state.pants.max === 0) {
      fetch("/api/items", {
        credentials: "same-origin"
      })
        .then((data: any): Data => data.json())
        .then(json => {
          this.setState({
            pants: json.data.pants
          })
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
                    handleClick={this.handleClick}
                    handleClickSettings={this.handleClickSettings}
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
              />
            )}
          />
        </>
      </Router>
    );
  }
}

export default App;
