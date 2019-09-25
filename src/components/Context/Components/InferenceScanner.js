import InfTools from "./InferenceTools";

// composant appelé par InferenceProvider, avec les props ruleName, areTheInferencesDetected, allInferencesThemselves
// ce composant va retourner 2 choses : 1) l'emplacement (en chiffre) des inférences compatibles pour la règle en question.
// 2) La portée des inférences en question (en chiffre).
// Par exemple pour le modus ponens : si on détecte l'inférence A dans une inférence A⊃B, il faut savoir quand s'arrête l'emplacement de A.

function scanInferences(
  ruleName,
  allInferencesThemselves,
  allHypotheticalInferences,
  hypCurrentLevelAndId,
  allEndedHypotheticalInferences
) {
  for (let i = 0; i < allInferencesThemselves.length; i++) {
    allInferencesThemselves[i].adequacyType = "";
  }
  if (ruleName) {
    let result = true; // retourné à la fin de cette fonction, vers la méthode qui l'a appelé dans InferenceProvider, c'est-à-dire setRuleModal() ou removeLastInference()
    const hypotheticalRules = ["⊃i", "~i"];
    const oneStepRules = ["~~e", "∧e", "∨i", "⊃i", "≡e", "↓e", "reit"];
    const twoStepRules = [
      "⊃e",
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
    const doesTheRuleImplyAnHypothesis =
      hypotheticalRules.indexOf(ruleName) !== -1;
    if (oneStepRules.indexOf(ruleName) !== -1) {
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        result = scanOneStepRule(
          ruleName,
          allInferencesThemselves[i].itself,
          allHypotheticalInferences
        ); // result est soit vrai soit faux
        if (result === true) {
          allInferencesThemselves[i].adequacyType =
            "indicator-data-first-argument ";
        }
      }
    } else if (twoStepRules.indexOf(ruleName) !== -1) {
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        // étape 0 : on crée le caractère qui va permettre de détecter si l'on a des bonnes inférences
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
        }

        if (
          // étape 1 : y a-t-il une inférence qui a la forme attendue pour le premier argument de la règle ? Si oui, on l'ajoute aux semis-détectés et on passe à l'étape 2.
          allInferencesThemselves[i].itself.indexOf(characterDetector) !== -1
        ) {
          if (
            !doesTheRuleImplyAnHypothesis &&
            ruleName !== "ex falso" &&
            allInferencesThemselves[i].adequacyType !==
              "indicator-data-first-argument "
          ) {
            allInferencesThemselves[i].adequacyType =
              "indicator-data-first-argument-alone ";
          }
          for (let j = 0; j < allInferencesThemselves.length; j++) {
            // étape 2 : y a-t-il une inférence qui a la forme attendue pour le second argument de la règle ? Si oui, scanInferences retourne true + les emplacements des inférences en question (et l'emplacement des caractères)
            result = scanTwoStepRule(
              ruleName,
              allInferencesThemselves[j].itself,
              allInferencesThemselves[i].itself,
              allHypotheticalInferences
            );

            if (result === true) {
              allInferencesThemselves[i].adequacyType =
                "indicator-data-second-argument ";
              allInferencesThemselves[j].adequacyType =
                "indicator-data-first-argument ";
            }
          }
        }
      }
    } else if (ruleName === "∧i") {
      for (let i = 0; i < allInferencesThemselves.length; i++) {
        allInferencesThemselves[i].adequacyType =
          "indicator-data-first-argument ";
      }
    }
    // On détecte les inférences précédent l'hypothèse en cours
    if (allHypotheticalInferences[0]) {
      for (
        let i = 0;
        i < allHypotheticalInferences[0].numberCommentaryHypothesis - 1;
        i++
      ) {
        allInferencesThemselves[i].adequacyType =
          "indicator-argument-previous-hypothesis ";
      }
    }
    // On détecte les inférences provenant d'hypothèses closes
    if (allEndedHypotheticalInferences[0]) {
      // étape 1 : on crée un for qui se refera pour chaque hypothèse, ouverte ou fermée
      for (let i = 0; i < hypCurrentLevelAndId.whichIDIsStillOpen.length; i++) {
        // étape 2 : on vérifie une à une si les hyp sont ouvertes ou fermées, s'il est false il est fermé
        if (hypCurrentLevelAndId.whichIDIsStillOpen[i][1] === false) {
          // étape 3 : on fait un for pour détecter toutes les inf qui sont de la même hypID que l'hyp fermée
          for (let j = 0; j < allInferencesThemselves.length; j++) {
            // étape 4 : si on en trouve une on l'ajoute à la liste des positions, en étant sûr de pas l'avoir déjà ajoutée
            if (allInferencesThemselves[j].actualHypID === i) {
              allInferencesThemselves[j].adequacyType =
                "indicator-argument-closed-hypothesis ";
            }
          }
        }
      }
    }
  }
}

