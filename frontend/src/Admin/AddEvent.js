import React, { Component } from 'react';
import axios from 'axios';

class AddEvent extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      date: '',
      time: '',
      information: '',
      place: '',
      imgUrl: '',
      base64: require('./dummy-image.jpeg'),
      id: props.eventId,
    }
  }

  save(){
    let formData = new FormData();
    formData.append('img', this.state.imgUrl);
    formData.append('name', this.state.name);
    formData.append('date', this.state.date);
    formData.append('time', this.state.time);
    formData.append('information', this.state.information);
    formData.append('place', this.state.place);
    formData.append('id', this.state.id);
    axios.post('http://localhost:3001/events', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Event added');
    })
    .catch((error) => {
      console.log('error', error);
    })
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

  render(){
    return(
      <div className="backdrop">
        <div className="modal">
          <h2>Event hinzufügen</h2>
          <button className="btn-close" type="button" onClick={() => this.props.close()}>x</button>
          <form className="event">
            <div className="row">Eventfoto <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
            <label htmlFor="foto"><div className="professor-foto" style={{backgroundImage: `url(${this.state.base64})`}}></div></label></div>
            <div className="row">Eventname <input value={this.state.name} placeholder="Name" onChange={(e) => this.handleChange(e)} name="name" /></div>
            <div className="row">Eventdatum <input value={this.state.date} placeholder="Date" type="date" onChange={(e) => this.handleChange(e)} name="date" /></div>
            <div className="row">Eventzeit <input value={this.state.time} placeholder="Time" onChange={(e) => this.handleChange(e)} name="time" /></div>
            {/* <div className="row">Eventbeschreibung <input value={this.state.information} placeholder="Information" onChange={(e) => this.handleChange(e)} name="information" /></div> */}
            <div className="row">Eventbeschreibung  <textarea value={this.state.information} name="information" placeholder="Eventbeschreibung" onChange={(e) => this.handleChange(e)} /></div>
            <div className="row">Eventort <input value={this.state.place} placeholder="Place" onChange={(e) => this.handleChange(e)} name="place" /></div>
          </form>
          <div className="button-footer">
            <button className="btn-save" type="button" onClick={() => this.save()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEvent;
