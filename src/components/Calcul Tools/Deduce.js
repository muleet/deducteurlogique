import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Exercises from "../../data/Exercises.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import ButtonRuleMaker from "./ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";
import ShowPossibleSolutions from "./ShowPossibleSolutions";
import ShowPossibleMeaning from "./ShowPossibleMeaning";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
  state = {
    currentExercise: {}
  };

  n;

  showMiniHeaderDeducer(value) {
    let currentExerciseParamNumber = this.props.exerciseNumber;
    let leftArrow = (
      <Link
        to={"/calcul-prop/" + Number(currentExerciseParamNumber - 1)}
        onClick={() => value.resetDeduction()}
      >
        <i className={"icon fas fa-arrow-left"} />
      </Link>
    );
    let rightArrow = (
      <Link
        to={"/calcul-prop/" + Number(currentExerciseParamNumber + 1)}
        onClick={() => value.resetDeduction()}
      >
        <i className={"icon fas fa-arrow-right"} />
      </Link>
    );
    if (currentExerciseParamNumber === 1) {
      leftArrow = <i className={"icon fas fa-arrow-left deactivated"} />;
    }
    if (currentExerciseParamNumber === Exercises.length) {
      rightArrow = <i className={"icon fas fa-arrow-right deactivated"} />;
    }

    return (
      <Fragment>
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
            {leftArrow}
            Ex. {this.state.currentExercise.Number}
            {rightArrow}
          </span>
        </li>
      </Fragment>
    );
  }

  render() {
    if (Object.keys(this.state.currentExercise).length === 0) {
      // On regarde si l'objet contient des clés, grâce à Object.keys (qui renvoie les clés sous forme de tableau). C'est plus fiable de le faire comme ça que de vérifier si c'est un tableau vide.
      return "chargement de l'exo";
    } else {
      return (
        <InferenceProvider>
          <InferenceContext.Consumer>
            {(
              value // (méga important) on permet à tout ce qui est dans la balise InferenceContext.Consumer, d'avoir accès au state déclaré dans InferenceProvider (pour cela il faut employer la variable value)
            ) => (
              <Fragment>
                <ul className="mini-header-deducer">
                  {this.showMiniHeaderDeducer(value)}
                </ul>
                <div className="deducer">
                  <section className="infos-and-deduction-itself">
                    {
                      <ShowInformationsExercise
                        valueSent={value} // on envoie le state déclaré dans InferenceProvider
                        exerciseSent={this.state.currentExercise} // on envoie les données de l'exercice actuel
                      />
                    }
                    <Fragment>
                      <ul className="deduction">
                        {
                          value.allInferencesRendered /* on affiche le tableau */
                        }
                      </ul>
                      <ShowPossibleMeaning
                        exerciseSent={this.state.currentExercise}
                      />
                      <div style={{ fontSize: 16 }}>
                        Solutions : <ShowPossibleSolutions valueSent={value} />
                      </div>
                    </Fragment>
                  </section>
                  <section className="usablesRules">
                    <ul className="setOfRules">
                      <ButtonRuleMaker
                        rulesSent={this.state.currentExercise.rulesImplied}
                        valueSent={value}
                      />
                    </ul>
                  </section>
                </div>
              </Fragment>
            )}
          </InferenceContext.Consumer>
        </InferenceProvider>
      );
    }
  }

  componentDidMount() {
    this.setState(
      { currentExercise: Exercises[Number(this.props.exerciseNumber - 1)] }
      // () => console.log("currentExercice", this.state.currentExercise) // console.log avec une fonction avec fat arrow, oui ça existe
    );
  }

  componentWillReceiveProps(nextProps) {
    // Fonction qui se fait à chaque fois qu'on navigue vers la page actuelle (on part de CalculDesProps pour arriver à CalculDesProps)
    // ici on remet à zéro les inférences que l'utilisateur a produit, il ne doit pas avoir les mêmes d'un exo à l'autre

    // ici on change de numéro d'exercice (sans recharger la page)
    if (
      this.props.exerciseNumber > 1 ||
      this.props.exerciseNumber < Exercises.length
    ) {
      this.setState({
        currentExercise: Exercises[Number(nextProps.exerciseNumber - 1)]
      });
    }
  }
}

export default Deducer;
