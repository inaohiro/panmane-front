import * as React from "react";
import { Route, Link } from "react-router-dom";
import App from "./App";


interface State {
  max: number;
  current: number;
  location_en: string;
}

interface Props {
  handleClick: (e: State) => void;
  max: number;
  current: number;
  location_en: string;
}

class Settings extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.handleChangeMax = this.handleChangeMax.bind(this);
    this.handleChangeCurrent = this.handleChangeCurrent.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      max: this.props.max,
      current: this.props.current,
      location_en: this.props.location_en
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeMax = this.handleChangeMax.bind(this);
    this.handleChangeCurrent = this.handleChangeCurrent.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  handleChangeMax(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ max: parseInt(event.target.value) });
  }

  handleChangeCurrent(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ current: parseInt(event.target.value) });
  }

  handleChangeLocation(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ location_en: event.target.value })
  }

  handleClick() {
    this.props.handleClick({
      max: this.state.max < 0 ? 0 : this.state.max,
      current: this.state.current < 0 ? 0 : this.state.current,
      location_en: this.state.location_en
    });
  }

  render() {
    return (
      <>

        <div className="header">
          <div className="main-title">設定</div>
        </div>

        <div className="inner">
          <img src="images/step1.png" className="stepimg" />
          <p>あなたが持っている全てのパンツの枚数と今すぐ履ける綺麗なパンツの枚数を入力してください。</p>
          <ul className="pants-selectbox">
            <li>
              <img src="images/pants-icon-clean.png" />
              <div className="cp_ipselect cp_sl01">
                <select value={this.state.max} onChange={this.handleChangeMax}>
                  <option value="-1" hidden>全てのパンツ枚数</option>
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
              <img src="images/pants-icon-max.png" />
              <div className="cp_ipselect cp_sl01">
                <select value={this.state.current} onChange={this.handleChangeCurrent}>
                  <option value="-1" hidden>綺麗なパンツ枚数</option>
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
          <img src="images/step2.png" className="stepimg" />
          <p>あなたが洗濯物を干す地域を選択してください。</p>
          <div className="cp_ipselect2 cp_sl02">
            <select value={this.state.location_en} onChange={this.handleChangeLocation} required>
              <option value="" hidden>市町村</option>
              <option value="adachi">足立区</option>
              <option value="arakawa">荒川区</option>
              <option value="itabashi">板橋区</option>
              <option value="edogawa">江戸川区</option>
              <option value="oota">大田区</option>
              <option value="kasai">葛飾区</option>
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
