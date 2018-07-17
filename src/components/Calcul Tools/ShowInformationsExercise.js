import React, { Fragment } from "react";

// fonction appelée par Deduction.js, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json)
function ShowInformationsExercise(props) {
  // on crée un ensemble html qui va organiser l'affichage des prémisses, qu'il y en ait 1, 2, 150, 0
  let setOfPremisses = [];
  let numberOfPremisses = 9; // cette variable permet de connaître le numéro de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.
  for (let i = 0; i < props.premisses.length; i++) {
    numberOfPremisses = numberOfPremisses + 1;
    setOfPremisses.push(
      <div id="premisses">
        {numberOfPremisses.toString(36).toLowerCase()}. {props.premisses[i]}
      </div>
    );
  }

  // on retourne l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
  return (
    <div className="setPremissesConclusion">
      Prémisses : {setOfPremisses}
      Conclusion : <div id="conclusion">{props.conclusion}</div>
    </div>
  );
}
export default ShowInformationsExercise;
