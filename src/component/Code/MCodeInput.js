import React, { Component } from 'react';
import './css/MCodeInput.scss';
import axios from 'axios';
import cookie from 'react-cookies';

class MCodeInput extends Component {
  constructor(){
    super();
    this.state = {
      code: ''
    }
  }
  componentDidMount() {
    if(!cookie.load('JWT')){
      alert('로그인 후 접속해주세요.');
      window.location.href = '/';
    }
    this.setState({code : getParameters('code')});
  }
  render() { 
    return (
      <div className="MMain">
        <div className="MMain__Navi">
          <span className="MMain__Navi__ko">출석체크</span><span className="MMain__Navi__en">Attandence Check</span>
        </div>
        <div className="MMain__wrapper">
        <input className="MCodeInput__input" type="text" value={this.state.code} onChange={(event)=>{this.setState({code:event.target.value})}} placeholder="인증번호"/>
        <div className="MCodeInput__btn MCodeInput" onClick={()=>this.Attendance()}>
          확인
        </div>
        </div>
      </div>
    );
  }
  Attendance(){
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/attendance/check',{
      uuid: cookie.load('JWT'),
      status: 0,
      code: this.state.code,
    }).then(res=> {
      if(res.status === 201){
        alert('출석체크에 성공하였습니다.');
      }
    })
  }
}
function getParameters(paramName) {
  // 리턴값을 위한 변수 선언
  var returnValue;

  // 현재 URL 가져오기
  var url = window.location.href;

  // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

  // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
  for (var i = 0; i < parameters.length; i++) {
      var varName = parameters[i].split('=')[0];
      if (varName.toUpperCase() == paramName.toUpperCase()) {
          returnValue = parameters[i].split('=')[1];
          return decodeURIComponent(returnValue);
      }
  }
}; 


export default MCodeInput;
