import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";

function Deductionasuppr() {
  let totalInferences = [];
  let inferenceNumber = 1;
  let inferenceItself = "p⊃q";
  let inferenceCommentary = "";
  // isAdded: false // exemple à supprimer quand j'aurai compris comment les méthodes marchent exactement

  function renderMakeInference() {
    totalInferences =
      totalInferences +
      (
        <MakeInference
          infNum={inferenceNumber + ". "}
          content={inferenceItself}
        />
      );
    return totalInferences;
  }

  return (
    <Fragment>
      <ul className="deduction">
        <div className="inferenceGlobal">
          <div className="inferenceNumber">
            <button
              className="deduction-button"
              onClick={(inferenceNumber = inferenceNumber++)}
            >
              {inferenceNumber}
            </button>
            {renderMakeInference()}
            {"exemple de numéro d'inférence"}
          </div>
          <div className="inferenceItself">{"exemple d'inférence"}</div>
          <div className="inferenceCommentary">
            {"exemple de commentaire d'inférence"}
          </div>
        </div>
      </ul>
    </Fragment>
  );
}
export default Deductionasuppr;
