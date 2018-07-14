import React from "react";
import Linker from "../Linker";
import Home from "./Home";
import Deducer from "../Calcul Tools/Deducer";
import ButAAtteindre from "../../img/repere.png"; //Image temporaire à supprimer plus tard

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
      <img
        style={{ width: "300px", height: "380px" }}
        src={ButAAtteindre}
        alt=""
      />
    </main>
  );
};

export default CalculDesPropositions;
