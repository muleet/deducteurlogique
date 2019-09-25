import React, { Component, Fragment } from "react";
import ButtonRuleRep from "../../Calcul Tools/ButtonRuleRep";
import InferenceForecaster from "../../Context/Components/InferenceForecaster";

// fonction appelée par Deducer, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json) ainsi que valueInference
class ShowInfoSandbox extends Component {
  state = {
    setOfPremisses: [],
    futureContent: [],
    isTheKeyboardWindowShownAndWhy: false, // peut être "false" ou "premisse" ou "conclusion"
    conclusion: ""
  };

  // Section 1 : méthodes de modification des caractères
  addCharacterToFuturePremOrConc = newChar => {
    let copyFuturePremisse = this.state.futureContent;
    copyFuturePremisse += newChar;
    this.setState({ futureContent: copyFuturePremisse });
  };

  removeLastCharacter = () => {
    let copyFuturePremisse = [...this.state.futureContent];
    copyFuturePremisse = copyFuturePremisse.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
    copyFuturePremisse = copyFuturePremisse.join("");
    this.setState(state => ({
      futureContent: copyFuturePremisse
    }));
  };

  // section 2 : méthodes d'interface
  toggleWindow = type => {
    console.log("type", type);
    let newType = false;
    if (!this.state.isTheKeyboardWindowShownAndWhy) {
      newType = type; // soit false, soit "premisse", soit "conclusion"
    }
    console.log("newType", newType);
    this.setState({
      isTheKeyboardWindowShownAndWhy: newType
    });
  };

  showKeyboard = () => {
    let everyPossibleCharacter = [
      ["~", "∧", "∨", "⊻", "⊃", "⊅", "≡", "↑", "↓"],
      ["p", "q", "r", "s"],
      ["(", ")"]
    ];
    let buttonConfirmContent = (
        <p
          className="rule-modal-button"
          onClick={() => {
            this.updateState(
              this.state.futureContent, // le contenu de la prémisse ou de la conclusion
              this.state.isTheKeyboardWindowShownAndWhy // "premisse" ou "conclusion" (ou false mais jamais au sein de cette méthode)
            );
          }}
        >
          <i className="fas fa-check-square icon" />
        </p>
      ),
      buttonRemoveLastCharacter = (
        <p className="rule-modal-button" onClick={this.removeLastCharacter}>
          <i className="fas fa-long-arrow-alt-left icon" />
        </p>
      ),
      keyboard = [],
      classNameToHidden = "hidden",
      textInstruction = "";
    for (let i = 0; i < everyPossibleCharacter.length; i++) {
      let subKeyboard = [];
      for (let j = 0; j < everyPossibleCharacter[i].length; j++) {
        subKeyboard.push(
          <li
            key={subKeyboard.length}
            className="selectable"
            onClick={() => {
              this.addCharacterToFuturePremOrConc(everyPossibleCharacter[i][j]);
            }}
          >
            {everyPossibleCharacter[i][j]}
          </li>
        );
      }
      keyboard.push(<ul key={keyboard.length}>{subKeyboard}</ul>);
    }

    if (this.state.isTheKeyboardWindowShownAndWhy) {
      classNameToHidden = "";
      if (this.state.isTheKeyboardWindowShownAndWhy === "conclusion") {
        textInstruction = "Entrez une conclusion.";
      } else if (this.state.isTheKeyboardWindowShownAndWhy === "premisse") {
        textInstruction = "Entrez une prémisse.";
      }
    }

    return (
      <div className={"question-mark-window-sandbox " + classNameToHidden}>
        {keyboard}
        <div className="future-premisseOrConclusion">
          {this.state.futureContent}
          <p className="blinking">_</p>
        </div>
        <div className="rule-modal-all-button-premisse">
          {buttonRemoveLastCharacter}
          {buttonConfirmContent}
        </div>
        <p className="rule-modal-keyboard-premConc-instructionText">
          {textInstruction}
        </p>
      </div>
    );
  };

  // section 3 : méthodes utilisées par les prémisses elles-mêmes
  useOfAddInference = (infItself, infNumCom) => {
    // cette méthode crée une inférence à partir de données envoyées par Deducer (au moment d'un clic sur la prémisse). D'abord on crée un objet contenant toutes les bonnes données.
    const inference = {
      itself: infItself,
      numberCommentary: infNumCom,
      commentary: "rep"
    };
    // Puis on envoie utilise cet objet comme argument de la fonction contextuelle addInference, qui provient d'InferenceProvider
    this.props.valueInference.setAdvice(
      "Répétition de la prémisse " + inference.itself,
      "rule-advice"
    );
    this.props.valueInference.addInference(inference);
  };

  useOfForecastInference = (infItself, infNumCom) => {
    //  anticipation de la prochaine inférence
    InferenceForecaster(
      [infItself], // le contenu de l'inférence répétée
      infNumCom, // le numéro de l'inférence répétée (une lettre dans ce cas-là)
      "rep", // le nom de la règle, toujours "rep" dans ce cas
      this.props.valueInference
    );
  };

