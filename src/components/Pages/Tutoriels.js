import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Linker from "../Linker";

const Tutoriels = () => {
  return (
    <div>
      <h2>
        Qu'est-ce que...<br />Que sont...
      </h2>
      <Linker link="/" path="/" components={Home} name="Retour au menu" />
    </div>
  );
};

export default Tutoriels;
