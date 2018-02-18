import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';

class Home extends Component {
  render() {
    console.log(this.props);
    return (
        <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">
          <Route path={`${this.props.match.url}/lageplan`} component={Lageplan}/>
          <Route path="/home/allgemeineInformationen" component={AllgemeineInformationen}/>
          <Route path="/home/altbau" component={Altbau}/>
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
            <div className="button">
                Spiele
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;
