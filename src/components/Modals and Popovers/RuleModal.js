import React, { Component, Fragment } from "react";
import RuleProvider, { RuleContext } from "../Context/RuleProvider";
import ShowExpectedArguments from "./Components/ShowExpectedArguments";
import ShowModalButtons from "./Components/ShowModalButtons";

// RuleModal est appelé par ButtonRuleMaker

class RuleModalProvider extends Component {
  // dans les props de cette classe il y a "valueInference"
  constructor(props) {
    super(props);
    this.handleCloseModalFromButton = this.handleCloseModalFromButton.bind(
      this
    );
  }

  handleCloseModalFromButton() {
    this.props.valueInference.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.props.valueInference.setRuleModal(false);
    this.props.valueInference.setChoiceContent("");
  }

  showExpectedArguments(expectedArguments, ruleName, valueRule) {
    if (ruleName) {
      return (
        <ShowExpectedArguments
          valueInference={this.props.valueInference}
          ruleName={ruleName}
          expectedArguments={expectedArguments}
          valueRule={valueRule}
        />
      );
    }
  }

  showModalButtons(expectedArguments, ruleName, valueRule) {
    if (ruleName) {
      return (
        <ShowModalButtons
          valueInference={this.props.valueInference}
          ruleName={ruleName}
          expectedArguments={expectedArguments}
          valueRule={valueRule}
          handleCloseModalFromButton={this.handleCloseModalFromButton}
        />
      );
    }
  }

  renderRuleTabs(firstRuleNameShown, secondRuleNameShown, activeOrNot) {
    let icon = "",
      cnOne = "active",
      cnTwo = "inactive";
    if (this.props.valueInference.otherInterpretation[1] === "possible") {
      icon = " icon";
    }
    if (activeOrNot === "active") {
      cnOne = "inactive";
      cnTwo = "active";
    }
    return (
      <Fragment>
        <p
          className={"rule-modal-ruleName rule-modal-tab-" + cnOne + icon}
          onClick={() => {
            this.props.valueInference.setOtherInterpretation("inactive"); // pour indiquer si l'autre interprétation est activée
          }}
        >
          {firstRuleNameShown}
        </p>
        <p
          className={"rule-modal-ruleName rule-modal-tab-" + cnTwo + icon}
          onClick={() => {
            this.props.valueInference.setOtherInterpretation("active"); // pour indiquer si l'autre interprétation est activée
          }}
        >
          {secondRuleNameShown}
        </p>
      </Fragment>
    );
  }

  renderOneOrTwoRuleNames(firstRuleNameShown, secondRuleNameShown) {
    let result = <p className="rule-modal-runeName">{firstRuleNameShown}</p>;
    if (this.props.valueInference.otherInterpretation[1] === "possible") {
      if (this.props.valueInference.otherInterpretation[0] === "inactive") {
        result = this.renderRuleTabs(
          firstRuleNameShown,
          secondRuleNameShown,
          "inactive"
        );
      }
      if (this.props.valueInference.otherInterpretation[0] === "active") {
        result = this.renderRuleTabs(
          firstRuleNameShown,
          secondRuleNameShown,
          "active"
        );
      }
    }
    return <div className="rule-modal-all-tabs">{result}</div>;
  }

  render() {
    let keyboard = "",
      ruleModalClassName = ""; // soit "", soit "hidden"
    let instruction = this.props.instruction,
      expectedArguments = this.props.expectedArguments,
      ruleName = this.props.ruleName,
      firstRuleNameShown = this.props.ruleName,
      secondRuleNameShown = "";

    if (!this.props.valueInference.ruleModalShown.normal) {
      ruleModalClassName = "hidden";
    }

    // étape optionnelle : changer la règle qui est ajoutée, par son autre interprétation
    if (this.props.valueInference.otherInterpretation[1] === "possible") {
      // la "possibilité" est déterminée par le code de ButtonRuleMaker
      secondRuleNameShown = this.props.otherInterpretation.ruleName; // c'est juste pour l'affichage de la règle sur le RuleModal
      // si l'utilisateur a activé l'autre interprétation de la règle en cours (d'autres conditions sur d'autres pages vérifient que c'était possible
      if (this.props.valueInference.otherInterpretation[0] === "active") {
        ruleName = this.props.otherInterpretation.ruleName;
        instruction = this.props.otherInterpretation.instruction;
        expectedArguments = this.props.otherInterpretation.expectedArguments;
      }
    }

    return (
      <RuleProvider
        valueInference={this.props.valueInference}
        // Deducer reçoit le value d'InferenceProvider puis l'envoie à ButtonRuleMaker, qui l'envoie à RuleModal, qui l'envoie à RuleProvider
      >
        <RuleContext.Consumer>
          {value => (
            <Fragment>
              <div>
                <section
                  className={
                    "rule-modal-window animation-fadeIn " + ruleModalClassName
                  }
                >
                  {this.renderOneOrTwoRuleNames(
                    firstRuleNameShown,
                    secondRuleNameShown
                  )}
                  <p className="rule-modal-ruleInstruction">{instruction}</p>
                  <ul className="rule-modal-all-arguments">
                    {this.showExpectedArguments(
                      expectedArguments,
                      ruleName,
                      value
                    )}
                    {keyboard}
                    {this.props.valueInference.ruleModalChoiceContent}
                    {/* cette variable, ruleModalChoiceContent, est vide la plupart du temps */}
                  </ul>
                  <div className="rule-modal-all-buttons">
                    {this.showModalButtons(expectedArguments, ruleName, value)}
                  </div>
                </section>
                {/* </ReactModal> */}
              </div>
            </Fragment>
          )}
        </RuleContext.Consumer>
      </RuleProvider>
    );
  }
}

export default RuleModalProvider;
