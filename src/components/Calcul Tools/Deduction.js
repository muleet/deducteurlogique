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
      inferenceItself: "p⊃q",
      inferenceCommentary: "reit"
    });

    this.setState({
      totalInferences: copyArray // 3. pour finir, on di que le state d'origine est égal à la copie modifiée (on ne peut rien faire de plus)
    });
    // return this.state.totalInferences;
  };

  increment = event => {
    // console.log(event); // truc que xavier a mis et c'est intéressant mais je comprends pas
    this.setState({ inferenceNumber: this.state.inferenceNumber + 1 });
    return;
  };

  render() {
    const arrayToShow = [];
    for (let i = 0; i < this.state.totalInferences.length; i++) {
      this.increment;
      arrayToShow.push(
        <MakeInference
          inferenceNumber={this.state.inferenceNumber + ". "}
          inferenceItself={this.state.totalInferences.inferenceItself}
          inferenceCommentary={this.state.totalInferences.inferenceCommentary}
        />
      );
    }

    return (
      <Fragment>
        <button
          type="button"
          className="deduction-button"
          onClick={() => {
            this.increment();
            this.updateTotalInferences();
          }}
        >
          inférer
        </button>
        <ul className="deduction">{arrayToShow}</ul>
      </Fragment>
    );
  }
  componentDidMount() {}
}

export default Deduction;
