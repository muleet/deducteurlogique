// import React, { Component } from "react";
import RuleProvider from "../RuleProvider";

// composant appelé par InferenceProvider, avec les props ruleName, areTheInferencesDetected, allInferencesThemselves
// ce composant va retourner 2 choses : 1) l'emplacement (en chiffre) des inférences compatibles pour la règle en question.
// 2) La portée des inférences en question (en chiffre).
// Par exemple pour le modus ponens : si on détecte l'inférence A dans une inférence A⊃B, il faut savoir quand s'arrête l'emplacement de A.

function scanInferences(
  ruleName,
  allInferencesThemselves,
  updateScannedInferences,
  allHypotheticalInferences
) {
  if (ruleName) {
    let result = true; // retourné à la fin de cette fonction, vers la méthode qui l'a appelé dans InferenceProvider (setRuleModal() ou removeLastInference())
    let typeOfRule = "";
    let position = [];
    const oneStepRules = [
      "~~e",
      "∧e",
      "∧i",
      "∨i",
      "⊃i",
      "≡e",
      "⊅i",
      "↓e",
      "reit"
    ];
    const twoStepRules = [
      "⊃e",
      "~i",
      "∨e",
      "⊻i",
      "⊻e",
      "≡i",
      "↑i",
      "↑e",
      "↓i",
      "ex falso"
    ];
    if (oneStepRules.indexOf(ruleName) !== -1) {
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        result = scanOneStepRule(
          ruleName,
          allInferencesThemselves[i].itself,
          allHypotheticalInferences
        );
        if (result === true) {
          position.push(i);
          typeOfRule = "oneStep";
        }
      }
    } else if (twoStepRules.indexOf(ruleName) !== -1) {
      console.log(
        "inferenceScanner, bonjour on est bien dans une règle à deux étapes"
      );
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        if (allInferencesThemselves[i].itself.indexOf(ruleName[0]) !== -1) {
          // stepOne : y a-t-il une inférence qui a la forme attendue pour le premier argument de la règle ? Si oui, stepTwo.
          let arrayOfJ = [];
          for (let j = 0; j < allInferencesThemselves.length; j++) {
            // stepTwo : y a-t-il une inférence qui a la forme attendue pour le second argument de la règle ? Si oui, scanInferences retourne true + les emplacements des inférences en question (et l'emplacement des caractères)
            result = scanTwoStepRule(
              ruleName,
              allInferencesThemselves[i].itself,
              allInferencesThemselves[j].itself,
              allHypotheticalInferences
            );
            // console.log("IF, result", result);
            if (result === true) {
              arrayOfJ.push([j]);
              typeOfRule = "twoStep";
            }
          }
          position.push(i, arrayOfJ);
        }
      }
    }
    console.log(
      "inferenceScanner retourne une règle, ",
      typeOfRule,
      " les positions",
      position
    );
    updateScannedInferences(typeOfRule, position, allInferencesThemselves); // result = true or false ; position = contient l'emplacement des inférences valides pour la règle
    // return result;
  } else {
    // updateScannedInferences(false);
  }
}

// la fonction scanWithTheRightRule sert à "~~e" "∧e" "∧i""∨i" "⊃i" "≡e" "⊅i" "↓e"
function scanOneStepRule(ruleName, inference, allHypotheticalInferences) {
  let isTheRuleAdequate = false;
  if (ruleName === "~~e") {
    // ~~A pour A
    if (inference[0] === "~" && inference[1] === "~") {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∧e") {
    //  A∧B pour A ou B
    const arrayAandB = returnWhatIsBeforeAndAfterTheOperator(inference, "∧");
    if (arrayAandB.length === 2) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∧i") {
    // A, B pour A∧B
    if (inference) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∨i") {
    // A pour A∨B
    const arrayAorB = returnWhatIsBeforeAndAfterTheOperator(inference, "∨");
    if (arrayAorB.length === 2) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊃i") {
    // (A), B pour A⊃B
    if (allHypotheticalInferences) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "≡e") {
    // A≡B pour A⊃B ou B⊃A
    const arrayAiffB = returnWhatIsBeforeAndAfterTheOperator(inference, "≡");
    if (arrayAiffB.length === 2) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊅i") {
    // (A), B pour A⊅B
    if (allHypotheticalInferences) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↓e") {
    // A↓B pour ~A ou ~B
    const arraynotAnotB = returnWhatIsBeforeAndAfterTheOperator(inference, "↓");
    if (arraynotAnotB.length === 2) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "reit") {
    // A pour A
    if (inference) {
      isTheRuleAdequate = true;
    }
  }

  return isTheRuleAdequate;
}

function scanTwoStepRule(
  ruleName,
  inferenceOne,
  inferenceTwo,
  allHypotheticalInferences
) {
  // "⊃e" "~i"  "∨e" "⊻i" "⊻e" "≡i" "⊅e" "↑i" "↑e" "↓i" "ex falso"
  let isTheRuleAdequate;
  if (ruleName === "⊃e") {
    // A, A⊃B pour B
    // console.log("inferenceOne avant", inferenceOne);
    inferenceOne = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊃");
    // console.log("inferenceOne après", inferenceOne);
    // console.log("condition : ", inferenceOne[0], "===", inferenceTwo);
    if (inferenceOne[0] === inferenceTwo) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "~i") {
    // B, ~B, pour réfuter l'hypothèse (A)
    let notBbecomeB = inferenceTwo.substring(1);
    notBbecomeB = mayRemoveFirstParenthesis(notBbecomeB);
    if (allHypotheticalInferences && inferenceOne === notBbecomeB) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∨e") {
    // A∨B + conc de |A + conc de |B, pour A ou B
  } else if (ruleName === "⊻i") {
    // A⊅B, B⊅A pour A⊻B
  } else if (ruleName === "⊻e") {
    // A, A⊻B pour ~B (ou ~A, A⊻B, pour B)
    const AorB = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊻");
    if (AorB[0] === inferenceTwo || AorB[1] === inferenceTwo) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "≡i") {
    // A⊃B, B⊃A pour A≡B
  } else if (ruleName === "⊅e") {
    // A, A⊅B pour ~B
  } else if (ruleName === "↑i") {
    // A, ~B, pour A↑B
  } else if (ruleName === "↑e") {
    // A, A↑B pour ~B
  } else if (ruleName === "↓i") {
    // ~A, ~B, pour A↓B
  } else if (ruleName === "ex falso") {
    // A, ~A pour B
  }
  // console.log("IF, isTheRuleAdequate", isTheRuleAdequate);
  return isTheRuleAdequate;
}

function mayAddFirstParenthesis(inference) {
  if (inference.length > 2 && inference[0] !== "~") {
    inference = "(" + inference + ")";
  }
  return inference;
}

function mayRemoveFirstParenthesis(inference) {
  let newInference = inference;
  if (inference[0] === "(") {
    newInference = "";
    for (let i = 1; i < inference.length - 1; i++) {
      newInference = newInference + inference[i];
    }
  }
  return newInference;
}

function returnWhatIsBeforeAndAfterTheOperator(str, operator) {
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
    arrayToReturn = "error";
  }
  return arrayToReturn;
}

function returnAnInferenceOutOfTwoInferences(A, B, operator) {
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
}

export default scanInferences;
