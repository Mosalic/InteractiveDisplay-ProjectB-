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
          }],
          addStunde: false,
          veranstaltung: '',
          professor: '',
          raum: '',
          semesterIndex: null,
          weekday: '',
          timeSlot: null,
      };
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }


    addSemester(){
        // this.setState({
        //     semester: [...this.state.semester, `${this.state.semester.length + 1}. Semester`],
        // })
        let newSemester = {
          label: `${this.state.semester.length + 1}. Semester`,
          monday: {},
          tuesday: {},
          wedensday: {},
          thursday: {},
          friday: {},
        };
        this.setState({
          semester: [...this.state.semester, newSemester],
        });
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

    toggleAddStunde(semesterIndex, weekday, timeSlot){
      this.setState({
        addStunde: true,
        semesterIndex,
        weekday,
        timeSlot,
      });
    }

    handleChange(e){
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    addStunde(){
      let newStunde = {
        [this.state.timeSlot]: {
          veranstaltung: this.state.veranstaltung,
          professor: this.state.professor,
          raum: this.state.raum,
        },
      }
      let sem = this.state.semester;
      sem[this.state.semesterIndex][this.state.weekday] = Object.assign(sem[this.state.semesterIndex][this.state.weekday], newStunde);
      this.setState({
        addStunde: false,
        semester: sem,
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
                <div className="stundenplan__cell" key={index}>
                  {semester.label}
                </div>
              )}
              <button onClick={() => this.addSemester()}>AddSemester</button>
            </div>
            {this.state.weekdays.map((weekday, weekdayIndex) =>
              <div key={weekdayIndex} className="stundenplan__group">
                <div> {weekday.label} <button onClick={() => this.addTime(weekday.value)}>+</button></div>
                {this.state[weekday.value].map((time, timeIndex) =>
                  <div className="stundenplan__row" key={timeIndex}>
                    <div>
                      <input value={time.start} name="start" onChange={(e) => this.handleTimeChange(weekday.value, timeIndex, e)} /> -  <input value={time.end} name="end" onChange={(e) => this.handleTimeChange(weekday.value, timeIndex, e)} />
                    </div>
                    {this.state.semester.map((semester, semesterIndex) =>
                      <div key={semesterIndex} className="stundenplan__cell">
                        {this.state.semester[semesterIndex][weekday.value][timeIndex] ?
                          <div>{this.state.semester[semesterIndex][weekday.value][timeIndex].veranstaltung}</div>
                          : <button onClick={() => this.toggleAddStunde(semesterIndex, weekday.value, timeIndex)}>add stunde</button>
                        }
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {this.state.addStunde &&
          <div className="backdrop">
            <div className="modal">
              <input type="text" placeholder="Veranstaltung" name="veranstaltung" value={this.state.veranstaltung} onChange={(e) => this.handleChange(e)} />
              <input type="text" placeholder="Professor" name="professor" value={this.state.professor} onChange={(e) => this.handleChange(e)} />
              <input type="text" placeholder="Raum" name="raum" value={this.state.raum} onChange={(e) => this.handleChange(e)} />
              <button onClick={() => this.addStunde()}>Ok</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default AddStundenplan;
