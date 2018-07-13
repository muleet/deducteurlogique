import React from "react";
import Linker from "../Linker";
import Home from "./Home";
import Deduction from "../Calcul Tools/Deduction";

const CalculDesPropositions = () => {
  return (
    <div>
      <h2>Calcul des propositions</h2>
      <Deduction />
      <Linker
        link="/"
        path="/"
        components={Home}
        name="Retour au menu"
        exactness="true"
      />
    </div>
  );
};

export default CalculDesPropositions;
