// Ancienne version de Show Possible Meaning, je tente de virer le state dans l'autre (pour régler le problème de maj de la page)

import React, { Component, Fragment } from "react";

class ShowPossibleMeaning extends Component {
  randomFromCurrentLength = () => {
    return Math.floor(Math.random() * this.props.exerciseSent.meaning.length);
  };

  showMeaning = arrayMeaning => {
    if (arrayMeaning !== "afficher une signification possible") {
      let meaningOrganized = [];
      for (let i = 0; i < arrayMeaning.length; i++) {
        meaningOrganized.push(<li key={i}>{arrayMeaning[i]}</li>);
      }
      return meaningOrganized;
    }
  };

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let feather;
    let possibleMeaningShown;
    if (meanings.length > 0) {
      feather = (
        <div
          className="selectable icon"
          onClick={() =>
            this.props.valueInference.setPossibleMeaning(
              meanings[this.randomFromCurrentLength()]
            )
          }
        >
          <i id="feather-meaning" className="fas fa-feather-alt" />
          {this.showMeaning(this.props.valueInference.possibleMeaningShown)}
        </div>
      );
    } else {
      feather = (
        <div className="selectable">
          <i id="feather-meaning" className="fas fa-feather-alt deactivated" />
          <p className={"no-meaning-shown"}>
            pas de signification pour cet exercice
          </p>
        </div>
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
      if (this.props.valueInference.possibleMeaningShown.length === 0) {
        possibleMeaningShown = (
          <p className={"possible-meaning"}>
            {possibleMeaning[this.randomFromCurrentLength()]}
          </p>
        );
      } else if (this.props.valueInference.possibleMeaningShown.length > 0) {
        possibleMeaningShown = (
          <p className={"no-meaning-shown"}>
            afficher une signification possible
          </p>
        );
      }
    }

    return <div className="set-meaning">{feather}</div>;
  }
}
export default ShowPossibleMeaning;
