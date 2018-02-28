import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Professoren from './Professoren';

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
