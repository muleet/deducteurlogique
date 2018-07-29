import React from "react";
import Linker from "../Linker";
import Home from "./Home";
import Deducer from "../Calcul Tools/Deducer";
import ButAAtteindre from "../../img/repere.png"; //Image temporaire à supprimer plus tard

// Ce fichier gère la page de calcul des propositions.

const CalculDesPropositions = props => {
  let exerciseParamNumber = 0;
  if (props.match.params.num) {
    // Paramètre dont l'existence est rendue possible dans App.js ; son contenu est fixé par MakeListExercises ; elle est renvoyée vers Deducer
    exerciseParamNumber = props.match.params.num;
  }
  return (
    <main className="main-calcul">
      <Deducer
        pageName="Calcul des propositions"
        exerciseNumber={Number(exerciseParamNumber)}
      />
      <img
        style={{ width: "300px", height: "150px" }}
        src={ButAAtteindre}
        alt=""
      />
    </main>
  );
};

export default CalculDesPropositions;
