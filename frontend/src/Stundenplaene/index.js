/*
 *Anwendungs-Bereich:
 *Hier werden die Namen aktuellen Stundenpläne aus der Datenbank geholt und angezeigt.
 *Über Buttons gelangt man zu den weiteren Angaben zum Stundenplan.
*/


import React, { Component } from 'react';
import axios from 'axios';
import './Stundenplan.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import backLogo from '../backBtn.png';

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

        <div>
            <h1>Studiengänge</h1>
            <div className="stundenplan__wrapper">
                {this.state.stundenplaene.map((stundenplan, index) =>
                  <Link key={index} to={`${this.props.match.url}/${stundenplan.id}`} style={{ textDecoration: 'none' }}>
                    <div className="stundenplan__button">
                        <span>{stundenplan.studiengang}</span>

                        <div className="recXDown"></div>
                        <div className="recYDown"></div>
                        <div className="recXUp"></div>
                        <div className="recYUp"></div>

                    </div>
                  </Link>
                )}
            </div>
        </div>


    );
  }
}

export default Stundenplaene;
