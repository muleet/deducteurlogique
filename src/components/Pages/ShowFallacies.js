import React, { Component, Fragment } from "react";
import Fallacies from "../../data/Fallacies";
import FallaciesEng from "../../data/FallaciesEng";
import BasicReactModal from "../BasicTools/BasicReactModal";

class ShowFallacies extends Component {
  state = {
    undeterminedNumbers: [0],
    currentNumber: 0,
    wrongNumbers: [],
    rightNumbers: [],
    cheat: false,
    categoriesBool: false,
    content: Fallacies, // peut être Fallacies ou FallaciesEng
    language: "fr", // peut être "fr" ou "en"
    isItRandomOrSorted: "random", // peut être "random" ou "sorted"
    definitionOrExample: 1 // 0=définition & exemple, 1=définition, 2=exemple
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

  changeBoolean(bool) {
    if (bool === "language") {
      let newContent = Fallacies,
        newLanguage = "fr";
      if (this.state.language === "fr") {
        newContent = FallaciesEng;
        newLanguage = "en";
        this.resetState();
      }
      this.setState({ content: newContent, language: newLanguage });
    } else if (bool === "categoriesBool") {
      let newBool = true;
      if (this.state.categoriesBool) {
        newBool = false;
      }
      this.setState({ categoriesBool: newBool });
    }
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
      !newWrongNumbers.includes(clickedNumber) &&
      !this.state.rightNumbers.includes(clickedNumber)
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
    for (let i = 0; i < this.state.content.length; i++) {
      let occurrentClassName = "",
        typeClassName = "";
      if (this.state.wrongNumbers.indexOf(i) !== -1) {
        occurrentClassName = "fallacy-button-wrongfullySelected";
      } else if (this.state.rightNumbers.indexOf(i) !== -1) {
        occurrentClassName = "fallacy-button-rightfullySelected";
      } else if (this.state.currentNumber === i && this.state.cheat) {
        occurrentClassName = "fallacy-button-cheatfullySelected";
      }

      if (this.state.content[i].type === "deductive") {
        typeClassName = typeClassName + " deductive-bullet";
      } else if (this.state.content[i].type === "irrelevant") {
        typeClassName = typeClassName + " irrelevant-bullet";
      } else if (this.state.content[i].type === "denial") {
        typeClassName = typeClassName + " denial-bullet";
      } else if (this.state.content[i].type === "inductive") {
        typeClassName = typeClassName + " inductive-bullet";
      }
      let bullet = "";
      if (this.state.categoriesBool) {
        bullet = <p className={typeClassName}>•</p>;
      }

      arrayToReturn.push(
        <li
          key={i}
          className={"fallacy-button " + occurrentClassName}
          onClick={() => this.verifyFallacy(i)}
        >
          {bullet}
          {this.state.content[i].name}
        </li>
      );
    }
    return arrayToReturn;
  }

  showRandomDefinition(currentNumber) {
    if (
      this.state.undeterminedNumbers.length > 0 &&
      this.state.definitionOrExample < 2
    ) {
      return (
        <p className="fallacy-randomDefinition">
          « {this.state.content[currentNumber].definition} »
        </p>
      );
    }
  }
  showRandomExample(currentNumber) {
    if (
      this.state.undeterminedNumbers.length > 0 &&
      this.state.definitionOrExample !== 1
    ) {
      return (
        <p className="fallacy-randomExample">
          « {this.state.content[currentNumber].examples} »
        </p>
      );
    }
  }

  toggleCheat() {
    let newCheat = true;
    if (this.state.cheat) {
      newCheat = false;
    }
    this.setState({ cheat: newCheat });
  }

  randomizeOrSort() {
    if (this.state.isItRandomOrSorted === "random") {
    } else if (this.state.isItRandomOrSorted === "sorted") {
    }
  }

  setDefinitionOrExample() {
    let newDefinitionOrExample = this.state.definitionOrExample + 1;
    if (newDefinitionOrExample > 2) {
      newDefinitionOrExample = 0;
    }
    this.setState({ definitionOrExample: newDefinitionOrExample });
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
    for (let i = 0; i < this.state.content.length; i++) {
      let alternateName = "",
        typeClassName = "";
      if (this.state.content[i].alternateName) {
        alternateName = (
          <p className="alternateTitle-single-fallacy-information">
            {this.state.content[i].alternateName}
          </p>
        );
      }
      if (this.state.content[i].type === "deductive") {
        typeClassName = typeClassName + " deductive-bullet";
      } else if (this.state.content[i].type === "irrelevant") {
        typeClassName = typeClassName + " irrelevant-bullet";
      } else if (this.state.content[i].type === "denial") {
        typeClassName = typeClassName + " denial-bullet";
      } else if (this.state.content[i].type === "inductive") {
        typeClassName = typeClassName + " inductive-bullet";
      }
      listOfTheFallacies.push(
        <li key={i} className={"single-fallacy-information"}>
          <div className="title-single-fallacy-information">
            <p className={typeClassName}>•</p>
            {this.state.content[i].name}
            {alternateName}
          </div>
          <p className="definition-single-fallacy-information">
            {this.state.content[i].definition}
          </p>
        </li>
      );
    }

    const togglerLanguage = (
      <div className={"question-mark-button icon"}>
        <i
          className="fas fa-flag icon"
          onClick={() => this.changeBoolean("language")}
        />
        <div className="question-mark">
          <div className="question-mark-title">
            Cliquez pour changer la langue des noms et descriptions, français
            vers anglais / click to change the language of the names and
            descriptions, English to French.
          </div>
        </div>
      </div>
    );

    const togglerInfoIconFallacies = (
      <div className={"question-mark-button icon"}>
        <i
          className="fas fa-info-circle icon"
          onClick={() => this.changeBoolean("categoriesBool")}
        />
        <div className="question-mark">
          <div className="question-mark-title">
            Cliquez ici pour afficher les catégories de sophismes.
          </div>
        </div>
      </div>
    );

    // const togglerRandomizeOrSort = (
    //   <div className={"question-mark-button icon"}>
    //     <i className="fas fa-dice" /> onClick=
    //     {() => this.randomizeOrSort()}
    //     <div className="question-mark">
    //       <div className="question-mark-title">
    //         Cliquez ici classer les sophismes aléatoirement ou par ordre
    //         alphabétique.
    //       </div>
    //     </div>
    //   </div>
    // );

    let classNameFontAwesome = "";
    if (this.state.definitionOrExample === 0) {
      classNameFontAwesome = "fas fa-sort";
    } else if (this.state.definitionOrExample === 1) {
      classNameFontAwesome = "fas fa-sort-up";
    } else if (this.state.definitionOrExample === 2) {
      classNameFontAwesome = "fas fa-sort-down";
    }

    const togglerDefinitionAndOrExample = (
      <div className={"question-mark-button icon"}>
        <i
          className={classNameFontAwesome}
          onClick={() => this.setDefinitionOrExample()}
        />
        <div className="question-mark">
          <div className="question-mark-title">
            Cliquez ici pour choisir si vous voulez que pour tout sophisme tiré
            au hasard, sa définition s'affiche, ou son exemple, ou les deux.
          </div>
        </div>
      </div>
    );

    return (
      <main className="main-page-fallacy">
        <h2>
          Mémoriser les raisonnements fallacieux et leur définition
          <div className="set-of-page-icons">
            {questionMark} {togglerDefinitionAndOrExample}
            {togglerInfoIconFallacies} {togglerLanguage}
            {/* {togglerRandomizeOrSort} */}
            {togglerCheat}
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
                  <div className="text-all-fallacy-information">
                    Voici la liste des sophismes pris en compte sur ce site.
                    Cliquez en dehors de cette liste pour la quitter.
                    <br />
                    Ils peuvent être catégorisés en 4 types : <br />
                    <p style={{ color: "red" }}>Sophismes déductifs</p>
                    Raisonnements abstraits, supposés n'utiliser que la forme
                    logique, et ne tenant pas compte de l'expérience du monde.
                    Leurs conclusions sont fausses de manière a priori.
                    <br />
                    <p style={{ color: "blue" }}>Sophismes non pertinents</p>
                    Raisonnements qui introduisent des facteurs non pertinents,
                    empêchant l'écoulement logique d'un argument.
                    <br />
                    <p style={{ color: "green" }}>Sophismes de réfutation</p>
                    Raisonnements utilisés pour réfuter des affirmations.
                    <br />
                    <p style={{ color: "yellow" }}>Sophismes inductifs</p>
                    Raisonnements qui impliquent l'expérience du monde, à partir
                    desquelles des conclusions sont tirées. <br />
                  </div>
                  <ul className="set-all-fallacy-information">
                    {listOfTheFallacies}
                  </ul>
                </Fragment>
              }
            />
          </div>
        </h2>
        <div className="main-fallacy">
          <p className="fallacy-instruction">
            Cliquez sur le nom de sophisme qui correspond à la définition
            ci-dessous, laquelle est tirée au hasard.
          </p>
          <div className="set-definition-and-counts">
            <div className="fallacy-set-randomDefinitionAndExample">
              {this.showRandomDefinition(this.state.currentNumber)}
              {this.showRandomExample(this.state.currentNumber)}
            </div>
            <p className="set-counts">
              Nombre de sophismes trouvés : {this.state.rightNumbers.length}/
              {this.state.content.length}
              {/* <p>Erreurs faites : {this.state.mistakes}</p> */}
            </p>
          </div>
          <ul className="set-fallacy-button">{this.showFallaciesNames()}</ul>
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
    this.setState({ content: Fallacies });
    this.resetState();
  }
}

export default ShowFallacies;
