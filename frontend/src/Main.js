import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';
import Spiele from './Spiele';
import ProfessorenListe from './Professoren/ProfessorenListe';
import EventListe from './Events/EventListe';


class Main extends Component {
  render() {
    console.log(this.props);
    return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">

          <Route exact path={this.props.match.url} component={Home} />
          <Route exact path={`${this.props.match.url}/lageplan`} component={Lageplan}/>
          <Route path={`${this.props.match.url}/allgemeineInformationen`} component={AllgemeineInformationen}/>
          <Route exact path={`${this.props.match.url}/altbau`} component={Altbau}/>
          <Route exact path={`${this.props.match.url}/spiele`} component={Spiele}/>
          <Route exact path={`${this.props.match.url}/professorenListe`} component={ProfessorenListe}/>
          <Route exact path={`${this.props.match.url}/eventListe`} component={EventListe}/>

        </div>
      </div>
    </div>
    );
  }
}

export default Main;
