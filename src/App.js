import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.scss';
import Splash from './container/defaultLayout/Splash';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Splash/>
        <BrowserRouter>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
