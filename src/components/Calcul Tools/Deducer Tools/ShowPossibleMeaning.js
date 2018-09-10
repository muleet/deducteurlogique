// Ancienne version de Show Possible Meaning, je tente de virer le state dans l'autre (pour régler le problème de maj de la page)

import React, { Component } from "react";

class ShowPossibleMeaning extends Component {
  randomFromCurrentLength = () => {
    return Math.floor(Math.random() * this.props.exerciseSent.meaning.length);
  };

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let possibleMeaning = [];
    if (!(meanings === undefined)) {
      for (let i = 0; i < meanings.length; i++) {
        possibleMeaning.push([]);
        for (let j = 0; j < meanings[i].length; j++) {
          possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
        }
      }
    }
    let possibleMeaningShown;
    if (this.props.valueInference.possibleMeaning.currentlyShown === true) {
      possibleMeaningShown = (
        <p className={"possible-meaning"}>
          {possibleMeaning[this.randomFromCurrentLength()]}
        </p>
      );
    } else if (
      this.props.valueInference.possibleMeaning.currentlyShown === false
    ) {
      possibleMeaningShown = (
        <p className={"no-meaning-shown"}>
          afficher une signification possible
        </p>
      );
    }

    return (
      <div className="set-meaning">
        <i
          id="feather-meaning"
          className="fas fa-feather-alt icon"
          onClick={() => this.props.valueInference.setPossibleMeaning(meanings)}
        />
        {possibleMeaningShown}
      </div>
    );
  }
}
export default ShowPossibleMeaning;
