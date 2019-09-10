import React, { Component, Fragment } from "react";
import ExercisesSolution from "../../../data/ExercisesSolution";

class ShowPossibleSolutions extends Component {
  render() {
    let arrayButtonSolutions = [];

    for (let i = 0; i < ExercisesSolution.length; i++) {
      arrayButtonSolutions.push(
        <div
          key={arrayButtonSolutions.length}
          className="solution-button"
          onClick={() => {
            this.props.valueInference.giveSolution(
              ExercisesSolution[i].possibleSolution
            );
          }}
        >
          {i + 1}
        </div>
      );
    }
    return <Fragment>{arrayButtonSolutions}</Fragment>;
  }
}

export default ShowPossibleSolutions;
