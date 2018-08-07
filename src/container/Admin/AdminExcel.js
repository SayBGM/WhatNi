import React, { Component } from 'react';
import AdminTable from '../../component/Admin/AdminTable';
import './css/AdminExcel.scss';
import axios from 'axios';
import cookie from 'react-cookies';

class AdminExcel extends Component {
  render() { 
    return (
      <div className="AdminExcel">
        <AdminTable none={false}/>
        <div className="AdminExcel__Download" onClick={()=>this.DownLoadCSV()}>다운로드</div>
      </div>
    );
  }
  DownLoadCSV(){
    console.log('asdf');
    axios.post('http://ec2-52-79-234-20.ap-northeast-2.compute.amazonaws.com:5000/admin/table',{
      jwt: cookie.load('AccJWT')
    }).then(res => {
      if(res.status === 200){
        const tableData = res.data;
        let CSVData = ', 8월 6일, 8월 7일, 8월 8일, 8월 9일, 8월 10일 \n';
        
        for(let people in tableData){
          CSVData += (people+',');
          for(let attend in tableData[people]){
            CSVData += ((attend == 1 ? 'X' : '')+', ')
          }
          CSVData = CSVData+'\n';
        }
        let csvFile = new Blob(["\uFEFF"+CSVData], {type:"text/csv"});
        let downloadLink = document.createElement("a");
        downloadLink.download = 'export';
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    }
    )
  }
}
 
export default AdminExcel;