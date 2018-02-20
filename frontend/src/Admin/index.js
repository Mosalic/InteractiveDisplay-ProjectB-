import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import AdminArea from './AdminArea';

class Admin extends Component {
  componentWillMount(){
    if(localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/admin-area');
    }
  }

  render() {
    return (
        <div>
          <Route path="/admin/login" component={Login}/>
          <Route path="/admin/admin-area" component={AdminArea}/>
        </div>
    );
  }
}

export default Admin;
