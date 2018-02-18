import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';

class Admin extends Component {
  render() {
    return (
        <div>
          <Route path="/admin/login" component={Login}/>
          {/* <Route path="/home" component={Login}/> */}
        </div>
    );
  }
}

export default Admin;
