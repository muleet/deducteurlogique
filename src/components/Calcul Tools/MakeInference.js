import React, { Component, Fragment } from "react";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";

// Cette fonction est appelée par Deducer.
// Cette fonction doit générer : le contenu de l'inférence, et le commentaire de l'inférence.
// Le résultat de cette fonction sera positionné à côté d'un numéro d'inférence, généré par Deduction.
// A côté du résultat de cette fonction, doit se trouver le résultat d'une fonction MakeInferenceCommentary, elle sera appelée dans Deduction.

class MakeInference extends Component {
  // lastInference(isIt) {
  //   if (isIt === true) {
  //     return "concluding-inference";
  //   }
  // }

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
