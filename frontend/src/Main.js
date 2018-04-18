import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';
import Neubau from './Lageplan/Neubau';
import Spiele from './Spiele';
import ProfessorenListe from './Professoren/ProfessorenListe';
import EventListe from './Events/EventListe';
import NoteListe from './Notes/NoteListe';
import Speiseplan from './Speiseplan';
import Stundenplaene from './Stundenplaene';
import Stundenplan from './Stundenplaene/Stundenplan';
import FontAwesome from 'react-fontawesome';

class Main extends Component {
  render() {
    console.log(this.props);
    return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">
          {this.props.match.url !== this.props.location.pathname &&
            <button className="add back main-back" onClick={() => this.props.history.goBack()}><FontAwesome name="arrow-left" /></button>
          }
          <Route exact path={this.props.match.url} component={Home} />
          <Route exact path={`${this.props.match.url}/lageplan`} component={Lageplan}/>
          <Route exact path={`${this.props.match.url}/allgemeineInformationen`} component={AllgemeineInformationen}/>
          <Route exact path={`${this.props.match.url}/altbau`} component={Altbau}/>
          <Route exact path={`${this.props.match.url}/neubau`} component={Neubau}/>
          <Route exact path={`${this.props.match.url}/spiele`} component={Spiele}/>
          <Route exact path={`${this.props.match.url}/noteListe`} component={NoteListe}/>
          <Route exact path={`${this.props.match.url}/allgemeineInformationen/professorenListe`} component={ProfessorenListe}/>
          <Route exact path={`${this.props.match.url}/allgemeineInformationen/eventListe`} component={EventListe}/>
          <Route exact path={`${this.props.match.url}/allgemeineInformationen/speiseplan`} component={Speiseplan}/>
          <Route exact path={`${this.props.match.url}/allgemeineInformationen/stundenplaene`} component={Stundenplaene}/>
          <Route path={`${this.props.match.url}/allgemeineInformationen/stundenplaene/:id`} component={Stundenplan} />
        </div>
      </div>
    </div>
    );
  }
}

export default Main;
