/*
 *Admin-Bereich:
 *Die Daten zu den Professoren werden aus der Datenbank geholt und angezeigt.
 *Die Professoren werden alphabetisch sortiert und man kann diese bearbeiten oder löschen.
 *Auch die Suchfunktion ist hier implementiert.
 *Hier wird zusätzlich auf die "AddProfessor" und "withAuth" Komponenten zugegriffen.
*/

import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css'
import AddProfessor from './AddProfessor';
import FontAwesome from 'react-fontawesome';
import withAuth from './withAuth';
// import faStyles from 'font-awesome/css/font-awesome.css';

class Professoren extends Component {
  constructor(){
    super();

    this.state = {
      professoren: [],
      addProfessor: false,
      nextProfessorId: null,
      editProfessor: {},
    }
  }

  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  componentDidMount(){
    this.getProfessoren();
  }

  getProfessoren(){
    axios.get('http://localhost:3001/professoren')
    .then((response) => {
      this.setState({
        nextProfessorId: response.data.professoren[response.data.professoren.length - 1].id + 1,
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

  deleteProfessor(id){
    console.log('delete');
    axios.delete(`http://localhost:3001/professoren/${id}`, {headers:{ Authorization: localStorage.getItem('JWTToken')}})
    .then((response) => {
      console.log('deleted');
      this.getProfessoren();
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  editProfessor(professor){
    this.setState({
      addProfessor: true,
      editProfessor: professor,
    })
  }

  toggleAddProfessor(){
    this.setState({
      addProfessor: !this.state.addProfessor,
      editProfessor: {},
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

  render() {
    return (
        <div>
          <div className="professoren-wrapper">
            {/* <h1>Professoren</h1> */}
            <button type="button" className="add" onClick={() => this.toggleAddProfessor()}><FontAwesome name="plus" /></button>
            <input name="suche" type="text" placeholder="Suchen" onChange={(e) => this.searchProf(e)} />
            <div className="professoren">
              {this.state.professoren.map((professor, index) =>
                <div className="professor" key={index}>
                  <div className="professor__edit">
                    <button onClick={() => this.editProfessor(professor)}>
                      <FontAwesome name="edit" className="icn-edit"/>
                    </button>
                    <button onClick={(id) => this.deleteProfessor(professor.id)}>
                      <FontAwesome name="trash" className="icn-delete"/>
                    </button>
                  </div>
                  <div className="professor-foto" style={{backgroundImage: `${professor.img ? `url(data:image/png;base64,${new Buffer(professor.img.data, 'binary').toString('base64')})`: `url(${require('./dummy-image.jpeg')})`}`}}>
                  </div>
                  <div className="professor-information">
                    <div className="professor-heading">
                      <h2>{professor.name}</h2>
                      <span className="funktion">{professor.funktion}</span><br />
                    </div>
                    <div className="professor-main">
                      <div>Raum: <span>{professor.raum}</span></div>
                      <div>Email: <span>{professor.email}</span></div>
                      <div>Telefonnummer: <span>{professor.telefonnummer}</span></div>
                      <div>Sprechzeiten: <span>{professor.sprechzeiten}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <AddProfessor
              nextProfessorId={this.state.nextProfessorId}
              show={this.state.addProfessor}
              close={() => this.toggleAddProfessor()}
              professor={this.state.editProfessor}
              getProfessoren={() => this.getProfessoren()}
            />
          </div>
        </div>
    );
  }
}

export default withAuth(Professoren);
