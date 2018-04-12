import React, { Component } from 'react';
import axios from 'axios';

class Notes extends Component {
  constructor(){
    super();

    this.state =  {
      notes: [],
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes(){
    axios.get('http://localhost:3001/notes')
    .then((response) => {
      this.setState({
        notes: response.data.notes,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render(){
    return(
      <div>
        {this.state.notes.map((note, index) =>
          <div>
            {note.name}
          </div>
        )}
      </div>
    );
  }
}

export default Notes;
