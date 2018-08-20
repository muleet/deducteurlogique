import React, { createContext, Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import MakeInference from "./Calcul Tools/MakeInference";

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
export const InferenceContext = createContext();

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  constructor(props) {
    super(props);

    this.addInference = newInference => {
      // la méthode étatique addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      // console.log("la nouvelle inférence est ", newInference);
      let copyArray = [...this.state.allInferences];
      let copyArrayRendered = [...this.state.allInferencesRendered];

      copyArray.push(newInference);
      copyArrayRendered.push(
        <MakeInference
          key={copyArray.length}
          inferenceNumber={copyArray.length + "."}
          inferenceItself={newInference.itself}
          inferenceCommentary={
            newInference.numberCommentary + ", " + newInference.commentary
          }
        />
      );
      this.setState(state => ({
        allInferences: copyArray,
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.storeInferenceForRule = inferenceToStore => {
      this.setState(state => ({
        storedInference: inferenceToStore
      }));
    };

    this.giveSolution = solution => {
      // la méthode étatique addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      // console.log("la nouvelle inférence est ", solution);
      this.setState(state => ({
        allInferences: [],
        allInferencesRendered: <Fragment>{solution}</Fragment>
      }));
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferences: [],
        allInferencesRendered: []
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      allInferences: [], // contient les données "brutes" des inférences
      allInferencesRendered: [], // contient les données htmlisées des inférences
      storedInference: [],
      addInference: this.addInference,
      storeInferenceForRule: this.storeInferenceForRule,
      giveSolution: this.giveSolution,
      resetDeduction: this.resetDeduction
    };
  }

  render() {
    return (
      /*la propriété value est très importante ici, elle rend le contenu du state disponible aux `Consumers` de l'application*/
      <InferenceContext.Provider value={this.state}>
        {this.props.children}
        {/* quand j'utilise le provider, ce sont les enfants que je lui donne */}
      </InferenceContext.Provider>
    );
  }
}

export default InferenceProvider;
