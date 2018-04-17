import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firstFloor from './first_floor.svg';
import './Lageplan.css';
import FirstFloorAltbau from './FirstFloorAltbau';
import BasementFloorAltbau from './BasementFloorAltbau';
import SecondFloorAltbau from './SecondFloorAltbau';
import backLogo from '../backBtn.png';

class Altbau extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: '',
            floor: 1,
        };
    }

    handleChange(e){
        this.setState({
            search: e.target.value,
        });
    }

    floorPlan(floor, search){
      const getFloorPlan = (search) => ({
        0: <BasementFloorAltbau search={search} />,
        1: <FirstFloorAltbau search={search} />,
        2: <SecondFloorAltbau search={search} />
      });
      return getFloorPlan(search)[floor];
    }

    changeFloor(floor){
      this.setState({
        floor,
      });
    }

    render() {
        return (
            <div className="lageplan-wrapper">
                <div className="sidebar">
                    <div className="backInfo"><Link to="/home/lageplan"><img className="backBtn" src={backLogo} /></Link></div>
                  <input className="search" placeholder="Suche nach einem Raum..." value={this.state.search} onChange={(e) => this.handleChange(e)} />
                  <button className={`change-floor ${this.state.floor === 0 && 'active'}`} value="0" onClick={() => this.changeFloor(0)}>UG</button>
                  <button className={`change-floor ${this.state.floor === 1 && 'active'}`} value="1" onClick={() => this.changeFloor(1)}>EG</button>
                  <button className={`change-floor ${this.state.floor === 2 && 'active'}`} value="2" onClick={() => this.changeFloor(2)}>1</button>
                </div>
                <div className="lageplan">
                  {this.floorPlan(this.state.floor, this.state.search)}
                  {/* <FirstFloorAltbau search={this.state.search} /> */}
                </div>
            </div>
        );
    }
}

export default Altbau;
