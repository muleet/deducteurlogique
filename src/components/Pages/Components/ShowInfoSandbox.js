import React, { Component, Fragment } from "react";
import ButtonRuleRep from "../../Calcul Tools/ButtonRuleRep";

// fonction appelée par Deducer, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json) ainsi que valueInference
class ShowInfoSandbox extends Component {
  state = {
    setOfPremisses: []
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
    newSetofPremisses.push(newPremisse);
    this.setState({
      setOfPremisses: newSetofPremisses
    });
  }

  showPremisses(premisses) {
    let numberOfPremisses = 10 + this.state.setOfPremisses.length; // cette variable permet de connaître la lettre de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.
    let setOfPossiblePremisses = [];
    for (let i = 0; i < premisses.length; i++) {
      const newLetter = numberOfPremisses.toString(36).toLowerCase();
      if (premisses[i] !== this.state.setOfPremisses) {
        setOfPossiblePremisses.push(
          <a
            key={i}
            className="possible-premisse-sandbox"
            onClick={() => {
              this.updateState(
                <ButtonRuleRep
                  key={i}
                  className={"premisse selectable"}
                  NumberButton={newLetter}
                  NameButton={premisses[i]}
                  useOfMakeInferenceSent={() =>
                    this.useOfMakeInference(premisses[i], newLetter, "rep")
                  }
                />
              );
            }}
          >
            {premisses[i]}
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
    for (let i = 0; i < this.props.premissesSent.length; i++) {}
    return (
      <Fragment>
        <p className={"exercise-title "} />
        <ul className="setPremissesConclusion">
          <li>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Prémisses {this.showPremisses(this.props.premissesSent)}
              {
                <i
                  className="far fa-keyboard icon"
                  id="buttonKeyboardPremisses"
                />
              }
              {<i className="fas fa-eraser icon" />}
            </div>
            {this.state.setOfPremisses}
          </li>
          <li>
            Conclusion
            {
              <i
                className="far fa-keyboard icon"
                id="buttonKeyboardConclusion"
              />
            }
            {<i className="fas fa-eraser icon" />}
          </li>
        </ul>
      </Fragment>
    );
  }
}
export default ShowInfoSandbox;
