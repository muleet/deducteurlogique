import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";
import Exercices from "../../data/Exercices.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import TruthOfPropositions from "./TruthOfPropositions";
// Cette classe est appelée dans Deduction
class Deduction extends Component {
  state = {
    inferenceNumber: 1,
    content: "inférence",
    isDisplayed: false,
    currentExercice: {}
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

  whichExercice = () => {
    this.setState({ currentExercice: { ...Exercices[0] } });
    console.log(this.state.currentExercice);
    return this.state.currentExercice;
  };

  render() {
    <TruthOfPropositions exerciceSent={this.state.currentExercice} />;

    return (
      <Fragment>
        <div className="deduction">
          <div className="informationsOnCurrentExercice">
            <ShowInformationsExercise
              premisses={Exercices[0].premisses}
              conclusion={Exercices[0].conclusion}
            />
          </div>
          <button class="deduction-button" onClick={this.displaySomething}>
            {this.state.content}
          </button>
          {this.renderMakeInference()}

          {/* <Link
          to={{
            pathname: "/checkout",
            state: {
              cart: this.props.cart
            }
          }}
        >
          <button>Valider mon panier</button>
        </Link> */}
        </div>
      </Fragment>
    );
  }
}

export default Deduction;
