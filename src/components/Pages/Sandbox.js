import React, { Component, Fragment } from "react";
// import Exercises from "../../data/Exercises.json";
import ShowInfoSandbox from "./Components/ShowInfoSandbox";
import SandboxShowUserRequirements from "./Components/SandboxShowUserRequirements";
import ButtonRuleMaker from "../Calcul Tools/Deducer Tools/ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";
import Debugger from "../Debugger";
// import AppShortcuts from "../AppShortcuts";
// import { ShortcutManager } from "react-shortcuts";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
  renderCompatibleInferencesForCurrentRule(value) {
    let result = "";
    if (value.booleansOptionsAboutInferences.boolInferenceScanner) {
      result = (
        <div className="all-indicators-about-inference-validation">
          {value.allInferencesValidForCurrentRule}
        </div>
      ); /* on affiche le tableau contenant les inférences compatibles ou non */
    }
    return result;
  }
  renderDebugger(value) {
    let result = "";
    if (value.booleansOptionsAboutInferences.boolDebugger) {
      result = <Debugger valueInference={value} />; /* on affiche le debugger */
    }
    return result;
  }

  render() {
    let ArrayAllPremisses = [
      "p",
      "q",
      "~p",
      "~q",
      "~~p",
      "p∧q",
      "p∨q",
      "p⊻q",
      "p⊃q",
      "q⊃r",
      "q⊃p",
      "p⊃~q",
      "q⊃~p",
      "p⊅q",
      "q⊅p",
      "p≡q",
      "p↑q",
      "q↓p",
      "p≡q",
      "(p∧q)∧(p∧r)",
      "~(p∧q)",
      "~~(p∧q)",
      "(p∧q)⊃r",
      "p⊃(q⊃r)",
      "~(p∧r)",
      "p∧r",
      "p≡(q≡r)",
      "~(p∧~q)",
      "~(p∨q)",
      "~(~p∧q)∧~(p∧~q)",
      "~(pvq)≡(~p∧~q)"
    ];

    return (
      <InferenceProvider>
        <InferenceContext.Consumer>
          {(
            value // (méga important) on permet à tout ce qui est dans la balise InferenceContext.Consumer, d'avoir accès au state déclaré dans InferenceProvider (pour cela il faut employer la variable value)
          ) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
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
                      {value.showAllInferences() /* on affiche le tableau */}
                    </ul>
                    {value.advice}
                    {this.renderDebugger(value)}
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

              {/* <div className="user-box-info user-color">
                <SandboxShowUserRequirements
                  premissesSent=""
                  conclusionSent=""
                  deductionSent=""
                  rulesSent=""
                  valueInference={value}
                />
              </div> */}
            </div>
          )}
        </InferenceContext.Consumer>
      </InferenceProvider>
    );
  }
}

export default Deducer;
