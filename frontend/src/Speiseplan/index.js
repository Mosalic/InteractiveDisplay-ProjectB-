import React, { Component } from 'react';
import Iframe from 'react-iframe';

class Speiseplan extends Component {
  render() {
    return (
      <Iframe url="http://speiseplan.studierendenwerk-hamburg.de/de/420/2018/12/"
        display="initial"
        position="relative"
        allowFullScreen/>
    );
  }
}

export default Speiseplan;
