import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Exercises from "../../data/Exercises.json";
import ShowInformationsExercise from "./ShowInformationsExercise";
import ButtonRuleMaker from "./ButtonRuleMaker";
import InferenceProvider, { InferenceContext } from "../InferenceProvider";
import ShowPossibleSolutions from "./ShowPossibleSolutions";
import ShowInferencePossibleMeaning from "./ShowInferencePossibleMeaning";
import MyModal from "../MyModal";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
  state = {
    currentExercise: {}
  };

  // updateTotalInferences = NewInference => {
  //   // On ajoute une nouvelle inférence à la déduction
  //   const copyArray = [...this.state.totalInferences]; // 1. pour modifier un state il faut commencer par en faire une copie
  //   copyArray.push(
  //     <Fragment key={this.state.totalInferences.length}>
  //       {NewInference}
  //     </Fragment>
  //     // 2. ensuite on modifie cette copie comme on le souhaite [note entre crochets à suppr : sachant que cette fonction devrait recevoir pour props le contenu d'une nouvelle inférence et de ses règles]
  //   );
  //   this.setState({
  //     totalInferences: copyArray // 3. pour finir, on dit que le state d'origine est égal à la copie modifiée
  //   });
  // };

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
                        to={
                          "/calcul-prop/" +
                          Number(this.props.exerciseNumber - 1)
                        }
                      >
                        <i className="icon fas fa-arrow-left" />
                      </Link>
                      Ex. {this.state.currentExercise.Number}
                      <Link
                        to={
                          "/calcul-prop/" +
                          Number(this.props.exerciseNumber + 1)
                        }
                      >
                        <i className="icon fas fa-arrow-right" />
                      </Link>
                    </span>
                  </li>
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
                      <ShowInferencePossibleMeaning
                        exerciseSent={this.state.currentExercise}
                      />
                      <div style={{ fontSize: 16 }}>
                        Solutions : <ShowPossibleSolutions valueSent={value} />
                        <br />
                        Test : <MyModal />
                      </div>
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
            )}
          </InferenceContext.Consumer>
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
    // ici on remet à zéro les inférences que l'utilisateur a produit, il ne doit pas avoir les mêmes d'un exo à l'autre
    /* <InferenceContext.Consumer>
      {value => value.resetDeduction()}
     </InferenceContext.Consumer> */

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
