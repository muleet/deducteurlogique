import React, { Fragment, Component } from "react";
import RulePopover from "../../Modals and Popovers/RulePopover";
import InfoRules from "../../../data/InfoRules.json";
// import RuleModal from "../../Modals and Popovers/RuleModal";
import RuleModal from "../../Modals and Popovers/RuleModal";
import RuleHypothesisModal from "../../Modals and Popovers/RuleHypothesisModal";

// ButtonRuleMaker génère la liste des règles d'un exercice. Par défaut, chaque exercice a un nombre de règles fixes.
// Si aucune règle n'est fixée pour un exercice, alors ButtonRuleMaker renvoie la totalité des règles.

class ButtonRuleMaker extends Component {
  renderModal() {
    if (this.props.valueInference.ruleModalContent.ruleName === "hyp") {
      return (
        <RuleHypothesisModal
          modalButton={""}
          instruction={this.props.valueInference.ruleModalContent.instruction}
          expectedArguments={
            this.props.valueInference.ruleModalContent.expectedArguments
          } // pas pareil pour l'hypothèse ? j'ai un doute alors je laisse ce commentaire
          ruleName={this.props.valueInference.ruleModalContent.ruleName}
          valueInference={this.props.valueInference}
        />
      );
    } else {
      return (
        <RuleModal
          modalButton={""}
          instruction={this.props.valueInference.ruleModalContent.instruction}
          expectedArguments={
            this.props.valueInference.ruleModalContent.expectedArguments
          }
          ruleName={this.props.valueInference.ruleModalContent.ruleName}
          valueInference={this.props.valueInference}
        />
      );
    }
  }

  renderRuleClassName(ruleName, availability) {
    let classNameToReturn = " selectable ";
    // if (this.props.valueInference.longStoredInference) {
    //   classNameToReturn = "longSelected";
    //   // this.renderRuleClassName("∨e");
    // }
    if (availability === "test") {
      classNameToReturn += " testRule ";
    }
    if (
      this.props.valueInference.ruleModalContent.ruleName === ruleName &&
      this.props.valueInference.ruleModalShown.normal
    ) {
      classNameToReturn += " selected";
    }

    return classNameToReturn;
  }

  handleClick(instruction, expectedArguments, ruleName, valueInference) {
    const objectForTheRuleModal = {
      instruction: instruction,
      expectedArguments: expectedArguments,
      ruleName: ruleName
    };
    // les deux conditions ci-dessous permettent de vérifier si canInferenceBeStored doit être ouvert ou fermé
    if (
      this.props.valueInference.ruleModalShown.normal === true &&
      ruleName === this.props.valueInference.ruleModalContent.ruleName
    ) {
      valueInference.changeStorageBoolean(false);
    } else {
    }
    if (this.props.valueInference.ruleModalShown.normal === false) {
      valueInference.changeStorageBoolean(
        true,
        expectedArguments.length,
        ruleName
      );
    }
    if (this.props.valueInference.ruleModalShown.normal === false) {
      valueInference.setRuleModal(
        "initial",
        "",
        objectForTheRuleModal,
        expectedArguments.length
      );
    } else {
      valueInference.setRuleModal(
        "reverse",
        "",
        objectForTheRuleModal,
        expectedArguments.length
      );
    }

    // valueInference.setRuleModal("reverse", "", objectForTheRuleModal);
  }

