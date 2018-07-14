import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";

class Deduction extends Component {
  state = {
    totalInferences: {},
    inferenceNumber: 1,
    inferenceItself: "p et q",
    inferenceCommentary: "",
    isDisplayed: false // exemple à supprimer quand j'aurai compris
  };

  displaySomething = () => {
    // On rend cette fonction accessible depuis n'importe où dans la classe, grâce à "= () =>". Sans ces caractères, la fonction serait comme en autarcie.
    this.setState({ isDisplayed: true });
  };

  renderMakeInference() {
    if (this.state.isDisplayed) {
      // this.setState({ isDisplayed: false });
      return (
        <MakeInference
          infNum={this.state.inferenceNumber}
          content={this.state.inferenceItself}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <Fragment>
        <ul className="deduction">
          <div className="inferenceGlobal">
            <div className="inferenceNumber">
              <button
                className="deduction-button"
                onClick={this.displaySomething}
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
}

export default Deduction;
