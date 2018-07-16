import React, { Component, Fragment } from "react";
import Exercices from "../../data/Exercices.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import DetermineTruthOfPropositions from "./DetermineTruthOfPropositions";
// import Deduction from "./Deduction";
import Deductionasuppr from "./Deductionasuppr";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à un
class Deducer extends Component {
  state = {
    // inferenceNumber: 1, // à transférer dans la fonction déduction
    // content: "inférence",
    // currentExercise: {}
    NewInference: []
  };

  whichExercise = () => {
    this.setState({ currentExercise: { ...Exercices[0] } });
    console.log(this.state.currentExercise);
    return this.state.currentExercise;
  };

  render() {
    return (
      <Fragment>
        <div className="deducer">
          <section
            id="infos-and-deduction-itself"
            style={{ border: "10px solid yellow" }}
          >
            {/*dans la ligne en dessous je mets de manière temporaire l'exercice 0, pour tester*/}
            <ShowInformationsExercise
              premisses={Exercices[0].premisses}
              conclusion={Exercices[0].conclusion}
            />
            <Deductionasuppr exerciseSent={Exercices[0]} />
          </section>
          <section className="informationsOnCurrentExercice">
            {console.log(Exercices[0].propositionsImplied)}
            <DetermineTruthOfPropositions
              exerciseSent={Exercices[0].propositionsImplied}
            />;
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Deducer;
