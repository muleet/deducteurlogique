import React, { Component } from "react";
import RuleProvider from "../RuleProvider";

// composant appelé par InferenceProvider, avec les props ruleName, areTheInferencesDetected, allInferencesThemselves
// ce composant va retourner 2 choses : 1) l'emplacement (en chiffre) des inférences compatibles pour la règle en question.
// 2) La portée des inférences en question (en chiffre).
// Par exemple pour le modus ponens : si on détecte l'inférence A dans une inférence A⊃B, il faut savoir quand s'arrête l'emplacement de A.

function getInferencesFromClosedHypotheses(
  allHypotheticalInferences,
  hypothesisCurrentLevelAndId
) {
  let positions = [];
  return positions;
}
function getInferencesFromPreviousHypothesesStillOpen(
  allHypotheticalInferences,
  hypothesisCurrentLevelAndId
) {
  let positions = [];
  return positions;
}

function scanInferences(
  ruleName,
  allInferencesThemselves,
  updateScannedInferences,
  allHypotheticalInferences,
  hypothesisCurrentLevelAndId
) {
  if (ruleName) {
    let result = true; // retourné à la fin de cette fonction, vers la méthode qui l'a appelé dans InferenceProvider (setRuleModal() ou removeLastInference())
    let typeOfRule = "";
    let positions = {
      detectedOneStepArgument: [], // seule donnée pour les règles à un seul argument
      semiDetectedFirstArgument: [], // on ajoute toute position trouvée
      detectedFirstArgument: [], // si l'on trouve une position de second argument, on déplace le nombre dans semiDetectedFA vers detectedFA
      detectedSecondArgument: [], // ne peut contenir des nombres que si detectedFirstArgument en contient
      currentHyp: { num: "", type: "" }, // contient un nombre et un str contenant le nom de la clé où se trouve le nombre
      inferencesFromClosedHypotheses: [],
      inferencesFromPreviousHypothesesStillOpen: []
    };
    positions.inferencesFromClosedHypotheses = getInferencesFromClosedHypotheses(
      allHypotheticalInferences,
      hypothesisCurrentLevelAndId
    );
    positions.inferencesFromPreviousHypothesesStillOpen = getInferencesFromPreviousHypothesesStillOpen(
      allHypotheticalInferences,
      hypothesisCurrentLevelAndId
    );

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
      "⊅e",
      "≡i",
      "↑i",
      "↑e",
      "↓i",
      "ex falso"
    ];
    const hypotheticalRules = ["⊃i", "⊅i", "~i"];
    const doesTheRuleImplyAnHypothesis =
      hypotheticalRules.indexOf(ruleName) !== -1;
    if (oneStepRules.indexOf(ruleName) !== -1) {
      typeOfRule = "oneStep";
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        result = scanOneStepRule(
          ruleName,
          allInferencesThemselves[i].itself,
          allHypotheticalInferences
        );
        if (result === true) {
          positions.detectedOneStepArgument.push(i);
        }
      }
    } else if (twoStepRules.indexOf(ruleName) !== -1) {
      console.log(
        "inferenceScanner, on a bien une règle à deux étapes, avec les inférences",
        allInferencesThemselves
      );
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        // étape 0 : on crée le caractère qui va permettre de détecter si l'on parle des bonnes inférences
        typeOfRule = "twoStep";
        let characterDetector = "";
        if (
          ruleName === "⊻e" ||
          ruleName === "⊃e" ||
          ruleName === "⊅e" ||
          ruleName === "↑e"
        ) {
          characterDetector = ruleName[0];
        } else if (ruleName === "≡i") {
          // il faut deux inférences avec un ⊃
          characterDetector = "⊃";
        } else if (ruleName === "⊻i") {
          // il faut deux inférences avec un ⊅
          characterDetector = "⊅";
        } else if (ruleName === "↓i") {
          // il faut deux inférences avec un ~
          characterDetector = "~";
        } else if (ruleName === "↑i") {
          // cas bizarre donc je fais rien pour le moment
        } else if (ruleName === "∨e") {
          // cas bizarre donc je fais rien pour le moment
        }

        if (
          // étape 1 : y a-t-il une inférence qui a la forme attendue pour le premier argument de la règle ? Si oui, on l'ajoute aux semis-détectés et on passe à l'étape 2.
          allInferencesThemselves[i].itself.indexOf(characterDetector) !== -1
        ) {
          if (!doesTheRuleImplyAnHypothesis && ruleName !== "ex falso") {
            positions.semiDetectedFirstArgument.push(i);
          }
          for (let j = 0; j < allInferencesThemselves.length; j++) {
            // étape 2 : y a-t-il une inférence qui a la forme attendue pour le second argument de la règle ? Si oui, scanInferences retourne true + les emplacements des inférences en question (et l'emplacement des caractères)
            result = scanTwoStepRule(
              ruleName,
              allInferencesThemselves[i].itself,
              allInferencesThemselves[j].itself,
              allHypotheticalInferences
            );
            console.log(
              "IS étape 2 avec le i : '",
              i,
              "' le result est ",
              result
            );
            // console.log("IF, result", result);
            if (result === true) {
              positions.detectedFirstArgument.push(i);
              positions.detectedSecondArgument.push(j);
              // positions.semiDetectedFirstArgument.pop();
            }
          }
        }
      }
    }
    if (doesTheRuleImplyAnHypothesis && allHypotheticalInferences[0]) {
      // si la règle implique une hypothèse ET qu'une hypothèse est en cours, on prend son numéro d'inférence
      positions.currentHyp.num = Number(
        allHypotheticalInferences[0].numberCommentaryHypothesis - 1
      );
      positions.currentHyp.type =
        "indicator indicator-data-hypothesis-detected";
      if (
        positions.detectedOneStepArgument.indexOf(positions.currentHyp.num) !==
        -1
      ) {
        positions.currentHyp.type += " indicator-data-detected";
      } else if (
        positions.semiDetectedFirstArgument.indexOf(
          positions.currentHyp.num
        ) !== -1
      ) {
        positions.currentHyp.type += " indicator-data-semi-detected";
      } else if (
        positions.detectedFirstArgument.indexOf(positions.currentHyp.num) !== -1
      ) {
        positions.currentHyp.type += " indicator-data-detected";
      } else if (
        positions.detectedSecondArgument.indexOf(positions.currentHyp.num) !==
        -1
      ) {
        positions.currentHyp.type += " indicator-data-second-argument-detected";
      } else {
        positions.currentHyp.type += " indicator-data-undetected";
      }
      // console.log("y'aura-t-il une hyp et que contient-elle",positions.currentHyp);
    }
    console.log(
      "inferenceScanner retourne la règle, ",
      ruleName,
      " qui est de type ",
      typeOfRule,
      " avec les positions ",
      positions
    );
    prepareUpdate(
      typeOfRule,
      positions,
      allInferencesThemselves,
      updateScannedInferences,
      ruleName
    );
  }
}

