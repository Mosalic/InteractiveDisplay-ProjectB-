import React, { Component } from 'react';
import axios from 'axios';

class AddEvent extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: props.event ? props.event.name : '',
      date: props.event ? new Date(props.event.date).toISOString().split('T')[0] : '',
      time: props.event ? props.event.time : '',
      information: props.event ? props.event.information : '',
      place: props.event ? props.event.place : '',
      imgUrl: props.event ? props.event.imgUrl : '',
      base64: props.event ? `data:image/png;base64,${new Buffer(props.event.img.data, 'binary').toString('base64')}` : require('./dummy-image.jpeg'),
      id: props.eventId,
    }
  }

  save(){
    if(this.props.event !== null){
      this.update();
    } else {
      this.create();
    }
  }

  create(){
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

  update(){
    axios.put(`http://localhost:3001/events/${this.state.id}`, {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      information: this.state.information,
      place: this.state.place,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor updated');
      if(response.status === 200){
        this.props.close();
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
    if(this.state.imgUrl){
      let formData = new FormData();
      formData.append('img', this.state.imgUrl);
      axios.put(`http://localhost:3001/events/${this.state.id}/image`, formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
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
            <div className="row">
              Eventfoto
              <div>
                <label htmlFor="foto"><div className="editEvent__photo" style={{backgroundImage: `url(${this.state.base64})`}}></div></label>
                <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
              </div>
            </div>
            <div className="row">Eventname <input value={this.state.name} placeholder="Name" onChange={(e) => this.handleChange(e)} name="name" /></div>
            <div className="row">Eventdatum <input value={this.state.date} placeholder="Date" type="date" onChange={(e) => this.handleChange(e)} name="date" /></div>
            <div className="row">Eventzeit <input value={this.state.time} type="time" placeholder="Time" onChange={(e) => this.handleChange(e)} name="time" /></div>
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
