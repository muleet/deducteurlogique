import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import MakeInference from "./Calcul Tools/MakeInference";

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
export const InferenceContext = createContext();

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  state = {
    allInferences: "dzaoazijz", // contient les données "brutes" des inférences
    allInferencesRendered: [["inf1"], ["inf2"], ["inf3"]] // contient les données htmlisées des inférences
  };

  addInference = newInference => {
    console.log("addInference fonctionne");

    this.setState({
      allInferencesRendered: [...this.state.allInferencesRendered, newInference]
    });

    // this.setState({
    //   allInferences: [...this.state.allInferences, newInference],
    //   allInferencesRendered: [
    //     ...this.allInferencesRendered,
    //     <MakeInference
    //       inferenceNumber={newInference[0]}
    //       inferenceItself={newInference[1]}
    //       inferenceCommentary={newInference[2]}
    //     />
    //   ]
    // });
  };

  render() {
    if (this.props.inferenceSent === true) {
      this.addInference(this.props.inferenceSent);
      this.props.inferenceSent = false;
    }

    console.log("inferenceSet est ", this.props.inferenceSent);
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <InferenceContext.Provider
        value={(this.state.allInferences, this.state.allInferencesRendered)}
      >
        <button
          onClick={() => {
            // item => {
            this.addInference("bon ben ça marche un peu");
            // };
          }}
        >
          Provider
        </button>
        {this.props.children}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </InferenceContext.Provider>
    );
  }
}

export default InferenceProvider;
