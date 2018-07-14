import React from "react";
import Linker from "../Linker";
import Home from "./Home";
import Deducer from "../Calcul Tools/Deducer";
import MakeInference from "../Calcul Tools/MakeInference";

// Ce fichier gère la page de calcul des propositions.

const CalculDesPropositions = () => {
  return (
    <main className="main-calcul">
      <h2>Calcul des propositions</h2>
      <Deducer />
      <Linker
        link="/"
        path="/"
        components={Home}
        name="Retour au menu"
        exactness="true"
      />
    </main>
  );
};

export default CalculDesPropositions;
