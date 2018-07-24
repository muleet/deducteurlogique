import React, { Component } from "react";

// Classe qui est instanciée par Deducer, au sein d'une instanciation de ShowInformationExercice.
// [TEMP] Plus tard, elle devrait aussi être instanciée

class ButtonReit extends Component {
  render() {
    return (
      <div
        className={"button-rule button-reit " + this.props.className}
        onClick={() => this.props.useOfMakeInference()}
      >
        {this.props.NumberButton + ". " + this.props.NameButton}
        {/* <InferenceContext /> */}
        {/*que cette inférence soit issue des prémisses ou de la déduction ne change rien*/}
      </div>
    );
  }
}

export default ButtonReit;
