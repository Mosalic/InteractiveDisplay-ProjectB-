/*
 *Anwendungs-Bereich:
 *Hier werden die ersten Überkategorien dem User angezeigt.
 *Verlinkungen zu diesen Kategorien sind hier implementiert.
 *Dafür wird zusätzlich auf die "index", "AllgemeineImformationen", "Header", "Altbau", 
 *"Spiele", "ProfessorenListe" und "EventListe" Komponenten zugegriffen.
*/


import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';
import Spiele from './Spiele';
import ProfessorenListe from './Professoren/ProfessorenListe';
import EventListe from './Events/EventListe';


class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="wrapper">
            
          <Link to="/home/allgemeineInformationen">
              <div className="button">
                  Allgemeine Informationen
              </div>
          </Link>
          <Link to="/home/lageplan">
              <div className="button">
                  Lageplan
              </div>
          </Link>
          <Link  to="/home/noteListe">
              <div className="button">
                  Schwarzes Brett
              </div>
          </Link>
          <Link to="/home/spiele">
              <div className="button">
                  Spiele
              </div>
          </Link>
      </div>
    );
  }
}

export default Home;
