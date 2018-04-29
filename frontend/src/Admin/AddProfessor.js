/*
 *Admin-Bereich:
 *Die Administratoren können neue Professoren anlegen.
 *Die Eingaben der Erstellungsmaske werden vom Formular in die 
 *Datenbank-Collection "professorens" übernommen und gespeichert
*/

import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'

class AddProfessor extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      funktion: '',
      raum: '',
      email: '',
      telefonnummer: '',
      sprechzeiten: '',
      imgUrl: '',
      base64: require('./dummy-image.jpeg'),
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      console.log(nextProps);
      if(Object.keys(nextProps.professor).length !== 0){
        this.setState({
          name: nextProps.professor.name,
          funktion: nextProps.professor.funktion,
          raum: nextProps.professor.raum,
          email: nextProps.professor.email,
          telefonnummer: nextProps.professor.telefonnummer,
          sprechzeiten: nextProps.professor.sprechzeiten,
          imgUrl: nextProps.professor.imgUrl,
          base64: nextProps.professor.img ? `data:image/png;base64,${new Buffer(nextProps.professor.img.data, 'binary').toString('base64')}` : require('./dummy-image.jpeg'),
        });
      } else {
        this.setState({
          name: '',
          funktion: '',
          raum: '',
          email: '',
          telefonnummer: '',
          sprechzeiten: '',
          imgUrl: '',
          base64: require('./dummy-image.jpeg'),
        });
      }
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  save(){
    if(Object.keys(this.props.professor).length !== 0){
      this.update();
    } else {
      this.create();
    }
  }

  create(){
    let formData = new FormData();
    formData.append('img', this.state.imgUrl);
    formData.append('name', this.state.name);
    formData.append('funktion', this.state.funktion);
    formData.append('raum', this.state.raum);
    formData.append('email', this.state.email);
    formData.append('telefonnummer', this.state.telefonnummer);
    formData.append('sprechzeiten', this.state.sprechzeiten);
    formData.append('id', this.props.nextProfessorId);
    axios.post('http://localhost:3001/professoren', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Professor added');
      if(response.status === 200){
        this.props.close();
        this.props.getProfessoren();
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  update(){
    axios.put(`http://localhost:3001/professoren/${this.props.professor.id}`, {
      name: this.state.name,
      funktion: this.state.funktion,
      raum: this.state.raum,
      email: this.state.email,
      telefonnummer: this.state.telefonnummer,
      sprechzeiten: this.state.sprechzeiten,
      id: this.props.professor.id,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor updated');
      if(response.status === 200){
        this.props.close();
        this.props.getProfessoren();
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
    console.log(this.state.imgUrl);
    if(this.state.imgUrl){
      let formData = new FormData();
      formData.append('img', this.state.imgUrl);
      axios.put(`http://localhost:3001/professoren/${this.props.professor.id}/image`, formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        console.log('Picture updated');
        if(response.status === 200){

        }
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
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

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
        <div className="backdrop">
          <div className="modal">
            <h2>Professor hinzufügen</h2>
            <button className="btn-close" type="button" onClick={() => this.props.close()}>x</button>
            <form>
              <div className="foto">
                <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
                <label htmlFor="foto"><div className="professor-foto" style={{backgroundImage: `url(${this.state.base64})`}}></div></label>
              </div>
              <div className="input-fields">
                <div className="row">Name <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Funktion <input name="funktion" type="text" placeholder="Funktion" value={this.state.funktion} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Raum <input name="raum" type="text" placeholder="Raum" value={this.state.raum} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">E-Mail <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Telefonnummer <input name="telefonnummer" type="text" placeholder="Telefonnummer" value={this.state.telefonnummer} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Sprechzeiten <input name="sprechzeiten" type="text" placeholder="Sprechzeiten" value={this.state.sprechzeiten} onChange={(e) => this.handleChange(e)} /></div>
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

export default AddProfessor;
