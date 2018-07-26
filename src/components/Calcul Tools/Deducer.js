import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Exercises from "../../data/Exercises.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import DetermineTruthOfPropositions from "./DetermineTruthOfPropositions";
import TesteurTemporaire from "./TesteurTemporaire";
import ButtonRuleMaker from "./ButtonRuleMaker";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
class Deducer extends Component {
  state = {
    // inferenceNumber: 1,
    totalInferences: [],
    currentExercise: {}
  };

  updateTotalInferences = NewInference => {
    // On ajoute une nouvelle inférence à la déduction
    const copyArray = [...this.state.totalInferences]; // 1. pour modifier un state il faut commencer par en faire une copie
    copyArray.push(
      NewInference
      // 2. ensuite on modifie cette copie comme on le souhaite [note entre crochets à suppr : sachant que cette fonction devrait recevoir pour props le contenu d'une nouvelle inférence et de ses règles]
    );
    this.setState({
      totalInferences: copyArray // 4. pour finir, on dit que le state d'origine est égal à la copie modifiée (on ne peut rien faire de plus)
    });
  };

  changeExercise = num => {
    const newNumber = this.state.currentExercise.Number + num;
    if (newNumber > 0 && newNumber < Exercises.length) {
      this.setState({
        currentExercise: Exercises[newNumber - 1]
      });
    }
  };

  ruleMaker = () => {
    <ButtonRuleMaker rulesSent={this.state.currentExercise.rulesImplied} />;
  };

  render() {
    if (Object.keys(this.state.currentExercise).length === 0) {
      // On regarde si l'objet contient des clés, grâce à Object.keys (qui renvoie les clés sous forme de tableau). C'est plus fiable de le faire comme ça que de vérifier si c'est un tableau vide.
      return "chargement de l'exo";
    } else {
      const arrayTotalInferences = [...this.state.totalInferences];
      // for (let i = 0; i < this.state.totalInferences.length; i++) {
      // this
      //   .updateTotalInferences(
      //   <MakeInference
      //     key={i}
      //     inferenceNumber={Number(i + 1) + "."}
      //     inferenceItself={this.state.currentExercise.premisses[1]}
      //     inferenceCommentary={
      //       this.state.currentExercise.commentarysaufqu'iln'existepaswesh (faut que je change totalement comment ça fonctionne, ici)
      //     }
      //   />
      //   );
      // }

      return (
        <Fragment>
          <ul className="mini-header-deducer">
            <li>
              <Link to="/">
                <i className="icon fas fa-arrow-circle-left" />
              </Link>
              <Link to="/calcul-prop-exo">
                <i className="icon fas fa-th" />
              </Link>
            </li>
            <li>
              <h2>{this.props.pageName}</h2>
            </li>
            <li>
              <span
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <i
                  className="icon fas fa-arrow-left"
                  onClick={() => {
                    this.changeExercise(-1);
                  }}
                />
                Ex. {this.state.currentExercise.Number}
                <i
                  className="icon fas fa-arrow-right"
                  onClick={() => {
                    this.changeExercise(1);
                  }}
                />
              </span>
            </li>
          </ul>
          <div className="deducer">
            <section className="infos-and-deduction-itself">
              <ShowInformationsExercise
                exerciseSent={this.state.currentExercise}
              />
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
                <ul className="deduction">
                  {this.props.arrayUpdated}
                  <TesteurTemporaire />
                </ul>
              </Fragment>
            </section>
            <section className="usablesRules">
              {/* <DetermineTruthOfPropositions
                exerciseSent={this.state.currentExercise}
              /> */}
              {() => {
                this.ruleMaker();
              }}
            </section>
          </div>
        </Fragment>
      );
    }
  }
  componentDidMount() {
    // On récupère un exo. [TEMP] POUR LE MOMENT c'est fixé à l'exo "0", mais plus tard il faudra que ce soit déterminé par le bouton d'un exercice sur lequel l'utilisateur à cliqué dans une fenêtre précédente. [TEMP]
    this.setState(
      { currentExercise: Exercises[0] }
      // () => console.log("currentexercices", this.state.currentExercise) // j'ai mis un console.log juste après (avec une fonction avec fat arrow)
    );
  }
}

export default Deducer;
