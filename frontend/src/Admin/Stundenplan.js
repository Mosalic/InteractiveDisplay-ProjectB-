import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import AddStundenplan from './AddStundenplan';


class Stundenplan extends Component {
  constructor(){
    super();

    this.state = {
      addStundenplanVisible: false,
      stundenplaene: [],
      nextStundenplanId: null,
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/stundenplaene')
    .then((response) => {
      console.log(response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id);
      this.setState({
        stundenplaene: response.data.data.stundenplaene,
        nextStundenplanId: response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id !== 'undefined' ? (response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id + 1) : 0 ,
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
        {this.state.addStundenplanVisible && <AddStundenplan timetableId={this.state.nextStundenplanId}/>}
        </div>
    );
  }
}

export default Stundenplan;
