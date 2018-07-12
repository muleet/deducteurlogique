import React from "react";
import data from "../data.json";

function Locutions(props) {
  let random = Math.floor(Math.random() * data.length);
  return (
    <div>
      <div id="locution">{data[random].latin}</div>
      <br />
      <div id="traduction-latine">{data[random].traduction}</div>
    </div>
  );
}

export default Locutions;
