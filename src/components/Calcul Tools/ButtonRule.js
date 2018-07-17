import React, { Component } from "react";
import MakeInference from "./MakeInference";

class Deduction extends Component {
  makeInference = () => {
    <MakeInference />;
  };

  render() {
    let number = 0;
    return (
      <button class="deduction" onClick={this.makeInference}>
        wesh
      </button>
    );
  }
}

export default Deduction;
