import React, { Component } from "react";

class ShowPossibleMeaning extends Component {
  renderMyContent(MyContent) {
    return MyContent;
  }
  renderMyFeather(MyFeather) {
    return MyFeather;
  }

  // if (currentMeaningNumber === "rien") {
  //   // on vérifie que currentMeaningNumber n'est pas juste "rien"
  //   let isTheNumberDifferent = false;
  //   while (isTheNumberDifferent !== true) {
  //     console.log("handleclick2");
  //     const newNumber = this.randomFromLength(meanings.length);
  //     if (currentMeaningNumber !== newNumber) {
  //       isTheNumberDifferent = true;
  //       currentMeaningNumber = newNumber;
  //       console.log(possibleMeaning[newNumber]);
  //       myContent = (
  //         <ul className="possible-meaning">{possibleMeaning[newNumber]}</ul>
  //       );
  //     }
  //   }
  // } else {
  //   console.log("handleclickelse");
  //   currentMeaningNumber = "rien";
  //   myContent = (
  //     <p className={"no-meaning-shown"}>
  //       afficher une signification possible
  //     </p>
  //   );
  // }

  randomFromLength = length => {
    return Math.floor(Math.random() * length);
  };

  render() {
    let myContent = "";
    let myFeather = "";
    let currentMeaningNumber = "rien";
    let onlyOnce = 0;
    myContent = "tg";

    if (!(this.props.exerciseSent.meaning[0] === undefined) && onlyOnce === 0) {
      myContent = (
        <p className={"no-meaning-shown"}>
          afficher une signification possible
        </p>
      );
      myFeather = (
        <i
          id="feather-meaning"
          className="fas fa-feather-alt icon"
          onClick={() => this.handleClick()}
        />
      );
      onlyOnce = 1;
    } else {
      myContent = (
        <p className="no-meaning-shown">
          pas de signification prévue pour cet exercice
        </p>
      );
      myFeather = <i id="feather-meaning" className="fas fa-feather-alt" />;
      onlyOnce = 1;
    }

    const meanings = this.props.exerciseSent.meaning;
    let possibleMeaning = [[], [], [], [], [], [], [], [], [], [], [], [], []]; // flemme de faire un code qui crée un nombre de case cohérent avec le nombre d'exemples
    if (!(meanings === undefined)) {
      for (let i = 0; i < meanings.length; i++) {
        for (let j = 0; j < meanings[i].length; j++) {
          possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
        }
      }
    }

    this.handleClick = () => {
      console.log("handleclick");
      myContent = "tg";
      // if (currentMeaningNumber === "rien") {
      //   // on vérifie que currentMeaningNumber n'est pas juste "rien"
      //   let isTheNumberDifferent = false;
      //   while (isTheNumberDifferent !== true) {
      //     console.log("handleclick2");
      //     const newNumber = this.randomFromLength(meanings.length);
      //     if (currentMeaningNumber !== newNumber) {
      //       isTheNumberDifferent = true;
      //       currentMeaningNumber = newNumber;
      //       console.log(possibleMeaning[newNumber]);
      //       myContent = (
      //         <ul className="possible-meaning">{possibleMeaning[newNumber]}</ul>
      //       );
      //     }
      //   }
      // } else {
      //   console.log("handleclickelse");
      //   currentMeaningNumber = "rien";
      //   myContent = (
      //     <p className={"no-meaning-shown"}>
      //       afficher une signification possible
      //     </p>
      //   );
      // }
    };

    return (
      <div className="set-meaning">
        {this.renderMyFeather()}
        {this.renderMyContent()}
      </div>
    );
  }
}

export default ShowPossibleMeaning;
