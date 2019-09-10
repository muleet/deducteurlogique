import React, { Component, Fragment } from "react";
import TruthTable from "../../data/TruthTable";

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
      alternativeName: "",
      description: "",
      lecture: "",
      // link
      reductibleTo: "",
      // itself
      category: "",
      character: "",
      example: "",
      image: "",
      type: "",
      dual: "",
      negativeOpposite: ""
    }
  };

  renderLecture() {
    const character = this.state.arrayInfoLine.character;
    if (
      character[0] === "⊤" ||
      character[0] === "⊥" ||
      character === "A" ||
      character === "B" ||
      character[0] === "~A" ||
      character[0] === "~B"
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
          <div style={{ width: "27px" }}> A : </div>
          <p className="truth-table-possible-meaning">
            {this.state.arrayInfoLine.example[0]}
          </p>
          <div style={{ width: "27px" }}> B : </div>
          <p className="truth-table-possible-meaning">
            {this.state.arrayInfoLine.example[1]}
          </p>
        </div>
      );
    }
  }

  setInfoTruthLine(
    number,
    name,
    alternativeName,
    description,
    lecture,
    // link
    reductibleTo,
    // itself
    category,
    character,
    example,
    image,
    type,
    dual,
    negativeOpposite
  ) {
    if (!isNaN(number)) {
      this.setState({
        arrayInfoLine: {
          number: number,
          name: name,
          alternativeName: alternativeName,
          description: description,
          lecture: lecture,
          // link
          reductibleTo: reductibleTo,
          // itself
          category: category,
          character: character,
          example: example,
          image: image,
          type: type,
          dual: dual,
          negativeOpposite: negativeOpposite
        }
      });
    }
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

  renderAlternativeName() {
    if (this.state.arrayInfoLine.alternativeName.length > 0) {
      return (
        <li style={{ fontSize: "14px", color: "grey" }}>
          Autres noms : {this.state.arrayInfoLine.alternativeName}
        </li>
      );
    }
  }

  renderImage() {
    if (this.state.arrayInfoLine.image.length > 0) {
      return (
        <img
          src={this.state.arrayInfoLine.image}
          style={{ width: "100px", height: "73px" }}
          alt="Aristote le bg"
        />
      );
    }
  }

  renderType() {
    if (this.state.arrayInfoLine.type) {
      return "Type : " + this.state.arrayInfoLine.type;
    }
  }
  renderDual() {
    if (this.state.arrayInfoLine.dual) {
      return "Dual : " + this.state.arrayInfoLine.dual;
    }
  }
  renderNegativeOpposite() {
    if (this.state.arrayInfoLine.negativeOpposite) {
      return "Opposé négatif : " + this.state.arrayInfoLine.negativeOpposite;
    }
  }
  renderAllInformations() {
    let reductibleTo = "";
    const char = this.state.arrayInfoLine.reductibleTo;
    if (
      char.length > 0 &&
      char !== "q" &&
      char !== "p" &&
      char !== "~q" &&
      char !== "~p"
    ) {
      reductibleTo = <li>Peut être réduit à : {char}</li>;
    }

    if (this.state.arrayInfoLine.number > 0) {
      return (
        <Fragment>
          <li>{this.state.arrayInfoLine.number}</li>
          <li>Nom : {this.state.arrayInfoLine.name}</li>
          {this.renderAlternativeName()}
          <li>{this.state.arrayInfoLine.description}</li>
          <li>Caractère : {this.state.arrayInfoLine.character[0]}</li>
          {this.renderLecture()}
          {reductibleTo}
          <li>{this.renderType()}</li>
          <li>{this.renderDual()}</li>
          <li>{this.renderNegativeOpposite()}</li>
          <li>{this.renderExample()}</li>
          <li>{this.renderImage()}</li>
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
          this.setInfoTruthLine(
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          );
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
              this.setInfoTruthLine(
                TruthTable[i].number,
                TruthTable[i].name,
                TruthTable[i].alternativeName,
                TruthTable[i].description,
                TruthTable[i].lecture,
                // link
                TruthTable[i].reductibleTo,
                // itself
                TruthTable[i].category,
                TruthTable[i].character,
                TruthTable[i].example,
                TruthTable[i].image,
                TruthTable[i].type,
                TruthTable[i].dual,
                TruthTable[i].negativeOpposite
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
      <div>
        <h2>Table de vérité</h2>
        <div className="main-truth-table">
          <ul className="whole-truth-table">{this.renderTruthTable()} </ul>
          <ul className="box-info-truth-table">
            {this.renderAllInformations()}
          </ul>
        </div>
      </div>
    );
  }
}

export default ShowTruthTable;
