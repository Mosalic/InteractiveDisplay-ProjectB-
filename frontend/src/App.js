import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import Home from './Home';
import AllgemeineInformationen from './AllgemeineInformationen';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route path="/allgemeineInformationen" component={AllgemeineInformationen}/>
          </div>
        </Router>
    );
  }
}

export default App;
