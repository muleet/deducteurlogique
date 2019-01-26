import React, { Component, Fragment } from "react";
// import Exercises from "../../data/Exercises.json";
import ButtonRuleMaker from "../../Calcul Tools/Deducer Tools/ButtonRuleMaker";
import InferenceProvider, {
  InferenceContext
} from "../../Context/InferenceProvider";
import ShowInformationsExercise from "../../Calcul Tools/Deducer Tools/ShowInformationsExercise";
import ShowPossibleSolutions from "../../Calcul Tools/Deducer Tools/ShowPossibleSolutions";
import ShowPossibleMeaning from "../../Calcul Tools/Deducer Tools/ShowPossibleMeaning";

// Cette classe est appelée dans Calcul des propositions. Elle affiche la totalité des composants nécessaires à une déduction.
// Elle réceptionne un exercice et son contenu, et le redistribue à différentes classes et fonctions.
// Elle réceptionne InferenceContext, qui va véhiculer les infos de chaque nouvelle inférence.

class Deducer extends Component {
  render() {
    let ArrayAllPremisses = ["p", "q", "~p", "~q", "p∧q", "p∨q"];
    const KokoExercise = {
      verbalName: "",
      premisses: ["p", "p⊃q"],
      conclusion: "p",
      meaning: [
        ["p : Vive Kôko", "q : Je t'aime Kôko"],
        ["p : La Terre est ronde", "q : La Terre n'est pas plate"],
        [
          "p : Les politiciens sont irresponsables politiquement",
          "q : Je ne devrai pas transférer ma responsabilité politique aux politiciens"
        ]
      ],
      comment: "",
      rulesImplied: ["rep", "⊃e"],
      doable: true
    };
    return (
      <InferenceProvider>
        <InferenceContext.Consumer>
          {(
            value // (méga important) on permet à tout ce qui est dans la balise InferenceContext.Consumer, d'avoir accès au state déclaré dans InferenceProvider (pour cela il faut employer la variable value)
          ) => (
            <Fragment>
              <h3 className="pageTitle">Kôko est une fille inspirante</h3>
              <div className="deducer">
                <section className="infos-and-deduction-itself">
                  {
                    <ShowInformationsExercise
                      valueInference={value} // on envoie le state déclaré dans InferenceProvider
                      exerciseSent={KokoExercise} // on envoie les données de l'exercice actuel
                    />
                  }{" "}
                  <Fragment>
                    <ul className="deduction">{value.allInferencesRendered}</ul>
                    {value.advice}
                    <ShowPossibleMeaning
                      exerciseSent={KokoExercise}
                      valueInference={value}
                    />
                    <div style={{ fontSize: 16 }}>
                      Solutions : faut que je code un autre truc
                      {/* <ShowPossibleSolutions valueInference={value} /> */}
                    </div>
                  </Fragment>
                </section>
                <section className="usablesRules">
                  <ul className="setOfRules">
                    <ButtonRuleMaker
                      rulesSent={KokoExercise.rulesImplied}
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
