import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Event extends Component {
  constructor(props){
    super(props);

    this.state = {
      monthMapping: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
      showText: false,
      tooBig: false,
      height: '',
      fullMonthMapping: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    };
  }

  toggleText(){
    this.setState({
      showText: !this.state.showText,
    });
  }

  componentDidMount(){
    console.log(this.props.id, document.getElementById(`event__${this.props.id}`).offsetHeight);
    if(document.getElementById(`event__${this.props.id}`).offsetHeight > 350){
      this.setState({
        tooBig: true,
        height: `${document.getElementById(`event__${this.props.id}`).offsetHeight}`,
      });
    }
  }

  render(){
    return(
      <div className="event__box">
        <div className="event__photo" style={{backgroundImage: `${this.props.event.img ? `url(data:image/png;base64,${new Buffer(this.props.event.img.data, 'binary').toString('base64')})`: `url(${require('./dummy-image.jpeg')})`}`}}>
        </div>
        <div className="event__information">
          <div className="event__heading">
            <div className="event__date">
              <div className="event__day">{new Date(this.props.event.startDate).getDate()}</div>
              <div className="event__month">{this.state.monthMapping[new Date(this.props.event.startDate).getMonth()]}</div>
            </div>
            <div className="event__title">
              {this.props.event.name}
            </div>
          </div>
          <div className="event__subheading">
            <div className="event__subheading-row"><FontAwesome name="map-marker-alt" /> {this.props.event.place}</div>
            {this.props.event.endTime ?
              <div>
                {this.props.event.startDate === this.props.event.endDate ?
                    <div className="event__subheading-row">
                      <FontAwesome name="clock" /> {new Date(this.props.event.startDate).getDate()}. {`${this.state.fullMonthMapping[new Date(this.props.event.startDate).getMonth()]} `}
                      {this.props.event.startTime} - {this.props.event.endTime}
                    </div>
                  : <div className="event__subheading-row">
                    <FontAwesome name="clock" />
                    <div className="event__fullTime">
                      {new Date(this.props.event.startDate).getDate()}. {`${this.state.fullMonthMapping[new Date(this.props.event.startDate).getMonth()]} `}
                      - {new Date(this.props.event.endDate).getDate()}. {this.state.fullMonthMapping[new Date(this.props.event.endDate).getMonth()]}
                      <span> Vom {new Date(this.props.event.startDate).getDate()}. {this.state.fullMonthMapping[new Date(this.props.event.startDate).getMonth()]} um {`${this.props.event.startTime} `}
                      bis zum {new Date(this.props.event.endDate).getDate()}. {this.state.fullMonthMapping[new Date(this.props.event.endDate).getMonth()]} um {this.props.event.endTime}</span>
                    </div>
                  </div>
                }
              </div>
              : <div className="event__subheading-row">
                  <FontAwesome name="clock" /> {new Date(this.props.event.startDate).getDate()}. {`${this.state.fullMonthMapping[new Date(this.props.event.startDate).getMonth()]} `}
                  {this.props.event.startTime}
                </div>
            }
          </div>
          {/* <div id={`event__${this.props.id}`} className="event__main" style={ { maxHeight: `${this.state.showText ? '1000px' : '300px' }` } }> */}
          <div id={`event__${this.props.id}`} className={`event__main`} style={{ maxHeight: `${this.state.tooBig && !this.state.showText ? '300' : this.state.height}px`}}>
            {this.props.event.information}
          </div>
        </div>
        {this.state.tooBig &&
          <div className="event__footer" onClick={() => this.toggleText()}>
            {this.state.showText ?
              <div><FontAwesome name="angle-up" /> <span>Weniger anzeigen</span></div>
              : <div><FontAwesome name="angle-down" /> <span>Mehr anzeigen</span></div>
            }
          </div>
        }
      </div>
    );
  }
}

export default Event;
