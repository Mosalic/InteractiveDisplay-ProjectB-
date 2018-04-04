import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import AddEvent from './AddEvent';

class Events extends Component {
  constructor(){
    super();

    this.state = {
      events: [],
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
      addEventVisible: false,
      event: null,
      eventId: null,
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3001/events')
    .then((response) => {
      this.setState({
        events: response.data.events,
        eventId:  response.data.events.length === 0 ? 0 : (response.data.events[response.data.events.length - 1].id + 1),
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  toggleAddEvent(){
    this.setState({
      addEventVisible: !this.state.addEventVisible,
      event: null,
    })
  }

  deleteEvent(id){
    axios.delete(`http://localhost:3001/events/${id}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('deleted');
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  editEvent(id, event){
    this.setState({
      addEventVisible: true,
      event: event,
      eventId: id,
    });
  }

  render(){
    return(
      <div>
        <button type="button" className="add" onClick={() => this.toggleAddEvent()}>+</button>
        <div className="event">
          <div className="events">
            {this.state.events.map((event, index) =>
              <div className="event__box" key={index}>
                <div className="event__edit">
                  <button onClick={() => this.editEvent(event.id, event)}>
                    <FontAwesome name="edit" className="icn-edit"/>
                  </button>
                  <button onClick={() => this.deleteEvent(event.id)}>
                    <FontAwesome name="trash" className="icn-delete"/>
                  </button>
                </div>
                <div className="event__photo" style={{backgroundImage: `${event.img ? `url(data:image/png;base64,${new Buffer(event.img.data, 'binary').toString('base64')})`: `url(${require('../User/pinboard-icon.png')})`}`}}>
                </div>
                <div className="event__information">
                  <div className="event__heading">
                    <div className="event__date">
                      <div className="event__day">{new Date(event.date).getDate()}</div>
                      <div className="event__month">{this.state.monthMapping[new Date(event.date).getMonth()]}</div>
                    </div>
                    <div className="event__title">
                      {event.name}
                    </div>
                  </div>
                  <div className="event__subheading">
                    <div><FontAwesome name="map-marker-alt" /> {event.place}</div>
                    <div><FontAwesome name="clock" /> {event.time}</div>
                  </div>
                  {/*Informationen aus der Datenbank werden zugewiesen*/}
                  <div className="event__main">
                    {event.information}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
        {this.state.addEventVisible &&
          <AddEvent
            close={() => this.toggleAddEvent()}
            eventId={this.state.eventId}
            event={this.state.event}
          />
        }
      </div>
    );
  }
}

export default Events;
