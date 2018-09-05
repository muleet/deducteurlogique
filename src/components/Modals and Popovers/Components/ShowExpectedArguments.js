import React, { Component } from "react";

class ShowExpectedArguments extends Component {
  render() {
    let arrayExpectedArguments = [];
    const ruleName = this.props.ruleName;
    const expectedArguments = this.props.expectedArguments;

    if (ruleName !== "⊃i" && ruleName !== "~i") {
      for (let i = 0; i < expectedArguments.length; i++) {
        arrayExpectedArguments.push(
          <li key={i} className="rule-modal-single-argument">
            <p>{expectedArguments[i] + " :"}</p>
            {this.props.valueInference.storedInferenceRendered[i]}
          </li>
        );
      }
    } else if (ruleName === "⊃i") {
      let hypContent = (
        <p className="awaiting-an-inference-blinking">
          {"<pas encore d'hypothèse>"}
        </p>
      );
      let lastInference = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence qui suit l'hypothèse>"}
        </p>
      );
      console.log(
        "RuleModal, y'a-t-il une hypothèse",
        this.props.valueInference.allHypotheticalInferences
      );
      if (this.props.valueInference.allHypotheticalInferences.length >= 1) {
        hypContent = (
          <p className="inferenceItself">
            {this.props.valueInference.allHypotheticalInferences[0].itself}
          </p>
        );
      }
      if (this.props.valueInference.storedInference[0]) {
        lastInference = (
          <p className="inferenceItself">
            {this.props.valueInference.storedInference[0]}
          </p>
        );
      }

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          <div className="rule-modal-single-argument">
            {expectedArguments[0] + " : "}
            {hypContent}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[1] + " : "}
            {lastInference}
          </div>
        </li>
      );
    } else if (ruleName === "~i") {
      // RIEN POUR LE MOMENT
    }
    return arrayExpectedArguments;
  }
}

export default ShowExpectedArguments;
