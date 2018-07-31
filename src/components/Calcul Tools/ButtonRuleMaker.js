import React, { Fragment, Component } from "react";
import MyPopover from "../MyPopover";
import InfoRules from "../../data/InfoRules.json";
import Popper from "popper.js";

// ButtonRuleMaker génère la liste des règles d'un exercice. Par défaut, chaque exercice a un nombre de règles fixes.
// Si aucune règle n'est fixée pour un exercice, alors ButtonRuleMaker renvoie la totalité des règles.

class ButtonRuleMaker extends Component {
  render() {
    const arrayRulesSent = [...this.props.rulesSent];
    let arrayRulesTwoCharacters = [];
    let arrayAllOtherRules = [];

    if (arrayRulesSent === []) {
      // Si le tableau de règle envoyé par Deducer est vide, cette fonction a pour but de renvoyer la totalité des règles possibles.
      // arrayRulesSent = arrayRulesTotal; // commenté parce que j'arrive pas à faire marcher ce truc pour le moment
    }
    for (let i = 0; i < Number(arrayRulesSent.length); i++) {
      let organizedUtilization = [];
      for (let j = 0; j < InfoRules[i].arrayUtilization.length; j++) {
        console.log(typeof InfoRules[i].arrayUtilization[j]);
        if (typeof InfoRules[i].arrayUtilization[j] === "object") {
          console.log("wesh");
          organizedUtilization.push(
            <ol key={j}>{InfoRules[i].arrayUtilization[j]}</ol>
          );
        }
      }
      if (Number(arrayRulesSent[i].length) === 2) {
        arrayRulesTwoCharacters.push(
          <MyPopover
            myPopoverClassName="singleRule tinyRule"
            name={arrayRulesSent[i]}
            Description={InfoRules[i].verbalDescription}
            HowToUse={InfoRules[i].arrayUtilization}
            // onClick={() => {
            //   new Popper("Wesh");
            // }}
          />
        );
      } else {
        arrayAllOtherRules.push(
          <MyPopover
            myPopoverClassName="singleRule fatRule"
            name={arrayRulesSent[i]}
            Description={InfoRules[i].verbalDescription}
            HowToUse={organizedUtilization}
            // onClick={() => {
            //   new Popper("Wesh");
            // }}
          />
        );
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
