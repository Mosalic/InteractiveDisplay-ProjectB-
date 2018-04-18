import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fourthFloor from './Fourth_Floor_Neubau.png';
import './Lageplan.css';

class FourthFloorNeubau extends Component {

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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 656">
                <title>fourth_floor</title>
                <image href={fourthFloor} />
                <rect id="4.001" data-name="4.001" className="room" x="436.67" y="106.33" width="118" height="130.67"/>
                <polygon id="4.002" data-name="4.002" className="room" points="554.67 243 554.67 328 475.33 328 475.33 241 554.67 243"/>
                <rect id="4.003" data-name="4.003" className="room" x="475.33" y="377.67" width="79.33" height="68"/>
                <rect id="4.004" data-name="4.004" className="room" x="392.67" y="377.67" width="76.67" height="68"/>
                <rect id="4.005" data-name="4.005" className="room" x="308" y="377.67" width="79.33" height="68"/>
                <rect id="4.006" data-name="4.006" className="room" x="200.67" y="377.67" width="103.33" height="68"/>
                <rect id="4.007" data-name="4.007" className="room" x="86" y="377.67" width="109.33" height="68"/>
                <rect id="4.008" data-name="4.008" className="room" x="10.67" y="342.33" width="70.67" height="103.33"/>
                <rect id="4.008a" data-name="4.008a" className="room" x="10.67" y="206.33" width="70.67" height="131.33"/>
                <rect id="4.009" data-name="4.009" className="room" x="86" y="237" width="74.67" height="91"/>
                <rect id="4.010" data-name="4.010" className="room" x="86" y="176.33" width="74.67" height="56.67"/>
                <rect id="4.011" data-name="4.011" className="room" x="86" y="9" width="54.67" height="69.33"/>
                <rect id="4.012" data-name="4.012" className="room" x="145.33" y="9" width="50" height="69.33"/>
                <rect id="4.013" data-name="4.013" className="room" x="200.67" y="9" width="49.33" height="69.33"/>
                <rect id="4.014" data-name="4.014" className="room" x="255.5" y="9" width="48.5" height="69.33"/>
                <rect id="4.015" data-name="4.015" className="room" x="310.5" y="9" width="49" height="69.33"/>
                <rect id="4.016" data-name="4.016" className="room" x="364.5" y="9" width="50.5" height="69.33"/>
                <rect id="4.017" data-name="4.017" className="room" x="421.5" y="9" width="47.83" height="69.33"/>
                <polygon id="4.018" data-name="4.018" className="room" points="475.33 9 554.67 9 554.67 106.33 475.33 74 475.33 9"/>
                <rect id="4.019" data-name="4.019" className="room" x="560" y="9" width="183.5" height="139.5"/>
                <polygon id="Videolabore" className="room" points="0 0 560 0 560 455 4 455 0 0"/>
                <polygon id="4.024" data-name="4.024" className="room" points="859.5 9 911.5 9 911.5 148.5 859.5 148.5 859.5 11.5 859.5 9"/>
                <rect id="4.025" data-name="4.025" className="room" x="916.5" y="9" width="52" height="139.5"/>
                <rect id="4.026" data-name="4.026" className="room" x="973" y="9" width="217.5" height="139.5"/>
                <rect id="4.027" data-name="4.027" className="room" x="918.5" y="397" width="132" height="103.5"/>
                <rect id="4.028" data-name="4.028" className="room" x="1055.5" y="397" width="134.5" height="248"/>
                <rect id="4.029" data-name="4.029" className="room" x="997.5" y="504.5" width="53" height="140.5"/>
                <rect id="4.030" data-name="4.030" className="room" x="918.5" y="504.5" width="75" height="140.5"/>
                <polygon id="4.031" data-name="4.031" className="room" points="914 645 750.5 645 750.5 534.5 824 534.5 824 451.5 914 451.5 914 645"/>
                <rect id="4.032" data-name="4.032" className="room" x="750.5" y="451.5" width="69" height="78.5"/>
                <polygon id="4.020" data-name="4.020" className="room" points="433.33 106.33 433.33 201 372.67 165.67 372.67 106.33 433.33 106.33"/>
                <rect id="4.021" data-name="4.021" className="room" x="319" y="106.33" width="48.5" height="59.17"/>
                <rect id="4.022" data-name="4.022" className="room" x="267.5" y="106.33" width="46" height="59.17"/>
                <polygon id="4.023" data-name="4.023" className="room" points="200.67 106.33 263.5 106.33 263.5 165.5 200.67 204.67 200.67 106.33"/>
             </svg>
        </div>
    );
  }
}

export default FourthFloorNeubau;
