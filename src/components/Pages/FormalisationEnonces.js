import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Linker from "../Linker";

const FormalisationsEnonces = () => {
  return (
    <div>
      <h2>FormalisationsEnonces</h2>
      <Linker link="/" path="/" components={Home} name="Retour au menu" />
    </div>
  );
};

export default FormalisationsEnonces;
