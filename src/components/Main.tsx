import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  current: number;
}

const Main = ({ current }: Props) => (
  
  
  <div className="main">
    <div className="graph">
      <div idName="progressive-circle01" className="chart pantsmater"></div>
      <div idName="progressive-circle02" className="chart"></div>
      <p className="min">min</p><p class="max">max</p>
    </div>
    <div className="main-bottom">
      <img src="images/push.png" idName="wash" alt="洗濯完了！" className="washed">
      <img src="images/senzai.png" alt="洗剤" className="senzai">
      <img src="images/setting.png" alt="設定" className="setting">
    </div>
  </div>
  
  
);

export default Main;
