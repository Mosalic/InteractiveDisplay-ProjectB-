import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import campus from '../Mediencampus_Finkenau.png';
import './Lageplan.css';

class Lageplan extends Component {
  render() {
    return (
        <div className="lageplan-wrapper">
           <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 558 474.57">

            <title>Mediencampus_Finkenau</title>
            <image width="558" height="765" transform="translate(0 -98.51)" href={campus} />
            <Link to="/home/neubau">
              <polygon id="Neubau" className="room" points="291.81 41.04 291.81 92.55 379.05 92.55 379.05 171.35 432.16 171.35 432.16 91.54 423.97 91.54 423.97 28.39 291.81 28.39 291.81 41.04"/>
            </Link>
            <Link to="/home/altbau">
              <polygon id="Altbau" className="room" points="388.83 210.85 388.83 202.37 422.13 202.37 422.13 210.85 432.16 210.85 432.16 380.3 351.14 380.3 351.14 377.67 254.14 377.67 254.14 380.3 176.14 380.3 176.14 377.96 149.55 377.96 148.91 380.3 146.75 382.46 144.6 384.04 141.73 385.33 137.85 386.05 137.85 390.5 115.03 390.5 115.03 339.49 253.99 339.49 253.99 349.49 273 349.49 273 306.39 331.99 306.39 331.99 349.49 351 349.49 351.01 339.49 374.9 339.48 393.86 339.48 398 339.48 398 317.47 383.05 317.47 383.05 262.53 398.07 262.53 398.07 239.46 378.4 239.46 378.4 210.72 388.83 210.85"/>
            </Link>
            <polygon id="GebaudeC" className="no-room" points="266.03 40.43 266.03 20.46 219.88 20.46 219.88 29.36 178.06 29.36 178.06 104.11 220.42 104.11 220.42 91.97 291.81 91.97 291.81 40.49 266.03 40.43"/>
            </svg>
        </div>
    );
  }
}

export default Lageplan;
