import React, {Component} from 'react';
import './EventListe.css'
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class EventListe extends Component{
 constructor(){
    super();

    this.state = {
      events: [],
    }
  }


  componentDidMount(){
    axios.get('http://localhost:3001/events')
    .then((response) => {
      this.setState({
        events: response.data.events,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }


  render() {
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
                      {event.name}
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
        </div>
    );
  }
}

export default EventListe; /*um das in anderen Dateien importieren zu können*/
