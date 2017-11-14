import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './Home';
import AllgemeineInformationen from './AllgemeineInformationen';
import Lageplan from './Lageplan/index';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route path="/allgemeineInformationen" component={AllgemeineInformationen}/>
            <Route path="/lageplan" component={Lageplan}/>
          </div>
        </Router>
    );
  }
}

export default App;
