import React, { Component } from 'react';
import axios from 'axios';

class Stundenplaene extends Component{
  constructor(){
    super();

    this.state = {
      stundenplaene: [],
    }
  }

  componentDidMount(){
    this.getStundenplaene();
  }

  getStundenplaene(){
    axios.get('http://localhost:3001/stundenplaene')
    .then((response) => {
      this.setState({
        stundenplaene: response.data.data.stundenplaene,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render(){
    return(
      <div className="stundenplan__wrapper">
        {this.state.stundenplaene.map((stundenplan, index) =>
          <button key={index} onClick={() => this.toggleEditStundenplan(stundenplan)}>
            {stundenplan.studiengang}
          </button>
        )}
      </div>
    );
  }
}

export default Stundenplaene;
