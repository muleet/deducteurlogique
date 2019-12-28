// import React from "react";
import InfTools from "./InferenceTools";

function InferenceForecaster(storedInferences, storedNumbers, ruleName, value) {
  // 0. déclaration des variables
  let result = { itself: "", activable: false },
    A = "?",
    B = "?";
  const oneStepRules = ["rep", "~~e", "∧e", "⊃i", "≡e'", "↓e", "reit"];
  const twoStepRules = [
    "⊃e",
    "⊂e",
    "∧i",
    "~i",
    "∨e",
    "⊻i",
    "⊻e",
    "⊅i",
    "⊅e",
    "⊄e",
    "≡i",
    "≡e",
    "↑i",
    "↑e",
    "↓i",
    "∨e'",
    "∨i",
    "ex falso"
  ];

  if (value && value.otherInterpretation[0] === "active") {
    ruleName = value.ruleModalContent.otherInterpretation.ruleName;
  }

  // // 1.a début de la prise des futures valeurs de probableInference, à l'aide de storedInferences
  if (storedInferences) {
    if (storedInferences[0]) {
      A = storedInferences[0];
    }
    if (storedInferences[1]) {
      B = storedInferences[1];
    }
    // 1.b mise en forme finale de probable inference
    if (storedInferences[0] === "reset") {
      result.itself = "prochaine inférence";
      result.activable = true;
    } else if (ruleName) {
      if (oneStepRules.indexOf(ruleName) !== -1) {
        result = scanOneStepRule(
          ruleName,
          A,
          value.allHypotheticalInferences,
          value.inversion
        );
      } else if (twoStepRules.indexOf(ruleName) !== -1) {
        result = scanTwoStepRule(
          ruleName,
          A,
          B,
          value.allHypotheticalInferences,
          value.inversion
        );
      } else if (ruleName === "hyp") {
        // result.itself = value.futureInference;
        result.activable = true;
      }
    }
  }
  // 2. finalisation avec forecastInference()
  // arguments attendus pour la méthode ci-dessous : forecastInference(active,A,B,operator,commentary,numberCommentary)
  if (result.activable) {
    value.forecastInference(
      true, // active
      result.itself, // itself
      ruleName, // commentary
      storedNumbers, // numberCommentary,
      result.activable // activable
    );
  } else {
    value.forecastInference(
      false // active
      // result.itself, // itself
      // ruleName, // commentary
      // storedNumbers, // numberCommentary,
      // result.activable // activable
    );
  }
}

function scanOneStepRule(ruleName, inference, allHypotheticalInferences) {
  let objectToReturn = { itself: "?", activable: false };

  if (ruleName === "rep") {
    if (inference) {
      objectToReturn.itself = inference;
    }
  } else if (ruleName === "~~e") {
    // ~~A pour A
    if (inference[0] === "~" && inference[1] === "~") {
      inference = InfTools.withdrawFirstCharacters(inference, 2);
      objectToReturn.itself = InfTools.mayRemoveParenthesis(inference);
    }
  } else if (ruleName === "∧e") {
    //  A∧B pour A ou B
    let AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(inference, "∧");
    if (AorB !== "error") {
      objectToReturn.itself = AorB[0] + " ou " + AorB[1];
    }
  } else if (ruleName === "⊃i") {
    // (A), B pour A⊃B
    let A = "?",
      B = "?";
    if (allHypotheticalInferences[0]) {
      A = allHypotheticalInferences[0].itself;
    }
    if (inference) {
      B = inference;
    }
    objectToReturn.itself =
      InfTools.mayAddParenthesis(A) + "⊃" + InfTools.mayAddParenthesis(B);
  } else if (ruleName === "≡e'") {
    // A≡B pour A⊃B ou B⊃A
    inference = InfTools.returnWhatIsBeforeAndAfterTheOperator(inference, "≡");
    if (inference !== "error") {
      const A = InfTools.mayAddParenthesis(inference[0]),
        B = InfTools.mayAddParenthesis(inference[1]);
      objectToReturn.itself = A + "⊃" + B + " ou " + B + "⊃" + A;
    }
  } else if (ruleName === "↓e") {
    // A↓B pour ~A ou ~B
    const neitherAnorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      "↓"
    );
    if (neitherAnorB !== "error") {
      const A = InfTools.mayAddParenthesis(neitherAnorB[0]),
        B = InfTools.mayAddParenthesis(neitherAnorB[1]);
      objectToReturn.itself = "~" + A + " ou ~" + B;
    }
  } else if (ruleName === "reit") {
    // A pour A
    if (inference) {
      objectToReturn.itself = inference;
    }
  }
  if (objectToReturn.itself !== "?") {
    objectToReturn.activable = true;
  }
  return objectToReturn;
}

