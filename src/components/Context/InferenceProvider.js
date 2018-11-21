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
      if (hyp === "nouvelle hypothèse" || hyp === "nouvelle hyp ∨e") {
        hypNumber = 1;
        newInference.numberCommentaryHypothesis = copyArrayRendered.length + 1;
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "increase");
        inferenceType = "hypothesisItself";
        // this.state.manageDataRegardingHypothesisLine("+hyp");
      }
      if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        hypNumber = -1;
        this.manageLotsOfStuffAboutHypothesis(newInference, hyp, "decrease");
        // this.state.manageDataRegardingHypothesisLine("-hyp");
      }
      if (!hyp) {
        this.state.manageDataRegardingHypothesisLine("=");
      }
      // section des hypothèses de l'élimination de la disjonction, ∨e

      const copyStoredHypId =
        this.state.hypothesisCurrentLevelAndId.actualID + hypNumber;
      const storedLevel =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber; // variable qui n'est utilisée que pour conditionner la règle reit

      // vérification de la conclusion
      if (
        copyStoredHypId === 0 &&
        this.props.conclusionSent === newInference.itself
      ) {
        inferenceType = "concluding-inference-blinking";
      }

      // section du commentaire
      let commentary;
      if (newInference.numberCommentary !== "") {
        commentary =
          newInference.numberCommentary + ", " + newInference.commentary;
      } else {
        commentary = newInference.commentary;
      }
      let newAllJustificationData = [...this.state.allJustificationData];
      newAllJustificationData.push(newInference.commentary);

      // section  de la détection de l'opérateur + de la possibilité de commuter, pour les règles où l'opérateur est commutatif
      // showOperatorScope: this.showOperatorScope,
      // commutativityRule: this.commutativityRule

      // Maj du tableau lui-même, avec la nouvelle inférence (l'un des moments les plus importants du code)
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
          dataRegardingHypothesisLine={this.state.dataRegardingHypothesisLine}
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
                this.state.manageDataRegardingHypothesisLine("=");
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
        allInferencesRendered: copyArrayRendered,
        allJustificationData: newAllJustificationData
      }));
    };

    this.addInferenceViaReit = (numberInference, newInference, hypNumber) => {
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
                this.state.manageDataRegardingHypothesisLine("=");
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
        />
      );

      this.setAdvice(
        "Réitération de l'inférence " + newInference.itself,
        "rule-advice"
      );

      let newAllJustificationData = [...this.state.allJustificationData];
      newAllJustificationData.push("reit");

      this.setState(state => ({
        allInferencesRendered: copyArrayRendered,
        allJustificationData: newAllJustificationData
      }));
    };

    this.storageForRuleVerification = (numInference, infItself, hypID) => {
      // déclaration des variables essentielles à cette fonction
      let copyArrayStoredInference = [...this.state.storedInference]; // inférence elle-même
      let copyStoredNumbers = [...this.state.storedNumbers]; // numéro(s) justifiant l'inférence (c'est une chaîne de caractères)
      let copyStoredHypId = [...this.state.storedHypID]; // ID de l'hypothèse de CETTE inférence (à comparer avec le niveau actuel d'inférence)
      // petite déclaration intermédiaire pour bien préparer le moment où on va reset le tableau des arguments
      let expectedArgumentsLength = this.state.ruleModalContent
        .expectedArguments.length;
      const ruleName = this.state.ruleModalContent.ruleName;
      if (ruleName === "~i" || ruleName === "⊃i" || ruleName === "⊅i") {
        expectedArgumentsLength--;
      }
      // début de l'intérêt principal de cette fonction
      if (this.state.canInferenceBeStored === true) {
        console.log(
          "faut que ce soit égal",
          this.state.hypothesisCurrentLevelAndId.actualID,
          "===",
          hypID
        );

        if (this.state.hypothesisCurrentLevelAndId.actualID === hypID) {
          if (expectedArgumentsLength === copyArrayStoredInference.length) {
            // copyArrayStoredInference = []; // inférence elle-même
            // copyStoredNumbers = []; // nombre de l'inférence
            copyArrayStoredInference = [infItself]; // inférence el  le-même
            copyStoredNumbers = [numInference]; // nombre de l'inférence
          } else {
            copyArrayStoredInference.push(infItself);
            copyStoredNumbers.push(" " + numInference);
            copyStoredHypId.push(hypID);
          }
          // maj du state
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
        // cas de la règle ∨e
        if (ruleName === "∨e") {
          console.log("la règle ∨e fait son oeuvre");
          this.longStorageForRuleVerification(
            infItself,
            copyStoredNumbers,
            true
          );
        }
      }
    };

    this.longStorageForRuleVerification = (inference, numbers, str) => {
      let newlongStoredInference = [];
      if (str === true) {
        newlongStoredInference = [...this.state.longStoredInference];
        newlongStoredInference.push(inference);
      }
      if (this.state.storedNumbers.length < 1 && numbers.length < 1) {
        numbers = "1";
      }
      this.setState({
        longStoredInference: newlongStoredInference,
        storedNumbers: numbers
      });
    };

    this.changeStorageBoolean = (str, num) => {
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      if (str === "resetButStillTrue") {
        this.setState({
          // si cette méthode arrive là c'est que l'utilisateur a cliqué sur la touche pour effacer ce qu'il avait entré
          canInferenceBeStored: true,
          storedInference: [],
          storedNumbers: "",
          // longStoredInference: [],
          ruleModalChoiceContent: "",
          futureInference: "",
          inversion: false
        });
      } else if (str === true) {
        this.setState({
          canInferenceBeStored: true
        });
      } else if (str === false) {
        this.setState({
          canInferenceBeStored: false,
          futureInference: "",
          inversion: false
        });
      } else if (!this.state.canInferenceBeStored) {
        this.setState({
          canInferenceBeStored: true
        });
      } else {
        this.setState({
          canInferenceBeStored: false,
          storedInference: [], // on vide les inférences stockées durant le court temps où storedInference était pushable
          storedNumbers: "",
          storedHypID: 0,
          // longStoredInference: [],
          // ruleModalChoiceContent: "",
          futureInference: "",
          inversion: false
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
      let newAllJustificationData = [...this.state.allJustificationData];
      let copyAHI = [...this.state.allHypotheticalInferences];
      let copyAEHI = [...this.state.allEndedHypotheticalInferences];
      console.log("copyAHI avant", copyAHI);
      console.log("copyAEHI avant", copyAEHI);
      const newAJDlength = newAllJustificationData.length - 1;
      copyAllInferencesRendered = copyAllInferencesRendered.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
      if (newAllJustificationData[newAJDlength] === "hyp") {
        // on supprime une hypothèse, donc on baisse d'un niveau d'hyp et on efface la dernière entrée dans allHypotheticalInferences
        copyAHI = copyAHI.slice(1);
        this.manageLotsOfStuffAboutHypothesis("", "", "decrease");
      } else if (
        newAllJustificationData[newAJDlength] === "⊃i" ||
        newAllJustificationData[newAJDlength] === "~i"
      ) {
        // on supprime une conclusion d'hypothèse, donc on augmente d'un niveau d'hyp et on remet la dernière entrée dans AHI (présente dans AEHI), et on supprime la dernière entrée ASHI
        copyAHI.unshift(copyAEHI[0]);
        copyAEHI = copyAEHI.slice(1);
        this.manageLotsOfStuffAboutHypothesis("", "", "increase");
      }
      newAllJustificationData.pop();
      console.log("copyAHI avant", copyAHI);
      console.log("copyAEHI après", copyAEHI);
      this.setState(state => ({
        allInferencesRendered: copyAllInferencesRendered,
        allJustificationData: newAllJustificationData,
        allHypotheticalInferences: copyAHI,
        allEndedHypotheticalInferences: copyAEHI
      }));
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferencesRendered: [],
        allJustificationData: [], // utilisé uniquement pour removeLastInference
        storedInference: [],
        storedNumbers: "",
        storedHypID: 0,
        canInferenceBeStored: false,
        hypothesisCurrentLevelAndId: {
          level: 0,
          maxID: 0,
          actualID: 0,
          hypIsStillOpen: []
        },
        allHypotheticalInferences: [],
        allEndedHypotheticalInferences: [], // utilisé uniquement pour removeLastInference
        // section ruleModal
        ruleModalShown: { normal: false },
        ruleModalClassName: "",
        ruleModalContent: {
          instruction: "",
          expectedArguments: [],
          ruleName: ""
        },
        stepRule: 0,
        ruleModalChoiceContent: "",
        // autre
        advice: <div className="advice" />,
        possibleMeaningShown: false,
        inversion: false,
        futureInference: "",
        // stockage conditionnel
        longStoredInference: []
      }));
    };

    this.manageLotsOfStuffAboutHypothesis = (hypothesisItself, hyp, change) => {
      // consolelog(
      //   "manageLotsOfStuffAboutHypothesis, l'hypothèse est ",
      //   hypothesisItself
      // );
      // (section 1 : change) Cette section gère l'augmentation/diminution du niveau d'hypothèse, et l'augmentation de l'id
      // Pour le moment je triche dans mon affichage. L'affichage dans MakeInference est à -1 par rapport à ici (et je rebalance ça avec un +1 qui sort de nulle part.)
      let copyHypothesisCurrentLevelAndID = {
        ...this.state.hypothesisCurrentLevelAndId
      };
      let copyAEHI = [...this.state.allEndedHypotheticalInferences]; // utilisé uniquement pour removeLastInference

      if (change === "increase") {
        copyHypothesisCurrentLevelAndID.maxID++;
        copyHypothesisCurrentLevelAndID.level++;
        copyHypothesisCurrentLevelAndID.actualID++;
        copyHypothesisCurrentLevelAndID.hypIsStillOpen.push(true);
        this.state.manageDataRegardingHypothesisLine("+hyp");
      } else if (change === "decrease") {
        copyHypothesisCurrentLevelAndID.level--;
        copyHypothesisCurrentLevelAndID.actualID--; // DOUTE : cette ligne a-t-elle vraiment lieu ... ?
        copyHypothesisCurrentLevelAndID.hypIsStillOpen[
          copyHypothesisCurrentLevelAndID.actualID
        ] = false;
        this.state.manageDataRegardingHypothesisLine("-hyp");
      }
      // (section 2 : hypothesisItself, hyp) Cette section gère les intitulés d'inférence isolément, et leur ID.
      let copyAllHypotheticalInferences = [
        ...this.state.allHypotheticalInferences
      ];
      if (hyp === "nouvelle hypothèse" || hyp === "nouvelle hyp ∨e") {
        copyAllHypotheticalInferences.unshift(hypothesisItself); // On rajoute une hypothèse dans le tableau qui ne contient que les hypothèses
      } else if (
        hyp === "hypothèse validée" ||
        hyp === "hypothèse réfutée" ||
        hyp === "fin hyp ∨e"
      ) {
        copyAEHI.unshift(copyAllHypotheticalInferences[0]); // utilisé uniquement pour removeLastInference
        copyAllHypotheticalInferences = copyAllHypotheticalInferences.slice(1); // On retire une hypothèse dans le tableau qui ne contient que les hypothèses
      }
      // (section 3 : setState)
      this.setState({
        allHypotheticalInferences: copyAllHypotheticalInferences,
        hypothesisCurrentLevelAndId: copyHypothesisCurrentLevelAndID,
        allEndedHypotheticalInferences: copyAEHI // utilisé uniquement pour removeLastInference
      });
      // consolelog("niveau & id d'hypothèse", copyHypothesisCurrentLevelAndID);
    };

    this.setChoiceContent = choiceContent => {
      this.setState({
        ruleModalChoiceContent: choiceContent
      });
    };

    this.setRuleModal = (str, strClassName, ruleModalContent, eal) => {
      // Si str est true, ruleModalShown devient true (visible). Si str est false, ruleModalShown devient false (invisible). Si str est "reverse", ruleModalShown devient l'opposé de ce qu'il était. Si str est quoi que ce soit d'autre, setRuleModal vérifie quand même la className.
      // "eal" contient expectedArguments.length
      let newRuleModalShown = { normal: false };
      let newClassName = ""; // rule-modal-ended-well ou rule-modal-ended-badly
      let newRuleModalContent;
      if (ruleModalContent) {
        newRuleModalContent = ruleModalContent;
      } else {
        newRuleModalContent = this.state.ruleModalContent;
      }
      if (str === "initial") {
        newRuleModalShown.normal = true;
      } else if (str === true) {
        newRuleModalShown.normal = true;
      } else if (
        str === "reverse" &&
        ruleModalContent.ruleName !== this.state.ruleModalContent.ruleName
      ) {
        newRuleModalShown.normal = true;
        this.changeStorageBoolean("resetButStillTrue", eal);
      } else if (str === "reverse") {
        if (!this.state.ruleModalShown.normal) {
          newRuleModalShown.normal = true;
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

    this.updateStepRule = bool => {
      if (bool) {
        const newStepRule = this.state.stepRule + 1;
        this.setState({
          stepRule: newStepRule
        });
      }
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
      // if (
      //   (this.state.possibleMeaningShown =
      //     "afficher une signification possible")
      // ) {
      //   this.setState({
      //     possibleMeaningShown: str
      //   });
      // } else if (this.state.possibleMeaningShown[0] !== "a") {
      //   this.setState({
      //     possibleMeaningShown: "afficher une signification possible"
      //   });
      // }
    };

    this.setInversion = () => {
      if (this.state.inversion === false) {
        this.setState({
          inversion: true
        });
      } else if (this.state.inversion === true) {
        this.setState({
          inversion: false
        });
      }
    };

    this.setPartOfInference = () => {
      // la "partie de l'inférence" en question est celle qui sera extraite par toute règle où le choix est possible, comme ∨e
      let newPartOfInference;
      if (this.state.partOfInference === "A") {
        newPartOfInference = "B";
      } else if (this.state.partOfInference === "B") {
        newPartOfInference = "C";
      } else if (this.state.partOfInference === "C") {
        newPartOfInference = "A";
      }
      this.setState({ partOfInference: newPartOfInference });
    };

    this.addToFutureInference = newChar => {
      let copyFutureInference = this.state.futureInference;
      copyFutureInference += newChar;
      this.setState({ futureInference: copyFutureInference });
    };

    this.removeLastCharacter = () => {
      let copyFutureInference = [...this.state.futureInference];
      copyFutureInference = copyFutureInference.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
      copyFutureInference = copyFutureInference.join("");
      this.setState(state => ({
        futureInference: copyFutureInference
      }));
    };

    this.manageDataRegardingHypothesisLine = str => {
      // Cette fonction ne gère pas le contenu des hypothèses, elle stocke simplement l'information de toutes les hypothèses dans une déduction.
      let newDataRegardingHypothesisLine = [
        ...this.state.dataRegardingHypothesisLine
      ];
      let previousLine =
        newDataRegardingHypothesisLine[
          newDataRegardingHypothesisLine.length - 1
        ];
      if (str === "+hyp") {
        newDataRegardingHypothesisLine.push(previousLine + "|");
      } else if (str === "-hyp") {
        previousLine = previousLine.slice(0, previousLine.length - 1);
        newDataRegardingHypothesisLine.push(previousLine);
      } else if (str === "=") {
        newDataRegardingHypothesisLine.push(previousLine);
      }
      // console.log("newDataRegardingHypothesisLine", newDataRegardingHypothesisLine); // très important pour pouvoir faire un truc qui gère les lignes des hyps
      this.setState({
        dataRegardingHypothesisLine: newDataRegardingHypothesisLine
      });
    };

    this.state = {
      allInferencesRendered: [], // contient les données htmlisées des inférences
      allJustificationData: [], // contient toutes les infos justifiant chaque inférence, de la première à la dernière (variable qui n'est utilisée que par removeLastInference pour le moment)
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle, ce qui active aussi un modal
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedHypID: 0, // chaque inférence dans une hypothèse a un id d'hypothèse (qui est à 0 s'il n'y a pas d'hyp en cours), storedHypID permet de stocker cet id d'hypothèse, pour le comparer à celui de l'hypothèse en cours
      // section des données stockées dans des situations spécifiques (et destockées dans des situations spécifiques)
      longStoredInference: [],
      longStorageForRuleVerification: this.longStorageForRuleVerification,
      // sections de divers boutons de l'interface
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      manageLotsOfStuffAboutHypothesis: this.manageLotsOfStuffAboutHypothesis,
      hypothesisCurrentLevelAndId: {
        level: 0,
        maxID: 0,
        actualID: 0,
        hypIsStillOpen: []
      },
      allHypotheticalInferences: [], // cette variable stocke les derniers intitulés d'hypothèses. Lorsqu'on utilise ~i ou ⊃i ou ⊅i (si les conditions sont remplies pour les utiliser réellement), le dernier élément de cette variable est alors utilisé pour créer une nouvelle inférence, puis il est retiré du tableau.
      allEndedHypotheticalInferences: [], // utilisé uniquement pour removeLastInference. Lorsqu'on supprime une inférence qui concluait une hypothèse, celle-ci redevient une hypothèse en cours, il faut donc pouvoir la récupérer. C'est à cela que sert le stockage des hyp supprimées.
      manageDataRegardingHypothesisLine: this.manageDataRegardingHypothesisLine,
      dataRegardingHypothesisLine: [""],
      // section ruleModal
      ruleModalShown: { normal: false }, // je ferai peut-être un "ruleModalShown.special", plus tard
      ruleModalClassName: "",
      ruleModalContent: {
        instruction: "",
        expectedArguments: [],
        ruleName: ""
      },
      stepRule: 0,
      ruleModalChoiceContent: "",
      setChoiceContent: this.setChoiceContent,
      setRuleModal: this.setRuleModal,
      updateStepRule: this.updateStepRule,
      // section conseil & signification
      advice: <div className="advice" />,
      setAdvice: this.setAdvice,
      possibleMeaningShown: false,
      setPossibleMeaning: this.setPossibleMeaning,
      //  section commutativité & portée de l'opérateur
      inversion: false, // ce booléen permet de savoir s'il faut inverser ou non telle inférence ayant pour connecteur dominant ∧, ∨, ⊻, ≡, ↓ ou |
      setInversion: this.setInversion,
      partOfInference: "A", //
      setPartOfInference: this.setPartOfInference, // cette fonction permet de savoir quelle inférence doit être extraite par ∨e dans A∨B (A, B, ou C)
      // showOperatorScope: this.showOperatorScope, // cette fonction détecte la portée de l'opérateur et l'affiche lorsque l'utilisateur met sa souris sur l'opérateur (la portée se retrouve soulignée)
      // commutativityRule: this.commutativityRule, // cette fonction permet d'inverser les parties gauche et droite de ce qui est dans la portée de l'opérateur
      // section de la création d'inférence par l'utilisateur
      futureInference: "",
      addToFutureInference: this.addToFutureInference,
      removeLastCharacter: this.removeLastCharacter
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
