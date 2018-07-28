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

  // ruleMaker = () => {
  //   return (
  //     <ButtonRuleMaker rulesSent={this.state.currentExercise.rulesImplied} />
  //   );
  // };

  render() {
    if (this.props.exerciseNumber > Exercises.length) {
      return "ce nombre ne correspond pas à un exercice";
    } else if (Object.keys(this.state.currentExercise).length === 0) {
      // On regarde si l'objet contient des clés, grâce à Object.keys (qui renvoie les clés sous forme de tableau). C'est plus fiable de le faire comme ça que de vérifier si c'est un tableau vide.
      return "chargement de l'exo";
    } else {
      const arrayTotalInferences = [...this.state.totalInferences];
      const arrayRenderRules = [];
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
            <li className="setOfTextAndIcon">
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
              <span className="setOfTextAndIcon">
                <Link
                  to={"/calcul-prop/" + Number(this.props.exerciseNumber - 1)}
                >
                  <i className="icon fas fa-arrow-left" />
                </Link>
                Ex. {this.state.currentExercise.Number}
                <Link
                  to={"/calcul-prop/" + Number(this.props.exerciseNumber + 1)}
                >
                  <i className="icon fas fa-arrow-right" />
                </Link>
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
              <ul className="setOfRules">
                <ButtonRuleMaker
                  rulesSent={this.state.currentExercise.rulesImplied}
                />
              </ul>
            </section>
          </div>
        </Fragment>
      );
    }
  }
  componentDidMount() {
    this.setState(
      { currentExercise: Exercises[Number(this.props.exerciseNumber - 1)] }
      // () => console.log("currentexercices", this.state.currentExercise) // console.log avec une fonction avec fat arrow, oui ça existe
    );
  }

  componentWillReceiveProps(nextProps) {
    // fonction qui se fait à chaque fois qu'on navigue vers la page actuelle (on part de CalculDesProps pour arriver à CalculDesProps)
    this.setState({
      currentExercise: Exercises[Number(nextProps.exerciseNumber - 1)]
    });
  }
}

export default Deducer;
