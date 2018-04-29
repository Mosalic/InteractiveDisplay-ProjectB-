/*
 *Admin-Bereich:
 *Die Administratoren können einloggen.
 *Je nach zugewiesener Rolle werden sie zu unterschiedlichen Kategorien geleitet, 
 *an denen die Daten ändern können.
*/

import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login(){
    axios.post('http://localhost:3001/admin/login', {
      username: this.state.username,
      password: this.state.password,
    })
    .then((response) => {
      localStorage.setItem('JWTToken', response.data.token)
      const decodedToken = jwt_decode(response.data.token);
      if(decodedToken.role <= 2){
        this.props.history.push('/admin/admin-area/professoren');
      } else {
        this.props.history.push('/admin/admin-area/stundenplaene');
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
    console.log(this.state.username, this.state.password);
  }

  render() {
    return (
        <div className="login">
        
          <form className="login__form">
            <h1 style={{color: '#fff'}}>Admin Bereich</h1> 
            <br></br>
            <input name="username" placeholder="Username" value={this.state.username} onChange={(e) => this.handleChange(e)}/>
            <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
            <button type="button" onClick={() => this.login()}>Login</button>
          </form>
        </div>
    );
  }
}

export default Login;
