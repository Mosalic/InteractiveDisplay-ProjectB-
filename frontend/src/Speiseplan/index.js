import React, { Component } from 'react';
import Iframe from 'react-iframe';
import moment from 'moment';
import { Link } from 'react-router-dom';
import backLogo from '../backBtn.png';
import '../App.css';

class Speiseplan extends Component {
  constructor(){
    super();

    console.log(moment().isoWeek());
    console.log(moment().year());

    this.state = {
      link: `${moment().year()}/${moment().isoWeek()}/`,
    };
  }

  render() {
    return (
        <div className="frameDiv">
            <h1>Speiseplan</h1>
            <Iframe url={`http://speiseplan.studierendenwerk-hamburg.de/de/420/${this.state.link}`}
            display="initial"
            position="relative"
            allowFullScreen/>
        </div>
    );
  }
}

export default Speiseplan;
