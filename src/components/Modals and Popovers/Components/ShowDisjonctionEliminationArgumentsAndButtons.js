import React, { Component } from "react";

class ShowDisjonctionEliminationArgumentsAndButtons extends Component {
  render() {
    let buttonDisjonctionEliminationHypothesis = "";
    let arrayExpectedArguments = [];
    let arrayExpectedButtons = [];
    const expectedArguments = this.props.expectedArguments;
    const storedInference = this.props.valueInference.storedInference;
    let ArrayAorB;
    let step = 0;
    // const allHypotheticalInferences = this.props.valueInference
    //   .allHypotheticalInferences;
    if (this.props.whatToReturn === "buttons") {
      let inferenceToAdd = {};
      if (storedInference[0]) {
        ArrayAorB = this.props.valueRule.returnWhatIsBeforeAndAfterTheOperator(
          storedInference[0],
          "∨"
        );
        inferenceToAdd = {
          // cet objet doit contenir le A de A∨B, puis le B et A∨B
          itself: ArrayAorB[0],
          numbers: "",
          commentary: "hyp ∨e"
        };
        buttonDisjonctionEliminationHypothesis = (
          <div
            onClick={() => {
              step++;
              this.props.valueRule.addInferenceFromRule(
                inferenceToAdd,
                "nouvelle hypothèse"
              );
            }}
            className="singleRule fatRule"
          >
            hyp A
          </div>
        );
      }
      if (step === 1) {
        buttonDisjonctionEliminationHypothesis = (
          <div
            onClick={() => {
              this.props.valueRule.addInferenceFromRule(
                inferenceToAdd,
                "nouvelle hypothèse"
              );
            }}
            className="singleRule fatRule"
          >
            /hyp A
          </div>
        );
      }
      arrayExpectedButtons.push(buttonDisjonctionEliminationHypothesis);
    } else if (this.props.whatToReturn === "arguments") {
      let argumentAorB = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence A∨B>"}
        </p>
      );
      let firstHyp = (
        <p className="awaiting-an-inference-blinking">
          {"<Créez d'abord une hypothèse A>"}
        </p>
      );
      let secondHyp = (
        <p className="awaiting-an-inference-blinking">
          {"<Créez d'abord une hypothèse B, après avoir fermé l'hypothèse A>"}
        </p>
      );
      let firstConclusion = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse A>"}
        </p>
      );
      let secondConclusion = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse B>"}
        </p>
      );
      if (storedInference[0]) {
        argumentAorB = <p className="infItself-modal">{storedInference[0]}</p>;
      }

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          <div className="rule-modal-single-argument">
            {expectedArguments[0] + " : "}
            {argumentAorB}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[1] + " : "}
            {firstHyp}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[2] + " : "}
            {firstConclusion}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[3] + " : "}
            {secondHyp}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[4] + " : "}
            {secondConclusion}
          </div>
        </li>
      );
    }

    let whatToReturn;
    if (this.props.whatToReturn === "arguments") {
      whatToReturn = arrayExpectedArguments;
    } else if (this.props.whatToReturn === "buttons") {
      whatToReturn = arrayExpectedButtons;
    }

    return whatToReturn;
  }
}

export default ShowDisjonctionEliminationArgumentsAndButtons;
