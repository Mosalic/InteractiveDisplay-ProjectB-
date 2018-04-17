import React, { Component } from 'react';
import './Header.css';
//import Time from 'react-time';
import logo from './haw_dmi_logo.jpg';

class Header extends Component {

/*getInitialState() {
    return {
      now: new Date(),
    };
    this.interval = null;
}

componentDidMount() {
    const self = this;
    self.interval = setInterval(function() {
      self.setState({
        now: new Date(),
      });
    }, 1000);
}

componentWillUnmount() {
    clearInterval(this.interval);
}*/

    constructor(){
    super();

    this.state = {
        datum : '',
        uhrzeit: '',
    }
    this.updateTime = this.updateTime.bind(this);
  }

   /* componentDidMount(){
        this.updateTime();
    }*/
componentDidMount() {
    window.addEventListener('load', this.updateTime);
 }

    updateTime() {
        console.log("Datum berechnen");
        const date = new Date();

        var stunden = date.getHours();
        var minuten = date.getMinutes();
        var tag = date.getDate();
        var monat = date.getMonth();
        var jahr = date.getFullYear();
        var tagInWoche = date.getDay();
        var wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
        var monate = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");

        if(minuten < 10){
            minuten = "0"+minuten;
        }

        this.setState({

        datum: wochentag[tagInWoche] + ", " + tag + ". " + monate[monat] + " " + jahr,
        uhrzeit: stunden + ":" + minuten,
      });


        //document.getElementsByClassName('date').innerHTML = this.state.datum;
        setTimeout(this.updateTime, 60000);
    }
    //window.addEventListener("load", updateTime);

    render() {
    return (
        <div className="header" >
            <div className="date">{this.state.datum}</div>
           <img className="logoImg" src={logo} />
            <div className="time">{this.state.uhrzeit}</div>
        </div>
    );
  }
}

export default Header;
