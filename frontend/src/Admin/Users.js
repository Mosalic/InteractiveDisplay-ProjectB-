import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'
import FontAwesome from 'react-fontawesome';
import withAuth from './withAuth';

class Users extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      editUser: '',
      username: '',
      password: '123456',
      email: '',
      role: '',
      addUserVisible: false,
      newPassword: '',
      changePasswordUserID: null,
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
    this.getUsers();
  }

  editUser(id, username, password, email, role){
    this.setState({
      editUser: id,
      addUserVisible: false,
      username,
      // password,
      email,
      role,
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

  deleteUser(id){
    axios.delete(`http://localhost:3001/admin/user/${id}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      this.getUsers();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  saveChangedUser(id){
    axios.put(`http://localhost:3001/admin/user/${id}`, {
      username: this.state.username,
      // password: this.state.password,
      email: this.state.email,
      role: this.state.role,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      this.setState({
        editUser: '',
      })
      this.getUsers();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  addUser(){
    this.setState({
      addUserVisible: true,
      username: '',
      password: '',
      email: '',
      role: '',
    });
  }

  cancelAddUser(){
    this.setState({
      addUserVisible: false,
    });
  }

  saveNewUser(){
    axios.post(`http://localhost:3001/admin/user`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: this.state.role,
      id: this.state.users[this.state.users.length - 1].id + 1
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      this.setState({
        addUserVisible: false,
      });
      this.getUsers();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  getUsers(){
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

  changePasswordOpen(id){
    this.setState({
      changePasswordVisible: true,
      changePasswordUserID: id,
    });
  }

  changePasswordClose(){
    this.setState({
      changePasswordVisible: false,
      changePasswordUserID: null,
    });
  }

  changePassword(){
    axios.put(`http://localhost:3001/admin/changePassword/${this.state.changePasswordUserID}`, {
      password: this.state.newPassword,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      this.changePasswordClose();
      this.getUsers();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
        <div>
          <div className="userlist">
            <button type="button" className="add" onClick={() => this.addUser()}><FontAwesome name="plus" /></button>
            <div className="userlist__table">
              <div className="userlist__table__header">
                <div>Username</div>
                <div>Passwort</div>
                <div>E-Mail</div>
                <div>Rolle</div>
              </div>
              {this.state.users.map((user, index) => {
                if(this.state.editUser === user.id){
                  return(
                    <div className="userlist__table__row edit" key={index}>
                      <input value={this.state.username} name="username" onChange={(e) => this.handleChange(e)}/>
                      <input value={this.state.password} type="password" disabled name="password" onChange={(e) => this.handleChange(e)}/>
                      <input value={this.state.email} name="email" onChange={(e) => this.handleChange(e)}/>
                      <input value={this.state.role} name="role" onChange={(e) => this.handleChange(e)}/>
                      <div onClick={() => this.saveChangedUser(user.id)}><FontAwesome name="check-circle" className="icn-accept" /></div>
                      <div onClick={() => this.cancelEdit()}><FontAwesome name="times-circle" className="icn-delete"/></div>
                    </div>
                  );
                } else {
                  return(
                    <div className="userlist__table__row" key={index}>
                      <div>{user.username}</div>
                      {/* <div>123456</div> */}
                      <button className="btn" onClick={() => this.changePasswordOpen(user.id)}>Passwort ändern</button>
                      <div>{user.email}</div>
                      <div>{user.role}</div>
                      <button onClick={() => this.editUser(user.id, user.username, user.password, user.email, user.role)}><FontAwesome name="pencil-alt" className="icn-edit"/></button>
                      <button onClick={() => this.deleteUser(user.id)}><FontAwesome name="trash" className="icn-delete"/></button>
                    </div>
                  );
                }
              })}
              {this.state.addUserVisible &&
                <div className="userlist__table__row edit">
                  <input value={this.state.username} placeholder="Username" name="username" onChange={(e) => this.handleChange(e)}/>
                  <input value={this.state.password} placeholder="Password" name="password" onChange={(e) => this.handleChange(e)}/>
                  <input value={this.state.email} placeholder="E-Mail" name="email" onChange={(e) => this.handleChange(e)}/>
                  <input value={this.state.role} placeholder="Role" name="role" onChange={(e) => this.handleChange(e)}/>
                  <div onClick={() => this.saveNewUser()}><FontAwesome name="check-circle" className="icn-accept" /></div>
                  <div onClick={() => this.cancelAddUser()}><FontAwesome name="times-circle" className="icn-delete"/></div>
                </div>
              }
            </div>
          </div>
          {this.state.changePasswordVisible &&
            <div>
              <div className="backdrop" />
              <div className="userlist__changepassword">
                <div className="userlist__changepassword__content">
                  Passwort ändern
                  <input
                    placeholder="Neues Passwort eingeben"
                    value={this.state.newPassword}
                    onChange={(e) => this.handleChange(e)}
                    name="newPassword"
                  />
                  <div className="userlist__changepassword__btnfooter">
                    <button className="userlist__changepassword__btncancel" onClick={() => this.changePasswordClose()}>Cancel</button>
                    <button className="userlist__changepassword__btnsave" onClick={() => this.changePassword()}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    );
  }
}

export default withAuth(Users);
