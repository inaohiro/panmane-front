import * as React from "react";
import { Route, Link } from "react-router-dom";
import App from "./App";
import "../interfaces";

interface State {
  max: number;
  current: number;
  location: string;
}
interface Props {
  handleClick: (e: State) => void;
  max: number;
  current: number;
}

class Settings extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      max: this.props.max,
      current: this.props.current,
      location: "Shibuya"
    };
  }

  handleChange1(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ max: parseInt(event.target.value) });
  }

  handleChange2(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ current: parseInt(event.target.value) });
  }

  handleClick() {
    this.props.handleClick({
      max: this.state.max,
      current: this.state.current,
      location: this.state.location
    });
  }

  render() {
    return (
      <>
        <select value={this.state.max} onChange={this.handleChange1}>
          <option value="">Please fill in your total pants</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <select value={this.state.current} onChange={this.handleChange2}>
          <option value="">Please fill in your clean pants</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <Link to="/">
          <button
            className="btn"
            type="button"
            onClick={this.handleClick}
            disabled={this.state.max < this.state.current}
          >
            OK
          </button>
        </Link>

        <Route path="/" compknent={App} />
      </>
    );
  }
}

export default Settings;
