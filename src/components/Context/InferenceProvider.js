import React, { createContext, Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import MakeInference from "../Calcul Tools/MakeInference";
// import AdviceModal from "../Modals and Popovers/AdviceModal";

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
// Note : actuellement, InferenceProvider a deux props, qu'elle hérite de Deducer : conclusionSent et meaningSent.
export const InferenceContext = createContext();

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  constructor(props) {
    super(props);

    this.addInference = (newInference, hyp) => {
      // la méthode addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      console.log("bonjour c'est addInference, voici le hyp : ", hyp);
      let hypNumber = 0;
      let inferenceType = "";
      let copyArrayRendered = [...this.state.allInferencesRendered];

      // section de l'hypothèse (ignorée si hyp est undefined)
      if (hyp === "nouvelle hypothèse") {
        hypNumber = 1;
        newInference.numberCommentaryHypothesis = copyArrayRendered.length + 1;
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "increase");
        inferenceType = "hypothesisItself";
      } else if (this.props.conclusionSent === newInference.itself) {
        inferenceType = "concluding-inference-blinking";
      }
      if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        hypNumber = -1;
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "decrease");
      }
      console.log(
        "bonjour c'est encore addInference, voici les niveau d'hyp",
        this.state.hypothesisCurrentLevelAndId
      );
      let copyStoredHypId =
        this.state.hypothesisCurrentLevelAndId.maxID + hypNumber;

      // section du commentaire
      let commentary;
      if (newInference.numberCommentary !== "") {
        commentary =
          newInference.numberCommentary + ", " + newInference.commentary;
      } else {
        commentary = newInference.commentary;
      }

      // Maj du tableau lui-même, avec la nouvelle inférence (l'un des moments les plus importants du code)
      // let copyArrayRendered = [...this.state.allInferencesRendered];
      copyArrayRendered.push(
        <MakeInference
          key={Number(copyArrayRendered.length + 1)}
          inferenceNumber={Number(copyArrayRendered.length + 1) + "."}
          hypothesisCurrentLevel={
            this.state.hypothesisCurrentLevelAndId.level + hypNumber
          }
          hypothesisCurrentID={
            this.state.hypothesisCurrentLevelAndId.maxID + hypNumber
          }
          inferenceItself={newInference.itself}
          inferenceCommentary={commentary}
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storageForRuleVerification(
                copyArrayRendered.length, // on stocke le futur numéro d'inférence
                newInference.itself, // on stocke l'inférence elle-même
                copyStoredHypId // on envoie l'id de l'hypothèse, pour vérifier si l'inférence est stockable
              );
            } else {
              // A FAIRE : faut que j'empêche d'utiliser reit sur une inférence issue d'une hypothèse terminée
              // if()
              this.addInferenceViaReit(
                copyArrayRendered.length,
                newInference,
                hypNumber
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

    this.addInferenceViaReit = (numberInference, newInference, hypNumber) => {
      console.log("addInferenceViaReit");
      let copyArrayRendered = [...this.state.allInferencesRendered];
      // const commentary = numberInference +
      // let copyStoredHypId = this.state.hypothesisCurrentLevelAndId.maxID;
      let copyStoredHypId = this.state.hypothesisCurrentLevelAndId.actualID;
      copyArrayRendered.push(
        <MakeInference
          key={Number(copyArrayRendered.length + 1)}
          inferenceNumber={Number(copyArrayRendered.length + 1) + "."}
          hypothesisCurrentLevel={this.state.hypothesisCurrentLevelAndId.level}
          hypothesisCurrentID={this.state.hypothesisCurrentLevelAndId.actualID}
          inferenceItself={newInference.itself}
          inferenceCommentary={numberInference + ", reit"}
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storageForRuleVerification(
                copyArrayRendered.length, // on restocke le futur numéro d'inférence
                newInference.itself, // on restocke l'inférence elle-même
                copyStoredHypId // on réenvoie l'id de l'hypothèse, pour vérifier si l'inférence est stockable
              );
            } else {
              this.addInferenceViaReit(
                copyArrayRendered.length,
                newInference,
                hypNumber
              );
            }
          }}
          // inferenceType={inferenceType}
        />
      );

      this.setState(state => ({
        allInferencesRendered: copyArrayRendered
      }));
    };

    this.storageForRuleVerification = (
      numInference,
      inferenceItself,
      hypID
    ) => {
      let copyArrayStoredInference = [...this.state.storedInference]; // inférence elle-même
      let copyStoredNumbers = [...this.state.storedNumbers]; // nombre de l'inférence
      let copyStoredHypId = [...this.state.storedHypID]; // ID de l'hypothèse de CETTE inférence (à comparer avec le niveau actuel d'inférence)
      if (this.state.canInferenceBeStored === true) {
        console.log(
          "faut que ce soit égal",
          this.state.hypothesisCurrentLevelAndId.actualID,
          "===",
          hypID
        );
        if (this.state.hypothesisCurrentLevelAndId.actualID === hypID) {
          copyArrayStoredInference.push(inferenceItself);
          copyStoredNumbers.push(" " + numInference);
          copyStoredHypId.push(hypID);
          this.setState(state => ({
            storedInference: copyArrayStoredInference,
            storedNumbers: copyStoredNumbers,
            storedHypID: copyStoredHypId
          }));
        } else {
          this.setAdvice(
            "Impossible d'utiliser des inférences hors de l'hypothèse en cours",
            "error-advice"
          );
        }
      }
    };

    this.changeStorageBoolean = erase => {
      console.log("ChangeStorageBoolean");
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      if (erase === "erase") {
        this.setState({
          // si cette méthode arrive là c'est que l'utilisateur a cliqué sur la touche pour effacer ce qu'il avait entré
          storedInference: [],
          storedNumbers: [],
          ruleModalChoiceContent: "",
          canInferenceBeStored: true
        });
      } else if (!this.state.canInferenceBeStored) {
        this.setState({ canInferenceBeStored: true });
      } else {
        this.setState({
          canInferenceBeStored: false,
          storedInference: [], // on vide les inférences stockées durant le court temps où storedInference était pushable
          storedNumbers: "",
          storedHypID: 0
        });
      }
    };

    this.giveSolution = solution => {
      this.setState(state => ({
        allInferencesRendered: <Fragment>{solution}</Fragment>
      }));
    };

    this.removeLastInference = () => {
      let copyAllInferencesRendered = [...this.state.allInferencesRendered];
      copyAllInferencesRendered = copyAllInferencesRendered.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
      // A FAIRE : faut que je vire la dernière hypothèse, si c'était elle la dernière action au moment du clic sur le bouton de removeLastInference
      console.log("nota bene : y'a un truc à coder dans removeLastInference");
      this.setState(state => ({
        allInferencesRendered: copyAllInferencesRendered
      }));
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferencesRendered: [],
        storedInference: [],
        storedNumbers: "",
        storedHypID: 0,
        canInferenceBeStored: false, //  il devient false mais les rule-modal ne disparaissent pas, c'est un problème
        hypothesisCurrentLevelAndId: { level: 0, maxID: 0, actualID: 0 },
        allHypotheticalInferences: [],
        // section ruleModal
        ruleModalShown: false,
        ruleModalClassName: "",
        ruleModalContent: {
          instruction: "",
          expectedArguments: [],
          ruleName: ""
        },
        ruleModalChoiceContent: "",
        // autre
        advice: "",
        possibleMeaningShown: false
      }));
    };

    this.manageLotsOfStuffAboutHypothesis = (hypothesisItself, hyp, change) => {
      console.log(
        "manageLotsOfStuffAboutHypothesis, l'hypothèse est ",
        hypothesisItself
      );
      // (section 1 : change) Cette section gère l'augmentation/diminution du niveau d'hypothèse, et l'augmentation de l'id
      // Pour le moment je triche dans mon affichage. L'affichage dans MakeInference est à -1 par rapport à ici (et je rebalance ça avec un +1 qui sort de nulle part.)
      let copyHypothesisCurrentLevelAndID = {
        ...this.state.hypothesisCurrentLevelAndId
      };
      if (change === "increase") {
        copyHypothesisCurrentLevelAndID.maxID++;
        copyHypothesisCurrentLevelAndID.level++;
        copyHypothesisCurrentLevelAndID.actualID++;
      } else if (change === "decrease") {
        copyHypothesisCurrentLevelAndID.actualID--;
        copyHypothesisCurrentLevelAndID.level--;
      }
      // (section 2 : hypothesisItself, hyp) Cette section gère les intitulés d'inférence isolément, et leur ID.
      let copyAllHypotheticalInferences = [
        ...this.state.allHypotheticalInferences
      ];
      if (hyp === "nouvelle hypothèse") {
        // On rajoute une hypothèse dans le tableau qui ne contient que les hypothèses
        copyAllHypotheticalInferences.unshift(hypothesisItself);
      } else if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        // On retire une hypothèse dans le tableau qui ne contient que les hypothèses
        console.log("on arrive bien là");
        copyAllHypotheticalInferences = copyAllHypotheticalInferences.slice(1);
      }
      // (section 3 : setState)
      console.log(
        "le nouveau allHypotheticalInferences",
        copyAllHypotheticalInferences
      );
      this.setState({
        allHypotheticalInferences: copyAllHypotheticalInferences,
        hypothesisCurrentLevelAndId: copyHypothesisCurrentLevelAndID
      });
      // console.log("niveau & id d'hypothèse", copyHypothesisCurrentLevelAndID);
    };

    this.setRuleModal = (str, strClassName, ruleModalContent) => {
      // Si str est true, ruleModalShown devient true (visible). Si str est false, ruleModalShown devient false (invisible). Si str est "reverse", ruleModalShown devient l'opposé de ce qu'il était. Si str est quoi que ce soit d'autre, setRuleModal vérifie quand même la className.
      let newRuleModalShown = false;
      let newClassName = ""; // rule-modal-ended-well ou rule-modal-ended-badly
      let newRuleModalContent;
      if (ruleModalContent) {
        newRuleModalContent = ruleModalContent;
      } else {
        newRuleModalContent = this.state.ruleModalContent;
      }
      if (str === true) {
        newRuleModalShown = true;
      } else if (str === "reverse") {
        if (!this.state.ruleModalShown) {
          newRuleModalShown = true;
        }
      }
      if (strClassName === "ended-well") {
        newClassName = "rule-modal-ended-well";
      } else if (strClassName === "ended-badly") {
        newClassName = "rule-modal-ended-badly";
      }
      this.setState({
        ruleModalShown: newRuleModalShown,
        ruleModalClassName: newClassName,
        ruleModalContent: newRuleModalContent
      });
    };

    this.setChoiceContent = choiceContent => {
      this.setState({
        ruleModalChoiceContent: choiceContent
      });
    };

    this.setAdvice = (advice, adviceClassName, specificContent) => {
      // 3 types de conseils différents : 1) liste de ce qu'il est possible de faire au début de l'exo, 2) étapes sur l'utilisation d'une règle, 3) message d'erreur (l'utilisateur a cliqué là où il ne fallait pas)
      // A chacun correspond une className 1) start-advice, rule-advice, error-advice
      // const adviceToReturn = (
      //   <AdviceModal advice={advice} adviceClassName={adviceClassName} />
      // );
      // this.setState({ advice: adviceToReturn });
    };

    this.setPossibleMeaning = () => {
      if (this.state.possibleMeaningShown === false) {
        this.setState({
          possibleMeaningShown: true
        });
      } else if (this.state.possibleMeaningShown === true) {
        this.setState({
          possibleMeaningShown: false
        });
      }
    };

    this.updateTrueAtomicPropositions = (str, proposition) => {
      if (str === true) {
        let copyArray = this.state.arrayTrueAtomicPropositions;
        copyArray.push(proposition);
        this.setState({
          arrayTrueAtomicPropositions: copyArray
        });
      } else if (str === "erase") {
        this.setState({
          arrayTrueAtomicPropositions: []
        });
      }
    };

    this.state = {
      allInferencesRendered: [], // contient les données htmlisées des inférences
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedHypID: 0,
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle, ce qui active aussi un modal
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      hypothesisCurrentLevelAndId: { level: 0, maxID: 0, actualID: 0 },
      allHypotheticalInferences: [], // cette variable stocke les derniers intitulés d'hypothèses. Lorsqu'on utilise ~i ou ⊃i (si les conditions sont remplies pour les utiliser réellement), le dernier élément de cette variable est alors utilisé pour créer une nouvelle inférence, puis il est retiré du tableau.
      // section ruleModal
      ruleModalShown: false,
      ruleModalClassName: "",
      ruleModalContent: {
        instruction: "",
        expectedArguments: [],
        ruleName: ""
      },
      ruleModalChoiceContent: "",
      setChoiceContent: this.setChoiceContent,
      setRuleModal: this.setRuleModal,
      // section autres trucs
      advice: "",
      setAdvice: this.setAdvice,
      possibleMeaningShown: false,
      setPossibleMeaning: this.setPossibleMeaning,
      arrayTrueAtomicPropositions: [],
      updateTrueAtomicPropositions: this.updateTrueAtomicPropositions
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
