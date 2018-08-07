import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import adminBackground from './../../assets/adminBackground.png';
import AdminLogin from './../../component/Admin/AdminLogin';
import './css/admin.scss';
import AdmindefaultLayout from './AdmindefaultLayout';
import AdminTable from '../../component/Admin/AdminTable';
import AdminExcel from './AdminExcel';
import AdminCode from './AdminCode';

class Admin extends Component {
  render() { 
    return (
      <div className="admin" style={{backgroundImage: `url(${adminBackground})`}}>
        <Router>
        <Switch>
          <Route path='/admin' component={AdminLogin} exact/>
          <Route render={() => 
            <AdmindefaultLayout>
              <Switch>
                <Route path='/admin/table' component={AdminTable} exact/>
                <Route path='/admin/excel' component={AdminExcel} exact/>
                <Route path='/admin/code' component={AdminCode} exact/>
              </Switch>
          </AdmindefaultLayout>
          }/>
          </Switch>
          </Router>
      </div>
    );
  }
}
 
export default Admin;