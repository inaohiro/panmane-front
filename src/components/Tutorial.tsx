import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../interfaces";

// TODO: lazy loading
const Tutorial = () => (
  <>
    
  <div className="wrap">
    <video id="video" autoPlay loop>
      <source src="images/tutrial_all.mp4" type="video/mp4" />
      <p>video要素がサポートされていないブラウザでご覧になっています。</p>
    </video>
  </div>
    <Link to="/settings">
      <div className="next"><span className="ok">OK</span></div>
    </Link>
  </>
);

export default Tutorial;
