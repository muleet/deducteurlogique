import React, { Fragment, Component } from "react";
import MyPopover from "../MyPopover";
import InfoRules from "../../data/InfoRules.json";
import MyModal from "../MyModal";
// import SelectRule from "./SelectRule";

// ButtonRuleMaker génère la liste des règles d'un exercice. Par défaut, chaque exercice a un nombre de règles fixes.
// Si aucune règle n'est fixée pour un exercice, alors ButtonRuleMaker renvoie la totalité des règles.

class ButtonRuleMaker extends Component {
  render() {
    const arrayRulesSent = [...this.props.rulesSent]; // rulesSent est envoyée par Deducer et contient seulement les noms en str des règles impliquées
    let arrayRulesTwoCharacters = [];
    let arrayAllOtherRules = [];

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
          // }
        }
        if (Number(arrayRulesSent[i].length) === 2) {
          arrayRulesTwoCharacters.push(
            <MyModal
              modalButton={
                <MyPopover
                  key={i}
                  myPopoverClassName="singleRule tinyRule"
                  name={arrayCurrentRules[i].name}
                  verbalName={arrayCurrentRules[i].verbalName}
                  Description={arrayCurrentRules[i].verbalDescription}
                  HowToUse={organizedUtilization}
                />
              }
              instruction={arrayCurrentRules[i].instruction}
              storedInference={this.props.valueSent}
            />
          );
        } else {
          arrayAllOtherRules.push(
            <MyModal
              modalButton={
                <MyPopover
                  key={i}
                  myPopoverClassName="singleRule fatRule"
                  name={arrayRulesSent[i]}
                  verbalName={arrayCurrentRules[i].verbalName}
                  Description={arrayCurrentRules[i].verbalDescription}
                  HowToUse={organizedUtilization}
                />
              }
              instruction={arrayCurrentRules[i].instruction}
              storedInference={this.props.valueSent}
            />
          );
        }
      }
    }
    return (
      <Fragment>
        {arrayAllOtherRules}
        <hr style={{ width: "20px" }} />
        {arrayRulesTwoCharacters}
      </Fragment>
    );
  }
}

export default ButtonRuleMaker;
