import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { NavLink, Route } from 'react-router-dom';

class AllgemeineInformationen extends Component {
  render() {
    return (
      <div className="wrapper">
        <Link to="/home/allgemeineInformationen/speiseplan">
          <div className="button">
              Speiseplan
          </div>
        </Link>
        <Link to="/home/allgemeineInformationen/professorenListe">
            <div className="button">
                Professoren
            </div>
        </Link>
        <Link to="/home/allgemeineInformationen/stundenplaene">
          <div className="button">
              Stundenpläne
          </div>
        </Link>
        <Link to="/home/allgemeineInformationen/eventListe">
          <div className="button">
              Veranstaltungen
          </div>
        </Link>
      </div>
    );
  }
}

export default AllgemeineInformationen;
