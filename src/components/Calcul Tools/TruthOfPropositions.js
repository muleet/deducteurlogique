import React, { Component, Fragment } from "react";

// Fonction appelée par Deduction.js
// Le nombre de propositions est fixé dès le départ pour chaque exercice.
// Cette fonction a donc pour rôle de les créer toutes en leur donnant un nom (p, q, r, ...) et une valeur de vérité.
// Cette valeur de vérité peut changer en fonction de ce qui se passe dans la déduction.

// Exemple : si "p" est l'une des prémisses, il suffira de citer la prémisse pour qu'un bouton nommé "p" soit affiché comme cliquable.
// En cliquant sur ce bouton on peut évoquer cette prémisse, en tant que prémisse vraie. (Une prémisse ne peut être évoquée que si elle est vraie.)

class TruthOfPropositions extends Component {
  state = {
    setOfPropositions: {}
  };

  howManyPropositionsForThisExercice = props => {
    let propositionsImplied = 3;
    let propositionName = "";
    for (let i = 0; i < propositionsImplied; i++) {
      propositionName = propositionsImplied.toString(36).toLowerCase();
      console.log(propositionName);

      this.state.setOfPropositions.push(
        props.propositionsImplied.toString(36).toLowerCase()
      );
    }
    return this.state.setOfPropositions;
  };
  render() {
    console.log("WESSSSSSSSSSSSSH");
    return "wesh";
    // return this.howManyPropositionsForThisExercice();
  }
}

export default TruthOfPropositions;
