import React, { Component } from 'react';
import Proptypes from 'proptypes';
import cookie from 'react-cookies';
import axios from 'axios';
import './css/LoginForm.scss';

class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      authNum: '',
    }
  }
  componentDidMount(){
    if(cookie.load('JWT')){
      window.location.href = '/main';
    }
  }
  render() {
    const {authNum} = this.state;
    return (
      <div className="LoginForm">
        <input type="text" className="LoginForm__input" value={authNum} onChange={(event)=>this.setState({authNum: event.target.value})} maxLength="5" placeholder="인증 코드"/>
        <button className="LoginForm__btn" onClick={()=> this.login()}>로그인</button>
      </div>
    );
  }
  login(){
    console.log('클릭')
    const {authNum} = this.state;
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/student/info', {
      uuid: authNum,
    }).then(res => {
      console.log(res);
      switch(res.status){
        case 200:
          cookie.save('JWT', res.data.uuid, {path: '/'});
          window.location.href = '/main';
          break;
        default:
          alert('인증코드가 잘못되었습니다. 다시 확인하시기 바랍니다.');
      }
    })
  }
}
LoginForm.Proptypes = {
  authNum: Proptypes.string
}

export default LoginForm;