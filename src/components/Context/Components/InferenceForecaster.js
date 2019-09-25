// import React from "react";
import InfTools from "./InferenceTools";

function InferenceForecaster(storedInferences, storedNumbers, ruleName, value) {
  // 0. déclaration des variables
  let result = { itself: "", activable: false },
    A = "?",
    B = "?";
  const oneStepRules = ["rep", "~~e", "∧e", "∨i", "⊃i", "≡e", "↓e", "reit"];
  const twoStepRules = [
    "⊃e",
    "∧i",
    "~i",
    "∨e",
    "⊻i",
    "⊻e",
    "⊅i",
    "⊅e",
    "≡i",
    "↑i",
    "↑e",
    "↓i",
    "ex falso"
  ];

  // // 1.a début de la prise des futures valeurs de probableInference, à l'aide de storedInferences
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
      result = scanOneStepRule(ruleName, A, value.allHypotheticalInferences);
    } else if (twoStepRules.indexOf(ruleName) !== -1) {
      result = scanTwoStepRule(ruleName, A, B, value.allHypotheticalInferences);
    } else if (ruleName === "hyp") {
      // result.itself = value.futureInference;
      result.activable = true;
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
      objectToReturn.itself = InfTools.mayRemoveFirstParenthesis(inference);
    }
  } else if (ruleName === "∧e") {
    //  A∧B pour A ou B
    let AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(inference, "∧");
    if (AorB !== "error") {
      objectToReturn.itself = AorB[0] + "ou" + AorB[1];
    }
  } else if (ruleName === "∨i") {
    // A pour A∨B
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
      InfTools.mayAddFirstParenthesis(A) +
      "⊃" +
      InfTools.mayAddFirstParenthesis(B);
  } else if (ruleName === "≡e") {
    // A≡B pour A⊃B ou B⊃A
  } else if (ruleName === "⊅i") {
    // (A), B pour A⊅B
  } else if (ruleName === "↓e") {
    // A↓B pour ~A ou ~B
    const neitherAnorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      "↓"
    );
    if (neitherAnorB !== "error") {
      objectToReturn.itself =
        "~" + neitherAnorB[0] + " ou " + "~" + neitherAnorB[1];
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
  allHypotheticalInferences
) {
  // "⊃e" "~i" "≡i"  "⊻i" "⊻e" "⊅i" "⊅e" "↑i" "↑e" "↓i" "∨e" "ex falso"
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
  } else if (ruleName === "∧i") {
    // A, B pour A∧B
    if (inferenceOne && inferenceTwo) {
      objectToReturn.itself =
        InfTools.mayAddFirstParenthesis(inferenceOne) +
        "∧" +
        InfTools.mayAddFirstParenthesis(inferenceTwo);
    }
  } else if (ruleName === "~i") {
    // B, ~B, pour réfuter l'hypothèse (A)
    if (inferenceTwo === "~" + inferenceOne) {
      objectToReturn.itself = "~" + allHypotheticalInferences[0].itself;
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
  } else if (ruleName === "⊻e") {
    // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
    const AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊻"
    );
    if (AorB[0] === inferenceOne) {
      objectToReturn.itself = "~" + AorB[1];
    } else if (AorB[1] === inferenceOne) {
      objectToReturn.itself = "~" + AorB[0];
    } else if ("~" + AorB[0] === inferenceOne) {
      objectToReturn.itself = AorB[1];
    } else if ("~" + AorB[1] === inferenceOne) {
      objectToReturn.itself = AorB[0];
    } else if (AorB[0] === "~" + inferenceOne) {
      objectToReturn.itself = AorB[1];
    } else if (AorB[1] === "~" + inferenceOne) {
      objectToReturn.itself = AorB[0];
    }
  } else if (ruleName === "⊅e") {
    // A, A⊅B pour ~B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊅"
    );
    if (InfTools.mayRemoveFirstParenthesis(inferenceTwo[0]) === inferenceOne) {
      objectToReturn.itself = "~" + inferenceTwo[1];
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
