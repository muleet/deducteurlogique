import React, { Component, Fragment } from "react";
import MakeInference from "./MakeInference";

class Deduction extends Component {
  state = {
    inferenceNumber: 1,
    totalInferences: []
  };

  updateTotalInferences = () => {
    // On ajoute une nouvelle inférence à la déduction
    const copyArray = [...this.state.totalInferences]; // 1. pour modifier un state il faut commencer par en faire une copie
    copyArray.push({
      // 2. ensuite on modifie cette copie comme on le souhaite [note entre crochets à suppr : sachant que cette fonction devrait recevoir pour props le contenu d'une nouvelle inférence et de ses règles]
      inferenceItself: "p⊃q", // ces deux lignes ne peuvent avoir pour contenu QUE ce que contiennent les boutons de l'interface
      inferenceCommentary: "reit" // ces deux lignes ne peuvent avoir pour contenu QUE ce que contiennent les boutons de l'interface
    });

    this.setState({
      totalInferences: copyArray // 3. pour finir, on dit que le state d'origine est égal à la copie modifiée (on ne peut rien faire de plus)
    });
  };

  // increment = event => {
  //   // console.log(event); // truc que xavier a mis et c'est intéressant mais je comprends pas
  //   this.setState({ inferenceNumber: this.state.inferenceNumber + 1 });
  //   return;
  // };

  render() {
    const arrayTotalInferences = [];
    for (let i = 0; i < this.state.totalInferences.length; i++) {
      this.updateTotalInferences;
      arrayTotalInferences.push(
        <MakeInference
          key={i}
          inferenceNumber={Number(i + 1) + "."}
          inferenceItself={this.state.totalInferences[0].inferenceItself}
          inferenceCommentary={
            this.state.totalInferences[0].inferenceCommentary
          }
        />
      );
    }

    return (
      <Fragment>
        <button
          type="button"
          className="deduction-button"
          onClick={() => {
            this.updateTotalInferences();
          }}
        >
          inférer
        </button>
        <ul className="deduction">{arrayTotalInferences}</ul>
      </Fragment>
    );
  }
  componentDidMount() {}
}

export default Deduction;
