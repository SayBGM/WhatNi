import React, { Component,Fragment } from 'react';
import './css/AdminTable.scss';
import cookie from 'react-cookies';
import axios from 'axios';

class AdminTable extends Component {
  state = {
    tableData: null,
  }
  componentDidMount(){
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/table',{
      jwt: cookie.load('AccJWT')
    }).then(res => {
      if(res.status === 200){
        this.setState({tableData: res.data})
      }
    })
  }
  render() { 
    return (
      <div className="AdminTable">
        <table className="AdminTable__table">
          <tr>
            <td></td>
            <td>8월 6일</td>
            <td>8월 7일</td>
            <td>8월 8일</td>
            <td>8월 9일</td>
            <td>8월 10일</td>
            <td className="AdminTable__table__reason">사유</td>
          </tr>
          {this.renderTable()}
        </table>
        {this.props.none ? <span className="AdminTable__mean">.은 출석, X는 결석을 의미</span>: ''}
      </div>
    );
  }
  renderTable(){
    const {tableData} = this.state;
    for(let people in tableData){
      return (
        <tr>
          <td key={people} className="AdminTable__table__peopleName">{people}</td>
          {tableData[people].map((attend, index)=> (
            <td key={index}>{attend === 1 ? 'X' : '.'}</td>
          ))}
        </tr>
      )
    }   
  }
}
 
export default AdminTable;