/*
 *Anwendungs-Bereich:
 *Hier werden die aktuellen Notes vom Schwarzen Brett aus der Datenbank geholt und angezeigt.
*/

import React, {Component} from 'react';
import axios from 'axios';
import './NoteListe.css';
import Masonry from 'react-masonry-component';

class NoteListe extends Component{
 constructor(){
    super();

    this.state = {
      notes: [],
      previewImg: null,
      previewVisible: false,
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

  render() {
    return (
        <div>
        <h1>Schwarzes Brett</h1>
          <div className="notes-wrapper">
            <Masonry
              className={'my-gallery-class'}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
            >
              {this.state.notes.map((note, index) =>
                <div className="note" key={index}>
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

export default NoteListe; /*um das in anderen Dateien importieren zu können*/
