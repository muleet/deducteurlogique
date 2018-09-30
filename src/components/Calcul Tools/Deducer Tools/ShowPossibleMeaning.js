// Ancienne version de Show Possible Meaning, je tente de virer le state dans l'autre (pour régler le problème de maj de la page)

import React, { Component } from "react";

class ShowPossibleMeaning extends Component {
  randomFromCurrentLength = () => {
    return Math.floor(Math.random() * this.props.exerciseSent.meaning.length);
  };

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let feather;
    let possibleMeaningShown;
    if (meanings.length > 0) {
      feather = (
        <i
          id="feather-meaning"
          className="fas fa-feather-alt icon"
          onClick={() => this.props.valueInference.setPossibleMeaning(meanings)}
        />
      );
    } else {
      feather = (
        <i id="feather-meaning" className="fas fa-feather-alt deactivated" />
      );
      possibleMeaningShown = (
        <p className={"no-meaning-shown"}>
          pas de signification pour cet exercice
        </p>
      );
    }
    let possibleMeaning = [];
    if (!(meanings === undefined)) {
      for (let i = 0; i < meanings.length; i++) {
        possibleMeaning.push([]);
        for (let j = 0; j < meanings[i].length; j++) {
          possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
        }
      }
    }
    if (meanings.length > 0) {
      if (this.props.valueInference.possibleMeaningShown === true) {
        possibleMeaningShown = (
          <p className={"possible-meaning"}>
            {possibleMeaning[this.randomFromCurrentLength()]}
          </p>
        );
      } else if (this.props.valueInference.possibleMeaningShown === false) {
        possibleMeaningShown = (
          <p className={"no-meaning-shown"}>
            afficher une signification possible
          </p>
        );
      }
    }

    return (
      <div className="set-meaning">
        {feather}
        {possibleMeaningShown}
      </div>
    );
  }
}
export default ShowPossibleMeaning;
