import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import './css/AdmindefaultLayout.scss';

class AdmindefaultLayout extends Component {
  render() { 
    return (
      <div className="AdmindefaultLayout">
        <AdminNavigation/>
        <div className="AdmindefaultLayout__contents">
        {this.props.children}
        </div>
        
      </div>
    );
  }
}
 
export default AdmindefaultLayout;