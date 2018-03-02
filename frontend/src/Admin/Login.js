import React, { Component } from 'react';
import axios from 'axios';

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
      this.props.history.push('/admin/admin-area/professoren');
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
            <input name="username" placeholder="Username" value={this.state.username} onChange={(e) => this.handleChange(e)}/>
            <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
            <button type="button" onClick={() => this.login()}>Login</button>
          </form>
        </div>
    );
  }
}

export default Login;