function scanOneStepRule(ruleName, inference, allHypotheticalInferences) {
  let isTheRuleAdequate = false;
  if (ruleName === "~~e") {
    // ~~A pour A
    if (inference[0] === "~" && inference[1] === "~") {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∧e") {
    //  A∧B pour A ou B
    const arrayAandB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      "∧"
    );
    if (arrayAandB.length === 2) {
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
    const arrayAiffB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      "≡"
    );
    if (arrayAiffB.length === 2) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊅i") {
    // (A), B pour A⊅B
  } else if (ruleName === "↓e") {
    // A↓B pour ~A ou ~B
    const neitherAnorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      "↓"
    );
    if (neitherAnorB !== "error") {
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
  // "⊃e" "~i" "≡i"  "⊻i" "⊻e" "⊅i" "↑i" "↑e" "↓i" "∨e" "ex falso"
  let isTheRuleAdequate = false;
  if (ruleName === "⊃e") {
    // A, A⊃B pour B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊃"
    );
    if (inferenceTwo[0] === inferenceOne) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "~i") {
    // B, ~B, pour réfuter l'hypothèse (A)
    if (allHypotheticalInferences && "~" + inferenceOne === inferenceTwo) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "≡i") {
    // A⊃B, B⊃A pour A≡B
    const AthenB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceOne,
      "⊃"
    );
    const BthenA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊃"
    );
    if (AthenB[0] === BthenA[1] && AthenB[1] === BthenA[0]) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊻i") {
    // A⊅B, B⊅A pour A⊻B
    const AthennotB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceOne,
      "⊅"
    );
    const BthennotA = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊅"
    );
    if (AthennotB[0] === BthennotA[1] && AthennotB[1] === BthennotA[0]) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊻e") {
    // A, A⊻B pour ~B || ~A, A⊻B, pour B || B, A⊻B pour ~A || ~B, A⊻B, pour A
    const AorB = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊻"
    );
    if (
      AorB[0] === inferenceOne ||
      AorB[1] === inferenceOne ||
      "~" + AorB[0] === inferenceOne ||
      "~" + AorB[1] === inferenceOne ||
      AorB[0] === "~" + inferenceOne ||
      AorB[1] === "~" + inferenceOne
    ) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "⊅e") {
    // A, A⊅B pour ~B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "⊅"
    );
    if (InfTools.mayRemoveFirstParenthesis(inferenceTwo[0]) === inferenceOne) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↑i") {
    // A, ~B, pour A↑B
    if (
      !InfTools.isThereAMainOperator(inferenceTwo) &&
      InfTools.returnNegationCount(inferenceOne) <
        InfTools.returnNegationCount(inferenceTwo)
    ) {
      // note : s'il y a un opérateur dominant, inferenceTwo est forcément vraie, donc ↑i ne peut pas avoir lieu
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↑e") {
    // A, A↑B pour ~B
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "↑"
    );
    if (inferenceOne === inferenceTwo[0] || inferenceOne === inferenceTwo[1]) {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "↓i") {
    // ~A, ~B, pour A↓B
    if (inferenceOne[0] === "~" && inferenceTwo[0] === "~") {
      isTheRuleAdequate = true;
    }
  } else if (ruleName === "∨e") {
    // ~A (ou ~B), A∨B pour A (ou B)
    inferenceTwo = InfTools.returnWhatIsBeforeAndAfterTheOperator(
      inferenceTwo,
      "∨"
    );
    if (inferenceOne[0] === "~") {
      inferenceOne = inferenceOne.substring(1);
      if (
        inferenceOne === inferenceTwo[0] ||
        inferenceOne === inferenceTwo[1]
      ) {
        isTheRuleAdequate = true;
      }
    }
  } else if (ruleName === "ex falso") {
    // A, ~A pour B
    if (inferenceTwo === "~" + inferenceOne) {
      isTheRuleAdequate = true;
    }
  }
  return isTheRuleAdequate;
}

export default scanInferences;
