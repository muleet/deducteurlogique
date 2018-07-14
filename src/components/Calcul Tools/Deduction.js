import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";

class Deduction extends Component {
  state = {
    totalInferences: "",
    inferenceNumber: 1,
    inferenceItself: "p⊃q",
    inferenceCommentary: ""
    // isAdded: false // exemple à supprimer quand j'aurai compris comment les méthodes marchent exactement
  };

  addInference = () => {
    // On rend cette fonction accessible depuis n'importe où dans la classe, grâce à "= () =>". Sans ces caractères, la fonction serait comme en autarcie.
    // this.setState({ isAdded: true });
  };

  renderMakeInference = () => {
    console.log("wesh");

    this.setState({
      totalInferences:
        this.state.totalInferences +
        (
          <MakeInference
            infNum={this.state.inferenceNumber + ". "}
            content={this.state.inferenceItself}
          />
        )
    });
    return this.state.totalInferences;
  };

  // determineType = () => {
  //   this.setState({
  //     typeNumber: this.state.typeNumber + 1
  //   });
  //   if (this.state.typeNumber > 2) {
  //     this.state.typeNumber = 0;
  //   }
  //   return typeNumber;
  // };

  render() {
    return (
      <Fragment>
        <ul className="deduction">
          <div className="inferenceGlobal">
            <div className="inferenceNumber">
              <button
                className="deduction-button"
                onClick={this.renderMakeInference()}
              >
                {this.state.content}
              </button>
              {this.renderMakeInference()}
              {"exemple de numéro d'inférence"}
            </div>
            <div className="inferenceItself">{"exemple d'inférence"}</div>
            <div className="inferenceCommentary">
              {"exemple de commentaire d'inférence"}
            </div>
          </div>
        </ul>
      </Fragment>
    );
  }
  componentDidMount() {}
}

export default Deduction;
