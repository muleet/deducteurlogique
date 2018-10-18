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
        className=""
        onClick={() => {
          this.props.valueInference.addInference(inferenceItself, hyp);
        }}
      >
        Créer hyp {str}
      </div>
    );
  }

  renderButtonBreakHyp(str) {
    const hyp = "fin hyp ∨e";
    return (
      <div
        className=""
        onClick={() => {
          this.manageLotsOfStuffAboutHypothesis(
            "newInference",
            hyp,
            "decrease"
          );
          // this.props.valueRule.addInferenceFromRule(inferenceItself, "∨e");
        }}
      >
        {str + " est trouvé"}
      </div>
    );
  }

  render() {
    let buttonDisjonctionEliminationHypothesis = "";
    let arrayExpectedArguments = [];
    let arrayExpectedButtons = [];
    const expectedArguments = this.props.expectedArguments;
    // const storedInference = this.props.valueInference.storedInference;
    let ArrayAorB = "";
    let argumentAorB, firstHyp, firstConclusion, secondHyp, secondConclusion;
    // const allHypotheticalInferences = this.props.valueInference
    //   .allHypotheticalInferences;
    console.log(
      "longStoredInferenceAndNumber",
      this.props.valueInference.longStoredInferenceAndNumber,
      "ArrayAorB",
      ArrayAorB
    );
    if (this.props.valueInference.longStoredInferenceAndNumber[0]) {
      ArrayAorB = this.props.valueRule.returnWhatIsBeforeAndAfterTheOperator(
        this.props.valueInference.longStoredInferenceAndNumber[0],
        "∨"
      );
    }

    if (this.props.whatToReturn === "buttons") {
      // étape 0 : l'utilisateur doit cliquer sur une inférence A∨B
      if (this.props.valueInference.longStoredInferenceAndNumber.length === 1) {
        // étape 1 : "créer hyp A"
        buttonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "A",
          ArrayAorB[0]
        );
      } else if (
        this.props.valueInference.longStoredInferenceAndNumber.length === 2
      ) {
        // étape 2 : "arrêter hyp A"
        buttonDisjonctionEliminationHypothesis = "casser hyp A";
      } else if (
        this.props.valueInference.longStoredInferenceAndNumber.length === 3
      ) {
        // étape 3 : "créer hyp B"
        buttonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "B",
          ArrayAorB[1]
        );
      } else if (
        this.props.valueInference.longStoredInferenceAndNumber.length === 4
      ) {
        // étape 4 : "arrêter hyp B"
        buttonDisjonctionEliminationHypothesis = "casser hyp B";
      }

      // étape 4 : l'utilisateur clôt l'hyp B puisque B est déjà trouvé par défaut. On infère aussitôt B (la règle se retrouve validée).
      if (2 === 1 + 1) {
      }
      arrayExpectedButtons[0] = buttonDisjonctionEliminationHypothesis;
    } else if (this.props.whatToReturn === "arguments") {
      argumentAorB = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Cliquez sur une inférence A∨B>"}
        </p>
      );
      firstHyp = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Créez d'abord une hypothèse A>"}
        </p>
      );
      secondHyp = (
        <p className="awaiting-an-longStored-inference-blinking">
          {"<Créez d'abord une hypothèse B, après avoir terminé l'hypothèse A>"}
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

      if (this.props.valueInference.longStoredInferenceAndNumber[0]) {
        argumentAorB = (
          <p className="inference-longStored">
            {this.props.valueInference.longStoredInferenceAndNumber[0]}
          </p>
        );
      }
      if (this.props.valueInference.longStoredInferenceAndNumber[1]) {
        firstHyp = (
          <p className="inference-longStored">
            {this.props.valueInference.longStoredInferenceAndNumber[1]}
          </p>
        );
      }
      if (this.props.valueInference.longStoredInferenceAndNumber[2]) {
        firstConclusion = (
          <p className="inference-longStored">
            {this.props.valueInference.longStoredInferenceAndNumber[2]}
          </p>
        );
      }

      if (this.props.valueInference.longStoredInferenceAndNumber[3]) {
        secondHyp = (
          <p className="inference-longStored">
            {this.props.valueInference.longStoredInferenceAndNumber[3]}
          </p>
        );
      }
      if (this.props.valueInference.longStoredInferenceAndNumber[4]) {
        secondConclusion = (
          <p className="inference-longStored">
            {this.props.valueInference.longStoredInferenceAndNumber[4]}
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
