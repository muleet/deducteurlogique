import React, { Component, Fragment } from "react";
import TruthTable from "../../../data/TruthTable";

class ShowTruthTable extends Component {
  state = {
    numberLine: (
      <div style={{ textAlign: "center" }}>
        Séléctionnez une colonne pour avoir des informations dessus
      </div>
    ),
    arrayInfoLine: {
      number: "",
      name: "",
      description: "",
      lecture: "",
      // link
      reductibleTo: "",
      // itself
      category: "",
      character: "",
      example: ""
    }
  };

  renderLecture() {
    const character = this.state.arrayInfoLine.character;
    if (
      character === "⊤" ||
      character === "⊥" ||
      character === "q" ||
      character === "p" ||
      character[0] === "~p" ||
      character[0] === "~q"
    ) {
      return "";
    } else if (character.length > 0) {
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
          <p className="truth-table-possible-meaning">
            {this.state.arrayInfoLine.example[0]}
          </p>
          <div style={{ marginLeft: "6px" }}> B : </div>
          <p className="truth-table-possible-meaning">
            {this.state.arrayInfoLine.example[1]}
          </p>
        </div>
      );
    }
  }

  renderInfoTruthLine(
    number,
    name,
    description,
    lecture,
    // link
    reductibleTo,
    // itself
    category,
    character,
    example
  ) {
    if (!isNaN(number)) {
      this.setState({
        arrayInfoLine: {
          number: number,
          name: name,
          description: description,
          lecture: lecture,
          // link
          reductibleTo: reductibleTo,
          // itself
          category: category,
          character: character,
          example: example
        }
      });
    } else {
    }
    // return name;
  }

  renderTruthLine(i, name, itself, character) {
    let arrayTableItself = [];
    let arrayToReturn = [];
    arrayToReturn.push(
      <div key={i} className="part-of-truth-line">
        {i}
      </div>
    );
    for (let k = 0; k < 4; k++) {
      arrayTableItself.push(
        <div key={k} className="four-possibilities">
          {itself[k]}
        </div>
      );
    }
    // arrayToReturn.push(name);
    arrayToReturn.push(
      <div className="part-of-truth-line" key={i + 1}>
        {arrayTableItself}
      </div>
    );
    arrayToReturn.push(
      <div className="part-of-truth-line" key={i + 2}>
        {character[0]}
      </div>
    );
    if (character[1]) {
      arrayToReturn.push(
        <div className="part-of-truth-line" key={i + 3}>
          {character[1]}
        </div>
      );
    }
    return arrayToReturn;
  }

  renderAllInformations() {
    if (this.state.arrayInfoLine.number > 0) {
      return (
        <Fragment>
          <li>{this.state.arrayInfoLine.number}</li>
          <li>Nom : {this.state.arrayInfoLine.name}</li>
          <li>{this.state.arrayInfoLine.description}</li>
          <li>Caractère : {this.state.arrayInfoLine.character[0]}</li>
          {this.renderLecture()}
          <li>Réductible à : {this.state.arrayInfoLine.reductibleTo}</li>
          <li>{this.renderExample()}</li>
          {/* <li>{this.state.arrayInfoLine.category}</li> */}
        </Fragment>
      );
    } else {
      return this.state.numberLine;
    }
  }

  renderTruthTable() {
    let arrayTruthLine = [];
    arrayTruthLine.push(
      <li
        key={0}
        className="truth-line info-line selectable"
        onMouseOver={() => {
          this.renderInfoTruthLine("", "", "", "", "", "", "", "");
        }}
      >
        {this.renderTruthLine(
          TruthTable[0].name,
          "TruthTable[0].name",
          TruthTable[0].itself,
          TruthTable[0].character
        )}
      </li>
    );
    for (let i = 1; i < 17; i++) {
      arrayTruthLine.push(
        <Fragment key={i}>
          <li
            key={i}
            className={"truth-line selectable " + TruthTable[i].category}
            onMouseOver={() => {
              this.renderInfoTruthLine(
                TruthTable[i].number,
                TruthTable[i].name,
                TruthTable[i].description,
                TruthTable[i].lecture,
                // link
                TruthTable[i].reductibleTo,
                // itself
                TruthTable[i].category,
                TruthTable[i].character,
                TruthTable[i].example
              );
            }}
          >
            {this.renderTruthLine(
              TruthTable[i].number,
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
        <ul className="box-info-truth-table">{this.renderAllInformations()}</ul>
      </div>
    );
  }
}

export default ShowTruthTable;
