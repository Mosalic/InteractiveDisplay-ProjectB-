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
          ]
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
        if(this.state[day].length >= this.state.times.length){
            this.setState({
                [day]:  [...this.state[day], {start: '', end: ''}],
            });
        } else {
            this.setState({
                [day]:  [...this.state[day], this.state.times[this.state[day].length]],
            });
        }
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
                                 {this.state.monday.map((time, index) =>
                                <div key={index}><button>add stunde</button></div>
                                                  )}
                            </div>
                                            )}
                        <button onClick={() => this.addSemester()}>AddSemester</button>
                    </div>
                    <div className="stundenplan__column">
                        <div>
                            Montag 
                            <button onClick={() => this.addTime('monday')}>+</button>
                            {this.state.monday.map((time, index) =>
                                <div key={index}>{time.start} - {time.end}</div>
                                                  )}
                        </div>
                        <div>
                            Dienstag
                            <button onClick={() => this.addTime('tuesday')}>+</button>
                            {this.state.tuesday.map((time, index) =>
                                <div key={index}>{time.start} - {time.end}</div>
                                                  )}
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
  }
}

export default AddStundenplan;
