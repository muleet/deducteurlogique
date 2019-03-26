import React, { Component } from "react";

class Debugger extends Component {
  render() {
    const valueInference = this.props.valueInference;
    return (
      <ul className="debugger">
        {/* {"ruleModalShown.normal " + valueInference.ruleModalShown.normal} */}
        {/* {"canInferenceBeStored " + valueInference.canInferenceBeStored} */}
        {/* {"storedInference" + valueInference.storedInference} */}
        {/* {"longStoredInference.length" +
          valueInference.longStoredInference.length} */}
        <li>
          {"theCurrentHypID : " +
            valueInference.hypothesisCurrentLevelAndId.theCurrentHypID}
        </li>
        <li>
          {"whichIDIsStillOpen : " +
            valueInference.hypothesisCurrentLevelAndId.whichIDIsStillOpen}
        </li>
        <li>{"maxID : " + valueInference.hypothesisCurrentLevelAndId.maxID}</li>
        <li>{"level : " + valueInference.hypothesisCurrentLevelAndId.level}</li>
      </ul>
    );
  }
}

export default Debugger;
