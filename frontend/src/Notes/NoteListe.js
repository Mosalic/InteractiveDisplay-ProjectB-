import React, {Component} from 'react';
import '../Notes/NoteList.css'
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
          <div className="note-wrapper">
            
           
            <div className="notes">
              {this.state.notes.map((note, index) =>
                <div className="note" key={index}>
                    
                  <div className="note-foto" style={{backgroundImage: `${note.img ? `url(data:image/png;base64,${new Buffer(note.img.data, 'binary').toString('base64')})`: `url(${require('../User/pinboard-icon.png')})`}`}}>
                  </div>
                  <div className="note-information">
                    <div className="note-heading">
                      <div className="note-name"><h2>{note.name}</h2></div>
                          {/*<span className="funktion">{note.info}</span><br />*/}
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="note-main">
                      <div>Info: <span className="span-info">{note.info}</span></div>
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