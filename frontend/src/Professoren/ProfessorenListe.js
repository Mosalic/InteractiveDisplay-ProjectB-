import React, {Component} from 'react';
import './List.css'
import axios from 'axios';
import AddProfessor from '../Admin/AddProfessor';
import FontAwesome from 'react-fontawesome';

class ProfessorenListe extends Component{
 constructor(){
    super();

    this.state = {
      professoren: [],
      addProfessor: false,
      nextProfessorId: null,
      /*editProfessor: {},*/
    }
  }

  /*componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }*/

  componentDidMount(){
    axios.get('http://localhost:3001/professoren')
    .then((response) => {
      this.setState({
        professoren: response.data.professoren,
        nextProfessorId: response.data.professoren[response.data.professoren.length - 1].id + 1,
      });
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value,
        });
    }
    
    
    searchProf(e){
       console.log("Suche: " + e.target.value);
        var i = 0;
        var searchText = e.target.value.toLowerCase();
        var professorenDivs = document.getElementsByClassName('professor');
       
        
        // console.log("Edmund".includes(searchText)); // Erster Buchstabe wird nicht verglichen
        //for(var i = 0; i < searchText.length; i++){
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
            }
        //}
         
                   
    } 
    
        
 

  /*editProfessor(professor){
    this.setState({
      addProfessor: true,
      editProfessor: professor,
    })
  }*/

    /*toggleAddProfessor(){
        this.setState({
          addProfessor: !this.state.addProfessor,
          editProfessor: {},
        })
    }*/

  render() {
    return (
        <div>
          <div className="professoren-wrapper">
            <h1>Professoren Liste</h1>
             <input name="suche" type="text" placeholder="Suchen" onChange={(e) => this.searchProf(e)} />
           
            <div className="professoren">
              {this.state.professoren.map((professor, index) =>
                <div className="professor" key={index}>
                    
                 {/* <div className="professor__edit">
                      <button onClick={() => this.editProfessor(professor)}>
                      <FontAwesome name="edit" className="icn-edit"/>
                    </button>
                    <button onClick={(id) => this.deleteProfessor(professor.id)}>
                      <FontAwesome name="trash" className="icn-delete"/>
                    </button>
                  </div>*/}
                  <div className="professor-foto" style={{backgroundImage: `${professor.img ? `url(data:image/png;base64,${new Buffer(professor.img.data, 'binary').toString('base64')})`: `url(${require('../Admin/dummy-image.jpeg')})`}`}}>
                  </div>
                  <div className="professor-information">
                    <div className="professor-heading">
                      <div className="professor-name"><h2>{professor.name}</h2></div>
                      <span className="funktion">{professor.funktion}</span><br />
                    </div>
                    {/*Informationen aus der Datenbank werden zugewiesen*/}
                    <div className="professor-main">
                      <div>{/*<img className="room-image" src={ require('./location.png') } /> vllt Icon*/}Raum: <span className="span-info">{professor.raum}</span></div>
                      <div>Email: <span>{professor.email}</span></div>
                      <div>Telefonnummer: <span>{professor.telefonnummer}</span></div>
                      <div>Sprechzeiten: <span>{professor.sprechzeiten}</span></div>
                    </div>
                  </div>

                </div>
              )}
            </div>
            {/*<AddProfessor
              nextProfessorId={this.state.nextProfessorId}
              show={this.state.addProfessor}
              close={() => this.toggleAddProfessor()}
              professor={this.state.editProfessor}
            />*/}
          </div>
        </div>
    );
  }
}

export default ProfessorenListe; /*um das in anderen Dateien importieren zu können*/