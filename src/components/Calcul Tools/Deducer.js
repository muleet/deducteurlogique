import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";
import Exercices from "../../data/Exercices.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import DetermineTruthOfPropositions from "./DetermineTruthOfPropositions";
import Deduction from "./Deduction";
// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à un
class Deducer extends Component {
  state = {
    inferenceNumber: 1,
    content: "inférence",
    isDisplayed: false,
    currentExercise: {}
  };

  renderMakeInference() {
    if (this.state.isDisplayed) {
      return (
        <MakeInference
          infNum={this.state.inferenceNumber}
          content={this.state.content}
        />
      );
    }
    return null;
  }

  displaySomething = () => {
    // On rend cette fonction accessible depuis n'importe où dans la classe, grâce à "= () =>". Sans ces caractères, la fonction serait comme en autarcie.
    this.setState({ isDisplayed: true });
  };

  whichExercise = () => {
    this.setState({ currentExercise: { ...Exercices[0] } });
    console.log(this.state.currentExercise);
    return this.state.currentExercise;
  };

  render() {
    return (
      <Fragment>
        <div className="exercise">
          <section
            id="infos-and-deduction-itself"
            style={{ border: "10px solid yellow" }}
          >
            {/*dans la ligne en dessous je mets de manière temporaire l'exercice 0, pour tester*/}
            <ShowInformationsExercise
              premisses={Exercices[0].premisses}
              conclusion={Exercices[0].conclusion}
            />
            <Deduction />
          </section>
          <section className="informationsOnCurrentExercice">
            <button
              className="deduction-button"
              onClick={this.displaySomething}
            >
              {this.state.content}
            </button>
            {this.renderMakeInference()}
            {console.log(Exercices[0].propositionsImplied)}
            <DetermineTruthOfPropositions
              exerciseSent={Exercices[0].propositionsImplied}
            />;
          </section>
        </div>
        <img
          style={{ width: "300px", height: "400px" }}
          src="https://i.imgur.com/Tou6J07.png"
          alt=""
        />
      </Fragment>
    );
  }
}

export default Deducer;
