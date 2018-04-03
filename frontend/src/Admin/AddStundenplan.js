import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import Immutable from 'immutable';

class AddStundenplan extends Component {
  constructor(){
    super();

      this.state = {
          semester: [],
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
          hoveredWeekday: null,
          hoveredTime: null,
          hoveredSemester: null,
          timetable: {
            'monday': [],
            'tuesday': [],
            'wedensday': [],
            'thursday': [],
            'friday': [],
          },
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
      let newTime = Object.assign( {classes: {}}, this.state.times[this.state.timetable[day].length] );
      let timetable = Immutable.fromJS(this.state.timetable);
      if(Object.keys(newTime).length === 1){
        timetable = timetable.set(day, timetable.get(day).push({ start: '', end: '', classes:{} }));
      } else {
        timetable = timetable.set(day, timetable.get(day).push(newTime));
      }
      this.setState({
        timetable: timetable.toJS(),
      });
    }

    handleTimeChange(day, index, e){
      let timetable = Immutable.fromJS(this.state.timetable);
      timetable = timetable.setIn([day, index, e.target.name], e.target.value);
      this.setState({
        timetable: timetable.toJS(),
      });
    }

    toggleAddStunde(semesterIndex, weekday, timeSlot, veranstaltung, professor, raum){
      this.setState({
        addStunde: true,
        semesterIndex,
        weekday,
        timeSlot,
        veranstaltung,
        professor,
        raum,
      });
    }

    // handelt die Eingabe in dem Stunden Pop Up
    handleChange(e){
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    addStunde(){
      let newStunde = {
        [this.state.semesterIndex]: {
          veranstaltung: this.state.veranstaltung,
          professor: this.state.professor,
          raum: this.state.raum,
        },
      };
      let timetable = Immutable.fromJS(this.state.timetable);
      timetable = timetable.setIn([this.state.weekday, this.state.timeSlot, 'classes'], timetable.getIn([this.state.weekday, this.state.timeSlot, 'classes']).merge(newStunde));
      this.setState({
        addStunde: false,
        timetable: timetable.toJS(),
      });
    }

    deleteStunde(weekday, timeIndex, semesterIndex){
      let timetable = Immutable.fromJS(this.state.timetable);
      timetable = timetable.deleteIn([weekday, timeIndex, 'classes', `${semesterIndex}`]);
      this.setState({
        timetable: timetable.toJS(),
      })
    }

    handleMouseEnter(weekdayIndex, timeIndex, semesterIndex){
      this.setState({
        hoveredWeekday: weekdayIndex,
        hoveredTime: timeIndex,
        hoveredSemester: semesterIndex,
      });
    }

    handleMouseLeave(){
      this.setState({
        hoveredWeekday: null,
        hoveredTime: null,
        hoveredSemester: null,
      });
    }

    hovered(weekdayIndex, timeIndex, semesterIndex){
      let hoveredWeekday = this.state.hoveredWeekday === weekdayIndex;
      let hoveredTime = this.state.hoveredTime === timeIndex;
      let hoveredSemester = this.state.hoveredSemester === semesterIndex;
      if(hoveredWeekday && hoveredTime && hoveredSemester){
        return true;
      }
      return false;
    }

  save(){
    axios.post('http://localhost:3001/stundenplaene', {
      timetable: this.state.timetable,
      semester: this.state.semester
    }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('Professor added');
      if(response.status === 200){
        
      }
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
      <div>
        <div className="stundeplan-wrapper">
          <input className="studiengang" placeholder="Studiengang"/>
          <div className="stundenplan">
            <div className="stundenplan__row stundenplan__header">
              <div></div>
              {this.state.semester.map((semester, index) =>
                <div className="stundenplan__cell" key={index}>
                  {semester}
                </div>
              )}
              <div className="stundenplan__button"><button className="stundenplan__add" onClick={() => this.addSemester()}><FontAwesome name="plus" className="icn-edit"/> Semester hinzufügen</button></div>
            </div>
            {this.state.weekdays.map((weekday, weekdayIndex) =>
              <div key={weekdayIndex} className="stundenplan__group">
                <div className="stundenplan__weekday"> {weekday.label}</div>
                {this.state.timetable[weekday.value].map((time, timeIndex) =>
                  <div className="stundenplan__row" key={timeIndex}>
                    <div className="stundenplan__cell">
                      <input value={time.start} name="start" onChange={(e) => this.handleTimeChange(weekday.value, timeIndex, e)} /> -  <input value={time.end} name="end" onChange={(e) => this.handleTimeChange(weekday.value, timeIndex, e)} />
                    </div>
                    {this.state.semester.map((semester, semesterIndex) =>
                      <div key={semesterIndex} className="stundenplan__cell">

                        {this.state.timetable[weekday.value][timeIndex].classes[semesterIndex] ?
                          <div className="stundenplan__stunde" onMouseEnter={() => this.handleMouseEnter(weekdayIndex, timeIndex, semesterIndex)} onMouseLeave={() => this.handleMouseLeave()}>
                            {this.hovered(weekdayIndex, timeIndex, semesterIndex) &&
                              <div className="stundenplan__stunde__edit">
                                <button onClick={() => this.toggleAddStunde(semesterIndex, weekday.value, timeIndex, this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].veranstaltung, this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].professor, this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].raum)}><FontAwesome name="edit" className="icn-edit"/></button>
                                <button
                                  onClick={() => this.deleteStunde(weekday.value, timeIndex, semesterIndex)}
                                >
                                  <FontAwesome name="trash" className="icn-delete"/>
                                </button>
                              </div>
                            }
                            <span>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].veranstaltung}</span>
                            <div className="stundenplan__stunde__information">
                              <span>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].professor}</span>
                              <span>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].raum}</span>
                            </div>
                          </div>
                          : <button className="stundenplan__add" onClick={() => this.toggleAddStunde(semesterIndex, weekday.value, timeIndex, this.state.veranstaltung, this.state.professor, this.state.raum)}><FontAwesome name="plus" className="icn-edit"/> Stunde einfügen</button>
                        }

                      </div>
                    )}
                  </div>
                )}
                <div className="stundenplan__row"><button className="stundenplan__add hour" onClick={() => this.addTime(weekday.value)}><FontAwesome name="plus" className="icn-edit"/> Zeit hinzufügen</button></div>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => this.save()}>Save</button>
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