  updateState(newContent, type) {
    let newSetofPremisses = [...this.state.setOfPremisses],
      newConclusion = this.state.conclusion,
      newStoredObjectExercise = this.props.valueInference.storedObjectExercise;
    console.log("newContent", newContent, "type", type);
    if (type === "premisse") {
      if (
        newSetofPremisses.indexOf(newContent) === -1 &&
        newContent.length > 0
      ) {
        newSetofPremisses.push(newContent);
        newStoredObjectExercise.premisses.push(newContent);
        this.props.valueInference.storeUserExerciseBeforeUpload(
          newStoredObjectExercise
        );
      }
    } else if (type === "conclusion") {
      newConclusion = newContent;
      newStoredObjectExercise.conclusion = newContent;
      this.props.valueInference.storeUserExerciseBeforeUpload(
        newStoredObjectExercise
      );
    }
    this.setState({
      setOfPremisses: newSetofPremisses,
      conclusion: newConclusion,
      futureContent: []
    });
  }

  resetPartOfState(partToReset) {
    if (partToReset === "premisse") {
      this.setState({
        setOfPremisses: []
      });
    } else if (partToReset === "conclusion") {
      this.setState({
        conclusion: ""
      });
    }
  }

  showPremisses(setOfPremissesThemselves) {
    let numberOfPremisses = 9,
      setOfPremissesRendered = []; // cette variable permet de connaître la lettre de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.
    for (let i = 0; i < setOfPremissesThemselves.length; i++) {
      numberOfPremisses++;
      const newLetter = numberOfPremisses.toString(36).toLowerCase();
      setOfPremissesRendered.push(
        <ButtonRuleRep
          key={i}
          className={"premisse selectable"}
          NumberButton={newLetter}
          NameButton={setOfPremissesThemselves[i]}
          useOfAddInferenceSent={() =>
            this.useOfAddInference(setOfPremissesThemselves[i], newLetter)
          }
          useOfForecastInferenceSent={() =>
            this.useOfForecastInference(setOfPremissesThemselves[i], newLetter)
          }
          resetForecastInferenceSent={() =>
            this.useOfForecastInference("reset")
          }
        />
      );
    }
    return setOfPremissesRendered;
    // this.setState({ setOfPremisses: newSetOfPremisses });
  }

  showPossiblePremisses(premissesSent) {
    let setOfPossiblePremisses = [];
    for (let i = 0; i < premissesSent.length; i++) {
      let className = "";
      if (premissesSent[i] !== this.state.setOfPremisses) {
        if (this.state.setOfPremisses.indexOf(premissesSent[i]) !== -1) {
          className = "possible-premisse-sandbox-added";
        }
        setOfPossiblePremisses.push(
          <a
            key={i}
            className={"possible-premisse-sandbox " + className}
            onClick={() => {
              this.updateState(premissesSent[i], "premisse");
            }}
          >
            {premissesSent[i]}
          </a>
        );
      }
    }
    return (
      <div id="slidingMenuPossiblePremisses">
        <i className="active fas fa-plus-circle icon" />
        {setOfPossiblePremisses}
      </div>
    );
  }

  // le render retourne à Sandbox l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
  render() {
    let buttonKeyboardPremisses = (
        <Fragment>
          <i
            className="far fa-keyboard icon question-mark-button"
            id="buttonKeyboardPremisses"
            onClick={() => this.toggleWindow("premisse")}
          >
            <div className="question-mark">
              <div className="question-mark-content">
                Cliquez ici pour afficher/cacher le clavier permettant de créer
                une prémisse.
              </div>
            </div>
          </i>
        </Fragment>
      ),
      buttonKeyboardConclusion = (
        <Fragment>
          <i
            className="far fa-keyboard icon question-mark-button"
            id="buttonKeyboardConclusion"
            onClick={() => this.toggleWindow("conclusion")}
          >
            <div className="question-mark">
              <div className="question-mark-content">
                Cliquez ici pour afficher/cacher le clavier permettant de créer
                une conclusion.
              </div>
            </div>
          </i>
        </Fragment>
      );
    return (
      <Fragment>
        <p className={"exercise-title "} />
        <ul className="setPremissesConclusion">
          <li style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {this.showKeyboard()}
              Prémisses {this.showPossiblePremisses(this.props.premissesSent)}
              {buttonKeyboardPremisses}
              {
                <i
                  className="fas fa-eraser icon"
                  onClick={() => {
                    this.resetPartOfState("premisse");
                    this.props.valueInference.resetDeduction();
                  }}
                />
              }
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.showPremisses(this.state.setOfPremisses)}
            </div>
          </li>
          <li style={{ display: "flex", flexDirection: "row" }}>
            Conclusion
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.conclusion}
            </div>
            {buttonKeyboardConclusion}
            {
              <i
                className="fas fa-eraser icon"
                onClick={() => this.resetPartOfState("conclusion")}
              />
            }
          </li>
        </ul>
      </Fragment>
    );
  }
}
export default ShowInfoSandbox;
