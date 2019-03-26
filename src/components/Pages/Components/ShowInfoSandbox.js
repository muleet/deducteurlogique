import React, { Component, Fragment } from "react";
import ButtonRuleRep from "../../Calcul Tools/ButtonRuleRep";

// fonction appelée par Deducer, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json) ainsi que valueInference
class ShowInfoSandbox extends Component {
  state = {
    setOfPremisses: [],
    futurePremisse: [],
    // keyboard: "",
    isTheWindowShown: false
  };

  addToFuturePremisse = newChar => {
    let copyFuturePremisse = this.state.futurePremisse;
    copyFuturePremisse += newChar;
    this.setState({ futurePremisse: copyFuturePremisse });
  };

  removeLastCharacter = () => {
    let copyFuturePremisse = [...this.state.futurePremisse];
    copyFuturePremisse = copyFuturePremisse.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
    copyFuturePremisse = copyFuturePremisse.join("");
    this.setState(state => ({
      futurePremisse: copyFuturePremisse
    }));
  };

  toggleWindow = () => {
    let newBool = false;
    if (!this.state.isTheWindowShown) {
      newBool = true;
    }
    this.setState({
      isTheWindowShown: newBool
    });
    // console.log("window", newBool);
  };

  showKeyboard = () => {
    let everyPossibleCharacter = [
      ["~", "∧", "∨", "⊻", "⊃", "⊅", "≡", "↑", "↓"],
      ["p", "q", "r", "s"],
      ["(", ")"]
    ];
    let buttonConfirmPremisse = (
      <p
        className="rule-modal-button"
        onClick={() => this.updateState(this.state.futurePremisse)}
      >
        <i className="fas fa-check-square icon" />
      </p>
    );
    let buttonRemoveLastCharacter = (
      <p className="rule-modal-button" onClick={this.removeLastCharacter}>
        <i className="fas fa-long-arrow-alt-left icon" />
      </p>
    );
    let keyboard = [];
    for (let i = 0; i < everyPossibleCharacter.length; i++) {
      let subKeyboard = [];
      for (let j = 0; j < everyPossibleCharacter[i].length; j++) {
        subKeyboard.push(
          <li
            key={subKeyboard.length}
            className="selectable"
            onClick={() => {
              this.addToFuturePremisse(everyPossibleCharacter[i][j]);
            }}
          >
            {everyPossibleCharacter[i][j]}
          </li>
        );
      }
      keyboard.push(<ul key={keyboard.length}>{subKeyboard}</ul>);
    }
    if (this.state.isTheWindowShown) {
      return (
        <div className="question-mark-window-sandbox">
          {keyboard}
          <div className="future-premisse">
            {this.state.futurePremisse}
            <p className="blinking">_</p>
          </div>
          <div className="rule-modal-all-button-premisse">
            {buttonRemoveLastCharacter}
            {buttonConfirmPremisse}
          </div>
        </div>
      );
    }
  };

  useOfMakeInference = (infItself, infNumCom, infComm) => {
    // cette méthode crée une inférence à partir de données envoyées par Deducer (au moment d'un clic sur la prémisse). D'abord on crée un objet contenant toutes les bonnes données.
    const inference = {
      itself: infItself,
      numberCommentary: infNumCom,
      commentary: infComm
    };
    // Puis on envoie utilise cet objet comme argument de la fonction contextuelle addInference, qui provient d'InferenceProvider
    this.props.valueInference.setAdvice(
      "Répétition de la prémisse " + inference.itself,
      "rule-advice"
    );
    this.props.valueInference.addInference(inference);
  };

  updateState(newPremisse) {
    let newSetofPremisses = [...this.state.setOfPremisses];
    if (
      newSetofPremisses.indexOf(newPremisse) === -1 &&
      newPremisse.length > 0
    ) {
      newSetofPremisses.push(newPremisse);
    }
    this.setState({
      setOfPremisses: newSetofPremisses,
      futurePremisse: ""
    });
  }

  resetState() {
    this.setState({
      setOfPremisses: []
    });
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
          useOfMakeInferenceSent={() =>
            this.useOfMakeInference(
              setOfPremissesThemselves[i],
              newLetter,
              "rep"
            )
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
              this.updateState(premissesSent[i]);
            }}
          >
            {premissesSent[i]}
          </a>
        );
      }
    }
    return (
      <div id="buttonAddPremisses">
        <i className="active fas fa-plus-circle icon" />
        {setOfPossiblePremisses}
      </div>
    );
  }

  // le render retourne à déducer l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
  render() {
    let keyBoardToAddPremisses = (
      <Fragment>
        <i
          className="far fa-keyboard icon question-mark-button"
          id="buttonKeyboardPremisses"
          onClick={() => this.toggleWindow()}
        >
          <div className="question-mark">
            <div className="question-mark-content">
              Cliquez ici pour ouvrir le clavier permettant de créer une
              prémisse.
            </div>
          </div>
        </i>
        {this.showKeyboard()}
      </Fragment>
    );
    return (
      <Fragment>
        <p className={"exercise-title "} />
        <ul className="setPremissesConclusion">
          <li>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Prémisses {this.showPossiblePremisses(this.props.premissesSent)}
              {keyBoardToAddPremisses}
              {
                <i
                  className="fas fa-eraser icon"
                  onClick={() => this.resetState()}
                />
              }
            </div>
            {this.showPremisses(this.state.setOfPremisses)}
          </li>
          <li>
            Conclusion
            {
              <i
                className="far fa-keyboard icon deactivated"
                id="buttonKeyboardConclusion"
              />
            }
            {<i className="fas fa-eraser icon deactivated" />}
          </li>
        </ul>
        {this.state.keyboard}
      </Fragment>
    );
  }
}
export default ShowInfoSandbox;
