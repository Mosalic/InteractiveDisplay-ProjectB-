/*
 *Admin-Bereich:
 *Nachdem sich die Administratoren eingeloggt haben, können sie von hier aus zu den Kategorien gelangen.
 *Je nach Rolle können sie verschiedene Kategorien und ihre Daten
 *bearbeiten.
 *Hier wird zusätzlich auf die "Professoren", "Users", "Events", "Stundenplan" und "Notes" Komponenten zugegriffen.
*/

import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Professoren from './Professoren';
import Users from './Users';
import Events from './Events';
import Stundenplan from './Stundenplan';
import Notes from './Notes';
import FontAwesome from 'react-fontawesome';

class AdminArea extends Component {
  constructor(){
    super();

    this.state = {
      userRole: 0,
    }
  }

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

  componentDidMount(){
    if(localStorage.getItem('JWTToken')){
      const decodedToken = jwt_decode(localStorage.getItem('JWTToken'));
      this.setState({
        userRole: decodedToken.role,
      });
    }
  }

  logout(){
    localStorage.removeItem('JWTToken');
    this.props.history.push('/admin/login');
  }

  render() {
    return (
        <div className="admin-area">
          <div className="admin-area__nav">
            {this.state.userRole <= 2 &&
              <NavLink activeClassName="active" to="/admin/admin-area/professoren">
                Professoren
              </NavLink>
            }
            <NavLink activeClassName="active" to="/admin/admin-area/stundenplaene">
              Stundenpläne
            </NavLink>
            {this.state.userRole <= 3 &&
              <NavLink activeClassName="active" to="/admin/admin-area/events">
                Veranstaltungen
              </NavLink>
            }
            {this.state.userRole <= 2 &&
              <NavLink activeClassName="active" to="/admin/admin-area/notes">
                Pinnwand
              </NavLink>
            }
            {this.state.userRole === 1 &&
              <NavLink activeClassName="active" to="/admin/admin-area/users">
                Users
              </NavLink>
            }
            <button className="btn-logout" onClick={() => this.logout()}><FontAwesome name="sign-out-alt" className="icn-edit"/><span>Logout</span></button>
          </div>
          <Route path="/admin/admin-area/professoren" component={Professoren} />
          <Route path="/admin/admin-area/users" component={Users} />
          <Route path="/admin/admin-area/events" component={Events} />
          <Route path="/admin/admin-area/stundenplaene" component={Stundenplan} />
          <Route path="/admin/admin-area/notes" component={Notes} />
          {/* <button>Stundenplan hinzufügen</button> */}
        </div>
    );
  }
}

export default AdminArea;
