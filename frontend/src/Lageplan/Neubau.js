import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firstFloor from './first_floor.svg';
import './Lageplan.css';
import BasementNeubau from './BasementNeubau';
import FirstFloorNeubau from './FirstFloorNeubau';
import SecondFloorNeubau from './SecondFloorNeubau';
import ThirdFloorNeubau from './ThirdFloorNeubau';
import FourthFloorNeubau from './FourthFloorNeubau';
import backLogo from '../backBtn.png';

class Neubau extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchValue: '',
            floor: 1,
            search: '',
        };
    }

    handleChange(e){
        this.setState({
            searchValue: e.target.value,
        });
    }

    componentDidMount(){
      if(this.props.location.search !== ''){
        const searchValue = this.props.location.search.split('=')[1];
        this.setState({
          searchValue,
        });
        this.search(searchValue);
      }
    }

    floorPlan(floor, search){
      const getFloorPlan = (search) => ({
        0: <BasementNeubau search={search} />,
        1: <FirstFloorNeubau search={search} />,
        2: <SecondFloorNeubau search={search} />,
        3: <ThirdFloorNeubau search={search} />,
        4: <FourthFloorNeubau search={search} />
      });
      return getFloorPlan(search)[floor];
    }

    changeFloor(floor){
      this.setState({
        floor,
      });
    }

    search(searchValue){
      if(searchValue.charAt(0) === 'U'){
        this.setState({
          search: searchValue,
          floor: 0,
        });
      } else if(searchValue.charAt(0) === 'E'){
        this.setState({
          search: searchValue,
          floor: 1,
        });
      } else if(searchValue.charAt(0) === '2'){
        this.setState({
          search: searchValue,
          floor: 2,
        });
      } else if(searchValue.charAt(0) === '3'){
        this.setState({
          search: searchValue,
          floor: 3,
        });
      } else if(searchValue.charAt(0) === '4'){
        this.setState({
          search: searchValue,
          floor: 4,
        });
      } else if(searchValue === ''){
        this.setState({
          search: searchValue,
        });
      }
    }

    render() {
      console.log(this.props);
        return (
            <div className="lageplan-wrapper">
                <div className="sidebar">
                  <div className="lageplan-top">
                    <div className="lageplan-search">
                      <input className="search" placeholder="Suche nach einem Raum..." value={this.state.searchValue} onChange={(e) => this.handleChange(e)} />
                      <button onClick={() => this.search(this.state.searchValue)}>Suchen</button>
                    </div>
                    <button className={`change-floor ${this.state.floor === 0 && 'active'}`} value="0" onClick={() => this.changeFloor(0)}>EG</button>
                    <button className={`change-floor ${this.state.floor === 1 && 'active'}`} value="1" onClick={() => this.changeFloor(1)}>1</button>
                    <button className={`change-floor ${this.state.floor === 2 && 'active'}`} value="2" onClick={() => this.changeFloor(2)}>2</button>
                    <button className={`change-floor ${this.state.floor === 3 && 'active'}`} value="3" onClick={() => this.changeFloor(3)}>3</button>
                    <button className={`change-floor ${this.state.floor === 4 && 'active'}`} value="4" onClick={() => this.changeFloor(4)}>4</button>
                  </div>
                </div>
                <div className="lageplan">
                  {this.floorPlan(this.state.floor, this.state.search)}
                </div>
            </div>
        );
    }
}

export default Neubau;
