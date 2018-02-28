import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'

class AddProfessor extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      funktion: '',
      imgUrl: '',
      base64: '',
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
    axios.post('http://localhost:3001/professoren', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Professor added');
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
            <h2>Add Professor</h2>
            <button type="button" onClick={() => this.props.close()}>x</button>
            <form>
              <input name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
              <input name="funktion" placeholder="Funktion" value={this.state.funktion} onChange={(e) => this.handleChange(e)} />
              <input name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
              <img src={this.state.base64}/>
              <button type="button" onClick={() => this.save()}>Save</button>
            </form>
          </div>
        </div>
    );
  }
}

export default AddProfessor;
