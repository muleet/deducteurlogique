import React, { createContext, Component, Fragment } from "react";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    // SECTION DES REGLES ELLES-MEMES

    this.conditionalElimination = (A, ifAthenB, numbers) => {
      const positionConditional = ifAthenB.indexOf("⊃");
      if (positionConditional !== -1) {
        const antecedent = ifAthenB.slice(0, ifAthenB.indexOf("⊃"));
        const consequent = ifAthenB.slice(
          Number(ifAthenB.indexOf("⊃")) + 1,
          ifAthenB.length
        );
        if (antecedent === A) {
          // si on arrive dans ce if, c'est que la règle est validée
          const inferenceToAdd = {
            itself: consequent,
            numberCommentary: numbers,
            commentary: "⊃e"
          };
          this.addInferenceFromRule(inferenceToAdd);
        } else {
          return "error";
        }
      }
    };

    this.conjonctionElimination = (AandB, number) => {
      const positionConditional = AandB.indexOf("∧");
      let choice = "";
      if (positionConditional !== -1) {
        const leftProposition = AandB.slice(0, AandB.indexOf("∧"));
        const rightProposition = AandB.slice(
          Number(AandB.indexOf("∧")) + 1,
          AandB.length
        );
        this.secondStepOfARule();
        // si on arrive ici, c'est que la règle est validée
        const inferenceToAdd = {
          itself: choice,
          numberCommentary: number,
          commentary: "∧e"
        };
        this.addInferenceFromRule(inferenceToAdd);
      } else {
        return "error";
      }
    };

    this.conjonctionIntroduction = (A, B, numbers) => {};

    // SECTION DES AUTRES METHODES, PERMETTANT AUX METHODES DES REGLES DE FONCTIONNER

    this.addInferenceFromRule = InferenceItself => {
      // règle qui crée une inférence pour toute règle dont le fonctionnement est arrivé à son terme, sans erreur
      if (InferenceItself !== "error" || InferenceItself !== "") {
        this.props.valueSent.addInference(InferenceItself);
      } else {
        console.log("erreur dans la vérification de la règle");
      }
    };

    this.redirectToTheRightRule = (ruleName, a, b, c, d, e) => {
      // Méthode qui permet de rediréger le modal de RuleModal vers la bonne règle
      // Parmi les arguments a b c d e, se trouve "number", qui est le dernier d'entre eux.
      if (ruleName === "⊃e") {
        this.conditionalElimination(a, b, c); // A, A⊃B, numbers
      } else if (ruleName === "∧e") {
        this.conjonctionElimination(a, b); //  A∧B, number
      } else if (ruleName === "∧i") {
        this.conjonctionIntroduction(a, b, c); // A, B, numbers
      }
    };

    this.secondStepOfARule = () => {};

    this.state = {
      conditionalElimination: this.conditionalElimination,
      conjonctionElimination: this.conjonctionElimination,
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      secondStepOfARule: this.secondStepOfARule,
      fautvérifierquelinferencenestcomposeequedepropositionsetdeparenthèses:
        "et il faudra une fonction dans la classe RuleProvider pour ça"
    };
  }

  render() {
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <RuleContext.Provider value={this.state}>
        {this.props.children}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </RuleContext.Provider>
    );
  }
}
export default RuleProvider;
