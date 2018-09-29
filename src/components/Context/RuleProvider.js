import React, { createContext, Component } from "react";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    // SECTION DES RÈGLES ELLES-MEMES

    this.negationIntroduction = (B, notB, numbers) => {
      // Il manque ici un truc qui vérifie si la règle est bien utilisée, en tenant compte des parenthèses
      const A = this.props.valueInference.allHypotheticalInferences[0].itself;
      let notA;
      if (B[0] !== /[pqrs]/ && B[0] !== /\(\)/ && notB[0] !== "~") {
        this.props.valueInference.setAdvice(
          'Problème formel : B doit commencer par une proposition ou une parenthèse, et ~B par le caractère "~".',
          "error-advice"
        );
      } else {
        if (A.length > 2) {
          notA = "~(" + A + ")";
        } else {
          notA = "~" + A;
        }
        numbers =
          this.props.valueInference.allHypotheticalInferences[0]
            .numberCommentaryHypothesis +
          ", " +
          numbers;
        const hyp = "hypothèse réfutée";
        const inferenceToAdd = {
          itself: notA,
          numberCommentary: numbers,
          commentary: "~i"
        };
        this.props.valueInference.setAdvice(
          "Hypothèse réfutée par la règle ~i, inférence produite : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
        this.props.valueInference.setRuleModal("", "ended-well modal-ending");
        this.props.valueInference.changeStorageBoolean();
        this.props.valueInference.addInference(inferenceToAdd, hyp);
      }
      // else {
      //   this.props.valueInference.setAdvice(
      //     "Pour utiliser ~i, vous devez créer une contradiction au sein de l'hypothèse, pour la rejeter",
      //     "error-advice"
      //   );
      // }
    }; // ~i

    this.doubleNegationElimination = (notnotA, numbers) => {
      if (notnotA[0] === "~" && notnotA[1] === "~") {
        let A = "";
        if (notnotA.length > 2) {
          let i = 2;
          while (i < notnotA.length) {
            A = A + notnotA[i];
            i++;
          }
        } else {
          A = notnotA[2];
        }
        const inferenceToAdd = {
          itself: A,
          numberCommentary: numbers,
          commentary: "~~e"
        };
        this.props.valueInference.setAdvice(
          "Double négation éliminée, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
        this.props.valueInference.addInference(inferenceToAdd);
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ~~e, ~~A doit commencer par '~~'.",
          "error-advice"
        );
      }
    }; // ~~e

    this.conditionalIntroduction = (B, numbers) => {
      const A = this.props.valueInference.allHypotheticalInferences[0].itself; // A est déterminé par le programme : il sélectionne automatiquement l'hypothèse la plus récente encore en cours.
      let ifAthenB = this.returnAnInferenceOutOfTwoInferences(A, B, "⊃");
      numbers =
        this.props.valueInference.allHypotheticalInferences[0]
          .numberCommentaryHypothesis +
        "," +
        numbers;
      const inferenceToAdd = {
        itself: ifAthenB,
        numberCommentary: numbers,
        commentary: "⊃i"
      };
      this.props.valueInference.setAdvice(
        "Conditionnel introduit, nouvelle inférence : " + inferenceToAdd.itself,
        "rule-advice"
      );
      const hyp = "hypothèse validée";
      this.props.valueInference.addInference(inferenceToAdd, hyp);
      this.props.valueInference.setRuleModal("", "ended-well modal-ending");
      this.props.valueInference.changeStorageBoolean();
    }; // ⊃i

    this.conditionalElimination = (A, ifAthenB, numbers) => {
      // ⊃e
      const positionConditional = ifAthenB.indexOf("⊃");
      console.log(positionConditional);
      if (positionConditional !== -1) {
        const antecedent = ifAthenB.slice(0, ifAthenB.indexOf("⊃"));
        let consequent = ifAthenB.slice(
          Number(ifAthenB.indexOf("⊃")) + 1,
          ifAthenB.length
        );
        if (consequent[0] === "(") {
          let noFirstParenthesis = "";
          for (let i = 1; i < consequent.length - 1; i++) {
            noFirstParenthesis = noFirstParenthesis + consequent[i];
          }
          consequent = noFirstParenthesis;
        } else {
          this.props.valueInference.setAdvice(
            "Pour utiliser ⊃e, il faut une inférence A et une inférence A⊃B.",
            "error-advice"
          );
        }

        if (antecedent === A) {
          // si on arrive dans ce if, c'est que la règle est validée
          const inferenceToAdd = {
            itself: consequent,
            numberCommentary: numbers,
            commentary: "⊃e"
          };
          this.props.valueInference.setAdvice(
            "Conditionnel éliminé, nouvelle inférence : " +
              inferenceToAdd.itself,
            "rule-advice"
          );
          this.addInferenceFromRule(inferenceToAdd);
        } else {
          this.props.valueInference.setAdvice(
            "Pour utiliser ⊃e, A doit être identique dans les propositions A et A⊃B.",
            "error-advice"
          );
        }
      }
    }; // ⊃e

    this.conjonctionIntroduction = (A, B, numbers) => {
      let AandB = this.returnAnInferenceOutOfTwoInferences(A, B, "∧");
      const inferenceToAdd = {
        itself: AandB,
        numberCommentary: numbers,
        commentary: "∧i"
      };
      this.addInferenceFromRule(inferenceToAdd);
    }; // ∧i

    this.conjonctionElimination = (AandB, number) => {
      if (AandB.indexOf("∧") !== -1) {
        const arrayTwoChoices = this.returnWhatIsBeforeAndAfterTheOperator(
          AandB,
          "∧"
        );
        // if (arrayTwoChoices.length === 2) {
        const leftChoice = arrayTwoChoices[0];
        const rightChoice = arrayTwoChoices[1];
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "∧e");
        // }
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ∧e, il faut sélectionnez une inférence de forme A∧B.",
          "error-advice"
        );
      }
    }; // ∧e

    this.inclusiveDisjonctionIntroduction = (A, number) => {
      // let normalChoice;
      let AorB;
      if (
        this.props.valueInference.arraySimplePropositionsDemonstratedAsTrue
          .length > 0
      ) {
      } else {
        AorB = A + "∨p";
      }
      const inferenceToAdd = {
        itself: AorB,
        numberCommentary: number,
        commentary: "∧i"
      };
      this.props.valueInference.addInference(inferenceToAdd);
      // const rightChoice = A + "∨" + "C";
      // return this.showChoiceOnTheModal(normalChoice, "", number, "∨i");
    }; // ∨i
    // this.inclusiveDisjonctionElimination = A => {}; // ∨e

    // SECTION DES AUTRES MÉTHODES, PERMETTANT AUX MÉTHODES DES RÈGLES DE FONCTIONNER

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
      if (ruleName === "~i") {
        this.negationIntroduction(arrInf[0], arrInf[1], numbers); // B, ~B, pour réfuter l'hypothèse (A)
      } else if (ruleName === "~~e") {
        this.doubleNegationElimination(arrInf[0], numbers); // ~~A pour A
      } else if (ruleName === "∧i") {
        this.conjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A, B pour A∧B
      } else if (ruleName === "∧e") {
        this.conjonctionElimination(arrInf[0], numbers); //  A∧B pour A ou B
      } else if (ruleName === "⊃i") {
        this.conditionalIntroduction(arrInf[0], numbers); // (A), B pour A⊃B
      } else if (ruleName === "⊃e") {
        this.conditionalElimination(arrInf[0], arrInf[1], numbers); // A, A⊃B pour B
      } else if (ruleName === "∨i") {
        this.inclusiveDisjonctionIntroduction(arrInf[0], numbers); // A pour A∨B
      } else if (ruleName === "∨e") {
        this.exclusiveDisjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A∨B, hyp A & conc de A, hyp B et conc de B, pour A ou B
      }
    };

    this.showChoiceOnTheModal = (leftChoice, rightChoice, number, ruleName) => {
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
      this.props.valueInference.setChoiceContent(choiceContent);
    };

    this.returnWhatIsBeforeAndAfterTheOperator = (str, operator) => {
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
        if (i === str.length - 1) {
          arrayToReturn.push(part);
        }
      }
      for (let i = 0; i < 2; i++) {
        let noFirstParenthesis = "";
        if (arrayToReturn[i][0] === "(") {
          for (let j = 1; j < arrayToReturn[i].length - 1; j++) {
            noFirstParenthesis = noFirstParenthesis + arrayToReturn[i][j];
          }
          arrayToReturn[i] = noFirstParenthesis;
        }
      }
      return arrayToReturn;
      // arrayToReturn[0] = <ce qui précède>, arrayToReturn[1] = <ce qui succède>.
    };

    this.returnAnInferenceOutOfTwoInferences = (A, B, operator) => {
      if (A.length > 1 && A[0] !== "~" && A[A.length - 1] !== /[pqrs]/) {
        A = "(" + A + ")";
      }
      if (B.length > 2 && B[B.length] !== /[pqrs]/) {
        B = "(" + B + ")";
      }
      let AoperatorB = A + operator + B;
      return AoperatorB;
    };

    this.state = {
      // negationIntroduction: this.negationIntroduction, // ~i
      // negationElimination: this.negationElimination, // ~~e
      // conditionalIntroduction: this.conditionalIntroduction, // ⊃i
      // conditionalElimination: this.conditionalElimination, // ⊃e
      // conjonctionIntroduction: this.conjonctionIntroduction, // ∧i
      // conjonctionElimination: this.conjonctionElimination, // ∧e
      // inclusiveDisjonctionIntroduction: this.inclusiveDisjonctionIntroduction, // ∨i
      // inclusiveDisjonctionElimination: this.inclusiveDisjonctionElimination, // ∨e
      // exclusiveDisjonctionIntroduction: this.exclusiveDisjonctionIntroduction, // ⊻i
      // exclusiveDisjonctionElimination: this.exclusiveDisjonctionElimination, // ⊻e
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      showChoiceOnTheModal: this.showChoiceOnTheModal,
      returnWhatIsBeforeAndAfterTheOperator: this
        .returnWhatIsBeforeAndAfterTheOperator,
      returnAnInferenceOutOfTwoInferences: this
        .returnAnInferenceOutOfTwoInferences
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
