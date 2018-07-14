import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";
import Exercices from "../../data/Exercices.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import DetermineTruthOfPropositions from "./DetermineTruthOfPropositions";
// Cette classe est appelée dans Calcul des propositions
class Deduction extends Component {
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
    // boucle for sans doute à supprimer, en dessous (je l'ai faite juste pour faciliter un premier affichage d'exercice)
    let exemplededuction = ["1. p∧q", "2. q", "3. q⊃~r", "4. ~r"];
    let exemplecommentaire = ["reit", "1, ∧e", "reit", "2, 3, ⊃e"];
    let stringdeduction = "";
    let stringcommentaire = "";
    for (let i = 0; i < 4; i++) {
      stringdeduction =
        stringdeduction +
        (
          <Fragment>
            {exemplededuction[i].toString()}
            <br />
          </Fragment>
        );
      stringcommentaire =
        stringcommentaire +
        (
          <Fragment>
            {exemplecommentaire[i].toString()}
            <br />
          </Fragment>
        );
    }
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
            <div className="deduction">
              <div id="listInferences">{stringdeduction}</div>
              <div id="listCommentaires">{stringcommentaire}</div>
            </div>
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
          style={{ width: "200px", height: "270px" }}
          src="https://i.imgur.com/3TW6KTY.png"
          alt=""
        />
      </Fragment>
    );
  }
}

export default Deduction;
