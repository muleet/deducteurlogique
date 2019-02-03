import React, { Component, Fragment } from "react";
import ExercisesSolution from "../../../data/ExercisesSolution";
import MakeInference from "../MakeInference";

class ShowPossibleSolutions extends Component {
  render() {
    let arrayButtonSolutions = [];

    for (let i = 0; i < ExercisesSolution.length; i++) {
      let arraySolutionContent = [];

      for (let j = 0; j < ExercisesSolution[i].possibleSolution.length; j++) {
        let comma = ", ";
        if (ExercisesSolution[i].possibleSolution[j].commentary === "hyp") {
          comma = "";
        }
        arraySolutionContent.push(
          <MakeInference
            key={arraySolutionContent.length}
            inferenceNumber={j + 1 + "."}
            inferenceItself={ExercisesSolution[i].possibleSolution[j].itself}
            inferenceCommentary={
              ExercisesSolution[i].possibleSolution[j].numberCommentary +
              comma +
              ExercisesSolution[i].possibleSolution[j].commentary
            }
          />
        );
      }
      arrayButtonSolutions.push(
        <div
          key={arrayButtonSolutions.length}
          className="solution-button"
          onClick={() => {
            this.props.valueInference.giveSolution(arraySolutionContent);
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
