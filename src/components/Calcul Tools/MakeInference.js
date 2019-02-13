import React, { Component, Fragment } from "react";

// Cette fonction est appelée par InferenceProvider.
// Cette fonction affiche le numéro de l'inférence, le contenu de l'inférence, et le commentaire de l'inférence.
// (A FAIRE) Elle doit aussi afficher le niveau d'hypothèse par un ou trait ou plus.

class MakeInference extends Component {
  render() {
    let hypothesisLevel = "";
    for (let i = 0; i < this.props.hypothesisCurrentLevel; i++) {
      hypothesisLevel += "|";
    }

    return (
      <Fragment>
        <li
          className={"inferenceGlobal selectable " + this.props.inferenceType}
          onClick={this.props.onClickSent}
        >
          {/* {this.props.dataRegardingHypothesisLine} */}
          <div className={"inferenceNumber " + this.props.inferenceType}>
            {this.props.inferenceNumber}
          </div>
          <div className={"hypothesis-level " + this.props.inferenceType}>
            {hypothesisLevel}
            {/* {this.props.dataRegardingHypothesisLine} */}
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
