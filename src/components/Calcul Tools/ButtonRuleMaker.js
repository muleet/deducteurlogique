import React, { Fragment, Component } from "react";

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
      console.log(arrayRulesSent[i]);
      console.log(arrayRulesSent[i].length);

      if (Number(arrayRulesSent[i].length) === 2) {
        arrayRulesTwoCharacters.push(
          <div className="singleRule tinyRule">{arrayRulesSent[i]}</div>
        );
      } else {
        arrayAllOtherRules.push(
          <div className="singleRule fatRule">{arrayRulesSent[i]}</div>
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
