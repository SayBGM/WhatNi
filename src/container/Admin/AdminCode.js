import React, { Component } from 'react';
import axios from 'axios';
import './css/AdminCode.scss'
import QRcode from 'qrcode.react';
import {returnImg} from '../../assets/index';

class AdminCode extends Component {
  state = {
    isMake: false,
    CheckCode: '',
  };
  componentDidMount(){
    axios.get('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/makecode').then(res=>{
      if(res.status === 200){
        this.setState({CheckCode: res.data.code, isMake: true});
      }
      return;
    })
  }
  render() { 
    const {isMake, CheckCode} = this.state;
    return (
      <div className="AdminCode">
        {isMake?
        <div className="AdminCode__wrapper">
          <div className="AdminCode__wrapper__Qrcode">
            <h1>QR코드</h1>
            {/*<QRcode value={`url/check/${CheckCode}`}/>*/}
            <QRcode value={`https://www.naver.com`}/>
          </div>
          <div className="AdminCode__wrapper__NumCode">
            <h1>출석 코드</h1>
            <h2>{CheckCode}</h2>
          </div>
          <div className="AdminCode__wrapper__btns">
            <div className="AdminCode__wrapper__btns__btn --blue">
              코드 재발급
            </div>
            <div className="AdminCode__wrapper__btns__btn --red" onClick={()=>{this.setState({isMake:false})}}>
              삭제
            </div>
          </div>
        </div>
        :
        <div className="AdminCode__wrapper">
          출석코드를 발급 받을 수 있습니다.<br/>아래 버튼을 눌러 출석코드를 발급해주세요.
          <div className="AdminCode__wrapper__btn" onClick={()=>this.getCode()}>
            코드 발급 받기
          </div>
        </div>
      }
      </div>
    );
  }
  getCode(){
    axios.get('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/makecode').then(res=>{
      if(res.status === 201){
        this.setState({CheckCode: res.data, isMake: true});
      }
    })
  }
}
 
export default AdminCode;