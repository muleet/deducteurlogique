import React, { Component, Fragment } from "react";
import TruthTable from "../../../data/TruthTable";

class ShowTruthTable extends Component {
  state = {
    arrayTruthLine: []
  };

  renderInfoTruthLine(name) {
    return name;
  }

  renderTruthLine(name, itself, character) {
    let arrayTableItself = [];
    for (let i = 0; i < 4; i++) {
      arrayTableItself.push(
        <ol className="part-of-truth-line">{itself[i]}</ol>
      );
    }
    let arrayToReturn = [];
    // arrayToReturn.push(name);
    arrayToReturn.push(arrayTableItself);
    arrayToReturn.push(character[0]);
    return arrayToReturn;
  }

  renderTruthTable() {
    let arrayTruthLine = [];
    for (let i = 0; i < 16; i++) {
      console.log(TruthTable[i]);
      arrayTruthLine.push(
        <Fragment key={i}>
          <li
            className="truth-line"
            onMouseOver={() => {
              this.renderInfoTruthLine(TruthTable[i].name);
            }}
          >
            {this.renderTruthLine(
              TruthTable[i].name,
              TruthTable[i].itself,
              TruthTable[i].character
            )}
          </li>
        </Fragment>
      );
    }
    return arrayTruthLine;
  }

  render() {
    return (
      <Fragment>
        <ul className="whole-truth-table">{this.renderTruthTable()} </ul>
        <ul className="box-info-exercise" />
      </Fragment>
    );
  }
}

export default ShowTruthTable;
