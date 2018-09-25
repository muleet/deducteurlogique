import React, { Component } from "react";

class ShowExpectedArguments extends Component {
  render() {
    let arrayExpectedArguments = [];
    let arrayEmptyArgument = [];
    const ruleName = this.props.ruleName;
    const expectedArguments = this.props.expectedArguments;
    const storedInference = this.props.valueInference.storedInference;
    const allHypotheticalInferences = this.props.valueInference
      .allHypotheticalInferences;

    // déclaration des arguments attendus
    let hypContent = (
      <p className="awaiting-an-inference-blinking">
        {"<Créez d'abord une hypothèse>"}
      </p>
    );
    let firstArgument = (
      <p className="awaiting-an-inference-blinking">
        {"<Cliquez sur une inférence qui suit l'hypothèse>"}
      </p>
    );
    let secondArgument = (
      <p className="awaiting-an-inference-blinking">
        {"<Cliquez sur une inférence qui suit l'hypothèse, niant B>"}
      </p>
    );

    if (ruleName !== "⊃i" && ruleName !== "~i") {
      // Toutes les règles, sauf les cas spécifiques comme en dessous
      for (let i = 0; i < expectedArguments.length; i++) {
        arrayEmptyArgument.push(
          <p className="awaiting-an-inference-blinking">
            {"<Cliquez sur une inférence adéquate>"}
          </p>
        );
        if (storedInference[i]) {
          arrayEmptyArgument[i] = (
            <p className="infItself-modal">{storedInference[i]} </p>
          );
        }
        arrayExpectedArguments.push(
          <li key={i} className="rule-modal-single-argument">
            <p>{expectedArguments[i] + " :"}</p>
            {arrayEmptyArgument[i]}
            {/* {storedInference[i]} */}
          </li>
        );
      }
    } else if (ruleName === "⊃i") {
      // introduction du conditionnel
      if (allHypotheticalInferences.length >= 1) {
        hypContent = (
          <p className="infItself-modal">
            {allHypotheticalInferences[0].itself}
          </p>
        );
      }
      if (storedInference[0]) {
        firstArgument = <p className="infItself-modal">{storedInference[0]}</p>;
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
      // introduction de la négation
      if (allHypotheticalInferences.length >= 1) {
        hypContent = (
          <p className="infItself-modal">
            {allHypotheticalInferences[0].itself}
          </p>
        );
      }
      if (storedInference[0]) {
        firstArgument = <p className="infItself-modal">{storedInference[0]}</p>;
      }
      if (storedInference[1]) {
        secondArgument = (
          <p className="infItself-modal">{storedInference[1]}</p>
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
