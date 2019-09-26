import React, { Fragment } from "react";
import ShowProbableInference from "../../Calcul Tools/Deducer Tools/ShowProbableInference";

// la fonction MakeAllInferences est appelée par "ShowAllInferences" provenant de InferenceProvider, laquelle se trouve dans Deducer
// la fonction MakeAllInferences appelle ShowProbableInference

function MakeAllInferences(value) {
  // checkSquare est soit 'undefined', soit il contient du html

  let allInferencesShown = [],
    selectableClassName = "",
    previousInference = "";
  if (value.allInferencesThemselves) {
    for (let i = 0; i < value.allInferencesThemselves.length; i++) {
      if (value.canInferenceBeStored === true) {
        selectableClassName = "selectable ";
      }
      allInferencesShown.push(
        renderInference(
          value.allInferencesThemselves[i],
          i + 1,
          selectableClassName,
          value
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

function renderInference(inference, num, selectableClassName, value) {
  let commentary = "",
    hypothesisLevel = "",
    classNames = "",
    adequacyArrow = "";
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
  // section des classNames pour la flèche d'adéquation
  if (inference.adequacyType && value.canInferenceBeStored) {
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
      className={"inferenceGlobal " + classNames + selectableClassName}
      onClick={() => {
        if (value.canInferenceBeStored === true) {
          value.storageForRuleVerification(
            num, // on envoie le futur numéro d'inférence
            inference.itself, // on envoie l'inférence elle-même
            inference.actualHypID // on envoie l'id de l'hypothèse, pour vérifier si l'inférence est stockable
          );
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
