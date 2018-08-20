import React, { Component } from "react";

class ShowInferencePossibleMeaning extends Component {
  state = {
    currentMeaningNumber: "rien", // nombre de la signification choisie actuellement par l'utilisateur ou le programme. Il est par défaut vide, et est déterminé aléatoirement au premier clic de l'utilisateur sur l'icône de plume.
    myContent: (
      <p className={"no-meaning-shown"}>afficher une signification possible</p>
    ),
    myFeather: (
      <i
        id="feather-meaning"
        className="fas fa-feather-alt icon"
        onClick={() => this.handleClick()}
      />
    )
  };

  randomMeaning = length => {
    return Math.floor(Math.random() * length);
  };

  initialLaunch() {}

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let possibleMeaning = [[], [], [], [], [], [], [], [], [], [], [], [], []]; // flemme de faire un code qui crée un nombre de case cohérent avec le nombre d'exemples
    if (!(meanings === undefined)) {
      for (let i = 0; i < meanings.length; i++) {
        for (let j = 0; j < meanings[i].length; j++) {
          possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
        }
      }
    }

    this.handleClick = () => {
      console.log("handleclick");
      if (this.state.currentMeaningNumber === "rien") {
        // on vérifie que currentMeaningNumber n'est pas juste "rien"
        let isTheNumberDifferent = false;
        while (isTheNumberDifferent !== true) {
          const newNumber = this.randomMeaning(meanings.length);
          if (this.state.currentMeaningNumber !== newNumber) {
            isTheNumberDifferent = true;
            this.setState({
              currentMeaningNumber: newNumber,
              myContent: (
                <ul className="possible-meaning">
                  {possibleMeaning[newNumber]}
                </ul>
              )
            });
          }
        }
      } else {
        this.setState({
          currentMeaningNumber: "rien",
          myContent: (
            <p className={"no-meaning-shown"}>
              afficher une signification possible
            </p>
          )
        });
      }
    };

    return (
      <div className="set-meaning">
        {this.state.myFeather}
        {this.state.myContent}
      </div>
    );
  }

  componentDidMount() {
    if (!(this.props.exerciseSent.meaning[0] === undefined)) {
      this.setState({
        myContent: (
          <p className={"no-meaning-shown"}>
            afficher une signification possible
          </p>
        )
      });
    } else {
      this.setState({
        myContent: (
          <p className="no-meaning-shown deactivated">
            pas de signification prévue pour cet exercice
          </p>
        ),
        myFeather: (
          <i id="feather-meaning" className="fas fa-feather-alt deactivated" />
        )
      });
    }
  }
}
export default ShowInferencePossibleMeaning;
