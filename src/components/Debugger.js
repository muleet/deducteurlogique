import React, { Fragment, Component } from "react";

class Debugger extends Component {
  render() {
    const valueInference = this.props.valueInference;
    return (
      <Fragment>
        {"ruleModalShown " + valueInference.ruleModalShown}
        {"canInferenceBeStored " + valueInference.canInferenceBeStored}
        {"storedInference" + valueInference.storedInference}
        {"howManyInferenceToStore" + valueInference.howManyInferenceToStore}
      </Fragment>
    );
  }
}

export default Debugger;
