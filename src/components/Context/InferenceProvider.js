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

    this.addInference = (newInference, hyp) => {
      // la méthode étatique addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      console.log("bonjour c'est addInference");
      let hypNumber = 0;
      let inferenceType = "";
      if (hyp === "nouvelle hypothèse") {
        console.log("bonjour on augmente le niveau d'hypothèse");
        this.changeHypothesisLevel("increase");
        hypNumber = 1;
        inferenceType = "hypothesisItself";
      } else if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        this.changeHypothesisLevel("decrease");
        hypNumber = -1;
      } else if (this.props.conclusionSent === newInference.itself) {
        inferenceType = "concluding-inference-blinking";
      }

      console.log(
        "le niveau d'hypothèse est ",
        this.state.hypothesisCurrentLevel
      );

      let commentary;
      if (newInference.numberCommentary !== "") {
        commentary =
          newInference.numberCommentary + ", " + newInference.commentary;
      } else {
        commentary = newInference.commentary;
      }

      // Maj du tableau lui-même, avec la nouvelle inférence (l'un des moments les plus importants du code)
      let copyArrayRendered = [...this.state.allInferencesRendered];
      copyArrayRendered.push(
        <MakeInference
          key={Number(copyArrayRendered.length + 1)}
          inferenceNumber={Number(copyArrayRendered.length + 1) + "."}
          hypothesisCurrentLevel={this.state.hypothesisCurrentLevel + hypNumber}
          inferenceItself={newInference.itself}
          inferenceCommentary={commentary}
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storageForRuleVerification(
                copyArrayRendered.length,
                newInference.itself
              );
            }
          }}
          inferenceType={inferenceType}
        />
      );

      this.setState(state => ({
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
      this.setState(state => ({
        allInferencesRendered: <Fragment>{solution}</Fragment>
      }));
    };

    this.removeLastInference = () => {
      let copyArrayRendered = [...this.state.allInferencesRendered];
      copyArrayRendered = copyArrayRendered.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
      this.setState(state => ({
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferencesRendered: [],
        storedInference: [],
        storedNumbers: "",
        storedInferenceRendered: []
      }));
    };

    // SECTION DE l'HYPOTHÈSE

    this.changeHypothesisLevel = change => {
      // Pour le moment je triche dans mon affichage. L'affichage dans MakeInference est à -1 par rapport à ici (et je rebalance ça avec un +1 qui sort de nulle part.)
      console.log("changeHypothesisLevel");
      let copyHypothesisCurrentLevel = this.state.hypothesisCurrentLevel;
      if (change === "increase") {
        copyHypothesisCurrentLevel++;
      } else if (change === "decrease") {
        copyHypothesisCurrentLevel--;
      }
      console.log("la copie est à ", copyHypothesisCurrentLevel);
      this.setState(state => ({
        hypothesisCurrentLevel: copyHypothesisCurrentLevel
      }));
      console.log("et le résultat est à ", copyHypothesisCurrentLevel);
    };

    this.state = {
      allInferencesRendered: [], // contient les données htmlisées des inférences
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedInferenceRendered: [], // contient les données htmlisées des inférences stockées pour la validation d'une règle
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle, ce qui active aussi un modal
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      hypothesisCurrentLevel: 0,
      changeHypothesisLevel: this.changeHypothesisLevel
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
