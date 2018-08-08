import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import Barcode from 'react-barcode';
import './css/MMain.scss';
import {Dojang} from '../../assets/index';
import {Link} from 'react-router-dom';

class MMain extends Component {
  constructor(){
    super();
    this.state = {
      name: null,
      birth: null,
      studentId: null,
      profile_image: null,
      school: '소프트웨어고등학교',
      card: true,
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
      <div className="MMain">
        <div className="MMain__Navi">
          <span className="MMain__Navi__ko">학생증</span>
          <span className="MMain__Navi__en">Student ID Card</span>
        </div>
        <div className="MMain__wrapper">
          <div className={card? 'MMain__wrapper__front Card':'MMain__wrapper__front'}>
            <img src={profile_image} className="MMain__wrapper__image" alt="증명사진" onClick={()=>this.setState({card: false})}/>
            <p className="MMain__wrapper__name">{name}</p>
            <p className="MMain__wrapper__birth">{birth}</p>
            <p className="MMain__wrapper__schoolKing">{school}장 <img className="MMain__wrapper__Dojang" src={Dojang} alt="도장"/></p>
          </div>
          <div className={card? 'MMain__wrapper__back':'MMain__wrapper__back Card'}>
            <p className="MMain__wrapper__school">OO{school}</p>
            <p className="MMain__wrapper__studentId">학번 : {studentId}</p>
            <div className="MMain__wrapper__barcode" onClick={()=>this.setState({card: true})}>
              <Barcode value={barcode}/>
            </div>
          </div>
        </div>
       <Link to="/main/code">
        <div className="MMain__btn">
          ✔︎
        </div>
        </Link>
      </div>
    );
  }
}
 
export default MMain;