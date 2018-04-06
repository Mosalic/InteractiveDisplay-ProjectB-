import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import AddEvent from './AddEvent';
import Event from './Event';

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
    this.getEvents();
  }

  getEvents(){
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
      this.getEvents();
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
        <div className="admin__btn-add"><button type="button" className="add" onClick={() => this.toggleAddEvent()}>+</button></div>
        <div className="event">
          <div className="events">
            {this.state.events.map((event, index) =>
              <Event key={index}
                deleteEvent={(id) => this.deleteEvent(id)}
                editEvent={(id, event) => this.editEvent(id, event)}
                id={event.id}
                event={event}
              />
            )}
          </div>
        </div>
        {this.state.addEventVisible &&
          <AddEvent
            close={() => this.toggleAddEvent()}
            eventId={this.state.eventId}
            event={this.state.event}
            getEvents={() => this.getEvents()}
          />
        }
      </div>
    );
  }
}

export default Events;
