import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
export const InferenceContext = createContext();

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  state = {
    allInferences: []
  };

  addInference = newInference => {
    console.log(newInference);
    this.setState({
      allInferences: [...this.state.allInferences, newInference]
    });
  };

  render() {
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <InferenceContext.Provider
        value={(this.state.allInferences, this.addInference)}
        // addInference={this.addInference}
      >
        {this.props.children}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </InferenceContext.Provider>
    );
  }
}

export default InferenceProvider;
