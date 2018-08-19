import React, { Component } from "react";

// Ce composant sert seulement à rediriger vers une certaine règle, juste après un clic de l'utilisateur sur un bouton qui avait pour nom cette règle.
// C'est pour simplifier le code.

class SelectRule extends Component {
  putaindesamere = () => {
    console.log("connard");
  };

  render() {
    // console.log(this.props.selectedRule);
    this.putaindesamere();
    console.log("SelectRule");
    return this.putaindesamere();
  }
}

export default SelectRule;
