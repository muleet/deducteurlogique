import React, { createContext, Component, Fragment } from "react";
import InferenceProvider, { InferenceContext } from "./InferenceProvider";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    this.conditionalElimination = (A, ifAthenB) => {
      let result = "";
      const positionConditional = ifAthenB.indexOf("⊃");
      console.log("position de ⊃", positionConditional);
      if (positionConditional !== -1) {
        const antecedent = ifAthenB.slice(0, ifAthenB.indexOf("⊃"));
        const consequent = ifAthenB.slice(
          Number(ifAthenB.indexOf("⊃")) + 1,
          ifAthenB.length
        );
        console.log("antécédent", antecedent, "conséquent", consequent);
        if (antecedent === A) {
          result = consequent;
          this.addInferenceFromRule(result);
        } else {
          result = "error";
        }
        console.log("result", result);
        return result;
      }
    };

    this.conjonctionElimination = (A, AandB) => {};

    this.addInferenceFromRule = InferenceItself => {
      if (InferenceItself !== "error" || InferenceItself !== "") {
        const inference = {
          itself: InferenceItself,
          numberCommentary: "num",
          commentary: "⊃e"
        };
        console.log("how about tu niques ta race");
        return (
          <Fragment>
            <InferenceProvider>
              <InferenceContext.Consumer>
                {value => value.addInference(inference)}
                {/* // on envoie cet objet comme argument de la fonction contextuelle
            addInference, qui provient d'InferenceProvider } */}
              </InferenceContext.Consumer>
            </InferenceProvider>
          </Fragment>
        );
      } else {
        console.log("erreur dans la vérification de la règle");
      }
    };

    this.state = {
      conditionalElimination: this.conditionalElimination,
      conjonctionElimination: this.conjonctionElimination,
      addInferenceFromRule: this.addInferenceFromRule,
      fautvérifierquelinferencenestcomposeequedepropositionsetdeparenthèses:
        "et il faudra une fonction dans la classe RuleProvider pour ça"
    };
  }

  render() {
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <RuleContext.Provider value={this.state}>
        {this.props.children}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </RuleContext.Provider>
    );
  }
}
export default RuleProvider;
