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
    setAdequacyArrows = "",
    AIT = value.allInferencesThemselves,
    SN = value.storedNumbers;
  if (
    value.canInferenceBeStored &&
    value.booleansOptionsAboutInferences.boolInferenceScanner
  ) {
    // Section de la création des adequacyArrows
    if (ruleName === "⊃i" || ruleName === "~i") {
      // cas des règles hypothétiques
      hypotheticalArrow = makeIndicator("hypothetical", false);
      if (value.allHypotheticalInferences[0]) {
        hypotheticalArrow = makeIndicator("hypothetical", true);
      }
      firstArrow = makeIndicator("first", false);
      if (expectedArguments.length === 3) {
        secondArrow = makeIndicator("second", false);
      }
    }

    // cas de toutes les règles
    firstArrow = makeIndicator("first", false);
    if (value.storedInference[0]) {
      if (AIT[SN[0] - 1].adequacyType === "first") {
        firstArrow = makeIndicator("first", true);
      } else {
        firstArrow = makeIndicator("inadequate", true);
      }
    }
    if (expectedArguments.length === 2) {
      secondArrow = makeIndicator("second", false);
      if (value.storedInference[1]) {
        if (AIT[SN[1] - 1].adequacyType === "second") {
          secondArrow = makeIndicator("second", true);
        } else if (ruleName === "∧i") {
          // cas spécifique de ∧i, puisque cette règle fonctionne avec toutes les inférences
          secondArrow = makeIndicator("first", true);
        } else if (
          ruleName === "↓i" &&
          AIT[SN[1] - 1].adequacyType === "first"
        ) {
          // cas spécifique de ↓i
          secondArrow = makeIndicator("first", true);
        } else {
          secondArrow = makeIndicator("inadequate", true);
        }
      }
    } else if (expectedArguments.length === 3) {
      // cas spécifique de ~i, qui a 3 arguments
      if (value.storedInference[1]) {
        if (AIT[SN[1] - 1].adequacyType === "second") {
          secondArrow = makeIndicator("second", true);
        } else {
          secondArrow = makeIndicator("inadequate", true);
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
        "inferenceGlobal probable-inference animation-fadeIn fadeIn-firstHalf probable-shadow " +
        classNames
      }
      key={value.allInferencesThemselves.length}
    >
      {setAdequacyArrows}
      <div className={"inferenceNumber "}>
        {value.allInferencesThemselves.length + 1 + "."}
      </div>
      <div className={"hypothesis-level "}>
        {hypothesisLevel}
        {/* {this.props.hypIDSent} */}
      </div>
      <div className={"inferenceItself "}>{probableInference.itself}</div>
      <div className={"inferenceCommentary "}>{probableCommentary}</div>
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

function makeIndicator(type, bool) {
  let adequacyArrow = "▷",
    className = "";
  if (bool) {
    adequacyArrow = "▶";
  }
  if (type === "first") {
    className = "indicator-first ";
  } else if (type === "second") {
    className = "indicator-second ";
  } else if (type === "hypothetical") {
    className = "indicator-hypothetical ";
  } else if (type === "inadequate") {
    className = "indicator-inadequate ";
  } else if (type === "first-alone") {
    className = "indicator-first-alone ";
  }
  return <li className={"indicator " + className}>{adequacyArrow}</li>;
}

export default ShowProbableInference;
