import React, {Component} from 'react';
import './List.css'
import axios from 'axios';
import AddProfessor from '../Admin/AddProfessor';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import backLogo from '../backBtn.png';

class ProfessorenListe extends Component{
 constructor(){
    super();

    this.state = {
      professoren: [],
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/professoren')
    .then((response) => {
      this.setState({
        professoren: response.data.professoren.sort(function(a, b){
                      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                      return 0;
                    }),
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

    //Bei jeder Änderung im Suchfeld wird das Suchergebnis angezeigt
    searchProf(e){
      console.log("Suche: " + e.target.value);
      var i = 0;
      var searchText = e.target.value.toLowerCase();
      var professorenDivs = document.getElementsByClassName('professor');

           if(searchText.length > 0){
              console.log("Suche nicht leer");
              this.state.professoren.map(function(professor, index){
                  var profName = professor.name.toLowerCase();
                  console.log("Vorhandene Namen: " + profName);
                  if(profName.includes(searchText)){
                      console.log(searchText + " ist vorhanden in " + profName + " in Position: " + profName.indexOf(searchText));
                      professorenDivs[index].style.display = "";
                  }else{
                      professorenDivs[index].style.display = 'none';
                  }
              });
          } else {
            this.state.professoren.map(function(professor, index){
              professorenDivs[index].style.display = "";
            });
          }
    }

    showRoom(room){
      this.props.history.push(`/home/altbau?room=${room}`);
    }

  render() {
    return (
        <div>
         <h1>Professoren Liste</h1>
          <div className="professoren-wrapper">


             <input name="suche" type="text" placeholder="Suchen" onChange={(e) => this.searchProf(e)} />

            <div className="professoren">
              {this.state.professoren.map((professor, index) =>
                <div className="professor" key={index}>

                  <div className="professor-foto" style={{backgroundImage: `${professor.img ? `url(data:image/png;base64,${new Buffer(professor.img.data, 'binary').toString('base64')})`: `url(${require('../Admin/dummy-image.jpeg')})`}`}}>
                  </div>
                  <div className="professor-information">
                    <div className="professor-heading">
                      <div className="professor-name"><h2>{professor.name}</h2></div>
                      <span className="funktion">{professor.funktion}</span><br />
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="professor-main">
                      <div>Raum: <span className="span-info"><button className="raum__button" onClick={() => this.showRoom(professor.raum)}>{professor.raum}</button></span></div>
                      <div>Email: <span>{professor.email}</span></div>
                      <div>Telefonnummer: <span>{professor.telefonnummer}</span></div>
                      <div>Sprechzeiten: <span>{professor.sprechzeiten}</span></div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default ProfessorenListe; /*um das in anderen Dateien importieren zu können*/
