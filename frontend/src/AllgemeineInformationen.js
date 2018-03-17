import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { NavLink, Route } from 'react-router-dom';


import ProfessorenListe from './Professoren/ProfessorenListe';
import Lageplan from './Lageplan/index';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';


class AllgemeineInformationen extends Component {
  render() {
    return (

        <div className="wrapper">

        {/*<Route exact path="/home/allgemeineInformationen/professorenListe" component={ProfessorenListe}/>*/}

            <div className="button">
                Speiseplan
            </div>
            <Link to="/home/allgemeineInformationen/professorenListe">
                <div className="button">
                    Professoren
                </div>
            </Link>

            <div className="button">
                Stundenplan
            </div>
            <div className="button">
                Veranstaltungen
            </div>
        </div>


    );
  }
}

export default AllgemeineInformationen;
