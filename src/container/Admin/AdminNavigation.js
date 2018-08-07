import React, { Component } from 'react';
import {Icon, search, excel, QrCode} from '../../assets/index';
import axios from 'axios';
import cookie from 'react-cookies';
import './css/AdminNavigation.scss';
import {Link} from 'react-router-dom';

class AdminNavigation extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      day: new Date(),
      menu: 0,
      attend: 0,
      absent: 0,
    }
  }
  componentDidMount(){
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/info',{
      jwt: cookie.load('AccJWT')}
    ).then(res=>{
      if(res.status === 200){
        let {name} = res.data;
        this.setState({name: name});
      }
    })
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/count', {
      jwt: cookie.load('AccJWT')
    }).then(res=> {
      if(res.status === 200){
        this.setState({attend: res.data.attend, absent: res.data.absent});
        return;
      }
      return;
    })
    const url = window.location.href;
    if(url.match('table')){
      this.setState({menu: 0});
    } else if (url.match('excel')){
      this.setState({menu: 1});
    } else {
      this.setState({menu: 2});
    }
  }
  render() { 
    const {name, day, menu, attend, absent} = this.state
    return (
      <div className="AdminNavigation">
        <img className="AdminNavigation__icon" src={Icon} alt="왔니 아이콘"/>
        <p className="AdminNavigation__hello"> <span className="AdminNavigation__hello__name">{name}</span> 선생님 안녕하세요</p>
        <p className="AdminNavigation__logout" onClick={()=>this.Logout()}>로그아웃</p>
        <div className="AdminNavigation__hr"></div>
        <div className="AdminNavigation__time">
          {day.getFullYear()}년 {day.getMonth() + 1}월 {day.getDate()}일<br/><br/>
          {attend}명 출석<br/>
          {absent}명 결석
        </div> 
        <div className="AdminNavigation__hr"></div>
        <Link to="/admin/table">
          <div className={menu === 0 ? 'AdminNavigation__btn AdminNavigation__btn--open' : 'AdminNavigation__btn'} onClick={()=>this.setState({menu:0})}>
            <img src={search} alt="검색 아이콘"/> <span>출석부 조회</span> 
          </div>
        </Link>
        <Link to="/admin/excel">
          <div className={menu === 1 ? 'AdminNavigation__btn AdminNavigation__btn--open' : 'AdminNavigation__btn'} onClick={()=>this.setState({menu:1})}>
            <img src={excel} alt="엑셀 아이콘"/> <span>출석부 엑셀 저장</span> 
          </div>
        </Link>
        <Link to="/admin/code">
          <div className={menu === 2 ? 'AdminNavigation__btn AdminNavigation__btn--open' : 'AdminNavigation__btn'} onClick={()=>this.setState({menu:2})}>
            <img src={QrCode} alt="Qr코드 아이콘"/> <span>출석코드 관리</span> 
          </div>
        </Link>
        <div className="AdminNavigation__hr"></div>
      </div>
    );
  }
  Logout(){
    cookie.remove('AccJWT', { path: '/' });
    cookie.remove('RefJWT', { path: '/' });
    window.location.href = '/admin';
  }
}
 
export default AdminNavigation;