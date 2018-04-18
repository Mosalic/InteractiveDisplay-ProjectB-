import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firstFloor from './First_Floor_Neubau.png';
import './Lageplan.css';

class FirstFloorNeubau extends Component {

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
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1263">
                <title>first_floor</title>
                <image href={firstFloor} />
                <polygon id="Café" className="room" points="800 202 800 155 965 155 965 506 736 506 736 378 736 204 800 202"/>
            </svg>
        </div>
    );
  }
}

export default FirstFloorNeubau;
