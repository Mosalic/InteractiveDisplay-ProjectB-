import React, {Component} from 'react';
import '../Professoren/List.css'
import axios from 'axios';
import AddProfessor from '../Admin/Events';
import FontAwesome from 'react-fontawesome';

class NoteListe extends Component{
 constructor(){
    super();

    this.state = {
      notes: [],
      addNote: false, //brauchen wir das ? und die id?
      nextNoteId: null,
      /*editProfessor: {},*/
    }
  }


  componentDidMount(){
    axios.get('http://localhost:3001/notes')
    .then((response) => {
      this.setState({
        notes: response.data.notes,
        nextNoteId: response.data.notes[response.data.notes.length - 1].id + 1,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }


  render() {
    return (
        <div>
        <h1>Schwarzes Brett</h1>
          <div className="professoren-wrapper">
            
           
            <div className="professoren">
              {this.state.notes.map((note, index) =>
                <div className="professor" key={index}>
                    
                 {/* <div className="professor__edit">
                      <button onClick={() => this.editProfessor(professor)}>
                      <FontAwesome name="edit" className="icn-edit"/>
                    </button>
                    <button onClick={(id) => this.deleteProfessor(professor.id)}>
                      <FontAwesome name="trash" className="icn-delete"/>
                    </button>
                  </div>*/}
                  <div className="professor-foto" style={{backgroundImage: `${note.img ? `url(data:image/png;base64,${new Buffer(note.img.data, 'binary').toString('base64')})`: `url(${require('../User/pinboard-icon.png')})`}`}}>
                  </div>
                  <div className="professor-information">
                    <div className="professor-heading">
                      <div className="professor-name"><h2>{note.name}</h2></div>
                          {/*<span className="funktion">{note.info}</span><br />*/}
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="professor-main">
                      <div>{/*<img className="room-image" src={ require('./location.png') } /> vllt Icon*/}Info: <span className="span-info">{note.info}</span></div>
                          {/*<div>Uhrzeit: <span>{event.time}</span></div>
                      <div>Datum: <span>{event.date}</span></div>*/}
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

export default NoteListe; /*um das in anderen Dateien importieren zu können*/