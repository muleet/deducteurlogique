import React, { createContext, Component } from "react";
import InfTools from "./Components/InferenceTools";

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
      notBbecomeB = InfTools.mayRemoveParenthesis(notBbecomeB);
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
        // this.props.valueInference.setRuleModal(
        //   "hypothesis-ended-well",
        //   "ended-well modal-ending"
        // );
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
        notnotA = InfTools.withdrawFirstCharacters(notnotA, 2);
        A = InfTools.mayRemoveParenthesis(notnotA);
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
      let AandB = InfTools.returnAnInferenceOutOfTwoInferences(A, B, "∧", true);
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
      const arrayTwoChoices = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        AandB,
        "∧"
      );
      if (arrayTwoChoices !== "error") {
        const leftChoice = arrayTwoChoices[0];
        const rightChoice = arrayTwoChoices[1];
        return this.showChoiceOnTheModal(leftChoice, rightChoice, number, "∧e");
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ∧e, il faut sélectionner une inférence de forme A∧B.",
          "error-advice"
        );
      }
    }; // ∧e

    this.inclusiveDisjonctionIntroduction = (A, number) => {
      const B = this.props.valueInference.futureInference;
      let ArbitraryAorB;
      if (!this.props.valueInference.inversion) {
        ArbitraryAorB = InfTools.returnAnInferenceOutOfTwoInferences(A, B, "∨");
      } else {
        ArbitraryAorB = InfTools.returnAnInferenceOutOfTwoInferences(B, A, "∨");
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
      AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(AorB, "∨");
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
          "Pour utiliser la règle ∨e, il faut une inférence ~A (ou ~B), et une inférence A∨B.",
          "error-advice"
        );
      }
    }; // ∨e

    this.inclusiveDisjonctionSyllogisticalElimination = () => {
      // ∨e'
      // const AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      //   expectedArguments[0],
      //   "∨"
      // );
      // const concA = expectedArguments[1];
      // const concB = expectedArguments[2];
      // let inferenceToAdd = {
      //   itself: "",
      //   numberCommentary: number,
      //   commentary: "∨e'"
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
      //     "Pour utiliser la règle ∨e', lisez attentivement les instructions.",
      //     "error-advice"
      //   );
      // }
    }; // ∨e'

    this.exclusiveDisjonctionIntroduction = (ifAthenNotB, ifBthenNotA, num) => {
      let ArrayifAthenNotB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊃"
      );
      let ArrayifBthenNotA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifBthenNotA,
        "⊃"
      );
      if (ArrayifAthenNotB.length !== 2) {
        ArrayifAthenNotB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
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
        ArrayifBthenNotA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
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
          InfTools.mayAddParenthesis(ArrayifAthenNotB[0]) +
          "⊻" +
          InfTools.mayAddParenthesis(ArrayifBthenNotA[0]);
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
      const eitherA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
          eitherAeitherB,
          "⊻"
        )[0],
        eitherB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
          eitherAeitherB,
          "⊻"
        )[1];
      let inferenceToAdd = {
        itself: "",
        numberCommentary: numbers,
        commentary: "⊻e"
      };
      // résultat : ~B [A et A ; ~A et ~A]
      if (A === eitherA) {
        inferenceToAdd.itself = "~" + InfTools.mayAddParenthesis(eitherB);
      }

      // résultat : B [~A et A ; A et ~A ; ~(A∧C) et A∧C]
      if (
        "~" + InfTools.mayAddParenthesis(A) === eitherA ||
        A === "~" + InfTools.mayAddParenthesis(eitherA)
      ) {
        inferenceToAdd.itself = eitherB;
      }

      // résultat : ~A [B et B ; ~B et ~B]
      if (A === eitherB) {
        inferenceToAdd.itself = "~" + InfTools.mayAddParenthesis(eitherA);
      }

      // résultat : A [~B et B ; B et ~B ; ~(B∧C) et B∧C]
      if (
        "~" + InfTools.mayAddParenthesis(A) === eitherB ||
        A === "~" + InfTools.mayAddParenthesis(eitherB)
      ) {
        inferenceToAdd.itself = eitherA;
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
      let ifAthenB = InfTools.returnAnInferenceOutOfTwoInferences(A, B, "⊃");
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
      // this.props.valueInference.setRuleModal(
      //   "hypothesis-ended-well",
      //   "ended-well modal-ending"
      // );
      this.props.valueInference.changeStorageBoolean();
    }; // ⊃i

    this.conditionalElimination = (A, ifAthenB, numbers) => {
      // ⊃e
      const ArrayIfAthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      if (ArrayIfAthenB.length === 2) {
        const antecedent = ArrayIfAthenB[0];
        const consequent = ArrayIfAthenB[1];
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

    this.contraposalConditionalElimination = (notB, ifAthenB, numbers) => {
      // ⊂e
      const ArrayIfAthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      if (ArrayIfAthenB.length === 2) {
        const antecedent = ArrayIfAthenB[0];
        const consequent = ArrayIfAthenB[1];
        if ("~" + consequent === notB) {
          // si on arrive dans ce if, c'est que la règle est validée
          const inferenceToAdd = {
            itself: "~" + InfTools.mayAddParenthesis(antecedent),
            numberCommentary: numbers,
            commentary: "⊂e"
          };
          this.props.valueInference.setAdvice(
            "Contraposée du conditionnel éliminée, nouvelle inférence : " +
              inferenceToAdd.itself,
            "rule-advice"
          );
          this.addInferenceFromRule(inferenceToAdd);
        } else {
          this.props.valueInference.setAdvice(
            "Pour utiliser ⊂e, ~B doit être identique dans les propositions ~B et A⊃B.",
            "error-advice"
          );
        }
      }
    }; // ⊂e

    this.biconditionalIntroduction = (ifAthenB, ifBthenA, number) => {
      const ArrayifAthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      const ArrayifBthenA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
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

    this.biconditionalElimination = (A, AifandonlyifB, number) => {
      // ≡e
      let B = "";
      AifandonlyifB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        AifandonlyifB,
        "≡"
      );
      if (A === AifandonlyifB[0]) {
        B = AifandonlyifB[1];
      } else if (A === AifandonlyifB[1]) {
        B = AifandonlyifB[0];
      }
      if (B) {
        const inferenceToAdd = {
          itself: B,
          numberCommentary: number,
          commentary: "≡e"
        };
        this.props.valueInference.addInference(inferenceToAdd);
        this.props.valueInference.setAdvice(
          "Biconditionnel introduit, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡e, sélectionnez A ou B puis A≡B.",
          "error-advice"
        );
      }
    }; // ≡e

    this.biconditionalAlternativeElimination = (AifandonlyifB, number) => {
      // ≡e'
      let leftChoice, rightChoice;
      const ArrayAifandonlyifB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        AifandonlyifB,
        "≡"
      );
      let A = ArrayAifandonlyifB[0];
      let B = ArrayAifandonlyifB[1];
      if (ArrayAifandonlyifB.length === 2) {
        A = InfTools.mayAddParenthesis(A);
        B = InfTools.mayAddParenthesis(B);
        leftChoice = A + "⊃" + B;
        rightChoice = B + "⊃" + A;
        return this.showChoiceOnTheModal(
          leftChoice,
          rightChoice,
          number,
          "≡e'"
        );
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser la règle ≡e', sélectionnez A≡B.",
          "error-advice"
        );
      }
    }; // ≡e'

    this.abjonctionIntroduction = (A, notB, numbers) => {
      if (
        InfTools.returnNegationCount(A) < InfTools.returnNegationCount(notB)
      ) {
        // si on arrive dans ce if, c'est que la règle est validée
        notB = InfTools.withdrawFirstCharacters(notB, 1);
        const AabjonctionB = InfTools.returnAnInferenceOutOfTwoInferences(
          A,
          notB,
          "⊅"
        );
        const inferenceToAdd = {
          itself: AabjonctionB,
          numberCommentary: numbers,
          commentary: "⊅i"
        };
        this.props.valueInference.setAdvice(
          "Abjonction introduite, nouvelle inférence : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
        this.addInferenceFromRule(inferenceToAdd);
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ⊅i, il faut une inférence A et une inférence ~B.",
          "error-advice"
        );
      }
    }; // ⊅i

    this.abjonctionElimination = (A, AabjonctionB, numbers) => {
      AabjonctionB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        AabjonctionB,
        "⊅"
      );
      if (A === AabjonctionB[0]) {
        // si on arrive dans ce if, c'est que la règle est validée
        const notB = "~" + InfTools.mayAddParenthesis(AabjonctionB[1]);
        const inferenceToAdd = {
          itself: notB,
          numberCommentary: numbers,
          commentary: "⊅e"
        };
        this.props.valueInference.setAdvice(
          "Abjonction éliminée, nouvelle inférence : " + inferenceToAdd.itself,
          "rule-advice"
        );
        this.addInferenceFromRule(inferenceToAdd);
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ⊅e, il faut une inférence A et une inférence A⊅B.",
          "error-advice"
        );
      }
    }; // ⊅e

    this.abjonctionContraposalElimination = (B, ifAthenNotB, numbers) => {
      // ⊄e
      ifAthenNotB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊅"
      );
      if (B === ifAthenNotB[1]) {
        // si on arrive dans ce if, c'est que la règle est validée
        const A = "~" + InfTools.mayAddParenthesis(ifAthenNotB[0]);
        const inferenceToAdd = {
          itself: A,
          numberCommentary: numbers,
          commentary: "⊄e"
        };
        this.props.valueInference.setAdvice(
          "Abjonction éliminée, nouvelle inférence : " + inferenceToAdd.itself,
          "rule-advice"
        );
        this.addInferenceFromRule(inferenceToAdd);
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ⊄e, il faut une inférence B et une inférence A⊅B.",
          "error-advice"
        );
      }
    }; // ⊄e

    this.incompatibilityIntroduction = (A, notB, numbers) => {
      // ↑i
      let AincompatibleB = "";
      if (
        !InfTools.isThereAMainOperator(notB) &&
        InfTools.returnNegationCount(A) < InfTools.returnNegationCount(notB)
      ) {
        // note : s'il y a un opérateur dominant, notB est forcément vraie, donc ↑i ne peut pas avoir lieu
        let B = InfTools.withdrawFirstCharacters(notB, 1);
        AincompatibleB = InfTools.returnAnInferenceOutOfTwoInferences(
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
      const ArrayAincompatibleB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
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
          "~" + InfTools.mayAddParenthesis(ArrayAincompatibleB[1]);
      }
      if (A === ArrayAincompatibleB[1]) {
        inferenceToAdd.itself =
          "~" + InfTools.mayAddParenthesis(ArrayAincompatibleB[0]);
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
        notA = InfTools.withdrawFirstCharacters(notA, 1);
        notB = InfTools.withdrawFirstCharacters(notB, 1);
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
      neitherAneitherB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        neitherAneitherB,
        "↓"
      );
      if (neitherAneitherB.length === 2) {
        const leftChoice =
          "~" + InfTools.mayAddParenthesis(neitherAneitherB[0]);
        const rightChoice =
          "~" + InfTools.mayAddParenthesis(neitherAneitherB[1]);
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
      if (InfTools.mayAddParenthesis(A) === notA && B.length > 0) {
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

    this.addInferenceFromRule = (inferenceToAdd, hyp, secondInferenceToAdd) => {
      // règle qui crée une inférence pour toute règle dont le fonctionnement est arrivé à son terme, sans erreur
      if (hyp) {
        this.props.valueInference.addInference(inferenceToAdd, hyp);
      } else if (inferenceToAdd !== "") {
        this.props.valueInference.addInference(
          inferenceToAdd,
          "",
          secondInferenceToAdd
        );
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
      } else if (ruleName === "∨e'") {
        this.inclusiveDisjonctionSyllogisticalElimination(arrInf, numbers); // ??????
      } else if (ruleName === "⊻i") {
        this.exclusiveDisjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A⊅B, B⊅A pour A⊻B
      } else if (ruleName === "⊻e") {
        this.exclusiveDisjonctionElimination(arrInf[0], arrInf[1], numbers); // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
      } else if (ruleName === "⊃i") {
        this.conditionalIntroduction(arrInf[0], numbers); // (A), B pour A⊃B
      } else if (ruleName === "⊃e") {
        this.conditionalElimination(arrInf[0], arrInf[1], numbers); // A, A⊃B pour B
      } else if (ruleName === "⊂e") {
        this.contraposalConditionalElimination(arrInf[0], arrInf[1], numbers); // ~B, A⊃B pour ~A
      } else if (ruleName === "≡i") {
        this.biconditionalIntroduction(arrInf[0], arrInf[1], numbers); // A⊃B, B⊃A pour A≡B
      } else if (ruleName === "≡e") {
        this.biconditionalElimination(arrInf[0], arrInf[1], numbers); // A (ou B) et A≡B pour B (ou A)
      } else if (ruleName === "≡e'") {
        this.biconditionalAlternativeElimination(arrInf[0], numbers); // A≡B pour A⊃B ou B⊃A
      } else if (ruleName === "⊅i") {
        this.abjonctionIntroduction(arrInf[0], arrInf[1], numbers); // (A), B pour A⊅B
      } else if (ruleName === "⊅e") {
        this.abjonctionElimination(arrInf[0], arrInf[1], numbers); // A, A⊅B pour ~B
      } else if (ruleName === "⊄e") {
        this.abjonctionContraposalElimination(arrInf[0], arrInf[1], numbers); // ~B, A⊅B pour A
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
      } else if (ruleName === "≡e'") {
        verbalRuleName = "Biconditionnel éliminé par la règle alternative";
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
        ),
        rightSide = (
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
        ),
        leftRightSide = (
          <div
            className="rule-modal-one-choice selectable"
            onClick={() => {
              this.addInferenceFromRule(
                leftInferenceToAdd,
                "",
                rightInferenceToAdd
              );
              this.props.valueInference.setAdvice(
                verbalRuleName +
                  ", nouvelles inférences : " +
                  leftInferenceToAdd.itself +
                  " et " +
                  rightInferenceToAdd.itself,
                // rightChoice,
                "rule-advice"
              );
            }}
          >
            les deux
          </div>
        );

      choiceContent = (
        <div className="rule-modal-all-choices">
          <p style={{ fontSize: "16px" }}>Choix :</p>
          {leftSide}
          {rightSide}
          {leftRightSide}
        </div>
      );
      this.props.valueInference.setChoiceContent(choiceContent);
    };

    this.state = {
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
