import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Spiele extends Component{
    render(){
        return(
            /*Hier normal HTML programmieren*/
            <div>
                <Link to="/home/allgemeineInformationen">
                  <div className="button">
                      Memory Game
                  </div>
                </Link>
            </div>
        );
    }
}

export default Spiele; /*um das in anderen Dateien importieren zu können*/