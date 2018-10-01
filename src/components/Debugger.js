import React, { Fragment, Component } from "react";

class Debugger extends Component {
  render() {
    return (
      <Fragment>
        {"ruleModalShown " + value.ruleModalShown}
        {"canInferenceBeStored " + value.canInferenceBeStored}
      </Fragment>
    );
  }
}
