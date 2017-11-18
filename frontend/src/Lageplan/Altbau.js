import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import firstFloor from './first_floor.svg';
import './Lageplan.css';
import FirstFloorAltbau from './FirstFloorAltbau';

class Altbau extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: '',
        };
    }

    handleChange(e){
        this.setState({
            search: e.target.value,
        });
    }

    render() {
        return (
            <div className="lageplan-wrapper">
                <input value={this.state.search} onChange={(e) => this.handleChange(e)} />
                <FirstFloorAltbau search={this.state.search} />
            </div>
        );
    }
}

export default Altbau;