/*
 *Anwendungs-Bereich:
 *Der Grundriss der 2.Etage ist importiert und wird angezeigt.
 *Eingegebener String von der Suche muss mit der ID eines Rechtecks übereinstimmen.
 *Gesuchter Raum wird dann markiert.
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import secondFloor from './Second_Floor_Neubau.png';
import './Lageplan.css';

class SecondFloorNeubau extends Component {

  constructor(){
    super();

    this.state = {
      selectedRoom: null,
    };
  }

  componentDidMount(){
    if(this.props.search !== ''){
      if(document.getElementById(this.props.search)){
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
        }
        this.setState({
          selectedRoom: document.getElementById(this.props.search),
        });
        document.getElementById(this.props.search).classList.toggle('selected-room');
      } else {
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
          this.setState({
            selectedRoom: null,
          });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.search !== this.props.search){
      if(document.getElementById(nextProps.search)){
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
        }
        this.setState({
          selectedRoom: document.getElementById(nextProps.search),
        });
        document.getElementById(nextProps.search).classList.toggle('selected-room');
      } else {
        if(this.state.selectedRoom){
          this.state.selectedRoom.classList.remove('selected-room');
          this.setState({
            selectedRoom: null,
          });
        }
      }
    }
  }

  render() {
    return (
        <div className="svg-wrapper">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3401 1855">
                <title>first_floor</title>
                <image href={secondFloor} />
                <polygon id="Bibliothek" className="room" points="239 1411 239 538.5 239 331 1381.5 331 1389 423.5 3136.5 423.5 3136.5 1823.5 2134 1823.5 2134 1411 239 1411"/>
                <rect id="2.004" data-name="2.004" className="room" x="26.5" y="536" width="197.5" height="435"/>
                <rect id="2.003" data-name="2.003" className="room" x="26.5" y="971" width="197.5" height="155"/>
                <rect id="2.002" data-name="2.002" className="room" x="26.5" y="1126" width="197.5" height="295"/>
                <polygon id="2.005" data-name="2.005" className="room" points="319 18.5 621.5 18.5 621.5 331 309 331 319 18.5"/>
                <rect id="2.006" data-name="2.006" className="room" x="621.5" y="18.5" width="317.5" height="312.5"/>
                <rect id="2.007" data-name="2.007" className="room" x="939" y="18.5" width="465" height="312.5"/>
                <rect id="2.008" data-name="2.008" className="room" x="1404" y="18.5" width="325" height="395"/>
                <rect id="2.013" data-name="2.013" className="room" x="2621.5" y="18.5" width="207.5" height="395"/>
                <polygon id="2.014" data-name="2.014" className="room" points="2829 18.5 3136.5 18.5 3136.5 423.5 2829 413.5 2829 18.5"/>
                <rect id="2.015" data-name="2.015" className="room" x="3136.5" y="18.5" width="242.5" height="630"/>
                <rect id="2.016" data-name="2.016" className="room" x="3154" y="648.5" width="225" height="312.5"/>
                <rect id="2.017" data-name="2.017" className="room" x="3154" y="961" width="225" height="312.5"/>
                <rect id="2.018" data-name="2.018" className="room" x="3136.5" y="1273.5" width="242.5" height="240"/>
                <rect id="2.019" data-name="2.019" className="room" x="3136.5" y="1513.5" width="242.5" height="310"/>            </svg>
        </div>
    );
  }
}

export default SecondFloorNeubau;
