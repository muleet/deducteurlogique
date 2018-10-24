import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Exercises from "../../data/Exercises.json";
import ExercisesSolution from "../../data/ExercisesSolution.json";
import ShowInformationsExercise from "./Deducer Tools/ShowInformationsExercise";
import ButtonRuleMaker from "./Deducer Tools/ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";
import ShowPossibleSolutions from "./Deducer Tools/ShowPossibleSolutions";
import ShowPossibleMeaning from "./Deducer Tools/ShowPossibleMeaning";
// import Debugger from "../Debugger";
// import AppShortcuts from "../AppShortcuts";
// import { ShortcutManager } from "react-shortcuts";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
  state = {
    currentExercise: {}
  };

  showMiniHeaderDeducer(value) {
    const currentExerciseParamNumber = this.props.exerciseNumber;
    let leftArrow = (
      <Link
        to={"/calcul-prop/" + Number(currentExerciseParamNumber - 1)}
        onClick={() => {
          value.resetDeduction();
          value.setRuleModal(false);
        }}
      >
        <i className={"icon icon-menu fas fa-arrow-left"} />
      </Link>
    );
    let rightArrow = (
      <Link
        to={"/calcul-prop/" + Number(currentExerciseParamNumber + 1)}
        onClick={() => {
          value.resetDeduction();
          value.setRuleModal(false);
        }}
      >
        <i className={"icon icon-menu fas fa-arrow-right"} />
      </Link>
    );
    if (currentExerciseParamNumber === 1) {
      leftArrow = (
        <i className={"icon icon-menu fas fa-arrow-left deactivated"} />
      );
    }
    if (currentExerciseParamNumber === Exercises.length) {
      rightArrow = (
        <i className={"icon icon-menu fas fa-arrow-right deactivated"} />
      );
    }
    return (
      <Fragment>
        <li className="setOfTextAndIcon">
          <Link to="/">
            <i className="icon icon-menu fas fa-arrow-circle-left" />
          </Link>
          <Link to="/calcul-prop-exo">
            <i className="icon icon-menu fas fa-th" />
          </Link>
        </li>
        <li>
          <h3>{this.props.pageName}</h3>
        </li>
        <li>
          <span className="setOfTextAndIcon">
            {leftArrow}
            Ex. {currentExerciseParamNumber}
            {rightArrow}
          </span>
        </li>
      </Fragment>
    );
  }

  render() {
    if (
      isNaN(this.props.exerciseNumber) ||
      this.props.exerciseNumber < 1 ||
      this.props.exerciseNumber > Exercises.length
    ) {
      return (
        <Fragment>
          Erreur du paramètre dans la barre d'adresse.
          <br />
          Veuillez entrer un nombre entier positif, inférieur ou égal
          <br />
          au nombre total d'exercices, c'est-à-dire {Number(Exercises.length)}.
        </Fragment>
      );
    } else if (Object.keys(this.state.currentExercise).length === 0) {
      // On regarde si l'objet contient des clés, grâce à Object.keys (qui renvoie les clés sous forme de tableau). C'est plus fiable de le faire comme ça que de vérifier si c'est un tableau vide.
      return "Cet exercice a mal été chargé.";
    } else {
      return (
        <InferenceProvider
          conclusionSent={this.state.currentExercise.conclusion}
          meaningSent={this.state.currentExercise.meaning}
        >
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
                        valueInference={value} // on envoie le state déclaré dans InferenceProvider
                        exerciseSent={this.state.currentExercise} // on envoie les données de l'exercice actuel
                        minimalLineNumber={
                          ExercisesSolution[this.props.exerciseNumber - 1]
                            .possibleSolution.length
                        }
                      />
                    }
                    {/* Sert à afficher des infos à l'utilisateur */}
                    <Fragment>
                      <ul className="deduction">
                        {
                          value.allInferencesRendered /* on affiche le tableau */
                        }
                      </ul>
                      {/* <Debugger valueInference={value} /> */}
                      {value.advice}
                      <ShowPossibleMeaning
                        exerciseSent={this.state.currentExercise}
                        valueInference={value}
                      />
                      <div style={{ fontSize: 16 }}>
                        Solutions :{" "}
                        <ShowPossibleSolutions valueInference={value} />
                      </div>
                    </Fragment>
                  </section>
                  <section className="usablesRules">
                    <ul className="setOfRules">
                      <ButtonRuleMaker
                        rulesSent={this.state.currentExercise.rulesImplied}
                        valueInference={value}
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
      // () => consolelog("currentExercice", this.state.currentExercise) // consolelog avec une fonction avec fat arrow, oui ça existe
    );
  }

  componentWillReceiveProps(nextProps) {
    // Fonction qui se fait à chaque fois qu'on navigue vers la page actuelle (on part de CalculDesProps pour arriver à CalculDesProps)
    // ici on change de numéro d'exercice (sans recharger la page)
    if (
      this.props.exerciseNumber >= 1 ||
      this.props.exerciseNumber <= Exercises.length
    ) {
      this.setState({
        currentExercise: Exercises[Number(nextProps.exerciseNumber - 1)] // nextProps contient les données du futur rechargement de la page, c'est hyper important
      });
    }
  }
}

export default Deducer;
