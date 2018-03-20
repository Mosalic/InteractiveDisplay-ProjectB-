import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import AddStundenplan from './AddStundenplan';


class Stundenplan extends Component {
  constructor(){
    super();
      
      this.state={
          addStundenplanVisible: false,
      } 
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/professoren')
    .then((response) => {
      this.setState({
        professoren: response.data.professoren,
        nextProfessorId: response.data.professoren[response.data.professoren.length - 1].id + 1,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

toggleAddStundenplan(){
    this.setState({
        addStundenplanVisible: !this.state.addStundenplanVisible,
        
    });
}

  render() {
    return (
        <div>
          <div className="professoren-wrapper">
           
            <button type="button" className="add" onClick={() => this.toggleAddStundenplan()}>+</button>
            <div className="stundeplan">
              
            </div>
          </div>
        {this.state.addStundenplanVisible && <AddStundenplan/>}
        </div>
    );
  }
}

export default Stundenplan;
