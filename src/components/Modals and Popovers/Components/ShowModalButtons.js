import React, { Component, Fragment } from "react";

class ShowModalButtons extends Component {
  verifyRule(valueRule) {
    // "RuleModal", puis "ShowExpectedArguments"/"ShowModalButtons", puis "VerifyRule", puis "redirectToTheRightRule", puis "[la règle en question]", puis "addInference"
    // puis dans le cas des hypothèses, changeHypothesisLevel, puis updateHypotheticalInferencesThemselves puis RIEN (pas d'updateInferencesOfCurrentHypotheses)
    // console.log("verifyRule, pour la règle ", this.props.ruleName);

    if (
      this.props.valueInference.storedInference !== undefined &&
      this.props.expectedArguments.length ===
        this.props.valueInference.storedInference.length
    ) {
      valueRule.redirectToTheRightRule(
        this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
        this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
        this.props.valueInference.storedNumbers.slice(
          0,
          this.props.expectedArguments.length
        ) // storedNumbers contient (en str) les numéros des inférences citées juste avant.
      );
      if (this.props.ruleName !== "∧e") {
        // ∧e est exclus parce qu'il ne doit pas s'arrêter juste après que l'utilisateur ait validé la règle
        this.props.valueInference.setRuleModal("", "ended-well modal-ending");
        this.props.valueInference.changeStorageBoolean();
      }
    } else {
      this.props.valueInference.setAdvice(
        "Tous les arguments n'étaient pas entrés",
        "error-advice"
      );
      this.props.valueInference.setRuleModal(true, "ended-badly");
    }
  }

  verifyBreakHypothesisRule(valueRule) {
    // console.log("verifyBreakHypothesisRule", this.props.ruleName);
    if (this.props.valueInference.hypothesisCurrentLevelAndId.level !== 0) {
      if (
        this.props.valueInference.storedInference !== undefined &&
        this.props.expectedArguments.length - 1 === // on fait -1 puisque l'hypothèse n'est pas comptée à ce moment
          this.props.valueInference.storedInference.length
      ) {
        valueRule.redirectToTheRightRule(
          this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
          this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle.
          this.props.valueInference.storedNumbers.slice(
            0,
            this.props.expectedArguments.length - 1
          ) // storedNumbers contient (en str) les numéros des inférences qui permettront de valider la règle.
        );
        // this.props.valueInference.setRuleModal("", "ended-well modal-ending");
        // this.props.valueInference.changeStorageBoolean();
      } else {
        this.props.valueInference.setAdvice(
          "Entrez tous les arguments avant de valider",
          "error-advice"
        );
        return;
        // this.props.valueInference.setRuleModal("", "ended-badly");
      }
    } else {
      this.props.valueInference.setAdvice(
        "Créez d'abord une hypothèse avant de valider",
        "error-advice"
      );
      return;
    }
  }

  handleClickReverseCharacter() {
    this.props.valueInference.setInversion();
  }

  buttonReverseInference() {
    let inferenceForm;
    if (this.props.valueInference.inversion === false) {
      inferenceForm = "A" + this.props.ruleName[0] + "B";
    } else if (this.props.valueInference.inversion === true) {
      inferenceForm = "B" + this.props.ruleName[0] + "A";
    }
    return inferenceForm;
  }

  render() {
    let buttonInverseInference = "";
    let buttonRemoveLastCharacter = "";
    if (this.props.ruleName === "∨i") {
      buttonInverseInference = (
        <p
          className="rule-modal-button"
          onClick={this.props.valueInference.setInversion}
        >
          {this.buttonReverseInference()}
        </p>
      );
      buttonRemoveLastCharacter = (
        <p
          className="rule-modal-button"
          onClick={this.props.valueInference.removeLastCharacter}
        >
          <i className="fas fa-long-arrow-alt-left icon" />
        </p>
      );
    }

    return (
      <Fragment>
        {buttonRemoveLastCharacter}
        {buttonInverseInference}
        <p
          className="rule-modal-button"
          onClick={() => {
            if (this.props.ruleName !== "⊃i" && this.props.ruleName !== "~i") {
              this.verifyRule(this.props.valueRule);
            } else {
              this.verifyBreakHypothesisRule(this.props.valueRule);
            }
          }}
        >
          <i className="fas fa-check-square" />
        </p>
        <p
          className="rule-modal-button"
          onClick={() => {
            this.props.valueInference.changeStorageBoolean("resetButStillTrue");
            this.props.valueInference.setRuleModal(true, "");
          }}
        >
          <i className="fas fa-eraser" />
        </p>
        <p className="rule-modal-button" onClick={this.props.handleCloseModal}>
          <i className="fas fa-times-circle" />
        </p>
      </Fragment>
    );
  }
}

export default ShowModalButtons;
