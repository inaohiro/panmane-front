import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import "../interfaces";
import Tutorial from "./Tutorial";
import Settings from "./Settings";

interface Props {
  history?: any;
}

interface State {
  status: boolean;
  pants: Pants;
  weather: Weather[];
  location: string;
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      status: false,
      pants: {
        max: 0,
        current: 0
      },
      weather: [],
      location: "Shibuya"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: Pants) {
    this.setState(
      {
        pants: {
          ...this.state.pants,
          max: e.max,
          current: e.current
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
        }).then(() => {
          // fetch weather data
          fetch("/api/items", {
            credentials: "same-origin"
          })
            .then((data: any): Data => data.json())
            .then(json => {
              this.setState({
                status: true,
                weather: json.data.weather,
                pants: json.data.pants
              });
            });
        });
      }
    );
  }

  componentDidMount() {
    // TODO: little bit long, so split these to function
    // check localStorage, and State
    if (!!localStorage.getItem("token") && this.state.status === true) {
      // do nothing
    } else if (!!localStorage.getItem("token") && this.state.status === false) {
      fetch("/api/token", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ token: localStorage.getItem("token") })
      })
        .then(() =>
          // fetch data
          fetch("/api/items", {
            credentials: "same-origin"
          })
            .then((data: any): Data => data.json())
            .then(json => {
              this.setState({
                status: true,
                weather: json.data.weather,
                pants: json.data.pants
              });
            })
        )
        .catch(e => {
          console.log(e);
        });
    } else if (!localStorage.getItem("token") && this.state.status == true) {
      fetch("/api/token", {
        method: "POST",
        credentials: "same-origin"
      })
        .then(data => data.json())
        .then(json => localStorage.setItem("token", json.token))
        .then(() => {
          /* redirect to app ? */
        })
        .catch(e => {
          /* this should be react error handling */
          console.log(e);
        });
    } else {
      fetch("/api/token", {
        method: "POST",
        credentials: "same-origin"
      })
        .then((data: any): Token => data.json())
        .then(json => localStorage.setItem("token", json.token))
        .catch(e => {
          /* this should be react error handling */
          console.log(e);
        });
    }
  }

  render(): any {
    return (
      <Router>
        <>
          {this.state.status ? (
            <Route
              exact
              path="/"
              render={routeProps => (
                <Home
                  {...routeProps}
                  s={this.state}
                  handleClick={this.handleClick}
                />
              )}
            />
          ) : (
            <Route exact path="/" render={() => <Tutorial />} />
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
