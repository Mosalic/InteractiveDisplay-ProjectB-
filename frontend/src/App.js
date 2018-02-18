import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Login from './Admin/Login';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path="/home" component={Home}/>
            <Route path="/admin" component={Login}/>
          </div>
        </Router>
    );
  }
}

export default App;
