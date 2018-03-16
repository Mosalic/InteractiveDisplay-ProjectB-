import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'
import FontAwesome from 'react-fontawesome';

class Users extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/admin/user',  {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      this.setState({
        users: response.data.users,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
        <div>
          <div className="userlist">
            {/* <h1>Professoren</h1> */}
            <button type="button" className="add" onClick={() => this.toggleAddProfessor()}>+</button>
            <div className="userlist__table">
              <div className="userlist__table__header">
                <div>Username</div>
                <div>E-Mail</div>
                <div>Role</div>
              </div>
              {this.state.users.map((user, index) =>
                <div className="userlist__table__row" key={index}>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>{user.role}</div>
                  <button><FontAwesome name="pencil-alt" className="icn-edit"/></button>
                  <button><FontAwesome name="trash" className="icn-delete"/></button>
                </div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default Users;
