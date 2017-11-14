import React, { Component } from 'react';
import './App.css';

class AllgemeineInformationen extends Component {
  render() {
    return (
        <div className="wrapper">
            <div className="button">
                Speiseplan
            </div>
            <div className="button">
                Professoren
            </div>
            <div className="button">
                Stundenplan
            </div>
            <div className="button">
                Spiele
            </div>
        </div>
    );
  }
}

export default AllgemeineInformationen;
