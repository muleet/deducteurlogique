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
    const KokoExercise = {
      verbalName: "",
      premisses: [
        "((p∧r)∧t)⊃~q",
        "t↑P",
        "(q↓u)↓v",
        "T⊃t",
        "((p∧l)∧(w∧s))⊃k",
        "(a∨A)≡C"
      ],
      conclusion: "k",
      meaning: [
        [
          "p : Elle aime diversifier sa pensée et lire des livres.",
          "P : Elle a beaucoup de temps pour diversifier sa pensée et lire des livres",
          "~q : Elle n'a pas de temps.",
          "t : Elle a un travail qui lui permet d'avoir un salaire.",
          "T : Elle doit avoir un salaire, pour vivre et se loger.",
          "w : Elle a eu une vie difficile.",
          "r : Elle a pleins d'amants.",
          "l : Elle est très libre.",
          "~u : Elle n'a pas de famille biologique.",
          "s : Elle est hyper sympa.",
          "~v : Elle ne cherche pas à être aimée (car ce serait une forme de faiblesse selon elle).",
          "a : Elle pourrait apprendre à coder.",
          "A : Elle pourrait prendre du temps pour écrire des textes.",
          "C : Elle a du temps et des moyens pour changer d'activité professionnelle.",
          "k : Elle est une fille ultra méga super trop cool, être son amant doit être un bonheur immense, Quentin aimerait changer pleins de choses en lui pour apprendre à lui plaire."
        ]
      ],
      comment: "",
      rulesImplied: ["rep", "⊃e", "∧e", "∧i"],
      doable: true
    };
    const KokoSolution = [
      { itself: "|p", numberCommentary: "", commentary: "hyp" },
      { itself: "|p⊅r", numberCommentary: "b", commentary: "rep" },
      { itself: "|~r", numberCommentary: "1, 2", commentary: "⊅e" },
      { itself: "|p⊃q", numberCommentary: "a", commentary: "rep" },
      { itself: "|q", numberCommentary: "1, 4", commentary: "⊃e" },
      { itself: "|q∧~r", numberCommentary: "5, 3", commentary: "∧e" },
      { itself: "p⊃(q∧~r)", numberCommentary: "1-6", commentary: "⊃i" }
    ];
    return (
      <InferenceProvider>
        <InferenceContext.Consumer>
          {(
            value // (méga important) on permet à tout ce qui est dans la balise InferenceContext.Consumer, d'avoir accès au state déclaré dans InferenceProvider (pour cela il faut employer la variable value)
          ) => (
            <Fragment>
              <h3 className="pageTitle">Kôko est une fille inspirante</h3>
              <div className="deducer">
                <section className="infos-and-deduction-itself fat-infos-and-deduction">
                  {
                    <ShowInformationsExercise
                      valueInference={value} // on envoie le state déclaré dans InferenceProvider
                      exerciseSent={KokoExercise} // on envoie les données de l'exercice actuel
                      minimalLineNumber={KokoSolution.length}
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
                      Solution possible : (faut que je code un autre truc)
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
