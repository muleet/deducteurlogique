import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Exercises from "../../data/Exercises.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import TesteurExo2 from "./Temporary Components/TesteurExo2";
import TesteurExo3 from "./Temporary Components/TesteurExo3";
import ButtonRuleMaker from "./ButtonRuleMaker";
import InferenceProvider, { InferenceContext } from "../InferenceProvider";
import MakeInference from "./MakeInference";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
  state = {
    // inferenceNumber: 1,
    totalInferences: [], // state qui pour le moment n'a pour rôle que de contenir les bonnes solutions des exercices
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
      totalInferences: copyArray // 3. pour finir, on dit que le state d'origine est égal à la copie modifiée
    });
  };

  render() {
    if (this.props.exerciseNumber > Exercises.length) {
      return "ce nombre ne correspond pas à un exercice";
    } else if (Object.keys(this.state.currentExercise).length === 0) {
      // On regarde si l'objet contient des clés, grâce à Object.keys (qui renvoie les clés sous forme de tableau). C'est plus fiable de le faire comme ça que de vérifier si c'est un tableau vide.
      return "chargement de l'exo";
    } else {
      return (
        <InferenceProvider>
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
                <InferenceContext.Consumer>
                  {value => (
                    <ShowInformationsExercise
                      valueSent={value}
                      exerciseSent={this.state.currentExercise}
                    />
                  )}
                </InferenceContext.Consumer>
                <Fragment>
                  <button
                    type="button"
                    className="deduction-button"
                    onClick={() => {
                      this.updateTotalInferences(<TesteurExo2 />);
                    }}
                  >
                    exo2
                  </button>
                  <button
                    type="button"
                    className="deduction-button"
                    onClick={() => {
                      this.updateTotalInferences(<TesteurExo3 />);
                    }}
                  >
                    exo3
                  </button>
                  <ul className="deduction">
                    {this.state.totalInferences}
                    <InferenceContext.Consumer>
                      {value => value.allInferencesRendered
                      /* <button
                            onClick={() => value.addInference("bonjour")}
                            style={{ color: "green" }}
                          >
                            addInference
                          </button> */
                      }
                    </InferenceContext.Consumer>
                  </ul>
                </Fragment>
              </section>
              <section className="usablesRules">
                <ul className="setOfRules">
                  <ButtonRuleMaker
                    rulesSent={this.state.currentExercise.rulesImplied}
                  />
                </ul>
              </section>
            </div>
          </Fragment>
        </InferenceProvider>
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
    // Fonction qui se fait à chaque fois qu'on navigue vers la page actuelle (on part de CalculDesProps pour arriver à CalculDesProps)
    // Elle permet de changer de numéro d'exercice (sans recharger la page)
    if (
      this.props.exerciseNumber > 1 ||
      this.props.exerciseNumber < Exercises.length
    ) {
      this.setState({
        currentExercise: Exercises[Number(nextProps.exerciseNumber - 1)]
      });
    }
    // ici on remet à zéro les inférences que l'utilisateur a produit
    <InferenceContext.Consumer>
      {value => {
        () => value.resetDeduction();
      }}
    </InferenceContext.Consumer>;
  }
}

export default Deducer;
