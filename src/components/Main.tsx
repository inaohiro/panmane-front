import * as React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import "../interfaces";

interface Props {
  handleClickWashed: () => void;
  pants: Pants;
}

class Main extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClickWashed();
    $("img[src='images/push.png']").on("click", function () {
      console.log("hogehoge");
    })
  }

  render() {
    return (

      <div className="main">
        <div className="maincircle">
          <div className="pantscircle">
            <p className="pantscount">{this.props.pants.current}</p>
            <div className="main-bottom">
              <img onClick={this.handleClick} src="images/push.png" alt="洗濯完了！" className="washed" />
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