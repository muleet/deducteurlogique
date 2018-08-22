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
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storeInferenceForRule(
                copyArray.length + " ",
                newInference.itself
              );
            }
          }}
        />
      );
      this.setState(state => ({
        allInferences: copyArray,
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.storeInferenceForRule = (numInference, inferenceItself) => {
      let copyArrayStoredInference = [...this.state.storedInference];
      if (this.state.canInferenceBeStored === true) {
        copyArrayStoredInference.push(
          <Fragment key={copyArrayStoredInference.length}>
            <p className="infNum-color">{numInference}</p>
            <p className="infItself-color">{inferenceItself}</p>
          </Fragment>
        );
        this.setState(state => ({
          storedInference: copyArrayStoredInference
        }));
      }
    };

    this.changeStorageBoolean = redo => {
      if (redo === "redo") {
        this.setState({
          storedInference: []
        });
      } else if (!this.state.canInferenceBeStored) {
        this.setState({ canInferenceBeStored: true });
      } else {
        this.setState({
          canInferenceBeStored: false,
          storedInference: [] // on vide les inférences stockées durant le court temps où storedInference était pushable
        });
      }
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
      storedInference: [], // contient les inférences stockées pour la validation d'une règle
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storeInferenceForRule: this.storeInferenceForRule,
      giveSolution: this.giveSolution,
      resetDeduction: this.resetDeduction
    };
  }

  render() {
    console.log("bonjour");
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
