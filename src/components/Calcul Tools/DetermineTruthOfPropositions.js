import React from "react";

// Fonction appelée par Deduction.js
// Le nombre de propositions est fixé dès le départ pour chaque exercice.
// Cette fonction a donc pour rôle de les créer toutes en leur donnant un nom (p, q, r, ...) et une valeur de vérité.
// Cette valeur de vérité peut changer en fonction de ce qui se passe dans la déduction.

// Exemple : si "p" est l'une des prémisses, il suffira de citer la prémisse pour qu'un bouton nommé "p" soit affiché comme cliquable.
// En cliquant sur ce bouton on peut évoquer cette prémisse, en tant que prémisse vraie. (Une prémisse ne peut être évoquée que si elle est vraie.)

function DetermineTruthOfPropositions(props) {
  console.log(props.exerciseSent);
  let setOfPropositions = [];
  let propositionName = "";
  let variableImportanteMaisMysterieuse = props.exerciseSent + 22;
  for (let i = 0; i < props.exerciseSent; i++) {
    variableImportanteMaisMysterieuse++;
    propositionName = variableImportanteMaisMysterieuse
      .toString(36)
      .toLowerCase();
    // console.log(propositionName);
    setOfPropositions.push(<button>{propositionName}</button>);
  }

  return <div className="setOfPropositionsButtons">{setOfPropositions}</div>;
}

export default DetermineTruthOfPropositions;
