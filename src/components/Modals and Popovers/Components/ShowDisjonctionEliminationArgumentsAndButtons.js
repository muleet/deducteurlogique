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
    const storedInference = this.props.valueInference.storedInference;
    let ArrayAorB = "";
    let argumentAorB, firstHyp, firstConclusion, secondHyp, secondConclusion;
    // const allHypotheticalInferences = this.props.valueInference
    //   .allHypotheticalInferences;
    if (storedInference[0]) {
      ArrayAorB = this.props.valueRule.returnWhatIsBeforeAndAfterTheOperator(
        storedInference[0],
        "∨"
      );
      console.log("ArrayAorB", ArrayAorB);
    }
    if (this.props.whatToReturn === "buttons") {
      if (storedInference[0]) {
        buttonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "A",
          ArrayAorB[0]
        );
      }
      if (storedInference[1] && !firstHyp) {
        buttonDisjonctionEliminationHypothesis = this.renderButtonMakeHyp(
          "B",
          ArrayAorB[1]
        );
      }
      arrayExpectedButtons[0] = buttonDisjonctionEliminationHypothesis;
    } else if (this.props.whatToReturn === "arguments") {
      if (!storedInference[0]) {
      }
      argumentAorB = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence A∨B>"}
        </p>
      );
      firstHyp = (
        <p className="awaiting-an-inference-blinking">
          {"<Créez d'abord une hypothèse A>"}
        </p>
      );
      secondHyp = (
        <p className="awaiting-an-inference-blinking">
          {"<Créez d'abord une hypothèse B, en dehors de l'hypothèse A>"}
        </p>
      );
      firstConclusion = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse A>"}
        </p>
      );
      secondConclusion = (
        <p className="awaiting-an-inference-blinking">
          {"<Cliquez sur une inférence B dans l'hypothèse B>"}
        </p>
      );
      if (storedInference[0]) {
        console.log("ArrayAorB", ArrayAorB);
        argumentAorB = <p className="infItself-modal">{storedInference[0]}</p>;
        firstHyp = (
          <p className="awaiting-an-inference-blinking">{ArrayAorB[0]}</p>
        );
        secondHyp = (
          <p className="awaiting-an-inference-blinking">{ArrayAorB[1]}</p>
        );
        if (storedInference[1]) {
          firstHyp = <p className="infItself-modal">{storedInference[1]}</p>;

          if (storedInference[2]) {
            firstConclusion = (
              <p className="infItself-modal">{storedInference[2]}</p>
            );
            if (storedInference[3]) {
              secondHyp = (
                <p className="infItself-modal">{storedInference[3]}</p>
              );
              if (storedInference[4]) {
                secondConclusion = (
                  <p className="infItself-modal">{storedInference[4]}</p>
                );
              }
            }
          }
        }
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
