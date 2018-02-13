import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firstFloor from './first_floor.svg';
import './Lageplan.css';
import FirstFloorAltbau from './FirstFloorAltbau';
import BasementFloorAltbau from './BasementFloorAltbau';

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
                  <input className="search" placeholder="Suche nach einem Raum..." value={this.state.search} onChange={(e) => this.handleChange(e)} />
                  <button onClick={() => this.changeFloor(0)}>Basement Floor</button>
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
