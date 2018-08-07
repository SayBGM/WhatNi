import React, { Component,Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.scss';
import Splash from './container/defaultLayout/Splash';
import MLogin from './container/Login/MLogin';
import Main from './container/Main/Main';
import Admin from './container/Admin/Admin';

class App extends Component {
  constructor(){
    super();
    this.state={
      Agent: navigator.userAgent.toLowerCase()
    }
  }
  render() {
    const {Agent} = this.state;
    return (
      <div id="App">
        <BrowserRouter>
          <Fragment>
          <Route path='/' component={Splash} exact/>
            {
              Agent.match('android') != null || Agent.indexOf("iphone")>-1|| Agent.indexOf("ipod")>-1 ?
              <Route path='/' component={MLogin} exact/> :
              <Route path='/' component={Main} exact/>
            }
            <Route path='/admin' component={Admin}/>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
