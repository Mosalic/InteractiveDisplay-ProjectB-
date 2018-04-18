import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './InputPinboard.css';
import axios from 'axios';
import Header from '../Header/Header';


class UserInput extends Component {

 constructor(){
    super();

    this.state = {
        name: '',
        infos: '',
        imgUrl: '',
        base64: '',
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

    save(){
        let formData = new FormData();
        formData.append('img', this.state.imgUrl);
        formData.append('name', this.state.name);
        formData.append('info', this.state.infos);
        axios.post('http://localhost:3001/notes', formData, {headers:{ Authorization: localStorage.getItem('JWTToken'), 'Content-Type': 'multipart/form-data'}})
        .then((response) => {
          console.log('Note added');
        })
        .catch((error) => {
          console.log('error', error);
        })
    }

    deleteImg(){
      this.setState({
        imgUrl: '',
        base64: '',
      });
    }


    render() {
        return (
            <div>
            <Header></Header>
              <div className="pinboard-input-wrapper">
                <div className="pinboard-input">
                    <h2>Pin erstellen</h2>

                    <form>
                      <div className="pinboard-input-fields">
                        Titel
                        <input value={this.state.name} name="name" type="text" placeholder="Gib dem Pin einen Title" onChange={(e) => this.handleChange(e)} />
                        Beschreibung
                        <textarea value={this.state.infos} name="infos" placeholder="Zusätzliche Informationen" onChange={(e) => this.handleChange(e)} />
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

                    <button className="btn-upload" type="button" onClick={() => this.save()}>Upload</button>

                </div>
              </div>
            </div>


    );
  }

}

export default UserInput;
