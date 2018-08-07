import React, { Component } from 'react';
import './MLogin.scss';
import LoginLogo from '../../component/Login/mobile/LoginLogo';
import LoginForm from '../../component/Login/mobile/LoginForm';

class MLogin extends Component {
  render() { 
    return (
      <div className="Login">
        <div className="Login_wrapper">
          <LoginLogo/>
          <LoginForm/>
        </div>
      </div>
    );
  }
}
 
export default MLogin;