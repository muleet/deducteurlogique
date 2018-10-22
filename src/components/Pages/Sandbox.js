import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ShowInformationsExercise from "../Calcul Tools/Deducer Tools/ShowInformationsExercise";
import ButtonRuleMaker from "../Calcul Tools/Deducer Tools/ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";
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

  render() {
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
              <h3 className="pageTitle">Bac à sable logique</h3>
              <div className="deducer">
                <section className="infos-and-deduction-itself">
                  {
                    // <ShowInformationsExercise
                    //   valueInference={value} // on envoie le state déclaré dans InferenceProvider
                    //   exerciseSent={this.state.currentExercise} // on envoie les données de l'exercice actuel
                    //   minimalLineNumber={"1"}
                    // />
                  }
                  (page en construction)
                  <Fragment>
                    <ul className="deduction">{value.allInferencesRendered}</ul>
                    {/* <Debugger valueInference={value} /> */}
                    {value.advice}
                  </Fragment>
                </section>
                <section className="usablesRules">
                  <ul className="setOfRules">
                    <ButtonRuleMaker
                      rulesSent={this.state.currentExercise.rulesImplied}
                      valueInference={value}
                      sandbox={true}
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

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // Fonction qui se fait à chaque fois qu'on navigue vers la page actuelle (on part de CalculDesProps pour arriver à CalculDesProps)
    // ici on change de numéro d'exercice (sans recharger la page)
  }
}

export default Deducer;
