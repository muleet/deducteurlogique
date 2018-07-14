import React from "react";
import Linker from "../Linker";
import Home from "./Home";
import Deduction from "../Calcul Tools/Deduction";
import MakeInference from "../Calcul Tools/MakeInference";

const CalculDesPropositions = () => {
  return (
    <main className="main-calcul">
      <h2>Calcul des propositions</h2>
      <Deduction />
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
