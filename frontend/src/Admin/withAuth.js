/*
 *Admin-Bereich:
 *Es wird überprüft, ob der Admin die Rechte zur Bearbeitung der Daten hat.
*/

import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

export default function withAuth(AuthComponent) {
  return class extends Component {
    componentWillMount(){
      if(!localStorage.getItem('JWTToken')){
        this.props.history.push('/admin/login');
      } else {
        const decodedToken = jwt_decode(localStorage.getItem('JWTToken'));
        const currentTime = new Date().getTime() / 1000;
        console.log(decodedToken.exp - currentTime);
        if(!(decodedToken.exp - currentTime > 0)){
          this.props.history.push('/admin/login');
        }
      }
    }

    render() {
      return (
        <AuthComponent history={this.props.history} {...this.props} />
      )
    }
  }
}
