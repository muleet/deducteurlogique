import React, { Fragment } from "react";

const arrayRulesTotal = ["~", "∧", "∨", "∨", "⊃", "≡", "↓", "→", "↔"];
let arrayFragmentRules = [];

function ButtonRuleMaker(props) {
  const arrayRules2 = [...props.rulesSent];

  for (let i = 0; i < Number(arrayRulesTotal.length); i++) {
    if (arrayRulesTotal[i].length == 2) {
      console.log(arrayRulesTotal[i]);
      arrayFragmentRules.push(
        <li className="pairOfRules">
          <div className="singleRule">{arrayRulesTotal[i]}</div>
        </li>
      );
    }
  }

  return <Fragment>{arrayFragmentRules}</Fragment>;
}

export default ButtonRuleMaker;
