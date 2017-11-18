import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './Home';
import AllgemeineInformationen from './AllgemeineInformationen';
import Lageplan from './Lageplan/index';
import Altbau from './Lageplan/Altbau';
import Header from './Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/allgemeineInformationen" component={AllgemeineInformationen}/>
            <Route path="/lageplan" component={Lageplan}/>
            <Route path="/altbau" component={Altbau}/>
          </div>
        </Router>
    );
  }
}

export default App;
