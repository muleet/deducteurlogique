import React, { Component, Fragment } from "react";
import TruthTable from "../../../data/TruthTable";

class ShowTruthTable extends Component {
  state = {
    numberLine: (
      <div style={{ textAlign: "center" }}>
        Séléctionnez une ligne pour avoir des informations dessus
      </div>
    ),
    arrayInfoLine: {
      number: "",
      name: "",
      character: "",
      lecture: "",
      description: "",
      category: "",
      example: ""
    }
  };

  renderLecture() {
    if (this.state.arrayInfoLine.character.length > 0) {
      return (
        <li>
          A{this.state.arrayInfoLine.character[0]}B se lit :{" "}
          {this.state.arrayInfoLine.lecture}
        </li>
      );
    } else {
      return "Pas de caractère pour le moment";
    }
  }

  renderExample() {
    if (this.state.arrayInfoLine.example.length > 0) {
      return (
        <div style={{ display: "flex" }}>
          A :{" "}
          <p style={{ marginLeft: "6px", fontStyle: "italic" }}>
            {this.state.arrayInfoLine.example[0]}
          </p>
          <div style={{ marginLeft: "6px" }} />B :{" "}
          <p style={{ marginLeft: "6px", fontStyle: "italic" }}>
            {this.state.arrayInfoLine.example[1]}
          </p>
        </div>
      );
    }
  }

  renderInfoTruthLine(
    number,
    name,
    character,
    lecture,
    description,
    category,
    example
  ) {
    this.setState({
      arrayInfoLine: {
        number: number,
        name: name,
        character: character,
        lecture: lecture,
        description: description,
        category: category,
        example: example
      }
    });
    // return name;
  }

  renderTruthLine(i, name, itself, character) {
    let arrayTableItself = [];
    let arrayToReturn = [];
    arrayToReturn.push(<li className="part-of-truth-line">{i}</li>);
    for (let i = 0; i < 4; i++) {
      arrayTableItself.push(
        <li className="four-possibilities">{itself[i]}</li>
      );
    }
    // arrayToReturn.push(name);
    arrayToReturn.push(
      <div className="part-of-truth-line">{arrayTableItself}</div>
    );
    arrayToReturn.push(
      <div className="part-of-truth-line">{character[0]}</div>
    );
    if (character[1]) {
      arrayToReturn.push(
        <div className="part-of-truth-line">{character[1]}</div>
      );
    }
    return arrayToReturn;
  }

  renderTruthTable() {
    let arrayTruthLine = [];
    for (let i = 0; i < 16; i++) {
      // console.log(TruthTable[i]);
      arrayTruthLine.push(
        <Fragment key={i}>
          <li
            className={"truth-line " + TruthTable[i].category}
            onMouseOver={() => {
              this.renderInfoTruthLine(
                TruthTable[i].number,
                TruthTable[i].name,
                TruthTable[i].character,
                TruthTable[i].lecture,
                TruthTable[i].description,
                TruthTable[i].category,
                TruthTable[i].example
              );
            }}
          >
            {this.renderTruthLine(
              i + 1,
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
      <div className="main-truth-table">
        <ul className="whole-truth-table">{this.renderTruthTable()} </ul>
        <ul className="box-info-truth-table">
          <li>{this.state.arrayInfoLine.number}</li>
          <li>Nom : {this.state.arrayInfoLine.name}</li>
          <li>{this.state.arrayInfoLine.description}</li>
          <li>Caractère : {this.state.arrayInfoLine.character[0]}</li>
          {this.renderLecture()}
          <li>{this.renderExample()}</li>
          {/* <li>{this.state.arrayInfoLine.category}</li> */}
        </ul>
      </div>
    );
  }
}

export default ShowTruthTable;
