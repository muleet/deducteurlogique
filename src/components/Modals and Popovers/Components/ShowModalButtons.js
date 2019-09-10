import React, { Component, Fragment } from "react";
// import ShowDisjonctionEliminationArguments from "./ShowDisjonctionEliminationArgumentsAndButtons";

class ShowModalButtons extends Component {
  verifyRule(valueRule) {
    // Généalogie : "RuleModal", puis "ShowExpectedArguments"/"ShowModalButtons", puis "VerifyRule", puis "redirectToTheRightRule", puis "[la règle en question]", puis "addInference"
    // puis dans le cas des hypothèses, changeHypothesisLevel, puis updateHypotheticalInferencesThemselves puis RIEN (pas d'updateInferencesOfCurrentHypotheses)
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
      if (
        this.props.ruleName !== "∧e" &&
        this.props.ruleName !== "≡e" &&
        this.props.ruleName !== "↓e"
      ) {
        // ∧e et ≡e et ↓e sont exclus parce qu'ils ne doivent pas s'arrêter juste après que l'utilisateur ait validé la règle
        this.props.valueInference.setRuleModal(
          "rule-ended-well",
          "ended-well modal-ending"
        );
        this.props.valueInference.changeStorageBoolean();
      }
    } else {
      this.props.valueInference.setAdvice(
        "Entrez tous les arguments requis pour la règle " +
          this.props.ruleName +
          ", avant de la valider.",
        "error-advice"
      );
      this.props.valueInference.setRuleModal("stillOpen", "ended-badly");
    }
  }

  verifyBreakHypothesisRule(valueRule) {
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
          "Entrez tous les arguments requis, avant de valider.",
          "error-advice"
        );
        return;
        // this.props.valueInference.setRuleModal("", "ended-badly");
      }
    } else {
      this.props.valueInference.setAdvice(
        "Pour utiliser " +
          this.props.ruleName +
          ", il faut d'abord créer une hypothèse.",
        "error-advice"
      );
      return;
    }
  }

  verifyLongStorageRule(valueRule) {
    if (
      this.props.valueInference.longStoredInference !== undefined &&
      this.props.expectedArguments.length ===
        this.props.valueInference.longStoredInference.length
    ) {
      valueRule.redirectToTheRightRule(
        this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
        this.props.valueInference.longStoredInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
        this.props.valueInference.storedNumbers.slice(
          0,
          this.props.expectedArguments.length
        ) // storedNumbers contient (en str) les numéros des inférences citées juste avant.
      );
      if (this.props.ruleName !== "∧e") {
        // ∧e est exclus parce qu'il ne doit pas s'arrêter juste après que l'utilisateur ait validé la règle
        this.props.valueInference.setRuleModal(
          "rule-ended-well",
          "ended-well modal-ending"
        );
        this.props.valueInference.changeStorageBoolean();
      }
    } else {
      this.props.valueInference.setAdvice(
        "Entrez tous les arguments requis pour la règle " +
          this.props.ruleName +
          ", avant de la valider.",
        "error-advice"
      );
      this.props.valueInference.setRuleModal("stillOpen", "ended-badly");
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
    // DECLARATION DES VARIABLES DES BOUTONS DU MODAL
    let buttonResetArguments = "";
    let buttonInverseInference = "";
    let buttonRemoveLastCharacter = "";
    let buttonSpecificRule = "";
    // let buttonDisjonctionEliminationHypothesis = "";

    // CONDITIONS PERMETTANT DE DONNER LEURS RÔLES AUX BOUTONS EN FONCTION DE LA REGLE EN COURS
    // if (this.props.ruleName !== "∨e") {
    //   buttonResetArguments = (
    //     <p
    //       className="rule-modal-button"
    //       onClick={() => {
    //         this.props.valueInference.changeStorageBoolean("resetButStillTrue");
    //         this.props.valueInference.setRuleModal("stillOpen", "");
    //       }}
    //     >
    //       <i className="fas fa-eraser" />
    //     </p>
    //   );
    // }
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

    // if (this.props.ruleName === "∨e") {
    //   buttonSpecificRule = (
    //     <ShowDisjonctionEliminationArguments
    //       key={1}
    //       whatToReturn="buttons"
    //       // expectedArguments={expectedArguments}
    //       valueRule={this.props.valueRule}
    //       valueInference={this.props.valueInference}
    //     />
    //   );
    //   // buttonResetArguments = "???"
    //   // à faire : pour la règle d'élimination de la disjonction il faut pouvoir supprimer les deux hypothèses créées, à volonté. Y compris si une seule hypothèse avait été créée.
    // }

    // if (this.props.ruleName === "reit") {
    //   return ""; // pas de boutons pour reit
    // }

    return (
      <Fragment>
        {/* les deux boutons ci-desous ne concernent que ∨i */}
        {buttonRemoveLastCharacter}
        {buttonInverseInference}
        {/* le bouton ci-dessous ne concerne que ∨e */}
        {buttonSpecificRule}
        {/* {buttonDisjonctionEliminationHypothesis} */}
        <p
          className="rule-modal-button"
          onClick={() => {
            // if (this.props.ruleName === "∨e") {
            //   this.verifyLongStorageRule(this.props.valueRule);
            // } else
            if (this.props.ruleName !== "⊃i" && this.props.ruleName !== "~i") {
              this.verifyRule(this.props.valueRule);
            } else {
              this.verifyBreakHypothesisRule(this.props.valueRule);
            }
          }}
        >
          <i className="fas fa-check-square" />
        </p>
        {buttonResetArguments}
        <p className="rule-modal-button" onClick={this.props.handleCloseModal}>
          <i className="fas fa-times-circle" />
        </p>
      </Fragment>
    );
  }
}

export default ShowModalButtons;
