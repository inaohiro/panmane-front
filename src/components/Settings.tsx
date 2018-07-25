import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";

interface Props {
  handleClick: (e: Pants) => void;
  max: number;
  current: number;
}

interface PropsState {
  max: number;
  current: number;
}

class Settings extends React.Component<Props, PropsState> {
  constructor(props: any) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      max: this.props.max,
      current: this.props.current
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
      current: this.state.current
    });
  }

  render() {
    return (
      <>
      
      
      <div className="inner">
        <img src="images/step1.png" className="stepimg"/>
        <p>あなたが持っている全てのパンツの枚数と今すぐ履ける綺麗なパンツの枚数を入力してください。</p>
        <ul className="pants-selectbox">
          <li>
          <img src="images/pants-icon-max.png"/>
          <div className="cp_ipselect cp_sl01">
            <select value={this.state.max} onChange={this.handleChange1}>
              <option value="" hidden>全てのパンツ枚数</option>
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
          </div>
        </li>
        <li>
          <img src="images/pants-icon-clean.png"/>
          <div className="cp_ipselect cp_sl01">
            <select value={this.state.current} onChange={this.handleChange2}>
              <option value="" hidden>綺麗なパンツ枚数</option>
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
          </div>
        </li>
      </ul>
      <img src="images/step2.png" className="stepimg"/>
      <p>あなたが洗濯物を干す地域を選択してください。</p>
      <div className="cp_ipselect2 cp_sl02">
        <select required>
          <option value="" hidden>市町村</option>
          <option value="adachi">足立区</option>
          <option value="arakawa">荒川区</option>
          <option value="itabashi">板橋区</option>
          <option value="edogawa">江戸川区</option>
          <option value="oota">大田区</option>
          <option value="kasai">葛西区</option>
          <option value="kita">北区</option>
          <option value="etou">江東区</option>
          <option value="sinagawa">品川区</option>
          <option value="shibuya">渋谷区</option>
          <option value="shinjyuku">新宿区</option>
          <option value="suginami">杉並区</option>
          <option value="sumida">墨田区</option>
          <option value="setagaya">世田谷区</option>
          <option value="daitou">台東区</option>
          <option value="tyuuou">中央区</option>
          <option value="chiyoda">千代田区</option>
          <option value="toyosima">豊島区</option>
          <option value="nakano">中野区</option>
          <option value="nerima">練馬区</option>
          <option value="bunkyo">文京区</option>
          <option value="minato">港区</option>
          <option value="meguro">目黒区</option>
        </select>
      </div>
      <div className="here"><img src="images/nowplace.png" className="nowplace"/>&nbsp;現在地から</div>
      </div>
      
    <Link to="/">
      <div className="next"><span onClick={this.handleClick} className="ok">OK</span></div>
    </Link>
      
        <Route path="/" compknent={App} />
      </>
    );
  }
}

export default Settings;
