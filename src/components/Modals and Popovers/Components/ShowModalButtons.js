import React, { Component, Fragment } from "react";

class ShowModalButtons extends Component {
  verifyRule(valueRule) {
    // "RuleModal", puis "ShowExpectedArguments", puis "VerifyRule", puis "redirectToTheRightRule", puis "[la règle en question]", puis "addInference"
    // puis dans le cas des hypothèses, changeHypothesisLevel, puis updateHypotheticalInferencesThemselves puis RIEN (pas d'updateInferencesOfCurrentHypotheses)
    console.log("verifyRule, pour la règle ", this.props.ruleName);

    if (
      this.props.valueInference.storedInference !== undefined &&
      this.props.expectedArguments.length ===
        this.props.valueInference.storedInference.length
    ) {
      valueRule.redirectToTheRightRule(
        this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
        this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
        this.props.valueInference.storedNumbers // storedNumbers contient (en str) les numéros des inférences citées juste avant.
      );
      if (this.props.ruleName !== "∧e" && this.props.ruleName !== "∨i") {
        // ∧e et ∨i sont exclus parce qu'ils ne doivent pas s'arrêter juste après que l'utilisateur ait validé la règle
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
    console.log("verifyBreakHypothesisRule", this.props.ruleName);
    if (this.props.valueInference.hypothesisCurrentLevelAndId.level !== 0) {
      if (
        this.props.valueInference.storedInference !== undefined &&
        this.props.expectedArguments.length - 1 === // on fait -1 puisque l'hypothèse n'est pas comptée à ce moment
          this.props.valueInference.storedInference.length
      ) {
        valueRule.redirectToTheRightRule(
          this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
          this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle.
          this.props.valueInference.storedNumbers // storedNumbers contient (en str) les numéros des inférences qui permettront de valider la règle.
        );
        this.props.valueInference.setRuleModal("", "ended-well modal-ending");
        this.props.valueInference.changeStorageBoolean();
      } else {
        this.props.valueInference.setAdvice(
          "Entrez tous les arguments avant de valider",
          "error-advice"
        );
        this.props.valueInference.setRuleModal("", "ended-badly");
      }
    } else {
      this.props.valueInference.setAdvice(
        "Créez d'abord une hypothèse avant de valider",
        "error-advice"
      );
    }
  }

  render() {
    let arrayModalButton;
    return (
      <Fragment>
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
            this.props.valueInference.changeStorageBoolean("erase");
            this.props.valueInference.setRuleModal(true, "");
          }}
        >
          <i className="fas fa-eraser" />
        </p>
        <p className="rule-modal-button" onClick={this.handleCloseModal}>
          <i className="fas fa-times-circle" />
        </p>
      </Fragment>
    );
  }
}

export default ShowModalButtons;
