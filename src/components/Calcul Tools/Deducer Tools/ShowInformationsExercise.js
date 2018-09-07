import React, { Component, Fragment } from "react";
import ButtonRuleRep from "../ButtonRuleRep";

// fonction appelée par Deduction.js, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json)
class ShowInformationsExercise extends Component {
  // on crée un ensemble html qui va organiser l'affichage des prémisses, qu'il y en ait 1, 2, 150, 0

  useOfMakeInference = (infItself, infNumCom, infComm) => {
    // cette méthode va créer une inférence à partir de données envoyées par Deducer (au moment d'un clic sur la prémisse). D'abord on crée un objet contenant toutes les bonnes données.
    const inference = {
      itself: infItself,
      numberCommentary: infNumCom,
      commentary: infComm
    };
    // Puis on envoie utilise cet objet comme argument de la fonction contextuelle addInference, qui provient d'InferenceProvider
    this.props.valueInference.addInference(inference);
  };

  // le render retourne à déducer l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
  render() {
    let setOfPremisses = [];
    let numberOfPremisses = 10; // cette variable permet de connaître le numéro de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.
    let textCanItBeDone;
    if (this.props.exerciseSent.doable === false) {
      textCanItBeDone =
        "(Cet exercice ne peut pas être terminé pour le moment, puisqu'au moins une de ses règles n'a pas été codée.)";
    }
    if (this.props.exerciseSent.premisses.length === 0) {
      setOfPremisses = (
        <div style={{ fontStyle: "normal", padding: "4px" }}>(théorème)</div>
      );
    } else {
      for (let i = 0; i < this.props.exerciseSent.premisses.length; i++) {
        numberOfPremisses = numberOfPremisses + i;
        const newLetter = numberOfPremisses.toString(36).toLowerCase();
        setOfPremisses.push(
          <ButtonRuleRep
            key={i}
            className={"premisse selectable"}
            NumberButton={newLetter}
            NameButton={this.props.exerciseSent.premisses[i]}
            useOfMakeInferenceSent={() =>
              this.useOfMakeInference(
                this.props.exerciseSent.premisses[i],
                newLetter,
                "rep"
              )
            }
          />
        );
      }
    }
    return (
      <Fragment>
        <p className={"exercise-title "}>
          {this.props.exerciseSent.verbalName}
        </p>
        {<p style={{ fontSize: "12px" }}>{textCanItBeDone}</p>}
        <ul className="setPremissesConclusion">
          <li>
            Prémisses
            {setOfPremisses}
          </li>
          <li>
            Conclusion
            <div id="conclusion">{this.props.exerciseSent.conclusion}</div>
          </li>
          <li id="minimal-line-number">
            Nombre minimal
            <br />
            de ligne : {this.props.minimalLineNumber}
          </li>
        </ul>
      </Fragment>
    );
  }
}
export default ShowInformationsExercise;
