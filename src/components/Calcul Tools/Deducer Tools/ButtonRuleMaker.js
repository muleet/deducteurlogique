import React, { Fragment, Component } from "react";
import RulePopover from "../../Modals and Popovers/RulePopover";
import InfoRules from "../../../data/InfoRules.json";
import RuleModal from "../../Modals and Popovers/RuleModal";
import RuleHypothesisModal from "../../Modals and Popovers/RuleHypothesisModal";

// ButtonRuleMaker génère la liste des règles d'un exercice. Par défaut, chaque exercice a un nombre de règles fixes.
// Si aucune règle n'est fixée pour un exercice, alors ButtonRuleMaker renvoie la totalité des règles.

class ButtonRuleMaker extends Component {
  render() {
    const arrayRulesSent = [...this.props.rulesSent]; // rulesSent est envoyée par Deducer et contient seulement les noms en str des règles impliquées
    let arrayRulesTwoCharacters = [];
    let arrayAllOtherRules = [];
    let arrayUnclickableRule = [];
    if (arrayRulesSent.length === 0) {
      // (A faire : Si le tableau de règle envoyé par Deducer est vide, cette fonction doitde renvoyer la totalité des règles possibles.)
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
              {/* {arrayCurrentRules[i].verbalName} */}
              <RulePopover
                key={i}
                RulePopoverClassName="fatRule unclickableRule"
                ruleName={arrayRulesSent[i]}
                verbalName={arrayCurrentRules[i].verbalName}
                Description={arrayCurrentRules[i].verbalDescription}
                HowToUse={organizedUtilization}
              />
            </li>
          );
        } else if (arrayRulesSent[i] === "hyp") {
          arrayAllOtherRules.push(
            <RuleHypothesisModal
              key={i}
              modalButton={
                <RulePopover
                  key={i}
                  RulePopoverClassName="singleRule fatRule selectable"
                  ruleName={arrayRulesSent[i]}
                  verbalName={arrayCurrentRules[i].verbalName}
                  Description={arrayCurrentRules[i].verbalDescription}
                  HowToUse={organizedUtilization}
                />
              }
              instruction={arrayCurrentRules[i].instruction}
              expectedArguments={arrayCurrentRules[i].expectedArguments} // pas pareil pour l'hypothèse ? j'ai un doute alors je laisse ce commentaire
              ruleName={arrayCurrentRules[i].name}
              valueInference={this.props.valueInference}
            />
          );
        } else if (Number(arrayRulesSent[i].length) === 2) {
          arrayRulesTwoCharacters.push(
            <RuleModal
              key={i}
              modalButton={
                <RulePopover
                  key={i}
                  RulePopoverClassName="singleRule tinyRule selectable"
                  ruleName={arrayCurrentRules[i].name}
                  verbalName={arrayCurrentRules[i].verbalName}
                  Description={arrayCurrentRules[i].verbalDescription}
                  HowToUse={organizedUtilization}
                />
              }
              instruction={arrayCurrentRules[i].instruction}
              expectedArguments={arrayCurrentRules[i].expectedArguments}
              ruleName={arrayCurrentRules[i].name}
              valueInference={this.props.valueInference}
            />
          );
        } else if (Number(arrayRulesSent[i].length) > 2) {
          // sauf l'hypothèse
          arrayAllOtherRules.push(
            <RuleModal
              key={i}
              modalButton={
                <RulePopover
                  key={i}
                  RulePopoverClassName="singleRule fatRule selectable"
                  ruleName={arrayRulesSent[i]}
                  verbalName={arrayCurrentRules[i].verbalName}
                  Description={arrayCurrentRules[i].verbalDescription}
                  HowToUse={organizedUtilization}
                />
              }
              instruction={arrayCurrentRules[i].instruction}
              expectedArguments={arrayCurrentRules[i].expectedArguments}
              ruleName={arrayCurrentRules[i].name}
              valueInference={this.props.valueInference}
            />
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
        <ul
        // style={{ display: "flex", width  }}
        >
          {arrayUnclickableRule}
        </ul>
        {arrayAllOtherRules}
        <hr style={{ width: "20px" }} />
        {arrayRulesTwoCharacters}
      </Fragment>
    );
  }
}

export default ButtonRuleMaker;
