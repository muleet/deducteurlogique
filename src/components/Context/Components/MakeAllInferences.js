import React from "react";
import ShowProbableInference from "../../Calcul Tools/Deducer Tools/ShowProbableInference";
// import InferenceForecaster from "../../Context/Components/InferenceForecaster";

// la fonction MakeAllInferences est appelée par "ShowAllInferences" provenant de InferenceProvider, laquelle se trouve dans Deducer
// la fonction MakeAllInferences appelle ShowProbableInference

function MakeAllInferences(value) {
  // checkSquare est soit 'undefined', soit il contient du html

  let allInferencesShown = [],
    previousInference = { level: 0 },
    isItTheLastInference = false,
    allInfLength = value.allInferencesThemselves.length - 1;
  if (value.allInferencesThemselves) {
    for (let i = 0; i < value.allInferencesThemselves.length; i++) {
      if (i + 1 === value.allInferencesThemselves.length) {
        isItTheLastInference = true;
      }

      allInferencesShown.push(
        renderInference(
          value.allInferencesThemselves[i],
          i + 1,
          value,
          isItTheLastInference,
          allInfLength
        )
      );
    }
  }
  if (value.allInferencesThemselves.length > 0) {
    previousInference = value.allInferencesThemselves.slice(-1)[0];
  }
  let probableInference = ShowProbableInference(value, previousInference);
  allInferencesShown.push(probableInference);
  return allInferencesShown;
}

function renderInference(
  inference,
  num,
  value,
  isItTheLastInference,
  allInfLength
) {
  let commentary = "",
    hypothesisLevel = "",
    classNames = "",
    adequacyArrow = "",
    fadeClassName = "";
  // section des barres d'hypothèses
  for (let i = 0; i < inference.level; i++) {
    hypothesisLevel += "|";
  }
  // section du commentaire
  if (inference.commentary !== "hyp") {
    commentary = inference.numberCommentary + ", " + inference.commentary;
  } else {
    commentary = inference.commentary;
  }
  // section des classNames spécifiques
  if (inference.inferenceType) {
    classNames = inference.inferenceType;
  }
  if (inference.inferenceBackground) {
    fadeClassName = inference.inferenceBackground;
  } else if (
    value.allEvent[num - 1] === "addInference" &&
    isItTheLastInference
  ) {
    fadeClassName = "addedInference-blinking ";
  } else if (
    value.allEvent[value.allEvent.length - 1] === "doubleAddInference" &&
    (num === allInfLength || isItTheLastInference)
  ) {
    fadeClassName = "addedInference-blinking ";
  }
  // section des classNames pour la flèche d'adéquation
  if (
    inference.adequacyType &&
    value.canInferenceBeStored &&
    value.booleansOptionsAboutInferences.boolInferenceScanner
  ) {
    adequacyArrow = (
      <div className={"adequacyArrow indicator-" + inference.adequacyType}>
        ▶
      </div>
    );
    if (inference.adequacyType === "previous-hypothesis") {
      adequacyArrow = (
        <div className={"adequacyArrow indicator-" + inference.adequacyType}>
          -
        </div>
      );
    }
    if (inference.adequacyType === "closed-hypothesis") {
      adequacyArrow = (
        <div className={"adequacyArrow indicator-" + inference.adequacyType}>
          ×
        </div>
      );
    }
  } else {
    adequacyArrow = "";
  }

  return (
    <li
      key={num - 1}
      className={"inferenceGlobal " + fadeClassName}
      // id={fadeID}
      onClick={() => {
        if (value.canInferenceBeStored) {
          value.storageForRuleVerification(
            num, // on envoie le futur numéro d'inférence
            inference.itself, // on envoie l'inférence elle-même
            inference.actualHypID // on envoie l'id de l'hypothèse, pour vérifier si l'inférence est stockable
          );
        }
      }}
      onMouseEnter={() => {
        if (value.canInferenceBeStored) {
          value.modifyClassNameOfAnyInference("selected", num);
          // value.storageForecastInference(
          //   "onMouseEnter",
          //   num,
          //   inference.itself,
          //   inference.actualHypID
          // );
        }
      }}
      onMouseLeave={() => {
        if (value.canInferenceBeStored) {
          // value.storageForecastInference("onMouseLeave");
          value.modifyClassNameOfAnyInference("unselected", num);
        }
      }}
    >
      <div className={"inferenceNumber " + classNames}>{num}.</div>
      <div className={"hypothesis-level " + classNames}>
        {hypothesisLevel}
        {/* {this.props.hypIDSent} */}
      </div>
      <div className={"inferenceItself " + classNames}>{inference.itself}</div>
      <div className={"inferenceCommentary " + classNames}>{commentary}</div>
      {/* {this.renderCheckSquare(this.props.checkSquare)} */}
      {/* {this.props.checkSquare} */}
      {adequacyArrow}
    </li>
  );
}

// function renderCheckSquare(checkSquare) {
//   if (checkSquare) {
//     return checkSquare;
//   }
// }

export default MakeAllInferences;
