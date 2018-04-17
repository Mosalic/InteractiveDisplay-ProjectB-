import React, {Component} from 'react';
import './EventListe.css'
import axios from 'axios';
import Event from './Event';

class EventListe extends Component{
 constructor(){
    super();

    this.state = {
      events: [],
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
    }
  }


  componentDidMount(){
    let events = [];
    axios.get('http://localhost:3001/events')
    .then((response) => {
      events = response.data.events.sort((a,b) => {
        return new Date(a.startDate).getTime() -
            new Date(b.startDate).getTime()
          });
      events.forEach((event, index) => {
        let now = new Date();
        if(event.endDate !== null){
          if(new Date(event.endDate) < now){
            events.splice(index, 1);
          }
        }else if (new Date(event.startDate) < now) {
          events.splice(index, 1);
        }
      })
      this.setState({
        events,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
      return (
        <div>
        <h1>Veranstaltungen</h1>
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
