import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'

class AddProfessor extends Component {
  constructor(){
    super();

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

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  save(){
    console.log(this.state.imgUrl);
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
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
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
      //   console.log('RESULT', reader.result)
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
                <label htmlFor="foto"><img src={this.state.base64}/></label>
              </div>
              <div className="input-fields">
                <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                <input name="funktion" type="text" placeholder="Funktion" value={this.state.funktion} onChange={(e) => this.handleChange(e)} />
                <input name="raum" type="text" placeholder="Raum" value={this.state.raum} onChange={(e) => this.handleChange(e)} />
                <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                <input name="telefonnummer" type="text" placeholder="Telefonnummer" value={this.state.telefonnummer} onChange={(e) => this.handleChange(e)} />
                <input name="sprechzeiten" type="text" placeholder="sprechzeiten" value={this.state.sprechzeiten} onChange={(e) => this.handleChange(e)} />
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
