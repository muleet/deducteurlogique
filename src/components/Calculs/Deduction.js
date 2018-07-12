import React, { Component } from "react";
import MakeInference from "./MakeInference";

class Deduction extends Component {
  state = {
    content: []
  };

  render() {
    return <button class="deduction" onClick={<MakeInference wesh="wesh" />} />;
  }
}

export default Deduction;
