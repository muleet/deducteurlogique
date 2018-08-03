import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
export const InferenceContext = createContext({
  NewInference: ""
  // state = {
  // number : []
  // content: ["p∧q", "q"],
  // commentary: []
  // }
});

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values
 seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  state = {
    number: [],
    content: [],
    commentary: []
  };

  addInference = newInference => {
    this.setState({ content: [...this.state.content, newInference] });
  };

  render() {
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <InferenceContext.Provider
        value={this.state}
        addInference={this.addInference}
      >
        {this.props.children}{" "}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </InferenceContext.Provider>
    );
  }
}

export default InferenceProvider;
