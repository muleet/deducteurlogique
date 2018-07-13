import React, { Component, Fragment } from "react";

// fonction appelée par Deduction.js, qui envoie des props (qui ont pour origine le fichier Exercices.json)
class ShowInformationsExercise extends Component {
  render() {
    // on crée un ensemble html qui va organiser l'affichage des prémisses, qu'il y en ait 1, 2, 150, 0
    let setOfPremisses = [];
    let numberOfPremisses = 9; // cette variable permet de connaître le numéro de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.
    for (let i = 0; i < this.props.premisses.length; i++) {
      numberOfPremisses = numberOfPremisses + 1;
      setOfPremisses.push(
        <Fragment>
          {numberOfPremisses.toString(36).toLowerCase()}.{" "}
          {this.props.premisses[i]}
          <br />
        </Fragment>
      );
    }
    console.log();

    // on retourne l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
    return (
      <div
        style={{
          fontStyle: "italic",
          display: "flex",
          marginRight: "20px",
          justifyContent: "row"
        }}
      >
        <div>
          Prémisses : <div class="setOfInformation">{setOfPremisses}</div>
        </div>
        <div>
          {" "}
          Conclusion :{" "}
          <div class="setOfInformation">{this.props.conclusion}</div>
        </div>
      </div>
    );
  }
}
export default ShowInformationsExercise;
