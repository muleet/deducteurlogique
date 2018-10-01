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

  handleClick(instruction, expectedArguments, ruleName, valueInference) {
    const objectForTheRuleModal = {
      instruction: instruction,
      expectedArguments: expectedArguments,
      ruleName: ruleName
    };
    console.log(
      "ruleName",
      ruleName,
      "valueInference.ruleName",
      this.props.valueInference.ruleModalContent.ruleName
    );
    // les deux conditions ci-dessous permettent de vérifier si canInferenceBeStored doit être ouvert ou fermé
    if (
      this.props.valueInference.ruleModalShown === true &&
      ruleName === this.props.valueInference.ruleModalContent.ruleName
    ) {
      valueInference.changeStorageBoolean(false);
    }
    if (this.props.valueInference.ruleModalShown === false) {
      valueInference.changeStorageBoolean(true);
    }
    valueInference.setRuleModal("reverse", "", objectForTheRuleModal);
  }

  render() {
    const arrayRulesSent = [...this.props.rulesSent]; // rulesSent est envoyée par Deducer et contient seulement les noms en str des règles impliquées
    let arrayRuleModal;
    let arrayRulesTwoCharacters = [];
    let arrayAllOtherRules = [];
    let arrayUnclickableRule = [];
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
                RulePopoverClassName="singleRule fatRule selectable"
                ruleName={arrayCurrentRules[i].name}
                // ruleName={arrayCurrentRules[i].name}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
                HowToUse={organizedUtilization}
              />
            </li>
          );
          // arrayAllOtherRules.push(
          //   <RuleHypothesisModal/>
          // );
          // arrayAllOtherRules.push(
          //   <RuleHypothesisModal
          //     key={i}
          //     modalButton={
          //       <RulePopover
          //         key={i}
          //         RulePopoverClassName="singleRule fatRule selectable"
          //         ruleName={arrayRulesSent[i]}
          //         verbalName={arrayCurrentRules[i].verbalName}
          //         Description={arrayCurrentRules[i].verbalDescription}
          //         HowToUse={organizedUtilization}
          //       />
          //     }
          //     instruction={arrayCurrentRules[i].instruction}
          //     expectedArguments={arrayCurrentRules[i].expectedArguments} // pas pareil pour l'hypothèse ? j'ai un doute alors je laisse ce commentaire
          //     ruleName={arrayCurrentRules[i].name}
          //     valueInference={this.props.valueInference}
          //   />
          // );
        } else if (Number(arrayRulesSent[i].length) === 2) {
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
                RulePopoverClassName="singleRule tinyRule selectable"
                ruleName={arrayCurrentRules[i].name}
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
        {arrayRulesTwoCharacters}
      </Fragment>
    );
  }
}

export default ButtonRuleMaker;
