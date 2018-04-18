import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backLogo from '../backBtn.png';

class Stundenplan extends Component{
  constructor(){
    super();

    this.state = {
      studiengang: '',
      semester: [],
      timetable: {
        'monday': [],
        'tuesday': [],
        'wedensday': [],
        'thursday': [],
        'friday': [],
      },
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
    }
  }

  componentDidMount(){
    this.getStundenplan();
  }

  getStundenplan(){
    axios.get(`http://localhost:3001/stundenplaene/${this.props.match.params.id}`)
    .then((response) => {
      this.setState({
        studiengang: response.data.data.stundenplan.studiengang,
        semester: response.data.data.stundenplan.semester,
        timetable: response.data.data.stundenplan.timetable,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  showRoom(room){
    this.props.history.push(`/home/altbau?room=${room}`);
  }

  render(){
    return(
        <div>
            <h1>Stundenplan</h1>
          <div className="stundeplan-wrapper">

            <div className="stundenplan">
              {this.state.studiengang}
              <div className="stundenplan__row stundenplan__header">
                <div></div>
                {this.state.semester.map((semester, index) =>
                  <div className="stundenplan__cell" key={index}>
                    {semester}
                  </div>
                )}
              </div>
              {this.state.weekdays.map((weekday, weekdayIndex) =>
                <div key={weekdayIndex} className="stundenplan__group">
                  <div className="stundenplan__weekday"> {weekday.label}</div>
                  {this.state.timetable[weekday.value].map((time, timeIndex) =>
                    <div className="stundenplan__row" key={timeIndex}>
                      <div className="stundenplan__cell">
                        {time.start} - {time.end}
                      </div>
                      {this.state.semester.map((semester, semesterIndex) =>
                        <div key={semesterIndex} className="stundenplan__cell">
                          {this.state.timetable[weekday.value][timeIndex].classes[semesterIndex] &&
                            <div className="stundenplan__stunde">
                              <span>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].veranstaltung}</span>
                              <div className="stundenplan__stunde__information">
                                <span>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].professor}</span>
                                <span><button onClick={() => this.showRoom(this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].raum)}>{this.state.timetable[weekday.value][timeIndex].classes[semesterIndex].raum}</button></span>
                              </div>
                            </div>
                          }
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default Stundenplan;
