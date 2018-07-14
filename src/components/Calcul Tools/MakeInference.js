import React, { Fragment } from "react";

// Cette fonction est appelée par une méthode de Deduction, sur la base de props envoyées par Deducer.
// Cette fonction doit générer : le contenu de l'inférence, et le commentaire de l'inférence.
// Le résultat de cette fonction sera positionné à côté d'un numéro d'inférence, généré par Deduction.

function MakeInference(props) {
  return (
    <Fragment>
      {props.infNum}.{props.content}
    </Fragment>
  );
}

export default MakeInference;
