import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 

class Home extends Component {
  render() {
    return (
        <div className="wrapper">
            <Link to="/allgemeineInformationen">
                <div className="button">
                    Allgemeine Informationen
                </div>
            </Link>
            <Link to="/lageplan">
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
    );
  }
}

export default Home;
