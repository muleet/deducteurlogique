import React, { Component, Fragment } from "react";
import SolutionExo1 from "../Solutions/SolutionExo1";
import SolutionExo2 from "../Solutions/SolutionExo2";
import SolutionExo3 from "../Solutions/SolutionExo3";
import SolutionExo4 from "../Solutions/SolutionExo4";
import SolutionExo5 from "../Solutions/SolutionExo5";
import SolutionExo6 from "../Solutions/SolutionExo6";

class ShowPossibleSolutions extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo1 />);
          }}
        >
          1
        </div>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo2 />);
          }}
        >
          2
        </div>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo3 />);
          }}
        >
          3
        </div>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo4 />);
          }}
        >
          4
        </div>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo5 />);
          }}
        >
          5
        </div>
        <div
          className="solution-button"
          onClick={() => {
            this.props.valueSent.giveSolution(<SolutionExo6 />);
          }}
        >
          6
        </div>
      </Fragment>
    );
  }
}

export default ShowPossibleSolutions;