  render() {
    let arrayRulesSent = [];
    let arrayRuleModal;
    let arrayRulesTwoCharacters = [];
    let arrayAllOtherRules = [];
    let arrayUnclickableRule = [];
    if (this.props.sandbox) {
      for (let i = 0; i < InfoRules.length; i++) {
        if (
          InfoRules[i].available === "yes" ||
          InfoRules[i].available === "test" ||
          InfoRules[i].available === "bug"
        ) {
          arrayRulesSent.push(InfoRules[i].name);
        }
      }
    } else {
      arrayRulesSent = [...this.props.rulesSent]; // rulesSent est envoyée par Deducer et contient seulement les noms en str des règles impliquées
    }
    if (arrayRulesSent.length === 0) {
      // (A faire : Si le tableau de règle envoyé par Deducer est vide, cette fonction doit renvoyer la totalité des règles possibles.)
    } else if (arrayRulesSent.length > 0) {
      // On commence par créer un tableau qui va contenir toutes les infos des règles de l'exo. C'est lui qui sera la source de toutes les autres infos.
      let arrayCurrentRules = [];
      for (let i = 0; i < arrayRulesSent.length; i++) {
        for (let j = 0; j < InfoRules.length; j++) {
          if (arrayRulesSent[i] === InfoRules[j].name) {
            arrayCurrentRules.push(InfoRules[j]);
          }
        }
      }
      // On va maintenant créer le popover tout en organisant ses données.
      for (let i = 0; i < Number(arrayCurrentRules.length); i++) {
        let organizedUtilization = [];
        for (let j = 0; j < arrayCurrentRules[i].arrayUtilization.length; j++) {
          organizedUtilization.push(
            <ol key={j}>{arrayCurrentRules[i].arrayUtilization[j]}</ol>
          );
        }

        if (arrayRulesSent[i] === "reit" || arrayRulesSent[i] === "rep") {
          arrayUnclickableRule.push(
            <li key={i}>
              {arrayRulesSent[i].name}
              <RulePopover
                key={i}
                RulePopoverClassName="fatRule unclickableRule"
                ruleName={arrayRulesSent[i]}
                // lecture={arrayCurrentRules[i].lecture}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
              />
            </li>
          );
        } else if (arrayRulesSent[i] === "hyp") {
          arrayAllOtherRules.push(
            <li
              key={i}
              onClick={() => {
                this.handleClick(
                  arrayCurrentRules[i].instruction,
                  arrayCurrentRules[i].expectedArguments,
                  // arrayCurrentRules[i].name,
                  arrayRulesSent[i],
                  this.props.valueInference
                );
              }}
            >
              {arrayRulesSent[i].name}
              <RulePopover
                key={i}
                RulePopoverClassName={
                  "singleRule fatRule " +
                  this.renderRuleClassName(
                    arrayCurrentRules[i].name,
                    arrayCurrentRules[i].available
                  )
                }
                ruleName={arrayCurrentRules[i].name}
                lecture={arrayCurrentRules[i].lecture}
                // ruleName={arrayCurrentRules[i].name}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
                HowToUse={organizedUtilization}
              />
            </li>
          );
        } else if (
          Number(arrayRulesSent[i].length) === 2 ||
          arrayRulesSent[i] === "~~e"
          // || arrayRulesSent !== "~~e"
        ) {
          let currentRuleName = arrayCurrentRules[i].name;
          if (arrayRulesSent[i] === "~~e") {
            currentRuleName = (
              <p id="negationElimination">{arrayCurrentRules[i].name}</p>
            );
          }

          arrayRulesTwoCharacters.push(
            <li
              key={i}
              onClick={() => {
                this.handleClick(
                  arrayCurrentRules[i].instruction,
                  arrayCurrentRules[i].expectedArguments,
                  arrayCurrentRules[i].name,
                  this.props.valueInference
                );
              }}
            >
              {arrayRulesSent[i].name}
              <RulePopover
                key={i}
                RulePopoverClassName={
                  "singleRule tinyRule " +
                  this.renderRuleClassName(
                    arrayCurrentRules[i].name,
                    arrayCurrentRules[i].available
                  )
                }
                ruleName={currentRuleName}
                lecture={arrayCurrentRules[i].lecture}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
                HowToUse={organizedUtilization}
              />
            </li>
          );
        } else if (Number(arrayRulesSent[i].length) > 2) {
          // sauf l'hypothèse
          arrayAllOtherRules.push(
            <li
              key={i}
              onClick={() => {
                this.handleClick(
                  arrayCurrentRules[i].instruction,
                  arrayCurrentRules[i].expectedArguments,
                  arrayCurrentRules[i].name,
                  this.props.valueInference
                );
              }}
            >
              {arrayRulesSent[i].name}
              <RulePopover
                key={i}
                RulePopoverClassName="singleRule fatRule selectable"
                ruleName={arrayCurrentRules[i].name}
                // lecture={arrayCurrentRules[i].lecture}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
                HowToUse={organizedUtilization}
              />
            </li>
          );
        }
      }
    }
    return (
      <Fragment>
        <div className="all-button-about-inferences">
          {/* <i
            className="fas fa-long-arrow-alt-left icon"
            onClick={() => {
              this.props.valueInference.removeLastInference(); // cette fonction est un nid à bug donc je l'ai virée pour le moment
            }}
          /> */}
          <i
            className="fas fa-eraser icon"
            onClick={() => {
              this.props.valueInference.resetDeduction();
            }}
          />
        </div>
        <ul>{arrayUnclickableRule}</ul>
        {this.renderModal(this.props.valueInference.ruleModalContent)}
        {arrayRuleModal}
        {arrayAllOtherRules}
        <hr style={{ width: "20px" }} />
        <div className="setOfRules-twoCharacters">
          {arrayRulesTwoCharacters}
        </div>
      </Fragment>
    );
  }
}

export default ButtonRuleMaker;
