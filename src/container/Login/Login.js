import React, { Component } from 'react';
import {loginBG} from '../../assets/index';
import cookie from 'react-cookies';
import axios from 'axios';
import './Login.scss';

class Login extends Component {
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
      <div className="Login">
        <div className="Login__BackGround">
          <img src={loginBG} alt="로그인 배경" style={{width:'100%'}}/>
          <div className="Login__BackGround__text">
          <div>
          WHATNI<br/><br/>
          <span style={{fontSize: '48px'}}>출석체크는 '왔니'로</span> 
          </div>
          </div>
        </div>
        <div className="Login__contents">
          <div className="Login__contents__inputs">
            <input type="text" value={authNum} onChange={(event)=>this.setState({authNum: event.target.value})} maxLength="5" placeholder="인증 코드"/>
            <div className="Login__contents__inputs__btn" onClick={()=>this.Login()}>로그인</div>
            <span>Copyright 2018 WHATNI all rights reserved.</span>
          </div>
          
        </div>
      </div>
    );
  }
  Login(){
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
 
export default Login;