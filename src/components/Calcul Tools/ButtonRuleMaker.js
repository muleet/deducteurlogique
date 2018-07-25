import React, { Fragment } from "react";

const arrayRules = ["~", "∧", "∨", "∨", "⊃", "≡", "↓", "→", "↔"];
let arrayFragmentRules = [];

function ButtonRuleMaker() {
  for (let i = 0; i < Number(arrayRules.length); i++) {
    arrayFragmentRules.push(
      <li className="pairOfRules">
        <div className="singleRule">{arrayRules[i] + "i"}</div>
        <div className="singleRule">{arrayRules[i] + "e"}</div>
      </li>
    );
  }

  return (
    <Fragment>
      <ul className="setOfRules">{arrayFragmentRules}</ul>
    </Fragment>
  );
}

export default ButtonRuleMaker;
