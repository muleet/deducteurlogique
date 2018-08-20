import React, { Component } from "react";

class ShowInferencePossibleMeaning extends Component {
  state = {
    meaningNumberChosen: 0 // nombre de la signification choisie actuellement par l'utilisateur/le programme
  };

  changeState = length => {
    // if (this.state.meaningNumberChosen > length) {
    //   this.setState({ meaningNumberChosen: 0 });
    // } else {
    //   this.setState({
    //     meaningNumberChosen: this.state.meaningNumberChosen + 1
    //   });
    // }
  };

  randomMeaning = length => {
    return Math.floor(Math.random() * length);
  };

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let possibleMeaning = [[], [], [], [], [], [], [], [], [], [], [], [], []];
    let meaningNumber = 1;
    if (!(meanings[0] === undefined)) {
      if (typeof meanings[0] === "string") {
        for (let i = 0; i < meanings.length; i++) {
          possibleMeaning[0].push(<li key={i}>{meanings[i]}</li>);
        }
      } else if (typeof meanings[0] === "object") {
        meaningNumber = meanings.length;
        for (let i = 0; i < meanings.length; i++) {
          for (let j = 0; j < meanings[i].length; j++) {
            possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
          }
        }
      }
    }

    return (
      <div className="set-meaning">
        <i
          id="feather"
          className="fas fa-feather-alt icon meaning-button"
          // onClick={() => {
          //   this.changeState(meanings.length);
          // }}
        >
          <p className={"no-meaning-shown"}>
            afficher une signification possible
          </p>
          <ul className="possible-meaning">
            {possibleMeaning[this.randomMeaning(meaningNumber)]}
          </ul>
        </i>
      </div>
    );
  }
}
export default ShowInferencePossibleMeaning;
