import React, { Component } from 'react';
import axios from 'axios';
import withAuth from './withAuth';
import FontAwesome from 'react-fontawesome';
import Masonry from 'react-masonry-component';
import AddNote from './AddNote';

class Notes extends Component {
  constructor(){
    super();

    this.state =  {
      notes: [],
      previewImg: null,
      previewVisible: false,
      editNote: null,
      editNoteVisible: false,
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes(){
    axios.get('http://localhost:3001/notes')
    .then((response) => {
      this.setState({
        notes: response.data.notes.reverse(),
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  deleteNote(id){
    axios.delete(`http://localhost:3001/notes/${id}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('deleted');
      this.getNotes();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  openPreview(img){
    this.setState({
      previewImg: img,
      previewVisible: true,
    })
  }

  closePreview(){
    this.setState({
      previewImg: null,
      previewVisible: false,
    })
  }

  editNote(note){
    this.setState({
      editNote: note,
      editNoteVisible: true,
    });
  }

  closeEditNote(){
    this.setState({
      editNote: null,
      editNoteVisible: false,
    });
  }

  render(){
    return(
      <div>
        <div className="notes-wrapper">
          <Masonry
            className={'my-gallery-class'}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {this.state.notes.map((note, index) =>
              <div className="note" key={index}>
                <div className="event__edit">
                  <button onClick={() => this.editNote(note)}>
                    <FontAwesome name="edit" className="icn-edit"/>
                  </button>
                  <button onClick={() => this.deleteNote(note._id)}>
                    <FontAwesome name="trash" className="icn-delete"/>
                  </button>
                </div>
                {note.img &&
                  <div>
                    <img className="note-img" onClick={() => this.openPreview(note.img.data)} src={`data:image/png;base64,${new Buffer(note.img.data, 'binary').toString('base64')}`} />
                    <hr />
                  </div>
                }
                <div className="note-information">
                  <div className="note-heading">
                    <h3>{note.name}</h3>
                  </div>
                  <div className="note-main">
                    {note.info}
                  </div>
                </div>

              </div>
            )}
          </Masonry>
        </div>
        {this.state.previewVisible &&
          <div>
            <div onClick={() => this.closePreview()} className="backdrop"></div>
            <img className="preview-img" src={`data:image/png;base64,${new Buffer(this.state.previewImg, 'binary').toString('base64')}`} />
          </div>
        }
        {this.state.editNoteVisible &&
          <AddNote
            note={this.state.editNote}
            close={() => this.closeEditNote()}
            getNotes={() => this.getNotes()}
          />
        }
      </div>
    );
  }
}

export default withAuth(Notes);