function scanTwoStepRule(
  ruleName,
  inferenceOne,
  inferenceTwo,
  allHypotheticalInferences,
  inversion
) {
  // "⊃e" "⊂e" "~i" "≡i"  "⊻i" "⊻e" "⊅i" "⊅e" "↑i" "↑e" "↓i" "∨e" "∨e'" "ex falso"
  let objectToReturn = { itself: "?", activable: false };

  if (ruleName === "⊃e") {
    // A, A⊃B pour B
    if (
      inferenceOne ===
      InfTools.returnWhatIsBeforeAndAfterTheOperator(inferenceTwo, "⊃")[0]
    ) {
      objectToReturn.itself = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceTwo,
        "⊃"
      )[1];
    }
  } else if (ruleName === "⊂e") {
    // ~B, A⊃B pour ~A
    let A = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceTwo,
        "⊃"
      )[0],
      B = InfTools.returnWhatIsBeforeAndAfterTheOperator(inferenceTwo, "⊃")[1];
    A = InfTools.mayAddParenthesis(A);
    B = InfTools.mayAddParenthesis(B);
    if (inferenceOne === "~" + B) {
      objectToReturn.itself = "~" + A;
    }
  } else if (ruleName === "∧i") {
    // A, B pour A∧B
    if (inferenceOne && inferenceTwo) {
      objectToReturn.itself =
        InfTools.mayAddParenthesis(inferenceOne) +
        "∧" +
        InfTools.mayAddParenthesis(inferenceTwo);
    }
  } else if (ruleName === "~i") {
    // B, ~B, pour réfuter l'hypothèse (A)
    if (inferenceTwo === "~" + inferenceOne) {
      objectToReturn.itself = "~" + allHypotheticalInferences[0].itself;
    }
  } else if (ruleName === "≡e") {
    // A (ou B) et A≡B ou B (ou A)
    const AifandonlyifB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "≡"
    );
    if (inferenceOne === AifandonlyifB[0]) {
      objectToReturn.itself = InfTools.mayAddParenthesis(AifandonlyifB[1]);
    } else if (inferenceOne === AifandonlyifB[1]) {
      objectToReturn.itself = InfTools.mayAddParenthesis(AifandonlyifB[0]);
    }
  } else if (ruleName === "≡i") {
    // A⊃B, B⊃A pour A≡B
    const ifAthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceOne,
        "⊃"
      ),
      ifBthenA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceTwo,
        "⊃"
      );
    if (ifAthenB[0] === ifBthenA[1] && ifAthenB[1] === ifBthenA[0]) {
      objectToReturn.itself = ifAthenB[0] + "≡" + ifBthenA[0];
    }
  } else if (ruleName === "⊻i") {
    // A⊅B, B⊅A pour A⊻B
    const ifAthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceOne,
        "⊅"
      ),
      ifBthenA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
        inferenceTwo,
        "⊅"
      );
    if (ifAthenB[0] === ifBthenA[1] && ifAthenB[1] === ifBthenA[0]) {
      objectToReturn.itself = ifAthenB[0] + "⊻" + ifBthenA[0];
    }
  } else if (ruleName === "⊻e") {
    // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
    const eitherA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊻"
    )[0];
    const eitherB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊻"
    )[1];
    // résultat : ~B [A et A ; ~A et ~A]
    if (inferenceOne === eitherA) {
      objectToReturn.itself = "~" + InfTools.mayAddParenthesis(eitherB);
    }

    // résultat : B [~A et A ; A et ~A ; ~(A∧C) et A∧C]
    if (
      "~" + InfTools.mayAddParenthesis(inferenceOne) === eitherA ||
      inferenceOne === "~" + InfTools.mayAddParenthesis(eitherA)
    ) {
      objectToReturn.itself = eitherB;
    }

    // résultat : ~A [B et B ; ~B et ~B]
    if (inferenceOne === eitherB) {
      objectToReturn.itself = "~" + InfTools.mayAddParenthesis(eitherA);
    }

    // résultat : A [~B et B ; B et ~B ; ~(B∧C) et B∧C]
    if (
      "~" + InfTools.mayAddParenthesis(inferenceOne) === eitherB ||
      inferenceOne === "~" + InfTools.mayAddParenthesis(eitherB)
    ) {
      objectToReturn.itself = eitherA;
    }
  } else if (ruleName === "⊅i") {
    // A, ~B pour A⊅B
    if (
      InfTools.returnNegationCount(inferenceOne) <
      InfTools.returnNegationCount(inferenceTwo)
    ) {
      inferenceTwo = InfTools.withdrawFirstCharacters(inferenceTwo, 1);
      objectToReturn.itself = InfTools.returnAnInferenceOutOfTwoInferences(
        inferenceOne,
        inferenceTwo,
        "⊅"
      );
    }
  } else if (ruleName === "⊅e") {
    // A, A⊅B pour ~B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊅"
    );
    if (inferenceTwo[0] === inferenceOne) {
      objectToReturn.itself = "~" + InfTools.mayAddParenthesis(inferenceTwo[1]);
    }
  } else if (ruleName === "⊄e") {
    // B, A⊅B pour ~A
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊅"
    );
    if (inferenceTwo[1] === inferenceOne) {
      objectToReturn.itself = "~" + InfTools.mayAddParenthesis(inferenceTwo[0]);
    }
  } else if (ruleName === "↑i") {
    // A, ~B, pour A↑B
    if (inferenceTwo[0] === "~") {
      inferenceTwo = InfTools.withdrawFirstCharacters(inferenceTwo, 1);
      objectToReturn.itself = InfTools.returnAnInferenceOutOfTwoInferences(
        inferenceOne,
        inferenceTwo,
        "↑"
      );
    }
  } else if (ruleName === "↑e") {
    // A, A↑B pour ~B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "↑"
    );
    if (inferenceOne === inferenceTwo[0]) {
      objectToReturn.itself = "~" + inferenceTwo[1];
    } else if (inferenceOne === inferenceTwo[1]) {
      objectToReturn.itself = "~" + inferenceTwo[0];
    }
  } else if (ruleName === "↓i") {
    // ~A, ~B, pour A↓B
    if (inferenceOne[0] === "~" && inferenceTwo[0] === "~") {
      inferenceOne = inferenceOne.substring(1);
      inferenceTwo = inferenceTwo.substring(1);
      objectToReturn.itself = inferenceOne + "↓" + inferenceTwo;
    }
  } else if (ruleName === "∨i") {
    // A pour A∨B
    if (inferenceOne && inferenceTwo) {
      inferenceOne = InfTools.mayAddParenthesis(inferenceOne);
      inferenceTwo = InfTools.mayAddParenthesis(inferenceTwo);
      if (!inversion) {
        objectToReturn.itself = inferenceOne + "∨" + inferenceTwo;
      } else {
        objectToReturn.itself = inferenceTwo + "∨" + inferenceOne;
      }
    }
  } else if (ruleName === "∨e") {
    // ~A (ou ~B), A∨B pour A (ou B)
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "∨"
    );
    if (inferenceOne[0] === "~") {
      inferenceOne = inferenceOne.substring(1);
      if (inferenceOne === inferenceTwo[0]) {
        objectToReturn.itself = inferenceTwo[1];
      } else if (inferenceOne === inferenceTwo[1]) {
        objectToReturn.itself = inferenceTwo[0];
      }
    }
  } else if (ruleName === "∨e'") {
    // règle très compliquée
  } else if (ruleName === "ex falso") {
    // A, ~A pour B
    if (inferenceTwo === "~" + inferenceOne) {
      objectToReturn.itself = "résultat arbitraire";
    }
  }
  if (objectToReturn.itself !== "?") {
    objectToReturn.activable = true;
  }
  return objectToReturn;
}

export default InferenceForecaster;
