import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
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
        <div className="main">
          <Link to="/admin/admin-area/professoren">
            <button>Professoren</button>
          </Link>
          <Route path="/admin/admin-area/professoren" component={Professoren} />
          {/* <button>Stundenplan hinzufügen</button> */}
        </div>
    );
  }
}

export default AdminArea;
