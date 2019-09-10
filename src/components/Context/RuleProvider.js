import React, { createContext, Component } from "react";
import InferenceTools from "./Components/InferenceTools";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    // SECTION DES RÈGLES ELLES-MEMES
    this.negationIntroduction = (B, notB, numbers) => {
      // Il manque ici un truc qui vérifie si la règle est bien utilisée, en tenant compte des parenthèses
      const A = this.props.valueInference.allHypotheticalInferences[0].itself;
      let notA,
        notBbecomeB = notB.substring(1);
      notBbecomeB = InferenceTools.mayRemoveFirstParenthesis(notBbecomeB);
      if (notB[0] === "~" && B === notBbecomeB) {
        if (A.length > 2 && A[1] !== "(") {
          notA = "~(" + A + ")";
        } else {
          notA = "~" + A;
        }
        numbers =
          this.props.valueInference.allHypotheticalInferences[0]
            .numberCommentaryHypothesis +
          " & " +
          numbers; // y'a un truc à corriger ici
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
        this.props.valueInference.setRuleModal(
          "hypothesis-ended-well",
          "ended-well modal-ending"
        );
        this.props.valueInference.changeStorageBoolean();
        this.props.valueInference.addInference(inferenceToAdd, hyp);
      } else {
        this.props.valueInference.setAdvice(
          'Pour utiliser ~i, B et ~B doivent être similaires, en dehors de la présence d\'un "~" devant ~B.',
          "error-advice"
        );
      }
    }; // ~i

    this.doubleNegationElimination = (notnotA, numbers) => {
      if (notnotA[0] === "~" && notnotA[1] === "~") {
        let A = "";
        notnotA = InferenceTools.withdrawFirstCharacters(notnotA, 2);
        A = InferenceTools.mayRemoveFirstParenthesis(notnotA);
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

    this.conjonctionIntroduction = (A, B, numbers) => {
      // ∧i
      let AandB = InferenceTools.returnAnInferenceOutOfTwoInferences(
        A,
        B,
        "∧",
        true
      );
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
      const arrayTwoChoices = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        AandB,
        "∧"
      );
      if (arrayTwoChoices !== "error") {
        const leftChoice = arrayTwoChoices[0];
        const rightChoice = arrayTwoChoices[1];
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "∧e");
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ∧e, il faut sélectionnez une inférence de forme A∧B.",
          "error-advice"
        );
      }
    }; // ∧e

    this.inclusiveDisjonctionIntroduction = (A, number) => {
      const B = this.props.valueInference.futureInference;
      let ArbitraryAorB;
      if (this.props.valueInference.inversion === false) {
        ArbitraryAorB = InferenceTools.returnAnInferenceOutOfTwoInferences(
          A,
          B,
          "∨"
        );
      } else {
        ArbitraryAorB = InferenceTools.returnAnInferenceOutOfTwoInferences(
          B,
          A,
          "∨"
        );
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

    this.inclusiveDisjonctionElimination = (notA, AorB, number) => {
      AorB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(AorB, "∨");
      if (notA[0] === "~" && AorB !== "error") {
        notA = notA.substring(1);
        let B = "";
        if (notA === AorB[0]) {
          B = AorB[1];
        } else if (notA === AorB[1]) {
          B = AorB[0];
        }
        const inferenceToAdd = {
          itself: B,
          numberCommentary: number,
          commentary: "∨e"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction inclusive éliminée, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ∨e, lisez bien les instructions",
          "error-advice"
        );
      }

      // const AorB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
      //   expectedArguments[0],
      //   "∨"
      // );
      // const concA = expectedArguments[1];
      // const concB = expectedArguments[2];
      // let inferenceToAdd = {
      //   itself: "",
      //   numberCommentary: number,
      //   commentary: "∨e"
      // };
      // let proposition;

      // if (AorB[0] === concA && AorB[0] === concB) {
      //   inferenceToAdd.itself = AorB[0];
      //   proposition = "A";
      // } else if (AorB[1] === concA && AorB[1] === concB) {
      //   inferenceToAdd.itself = AorB[1];
      //   proposition = "B";
      // } else if (AorB[1] !== concA && concA === concB) {
      //   inferenceToAdd.itself = concA;
      //   proposition = "C";
      // }
      // if (inferenceToAdd.itself.length > 0) {
      //   this.props.valueInference.addInference(inferenceToAdd);
      //   this.props.valueInference.setAdvice(
      //     "Disjonction inclusive éliminée, les hypothèses A et B permettent toutes deux d'inférer " +
      //       proposition +
      //       ", qui est la nouvelle inférence : " +
      //       inferenceToAdd.itself,
      //     "rule-advice"
      //   );
      // } else {
      //   this.props.valueInference.setAdvice(
      //     "Pour utiliser la règle ∨e, lisez bien les instructions",
      //     "error-advice"
      //   );
      // }
    }; // ∨e

    this.exclusiveDisjonctionIntroduction = (ifAthenNotB, ifBthenNotA, num) => {
      let ArrayifAthenNotB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊃"
      );
      let ArrayifBthenNotA = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifBthenNotA,
        "⊃"
      );
      if (ArrayifAthenNotB.length !== 2) {
        ArrayifAthenNotB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
          ifAthenNotB,
          "⊅"
        );
        if (ArrayifAthenNotB.length === 2) {
          ArrayifAthenNotB[1] = "~" + ArrayifAthenNotB[1];
        } else {
          ArrayifAthenNotB = [];
        }
      }

      if (ArrayifBthenNotA.length !== 2) {
        ArrayifBthenNotA = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
          ifBthenNotA,
          "⊅"
        );
        if (ArrayifBthenNotA.length === 2) {
          ArrayifBthenNotA[1] = "~" + ArrayifBthenNotA[1];
        } else {
          ArrayifBthenNotA = [];
        }
      }

      if (
        ArrayifAthenNotB.length === 2 &&
        ArrayifBthenNotA.length === 2 &&
        ArrayifBthenNotA[1] === "~" + ArrayifAthenNotB[0] &&
        ArrayifAthenNotB[1] === "~" + ArrayifBthenNotA[0]
      ) {
        const eitherAeitherB =
          InferenceTools.mayAddFirstParenthesis(ArrayifAthenNotB[0]) +
          "⊻" +
          InferenceTools.mayAddFirstParenthesis(ArrayifBthenNotA[0]);
        const inferenceToAdd = {
          itself: eitherAeitherB,
          numberCommentary: num,
          commentary: "⊻i"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction exclusive introduite, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ⊻i, sélectionnez A⊅B et B⊅A puis validez.",
          "error-advice"
        );
      }
    }; // ⊻i

    this.exclusiveDisjonctionElimination = (A, eitherAeitherB, numbers) => {
      // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
      const ArrayeitherAeitherB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        eitherAeitherB,
        "⊻"
      );
      let inferenceToAdd = {
        itself: "",
        numberCommentary: numbers,
        commentary: "⊻e"
      };
      // A === A⊻B pour ~B
      if (A === ArrayeitherAeitherB[0]) {
        inferenceToAdd.itself = "~" + ArrayeitherAeitherB[1];
      }
      if (A === ArrayeitherAeitherB[1]) {
        inferenceToAdd.itself = "~" + ArrayeitherAeitherB[0];
      }
      // ~+A === ~A⊻B pour B
      if ("~" + A === ArrayeitherAeitherB[0]) {
        inferenceToAdd.itself = ArrayeitherAeitherB[1];
      }
      if ("~" + A === ArrayeitherAeitherB[1]) {
        inferenceToAdd.itself = ArrayeitherAeitherB[0];
      }
      // ~A === ~+A⊻B pour B
      if (A === "~" + ArrayeitherAeitherB[0]) {
        inferenceToAdd.itself = ArrayeitherAeitherB[1];
      }
      if (A === "~" + ArrayeitherAeitherB[1]) {
        inferenceToAdd.itself = ArrayeitherAeitherB[0];
      }

      if (inferenceToAdd.itself.length > 0) {
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction exclusive éliminée, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ⊻e, il faut une inférence A (ou ~A) et une inférence A⊻B.",
          "error-advice"
        );
      }
    }; // ⊻e

    this.conditionalIntroduction = (B, numbers) => {
      const A = this.props.valueInference.allHypotheticalInferences[0].itself; // A est déterminé par le programme : il sélectionne automatiquement l'hypothèse la plus récente encore en cours.
      let ifAthenB = InferenceTools.returnAnInferenceOutOfTwoInferences(
        A,
        B,
        "⊃"
      );
      numbers =
        this.props.valueInference.allHypotheticalInferences[0]
          .numberCommentaryHypothesis +
        "," +
        numbers; // y'a un truc à corriger ici
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
      this.props.valueInference.setRuleModal(
        "hypothesis-ended-well",
        "ended-well modal-ending"
      );
      this.props.valueInference.changeStorageBoolean();
    }; // ⊃i

    this.conditionalElimination = (A, ifAthenB, numbers) => {
      // ⊃e
      const ArrayIfAthenB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      if (ArrayIfAthenB.length === 2) {
        const antecedent = ArrayIfAthenB[0];
        let consequent = ArrayIfAthenB[1];
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

    this.biconditionalIntroduction = (ifAthenB, ifBthenA, number) => {
      const ArrayifAthenB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      const ArrayifBthenA = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifBthenA,
        "⊃"
      );
      if (
        ArrayifAthenB[0] === ArrayifBthenA[1] &&
        ArrayifAthenB[1] === ArrayifBthenA[0]
      ) {
        const AifandonlyifB = ArrayifAthenB[0] + "≡" + ArrayifAthenB[1];
        const inferenceToAdd = {
          itself: AifandonlyifB,
          numberCommentary: number,
          commentary: "≡i"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Biconditionnel introduit, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡i, sélectionnez A⊃B et B⊃A puis validez.",
          "error-advice"
        );
      }
    }; // ≡i

    this.biconditionalElimination = (AifandonlyifB, number) => {
      let leftChoice, rightChoice;
      const ArrayAifandonlyifB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        AifandonlyifB,
        "≡"
      );
      let A = ArrayAifandonlyifB[0];
      let B = ArrayAifandonlyifB[1];
      if (ArrayAifandonlyifB.length === 2) {
        if (A.length > 2) {
          A = "(" + A + ")";
        }
        if (B.length > 2) {
          B = "(" + B + ")";
        }
        leftChoice = A + "⊃" + B;
        rightChoice = B + "⊃" + A;
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "≡e");
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡e, sélectionnez A≡B.",
          "error-advice"
        );
      }
    }; // ≡e

    this.abjonctionIntroduction = (notB, numbers) => {}; // ⊅i

    this.abjonctionElimination = (A, ifAthenNotB, numbers) => {
      let ArrayifAthenNotB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊃"
      );
      if (ArrayifAthenNotB.length !== 2) {
        ArrayifAthenNotB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
          ifAthenNotB,
          "⊅"
        );
        if (ArrayifAthenNotB.length === 2) {
          ArrayifAthenNotB[1] = "~" + ArrayifAthenNotB[1];
        } else {
          ArrayifAthenNotB = [];
        }
      }
      if (ArrayifAthenNotB.length === 2) {
        const antecedent = ArrayifAthenNotB[0];
        const consequent = ArrayifAthenNotB[1];
        if (A === antecedent) {
          // si on arrive dans ce if, c'est que la règle est validée
          const inferenceToAdd = {
            itself: consequent,
            numberCommentary: numbers,
            commentary: "⊅e"
          };
          this.props.valueInference.setAdvice(
            "Abjonction éliminée, nouvelle inférence : " +
              inferenceToAdd.itself,
            "rule-advice"
          );
          this.addInferenceFromRule(inferenceToAdd);
        }
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ⊅e, il faut une inférence A et une inférence A⊅B ou A⊃~B.",
          "error-advice"
        );
      }
    }; // ⊅e

    this.incompatibilityIntroduction = (A, notB, numbers) => {
      // ↑i
      let AincompatibleB = "";
      if (
        !InferenceTools.isThereAMainOperator(notB) &&
        InferenceTools.returnNegationCount(A) <
          InferenceTools.returnNegationCount(notB)
      ) {
        // note : s'il y a un opérateur dominant, notB est forcément vraie, donc ↑i ne peut pas avoir lieu
        let B = InferenceTools.withdrawFirstCharacters(notB, 1);
        B = InferenceTools.mayRemoveFirstParenthesis(B);
        AincompatibleB = InferenceTools.returnAnInferenceOutOfTwoInferences(
          A,
          B,
          "↑"
        );
        const inferenceToAdd = {
          itself: AincompatibleB,
          numberCommentary: numbers,
          commentary: "↑i"
        };
        this.props.valueInference.setAdvice(
          "Incompatibilité introduite, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
        this.addInferenceFromRule(inferenceToAdd);
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ↑i, il faut deux inférences, l'une vraie et l'autre fausse.",
          "error-advice"
        );
      }
    }; // ↑i

    this.incompatibilityElimination = (A, AincompatibleB, numbers) => {
      const ArrayAincompatibleB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        AincompatibleB,
        "↑"
      );
      let inferenceToAdd = {
        itself: "",
        numberCommentary: numbers,
        commentary: "↑e"
      };
      // A === A↑B pour ~B
      if (A === ArrayAincompatibleB[0]) {
        inferenceToAdd.itself =
          "~" + InferenceTools.mayAddFirstParenthesis(ArrayAincompatibleB[1]);
      }
      if (A === ArrayAincompatibleB[1]) {
        inferenceToAdd.itself =
          "~" + InferenceTools.mayAddFirstParenthesis(ArrayAincompatibleB[0]);
      }

      if (inferenceToAdd.itself.length > 0) {
        // Si on arrive ici c'est que la règle est validée
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Incompatibilité éliminée, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ↑e, il faut une inférence A et une inférence A↑B.",
          "error-advice"
        );
      }
    }; // ↑e

    this.reciprocalDisjonctionIntroduction = (notA, notB, numbers) => {
      if (notA[0] === "~" && notB[0] === "~") {
        notA = notA.slice(1, notA.length);
        notB = notB.slice(1, notB.length);
        const neitherAneitherB = notA + "↓" + notB;
        const inferenceToAdd = {
          itself: neitherAneitherB,
          numberCommentary: numbers,
          commentary: "↓i"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Disjonction réciproque introduite, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ↓i, il faut deux inférences fausses.",
          "error-advice"
        );
      }
    }; // ↓i

    this.reciprocalDisjonctionElimination = (neitherAneitherB, number) => {
      neitherAneitherB = InferenceTools.returnWhatIsBeforeAndAfterTheOperator(
        neitherAneitherB,
        "↓"
      );
      if (neitherAneitherB.length === 2) {
        const leftChoice =
          "~" + InferenceTools.mayAddFirstParenthesis(neitherAneitherB[0]);
        const rightChoice =
          "~" + InferenceTools.mayAddFirstParenthesis(neitherAneitherB[1]);
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "↓e");
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ↓e, il faut une inférence A↓B puis choisir d'inférer ~A ou ~B.",
          "error-advice"
        );
      }
    }; // ↓e

    this.exFalso = (A, notA, numbers) => {
      const B = this.props.valueInference.futureInference;
      if (
        ("~" + A === notA ||
          "~" + InferenceTools.mayAddFirstParenthesis(A) === notA) &&
        B.length > 0
      ) {
        let inferenceToAdd = {
          itself: B,
          numberCommentary: numbers,
          commentary: "ex falso"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Règle ex falso utilisée, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ex falso, il faut une inférence A, une inférence ~A, et décider arbitrairement de B.",
          "error-advice"
        );
      }
    }; // ex falso

    this.reit = (A, numbers) => {
      let inferenceToAdd = {
        itself: A,
        numberCommentary: numbers,
        commentary: "reit"
      };
      this.props.valueInference.addInference(inferenceToAdd);
      this.props.valueInference.setAdvice(
        "Inférence réitérée : " + inferenceToAdd.itself,
        "rule-advice"
      );
    };

    // SECTION DES AUTRES MÉTHODES, PERMETTANT AUX MÉTHODES DES RÈGLES DE FONCTIONNER

    this.addInferenceFromRule = (InferenceItself, hyp) => {
      // règle qui crée une inférence pour toute règle dont le fonctionnement est arrivé à son terme, sans erreur
      if (hyp) {
        this.props.valueInference.addInference(InferenceItself, hyp);
      } else if (InferenceItself !== "") {
        this.props.valueInference.addInference(InferenceItself);
      }
    };

    this.redirectToTheRightRule = (ruleName, arrInf, numbers) => {
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
      } else if (ruleName === "∨i") {
        this.inclusiveDisjonctionIntroduction(arrInf[0], numbers); // A pour A∨B
      } else if (ruleName === "∨e") {
        this.inclusiveDisjonctionElimination(arrInf[0], arrInf[1], numbers); // ~A (ou ~B), A∨B, pour B (ou A)
      } else if (ruleName === "⊻i") {
        this.exclusiveDisjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A⊅B, B⊅A pour A⊻B
      } else if (ruleName === "⊻e") {
        this.exclusiveDisjonctionElimination(arrInf[0], arrInf[1], numbers); // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
      } else if (ruleName === "⊃i") {
        this.conditionalIntroduction(arrInf[0], numbers); // (A), B pour A⊃B
      } else if (ruleName === "⊃e") {
        this.conditionalElimination(arrInf[0], arrInf[1], numbers); // A, A⊃B pour B
      } else if (ruleName === "≡i") {
        this.biconditionalIntroduction(arrInf[0], arrInf[1], numbers); // A⊃B, B⊃A pour A≡B
      } else if (ruleName === "≡e") {
        this.biconditionalElimination(arrInf[0], numbers); // A≡B pour A⊃B ou B⊃A
      } else if (ruleName === "⊅i") {
        this.abjonctionIntroduction(arrInf[0], numbers); // (A), B pour A⊅B
      } else if (ruleName === "⊅e") {
        this.abjonctionElimination(arrInf[0], arrInf[1], numbers); // A, A⊅B pour ~B
      } else if (ruleName === "↑i") {
        this.incompatibilityIntroduction(arrInf[0], arrInf[1], numbers); // A, ~B, pour A↑B
      } else if (ruleName === "↑e") {
        this.incompatibilityElimination(arrInf[0], arrInf[1], numbers); // A, A↑B pour ~B
      } else if (ruleName === "↓i") {
        this.reciprocalDisjonctionIntroduction(arrInf[0], arrInf[1], numbers); // ~A, ~B, pour A↓B
      } else if (ruleName === "↓e") {
        this.reciprocalDisjonctionElimination(arrInf[0], numbers); // A↓B pour ~A ou ~B
      } else if (ruleName === "ex falso") {
        this.exFalso(arrInf[0], arrInf[1], numbers); // A, ~A pour B
      } else if (ruleName === "reit") {
        this.reit(arrInf[0], numbers); // A, A
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
      } else if (ruleName === "≡e") {
        verbalRuleName = "Biconditionnel éliminé";
      } else if (ruleName === "↓e") {
        verbalRuleName = "Disjonction réciproque éliminée";
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
              // leftChoice,
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
              // rightChoice,
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

    // this.makeACommutatedInference = inference => {
    //   // n'est utilisé que pour ∧e, ⊻e, ≡e, ↓e (et pourrait l'être pour ∨e)

    //   return "pandq";
    // };

    this.state = {
      // negationIntroduction: this.negationIntroduction, // ~i
      // negationElimination: this.negationElimination, // ~~e
      // conjonctionIntroduction: this.conjonctionIntroduction, // ∧i
      // conjonctionElimination: this.conjonctionElimination, // ∧e
      // inclusiveDisjonctionIntroduction: this.inclusiveDisjonctionIntroduction, // ∨i
      // inclusiveDisjonctionElimination: this.inclusiveDisjonctionElimination, // ∨e
      // exclusiveDisjonctionIntroduction: this.exclusiveDisjonctionIntroduction, // ⊻i
      // exclusiveDisjonctionElimination: this.exclusiveDisjonctionElimination, // ⊻e
      // conditionalIntroduction: this.conditionalIntroduction, // ⊃i
      // conditionalElimination: this.conditionalElimination, // ⊃e
      // biconditionalIntroduction: this.biconditionalIntroduction, // ≡i
      // biconditionalElimination: this.biconditionalElimination, // ≡e
      // abjonctionIntroduction: this.abjonctionIntroduction, // ⊅i
      // abjonctionElimination: this.abjonctionElimination, // ⊅e
      // incompatibilityIntroduction: this.incompatibilityIntroduction, // ↑i
      // incompatibilityElimination: this.incompatibilityElimination, // ↑e
      // exFalso: this.exFalso,
      // reit: this.reit,
      addInferenceFromRule: this.addInferenceFromRule,
      redirectToTheRightRule: this.redirectToTheRightRule,
      showChoiceOnTheModal: this.showChoiceOnTheModal
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
