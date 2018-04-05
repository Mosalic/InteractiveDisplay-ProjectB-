import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Event extends Component {
  constructor(props){
    super(props);

    this.state = {
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
      showText: false,
      tooBig: false,
    };
  }

  showText(){
    this.setState({
      showText: true,
    });
  }

  componentDidMount(){
    if(document.getElementById(`event__${this.props.id}`).offsetHeight > 300){
      this.setState({
        tooBig: true,
      });
    }
  }

  render(){
    return(
      <div className="event__box">
        <div className="event__edit">
          <button onClick={() => this.props.editEvent(this.props.id, this.props.event)}>
            <FontAwesome name="edit" className="icn-edit"/>
          </button>
          <button onClick={() => this.props.deleteEvent(this.props.id)}>
            <FontAwesome name="trash" className="icn-delete"/>
          </button>
        </div>
        <div className="event__photo" style={{backgroundImage: `${this.props.event.img ? `url(data:image/png;base64,${new Buffer(this.props.event.img.data, 'binary').toString('base64')})`: `url(${require('../User/pinboard-icon.png')})`}`}}>
        </div>
        <div className="event__information">
          <div className="event__heading">
            <div className="event__date">
              <div className="event__day">{new Date(this.props.event.date).getDate()}</div>
              <div className="event__month">{this.state.monthMapping[new Date(this.props.event.date).getMonth()]}</div>
            </div>
            <div className="event__title">
              {this.props.event.name}
            </div>
          </div>
          <div className="event__subheading">
            <div><FontAwesome name="map-marker-alt" /> {this.props.event.place}</div>
            <div><FontAwesome name="clock" /> {this.props.event.time}</div>
          </div>
          {/* <div id={`event__${this.props.id}`} className="event__main" style={ { maxHeight: `${this.state.showText ? '1000px' : '300px' }` } }> */}
          <div id={`event__${this.props.id}`} className={`${this.state.tooBig && 'tooBig '}event__main ${this.state.showText && 'showText'}`}>
            {this.props.event.information}
          </div>
        </div>
        {(!this.state.showText && this.state.tooBig) &&
          <div className="event__footer" onClick={() => this.showText()}>
            <FontAwesome name="angle-down" /> <span>Gesamten Text anzeigen</span>
          </div>
        }
      </div>
    );
  }
}

export default Event;
