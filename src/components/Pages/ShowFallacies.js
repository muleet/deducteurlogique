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
    // mistakes: 0
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
    // newMistakes = this.state.mistakes;
    if (clickedNumber === this.state.currentNumber) {
      // le nombre est trouvé, donc on va l'enlever d'undeterminedNumbers, le mettre dans rightNumbers, puis resélectionner au hasard un autre nombre dans ceux qui restent
      const position = newUndeterminedNumbers.indexOf(clickedNumber);
      newUndeterminedNumbers.splice(position, 1);
      newRightNumbers.push(clickedNumber);
      const randomNumber = Math.floor(
        Math.random() * newUndeterminedNumbers.length
      );
      newCurrentNumber = newUndeterminedNumbers[randomNumber];
      newWrongNumbers = [];
    } else if (
      clickedNumber !== this.state.currentNumber &&
      !newWrongNumbers.includes(clickedNumber)
    ) {
      // ce n'était pas le bon nombre, ET il n'est pas déjà présent dans wrongNumbers, donc on va ajouter le nombre dans wrongNumbers et incrémenter mistakes
      newWrongNumbers.push(clickedNumber);
      // newMistakes++;
    }
    this.setState({
      undeterminedNumbers: newUndeterminedNumbers,
      currentNumber: newCurrentNumber,
      wrongNumbers: newWrongNumbers,
      rightNumbers: newRightNumbers
      // mistakes: newMistakes
    });
  }

  showFallaciesNames() {
    let arrayToReturn = [];
    for (let i = 0; i < Fallacies.length; i++) {
      let occurrentClassName = "",
        typeClassName = "";
      if (this.state.wrongNumbers.indexOf(i) !== -1) {
        occurrentClassName = "fallacy-button-wrongfullySelected";
      } else if (this.state.rightNumbers.indexOf(i) !== -1) {
        occurrentClassName = "fallacy-button-rightfullySelected";
      } else if (this.state.currentNumber === i && this.state.cheat) {
        occurrentClassName = "fallacy-button-cheatfullySelected";
      }

      if (Fallacies[i].type === "deductive") {
        typeClassName = typeClassName + " deductive-bullet";
      } else if (Fallacies[i].type === "irrelevant") {
        typeClassName = typeClassName + " irrelevant-bullet";
      } else if (Fallacies[i].type === "denial") {
        typeClassName = typeClassName + " denial-bullet";
      } else if (Fallacies[i].type === "inductive") {
        typeClassName = typeClassName + " inductive-bullet";
      }

      arrayToReturn.push(
        <li
          key={i}
          className={"fallacy-button " + occurrentClassName}
          onClick={() => this.verifyFallacy(i)}
        >
          <p className={typeClassName}>•</p>
          {Fallacies[i].frenchName}
        </li>
      );
    }
    return arrayToReturn;
  }

  showRandomDefinition(currentNumber) {
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
      let alternateName = "",
        typeClassName = "";
      if (Fallacies[i].alternateFrenchName) {
        alternateName = (
          <p className="alternateTitle-single-fallacy-information">
            {Fallacies[i].alternateFrenchName}
          </p>
        );
      }
      if (Fallacies[i].type === "deductive") {
        typeClassName = typeClassName + " deductive-bullet";
      } else if (Fallacies[i].type === "irrelevant") {
        typeClassName = typeClassName + " irrelevant-bullet";
      } else if (Fallacies[i].type === "denial") {
        typeClassName = typeClassName + " denial-bullet";
      } else if (Fallacies[i].type === "inductive") {
        typeClassName = typeClassName + " inductive-bullet";
      }
      listOfTheFallacies.push(
        <li key={i} className={"single-fallacy-information"}>
          <div className="title-single-fallacy-information">
            <p className={typeClassName}>•</p>
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
                  <div
                    style={{
                      fontSize: "16px"
                    }}
                  >
                    Voici la liste des sophismes pris en compte sur ce site.
                    Cliquez en dehors de cette liste pour la quitter.
                    <br />
                    Ils peuvent être catégories en 4 types : <br />
                    <p style={{ color: "red" }}>Sophismes déductifs</p> : ce
                    sont des raisonnements abstraits, supposés n'utiliser que la
                    forme logique, et ne tenant pas compte du monde physique.
                    Souvent ils débutent par des prémisses, à partir desquelles
                    des déductions sont faites.
                    <br />
                    <p style={{ color: "blue" }}>Sophismes non pertinents</p> :
                    raisonnements qui introduisent des facteurs non pertinents,
                    empêchant le flux logique d'un argument.
                    <br />
                    <p style={{ color: "green" }}>Sophismes de réfutation</p> :
                    raisonnements utilisés pour réfuter des affirmations.
                    <br />
                    <p style={{ color: "yellow" }}>Sophismes inductifs</p> :
                    raisonnements qui impliquent l'utilisation de données du
                    monde physique, à partir desquelles des conclusions sont
                    tirées. <br />
                    Source de cette classification :
                    http://www.toolkitforthinking.com/critical-thinking/anatomy-of-an-argument
                  </div>
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
              ci-dessous, laquelle est tirée au hasard.
            </p>
            <div className="set-definition-and-counts">
              <p className="fallacy-randomDefinition ">
                « {this.showRandomDefinition(this.state.currentNumber)} »
              </p>
              <div className="set-counts">
                <p>
                  Nombre de sophismes trouvés : {this.state.rightNumbers.length}
                  /{Fallacies.length}
                </p>
                {/* <p>Erreurs faites : {this.state.mistakes}</p> */}
              </div>
            </div>
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
