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
    addStundenplanVisible: !this.state.addStundenplanVisible,
    saved: false,
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

  render() {
    return (
        <div>
          <div className="professoren-wrapper">
            {this.state.addStundenplanVisible ?
              <AddStundenplan
                timetableId={this.state.timetableId}
                semester={this.state.semester}
                timetable={this.state.timetable}
                saved={this.state.saved}
                studiengang={this.state.studiengang}
              />
              :
              <div>
                <button type="button" className="add" onClick={() => this.toggleAddStundenplan()}>+</button>
                <div className="stundeplan">
                  {this.state.stundenplaene.map((stundenplan, index) =>
                    <button key={index} onClick={() => this.toggleEditStundenplan(stundenplan)}>
                      {stundenplan.studiengang}
                    </button>
                  )}
                </div>
              </div>
            }
          </div>
        </div>
    );
  }
}

export default Stundenplan;
