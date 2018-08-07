import React, { Component } from 'react';
import Icon from './../../assets/Icon.png';
import './css/Splash.scss';

class Splash extends Component {
  render() { 
    return (
      <div className={`Splash Splash--screen`}>
        <div className="Splash__wrapper">
          <img src={Icon} alt="왔니 아이콘" className="Splash__wrapper__Icon"/>
          <div className="Splash__wrapper__Title">
            <div>WHATNI</div>
            <div className="Splash__wrapper__Title--sub">출석체크는 '왔니'로</div>
          </div>
        </div>
        <div className="Splash__Copyright">
          Copyright 2018 WHATNI all rights reserved.
        </div>
      </div>
    );
  }
}
 
export default Splash;