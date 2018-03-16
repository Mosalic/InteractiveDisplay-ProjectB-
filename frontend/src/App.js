import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import './App.css';
import Admin from './Admin';
import UserInput from './User/UserInput';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path="/home" component={Main}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/userInput" component={UserInput}/>
          </div>
        </Router>
    );
  }
}

export default App;
