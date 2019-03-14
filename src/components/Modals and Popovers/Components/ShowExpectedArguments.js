import React, { Component } from "react";
import ShowDisjonctionEliminationArguments from "./ShowDisjonctionEliminationArgumentsAndButtons";

class ShowExpectedArguments extends Component {
  showKeyboard = () => {
    let everyPossibleCharacter = [
      ["~", "∧", "∨", "⊻", "⊃", "⊅", "≡", "↑", "↓"],
      ["p", "q", "r", "s"],
      ["(", ")"]
    ];
    let keyboard = [];
    for (let i = 0; i < everyPossibleCharacter.length; i++) {
      let subKeyboard = [];
      for (let j = 0; j < everyPossibleCharacter[i].length; j++) {
        subKeyboard.push(
          <li
            key={subKeyboard.length}
            className="rule-modal-hypothesis-button-character selectable"
            onClick={() => {
              this.props.valueInference.addToFutureInference(
                everyPossibleCharacter[i][j]
              );
            }}
          >
            {everyPossibleCharacter[i][j]}
          </li>
        );
      }
      keyboard.push(<ul key={keyboard.length}>{subKeyboard}</ul>);
    }
    return <div className="rule-modal-all-button-hypothesis">{keyboard}</div>;
  };

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
        {"<Créez d'abord une hypothèse A, à l'aide de la règle \"hyp\">"}
      </p>
    );
    let firstArgument = (
      <p className="awaiting-an-inference-blinking">
        {"<Cliquez sur une inférence B au sein de l'hypothèse A>"}
      </p>
    );
    let secondArgument = (
      <p className="awaiting-an-inference-blinking">
        {"<Cliquez sur une inférence qui nie l'inférence B>"}
      </p>
    );

    if (
      ruleName !== "⊃i" &&
      ruleName !== "~i" &&
      ruleName !== "∨i" &&
      ruleName !== "∨e" &&
      ruleName !== "ex falso"
    ) {
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
          <div className="rule-modal-single-argument rule-modal-hypothetical-argument">
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
          <div className="rule-modal-single-argument rule-modal-hypothetical-argument">
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
    } else if (ruleName === "∨i") {
      let disjonctionArgument = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence adéquate>"}
        </p>
      );
      let arbitraryArgument = (
        <p className="awaiting-an-inference-blinking">
          {"<Utilisez le clavier virtuel>"}
        </p>
      );

      if (storedInference[0]) {
        disjonctionArgument = (
          <p className="infItself-modal">{storedInference[0]}</p>
        );
      }

      if (this.props.valueInference.futureInference.length > 0) {
        arbitraryArgument = this.props.valueInference.futureInference;
      }

      const keyboard = this.showKeyboard();

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          <div className="rule-modal-single-argument">
            {expectedArguments[0] + " : "}
            {disjonctionArgument}
          </div>
          <div className="rule-modal-single-argument">
            {"B : "}
            {arbitraryArgument}
          </div>
          {keyboard}
        </li>
      );
    } else if (ruleName === "∨e") {
      arrayExpectedArguments.push(
        <ShowDisjonctionEliminationArguments
          key={arrayExpectedArguments.length}
          whatToReturn="arguments"
          expectedArguments={expectedArguments}
          valueInference={this.props.valueInference}
          valueRule={this.props.valueRule}
          allHypotheticalInferences={allHypotheticalInferences}
        />
      );
    } else if (ruleName === "ex falso") {
      let exFalsoTrueArgument = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence A>"}
        </p>
      );
      let exFalsoFalseArgument = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence ~A>"}
        </p>
      );
      let arbitraryArgument = (
        <p className="awaiting-an-inference-blinking">
          {"<Utilisez le clavier virtuel>"}
        </p>
      );

      if (storedInference[0]) {
        exFalsoTrueArgument = (
          <p className="infItself-modal">{storedInference[0]}</p>
        );
      }
      if (storedInference[1]) {
        exFalsoFalseArgument = (
          <p className="infItself-modal">{storedInference[1]}</p>
        );
      }

      if (this.props.valueInference.futureInference.length > 0) {
        arbitraryArgument = this.props.valueInference.futureInference;
      }

      const keyboard = this.showKeyboard();

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          <div className="rule-modal-single-argument">
            {expectedArguments[0] + " : "}
            {exFalsoTrueArgument}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[1] + " : "}
            {exFalsoFalseArgument}
          </div>
          <div className="rule-modal-single-argument">
            {"B : "}
            {arbitraryArgument}
          </div>
          {keyboard}
        </li>
      );
    }

    return arrayExpectedArguments;
  }
}

export default ShowExpectedArguments;
