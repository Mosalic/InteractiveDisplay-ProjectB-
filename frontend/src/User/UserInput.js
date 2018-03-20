import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header';
import './InputPinboard.css';
import axios from 'axios';


class UserInput extends Component {
 
 constructor(){
    super();

    this.state = {
        name: '',
        infos: '',
        imgUrl: '',
        base64: require('./pinboard-icon.png'),
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
    
    
    render() {
        return (
            <div >
              <div className="pinboard-input-wrapper">
                <div className="pinboard-input">
                    <h2>Anhang hinzufügen</h2>

                    <form>
                      <div className="foto">
                        <input id="foto" name="foto" type="file" onChange={(event) => this.encodeImageFileAsURL(event)} accept="image/x-png,image/gif,image/jpeg" />
                        <label htmlFor="foto"><div className="pinboard-foto" style={{backgroundImage: `url(${this.state.base64})`}}></div></label>
                      </div>
                      <div className="input-fields">
                        <input value={this.state.name} name="name" type="text" placeholder="Name" onChange={(e) => this.handleChange(e)} />
                        <input value={this.state.infos} name="infos" type="text" placeholder="zusätzliche Informationen" onChange={(e) => this.handleChange(e)} />

                      </div>
                    </form>

                    <button className="btn-upload" type="button" onClick={() => this.save()}>Save&Upload</button>

                </div>
              </div>
            </div>
               
          
    );
  }

}

export default UserInput;