function prepareUpdate(
  typeOfRule,
  positions,
  allInferencesThemselves,
  updateScannedInferences,
  ruleName
) {
  // typeOfRule répond à la question "la règle en cours a-t-elle des inférences qui peuvent la valider ?" ; "positions" contient les emplacements de ces inférences ; allInferencesThemselves est envoyé depuis InferenceScanner, lequel le recevait de setRuleModal, ou addInference, ou removeLastInference
  let newAllInferencesValidForCurrentRule = [];

  // if (typeOfRule && this.state.ruleModalShown.normal) {
  if (typeOfRule === "reset") {
  } else if (typeOfRule) {
    // ici on maj la liste des inférences valides/invalides
    if (positions) {
      let key = 0;
      // étape 0 : toutes les inférences reçoivent un rond rouge
      console.log("étape 0, AIT.L", allInferencesThemselves.length);
      for (let i = 0; i < allInferencesThemselves.length; i++, key++) {
        newAllInferencesValidForCurrentRule.push(
          <div key={i} className="indicator indicator-data-undetected">
            {ruleName}
          </div>
        );
      }

      key = key + allInferencesThemselves.length;
      if (typeOfRule === "oneStep") {
        // cas des règles à un seul argument, positions est un objet contenant une clé "detectedOneStepArgument" qui est un tableau contenant des nombres
        // étape 1 : on remplace certains ronds rouges par des ronds verts
        if (positions.detectedOneStepArgument) {
          makeAllIndicatorsWithALoop(
            positions.detectedOneStepArgument,
            newAllInferencesValidForCurrentRule,
            "indicator-data-detected",
            key,
            ruleName
          );
        }
        key = key + positions.detectedOneStepArgument.length;
      } else if (typeOfRule === "twoStep") {
        // cas des règles à deux arguments, positions est un objet contenant des clés qui sont des tableaux contenant des tableaux contenant des nombres
        // étape 0 : si la règle est hypothétique on met un background-color au rond de la dernière hyp en cours

        if (positions.semiDetectedFirstArgument) {
          makeAllIndicatorsWithALoop(
            positions.semiDetectedFirstArgument,
            newAllInferencesValidForCurrentRule,
            "indicator-data-semi-detected",
            key,
            ruleName
          );
          key = key + positions.semiDetectedFirstArgument.length;
        }

        // étape 2 : on remplace d'autres ronds rouges par un rond vert
        if (positions.detectedFirstArgument) {
          makeAllIndicatorsWithALoop(
            positions.detectedFirstArgument,
            newAllInferencesValidForCurrentRule,
            "indicator-data-detected",
            key,
            ruleName
          );
          key = key + positions.detectedFirstArgument.length;
        }
        // étape 3 : on remplace d'autres ronds rouges par un rond bleu ciel
        if (positions.detectedSecondArgument) {
          makeAllIndicatorsWithALoop(
            positions.detectedSecondArgument,
            newAllInferencesValidForCurrentRule,
            "indicator-data-second-argument-detected",
            key,
            ruleName
          );
          key = key + positions.detectedSecondArgument.length;
        }
      }
      if (positions.currentHyp) {
        // étape 4, pour les règles avec une hypothèse, il faut d'abord trouver si le numéro en question est présent dans une autre catégorie
        console.log("il y a bien une hyp et c'est ", positions.currentHyp);
        newAllInferencesValidForCurrentRule[positions.currentHyp.num] = (
          <div key={key} className={positions.currentHyp.type}>
            {ruleName}
          </div>
        );
      }
    }
  }
  updateScannedInferences(newAllInferencesValidForCurrentRule);
}

