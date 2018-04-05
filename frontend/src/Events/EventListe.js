import React, {Component} from 'react';
import './EventListe.css'
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
// import Moment from 'react-moment';

class EventListe extends Component{
 constructor(){
    super();

    this.state = {
      events: [],
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
      showText: null,
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


  showText(index){
    this.setState({
      showText: index,
    });
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
                <div className="event__box" key={index}>

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
                      <div></div>
                    </div>
                    <div className="event__subheading">
                      <div><FontAwesome name="map-marker-alt" /> {event.place}</div>
                      <div><FontAwesome name="clock" /> {event.time}</div>
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="event__main" style={ { maxHeight: `${this.state.showText === index ? '1000px' : '300px' }` }} >
                      {event.information}
                    </div>
                  </div>
                  {this.state.showText !== index &&
                    <div className="event__footer" onClick={() => this.showText(index)}>
                      <FontAwesome name="angle-down" /> <span>Gesamten Text anzeigen</span>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default EventListe; /*um das in anderen Dateien importieren zu können*/
