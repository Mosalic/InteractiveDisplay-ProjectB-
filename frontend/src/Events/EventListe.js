import React, {Component} from 'react';
import '../Professoren/List.css'
import axios from 'axios';
import AddProfessor from '../Admin/Events';
import FontAwesome from 'react-fontawesome';

class EventListe extends Component{
 constructor(){
    super();

    this.state = {
      events: [],
      addEvent: false,
      nextEventId: null,
      /*editProfessor: {},*/
    }
  }


  componentDidMount(){
    axios.get('http://localhost:3001/events')
    .then((response) => {
      this.setState({
        events: response.data.events,
        nextEventId: response.data.events[response.data.events.length - 1].id + 1,
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
          <div className="professoren-wrapper">
            
           
            <div className="professoren">
              {this.state.events.map((event, index) =>
                <div className="professor" key={index}>
                    
                 {/* <div className="professor__edit">
                      <button onClick={() => this.editProfessor(professor)}>
                      <FontAwesome name="edit" className="icn-edit"/>
                    </button>
                    <button onClick={(id) => this.deleteProfessor(professor.id)}>
                      <FontAwesome name="trash" className="icn-delete"/>
                    </button>
                  </div>*/}
                  <div className="professor-foto" style={{backgroundImage: `${event.img ? `url(data:image/png;base64,${new Buffer(event.img.data, 'binary').toString('base64')})`: `url(${require('../User/pinboard-icon.png')})`}`}}>
                  </div>
                  <div className="professor-information">
                    <div className="professor-heading">
                      <div className="professor-name"><h2>{event.name}</h2></div>
                      <span className="funktion">{event.information}</span><br />
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="professor-main">
                      <div>{/*<img className="room-image" src={ require('./location.png') } /> vllt Icon*/}Ort: <span className="span-info">{event.place}</span></div>
                      <div>Uhrzeit: <span>{event.time}</span></div>
                      <div>Datum: <span>{event.date}</span></div>
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