function makeAllIndicatorsWithALoop(
  currentPositions,
  newAllInferencesValidForCurrentRule,
  className,
  key,
  ruleName
) {
  for (let i = 0; i < currentPositions.length; i++, key++) {
    newAllInferencesValidForCurrentRule[currentPositions[i]] = (
      <div key={key} className={"indicator " + className}>
        {ruleName}
      </div>
    );
  }
  return newAllInferencesValidForCurrentRule;
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
    if (inference) {
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
  // "⊃e" "~i" "≡i"  "⊻i" "⊻e" "⊅e" "↑i" "↑e" "↓i" "∨e" "ex falso"
  let isTheRuleAdequate = false;
  if (ruleName === "⊃e") {
    // A, A⊃B pour B
    inferenceOne = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊃");
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
  } else if (ruleName === "≡i") {
    // A⊃B, B⊃A pour A≡B
    const AthenB = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊃");
    const BthenA = returnWhatIsBeforeAndAfterTheOperator(inferenceTwo, "⊃");
    if (AthenB[0] === BthenA[1] && AthenB[1] === BthenA[0]) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊻i") {
    // A⊅B, B⊅A pour A⊻B
    const AthennotB = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊅");
    const BthennotA = returnWhatIsBeforeAndAfterTheOperator(inferenceTwo, "⊅");
    if (AthennotB[0] === BthennotA[1] && AthennotB[1] === BthennotA[0]) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊻e") {
    // A, A⊻B pour ~B (ou ~A, A⊻B, pour B)
    const AorB = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊻");
    if (
      AorB[0] === inferenceTwo ||
      AorB[1] === inferenceTwo ||
      "~" + AorB[0] === inferenceTwo ||
      "~" + AorB[1] === inferenceTwo ||
      AorB[0] === "~" + inferenceTwo ||
      AorB[1] === "~" + inferenceTwo
    ) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊅e") {
    // A, A⊅B pour ~B
    inferenceOne = returnWhatIsBeforeAndAfterTheOperator(inferenceOne, "⊅");
    if (inferenceOne[0] === inferenceTwo) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↑i") {
    // A, ~B, pour A↑B
    if (inferenceOne && inferenceTwo[0] === "~") {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↑e") {
    // A, A↑B pour ~B
    const AincompB = returnWhatIsBeforeAndAfterTheOperator(inferenceTwo, "↑");
    if (AincompB[0] === inferenceOne || AincompB[1] === inferenceOne) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↓i") {
    // ~A, ~B, pour A↓B
    if (inferenceOne[0] === "~" && inferenceTwo[0] === "~") {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∨e") {
    // A∨B + conc de |A + conc de |B, pour A ou B
    // cas super compliqué et relou
  } else if (ruleName === "ex falso") {
    // A, ~A pour B
    let notBbecomeB = inferenceTwo.substring(1);
    notBbecomeB = mayRemoveFirstParenthesis(notBbecomeB);
    if (inferenceOne === notBbecomeB) {
      isTheRuleAdequate = true;
    }
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