import React, { Component } from "react";
// import ShowDisjonctionEliminationArguments from "./ShowDisjonctionEliminationArgumentsAndButtons";

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

  renderInstructionOrArgumentOfCurrentRule(
    className,
    instructionOrArgument,
    otherInstructionOrArgument
  ) {
    let boolCursor = false;
    if (instructionOrArgument[0] === "argument arbitraire") {
      boolCursor = true;
      instructionOrArgument = "";
      otherInstructionOrArgument = instructionOrArgument[1];
    }
    return (
      <div className={className}>
        {instructionOrArgument}
        {this.renderKeyboardBlinkingCursor(boolCursor)}
        {otherInstructionOrArgument}
      </div>
    );
  }

  renderKeyboardBlinkingCursor(boolCursor) {
    // utilisé les règles qui impliquent de pouvoir rentrer arbitrairement un contenu inférentiel (ex falso et ∨i)
    if (boolCursor) {
      return (
        <ul className="typable-text">
          {this.props.valueInference.futureInference}
          <p className="blinking">_</p>
        </ul>
      );
    }
  }

  render() {
    let arrayExpectedArguments = [],
      arrayEmptyArgument = [],
      storedInference = this.props.valueInference.storedInference;
    const ruleName = this.props.ruleName,
      expectedArguments = this.props.expectedArguments,
      allHypotheticalInferences = this.props.valueInference
        .allHypotheticalInferences;

    // déclaration des arguments attendus
    let hypContent = this.renderInstructionOrArgumentOfCurrentRule(
      "awaiting-an-inference-blinking",
      "<Créez d'abord une hypothèse A, à l'aide de la règle \"hyp\">"
    );
    let firstArgument = this.renderInstructionOrArgumentOfCurrentRule(
      "awaiting-an-inference-blinking",
      "<Cliquez sur une inférence B au sein de l'hypothèse A>"
    );
    let secondArgument = this.renderInstructionOrArgumentOfCurrentRule(
      "awaiting-an-inference-blinking",
      "<Cliquez sur une inférence qui nie l'inférence B>"
    );
    // if (
    //   this.props.valueInference.forecastedStoredInference &&
    //   ruleName !== "hyp"
    // ) {
    // arrayExpectedArguments.push(
    //   this.renderInstructionOrArgumentOfCurrentRule(
    //     "forecastedInference",
    //     this.props.valueInference.forecastedStoredInference.itself
    //   )
    // );
    // } else {
    //   arrayExpectedArguments.push(
    //     this.renderInstructionOrArgumentOfCurrentRule(
    //       "awaiting-an-inference-blinking",
    //       "<Sélectionnez une inférence>"
    //     )
    //   );
    // }
    if (
      ruleName !== "⊃i" &&
      ruleName !== "~i" &&
      ruleName !== "∨i" &&
      // ruleName !== "∨e" &&
      ruleName !== "ex falso"
    ) {
      // Toutes les règles, sauf les cas spécifiques comme en dessous
      for (let i = 0; i < expectedArguments.length; i++) {
        arrayEmptyArgument.push(
          this.renderInstructionOrArgumentOfCurrentRule(
            "awaiting-an-inference-blinking",
            "<Cliquez sur une inférence adéquate>"
          )
        );
        if (storedInference[i]) {
          arrayEmptyArgument[i] = this.renderInstructionOrArgumentOfCurrentRule(
            "infItself-modal",
            storedInference[i]
          );
        } else {
          arrayEmptyArgument.push(
            this.renderInstructionOrArgumentOfCurrentRule(
              "awaiting-an-inference-blinking",
              "<Cliquez sur une inférence adéquate>"
            )
          );
        }
        arrayExpectedArguments.push(
          <li key={i} className="rule-modal-single-argument">
            {this.renderInstructionOrArgumentOfCurrentRule(
              "expected-argument",
              expectedArguments[i]
            )}
            {this.renderInstructionOrArgumentOfCurrentRule(
              "awaiting-instruction",
              arrayEmptyArgument[i]
            )}
          </li>
        );
      }
    } else if (ruleName === "⊃i") {
      // introduction du conditionnel
      if (allHypotheticalInferences.length >= 1) {
        hypContent = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          allHypotheticalInferences[0].itself
        );
      }
      if (storedInference[0]) {
        firstArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[0]
        );
      }
      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument rule-modal-hypothetical-argument",
            expectedArguments[0],
            hypContent
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[1],
            firstArgument
          )}
        </li>
      );
    } else if (ruleName === "~i") {
      if (allHypotheticalInferences.length >= 1) {
        hypContent = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          allHypotheticalInferences[0].itself
        );
      }
      if (storedInference[0]) {
        firstArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[0]
        );
      }
      if (storedInference[1]) {
        secondArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[1]
        );
      }

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument rule-modal-hypothetical-argument",
            expectedArguments[0],
            hypContent
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[1],
            firstArgument
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[2],
            secondArgument
          )}
        </li>
      );
    } else if (ruleName === "∨i") {
      let disjonctionArgument = this.renderInstructionOrArgumentOfCurrentRule(
        "awaiting-an-inference-blinking",
        "<Cliquez sur une inférence adéquate>"
      );
      let arbitraryArgument = this.renderInstructionOrArgumentOfCurrentRule(
        "awaiting-an-inference-blinking",
        "<Utilisez le clavier virtuel>"
      );

      if (storedInference[0]) {
        disjonctionArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[0]
        );
      }

      if (this.props.valueInference.futureInference.length > 0) {
        arbitraryArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          ["argument arbitraire", this.props.valueInference.futureInference]
        );
      }

      const keyboard = this.showKeyboard();

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[0],
            disjonctionArgument
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            "B",
            arbitraryArgument
          )}
          {keyboard}
        </li>
      );
      // } else if (ruleName === "∨e") {
      //   arrayExpectedArguments.push(
      //     <ShowDisjonctionEliminationArguments
      //       key={arrayExpectedArguments.length}
      //       whatToReturn="arguments"
      //       expectedArguments={expectedArguments}
      //       valueInference={this.props.valueInference}
      //       valueRule={this.props.valueRule}
      //       allHypotheticalInferences={allHypotheticalInferences}
      //     />
      //   );
    } else if (ruleName === "ex falso") {
      let exFalsoTrueArgument = this.renderInstructionOrArgumentOfCurrentRule(
        "awaiting-an-inference-blinking",
        "<Cliquez sur une inférence A>"
      );
      let exFalsoFalseArgument = this.renderInstructionOrArgumentOfCurrentRule(
        "awaiting-an-inference-blinking",
        "<Cliquez sur une inférence ~A>"
      );
      let arbitraryArgument = this.renderInstructionOrArgumentOfCurrentRule(
        "awaiting-an-inference-blinking",
        "<Utilisez le clavier virtuel>"
      );

      if (storedInference[0]) {
        exFalsoTrueArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[0]
        );
      }
      if (storedInference[1]) {
        exFalsoFalseArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          storedInference[1]
        );
      }

      if (this.props.valueInference.futureInference.length > 0) {
        arbitraryArgument = this.renderInstructionOrArgumentOfCurrentRule(
          "infItself-modal",
          ["argument arbitraire", this.props.valueInference.futureInference]
        );
      }

      const keyboard = this.showKeyboard();

      arrayExpectedArguments.push(
        <li
          key={arrayExpectedArguments.length}
          className="rule-modal-all-arguments"
        >
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[0],
            exFalsoTrueArgument
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            expectedArguments[1],
            exFalsoFalseArgument
          )}
          {this.renderInstructionOrArgumentOfCurrentRule(
            "rule-modal-single-argument",
            "B",
            arbitraryArgument
          )}
          {keyboard}
        </li>
      );
    }

    return arrayExpectedArguments;
  }
}

export default ShowExpectedArguments;
