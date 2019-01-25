import React, { Component } from "react";
// import RuleProvider from "../RuleProvider";

// composant appelé par InferenceProvider, avec les props ruleName, areTheInferencesDetected, allInferencesThemselves
// ce composant va retourner 2 choses : 1) l'emplacement (en chiffre) des inférences compatibles pour la règle en question.
// 2) La portée des inférences en question (en chiffre).
// Par exemple pour le modus ponens : si on détecte l'inférence A dans une inférence A⊃B, il faut savoir quand s'arrête l'emplacement de A.
console.log("bonjour outside of the box");

class InferenceScanner extends Component {
  scanTheRightInferences() {
    console.log("bonjour inside l'autre box");
    const allInferencesThemselves = this.props.allInferencesThemselves;
    const ruleName = this.props.ruleName;
    const areTheInferencesDetected = this.props.areTheInferencesDetected;

    for (let i = 0; i < allInferencesThemselves.length; i++) {
      if (allInferencesThemselves[i]) {
        for (let j = 0; j < allInferencesThemselves.length; j++) {
          if (allInferencesThemselves[i][j]) {
            this.props.areTheInferencesDetected = true;
          }
        }
      }
    }
  }

  render() {
    this.props.this.scanTheRightInferences();
    // const allInferencesScanned = {
    //   positionInference: this.scanTheRightInferences(),
    //   positionFirstCharacter: ""
    // };
    console.log("bonjour inside the box");
    // console.log(RuleProvider);
    return "";
  }
}

export default InferenceScanner;
