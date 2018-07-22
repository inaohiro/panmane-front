import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  current: number;
}

const Main = ({ current }: Props) => (
  <div className="main">
    <div className="maincircle">
      <div className="pantscircle">
        <p className="pantscount-title">Pants Count</p>
        <p className="pantscount">{current}</p>
        <div className="main-bottom">
          <img src="images/push.png" alt="洗濯完了！" className="washed" />>
          <img src="images/senzai.png" alt="洗剤" className="senzai" />>
          <Link to="/settings">
            <img src="images/setting.png" alt="設定" className="setting" />>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Main;
