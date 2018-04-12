import React, { Component } from 'react';
import Iframe from 'react-iframe';
import moment from 'moment';

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
      <Iframe url={`http://speiseplan.studierendenwerk-hamburg.de/de/420/${this.state.link}`}
        display="initial"
        position="relative"
        allowFullScreen/>
    );
  }
}

export default Speiseplan;
