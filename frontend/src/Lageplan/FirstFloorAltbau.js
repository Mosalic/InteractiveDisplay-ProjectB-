/*
 *Anwendungs-Bereich:
 *Der Grundriss der 1.Etage ist importiert und wird angezeigt.
 *Eingegebener String von der Suche muss mit der ID eines Rechtecks übereinstimmen.
 *Gesuchter Raum wird dann markiert.
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firstFloor from './First_Floor_Altbau.png';
import './Lageplan.css';

class FirstFloorAltbau extends Component {

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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1199 676">
                <title>first_floor</title>
                <image href={firstFloor} />
                <polygon id="E43a" className="room" points="724.01 404.99 771.03 405 770.96 356.19 763.62 346.63 748.03 339.04 732.03 346.28 724.01 357.5 724.01 404.99"/>
                <polygon id="E45a" className="room" points="648.03 404.99 695.07 404.99 695.07 357.09 686.27 346.37 671.02 339.15 655.27 345.89 648.03 356.06 648.03 404.99"/>
                <rect id="E44" className="room" x="697.01" y="373.98" width="23.99" height="31.01"/>
                <rect id="E42" className="room" x="742.97" y="408.03" width="54" height="103.98"/>
                <rect id="E46" className="room" x="621.01" y="407.99" width="50.97" height="103.98"/>
                <rect id="E48" className="room" x="735" y="541.03" width="103.98" height="54.02"/>
                <rect id="E51" className="room" x="869.02" y="552.02" width="80.94" height="54.97"/>
                <rect id="E52" className="room" x="894.97" y="473" width="24.05" height="49.99"/>
                <rect id="E53" className="room" x="922.01" y="473.01" width="23.98" height="50"/>
                <rect id="E54" className="room" x="949" y="473" width="22.99" height="49.99"/>
                <rect id="E56" className="room" x="1040" y="551.98" width="24.01" height="55.02"/>
                <rect id="E57" className="room" x="1067" y="551.98" width="23.03" height="55.02"/>
                <rect id="E58" className="room" x="1040.03" y="473" width="61.98" height="50.01"/>
                <rect id="E59" className="room" x="1039.99" y="377.03" width="61.99" height="92.96"/>
                <rect id="E62" className="room" x="1040.04" y="244.04" width="61.97" height="107.96"/>
                <rect id="E64" className="room" x="1040.04" y="149.01" width="61.95" height="91.98"/>
                <rect id="E67" className="room" x="948.99" y="99.03" width="62.11" height="47.01"/>
                <rect id="E68a" className="room" x="982.99" y="38.05" width="85.13" height="58.99"/>
                <rect id="E66" className="room" x="1040.04" y="99.03" width="61.95" height="23.97"/>
                <rect id="E63" className="room" x="964" y="225.03" width="47.03" height="137.98"/>
                <rect id="E39" className="room" x="576.01" y="540.98" width="107.01" height="54.01"/>
                <rect id="E33" className="room" x="445.96" y="473" width="43.04" height="50"/>
                <rect id="E49" className="room" x="842.01" y="552.03" width="24.01" height="42.97"/>
                <rect id="E50" className="room" x="868.99" y="473.04" width="24.17" height="38.95"/>
                <rect id="E47" className="room" x="675" y="434.07" width="23" height="77.9"/>
                <rect id="E60" className="room" x="963.95" y="366.04" width="47.01" height="23.97"/>
                <rect id="E61" className="room" x="1040.02" y="353.98" width="61.97" height="21.1"/>
                <rect id="E30" className="room" x="325.14" y="553.07" width="75.82" height="57.3"/>
                <polygon id="E40" className="room" points="686.02 541 698 541 698 572 706 572 706 595.02 686.02 595.02 686.02 541"/>
                <polygon id="E41" className="room" points="709 572.02 716 572.02 716 541 733.02 541 733.02 595 709 595 709 572.02"/>
                <rect id="E38" className="room" x="552.96" y="552.03" width="20.05" height="43.01"/>
                <rect id="E36" className="room" x="526.04" y="552.03" width="23.95" height="59"/>
                <rect id="E35" className="room" x="480.02" y="552.02" width="42.93" height="59.01"/>
                <polygon id="E34" className="room" points="491.99 473 519.02 472.97 519.02 499.01 533.05 499.04 533.05 523 491.99 523 491.99 473"/>
                <polygon id="E37" className="room" points="522 473 550.01 473 550.01 512 536 512 536 496 522 496 522 473"/>
                <rect id="E29" className="room" x="305.02" y="552.03" width="16.99" height="43.01"/>
                <rect id="E28" className="room" x="317.01" y="506.98" width="26.98" height="20"/>
                <rect id="E27" className="room" x="316.99" y="473" width="27" height="15.98"/>
                <rect id="E65" className="room" x="1040.04" y="125.98" width="61.95" height="20.06"/>
                <polygon id="Ditze Hörsaal" className="room" points="199.01 629.03 199.01 618.03 221.9 618.03 221.9 617.01 229.02 617.01 229.02 616.02 232.01 616.02 232.01 615.04 235.04 615.04 235.04 614.06 235.98 614.06 235.98 613 237.95 613 237.95 612.05 238.93 612.05 238.93 611.07 240 611.07 240 610 240.98 610 240.98 609.02 240.98 608.04 242 608.04 242 606.03 243.03 606.03 243.03 604.02 244.01 604.02 244.01 597.96 244.95 597.96 244.95 590.96 244.01 590.96 244.01 584.98 243.06 584.98 243.06 582.03 242.04 582.03 242.04 579.98 241.02 579.98 241.02 577.97 240.03 577.97 240.03 576.99 239.01 576.99 239.01 576.01 238.03 576.01 238.03 574.98 237.04 574.98 237.04 574 235.04 574 235.04 572.98 232.99 572.98 232.99 572.03 230.01 572.03 230.01 570.99 137.95 570.99 137.95 573.99 136.98 573.99 136.98 576.97 136.02 576.97 136.02 581 134.97 581 134.97 585.02 134.01 585.02 134.01 588 133 588 133 591.98 131.98 591.98 131.98 596 131 596 131 600.01 130 600.01 130 602.98 129 602.98 129 606.97 128.01 606.97 128.01 611.02 126.99 611.02 126.99 614.98 125.99 614.98 125.99 618.02 125 618.02 125 622 124 622 124 625.97 123.02 625.97 123.02 629.03 199.01 629.03"/>
                <polygon id="E55" className="room" points="1036.99 551.98 1036.99 607 1000 607 1000 610.94 992.98 620.98 976.47 627.04 963.08 622.1 952 611.97 952 584.15 952 552.02 1036.99 551.98"/>
            </svg>
        </div>
    );
  }
}

export default FirstFloorAltbau;
