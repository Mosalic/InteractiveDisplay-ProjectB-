import React, { Component } from 'react';
import axios from 'axios';

class AdminArea extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      buero: '',
      telefonnummer: '',
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addProfessor(){
    axios.post('http://localhost:3001/professoren', {
      name: this.state.name,
      buero: this.state.buero,
      telefonnummer: this.state.telefonnummer,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor added');
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
        <div>
          <div>
            <h1>Professor hinzufügen</h1>
            <label>Name</label>
            <input name="name" type="text" value={this.state.name} onChange={(e) => this.handleChange(e)} />
            <label>Büro</label>
            <input name="buero" type="text" value={this.state.buero} onChange={(e) => this.handleChange(e)} />
            <label>Telefonnummer</label>
            <input name="telefonnummer" type="text" value={this.state.telefonnummer} onChange={(e) => this.handleChange(e)} />
            <button onClick={() => this.addProfessor()}>Professor hinzufügen</button>
          </div>
          {/* <button>Stundenplan hinzufügen</button> */}
        </div>
    );
  }
}

export default AdminArea;
