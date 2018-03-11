import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Lageplan from './Lageplan/index';
import AllgemeineInformationen from './AllgemeineInformationen';
import Header from './Header/Header';
import Altbau from './Lageplan/Altbau';
import Spiele from './Spiele';

class Home extends Component {
  render() {
    console.log(this.props);
    return (
        <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">

          <Route exact path={`${this.props.match.url}/lageplan`} component={Lageplan}/>
          <Route exact path="/home/allgemeineInformationen" component={AllgemeineInformationen}/>
          <Route exact path="/home/altbau" component={Altbau}/>
          <Route exact path="/home/spiele" component={Spiele}/>

        
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
            <Link to="/home/spiele">
                <div className="button">
                    Spiele
                </div>
            </Link>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;
