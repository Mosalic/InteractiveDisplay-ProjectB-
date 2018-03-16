import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header';
import ProfessorenListe from '../Professoren/ProfessorenListe';


class UserInput extends Component {
  render() {
    console.log(this.props);
    return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">

          <Route exact path="/home/professorenListe" component={ProfessorenListe}/>
        
                <h1>Veranstaltungen eintragen</h1>
            
                <div className="button">
                    Schwarzes Brett
                </div>
            <Link to="/home/professorenListe">
                <div className="button">
                    Spiele/TestProfessoren
                </div>
            </Link>
        </div>
      </div>
    </div>
    );
  }
}

export default UserInput;
