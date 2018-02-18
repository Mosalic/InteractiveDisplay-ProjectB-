import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
        <div>
          <form>
            <input name="username" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button></button>
          </form>
        </div>
    );
  }
}

export default Login;
