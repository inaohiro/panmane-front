import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  current: number;
}

const Main = ({ current }: Props) => (
  
  
  
  <div className="main">
    <div className="graph">
      <div id="progressive-circle01" className="chart pantsmater"></div>
      <div id="progressive-circle02" className="chart"></div>
      <p className="min">min</p><p className="max">max</p>
    </div>
    <div className="main-bottom">
      <img src="images/push.png" id="wash" alt="洗濯完了！" className="washed"/>
      <img src="images/senzai.png" alt="洗剤" className="senzai"/>
      <img src="images/setting.png" alt="設定" className="setting"/>
    </div>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
  </div>
  
  
);

export default Main;
