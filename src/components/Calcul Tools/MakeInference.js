import React, { Component, Fragment } from "react";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";

// Cette fonction est appelée par Deducer.
// Cette fonction génère le numéro de l'inférence, le contenu de l'inférence, et le commentaire de l'inférence.

class MakeInference extends Component {
  render() {
    const isIt = this.props.lastInference;
    return (
      <Fragment>
        <li
          className={"inferenceGlobal selectable " + this.props.inferenceType}
          onClick={this.props.onClickSent}
        >
          <div className={"inferenceNumber " + this.props.inferenceType}>
            {this.props.inferenceNumber}
          </div>
          <div className={"hypothesis-level " + this.props.inferenceType}>
            {this.props.hypothesisCurrentLevel}
          </div>
          <div className={"inferenceItself " + this.props.inferenceType}>
            {this.props.inferenceItself}
          </div>
          <div className={"inferenceCommentary " + this.props.inferenceType}>
            {this.props.inferenceCommentary}
          </div>
        </li>
      </Fragment>
    );
  }
}

export default MakeInference;
