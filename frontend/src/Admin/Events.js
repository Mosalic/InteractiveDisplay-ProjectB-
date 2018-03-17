import React, { Component } from 'react';
import axios from 'axios';

class Events extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      date: '',
      time: '',
      information: '',
      place: '',
      imgUrl: '',
      base64: require('./dummy-image.jpeg'),
    };
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

  save(){
    let formData = new FormData();
    formData.append('img', this.state.imgUrl);
    formData.append('name', this.state.name);
    formData.append('date', this.state.date);
    formData.append('time', this.state.time);
    formData.append('information', this.state.information);
    formData.append('place', this.state.place);
    axios.post('http://localhost:3001/events', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Event added');
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render(){
    return(
      <div>
        <input value={this.state.name} placeholder="Name" onChange={(e) => this.handleChange(e)} name="name" />
        <input value={this.state.date} placeholder="Date" type="date" onChange={(e) => this.handleChange(e)} name="date" />
        <input value={this.state.time} placeholder="Time" onChange={(e) => this.handleChange(e)} name="time" />
        <input value={this.state.information} placeholder="Information" onChange={(e) => this.handleChange(e)} name="information" />
        <input value={this.state.place} placeholder="Place" onChange={(e) => this.handleChange(e)} name="place" />
        <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
        <label htmlFor="foto"><div className="professor-foto" style={{backgroundImage: `url(${this.state.base64})`}}></div></label>
        <button onClick={() => this.save()}>Save</button>
      </div>
    );
  }
}

export default Events;
