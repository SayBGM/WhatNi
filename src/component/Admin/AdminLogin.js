import React, { Component } from 'react';
import {Icon} from '../../assets/index';
import Proptypes from 'proptypes';
import axios from 'axios';
import cookie from 'react-cookies';
import './css/AdminLogin.scss';

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      pw: ''
    }
  }
  componentDidMount(){
    if(cookie.load('AccJWT') && cookie.load('RefJWT')){
      let link = window.location.href;
      if(link.match('table')||link.match('excel')||link.match('code')){
        return;
      }
      window.location.href = window.location.href+'/table';
    }
  }
  render() {
    const {id, pw} = this.state;
    return (
      <div className="AdminLogin">
        <div className="AdminLogin__TitleBox">
          <img src={Icon} alt="왔니 아이콘" className="AdminLogin__TitleBox__Icon"/>
          <span className="AdminLogin__TitleBox__title">선생님 페이지</span>
        </div>
        <div className="AdminLogin__Inputbox">
          <span className="AdminLogin__Inputbox__title">Sign In</span>
          <input className="AdminLogin__Inputbox__input" type="text" value={id} onChange={(event)=> this.setState({id: event.target.value})} placeholder="아이디"/>
          <input className="AdminLogin__Inputbox__input" type="password" value={pw} onChange={(event)=> this.setState({pw: event.target.value})} placeholder="비밀번호"/>
          <button className="AdminLogin__Inputbox__btn" onClick={()=> this.adminLogin()}>로그인</button>
        </div>
      </div>
    );
  }
  adminLogin(){
    const {id, pw} = this.state;
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/login',{
      id,pw
    }).then(res => {
      switch(res.status){
        case 200:
          cookie.save('AccJWT', res.data.access_token, {path: '/'});
          cookie.save('RefJWT', res.data.refresh_token, {path: '/'});
          window.location.href = window.location.href+'/table';
          break;
        default:
          alert('잘못된 선생님 계정입니다.');
      }
    })
  }
}
AdminLogin.Proptypes = {
  id: Proptypes.string,
  pw: Proptypes.string,
}
 
export default AdminLogin;