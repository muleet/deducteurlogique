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
          'Pour utiliser ~i, B et ~B doivent être similaires, en dehors de la présence d\'un "~" devant ~B.',
          "error-advice"
        );
      } else {
        if (A.length > 2 && A[1] !== "(") {
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
          "Hypothèse réfutée, introduction de la négation, inférence produite : " +
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
          if (notnotA[2] === "(") {
            let i = 3;
            while (i < notnotA.length - 1) {
              A = A + notnotA[i];
              i++;
            }
          } else {
            let i = 2;
            while (i < notnotA.length) {
              A = A + notnotA[i];
              i++;
            }
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
        "Hypothèse validée, introduction du conditionnel, inférence produite : " +
          inferenceToAdd.itself,
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
      // ∧i
      let AandB = this.returnAnInferenceOutOfTwoInferences(A, B, "∧");
      const inferenceToAdd = {
        itself: AandB,
        numberCommentary: numbers,
        commentary: "∧i"
      };
      this.props.valueInference.setAdvice(
        "Conjonction introduite, nouvelle inférence : " + inferenceToAdd.itself,
        "rule-advice"
      );
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
      // const actualID = this.props.valueInference.hypothesisCurrentLevelAndId
      //   .actualID;
      // const arraySPDAT = this.props.valueInference.arrayTrueAtomicPropositions;
      // console.log("arrayTrueAtomicPropositions",arraySPDAT,"première condition",arraySPDAT[actualID].length,"deuxième condition",arraySPDAT[actualID].indexOf("p"));
      // let B;
      // if (
      //   arraySPDAT[actualID].length > 0 &&
      //   arraySPDAT[actualID].indexOf("p") !== -1
      //   // cette condition dit : "Si il y a au moins une proposition atomique vraie dans l'hypothèse actuelle et que p en fait partie, alors [...]"
      // ) {
      //   B = String.fromCharCode(112 + actualID); // 112 est l'emplacement de "p" dans le tableau ASCII
      // } else {
      //   B = "p";
      // }
      // const AutomaticAorB = this.returnAnInferenceOutOfTwoInferences(A, B, "∨");

      const B = this.props.valueInference.futureInference;
      let ArbitraryAorB;
      if (this.props.valueInference.inversion === false) {
        ArbitraryAorB = this.returnAnInferenceOutOfTwoInferences(A, B, "∨");
      } else {
        ArbitraryAorB = this.returnAnInferenceOutOfTwoInferences(B, A, "∨");
      }
      const inferenceToAdd = {
        // itself: AutomaticAorB,
        itself: ArbitraryAorB,
        numberCommentary: number,
        commentary: "∨i"
      };
      if (B.length > 0 && A.length > 0) {
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction inclusive introduite, nouvelle inférence :" +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ∨i, sélectionnez une inférence A dans la déduction puis créez arbitrairement B.",
          "error-advice"
        );
      }
    }; // ∨i

    this.inclusiveDisjonctionElimination = (expectedArguments, number) => {
      const AorB = this.returnWhatIsBeforeAndAfterTheOperator(
        expectedArguments[0],
        "∨"
      );
      const concA = expectedArguments[1];
      const concB = expectedArguments[2];
      let inferenceToAdd = {
        itself: "",
        numberCommentary: number,
        commentary: "∨e"
      };
      let proposition;

      if (AorB[0] === concA && AorB[0] === concB) {
        inferenceToAdd.itself = AorB[0];
        proposition = "A";
      } else if (AorB[1] === concA && AorB[1] === concB) {
        inferenceToAdd.itself = AorB[1];
        proposition = "B";
      } else if (AorB[1] !== concA && concA === concB) {
        inferenceToAdd.itself = concA;
        proposition = "C";
      }
      if (inferenceToAdd.itself.length > 0) {
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction inclusive éliminée, les hypothèses A et B permettent toutes deux d'inférer " +
            proposition +
            ", qui est la nouvelle inférence :" +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ∨e, lisez bien les instructions",
          "error-advice"
        );
      }
    }; // ∨e

    this.biconditionalIntroduction = (AthenB, BthenA, number) => {
      const ArrayAthenB = this.returnWhatIsBeforeAndAfterTheOperator(
        AthenB,
        "⊃"
      );
      const ArrayBthenA = this.returnWhatIsBeforeAndAfterTheOperator(
        BthenA,
        "⊃"
      );
      if (
        ArrayAthenB[0] === ArrayBthenA[1] &&
        ArrayAthenB[1] === ArrayBthenA[0]
      ) {
        const AifandonlyifB = ArrayAthenB[0] + "≡" + ArrayAthenB[1];
        const inferenceToAdd = {
          itself: AifandonlyifB,
          numberCommentary: number,
          commentary: "≡i"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Biconditionnel introduit, nouvelle inférence :" +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡i, sélectionnez A⊃B et B⊃A puis validez.",
          "error-advice"
        );
      }
    };

    this.biconditionalElimination = (AifandonlyifB, number) => {
      let leftChoice, rightChoice;
      const ArrayAifandonlyifB = this.returnWhatIsBeforeAndAfterTheOperator(
        AifandonlyifB,
        "≡"
      );
      if (ArrayAifandonlyifB.length === 2) {
        if (ArrayAifandonlyifB[0].length > 2) {
          ArrayAifandonlyifB[0] = "(" + ArrayAifandonlyifB[0] + ")";
        }
        if (ArrayAifandonlyifB[1].length > 2) {
          ArrayAifandonlyifB[1] = "(" + ArrayAifandonlyifB[1] + ")";
        }
        leftChoice = ArrayAifandonlyifB[0] + "⊃" + ArrayAifandonlyifB[1];
        rightChoice = ArrayAifandonlyifB[1] + "⊃" + ArrayAifandonlyifB[0];
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "≡e");
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡e, sélectionnez A≡B.",
          "error-advice"
        );
      }
    };

    // SECTION DES AUTRES MÉTHODES, PERMETTANT AUX MÉTHODES DES RÈGLES DE FONCTIONNER

    this.addInferenceFromRule = (InferenceItself, hyp) => {
      // règle qui crée une inférence pour toute règle dont le fonctionnement est arrivé à son terme, sans erreur
      if (hyp) {
        this.props.valueInference.addInference(InferenceItself, hyp);
      } else if (InferenceItself !== "") {
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
        this.inclusiveDisjonctionElimination(arrInf, numbers); // A∨B + conc de |A + conc de |B, pour A ou B
      } else if (ruleName === "≡i") {
        this.biconditionalIntroduction(arrInf[0], arrInf[1], numbers); // A⊃B, B⊃A pour A≡B
      } else if (ruleName === "≡e") {
        this.biconditionalElimination(arrInf[0], numbers); // A≡B pour A⊃B ou B⊃A
      }
    };

    this.showChoiceOnTheModal = (leftChoice, rightChoice, number, ruleName) => {
      let choiceContent;
      let leftInferenceToAdd = {
        itself: leftChoice,
        numberCommentary: number,
        commentary: ruleName
      };
      let rightInferenceToAdd = {
        itself: rightChoice,
        numberCommentary: number,
        commentary: ruleName
      };
      let verbalRuleName = "";
      if (ruleName === "∧e") {
        verbalRuleName = "Conjonction éliminée";
      } else if (ruleName === "∨i") {
        verbalRuleName = "Disjonction inclusive introduite";
      }
      let leftSide = (
        <div
          className="rule-modal-one-choice selectable"
          onClick={() => {
            this.addInferenceFromRule(leftInferenceToAdd);
            this.props.valueInference.setAdvice(
              verbalRuleName +
                ", nouvelle inférence : " +
                leftInferenceToAdd.itself,
              leftChoice,
              "rule-advice"
            );
          }}
        >
          {leftChoice}
        </div>
      );
      let rightSide = (
        <div
          className="rule-modal-one-choice selectable"
          onClick={() => {
            this.addInferenceFromRule(rightInferenceToAdd);
            this.props.valueInference.setAdvice(
              verbalRuleName +
                ", nouvelle inférence : " +
                rightInferenceToAdd.itself,
              rightChoice,
              "rule-advice"
            );
          }}
        >
          {rightChoice}
        </div>
      );

      choiceContent = (
        <div className="rule-modal-all-choices">
          <p style={{ fontSize: "16px" }}>Choix :</p>
          {leftSide}
          {rightSide}
        </div>
      );
      this.props.valueInference.setChoiceContent(choiceContent);
    };

    this.returnWhatIsBeforeAndAfterTheOperator = (str, operator) => {
      // Cette fonction a plusieurs intérêts. Elle n'est utilisée que dans certaines règles d'élimination d'opérateur. 1) D'abord, elle reçoit un str contenant une inférence dans sa totalité. 2) Elle vérifie ensuite où commence et où termine la première parenthèse. En faisant cela, elle repère le positionnement de l'opérateur principal (celui hors de toute parenthèse). 3) Elle ajoute alors tout ce qui précède cet opérateur, à un tableau à entrées. 4) Ensuite elle poursuit l'exploration de la string et finit par ajouter ce qui précède à l'opérateur à la deuxième entrée du tableau. 5) Finalement, returnWhatIsBeforeAndAfterTheOperator doit retourner un tableau contenant les deux parties, en retirant les premières parenthèses si elles en avaient.
      console.log(str.indexOf(operator));
      let arrayToReturn = [];
      if (str.indexOf(operator) !== -1) {
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
        // arrayToReturn[0] = <ce qui précède>, arrayToReturn[1] = <ce qui succède>.
      } else {
        this.props.valueInference.setAdvice(
          "Cliquez sur une inférence ayant pour connecteur dominant le symbole '" +
            operator +
            "'.",
          "error-advice"
        );
        arrayToReturn = "error";
      }
      return arrayToReturn;
    };

    this.removeFirstParenthesis = inference => {
      // pas utilisé pour le moment
      let noFirstParenthesis = "";
      let inferenceToReturn = "";
      if (inference[0] === "(") {
        for (let i = 1; i < inference.length - 1; i++) {
          noFirstParenthesis = noFirstParenthesis + inferenceToReturn[i];
        }
      }
      return inferenceToReturn;
    };

    this.returnAnInferenceOutOfTwoInferences = (A, B, operator) => {
      if (A.length > 2 && A[0] !== "(" && A[A.length - 1] !== /[pqrs]/) {
        // if (A.length > 2 && A[0] !== "~" && A[A.length - 1] !== /[pqrs]/) {
        A = "(" + A + ")";
      }
      if (B.length > 2 && B[0] !== "(" && B[B.length - 1] !== /[pqrs]/) {
        // if (B.length > 2 && B[0] !== "~" && B[B.length] !== /[pqrs]/) {
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
      // // exclusiveDisjonctionIntroduction: this.exclusiveDisjonctionIntroduction, // ⊻i
      // // exclusiveDisjonctionElimination: this.exclusiveDisjonctionElimination, // ⊻e
      // biconditionalIntroduction: this.biconditionalIntroduction, // ≡i
      // biconditionalElimination: this.biconditionalElimination, // ≡e
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      showChoiceOnTheModal: this.showChoiceOnTheModal,
      returnWhatIsBeforeAndAfterTheOperator: this
        .returnWhatIsBeforeAndAfterTheOperator,
      removeFirstParenthesis: this.removeFirstParenthesis,
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
