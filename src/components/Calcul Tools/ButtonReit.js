import React, { Component } from "react";
import MakeInference from "./MakeInference";

class ButtonReit extends Component {
  render() {
    let number = 0;
    return (
      <button class="deduction" onClick={this.makeInference}>
        wesh
      </button>
    );
  }
}

export default ButtonReit;
