import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import basementFloor from './Basement_Floor_Altbau.png';
import './Lageplan.css';

class BasementFloorAltbau extends Component {

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
      console.log('wuhuh');
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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1199 779">
                <title>basement_floor</title>
                <image href={basementFloor} />
                <rect id="U44" className="room" x="609.03" y="494.07" width="61.01" height="125.98"/>
                <rect id="U45" className="room" x="673.96" y="535.86" width="24.1" height="84.19"/>
                <rect id="U43" className="room" x="674.03" y="494.01" width="23.96" height="20.01"/>
                <polygon id="U42a_b" className="room" points="641.03 490 698 490 698 441.02 687.81 428.72 669.5 421.02 649.97 428.35 640.97 441.01 640.97 466 637.98 466 637.98 452.03 609 452.03 609 490 637.99 490 638 481 641.06 481 641.03 490"/>
                <polygon id="U41a_b" className="room" points="734 490 790.99 490 790.99 481 795.01 481 795.01 490 823 490 823 452 795.01 452 794.99 466 790.98 466 791.01 441.13 781.31 428.96 763.02 420.96 743.47 428.69 734 441.06 734 490"/>
                <rect id="U37" className="room" x="659.02" y="657" width="25.97" height="65.99"/>
                <rect id="U36" className="room" x="549.03" y="657" width="106.93" height="65.99"/>
                <rect id="U46" className="room" x="743.96" y="657" width="19.06" height="66.01"/>
                <rect id="U48" className="room" x="766.93" y="657" width="108.02" height="65.98"/>
                <rect id="U49" className="room" x="877.98" y="669.96" width="24.07" height="53.02"/>
                <rect id="U50" className="room" x="905.99" y="669.96" width="28.99" height="66.1"/>
                <rect id="U51" className="room" x="905.97" y="572.98" width="34.02" height="47.01"/>
                <rect id="U52" className="room" x="943.02" y="572.98" width="23.97" height="61.02"/>
                <rect id="U54" className="room" x="971.03" y="572.98" width="23.95" height="60.98"/>
                <rect id="U55" className="room" x="999.02" y="572.98" width="23.97" height="60.98"/>
                <rect id="U60" className="room" x="1027.02" y="572.98" width="24.01" height="60.98"/>
                <rect id="U64" className="room" x="1027" y="308.1" width="52.06" height="163.95"/>
                <rect id="U66" className="room" x="1027" y="270.92" width="52.06" height="34.08"/>
                <rect id="U72" className="room" x="1008.01" y="141" width="37.97" height="34"/>
                <rect id="U69" className="room" x="1049.99" y="140.99" width="29.02" height="34.06"/>
                <polygon id="U38" className="room" points="688.01 657 703.04 657 703.04 694 725.02 694 725.02 657 739.95 657 739.95 723.02 688.01 723.02 688.01 657"/>
                <rect id="U35" className="room" x="524.99" y="675.02" width="20.03" height="47.94"/>
                <rect id="U33" className="room" x="474.01" y="675.02" width="47.98" height="65.97"/>
                <rect id="U31" className="room" x="437" y="675.04" width="34.05" height="65.95"/>
                <polygon id="U34" className="room" points="488.02 573.03 488.02 601.99 503.97 602 503.97 620.06 521.95 620.06 521.95 572.97 488.02 573.03"/>
                <polygon id="U32" className="room" points="394.97 573 485.03 573 485.03 605.04 501 605.04 501 633.99 394.97 633.99 394.97 573"/>
                <rect id="U30" className="room" x="340" y="675.04" width="93.05" height="33.95"/>
                <rect id="U26" className="room" x="228.06" y="573.11" width="42.94" height="19.86"/>
                <rect id="U27" className="room" x="228.06" y="614.93" width="42.94" height="24.06"/>
                <polygon id="U28" className="room" points="228.02 642.95 228.02 671.09 233.03 671.09 233.03 674.95 224.04 674.95 224.04 713.16 242.91 713.16 242.91 671.22 271 671.22 271 642.95 228.02 642.95"/>
                <rect id="U70" className="room" x="1114.97" y="112.91" width="80" height="62.13"/>
                <rect id="U68" className="room" x="1114.97" y="177.96" width="80" height="80"/>
                <rect id="U67" className="room" x="1114.97" y="261.87" width="80" height="29.08"/>
                <rect id="U65" className="room" x="1114.97" y="294" width="80" height="25.02"/>
                <rect id="U63" className="room" x="1114.97" y="321.91" width="80" height="52.06"/>
                <rect id="U62" className="room" x="1114.97" y="377.96" width="80" height="75.06"/>
                <rect id="U61" className="room" x="1114.97" y="456.97" width="80" height="29.07"/>
                <rect id="U60-2" className="room" x="1114.97" y="488.76" width="80" height="80.27"/>
                <rect id="U59" className="room" x="1114.97" y="573.03" width="80" height="60.95"/>
                <rect id="U58" className="room" x="1114.97" y="637.81" width="79.97" height="29.2"/>
                <rect id="U57" className="room" x="1072.95" y="669.88" width="107.97" height="66.17"/>
                <polygon id="U56" className="room" points="1012.88 689.95 1012.88 749.02 1022.99 760.72 1041.28 767.96 1060.66 760.97 1070 748.07 1070 670.02 1012.88 670.02 1012.88 689.95"/>
                <rect id="U53" className="room" x="939.05" y="669.88" width="70.04" height="66.17"/>
                <rect id="U71a_b" className="room" x="1049.96" y="44" width="103.1" height="66.03"/>
                <rect id="U47" className="room" x="827.07" y="595.87" width="23.87" height="24.12"/>
                <rect id="U40" className="room" x="757.02" y="494.03" width="65.99" height="98.96"/>
                <rect id="U39a_b" className="room" x="757.02" y="595.87" width="65.99" height="24.12"/>
                <rect id="U29a_b" className="room" x="247.03" y="675.04" width="88.94" height="65.94"/>
            </svg>
        </div>
    );
  }
}

export default BasementFloorAltbau;
