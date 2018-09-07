import React, { createContext, Component } from "react";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    // SECTION DES REGLES ELLES-MEMES

    this.reiteration = (A, numbers) => {
      // si on arrive dans ce if, c'est que la règle est validée
      const inferenceToAdd = {
        itself: A,
        numberCommentary: numbers,
        commentary: "reit"
      };
      this.addInferenceFromRule(inferenceToAdd);
    };

    this.negationIntroduction = (B, noB, numbers) => {
      // Il manque ici un truc qui vérifie si la règle est bien utilisée, en tenant compte des parenthèses
      if (B[0] !== /pqrs\(/ || noB[0] !== "~") {
        this.props.valueInference.setAdvice(
          'Problème formel : B doit commencer par une proposition ou une parenthèse, et ~B par le caractère "~".',
          "error-advice"
        );
      } else if (2 === 1 + 1) {
        let noA =
          "~" + this.props.valueInference.allHypotheticalInferences[0].itself;
        const hyp = "hypothèse réfutée";
        const inferenceToAdd = {
          itself: noA,
          numberCommentary: numbers,
          commentary: "~i"
        };
        this.props.valueInference.addInference(inferenceToAdd, hyp);
      } else {
        this.props.valueInference.setAdvice(
          "Pour ~i devez créer une contradiction au sein de l'hypothèse, pour la rejeter",
          "error-advice"
        );
      }
    };

    this.doubleNegationElimination = numbers => {
      // pas encore fait
    };

    this.conditionalIntroduction = (B, numbers) => {
      const A = this.props.valueInference.allHypotheticalInferences[0].itself; // A est déterminé par le programme : il sélectionne automatiquement l'hypothèse la plus récente encore en cours.
      let ifAthenB = this.returnAnInferenceOutOfTwoInferences(A, B, "⊃");
      const inferenceToAdd = {
        itself: ifAthenB,
        numberCommentary: numbers,
        commentary: "⊃i"
      };
      const hyp = "hypothèse validée";
      this.props.valueInference.addInference(inferenceToAdd, hyp);
    };

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
          console.log("erreur dans la fonction conditionalElimination");
        }
      }
    };

    this.conjonctionIntroduction = (A, B, numbers) => {
      let AandB = this.returnAnInferenceOutOfTwoInferences(A, B, "∧");
      const inferenceToAdd = {
        itself: AandB,
        numberCommentary: numbers,
        commentary: "∧i"
      };
      this.addInferenceFromRule(inferenceToAdd);
    };

    this.conjonctionElimination = (AandB, number) => {
      console.log("conjonctionElimination");
      const arrayTwoChoices = this.returnWhatIsBeforeAndAfterTheOperator(
        AandB,
        "∧"
      );
      if (arrayTwoChoices.length === 2) {
        const leftChoice = arrayTwoChoices[0];
        const rightChoice = arrayTwoChoices[1];
        // dans la fonction ci-dessous
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "∧e");
      } else {
        console.log("erreur dans la fonction conjonctionElimination");
      }
    };

    // SECTION DES AUTRES METHODES, PERMETTANT AUX METHODES DES REGLES DE FONCTIONNER

    this.addInferenceFromRule = (InferenceItself, hyp) => {
      // règle qui crée une inférence pour toute règle dont le fonctionnement est arrivé à son terme, sans erreur
      if (hyp) {
        this.props.valueInference.addInference(InferenceItself, hyp);
      } else if (InferenceItself !== "error" && InferenceItself !== "") {
        this.props.valueInference.addInference(InferenceItself);
      } else {
        console.log("erreur dans la redirection de la règle");
      }
    };

    this.redirectToTheRightRule = (ruleName, arrInf, numbers) => {
      console.log("redirectToTheRightRule, pour la règle", ruleName);
      // Méthode qui permet de rediréger le modal de RuleModal vers la bonne règle
      // ruleName contient le nom de la règle, arrInf est un tableau avec les inférences, number contient le(s) nombre(s) des inférences
      if (ruleName === "reit") {
        this.reiteration(arrInf[0], numbers); //  A∧B
        // } else if (ruleName === "hyp") {
        // console.log("normalement ça n'arrive jamais ici je crois");
      } else if (ruleName === "~i") {
        this.negationIntroduction(arrInf[0], arrInf[1], numbers); // B, ~B, pour réfuter l'hypothèse (A)
      } else if (ruleName === "~~e") {
        this.doubleNegationElimination(arrInf[0], numbers); // ~~A pour A
      } else if (ruleName === "∧i") {
        this.conjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A, B pour A∧B
      } else if (ruleName === "∧e") {
        this.conjonctionElimination(arrInf[0], numbers); //  A∧B pour A ou b
      } else if (ruleName === "⊃i") {
        this.conditionalIntroduction(arrInf[0], numbers); // (A), B pour A⊃B
      } else if (ruleName === "⊃e") {
        this.conditionalElimination(arrInf[0], arrInf[1], numbers); // A, A⊃B pour B
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
      const choiceContent = (
        <div className="rule-modal-all-choices">
          <p
            className="rule-modal-one-choice selectable"
            onClick={() => this.addInferenceFromRule(leftInferenceToAdd)}
          >
            {leftChoice}
          </p>
          <p
            className="rule-modal-one-choice selectable"
            onClick={() => this.addInferenceFromRule(rightInferenceToAdd)}
          >
            {rightChoice}
          </p>
        </div>
      );
      this.setState({ choiceContent: choiceContent });
      // this.props.valueInference.showChoice(choiceContent2)
    };

    this.returnWhatIsBeforeAndAfterTheOperator = (str, operator) => {
      console.log("returnWhatIsBeforeAndAfterTheOperator");
      // Cette fonction a plusieurs intérêts. Elle n'est utilisée que dans certaines règles d'élimination d'opérateur. 1) D'abord, elle reçoit un str contenant une inférence dans sa totalité. 2) Elle vérifie ensuite où commence et où termine la première parenthèse. En faisant cela, elle repère le positionnement de l'opérateur principal (celui hors de toute parenthèse). 3) Elle ajoute alors tout ce qui précède cet opérateur, à un tableau à entrées. 4) Ensuite elle poursuit l'exploration de la string et finit par ajouter ce qui précède à l'opérateur à la deuxième entrée du tableau. 5) Finalement, returnWhatIsBeforeAndAfterTheOperator doit retourner un tableau contenant les deux parties, en retirant les premières parenthèses si elles en avaient.
      let arrayToReturn = [];
      let level = 0;
      let part = "";
      for (let i = 0; i < str.length; i++) {
        if (str[i] === operator && level === 0) {
          // si on arrive ici c'est qu'on vient de recontrer l'unique opérateur hors de toute parenthèse
          arrayToReturn.push(part);
          part = "";
          i++;
        }
        if (str[i] === "(") {
          level++;
        } else if (str[i] === ")") {
          level--;
        }
        part = part + str[i];
        // console.log(part);
        if (i === str.length - 1) {
          arrayToReturn.push(part);
        }
      }
      for (let i = 0; i < 2; i++) {
        let noFirstParenthesis = "";
        if (arrayToReturn[i][0] === "(") {
          console.log(arrayToReturn[i][0]);
          for (let j = 1; j < arrayToReturn[i].length - 1; j++) {
            noFirstParenthesis = noFirstParenthesis + arrayToReturn[i][j];
          }
          arrayToReturn[i] = noFirstParenthesis;
        }
      }
      console.log("return final", arrayToReturn);
      return arrayToReturn;
      // arrayToReturn[0] = "cequiprécède", arrayToReturn[1] = "cequisuccède".
    };

    this.returnAnInferenceOutOfTwoInferences = (A, B, operator) => {
      if (A.length > 1 && A[0] !== "~" && A[A.length - 1] !== /[pqrs]/) {
        A = "(" + A + ")";
      }
      if (B.length > 1 && B[0] !== "~" && B[B.length - 1] !== /[pqrs]/) {
        B = "(" + B + ")";
      }
      let AoperatorB = A + operator + B;
      return AoperatorB;
    };

    this.state = {
      // reiteration: this.reiteration, // reit
      // conditionalIntroduction: this.conditionalIntroduction, // ⊃i
      // conditionalElimination: this.conditionalElimination, // ⊃e
      // conjonctionIntroduction: this.conjonctionIntroduction, // ∧i
      // conjonctionElimination: this.conjonctionElimination, // ∧e
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      showChoiceOnTheModal: this.showChoiceOnTheModal,
      returnWhatIsBeforeAndAfterTheOperator: this
        .returnWhatIsBeforeAndAfterTheOperator,
      returnAnInferenceOutOfTwoInferences: this
        .returnAnInferenceOutOfTwoInferences,
      choiceContent: ""
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
