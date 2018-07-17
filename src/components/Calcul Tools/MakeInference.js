import React, { Fragment } from "react";

// Cette fonction est appelée par une méthode de Deduction, sur la base de props envoyées par Deducer.
// Cette fonction doit générer : le contenu de l'inférence, et le commentaire de l'inférence.
// Le résultat de cette fonction sera positionné à côté d'un numéro d'inférence, généré par Deduction.
// A côté du résultat de cette fonction, doit se trouver le résultat d'une fonction MakeInferenceCommentary, elle sera appelée dans Deduction.

function MakeInference(props) {
  return (
    <Fragment>
      <li className="inferenceGlobal">
        <div className="inferenceNumber">{props.inferenceNumber}</div>
        <div className="inferenceItself">{props.inferenceItself}</div>
        <div className="inferenceCommentary">{props.inferenceCommentary}</div>
      </li>
    </Fragment>
  );
}

export default MakeInference;
