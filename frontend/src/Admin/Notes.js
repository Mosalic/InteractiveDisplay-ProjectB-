import React, { Component } from 'react';
import axios from 'axios';
import withAuth from './withAuth';
import FontAwesome from 'react-fontawesome';
import Masonry from 'react-masonry-component';

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

  deleteEvent(id){
    axios.delete(`http://localhost:3001/notes/${id}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('deleted');
      this.getNotes();
    })
    .catch((error) => {
      console.log('error', error);
    })
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
                  <button onClick={() => this.props.editEvent(this.props.id, this.props.event)}>
                    <FontAwesome name="edit" className="icn-edit"/>
                  </button>
                  <button onClick={() => this.deleteEvent(note._id)}>
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
      </div>
    );
  }
}

export default withAuth(Notes);
