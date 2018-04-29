/*
 *Anwendungs-Bereich:
 *Der Grundriss der 3.Etage ist importiert und wird angezeigt.
 *Eingegebener String von der Suche muss mit der ID eines Rechtecks übereinstimmen.
 *Gesuchter Raum wird dann markiert.
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import thirdFloor from './Third_Floor_Neubau.png';
import './Lageplan.css';

class ThirdFloorNeubau extends Component {

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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 655">
                <title>first_floor</title>
                <image href={thirdFloor} />
                <rect id="3.001" data-name="3.001" className="room" x="641" y="428" width="105" height="69"/>
                <rect id="3.002" data-name="3.002" className="room" x="527.17" y="428" width="110" height="73.83"/>
                <rect id="3.003" data-name="3.003" className="room" x="418" y="428" width="109.17" height="73.83"/>
                <rect id="3.004" data-name="3.004" className="room" x="303.38" y="428" width="114.62" height="73.83"/>
                <rect id="3.005" data-name="3.005" className="room" x="194.92" y="428" width="108.46" height="73.83"/>
                <rect id="3.006" data-name="3.006" className="room" x="84.92" y="428" width="103.85" height="73.83"/>
                <rect id="3.007" data-name="3.007" className="room" x="12.62" y="399.08" width="72.31" height="102.76"/>
                <rect id="3.008" data-name="3.008" className="room" x="12.62" y="342.15" width="72.31" height="56.92"/>
                <rect id="3.009" data-name="3.009" className="room" x="12.62" y="205.23" width="72.31" height="136.92"/>
                <polygon id="3.010" data-name="3.010" className="room" points="121.08 292.15 121.08 387.54 219.54 387.54 258 339.85 194.92 282.92 121.08 292.15"/>
                <polygon id="3.011" data-name="3.011" className="room" points="121.08 292.15 121.08 172.15 189.54 186.77 189.54 277.54 121.08 292.15"/>
                <polygon id="3.012" data-name="3.012" className="room" points="258 116 194.92 182.92 121.08 168.31 121.08 48.31 244.92 48.31 258 116"/>
                <polygon id="3.013" data-name="3.013" className="room" points="374.92 48.31 249.15 48.31 266.46 115.61 360.69 115.61 374.92 48.31"/>
                <polygon id="3.014" data-name="3.014" className="room" points="374.92 48.31 458.77 48.31 458.77 179.08 425.69 179.08 364.92 113.69 374.92 48.31"/>
                <polygon id="3.015" data-name="3.015" className="room" points="458.77 182.92 458.77 236 427.23 236 364.92 338.31 262.62 338.31 194.92 279.08 194.92 186.77 264.15 120.61 360.69 120.61 422.62 182.92 458.77 182.92"/>
                <polygon id="3.016" data-name="3.016" className="room" points="548.77 239.85 548.77 387.54 411.85 391.38 370.31 338.31 428.77 239.85 548.77 239.85"/>
                <rect id="Tonlabore" className="room" width="600" height="506.77"/>
                <rect id="3.023" data-name="3.023" className="room" x="893.38" y="48.31" width="74.62" height="83.85"/>
                <polygon id="3.021" data-name="3.021" className="room" points="1188.77 192.92 1134.92 192.92 1134.92 78.31 1006.46 78.31 1006.46 6.77 1188.77 9.85 1188.77 192.92"/>
                <polygon id="3.022" data-name="3.022" className="room" points="968 48.31 1003.38 48.31 1003.38 81.96 1074.15 81.96 1074.15 192.92 968 192.92 968 48.31"/>
                <rect id="3.022a" data-name="3.022a" className="room" x="1078" y="81.96" width="56.92" height="110.96"/>
                <rect id="3.024" data-name="3.024" className="room" x="893.38" y="196.77" width="295.38" height="194.62"/>
                <polygon id="3.025" data-name="3.025" className="room" points="893.38 396.77 1078 396.77 1078 497 866.46 497 866.46 446.88 893.38 446.88 893.38 396.77"/>
                <rect id="3.026" data-name="3.026" className="room" x="1082.62" y="396.77" width="106.15" height="50.12"/>
                <rect id="3.027" data-name="3.027" className="room" x="1082.62" y="446.88" width="106.15" height="197.58"/>
                <rect id="3.028" data-name="3.028" className="room" x="972.23" y="501.83" width="105.77" height="142.63"/>
                <rect id="3.029" data-name="3.029" className="room" x="866.46" y="501.83" width="101.54" height="142.63"/>
                <rect id="3.030" data-name="3.030" className="room" x="751.85" y="451.38" width="114.62" height="193.08"/>
                <polygon id="Lichtlabore" className="room" points="1200 0 1200 655 866.46 652.15 866.46 0 1200 0"/>           </svg>
        </div>
    );
  }
}

export default ThirdFloorNeubau;
