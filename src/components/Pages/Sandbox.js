import React, { Component } from "react";
// import Exercises from "../../data/Exercises.json";
import ShowInfoSandbox from "./Components/ShowInfoSandbox";
// import SandboxShowUserRequirements from "./Components/SandboxShowUserRequirements";
import ButtonRuleMaker from "../Calcul Tools/Deducer Tools/ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../Context/InferenceProvider";
import Debugger from "../Debugger";
// import AppShortcuts from "../AppShortcuts";
// import { ShortcutManager } from "react-shortcuts";
import ButtonDeductionMaker from "../Calcul Tools/Deducer Tools/ButtonDeductionMaker";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.
class Deducer extends Component {
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
      "p⊃q",
      "q⊃r",
      "p∨q",
      "p⊻q",
      "p≡q",
      "p⊅q",
      "q⊅p",
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
                  <div id="deduction-and-setOfRules">
                    <ButtonRuleMaker
                      // rulesSent={this.state.currentExercise.rulesImplied}
                      valueInference={value}
                      sandbox={true}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <ButtonDeductionMaker valueInference={value} />
                      <ul className="deduction">
                        {value.showAllInferences() /* on affiche le tableau */}
                      </ul>
                    </div>
                  </div>
                  {value.advice}
                  {this.renderDebugger(value)}
                </section>

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
            </div>
          )}
        </InferenceContext.Consumer>
      </InferenceProvider>
    );
  }
}

export default Deducer;
