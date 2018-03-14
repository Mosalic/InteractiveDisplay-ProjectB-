import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import './App.css';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path="/home" component={Main}/>
            <Route path="/admin" component={Admin}/>
          </div>
        </Router>
    );
  }
}

export default App;
