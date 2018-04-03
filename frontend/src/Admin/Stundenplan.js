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
      nextStundenplanId: null,
      semester: [],
      timetable: {
        'monday': [],
        'tuesday': [],
        'wedensday': [],
        'thursday': [],
        'friday': [],
      },
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
      console.log(response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id);
      this.setState({
        stundenplaene: response.data.data.stundenplaene,
        nextStundenplanId: response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id !== 'undefined' ? (response.data.data.stundenplaene[response.data.data.stundenplaene.length - 1].id + 1) : 0 ,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

toggleAddStundenplan(){
  this.setState({
    addStundenplanVisible: !this.state.addStundenplanVisible,
  });
}

toggleEditStundenplan(stundenplan){
  this.setState({
    addStundenplanVisible: true,
    timetable: stundenplan.timetable,
    semester: stundenplan.semester,
    id: stundenplan.id,
  });
}

  render() {
    return (
        <div>
          <div className="professoren-wrapper">
            {this.state.addStundenplanVisible ?
              <AddStundenplan
                timetableId={this.state.nextStundenplanId}
                semester={this.state.semester}
                timetable={this.state.timetable}
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
