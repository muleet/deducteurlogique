import React, { Component } from "react";

class Debugger extends Component {
  render() {
    const value = this.props.valueInference;
    // allInf = this.props.valueInference.allInferencesThemselves;
    // let lastInfBackground = "",
    //   lastInfItslef = "",
    //   previousInfBackground = "",
    //   previousInfItself = "";
    // if (allInf.length > 0) {
    //   lastInfBackground = allInf[allInf.length - 1].inferenceBackground;
    //   lastInfItslef = allInf[allInf.length - 1].itself;
    //   if (allInf.length > 1) {
    //     previousInfBackground = allInf[allInf.length - 2].inferenceBackground;
    //     previousInfItself = allInf[allInf.length - 1].itself;
    //   }
    // }

    return (
      <ul className="debugger">
        {/* <li>{"allEvent : " + value.allEvent}</li>
        <li>{"lastInfItslef : " + lastInfItslef}</li>
        <li>{"lastInfBackground : " + lastInfBackground}</li>
        <li>{"previousInfItslef : " + previousInfItself}</li>
        <li>{"previousInfBackground : " + previousInfBackground}</li> */}
        {/* {"ruleModalShown.normal " + value.ruleModalShown.normal} */}
        {/* {"canInferenceBeStored " + value.canInferenceBeStored} */}
        {/* {"storedInference" + value.storedInference} */}
        {/* {"longStoredInference.length" +
          value.longStoredInference.length} */}
        {/* <li>
          {"theCurrentHypID : " +
            value.hypothesisCurrentLevelAndId.theCurrentHypID}
        </li> */}
        {/* <li>
          {"whichIDIsStillOpen : " +
            value.hypothesisCurrentLevelAndId.whichIDIsStillOpen}
        </li> */}
        {/* <li>{"maxID : " + value.hypothesisCurrentLevelAndId.maxID}</li> */}
        {/* <li>{"currentlyForecasting : " + value.currentlyForecasting}</li>
        {/* <li>{"level : " + value.hypothesisCurrentLevelAndId.level}</li>
        <li>{"storedInference : " + value.storedInference}</li>
        <li>{"storedNumbers : " + value.storedNumbers}</li>
        <li>{"storedHypID : " + value.storedHypID}</li>
        <li>
          {"ruleModalContent.expectedArguments.length : " +
            value.ruleModalContent.expectedArguments.length}
        </li>
        <li>
          {value.storedInference.length}/
          {value.ruleModalContent.expectedArguments.length}
        </li> */}
        <li>{value.ruleModalContent.ruleName}</li>
        <li>{value.otherInterpretation}</li>
        <li>{value.ruleModalShown.normal}</li>
      </ul>
    );
  }
}

export default Debugger;
