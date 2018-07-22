import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../interfaces";

// TODO: lazy loading
const Tutorial = () => (
  <>
    <h1>Tutorial</h1>

    <Link to="/settings">
      <button type="button" className="btn">
        Next
      </button>
    </Link>
  </>
);

export default Tutorial;
