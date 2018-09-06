import React, { Component } from "react";

class ShowExpectedArguments extends Component {
  render() {
    let arrayExpectedArguments = [];
    const ruleName = this.props.ruleName;
    const expectedArguments = this.props.expectedArguments;
    let hypContent = (
      <p className="awaiting-an-inference-blinking">
        {"<pas encore d'hypothèse>"}
      </p>
    );
    let firstArgument = (
      <p className="awaiting-an-inference-blinking">
        {"<Cliquez sur une inférence qui suit l'hypothèse>"}
      </p>
    );
    let secondArgument = (
      <p className="awaiting-an-inference-blinking">
        {
          "<Cliquez sur une inférence qui suit l'hypothèse, niant la précédente>"
        }
      </p>
    );

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
      if (this.props.valueInference.allHypotheticalInferences.length >= 1) {
        hypContent = (
          <p className="inferenceItself">
            {this.props.valueInference.allHypotheticalInferences[0].itself}
          </p>
        );
      }
      if (this.props.valueInference.storedInference[0]) {
        firstArgument = (
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
            {firstArgument}
          </div>
        </li>
      );
    } else if (ruleName === "~i") {
      if (this.props.valueInference.allHypotheticalInferences.length >= 1) {
        hypContent = (
          <p className="inferenceItself">
            {this.props.valueInference.allHypotheticalInferences[0].itself}
          </p>
        );
      }
      if (this.props.valueInference.storedInference[0]) {
        firstArgument = (
          <p className="inferenceItself">
            {this.props.valueInference.storedInference[0]}
          </p>
        );
      }
      if (this.props.valueInference.storedInference[1]) {
        secondArgument = (
          <p className="inferenceItself">
            {this.props.valueInference.storedInference[1]}
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
            {firstArgument}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[2] + " : "}
            {secondArgument}
          </div>
        </li>
      );
      // RIEN POUR LE MOMENT
    }
    return arrayExpectedArguments;
  }
}

export default ShowExpectedArguments;
