import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import Barcode from 'react-barcode';
import './css/Main.scss';
import {Dojang, WebBG} from '../../assets/index';
import MainCheck from '../../component/MainCheck';

class Main extends Component {
  constructor(){
    super();
    this.state = {
      name: null,
      birth: null,
      studentId: null,
      profile_image: null,
      school: '소프트웨어고등학교',
    }
  }
  componentDidMount(){
    if(!cookie.load('JWT')){
      alert('로그인 후 접속해주세요.');
      window.location.href = '/';
    }
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/student/info',{
      uuid: cookie.load('JWT')
    }).then(res=> {
      const {name, birth, student_id, profile_image} = res.data;
      this.setState({
        name: name,
        birth: birth,
        studentId: student_id,
        profile_image: profile_image,
      })
    })
  }
  render() {
    const {name, birth, studentId, profile_image, school, card} = this.state;
    let barcode = '9960'+birth+studentId;
    barcode = barcode.replace(/\./gi, '');
    return (
      <div className="Main" style={{backgroundImage:`url(${WebBG})`}}>
        <div className="Main__background"></div>
        <div className="Main__studentCard">
          <div className="Main__studentCard__title">
            <span className="Main__studentCard__title--ko">학생증</span><span className="Main__studentCard__title--en">Student ID Card</span>
          </div>
          <div className="Main__wrapper">
            <img src={profile_image} className="Main__wrapper__image" alt="증명사진"/>
            <p className="Main__wrapper__name">{name}</p>
            <p className="Main__wrapper__birth">{birth}</p>
            <p className="Main__wrapper__school">OO{school}</p>
            <p className="Main__wrapper__studentId">학번 : {studentId}</p>
            <div className="Main__wrapper__barcode">
              <Barcode value={barcode}/>
            </div>
            <p className="Main__wrapper__schoolKing">{school}장 <img className="MMain__wrapper__Dojang" src={Dojang} alt="도장"/></p>
          </div>
          
        </div>
       <MainCheck/>
      </div>
    );
  }
}
 
export default Main;