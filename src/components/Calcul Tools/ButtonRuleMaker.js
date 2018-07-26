import React, { Fragment } from "react";

const arrayRules = ["~", "∧", "∨", "∨", "⊃", "≡", "↓", "→", "↔"];
let arrayFragmentRules = [];

function ButtonRuleMaker(props) {
  const arrayRules2 = [...props.rulesSent];
  console.log(arrayRules2);

  for (let i = 0; i < Number(arrayRules2.length); i++) {
    if (arrayRules2[i].length == 2) {
      console.log(arrayRules2[i]);
      arrayFragmentRules.push(
        <li className="pairOfRules">
          <div className="singleRule">{arrayRules2[i]}</div>
        </li>
      );
    }
  }

  return (
    <Fragment>
      <ul className="setOfRules">{arrayFragmentRules}</ul>
    </Fragment>
  );
}

export default ButtonRuleMaker;
