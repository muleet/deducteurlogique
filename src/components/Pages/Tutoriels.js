import React from "react";
import Home from "./Home";
import Linker from "../Linker";
import ShowInfoRules from "../ShowInfoRules";

const Tutoriels = () => {
  return (
    <main className="main-tuto">
      <div>
        <h2>Tuto {"&"} info</h2>
        <ShowInfoRules />
        <Linker link="/" path="/" components={Home} name="Retour au menu" />
      </div>
    </main>
  );
};

export default Tutoriels;
