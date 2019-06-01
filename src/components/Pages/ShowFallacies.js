import React, { Component, Fragment } from "react";
import Fallacies from "../../data/Fallacies";
import BasicReactModal from "../BasicTools/BasicReactModal";

class ShowFallacies extends Component {
  state = {
    undeterminedNumbers: [0],
    currentNumber: 0,
    wrongNumbers: [],
    rightNumbers: [],
    cheat: false
  };

  resetState() {
    // on remet à zéro les nombres
    let resettedNumbers = [];
    for (let i = 0; i < Fallacies.length; i++) {
      resettedNumbers.push(i);
    }
    const newCurrentNumber =
      resettedNumbers[Math.floor(Math.random() * resettedNumbers.length - 1)];
    this.setState({
      undeterminedNumbers: resettedNumbers,
      currentNumber: newCurrentNumber,
      wrongNumbers: [],
      rightNumbers: []
    });
  }

  verifyFallacy(clickedNumber) {
    let newUndeterminedNumbers = this.state.undeterminedNumbers,
      newCurrentNumber = this.state.currentNumber,
      newWrongNumbers = this.state.wrongNumbers,
      newRightNumbers = this.state.rightNumbers;
    if (clickedNumber === this.state.currentNumber) {
      // le nombre est trouvé, donc on va l'enlever d'undeterminedNumbers, le mettre dans rightNumbers, puis resélectionner au hasard un autre nombre dans ceux qui restent
      const position = newUndeterminedNumbers.indexOf(clickedNumber);
      console.log("U avant", newUndeterminedNumbers);
      newUndeterminedNumbers.splice(position, 1);
      console.log("U après", newUndeterminedNumbers);
      newRightNumbers.push(clickedNumber);
      console.log("C avant", newCurrentNumber);
      const randomNumber = Math.floor(
        Math.random() * newUndeterminedNumbers.length
      );

      console.log("randomNumber", randomNumber);
      newCurrentNumber = newUndeterminedNumbers[randomNumber];
      console.log("C après", newCurrentNumber);

      newWrongNumbers = [];
    } else if (
      clickedNumber !== this.state.currentNumber &&
      !newWrongNumbers.includes(clickedNumber)
    ) {
      // ce n'était pas le bon nombre, ET il n'est pas déjà présent dans wrongNumbers, donc on va ajouter le nombre dans wrongNumbers
      newWrongNumbers.push(clickedNumber);
    }
    this.setState({
      undeterminedNumbers: newUndeterminedNumbers,
      currentNumber: newCurrentNumber,
      wrongNumbers: newWrongNumbers,
      rightNumbers: newRightNumbers
    });
  }

  showFallaciesNames() {
    let arrayToReturn = [];
    for (let i = 0; i < Fallacies.length; i++) {
      let specificClassName = "";
      if (this.state.wrongNumbers.indexOf(i) !== -1) {
        specificClassName = "fallacy-button-wrongfullySelected";
      } else if (this.state.rightNumbers.indexOf(i) !== -1) {
        specificClassName = "fallacy-button-rightfullySelected";
      } else if (this.state.currentNumber === i && this.state.cheat) {
        specificClassName = "fallacy-button-cheatfullySelected";
      }
      arrayToReturn.push(
        <li
          key={i}
          className={"fallacy-button " + specificClassName}
          onClick={() => this.verifyFallacy(i)}
        >
          {Fallacies[i].frenchName}
        </li>
      );
    }
    return arrayToReturn;
  }

  showRandomDescription(currentNumber) {
    if (this.state.undeterminedNumbers.length > 0) {
      return Fallacies[currentNumber].definition;
    }
  }

  toggleCheat() {
    let newCheat = true;
    if (this.state.cheat) {
      newCheat = false;
    }
    this.setState({ cheat: newCheat });
  }

  render() {
    // section du point d'interrogation
    const questionMark = (
      <div className={"question-mark-button icon"}>
        <i className="fas fa-question-circle" />
        <div className="question-mark">
          <div className="question-mark-title">A quoi sert cette page ?</div>
          <ul className="question-mark-content">
            Cette page a pour but d'aider à mémoriser les noms des raisonnements
            fallacieux et leurs définitions.
          </ul>
        </div>
      </div>
    );
    const togglerCheat = (
      <div className={"question-mark-button icon"}>
        <i
          className="fas fa-theater-masks"
          onClick={() => this.toggleCheat()}
        />{" "}
        <div className="question-mark">
          <div className="question-mark-title">
            Cliquez pour activer/désactiver la triche.
          </div>
        </div>
      </div>
    );

    const listOfTheFallacies = [];
    for (let i = 0; i < Fallacies.length; i++) {
      let alternateName = "";
      if (Fallacies[i].alternateFrenchName) {
        alternateName = (
          <p className="alternateTitle-single-fallacy-information">
            {Fallacies[i].alternateFrenchName}
          </p>
        );
      }
      listOfTheFallacies.push(
        <li key={i} className="single-fallacy-information">
          <div className="title-single-fallacy-information">
            {Fallacies[i].frenchName}
            {alternateName}
          </div>
          <p className="definition-single-fallacy-information">
            {Fallacies[i].definition}
          </p>
        </li>
      );
    }

    return (
      <main className="main-info">
        <div>
          <h2>
            Mémoriser les raisonnements fallacieux et leur définition
            {questionMark} {togglerCheat}
            <BasicReactModal
              buttonSent={
                <div className={"question-mark-button icon"}>
                  <i className="fas fa-th-list icon" />
                  <div className="question-mark">
                    <div className="question-mark-title">
                      Cliquez ici pour afficher la liste de tous les
                      raisonnements fallacieux pris en compte sur ce site.
                    </div>
                  </div>
                </div>
              }
              contentSent={
                <Fragment>
                  <p>
                    Voici la liste des raisonnements fallacieux pris en compte
                    sur ce site. Cliquez en dehors de cette liste pour la
                    quitter.
                  </p>
                  <ul className="set-all-fallacy-information">
                    {listOfTheFallacies}
                  </ul>
                </Fragment>
              }
            />
          </h2>
          <div className="main-fallacy">
            <p className="fallacy-instruction">
              Cliquez sur le nom de sophisme qui correspond à la définition
              ci-dessous.
            </p>
            <p className="fallacy-randomDescription ">
              « {this.showRandomDescription(this.state.currentNumber)} »
            </p>
            <ul className="set-fallacy-button">{this.showFallaciesNames()}</ul>
          </div>
        </div>
        {/* <ul className="debugger">
          <li>{"undetermined" + this.state.undeterminedNumbers}</li>
          <li>{"right" + this.state.rightNumbers}</li>
          <li>{"wrong" + this.state.wrongNumbers}</li>
        </ul> */}
      </main>
    );
  }

  componentDidMount() {
    this.resetState();
  }
}

export default ShowFallacies;
