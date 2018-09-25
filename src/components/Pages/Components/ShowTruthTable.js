import React, { Component, Fragment } from "react";

class ShowTruthTable extends Component {
  state = {
    arrayTruthLine: []
  };

  renderTruthLine(A, B, C, D) {
    return <ol className="part-of-truth-line">{A}</ol>;
  }

  renderTruthTable() {
    let arrayTruthLine = [];
    for (let i = 0; i < 17; i++) {
      arrayTruthLine.push(
        <Fragment key={i}>
          <li className="truth-line">{this.renderTruthLine(i, i, i, i)}</li>
        </Fragment>
      );
    }
    return arrayTruthLine;
  }

  render() {
    return <ul className="whole-truth-table">{this.renderTruthTable()}</ul>;
  }
}

export default ShowTruthTable;
