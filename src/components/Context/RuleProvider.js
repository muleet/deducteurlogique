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
      console.log("conjonctionElimination");
      const positionConditional = AandB.indexOf("∧");
      let choice = "";
      if (positionConditional !== -1) {
        const leftChoice = AandB.slice(0, AandB.indexOf("∧"));
        const rightChoice = AandB.slice(
          Number(AandB.indexOf("∧")) + 1,
          AandB.length
        );
        // dans la fonction ci-dessous
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "∧e");
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

    this.redirectToTheRightRule = (ruleName, arrInf, numbers) => {
      console.log("redirectToTheRightRule");
      // Méthode qui permet de rediréger le modal de RuleModal vers la bonne règle
      // ruleName contient le nom de la règle, arrInf est un tableau avec les inférences, number contient le(s) nombre(s) des inférences
      if (ruleName === "⊃e") {
        this.conditionalElimination(arrInf[0], arrInf[1], numbers); // A, A⊃B
      } else if (ruleName === "∧e") {
        this.conjonctionElimination(arrInf[0], numbers); //  A∧B
      } else if (ruleName === "∧i") {
        this.conjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A, B
      }
    };

    this.showChoiceOnTheModal = (leftChoice, rightChoice, number, ruleName) => {
      console.log("showChoiceOnTheModal");
      const leftInferenceToAdd = {
        itself: leftChoice,
        numberCommentary: number,
        commentary: ruleName
      };
      const rightInferenceToAdd = {
        itself: rightChoice,
        numberCommentary: number,
        commentary: ruleName
      };
      const choiceContent2 = (
        <div className="rule-modal-all-choices">
          <p
            className="rule-modal-one-choice"
            onClick={() => this.addInferenceFromRule(leftInferenceToAdd)}
          >
            {leftChoice}
          </p>
          <p
            className="rule-modal-one-choice"
            onClick={() => this.addInferenceFromRule(rightInferenceToAdd)}
          >
            {rightChoice}
          </p>
        </div>
      );
      this.setState({ choiceContent: choiceContent2 });
    };

    this.manageParenthesis = str => {
      console.log("manageParenthesis");
    };

    this.state = {
      conditionalElimination: this.conditionalElimination,
      conjonctionElimination: this.conjonctionElimination,
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      showChoiceOnTheModal: this.showChoiceOnTheModal,
      manageParenthesis: this.manageParenthesis,
      choiceContent: "",
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
