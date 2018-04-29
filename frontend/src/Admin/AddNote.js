/*
 *Admin-Bereich:
 *Diese Komponente ist zum Bearbeiten der Einträge auf dem schwarzen Brett.
*/

import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class AddNote extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: props.note ? props.note.name : '',
      info: props.note ? props.note.info : '',
      imgUrl: props.note ? props.note.imgUrl : '',
      base64: props.note ? props.note.img ? `data:image/png;base64,${new Buffer(props.note.img.data, 'binary').toString('base64')}` : '' : '',
      id: props.note ? props.note._id : '',
    }
  }

  save(){
    this.update();
  }

  update(){
    axios.put(`http://localhost:3001/notes/${this.state.id}`, {
      name: this.state.name,
      info: this.state.info,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor updated');
      if(response.status === 200){
        this.props.close();
        this.props.getNotes();
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
    if(this.state.imgUrl){
      let formData = new FormData();
      formData.append('img', this.state.imgUrl);
      axios.put(`http://localhost:3001/notes/${this.state.id}/image`, formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        console.log('Picture updated');
        if(response.status === 200){

        }
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
    if(this.props.base64 !== this.state.base64 && this.state.base64 === ''){
      axios.delete(`http://localhost:3001/notes/${this.state.id}/image`, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        console.log('Picture deleted');
        if(response.status === 200){

        }
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  encodeImageFileAsURL(element){
      this.setState({
          imgUrl: element.target.files[0]
      });
      var file = element.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
          this.setState({
              base64: reader.result,
          })
      }.bind(this)
      reader.readAsDataURL(file);
  }

  deleteImg(){
    this.setState({
      imgUrl: '',
      base64: '',
    });
  }

  render(){
    console.log(this.props.note);
    return(
      <div className="backdrop">
        <div className="modal">
          <h2>Pin bearbeiten</h2>
          <button className="btn-close" type="button" onClick={() => this.props.close()}>x</button>
          <form>
            <div className="note-input-fields">
              Titel
              <input value={this.state.name} name="name" type="text" placeholder="Gib dem Pin einen Title" onChange={(e) => this.handleChange(e)} />
              Beschreibung
              <textarea value={this.state.info} name="info" placeholder="Zusätzliche Informationen" onChange={(e) => this.handleChange(e)} />
            </div>
            <div className="foto">
              <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
              {this.state.base64 === '' ?
              <label htmlFor="foto">
                  <FontAwesome name="plus" className="icn-edit"/>
                  <span>Füge ein Foto hinzu.</span>
              </label>
              :
              <div>
                <label htmlFor="foto">
                  <img className="pinboard-foto" src={this.state.base64} />
                  {/* <div className="pinboard-foto" style={{backgroundImage: `url(${this.state.base64})`}}> */}
                {/* </div> */}
                </label>
                <br />
                <button onClick={() => this.deleteImg()} className="btn-delete"><FontAwesome name="minus-circle" className="icn-delete"/><span>Foto entfernen</span></button>
              </div> }
            </div>
          </form>
          <div className="button-footer">
            <button className="btn-save" type="button" onClick={() => this.save()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNote;
