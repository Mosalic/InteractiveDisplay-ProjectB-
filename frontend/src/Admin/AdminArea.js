import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Professoren from './Professoren';

class AdminArea extends Component {

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    } else {
      const decodedToken = jwt_decode(localStorage.getItem('JWTToken'));
      const currentTime = new Date().getTime() / 1000;
      if(!(decodedToken.exp - currentTime > 0)){
        this.props.history.push('/admin/login');
      }
    }
  }

  render() {
    return (
        <div className="admin-area">
          <div className="admin-area__nav">
            <NavLink activeClassName="active" to="/admin/admin-area/professoren">
              Professoren
            </NavLink>
            <NavLink activeClassName="active" to="/admin/admin-area/stundenplaene">
              Stundenpläne
            </NavLink>
          </div>
          <Route path="/admin/admin-area/professoren" component={Professoren} />
          {/* <button>Stundenplan hinzufügen</button> */}
        </div>
    );
  }
}

export default AdminArea;
