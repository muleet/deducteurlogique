import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Linker from "../Linker";

const CalculDesPredicats = () => {
  return (
    <div>
      <h2>Calcul des prédicats</h2>
      <Linker link="/" path="/" components={Home} name="Retour au menu" />
    </div>
  );
};

export default CalculDesPredicats;
