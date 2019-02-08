import React, { createContext, Component } from "react";

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
      console.log("étape 2", notB, "!==", notBbecomeB);
      notBbecomeB = this.mayRemoveFirstParenthesis(notBbecomeB);
      console.log("étape 3", B, "===", notBbecomeB);
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
        this.props.valueInference.setRuleModal("", "ended-well modal-ending");
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
            ", qui est la nouvelle inférence : " +
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

    this.exclusiveDisjonctionIntroduction = (ifAthenNotB, ifBthenNotA, num) => {
      let ArrayifAthenNotB = this.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊃"
      );
      let ArrayifBthenNotA = this.returnWhatIsBeforeAndAfterTheOperator(
        ifBthenNotA,
        "⊃"
      );
      if (ArrayifAthenNotB.length !== 2) {
        ArrayifAthenNotB = this.returnWhatIsBeforeAndAfterTheOperator(
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
        ArrayifBthenNotA = this.returnWhatIsBeforeAndAfterTheOperator(
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
          this.mayAddFirstParenthesis(ArrayifAthenNotB[0]) +
          "⊻" +
          this.mayAddFirstParenthesis(ArrayifBthenNotA[0]);
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
      const ArrayeitherAeitherB = this.returnWhatIsBeforeAndAfterTheOperator(
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
      let ifAthenB = this.returnAnInferenceOutOfTwoInferences(A, B, "⊃");
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
      this.props.valueInference.setRuleModal("", "ended-well modal-ending");
      this.props.valueInference.changeStorageBoolean();
    }; // ⊃i

    this.conditionalElimination = (A, ifAthenB, numbers) => {
      // ⊃e
      const ArrayIfAthenB = this.returnWhatIsBeforeAndAfterTheOperator(
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
      const ArrayifAthenB = this.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenB,
        "⊃"
      );
      const ArrayifBthenA = this.returnWhatIsBeforeAndAfterTheOperator(
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
      const ArrayAifandonlyifB = this.returnWhatIsBeforeAndAfterTheOperator(
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

    this.abjonctionIntroduction = (notB, numbers) => {
      if (notB[0] === "~") {
        const A = this.props.valueInference.allHypotheticalInferences[0].itself; // A est déterminé par le programme : il sélectionne automatiquement l'hypothèse la plus récente encore en cours.
        const B = notB.slice(1, notB.length);
        let ifAthenNotB = this.returnAnInferenceOutOfTwoInferences(A, B, "⊅");
        numbers =
          this.props.valueInference.allHypotheticalInferences[0]
            .numberCommentaryHypothesis +
          "," +
          numbers; // y'a un truc à corriger ici
        const inferenceToAdd = {
          itself: ifAthenNotB,
          numberCommentary: numbers,
          commentary: "⊅i"
        };
        this.props.valueInference.setAdvice(
          "Hypothèse validée par ⊅i, introduction de l'abjonction, inférence produite : " +
            inferenceToAdd.itself,
          "rule-advice"
        );
        const hyp = "hypothèse validée";
        this.props.valueInference.addInference(inferenceToAdd, hyp);
        this.props.valueInference.setRuleModal("", "ended-well modal-ending");
        this.props.valueInference.changeStorageBoolean();
      } else {
        this.props.valueInference.setAdvice(
          "Pour utiliser ⊅i, il faut créer une hypothèse A et cliquer sur une inférence ~B en son sein.",
          "error-advice"
        );
      }
    }; // ⊅i

    this.abjonctionElimination = (A, ifAthenNotB, numbers) => {
      let ArrayifAthenNotB = this.returnWhatIsBeforeAndAfterTheOperator(
        ifAthenNotB,
        "⊃"
      );
      if (ArrayifAthenNotB.length !== 2) {
        ArrayifAthenNotB = this.returnWhatIsBeforeAndAfterTheOperator(
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

    this.incompatibilityIntroduction = (A, B, numbers) => {
      // ↑i
      let Anegationcount = 0,
        Bnegationcount = 0;
      for (let i = 0; i < A.length; i++) {
        if (A[i] === "~") {
          Anegationcount++;
        } else {
          i = i + A.length;
        }
      }
      for (let i = 0; i < B.length; i++) {
        if (B[i] === "~") {
          Bnegationcount++;
        } else {
          i = i + B.length;
        }
      }

      if (Anegationcount !== Bnegationcount) {
        let AincompatibleB;
        if (Anegationcount > Bnegationcount) {
          A = A.slice(1, A.length);
          AincompatibleB = this.returnAnInferenceOutOfTwoInferences(A, B, "↑");
        } else if (Bnegationcount > Anegationcount) {
          B = B.slice(1, B.length);
          AincompatibleB = this.returnAnInferenceOutOfTwoInferences(A, B, "↑");
        }
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
          "Pour utiliser ↑e, il faut deux inférences, l'une vraie et l'autre fausse.",
          "error-advice"
        );
      }
    }; // ↑i

    this.incompatibilityElimination = (A, AincompatibleB, numbers) => {
      const ArrayAincompatibleB = this.returnWhatIsBeforeAndAfterTheOperator(
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
          "~" + this.mayAddFirstParenthesis(ArrayAincompatibleB[1]);
      }
      if (A === ArrayAincompatibleB[1]) {
        inferenceToAdd.itself =
          "~" + this.mayAddFirstParenthesis(ArrayAincompatibleB[0]);
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
          "Pour utiliser ↓e, il faut deux inférences fausses.",
          "error-advice"
        );
      }
    }; // ↓i

    this.reciprocalDisjonctionElimination = (neitherAneitherB, number) => {
      neitherAneitherB = this.returnWhatIsBeforeAndAfterTheOperator(
        neitherAneitherB,
        "↓"
      );
      if (neitherAneitherB.length === 2) {
        const leftChoice =
          "~" + this.mayAddFirstParenthesis(neitherAneitherB[0]);
        const rightChoice =
          "~" + this.mayAddFirstParenthesis(neitherAneitherB[1]);
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
        ("~" + A === notA || "~" + this.mayAddFirstParenthesis(A) === notA) &&
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
    };

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
        this.inclusiveDisjonctionElimination(arrInf, numbers); // A∨B + conc de |A + conc de |B, pour A ou B
      } else if (ruleName === "⊻i") {
        this.exclusiveDisjonctionIntroduction(arrInf[0], arrInf[1], numbers); // A⊅B, B⊅A pour A⊻B
      } else if (ruleName === "⊻e") {
        this.exclusiveDisjonctionElimination(arrInf[0], arrInf[1], numbers); // A, A⊻B pour ~B (ou ~A, A⊻B, pour B)
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

    this.mayAddFirstParenthesis = inference => {
      if (inference.length > 2 && inference[0] !== "~") {
        inference = "(" + inference + ")";
      }
      return inference;
    };

    this.mayRemoveFirstParenthesis = inference => {
      let newInference = inference;
      if (inference[0] === "(") {
        newInference = "";
        for (let i = 1; i < inference.length - 1; i++) {
          newInference = newInference + inference[i];
        }
      }
      return newInference;
    };

    this.returnWhatIsBeforeAndAfterTheOperator = (str, operator) => {
      // Cette fonction a plusieurs intérêts. Elle n'est utilisée que dans certaines règles d'élimination d'opérateur. 1) D'abord, elle reçoit un str contenant une inférence dans sa totalité. 2) Elle vérifie ensuite où commence et où termine la première parenthèse. En faisant cela, elle repère le positionnement de l'opérateur principal (celui hors de toute parenthèse). 3) Elle ajoute alors tout ce qui précède cet opérateur, à un tableau à entrées. 4) Ensuite elle poursuit l'exploration de la string et finit par ajouter ce qui précède à l'opérateur à la deuxième entrée du tableau. 5) Finalement, returnWhatIsBeforeAndAfterTheOperator doit retourner un tableau contenant les deux parties, en retirant les premières parenthèses si elles en avaient.
      // consolelog(str.indexOf(operator));
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
        // consolelog(arrayToReturn);
        if (arrayToReturn.length === 2) {
          for (let i = 0; i < 2; i++) {
            let noFirstParenthesis = "";
            if (arrayToReturn[i][0] === "(") {
              for (let j = 1; j < arrayToReturn[i].length - 1; j++) {
                noFirstParenthesis = noFirstParenthesis + arrayToReturn[i][j];
              }
              arrayToReturn[i] = noFirstParenthesis;
            }
          }
        } else {
          arrayToReturn = "error";
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
      mayAddFirstParenthesis: this.mayAddFirstParenthesis,
      mayRemoveFirstParenthesis: this.mayRemoveFirstParenthesis,
      returnWhatIsBeforeAndAfterTheOperator: this
        .returnWhatIsBeforeAndAfterTheOperator,
      returnAnInferenceOutOfTwoInferences: this
        .returnAnInferenceOutOfTwoInferences,
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
