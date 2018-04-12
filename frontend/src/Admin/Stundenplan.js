import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import AddStundenplan from './AddStundenplan';


class Stundenplan extends Component {
  constructor(){
    super();

    this.state = {
      addStundenplanVisible: false,
      stundenplaene: [],
      timetableId: null,
      semester: [],
      timetable: {
        'monday': [],
        'tuesday': [],
        'wedensday': [],
        'thursday': [],
        'friday': [],
      },
      saved: false,
      studiengang: '',
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  componentDidMount(){
    this.getStundenplaene();
  }

getStundenplaene(){
  axios.get('http://localhost:3001/stundenplaene')
  .then((response) => {
    this.setState({
      stundenplaene: response.data.data.stundenplaene,
      timetableId: response.data.data.stundenplaene.length === 0 ? 0 : (response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id + 1),
    });
  })
  .catch((error) => {
    console.log('error', error);
  })
}

toggleAddStundenplan(){
  this.setState({
    addStundenplanVisible: true,
    saved: false,
    semester: [],
    timetable: {
      'monday': [],
      'tuesday': [],
      'wedensday': [],
      'thursday': [],
      'friday': [],
    },
    studiengang: '',
    timetableId: this.state.stundenplaene.length === 0 ? 0 : (this.state.stundenplaene[this.state.stundenplaene.length - 1].id + 1),
  });
}

toggleEditStundenplan(stundenplan){
  this.setState({
    addStundenplanVisible: true,
    timetable: stundenplan.timetable,
    semester: stundenplan.semester,
    timetableId: stundenplan.id,
    saved: true,
    studiengang: stundenplan.studiengang
  });
}

closeAddStundenplan(){
  this.setState({
    addStundenplanVisible: false,
  });
  this.getStundenplaene();
}

  render() {
    return (
        <div>
          {this.state.addStundenplanVisible ?
            <div className="professoren-wrapper">
              <AddStundenplan
                timetableId={this.state.timetableId}
                semester={this.state.semester}
                timetable={this.state.timetable}
                saved={this.state.saved}
                studiengang={this.state.studiengang}
                back={() => this.closeAddStundenplan()}
              />
            </div>
            :
            <div>
              <div className="admin__btn-add"><button type="button" className="add" onClick={() => this.toggleAddStundenplan()}>+</button></div>
              <div className="stundenplan__wrapper">
                {this.state.stundenplaene.map((stundenplan, index) =>
                  <button key={index} onClick={() => this.toggleEditStundenplan(stundenplan)}>
                    {stundenplan.studiengang}
                  </button>
                )}
              </div>
            </div>
          }
        </div>
    );
  }
}

export default Stundenplan;
