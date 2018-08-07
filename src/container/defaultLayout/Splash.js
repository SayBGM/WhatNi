import React, { Component } from 'react';
import './css/Splash.scss';

class Splash extends Component {
  constructor(){
    super();
    this.state={
      screenNum: 0,
    }
  }
  componentDidMount(){
    this.setState({screenNum: Math.floor(Math.random() * 2) + 1});
  }
  render() { 
    const { screenNum } = this.state;
    return (
      <div className={`Splash Splash--screen${screenNum}`}>
        <div className="Splash__wrapper">
          <div className="Splash__wrapper__Icon">
            아이콘
          </div>
          <div className="Splash__wrapper__Title">
            <div>WHATNI</div>
            <div className="Splash__wrapper__Title--sub">출석체크는 왔니로</div>
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