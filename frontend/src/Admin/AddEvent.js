/*
 *Admin-Bereich:
 *Die Administratoren legen neue Events an.
 *Die Eingaben des neu erstellten Events werden vom Formular in die 
 *Datenbank-Collection "events" übernommen und gespeichert
*/

import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class AddEvent extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: props.event ? props.event.name : '',
      startDate: props.event ? new Date(props.event.startDate).toISOString().split('T')[0] : '',
      startTime: props.event ? props.event.startTime : '',
      endDate: props.event ? props.event.endDate ? new Date(props.event.endDate).toISOString().split('T')[0] : '' : '',
      endTime: props.event ? props.event.endTime ? props.event.endTime : '' : '',
      information: props.event ? props.event.information : '',
      place: props.event ? props.event.place : '',
      imgUrl: props.event ? props.event.imgUrl : '',
      base64: props.event ? props.event.img ? `data:image/png;base64,${new Buffer(props.event.img.data, 'binary').toString('base64')}` : require('./dummy-image.jpeg') : require('./dummy-image.jpeg'),
      id: props.eventId,
      endTimeVisible: props.event ? props.event.endDate ? true : false : false,
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
    formData.append('startDate', this.state.startDate);
    formData.append('startTime', this.state.startTime);
    formData.append('endDate', this.state.endDate);
    formData.append('endTime', this.state.endTime);
    formData.append('information', this.state.information);
    formData.append('place', this.state.place);
    formData.append('id', this.state.id);
    axios.post('http://localhost:3001/events', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Event added');
      this.props.close();
      this.props.getEvents();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  update(){
    axios.put(`http://localhost:3001/events/${this.state.id}`, {
      name: this.state.name,
      startDate: this.state.startDate,
      startTime: this.state.startTime,
      endDate: this.state.endDate,
      endTime: this.state.endTime,
      information: this.state.information,
      place: this.state.place,
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor updated');
      if(response.status === 200){
        this.props.close();
        this.props.getEvents();
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

  toggleEndTime(){
    this.setState({
      endTimeVisible: !this.state.endTimeVisible,
      endTime: '',
      endDate: '',
    });
  }

  render(){
    console.log(this.props.event);
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
            <div className="row">Eventname <input value={this.state.name} placeholder="Eventname" onChange={(e) => this.handleChange(e)} name="name" /></div>
            <div className="row shared">
              {this.state.endTimeVisible ? 'Start' : 'Datum/Uhrzeit'}
              <input value={this.state.startDate} placeholder="Date" type="date" onChange={(e) => this.handleChange(e)} name="startDate" />
              <input value={this.state.startTime} type="time" placeholder="Uhrzeit" onChange={(e) => this.handleChange(e)} name="startTime" />
              {!this.state.endTimeVisible && <button type="button" onClick={() => this.toggleEndTime()}><FontAwesome name="plus" className="icn-edit"/> Endzeit hinzufügen</button> }
            </div>
            {this.state.endTimeVisible &&
              <div className="row shared">
                Ende
                <input value={this.state.endDate} placeholder="Date" type="date" onChange={(e) => this.handleChange(e)} name="endDate" />
                <input value={this.state.endTime} type="time" placeholder="Uhrzeit" onChange={(e) => this.handleChange(e)} name="endTime" />
                <button className="event__deleteEnd" type="button" onClick={() => this.toggleEndTime()}><FontAwesome name="minus-circle" className="icn-delete"/> Endzeit entfernen</button>
              </div>
            }
            {/* <div className="row">Eventzeit <input value={this.state.time} type="time" placeholder="Time" onChange={(e) => this.handleChange(e)} name="time" /></div> */}
            {/* <div className="row">Eventbeschreibung <input value={this.state.information} placeholder="Information" onChange={(e) => this.handleChange(e)} name="information" /></div> */}
            <div className="row">Information  <textarea value={this.state.information} name="information" placeholder="Beschreibung" onChange={(e) => this.handleChange(e)} /></div>
            <div className="row">Ort <input value={this.state.place} placeholder="Ort" onChange={(e) => this.handleChange(e)} name="place" /></div>
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
