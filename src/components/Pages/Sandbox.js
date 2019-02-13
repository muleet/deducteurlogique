import React, { Component, Fragment } from "react";
// import Exercises from "../../data/Exercises.json";
import ShowInfoSandbox from "./Components/ShowInfoSandbox";
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
  renderCompatibleInferencesForCurrentRule(value) {
    let result = "";
    if (value.isTheInferenceScannerActive) {
      result = (
        <div className="all-indicators-about-inference-validation">
          {value.allInferencesValidForCurrentRule}
        </div>
      ); /* on affiche le tableau contenant les inférences compatibles ou non */
    }
    return result;
  }

  render() {
    let ArrayAllPremisses = [
      "p",
      "q",
      "~p",
      "~q",
      "p∧q",
      "p∨q",
      "p⊻q",
      "p⊃q",
      "p⊃~q",
      "q⊃~p",
      "p⊅q",
      "q⊅p",
      "p≡q",
      "p↑q",
      "q↓p",
      "p≡q",
      "(p∧q)∧(p∧r)",
      "q⊃r",
      "~(p∧q)",
      "p⊃(q⊃r)",
      "~(p∧r)",
      "p∧r",
      "p≡(q≡r)",
      "~(p∧~q)",
      "~(p∨q)",
      "~(~p∧q)∧~(p∧~q)",
      "~(pvq)≡(~p^~q)"
    ];

    return (
      <InferenceProvider>
        <InferenceContext.Consumer>
          {(
            value // (méga important) on permet à tout ce qui est dans la balise InferenceContext.Consumer, d'avoir accès au state déclaré dans InferenceProvider (pour cela il faut employer la variable value)
          ) => (
            <Fragment>
              <h3 className="pageTitle">Bac à sable logique</h3>
              <div className="deducer">
                <section className="infos-and-deduction-itself">
                  {
                    <ShowInfoSandbox
                      premissesSent={ArrayAllPremisses}
                      valueInference={value}
                    />
                  }
                  <Fragment>
                    <ul className="deduction">
                      {this.renderCompatibleInferencesForCurrentRule(value)}
                      {value.allInferencesRendered}
                    </ul>
                    {/* <Debugger valueInference={value} /> */}
                    {value.advice}
                  </Fragment>
                </section>
                <section className="usablesRules">
                  <ul className="setOfRules">
                    <ButtonRuleMaker
                      // rulesSent={this.state.currentExercise.rulesImplied}
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
}

export default Deducer;
