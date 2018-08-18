import React, { Component, Fragment } from "react";

// Ce composant sert seulement à rediriger une page vers une certaine règle. C'est pour simplifier le code.

class SelectRule extends Component {
  render() {
    console.log("SelectRule", this.props.selectedRule);
    return;
  }
}

export default SelectRule;
