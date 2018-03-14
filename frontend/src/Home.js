import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';
import Spiele from './Spiele';
import ProfessorenListe from './ProfessorenListe';


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
              <div className="button">
                  Schwarzes Brett
              </div>
          <Link to="/home/professorenListe">
              <div className="button">
                  Spiele/TestProfessoren
              </div>
          </Link>
      </div>
    );
  }
}

export default Home;
