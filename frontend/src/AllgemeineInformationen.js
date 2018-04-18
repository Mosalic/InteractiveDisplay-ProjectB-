import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { NavLink, Route } from 'react-router-dom';

class AllgemeineInformationen extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="second_wrapper">
        <Link to="/home/allgemeineInformationen/speiseplan">
          <div className="second_button">
              Speiseplan
          </div>
        </Link>
        <Link to="/home/allgemeineInformationen/professorenListe">
            <div className="second_button">
                Professoren
            </div>
        </Link>
        <Link to="/home/allgemeineInformationen/stundenplaene">
          <div className="second_button">
              Stundenpläne
          </div>
        </Link>
        <Link to="/home/allgemeineInformationen/eventListe">
          <div className="second_button">
              Veranstaltungen
          </div>
        </Link>
        </div>
      </div>
    );
  }
}

export default AllgemeineInformationen;
