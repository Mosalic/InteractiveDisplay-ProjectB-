/*
 *Anwendungs-Bereich:
 *Hier sind die Verlinkungen zu den drei verschiedenen Bereichen implementiert.
 *"Main" für die Anwendung für den User, "Admin" für die Administratoren zum bearbeiten der Daten und 
 *"UserInput" für die User zum hochladen von Aushängen ans Schwarze Brett.
 *Dafür wird zusätzlich auf die "index", "AllgemeineImformationen", "Header", "Altbau", 
 *"Spiele", "ProfessorenListe" und "EventListe" Komponenten zugegriffen.
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BrowserHistory from 'history/createBrowserHistory'
import Main from './Main';
import './App.css';
import Admin from './Admin';
import UserInput from './User/UserInput';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path="/home" component={Main}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/userInput" component={UserInput}/>
          </div>
        </Router>
    );
  }
}

export default App;
