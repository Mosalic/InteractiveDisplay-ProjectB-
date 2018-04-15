import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

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
    console.log(this.props);
    return(
      <div className="stundenplan__wrapper">
        {this.state.stundenplaene.map((stundenplan, index) =>
          <Link to={`${this.props.match.url}/${stundenplan.id}`}>
            {stundenplan.studiengang}
          </Link>
        )}
      </div>
    );
  }
}

export default Stundenplaene;
