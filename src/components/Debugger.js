import React, { Fragment, Component } from "react";

class Debugger extends Component {
  render() {
    const valueInference = this.props.valueInference;
    return (
      <Fragment>
        {"ruleModalShown.normal " + valueInference.ruleModalShown.normal}
        {"canInferenceBeStored " + valueInference.canInferenceBeStored}
        {"storedInference" + valueInference.storedInference}
        {"howManyInferenceToStore" + valueInference.howManyInferenceToStore}
        {"longStoredInference.length" +
          valueInference.longStoredInferenceAndNumber.length}
      </Fragment>
    );
  }
}

export default Debugger;
