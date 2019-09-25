import React, { Component } from "react";

// Classe qui est appelée par ShowInformationExercise, qui est appelée par Deducer.
// Elle n'est utile que pour les prémisses. Une version plutôt similaire de cette classe doit être ButtonReit.

class ButtonRuleRep extends Component {
  render() {
    return (
      <div
        className={"button-rep " + this.props.className}
        onClick={this.props.useOfAddInferenceSent}
        onMouseOver={this.props.useOfForecastInferenceSent}
        onMouseOut={this.props.resetForecastInferenceSent}
      >
        {this.props.NumberButton + ". " + this.props.NameButton}
        {/*que cette inférence soit issue des prémisses ou de la déduction ne change rien*/}
      </div>
    );
  }
}

export default ButtonRuleRep;
