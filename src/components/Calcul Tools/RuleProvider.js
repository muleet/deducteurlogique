import React, { createContext, Fragment, Component } from "react";

export const RuleContext = createContext();

class RuleProvider extends Component {
  constructor(props) {
    super(props);

    this.conditionalElimination = (A, ifAthenB) => {
      console.log("⊃e", ifAthenB.indexOf("⊃"));
      if (ifAthenB.indexOf("⊃") !== -1) {
      }
    };

    this.conjonditionalElimination = (A, AandB) => {};

    this.state = {
      machin: "le state machin s'affiche",
      conditionalElimination: this.conditionalElimination,
      conjonctionElimination: this.conjonctionElimination
    };
  }

  render() {
    console.log("le render de rule provider fonctionne");
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
