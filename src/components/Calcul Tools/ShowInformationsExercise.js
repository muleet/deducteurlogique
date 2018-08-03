import React, { Component } from "react";
import ButtonRep from "./ButtonRep";
import MakeInference from "./MakeInference";
import { InferenceContext, InferenceProvider } from "../InferenceProvider";

// fonction appelée par Deduction.js, qui envoie des props sur un exercice de logique (qui ont pour origine le fichier Exercices.json)
class ShowInformationsExercise extends Component {
  // on crée un ensemble html qui va organiser l'affichage des prémisses, qu'il y en ait 1, 2, 150, 0
  useOfMakeInference = (infNum, infItself, infComm) => {
    console.log(infNum, infItself, infComm);

    // <ListContext.Provider value={this.state.items}>
    //   {this.setState({
    //     items: [...this.state.items, [infNum, infItself, infComm]]
    //   })}}
    // </ListContext.Provider>;
    return (
      <MakeInference
        inferenceNumber={infNum}
        inferenceItself={infItself}
        inferenceCommentary={(infNum, infComm)}
      />
    );
  };

  // on retourne l'ensemble des prémisses + la conclusion en organisant l'affichage du tout
  render() {
    let setOfPremisses = [];
    let numberOfPremisses = 10; // cette variable permet de connaître le numéro de la prémisse. Elle utilise une fonction, que je ne comprends pas, pour traduire un nombre en lettre.

    for (let i = 0; i < this.props.exerciseSent.premisses.length; i++) {
      numberOfPremisses = numberOfPremisses + i;
      const newLetter = numberOfPremisses.toString(36).toLowerCase();
      setOfPremisses.push(
        <ButtonRep
          key={i}
          className={"premisses"}
          NumberButton={newLetter}
          NameButton={this.props.exerciseSent.premisses[i]}
          useOfMakeInference={() =>
            this.useOfMakeInference(
              newLetter + " ",
              this.props.exerciseSent.premisses[i],
              "reit"
            )
          }
        />
      );
    }
    return (
      <ul className="setPremissesConclusion">
        <li>Prémisses : {setOfPremisses}</li>
        <li>
          Conclusion :
          <div id="conclusion">{this.props.exerciseSent.conclusion}</div>
        </li>
      </ul>
    );
  }
}
export default ShowInformationsExercise;
