import React, { Component,Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.scss';
import Splash from './container/defaultLayout/Splash';
import MLogin from './container/Login/MLogin';
import Main from './container/Main/Main';
import Admin from './container/Admin/Admin';
import MMain from './container/Main/MMain';
import MCodeInput from './component/Code/MCodeInput';
import Login from './container/Login/Login';

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
            (
            <Fragment>
              <Route path='/' component={MLogin} exact/>
              <Route path='/main' component={MMain} exact/>
              <Route path='/main/code' component={MCodeInput} exact/>
            </Fragment>
          ):
              (
                <Fragment>
              <Route path='/' component={Login} exact/>
              <Route path='/main' component={Main} exact/>
              <Route path='/main/code' component={Main} exact/>
              </Fragment>)
            }
            <Route path='/admin' component={Admin}/>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
