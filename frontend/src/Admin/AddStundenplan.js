import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


class AddStundenplan extends Component {
  constructor(){
    super();
      
      this.state = {
          semester: [],
          monday: [],
          tuesday: [],
          wedensday: [],
          thursday: [],
          friday: [],
          times: [
              {start: '8:30', end: '10:00'},
              {start: '10:30', end: '12:00'}, 
              {start: '13:00', end: '14:30'}, 
              {start: '15:00', end: '16:30'}, 
              {start: '17:00', end: '18:30'}, 
              {start: '19:00', end: '20:30'},
          ],
          weekdays: [{
              label: 'Montag',
              value: 'monday'
          }, {
              label: 'Dienstag',
              value: 'tuesday'
          }, {
              label: 'Mittwoch',
              value: 'wedensday'
          }, {
              label: 'Donnerstag',
              value: 'thursday'
          }, {
              label: 'Freitag',
              value: 'friday'
          }]
      }; 
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }


    addSemester(){
        this.setState({
            semester: [...this.state.semester, `${this.state.semester.length + 1}. Semester`],
        })
    }
    
    addTime(day){
        let dayTimes = this.state[day];
        let newTime = Object.assign( {}, this.state.times[this.state[day].length] );
        dayTimes.push(newTime);
        if(this.state[day].length >= this.state.times.length){
            this.setState({
                [day]:  [...this.state[day], {start: '', end: ''}],
            });
        } else {
            this.setState({
                [day]:  dayTimes,
            });
        }
    }
    
    handleTimeChange(day, index, e){
        let newTimes = this.state[day];
        newTimes[index][e.target.name] = e.target.value;
        this.setState({
            [day]: newTimes,
        });
        
    }
 

  render() {
    return (
        <div>
          
            <div className="stundeplan-wrapper">
              <input className="studiengang" placeholder="Studiengang"/>
                <div className="stundenplan">
                  
    
        <div className="stundenplan__row">
                <div></div>
                 {this.state.semester.map((semester, index) =>
                            <div key={index}>
                                {semester}
                                </div>
                                                  )}
                <button onClick={() => this.addSemester()}>AddSemester</button>
        </div>
            {this.state.weekdays.map((weekday, index) =>
                                     <div key={index} className="stundenplan__column">
                <div> {weekday.label} <button onClick={() => this.addTime(weekday.value)}>+</button></div>
                {this.state[weekday.value].map((time, index) =>
                    <div className="stundenplan__row" key={index}>
                            <div>
                                <input value={time.start} name="start" onChange={(e) => this.handleTimeChange(weekday.value, index, e)} /> -  <input value={time.end} name="end" onChange={(e) => this.handleTimeChange(weekday.value, index, e)} />
                            </div>
                            {this.state.semester.map((semester, index) => 
                                <div key={index}><button>add stunde</button></div>)}
                    </div>
                                                  )}
                                                  </div>
                                    )}
                
                                    {/*<div> Montag <button onClick={() => this.addTime('monday')}>+</button></div>
                {this.state.monday.map((time, index) =>
                                <div className="stundenplan__row" key={index}>
                                <div><input value={time.start} name="start" onChange={(e) => this.handleTimeChange('monday', index, e)} /> -  <input value={time.end} name="end" onChange={(e) => this.handleTimeChange('monday', index, e)} /></div>
                                {this.state.semester.map((semester, index) => 
                                                        <div key={index}><button>add stunde</button></div>)}
                                </div>
                                                  )}
                 <div> Dienstag <button onClick={() => this.addTime('tuesday')}>+</button></div>
                  {this.state.tuesday.map((time, index) =>
                            <div className="stundenplan__row" key={index}>
                            <div>{time.start} - {time.end}</div>
                            {this.state.semester.map((semester, index) => 
                                                    <div key={index}><button>add stunde</button></div>)}
                            </div>
                                              )}*/}

        </div>
        
            </div>
          
        </div>
    );
  }
}

export default AddStundenplan;
