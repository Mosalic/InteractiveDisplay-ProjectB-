import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'
import FontAwesome from 'react-fontawesome';

class Users extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      editUser: ''
    }
  }

  // check if user has a JWT Token
  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  // get all users
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

  editUser(userEmail){
    this.setState({
      editUser: userEmail,
    });
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  cancelEdit(){
    this.setState({
      editUser: '',
    });
  }

  deleteUser(email){
    axios.delete(`http://localhost:3001/admin/user/${email}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('deleted');
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
        <div>
          <div className="userlist">
            {/* <button type="button" className="add" onClick={() => this.toggleAddProfessor()}>+</button> */}
            <div className="userlist__table">
              <div className="userlist__table__header">
                <div>Username</div>
                <div>E-Mail</div>
                <div>Role</div>
              </div>
              {this.state.users.map((user, index) => {
                if(this.state.editUser === user.email){
                  return(
                    <div className="userlist__table__row edit" key={index}>
                      <input defaultValue={user.username} value={this.state.username} onChange={(e) => this.handleChange(e)}/>
                      <input defaultValue={user.email} value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                      <input defaultValue={user.role} value={this.state.role} onChange={(e) => this.handleChange(e)}/>
                      <div><FontAwesome name="check-circle" className="icn-accept" /></div>
                      <div onClick={() => this.cancelEdit()}><FontAwesome name="times-circle" className="icn-delete"/></div>
                    </div>
                  );
                } else {
                  return(
                    <div className="userlist__table__row" key={index}>
                      <div>{user.username}</div>
                      <div>{user.email}</div>
                      <div>{user.role}</div>
                      <button onClick={() => this.editUser(user.email)}><FontAwesome name="pencil-alt" className="icn-edit"/></button>
                      <button onClick={() => this.deleteUser(user.email)}><FontAwesome name="trash" className="icn-delete"/></button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
    );
  }
}

export default Users;
