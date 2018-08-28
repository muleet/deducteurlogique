import React, { createContext, Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import MakeInference from "../Calcul Tools/MakeInference";

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
      console.log("bonjour c'est addInference");
      // let copyArray = [...this.state.allInferences];
      let copyArrayRendered = [...this.state.allInferencesRendered];
      // copyArray.push(newInference);
      copyArrayRendered.push(
        <MakeInference
          key={Number(copyArrayRendered.length + 1)}
          inferenceNumber={Number(copyArrayRendered.length + 1) + "."}
          inferenceItself={newInference.itself}
          inferenceCommentary={
            newInference.numberCommentary + ", " + newInference.commentary
          }
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storageForRuleVerification(
                copyArrayRendered.length,
                newInference.itself
              );
            }
          }}
        />
      );
      this.setState(state => ({
        // allInferences: copyArray,
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.storageForRuleVerification = (numInference, inferenceItself) => {
      let copyArrayStoredInference = [...this.state.storedInference];
      let copyArrayStoredInferenceRendered = [
        ...this.state.storedInferenceRendered
      ];
      let copyStoredNumbers = [...this.state.storedNumbers];
      if (this.state.canInferenceBeStored === true) {
        copyArrayStoredInference.push(inferenceItself);
        copyStoredNumbers.push(" " + numInference);
        copyArrayStoredInferenceRendered.push(
          <Fragment key={copyArrayStoredInferenceRendered.length}>
            <p className="infNum-modal">{numInference + "."}</p>
            <p className="infItself-modal">{inferenceItself}</p>
          </Fragment>
        );
        this.setState(state => ({
          storedInference: copyArrayStoredInference,
          storedNumbers: copyStoredNumbers,
          storedInferenceRendered: copyArrayStoredInferenceRendered
        }));
      }
    };

    this.changeStorageBoolean = erase => {
      console.log("ChangeStorageBoolean");
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      if (erase === "erase") {
        this.setState({
          // si cette méthode arrive là c'est que l'utilisateur a cliqué sur la touche pour effacer ce qu'il avait entré
          storedInference: [],
          storedInferenceRendered: [],
          storedNumbers: []
        });
      } else if (!this.state.canInferenceBeStored) {
        this.setState({ canInferenceBeStored: true });
      } else {
        this.setState({
          canInferenceBeStored: false,
          storedInference: [], // on vide les inférences stockées durant le court temps où storedInference était pushable
          storedInferenceRendered: [],
          storedNumbers: ""
        });
      }
    };

    this.giveSolution = solution => {
      // la méthode étatique addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      // console.log("la nouvelle inférence est ", solution);
      this.setState(state => ({
        // allInferences: [],
        allInferencesRendered: <Fragment>{solution}</Fragment>
      }));
    };

    this.removeLastInference = () => {
      // let copyArray = [...this.state.allInferences];
      let copyArrayRendered = [...this.state.allInferencesRendered];
      // copyArray = copyArray.splice(-1);
      copyArrayRendered = copyArrayRendered.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
      this.setState(state => ({
        // allInferences: copyArray,
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        // allInferences: [],
        allInferencesRendered: [],
        storedInference: [],
        storedNumbers: "",
        storedInferenceRendered: []
      }));
    };

    this.state = {
      // allInferences: [], // contient les données "brutes" des inférences
      allInferencesRendered: [], // contient les données htmlisées des inférences
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedInferenceRendered: [], // contient les données htmlisées des inférences stockées pour la validation d'une règle
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
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
