import React, {Component} from 'react';
import './EventListe.css'
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import Event from './Event';
// import Moment from 'react-moment';

class EventListe extends Component{
 constructor(){
    super();

    this.state = {
      events: [],
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
    }
  }


  componentDidMount(){
    axios.get('http://localhost:3001/events')
    .then((response) => {
      this.setState({
        events: response.data.events.sort((a,b) => {
          return new Date(a.scheduled_for).getTime() -
              new Date(b.scheduled_for).getTime()
      }).reverse(),
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    //Events nach dem Datum sortieren
    //   var sorted_meetings = this.state.events.sort((a,b) => {
    //     return new Date(a.scheduled_for).getTime() -
    //         new Date(b.scheduled_for).getTime()
    // }).reverse();


      return (
        <div>
        <h1>Event Liste</h1>
          <div className="event">


            <div className="events">
              {this.state.events.map((event, index) =>
                <Event key={index} event={event} id={event.id}/>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default EventListe; /*um das in anderen Dateien importieren zu können*/
