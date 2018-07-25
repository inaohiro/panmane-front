import * as React from "react";
import { Link } from "react-router-dom";
import "../interfaces";

interface Props {
  handleClick: () => void;
  pants: Pants;
}

class Main extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick();
  }

  render() {
    return (

      <div className="main">
        <div className="maincircle">
          <div className="pantscircle">
            <p className="pantscount-title">Pants Count</p>
            <p className="pantscount">{this.props.pants.current}</p>
            <div className="main-bottom">
              <img src="images/push.png" alt="洗濯完了！" className="washed" />
              <img src="images/senzai.png" alt="洗剤" className="senzai" />
              <Link to="/settings">
                <img src="images/setting.png" alt="設定" className="setting" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    )
  }

}


export default Main;

{/*
      <div className="main">
        <div className="graph">
          <div id="progressive-circle01" className="chart pantsmater"></div>
          <div id="progressive-circle02" className="chart"></div>
          <p className="min">min</p><p className="max">max</p>
        </div>
        <div className="main-bottom">
          <img onClick={this.handleClick} src="images/push.png" id="wash" alt="洗濯完了！" className="washed" />
          <img src="images/senzai.png" alt="洗剤" className="senzai" />
          <img src="images/setting.png" alt="設定" className="setting" />
        </div>
      </div>
      */}