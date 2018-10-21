import React, { Component } from "react";

class ShowDisjonctionEliminationArgumentsAndButtons extends Component {
  renderButtonMakeHyp(str, content) {
    const inferenceItself = {
      itself: content,
      numberCommentary: "",
      commentary: "hyp ∨e"
    };
    const hyp = "nouvelle hyp ∨e";
    return (
      <div
        className="rule-modal-specific-button selectable"
        onClick={() => {
          this.props.valueInference.addInference(inferenceItself, hyp);
          this.props.valueInference.updateStepRule(true);
        }}
      >
        hyp {str}
      </div>
    );
  }

  renderButtonBreakHyp(str) {
    const hyp = "fin hyp ∨e";
    return (
      <div
        className="rule-modal-specific-button selectable"
        onClick={() => {
          this.props.valueInference.manageLotsOfStuffAboutHypothesis(
            "newInference",
            hyp,
            "decrease"
          );
          this.props.valueInference.updateStepRule(true);
          // this.props.valueRule.addInferenceFromRule(inferenceItself, "∨e");
        }}
      >
        {"B est trouvé dans " + str}
      </div>
    );
  }

  render() {
    let whatToReturn = this.props.whatToReturn; // je déclare cette variable pour qu'elle puisse prendre une autre valeur dans un cas précis
    let firstButtonDisjonctionEliminationHypothesis,
      secondButtonDisjonctionEliminationHypothesis;
    let arrayExpectedArguments = [];
    let arrayExpectedButtons = [];
    const expectedArguments = this.props.expectedArguments;
    // const storedInference = this.props.valueInference.storedInference;
    let longStoredInference = this.props.valueInference.longStoredInference;
    let stepRule = this.props.valueInference.stepRule;
    let ArrayAorB = "";
    let argumentAorB, firstConclusion, secondConclusion;
    const allHypotheticalInferences = this.props.valueInference
      .allHypotheticalInferences;

    // étape 0 : l'utilisateur doit cliquer sur une inférence A∨B
    if (longStoredInference[0]) {
      console.log("bonjour");
      ArrayAorB = this.props.valueRule.returnWhatIsBeforeAndAfterTheOperator(
        longStoredInference[0],
        "∨"
      );
      // if (ArrayAorB === "error") {
      //   whatToReturn = "";
      //   longStoredInference = [];
      // }
      if (stepRule === 0) {
        this.props.valueInference.updateStepRule(true);
      }
    }
    console.log("LSIAN", longStoredInference);
    console.log("stepRule", stepRule);
    console.log("ArrayAorB", ArrayAorB);
    if (whatToReturn === "buttons") {
      if (stepRule === 1) {
        // étape 1 : "créer hyp A"
        firstButtonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "A",
          ArrayAorB[0]
        );
        secondButtonDisjonctionEliminationHypothesis = (
          <div className="rule-modal-specific-button deactivated">hyp B</div>
        );
      } else if (stepRule === 2) {
        // étape 2 : "arrêter hyp A"
        firstButtonDisjonctionEliminationHypothesis = this.renderButtonBreakHyp(
          "A"
        );
        secondButtonDisjonctionEliminationHypothesis = (
          <div className="rule-modal-specific-button deactivated">hyp B</div>
        );
      } else if (stepRule === 3) {
        // étape 3 : "créer hyp B"
        firstButtonDisjonctionEliminationHypothesis = (
          <div className="rule-modal-specific-button deactivated">hyp A</div>
        );
        secondButtonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "B",
          ArrayAorB[1]
        );
      } else if (stepRule === 4) {
        // étape 4 : "arrêter hyp B"
        firstButtonDisjonctionEliminationHypothesis = (
          <div className="rule-modal-specific-button deactivated">hyp A</div>
        );
        secondButtonDisjonctionEliminationHypothesis = this.renderButtonBreakHyp(
          "B"
        );
        // this.props.valueInference.updateStepRule(true);
      }

      arrayExpectedButtons[0] = firstButtonDisjonctionEliminationHypothesis;
      arrayExpectedButtons[1] = secondButtonDisjonctionEliminationHypothesis;
    } else if (whatToReturn === "arguments") {
      argumentAorB = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Cliquez sur une inférence A∨B>"}
        </p>
      );

      firstConclusion = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse A>"}
        </p>
      );
      secondConclusion = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse B>"}
        </p>
      );

      if (longStoredInference[0]) {
        argumentAorB = (
          <p className="inference-longStored">{longStoredInference[0]}</p>
        );
      }

      if (longStoredInference[1]) {
        firstConclusion = (
          <p className="inference-longStored">{longStoredInference[1]}</p>
        );
      }

      if (longStoredInference[2]) {
        secondConclusion = (
          <p className="inference-longStored">{longStoredInference[2]}</p>
        );
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
            {firstConclusion}
          </div>
          <div className="rule-modal-single-argument">
            {expectedArguments[2] + " : "}
            {secondConclusion}
          </div>
        </li>
      );
    }

    if (this.props.whatToReturn === "arguments") {
      whatToReturn = arrayExpectedArguments;
    } else if (this.props.whatToReturn === "buttons") {
      whatToReturn = arrayExpectedButtons;
    }

    return whatToReturn;
  }
}

export default ShowDisjonctionEliminationArgumentsAndButtons;
