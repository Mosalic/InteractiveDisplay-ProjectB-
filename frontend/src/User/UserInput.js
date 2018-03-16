import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header';
import ProfessorenListe from '../Professoren/ProfessorenListe';

import './InputPinboard.css';

import axios from 'axios';



class UserInput extends Component {
 
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
      base64: require('./pinboard-icon.png'),
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
    console.log(this.props);
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
                    <input name="name" type="text" placeholder="zusätzliche Informationen" value={this.state.name} onChange={(e) => this.handleChange(e)} />

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
