import React from "react";

// la fonction ShowProbableInference est appelée par MakeAllInferences

function ShowProbableInference(value, previousInference) {
  const ruleName = value.ruleModalContent.ruleName,
    expectedArguments = value.ruleModalContent.expectedArguments;
  let probableInference = value.probableInference,
    // checkSquareClassName = "-inactive",
    newInference = {},
    classNames = "",
    hypothesisLevel = "",
    hypothesisLevelNumber = Number(previousInference.level),
    probableCommentary = "?," + ruleName;
  let hypotheticalArrow = "",
    firstArrow = "",
    secondArrow = "",
    setAdequacyArrows = "";
  if (value.canInferenceBeStored) {
    // Section de la création des adequacyArrows
    if (ruleName === "⊃i" || ruleName === "~i") {
      hypotheticalArrow = makeIndicator("indicator-data-hypothesis ", false);
      if (value.allHypotheticalInferences[0]) {
        hypotheticalArrow = makeIndicator("indicator-data-hypothesis ", true);
      }
      firstArrow = makeIndicator("indicator-data-first-argument ", false);
      if (expectedArguments.length === 3) {
        secondArrow = makeIndicator("indicator-second-argument ", false);
      }
    } else {
      firstArrow = makeIndicator("indicator-data-first-argument ", false);
      if (value.storedInference[0]) {
        if (
          value.allInferencesThemselves[value.storedNumbers[0] - 1]
            .adequacyType === "indicator-data-first-argument "
        ) {
          firstArrow = makeIndicator("indicator-data-first-argument ", true);
        } else {
          firstArrow = makeIndicator("indicator-inadequate-argument ", true);
        }
      }
      if (expectedArguments.length === 2) {
        secondArrow = makeIndicator("indicator-second-argument ", false);
        if (value.storedInference[1]) {
          if (
            value.allInferencesThemselves[value.storedNumbers[1] - 1]
              .adequacyType === "indicator-data-second-argument "
          ) {
            secondArrow = makeIndicator(
              "indicator-data-second-argument ",
              true
            );
          } else if (ruleName === "∧i") {
            // cas spécifique de ∧i, puisque cette règle fonctionne avec toutes les inférences
            secondArrow = makeIndicator("indicator-data-first-argument ", true);
          } else if (
            ruleName === "↓i" &&
            value.allInferencesThemselves[value.storedNumbers[1] - 1]
              .adequacyType === "indicator-data-first-argument "
          ) {
            // cas spécifique de ∧i, puisque cette règle fonctionne avec toutes les inférences
            secondArrow = makeIndicator("indicator-data-first-argument ", true);
          } else {
            secondArrow = makeIndicator("indicator-inadequate-argument ", true);
          }
        }
      }
    }

    setAdequacyArrows = (
      <ul className={"setAdequacyArrows "}>
        {hypotheticalArrow}
        {firstArrow}
        {secondArrow}
      </ul>
    );
  }
  if (probableInference.active === false) {
    probableInference.itself = "prochaine inférence";
    probableCommentary = "?";
    if (ruleName) {
      probableCommentary = "?";
    }
  } else if (probableInference.activable === true) {
    // probableCommentary = "?, " + ruleName;
    // if (ruleName) {
    probableCommentary =
      probableInference.numberCommentary + ", " + probableInference.commentary;
    // }
    // checkSquareClassName = "";
    newInference = {
      itself: probableInference.itself,
      commentary: probableInference.commentary + ", " + ruleName,
      numberCommentary: probableInference.numberCommentary,
      numberCommentaryHypothesis: value.storedHypID[0] // désigne le nombre de l'hypothèse
    };
    if (probableInference.itself === "prochaine inférence") {
      probableCommentary = "?";
    }
    if (ruleName === "~i") {
      // hyp = "hypothèse réfutée";
      hypothesisLevelNumber--;
      newInference.numberCommentaryHypothesis = value.allHypotheticalInferences;
    } else if (ruleName === "⊃i") {
      // hyp = "hypothèse validée";
      hypothesisLevelNumber--;
    }
  } else if (ruleName === "hyp") {
    classNames = "hypotheticalInference ";
    probableInference.itself = value.futureInference;
    probableInference.commentary = "hyp";
    probableInference.numberCommentary = "";
    newInference = {
      itself: value.futureInference,
      commentary: "hyp",
      numberCommentary: ""
    };
    // hyp = "nouvelle hypothèse";
    hypothesisLevelNumber++;
    // } else if (ruleName === "∨e") {
    //   // à faire plus tard
    //   hyp = "nouvelle hyp ∨e";
    //   hypothesisLevelNumber++;
  }
  for (let i = 0; i < hypothesisLevelNumber; i++) {
    hypothesisLevel += "|";
  }
  let nextInference = (
    <li
      className={
        "inferenceGlobal probable-inference animation-fadeIn fadeIn probable-shadow " +
        classNames
      }
      key={value.allInferencesThemselves.length}
    >
      <div className={"inferenceNumber "}>
        {value.allInferencesThemselves.length + 1 + "."}
      </div>
      <div className={"hypothesis-level "}>
        {hypothesisLevel}
        {/* {this.props.hypIDSent} */}
      </div>
      <div className={"inferenceItself "}>{probableInference.itself}</div>
      <div className={"inferenceCommentary "}>{probableCommentary}</div>
      {setAdequacyArrows}
      {/* {
        <div
          className={"probable-inference-checkSquare" + checkSquareClassName}
          // checksquareclickable={checkSquareClickable}
          onClick={() => {
            if (probableInference.activable) {
              value.addInference(newInference, hyp);
              value.setRuleModal(false);
            }
          }}
        >
          <i className="fas fa-check-square icon" />
        </div>
      } */}
    </li>
  );
  return nextInference;
}

function makeIndicator(className, bool) {
  let adequacyArrow = "▷";
  if (bool) {
    adequacyArrow = "▶";
  }
  return <li className={"indicator " + className}>{adequacyArrow}</li>;
}

export default ShowProbableInference;
