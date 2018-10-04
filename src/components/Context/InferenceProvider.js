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
      const copyArrayRendered = [...this.state.allInferencesRendered];

      // section de l'hypothèse (ignorée si hyp est undefined)
      if (hyp === "nouvelle hypothèse") {
        hypNumber = 1;
        newInference.numberCommentaryHypothesis = copyArrayRendered.length + 1;
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "increase");
        inferenceType = "hypothesisItself";
        this.updateTrueAtomicPropositions("new hyp");
      } else if (this.props.conclusionSent === newInference.itself) {
        inferenceType = "concluding-inference-blinking";
      }
      if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        hypNumber = -1;
        this.updateTrueAtomicPropositions("break hyp");
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "decrease");
      }

      const copyStoredHypId =
        this.state.hypothesisCurrentLevelAndId.actualID + hypNumber;
      const storedLevel =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber; // variable qui n'est utilisée que conditionner la règle reit

      // section du commentaire
      let commentary;
      if (newInference.numberCommentary !== "") {
        commentary =
          newInference.numberCommentary + ", " + newInference.commentary;
      } else {
        commentary = newInference.commentary;
      }

      // section de vérification des propositions atomiques découvertes vraies jusqu'ici
      console.log(
        "pour les propositions atomiques",
        this.state.hypothesisCurrentLevelAndId,
        "l'hyp est ",
        newInference
      );
      if (newInference.itself.length === 1) {
        if (
          this.state.arrayTrueAtomicPropositions.indexOf(
            newInference.itself
          ) === -1
        ) {
          this.updateTrueAtomicPropositions(
            "add prop",
            newInference.itself,
            copyStoredHypId
          );
        }
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
            this.state.hypothesisCurrentLevelAndId.actualID + hypNumber
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
              // ce if empêche l'utilisateur de reit une inférence qui provient d'une hyp terminée, et permet toujours de reit depuis une absence d'hyp
              if (
                storedLevel === 0 ||
                this.state.hypothesisCurrentLevelAndId.hypIsStillOpen[
                  copyStoredHypId - 1
                ] === true
              ) {
                this.addInferenceViaReit(
                  copyArrayRendered.length,
                  newInference,
                  hypNumber
                );
              } else {
                this.setAdvice(
                  "L'inférence " +
                    newInference.itself +
                    " provient d'une hypothèse terminée, elle ne peut donc pas être réitérée.",
                  "error-advice"
                );
              }
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
      const copyStoredHypId = this.state.hypothesisCurrentLevelAndId.actualID;
      const storedLevel = this.state.hypothesisCurrentLevelAndId.level; // variable qui n'est utilisée que conditionner la règle reit
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
              // ce if empêche l'utilisateur de reit une inférence qui provient d'une hypothèse terminée
              if (
                storedLevel === 0 ||
                this.state.hypothesisCurrentLevelAndId.hypIsStillOpen[
                  copyStoredHypId - 1
                ] === true
              ) {
                this.addInferenceViaReit(
                  copyArrayRendered.length,
                  newInference,
                  hypNumber
                );
              } else {
                this.setAdvice(
                  "L'inférence " +
                    newInference.itself +
                    " provient d'une hypothèse terminée, elle ne peut donc pas être réitérée.",
                  "error-advice"
                );
              }
            }
          }}
          // inferenceType={inferenceType}
        />
      );

      this.setAdvice(
        "Réitération de l'inférence " + newInference.itself,
        "rule-advice"
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
      let copyStoredNumbers = [...this.state.storedNumbers]; // numéro(s) justifiant l'inférence (c'est une chaîne de caractères)
      let copyStoredHypId = [...this.state.storedHypID]; // ID de l'hypothèse de CETTE inférence (à comparer avec le niveau actuel d'inférence)

      if (this.state.canInferenceBeStored === true) {
        console.log(
          "faut que ce soit égal",
          this.state.hypothesisCurrentLevelAndId.actualID,
          "===",
          hypID
        );
        if (this.state.hypothesisCurrentLevelAndId.actualID === hypID) {
          if (
            this.state.howManyInferenceToStore ===
            copyArrayStoredInference.length
          ) {
            copyArrayStoredInference = []; // inférence elle-même
            copyStoredNumbers = ""; // nombre de l'inférence
          } else {
            copyArrayStoredInference.push(inferenceItself);
            copyStoredNumbers.push(" " + numInference);
            copyStoredHypId.push(hypID);
          }
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

    this.changeStorageBoolean = (str, num) => {
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      console.log("changeStorageBoolean, le num reçu est à ", num);
      if (str === "resetButStillTrue") {
        this.setState({
          // si cette méthode arrive là c'est que l'utilisateur a cliqué sur la touche pour effacer ce qu'il avait entré
          canInferenceBeStored: true,
          howManyInferenceToStore: num,
          storedInference: [],
          storedNumbers: "",
          ruleModalChoiceContent: ""
        });
      } else if (str === true) {
        this.setState({
          canInferenceBeStored: true,
          howManyInferenceToStore: num
        });
      } else if (str === false) {
        this.setState({
          canInferenceBeStored: false,
          howManyInferenceToStore: "empty"
        });
      } else if (!this.state.canInferenceBeStored) {
        this.setState({
          canInferenceBeStored: true,
          howManyInferenceToStore: num
        });
      } else {
        this.setState({
          canInferenceBeStored: false,
          howManyInferenceToStore: "empty",
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
        canInferenceBeStored: false,
        howManyInferenceToStore: "empty",
        hypothesisCurrentLevelAndId: {
          level: 0,
          maxID: 0,
          actualID: 0,
          hypIsStillOpen: []
        },
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
        advice: <div className="advice" />,
        possibleMeaningShown: false,
        arrayTrueAtomicPropositions: [[]]
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
        copyHypothesisCurrentLevelAndID.hypIsStillOpen.push(true);
      } else if (change === "decrease") {
        copyHypothesisCurrentLevelAndID.level--;
        copyHypothesisCurrentLevelAndID.actualID--; // DOUTE : cette ligne a-t-elle vraiment lieu ... ?
        copyHypothesisCurrentLevelAndID.hypIsStillOpen[
          copyHypothesisCurrentLevelAndID.actualID
        ] = false;
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
        copyAllHypotheticalInferences = copyAllHypotheticalInferences.slice(1);
      }
      // (section 3 : setState)
      this.setState({
        allHypotheticalInferences: copyAllHypotheticalInferences,
        hypothesisCurrentLevelAndId: copyHypothesisCurrentLevelAndID
      });
      // console.log("niveau & id d'hypothèse", copyHypothesisCurrentLevelAndID);
    };

    this.setRuleModal = (str, strClassName, ruleModalContent, eal) => {
      // Si str est true, ruleModalShown devient true (visible). Si str est false, ruleModalShown devient false (invisible). Si str est "reverse", ruleModalShown devient l'opposé de ce qu'il était. Si str est quoi que ce soit d'autre, setRuleModal vérifie quand même la className.
      // "eal" contient expectedArguments.length
      let newRuleModalShown = false;
      let newClassName = ""; // rule-modal-ended-well ou rule-modal-ended-badly
      let newRuleModalContent;
      if (ruleModalContent) {
        newRuleModalContent = ruleModalContent;
      } else {
        newRuleModalContent = this.state.ruleModalContent;
      }
      if (str === "initial") {
        newRuleModalShown = true;
      } else if (str === true) {
        newRuleModalShown = true;
      } else if (
        str === "reverse" &&
        ruleModalContent.ruleName !== this.state.ruleModalContent.ruleName
      ) {
        newRuleModalShown = true;
        this.changeStorageBoolean("resetButStillTrue", eal);
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
      // A chacun correspond une className 1) start-advice, 2) rule-advice, 3) error-advice
      // const adviceToReturn = (
      //   <AdviceModal advice={advice} adviceClassName={adviceClassName} />
      // );
      const adviceToReturn = (
        <div className={"advice " + adviceClassName}>{advice}</div>
      );
      this.setState({ advice: adviceToReturn });
      setTimeout(() => {
        this.setState({ advice: <div className="advice" /> });
      }, 5000);
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

    this.updateTrueAtomicPropositions = (str, itself, hypLevel) => {
      let copyArray = this.state.arrayTrueAtomicPropositions;
      if (str === "new hyp") {
        console.log("UTAP crée bien le tableau");
        copyArray.push([]);
      } else if (str === "add prop") {
        copyArray[hypLevel].unshift(itself);
      } else if (str === "break hyp") {
        copyArray.splice(copyArray.length - 1);
      }
      this.setState({
        arrayTrueAtomicPropositions: copyArray
      });
    };

    this.state = {
      allInferencesRendered: [], // contient les données htmlisées des inférences
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedHypID: 0,
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle, ce qui active aussi un modal
      howManyInferenceToStore: 0,
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      hypothesisCurrentLevelAndId: {
        level: 0,
        maxID: 0,
        actualID: 0,
        hypIsStillOpen: []
      },
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
      advice: <div className="advice" />,
      setAdvice: this.setAdvice,
      possibleMeaningShown: false,
      setPossibleMeaning: this.setPossibleMeaning,
      arrayTrueAtomicPropositions: [[]],
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
