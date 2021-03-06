/*
 *Admin-Bereich:
 *Die Administratoren legen neue Stundenpläne an.
 *Die Eingaben des neu erstellten Stundenplans werden vom Formular in die 
 *Datenbank-Collection "stundenplaene" übernommen und gespeichert.
 *Hier wird zusätzlich auf die "withAuth" Komponente zugegriffen.
*/

import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import Immutable from 'immutable';
import withAuth from './withAuth';

class AddStundenplan extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: props.timetableId,
      semester: props.semester,
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
      timetable: props.timetable,
      saved: props.saved,
      studiengang: props.studiengang,
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

  closeAddStunde(){
    this.setState({
      addStunde: false,
    })
  }

  save(){
    if(this.state.saved){
      axios.put(`http://localhost:3001/stundenplaene/${this.state.id}`, {
        timetable: this.state.timetable,
        semester: this.state.semester,
        studiengang: this.state.studiengang
      }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
      .then((response) => {
        console.log('Professor added');
        if(response.status === 200){
          this.setState({
            saved: true,
          })
        }
      })
      .catch((error) => {
        console.log('error', error);
      })
    } else {
      axios.post('http://localhost:3001/stundenplaene', {
        id: this.state.id,
        timetable: this.state.timetable,
        semester: this.state.semester,
        studiengang: this.state.studiengang
      }, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
      .then((response) => {
        console.log('Professor added');
        if(response.status === 200){
          this.setState({
            saved: true,
          })
        }
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
  }

  deleteTimeslot(weekday, timeIndex){
    let timetable = Immutable.fromJS(this.state.timetable);
    timetable = timetable.deleteIn([weekday, timeIndex]);
    this.setState({
      timetable: timetable.toJS(),
    });
  }

  // deleteSemester(index){
  //   let semester = Immutable.fromJS(this.state.semester);
  //   semester = semester.delete(index);
  //   this.setState({
  //     semester: semester.toJS(),
  //   });
  // }

  render() {
    return (
      <div>
        <div className="stundeplan-wrapper">
          <button className="add back" onClick={() => this.props.back()}><FontAwesome name="arrow-left" /></button>
          <input className="studiengang" placeholder="Studiengang" name="studiengang" value={this.state.studiengang} onChange={(e) => this.handleChange(e)} />
          <div className="stundenplan">
            <div className="stundenplan__row stundenplan__header">
              <div></div>
              {this.state.semester.map((semester, index) =>
                <div className="stundenplan__cell" key={index}>
                  {semester}
                  {/* <button className="stundenplan__btn" onClick={() => this.deleteSemester(index)}><FontAwesome name="trash" className="icn-delete"/></button> */}
                </div>
              )}
              <div className="stundenplan__cell__button"><button className="stundenplan__add" onClick={() => this.addSemester()}><FontAwesome name="plus" className="icn-edit"/> Semester hinzufügen</button></div>
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
                    <div className="stundenplan__cell icn">
                      <button onClick={() => this.deleteTimeslot(weekday.value, timeIndex)}><FontAwesome name="minus-circle" className="icn-delete"/></button>
                    </div>
                  </div>
                )}
                <div className="stundenplan__row"><button className="stundenplan__add hour" onClick={() => this.addTime(weekday.value)}><FontAwesome name="plus" className="icn-edit"/> Zeit hinzufügen</button></div>
              </div>
            )}
          </div>
          <button onClick={() => this.save()} className="stundenplan__btn-save">Save</button>
        </div>
        {this.state.addStunde &&
          <div className="backdrop">
            <div className="modal">
              <h2>Stunde einfügen</h2>
              <button className="btn-close" type="button" onClick={() => this.closeAddStunde()}>x</button>
              <form className="stunden__input">
                <div className="row">Veranstaltung <input type="text" placeholder="Veranstaltung" name="veranstaltung" value={this.state.veranstaltung} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Professor <input type="text" placeholder="Professor" name="professor" value={this.state.professor} onChange={(e) => this.handleChange(e)} /></div>
                <div className="row">Raum <input type="text" placeholder="Raum" name="raum" value={this.state.raum} onChange={(e) => this.handleChange(e)} /></div>
              </form>
              <div className="button-footer">
                <button className="btn-save" type="button" onClick={() => this.addStunde()}>Einfügen</button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withAuth(AddStundenplan);
