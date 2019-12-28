import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import InferenceScanner from "./Components/InferenceScanner";
import InferenceTools from "./Components/InferenceTools";
import InferenceForecaster from "./Components/InferenceForecaster";
import MakeAllInferences from "./Components/MakeAllInferences";
// import AdviceModal from "../Modals and Popovers/AdviceModal";

// Création d'une variable contextuelle qui contiendra toutes les informations élémentaires sur toutes les inférences d'une déduction
// Pour importer cette variable contextuelle :
// import { InferenceContext } from "./InferenceContext";
// Note : actuellement, InferenceProvider a deux props, qu'elle hérite de Deducer : conclusionSent et meaningSent.
export const InferenceContext = createContext();

// création d'une fonction utilisable partout dans ce fichier)

/*la classe UserProvider fera office de... Provider (!) en englobant son enfant direct dans le composant éponyme. De cette façon, ses values seront accessibles de manière globale via le `Consumer`*/
class InferenceProvider extends Component {
  constructor(props) {
    super(props);

    this.showAllInferences = () => {
      return MakeAllInferences(this.state);
    };

    this.addInference = (newInference, hyp, secondNewInference) => {
      // la méthode addInference() fait 2 choses : en récupérant les données envoyées depuis une autre classe, elle a) le met dans un tableau tout simple qui stocke toutes les inférences et b) le met dans un tableau qui htmlise le contenu de l'inférence
      // newInference = { itself: "", numberCommentary: "", commentary: "", numberCommentaryHypothesis : "", inferenceType: "", inferenceBackground:"" }
      // hyp = "nouvelle hypothèse" / "nouvelle hyp ve" / "hypothèse validée" / "hypothèse réfutée"
      console.log("bonjour c'est addInference, voici le hyp : ", hyp);
      let hypNumber = 0,
        hypIDNumber = this.state.hypothesisCurrentLevelAndId.theCurrentHypID;
      let copyArrayThemselves = [...this.state.allInferencesThemselves];
      // section de l'hypothèse (ignorée si hyp est undefined)
      if (
        hyp === "nouvelle hypothèse" 
      // || hyp === "nouvelle hyp ∨e'"
      ) {
        hypNumber = 1;
        newInference.numberCommentaryHypothesis =
          copyArrayThemselves.length + 1;
        hypIDNumber = this.manageLotsOfStuffAboutHypothesis(
          newInference,
          hyp,
          "hypothèse créée"
        );
        newInference.inferenceType = "hypotheticalInference ";
      }
      if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        hypNumber = -1;
        hypIDNumber = this.manageLotsOfStuffAboutHypothesis(
          newInference,
          hyp,
          "conclusion d'hypothèse"
        );
      }

      const storedLevel =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber; // variable qui n'est utilisée que pour conditionner la règle reit
      // vérification de la conclusion
      let commutedInference = InferenceTools.commute(
        newInference.itself,
        this.state.ruleModalContent.ruleName[0],
        "commute"
      );
      if (
        storedLevel === 0 &&
        (this.props.conclusionSent === newInference.itself ||
          this.props.conclusionSent === commutedInference)
      ) {
        newInference.inferenceType = "concluding-inference-blinking ";
      }

      // section de la détection de l'opérateur
      // showOperatorScope: this.showOperatorScope,

      // Maj du tableau lui-même, avec la nouvelle inférence (l'un des moments les plus importants du code)
      newInference.level =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber;
      newInference.actualHypID = hypIDNumber;
      copyArrayThemselves.push(newInference);
      this.state.addLastEvent("addInference"); // cette ligne ne sera pas faite si il y a un "secondNewInference"
      this.state.modifyClassNameOfAnyInference("addInference", "last");
      if (secondNewInference) {
        // peut arriver avec les règles impliquant un choix
        secondNewInference.level =
          this.state.hypothesisCurrentLevelAndId.level + hypNumber;
        secondNewInference.actualHypID = hypIDNumber;
        copyArrayThemselves.push(secondNewInference);
        this.state.addLastEvent("doubleAddInference");
        this.state.modifyClassNameOfAnyInference("doubleAddInference", "last");
      }

      if (
        this.state.ruleModalShown.normal === true &&
        hyp !== "hypothèse validée" &&
        hyp !== "hypothèse réfutée"
      ) {
        InferenceScanner(
          this.state.ruleModalContent, // contenu du RuleModal en cours (seul le ruleName sera utile, et potentiellement le ruleName de l'otherInterpretation)
          copyArrayThemselves, // ensemble des inférences actuelles (qui seront scannées)
          this.state.allHypotheticalInferences, // contenu des hyp en cours
          this.state.hypothesisCurrentLevelAndId, // données des hyp en cours
          this.state.allEndedHypotheticalInferences,
          this.state.otherInterpretation // l'info selon laquelle l'autre interprétation est possible et/ou active
        );
      }

      if (newInference.commentary !== "rep") {
        this.setRuleModal("rule-ended-well", "ended-well modal-ending");
      }
      this.setState(state => ({
        allInferencesThemselves: copyArrayThemselves
      }));
    };

    this.storageForRuleVerification = (numInference, infItself, hypID) => {
      // déclaration des variables essentielles à cette fonction
      let copyStoredInferences = [...this.state.storedInference], // inférence elle-même
        copyStoredNumbers = [...this.state.storedNumbers], // numéro(s) justifiant l'inférence (c'est une chaîne de caractères)
        copyStoredHypIDs = [...this.state.storedHypID], // ID de l'hypothèse de CETTE inférence (à comparer avec le niveau actuel d'inférence)
        // petite déclaration intermédiaire pour bien préparer le moment où on va reset le tableau des arguments
        expectedArgumentsLength = this.state.ruleModalContent.expectedArguments
          .length;
      let ruleName = this.state.ruleModalContent.ruleName;
      if (this.state.otherInterpretation[0] === "active") {
        // ici on peut remplacer la ruleName et l'expectedArguments, par l'autre interprétation, si elle a été activée par l'utilisateur
        ruleName = this.state.ruleModalContent.otherInterpretation.ruleName;
        expectedArgumentsLength = this.state.ruleModalContent
          .otherInterpretation.expectedArguments.length;
      }
      if (ruleName === "~i" || ruleName === "⊃i") {
        expectedArgumentsLength--;
      }
      // début de l'intérêt principal de cette fonction
      if (this.state.canInferenceBeStored === true) {
        // cas de toutes les règles sauf reit
        console.log(
          "2) faut que ce soit égal",
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID,
          "===",
          hypID
        );

        if (
          ruleName !== "reit" &&
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID === hypID
        ) {
          if (expectedArgumentsLength === copyStoredInferences.length) {
            // dans ce if on reset les arguments, vu que l'utilisateur a dépassé le nombre d'arguments max en cliquant
            copyStoredInferences = [infItself]; // inférence elle-même
            copyStoredNumbers = [numInference]; // nombre de l'inférence
            copyStoredHypIDs = [hypID]; // IDs de l'hypothèse de chaque inférence
          } else {
            // dans ce else on rajoute un argument, vu que l'utilisateur n'a pas encore dépassé le nombre d'arguments max en cliquant
            copyStoredInferences.push(infItself);
            copyStoredNumbers.push(numInference);
            copyStoredHypIDs.push(hypID);
          }
        } else if (ruleName !== "reit") {
          this.setAdvice(
            "Impossible d'utiliser des inférences hors de l'hypothèse en cours, sauf pour reit",
            "error-advice"
          );
        }
        if (
          ruleName === "reit" &&
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID >= hypID
        ) {
          // cas de la règle reit
          copyStoredInferences = [infItself]; // inférence elle-même
          copyStoredNumbers = [numInference]; // nombre de l'inférence
          copyStoredHypIDs = [hypID]; // IDs de l'hypothèse de chaque inférence
        } else if (ruleName === "reit") {
          this.setAdvice(
            "Impossible de réitérer une inférence provenant d'une hypothèse terminée",
            "error-advice"
          );
        }

        // // cas de la règle ∨e'
        // if (ruleName === "∨e'") {
        //   console.log(
        //     "la règle d'élimination de la disjonction inclusive, fait son oeuvre"
        //   );
        //   this.longStorageForRuleVerification(
        //     infItself,
        //     copyStoredNumbers,
        //     true
        //   );
        // }

        //  anticipation de la prochaine inférence
        InferenceForecaster(
          copyStoredInferences, // on envoie l'array des inférences stockées
          copyStoredNumbers, // on envoie l'array des nombress stockés
          ruleName, // on envoie le str de la règle en cours
          this.state
        );
      }
      // maj du state
      this.setState({
        storedInference: copyStoredInferences,
        storedNumbers: copyStoredNumbers,
        storedHypID: copyStoredHypIDs,
        ruleModalChoiceContent: "",
        attemptOfRuleValidation: false // il redevient false quoi qu'il arrive, dans cette méthode
      });
    };

    this.storageForecastInference = (
      str,
      infNum,
      infItself,
      infActualHypID
    ) => {
      // let newCurrentlyForecasting = false,
      //   newForecastedStoredInference = "",
      //   newStoredInference = this.state.storedInference;
      // // newStoredNumbers = this.state.storedNumbers;
      // if (str === "onMouseEnter") {
      //   newCurrentlyForecasting = true;
      //   newForecastedStoredInference = {
      //     numbers: infNum,
      //     itself: infItself,
      //     actualHypID: infActualHypID
      //   };
      //   // this.storageForRuleVerification(infNum, infItself, infActualHypID, str);
      //   // if () {
      //   newStoredInference.push(infItself);
      //   // newStoredNumbers = infNum;
      //   // }
      // } else if (str === "onMouseLeave") {
      //   // this.storageForRuleVerification("", "", 0, "onMouseLeave");
      // }
      // this.setState({
      //   currentlyForecasting: newCurrentlyForecasting,
      //   mouseAndInference: str,
      //   forecastedStoredInference: newForecastedStoredInference
      //   // storedInference: this.state.storedInference
      // });
    };

    this.longStorageForRuleVerification = (inference, numbers, bool) => {
      // utilisé uniquement par ∨e'
      let newlongStoredInference = [];
      if (bool === true) {
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

    this.changeStorageBoolean = bool => {
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      let canInferenceBeStored = true,
        storedInference = [],
        storedNumbers = "",
        // longStoredInference: [],
        ruleModalChoiceContent = "",
        futureInference = "",
        inversion = false;
      if (bool === "resetButStillTrue") {
        // si cette méthode arrive là c'est que l'utilisateur a cliqué sur la touche pour effacer ce qu'il avait entré
        // } else if (bool === true) {
      } else if (bool === false) {
        canInferenceBeStored = false;
        ruleModalChoiceContent = "";
      }
      this.setState({
        canInferenceBeStored: canInferenceBeStored,
        storedInference: storedInference,
        storedNumbers: storedNumbers,
        // longStoredInference: longStoredInference,
        ruleModalChoiceContent: ruleModalChoiceContent,
        futureInference: futureInference,
        inversion: inversion
      });
    };

    this.giveSolution = solution => {
      this.setState(state => ({
        allInferencesThemselves: solution
      }));
    };

    this.removeLastInference = () => {
      if (this.state.allInferencesThemselves.length >= 1) {
        let copyAllInferencesThemselves = [
          ...this.state.allInferencesThemselves
        ];
        let copyAHI = [...this.state.allHypotheticalInferences];
        let copyAEHI = [...this.state.allEndedHypotheticalInferences];
        const AITLength = copyAllInferencesThemselves.length - 1;
        if (copyAllInferencesThemselves[AITLength].commentary === "hyp") {
          // on supprime une hypothèse, donc on baisse d'un niveau d'hyp et on efface la dernière entrée dans allHypotheticalInferences
          copyAHI = copyAHI.slice(1);
          this.manageLotsOfStuffAboutHypothesis(
            "",
            "",
            "effacement de création d'hyp"
          );
        } else if (
          copyAllInferencesThemselves[AITLength].commentary === "⊃i" ||
          copyAllInferencesThemselves[AITLength].commentary === "~i"
        ) {
          // on supprime une conclusion d'hypothèse, donc on augmente d'un niveau d'hyp et on remet la dernière entrée dans AHI (présente dans AEHI), et on supprime la dernière entrée ASHI
          copyAHI.unshift(copyAEHI[0]);
          copyAEHI = copyAEHI.slice(1);
          this.manageLotsOfStuffAboutHypothesis(
            "",
            "",
            "effacement de conclusion d'hyp"
          );
        }
        copyAllInferencesThemselves.pop(); // on extrait une partie du tableau, la première en partant de la fin
        if (this.state.ruleModalShown.normal === true) {
          InferenceScanner(
            this.state.ruleModalContent, // contenu du RuleModal en cours (seul le ruleName sera utile, et potentiellement le ruleName de l'otherInterpretation)
            copyAllInferencesThemselves, // ensemble des inférences actuelles (qui seront scannées)
            copyAHI, // contenu des hypothèses en cours
            this.state.hypothesisCurrentLevelAndId, // données des hyp en cours // contenu des hyp en cours
            copyAEHI, // contenu des hypothèses terminées
            this.state.otherInterpretation // l'info selon laquelle l'autre interprétation est possible et/ou active
          );
        }
        this.state.addLastEvent("removeLastInference");
        this.setState(state => ({
          allInferencesThemselves: copyAllInferencesThemselves,
          allHypotheticalInferences: copyAHI,
          allEndedHypotheticalInferences: copyAEHI,
          storedInference: [],
          storedNumbers: [],
          storedHypID: 0,
          ruleModalChoiceContent: ""
        }));
      }
    };

    this.manageLotsOfStuffAboutHypothesis = (hypothesisItself, hyp, change) => {
      // (section 1 : change) Cette section gère l'augmentation/diminution du niveau d'hypothèse, et l'augmentation de l'id
      // Pour le moment je triche dans mon affichage. L'affichage dans MakeInference est à -1 par rapport à ici (et je rebalance ça avec un +1 qui sort de nulle part.)
      let copyHypothesisCurrentLevelAndID = {
        ...this.state.hypothesisCurrentLevelAndId
      };
      let copyAEHI = [...this.state.allEndedHypotheticalInferences]; // utilisé uniquement pour removeLastInference

      if (change === "hypothèse créée") {
        // on crée une hyp
        copyHypothesisCurrentLevelAndID.maxID++;
        copyHypothesisCurrentLevelAndID.level++;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.push([
          copyHypothesisCurrentLevelAndID.maxID,
          true
        ]);
      } else if (change === "conclusion d'hypothèse") {
        // on conclut une hyp
        copyHypothesisCurrentLevelAndID.level--;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[
          copyHypothesisCurrentLevelAndID.theCurrentHypID
        ][1] = false;
      } else if (change === "effacement de conclusion d'hyp") {
        // on efface une conclusion d'hyp avec removeLastInference
        copyHypothesisCurrentLevelAndID.level++;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[
          // copyHypothesisCurrentLevelAndID.theCurrentHypID + 1
          this.state.allInferencesThemselves[
            this.state.allInferencesThemselves.length - 2
          ].actualHypID
        ][1] = true;
      } else if (change === "effacement de création d'hyp") {
        // on efface une hyp avec removeLastInference
        copyHypothesisCurrentLevelAndID.theCurrentHypID--; // pas sûr que ça doive être là, ça
        copyHypothesisCurrentLevelAndID.maxID--;
        copyHypothesisCurrentLevelAndID.level--;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.pop();
      }

      // (étape 1,5 : on maj l'ID de l'hypothèse en cours)
      for (
        let i = copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.length - 1;
        i >= 0;
        i--
      ) {
        if (copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[i][1] === true) {
          // consolelog("la dernière hyp en cours est la", i);
          copyHypothesisCurrentLevelAndID.theCurrentHypID = i;
          i = -1;
        }
        if (i === 0) {
          copyHypothesisCurrentLevelAndID.theCurrentHypID = -1;
        }
      }

      // (section 2 : hypothesisItself, hyp) Cette section gère les intitulés d'inférence isolément, et leur ID.
      let copyAllHypotheticalInferences = [
        ...this.state.allHypotheticalInferences
      ];
      if (hyp === "nouvelle hypothèse"
      // ||  hyp === "nouvelle hyp ∨e'"
      ) {
        copyAllHypotheticalInferences.unshift(hypothesisItself); // On rajoute une hypothèse dans le tableau qui ne contient que les hypothèses
      } else if (
        hyp === "hypothèse validée" ||
        hyp === "hypothèse réfutée"
        // || hyp === "fin hyp ∨e'"
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
      return copyHypothesisCurrentLevelAndID.theCurrentHypID;
      // consolelog("niveau & id d'hypothèse", copyHypothesisCurrentLevelAndID);
    };

    this.setChoiceContent = choiceContent => {
      this.setState({
        ruleModalChoiceContent: choiceContent
      });
    };

    this.setRuleModal = (str, howItEnded, ruleModalContent, eal) => {
      // Si str est true, ruleModalShown devient true (visible). Si str est false, ruleModalShown devient false (invisible). Si str est "change", ruleModalShown devient l'opposé de ce qu'il était. Si str est quoi que ce soit d'autre, setRuleModal vérifie quand même la className.
      // "eal" contient expectedArguments.length
      // setRuleModal très en lien avec forecastInference(active,A,B,operator,commentary,numberCommentary)
      // howItEnded est soit "ended-well" soit "ended-badly" soit "hypothesis-ended-well" soit "hypothesis-ended-badly"
      let newRuleModalShown = { normal: false },
        newRuleModalContent = { ruleName: "", otherInterpretation: "" },
        newAttemptOfRuleValidation = false;
      if (ruleModalContent) {
        newRuleModalContent = ruleModalContent;
      }

      if (str === "stillOpen" || str === "initial") {
        // cas 1 : rien n'était ouvert et on ouvre un premier ruleModal
        newRuleModalShown.normal = true;
        this.forecastInference(
          true, // active
          "?", // itself
          newRuleModalContent.ruleName, // commentary
          "", // numberCommentary
          false // activable
        );
      } else if (
        str === "change" &&
        ruleModalContent.ruleName !== this.state.ruleModalContent.ruleName
      ) {
        // cas 2 : un ruleModal s'est ouvert mais il avait un ruleName différent du ruleModal déjà en cours
        newRuleModalShown.normal = true;
        this.changeStorageBoolean("resetButStillTrue", eal);
        this.forecastInference(
          true, // active
          "?", // itself
          ruleModalContent.ruleName, // commentary
          "", // numberCommentary
          false // activable
        );
      }
      if (
        str === false ||
        str === "hypothesis-ended-well" ||
        str === "rule-ended-well" ||
        (str === "change" && newRuleModalShown.normal === false)
      ) {
        // cas 4 : fin d'une règle qui ferme le ruleModal (par exemple ⊃i ~i)
        // cas 5 : l'utilisateur appuie sur la touche de fermeture du ruleModal
        newRuleModalShown.normal = false;
        this.changeStorageBoolean(false);
        this.forecastInference(false);
        this.setOtherInterpretation("reset");
        newRuleModalContent = {
          instruction: "",
          expectedArguments: [],
          ruleName: "",
          otherInterpretation: ""
        };
      }

      if (
        // newRuleModalShown.normal === true ||
        str === "initial" ||
        str === "stillOpen" ||
        (str === "change" && newRuleModalShown.normal === true)
      ) {
        InferenceScanner(
          newRuleModalContent, // contenu du RuleModal en cours (seul le ruleName sera utile, et potentiellement le ruleName de l'otherInterpretation)
          this.state.allInferencesThemselves, // ensemble des inférences actuelles (qui seront scannées)
          this.state.allHypotheticalInferences, // contenu des hyp en cours
          this.state.hypothesisCurrentLevelAndId, // données des hyp en cours // contenu des hyp en cours
          this.state.allEndedHypotheticalInferences, // données des hyp terminées
          this.state.otherInterpretation // l'info selon laquelle l'autre interprétation est possible et/ou active
        );
      }

      if (howItEnded === "ended-well") {
      } else if (howItEnded === "ended-badly") {
        newAttemptOfRuleValidation = true;
      }

      // ci-dessous on utilise la fonction permettant de scanner les inférences pour voir s'il y en a qui sont compatibles avec la règle du ruleModal en cours
      this.setState({
        ruleModalShown: newRuleModalShown,
        ruleModalContent: newRuleModalContent,
        attemptOfRuleValidation: newAttemptOfRuleValidation
      });
    };

    this.toggleOptionsAboutInferences = str => {
      // str peut avoir "Debugger" ou "InferenceScanner" comme valeur, selon l'option qu'on veut changer
      let newBOAI = {
        ...this.state.booleansOptionsAboutInferences
      };
      if (str === "Debugger") {
        if (newBOAI.boolDebugger) {
          newBOAI.boolDebugger = false;
        } else {
          newBOAI.boolDebugger = true;
        }
      } else if (str === "InferenceScanner") {
        if (newBOAI.boolInferenceScanner) {
          newBOAI.boolInferenceScanner = false;
        } else {
          newBOAI.boolInferenceScanner = true;
        }
      } else if (str === "finalCheck") {
        if (newBOAI.boolFinalCheck) {
          newBOAI.boolFinalCheck = false;
        } else {
          newBOAI.boolFinalCheck = true;
        }
      }
      this.setState({
        booleansOptionsAboutInferences: newBOAI
      });
    };

    this.updateStepRule = bool => {
      // utilisé uniquement pour cette putain de règle d'élimination de la disjonction
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
      const adviceToReturn = (
        <div className={"advice " + adviceClassName}>{advice}</div>
      );
      this.setState({ advice: adviceToReturn });
      setTimeout(() => {
        this.setState({ advice: <div className="advice" /> });
      }, 4000);
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

    this.setInversion = () => {
      // permet d'inverser l'inférence qui sera produite. fonction utilisée uniquement par l'introduction de la disjonction
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

    this.storeUserExerciseBeforeUpload = newStoredObjectExercise => {
      this.setState({
        storedObjectExercise: newStoredObjectExercise
      });
    };

    this.forecastInference = (
      active, // est-on en train de forecaster une inférence
      itself, // inférence elle-même
      commentary, // son commentaire (obtenu quand il y a un ruleModal ouvert)
      numberCommentary, // nombre·s du commentaire, (obtenu·s quand l'utilisateur a cliqué sur une ou des inférences)
      activable // l'inférence forecastée peut-elle être activée
    ) => {
      let newProbableInference = {
        active: active,
        itself: itself,
        commentary: commentary,
        numberCommentary: numberCommentary,
        activable: activable
      };
      if (!active) {
        newProbableInference = {
          active: false,
          itself: "",
          commentary: "",
          numberCommentary: "",
          activable: false
        };
      }

      this.setState({ probableInference: newProbableInference });
    };

    this.attemptingToValidateARule = () => {
      this.setState({ attemptOfRuleValidation: true });
    };

    this.modifyClassNameOfAnyInference = (
      classNameType,
      positionOfInference
    ) => {
      let newAIT = [...this.state.allInferencesThemselves],
        newClassName = "",
        countOfRemovedInference = 0;
      for (let i = 0; i < newAIT.length; i++) {
        if (
          this.state.allEvent[this.state.allEvent.length + i] ===
          "removeLastInference"
        ) {
          countOfRemovedInference++;
        } else {
          i = newAIT.length;
        }
      }
      if (newAIT.length > 0) {
        if (classNameType === "unremovable") {
          newClassName = "unremovableInference-blinking";
        } else if (classNameType === "removable") {
          newClassName = "removableInference-blinking";
        } else if (classNameType === "selected") {
          newClassName = "selectedInference-blinking";
        } else if (classNameType === "unselected") {
          newClassName = "unselectedInference-blinking";
        }
        if (positionOfInference === "last") {
          newAIT[newAIT.length - 1].inferenceBackground = newClassName;
        } else if (positionOfInference === "all") {
          for (let i = 0; i < newAIT.length; i++) {
            newAIT[i].inferenceBackground = newClassName;
          }
        } else if (typeof positionOfInference === "number") {
          newAIT[
            positionOfInference - 1 - countOfRemovedInference
          ].inferenceBackground = newClassName;
        }
        this.setState({
          allInferencesThemselves: newAIT
        });
      }
    };

    this.addLastEvent = newEvent => {
      // fonction pour indiquer quel a été le dernier évènement dans l'inférence, soit "addInference", "removeInference", "doubleAddInference" (et dans ce dernier cas on ajoute 2 fois l'évènement)
      // fonction qui sert principalement pour les classNames des backgrounds des inférences
      let newAllEvent = [...this.state.allEvent];
      newAllEvent.push(newEvent);
      if (newEvent === "doubleAddInference") {
        newAllEvent.push(newEvent);
      }
      this.setState({ allEvent: newAllEvent });
    };

    this.setOtherInterpretation = str => {
      // fonction pour indiquer si l'autre interprétation est activée
      // str peut être "active" ou "possible" ou "reset"
      let newOtherInterpretation = [...this.state.otherInterpretation];
      if (str === "active" || str === "inactive") {
        newOtherInterpretation[0] = str;
      } else if (str === "possible" || str === "impossible") {
        newOtherInterpretation[1] = str;
      } else if (str === "reset") {
        newOtherInterpretation = ["inactive", "impossible"];
      }
      InferenceScanner(
        this.state.ruleModalContent, // contenu du RuleModal en cours (seul le ruleName sera utile, et potentiellement le ruleName de l'otherInterpretation)
        this.state.allInferencesThemselves, // ensemble des inférences actuelles (qui seront scannées)
        this.state.allHypotheticalInferences, // contenu des hyp en cours
        this.state.hypothesisCurrentLevelAndId, // données des hyp en cours
        this.state.allEndedHypotheticalInferences,
        newOtherInterpretation // l'info selon laquelle l'autre interprétation est possible et/ou active
      );
      // InferenceForecaster("normal", this.state); // Pareil que la ligne au-dessus
      this.setState({
        otherInterpretation: newOtherInterpretation
      });
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferencesThemselves: [],
        allInferencesValidForCurrentRule: [],
        canInferenceBeStored: false,
        storedInference: [],
        storedNumbers: "",
        storedHypID: 0,
        longStoredInference: [], // stockage conditionnel
        hypothesisCurrentLevelAndId: {
          level: 0,
          maxID: -1,
          theCurrentHypID: -1,
          whichIDIsStillOpen: [] // tableau à tableaux contenant un nombre + un booléen
        },
        allHypotheticalInferences: [],
        allEndedHypotheticalInferences: [], // utilisé uniquement pour removeLastInference
        // section ruleModal
        ruleModalShown: { normal: false },
        ruleModalContent: {
          instruction: "",
          expectedArguments: [],
          ruleName: "",
          otherInterpretation: ""
        },
        stepRule: 0,
        ruleModalChoiceContent: "",
        // autre
        advice: <div className="advice" />,
        possibleMeaningShown: false,
        partOfInference: "A",
        inversion: false,
        futureInference: "",
        storedObjectExercise: {
          title: "",
          premisses: [],
          conclusion: "",
          meaning: [],
          comment: "",
          rulesImplied: [],
          doable: undefined
        },
        probableInference: {
          active: false,
          itself: "",
          commentary: "",
          numberCommentary: "",
          activable: false
        },
        attemptOfRuleValidation: false,
        allEvent: []
      }));
    };

    this.state = {
      showAllInferences: this.showAllInferences,
      allInferencesThemselves: [], // contient les inférences elles-mêmes + leur commentaire + les nombres justifiant leur commentaire
      canInferenceBeStored: false, // ne devient vrai que lorsqu'on clique sur un bouton de règle, ce qui active aussi un modal
      addInference: this.addInference,
      changeStorageBoolean: this.changeStorageBoolean,
      storageForRuleVerification: this.storageForRuleVerification,
      storedInference: [], // contient les données "brutes" des inférences stockées pour la validation d'une règle
      storedNumbers: "", // Contient les nombres des inférences en question (ce ne sera jamais autre chose qu'une courte chaîne de caractère)
      storedHypID: 0, // chaque inférence dans une hypothèse a un id d'hypothèse (qui est à 0 s'il n'y a pas d'hyp en cours), storedHypID permet de stocker cet id d'hypothèse, pour le comparer à celui de l'hypothèse en cours
      forecastedStoredInference: "", // str contenant la prochaine inf
      // section des données stockées dans des situations spécifiques (et destockées dans des situations spécifiques)
      longStoredInference: [], // stockage conditionnel
      longStorageForRuleVerification: this.longStorageForRuleVerification,
      // section de l'objet des options relatives aux déductions et inférences
      booleansOptionsAboutInferences: {
        boolInferenceScanner: true, // le scanner est-il activé ? (l'utilisateur peut l'activer ou le désactiver en cliquant sur l'oeil dans l'interface des exos)
        boolDebugger: false, // le debugger est-il activé ? (il affiche certaines informations)
        boolFinalCheck: false // les règles tentent-elles de s'activer automatiquement si tous les arguments ont été entrés ?
      },
      toggleOptionsAboutInferences: this.toggleOptionsAboutInferences,
      // section de divers boutons de l'interface
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      manageLotsOfStuffAboutHypothesis: this.manageLotsOfStuffAboutHypothesis,
      hypothesisCurrentLevelAndId: {
        level: 0,
        maxID: -1, // -1 signifie qu'aucune hypothèse n'a encore été créée
        theCurrentHypID: -1, // -1 signifie qu'aucune hypothèse n'a encore été créée
        whichIDIsStillOpen: [] // tableau à tableau contenant un nombre + un booléen
      },
      allHypotheticalInferences: [], // cette variable stocke les derniers intitulés d'hypothèses. Lorsqu'on utilise ~i ou ⊃i (si les conditions sont remplies pour les utiliser réellement), le dernier élément de cette variable est alors utilisé pour créer une nouvelle inférence, puis il est retiré du tableau.
      allEndedHypotheticalInferences: [], // utilisé uniquement pour removeLastInference. Lorsqu'on supprime une inférence qui concluait une hypothèse, celle-ci redevient une hypothèse en cours, il faut donc pouvoir la récupérer. C'est à cela que sert le stockage des hyp supprimées.
      // section ruleModal
      ruleModalShown: { normal: false }, // je ferai peut-être un "ruleModalShown.special", plus tard
      ruleModalContent: {
        instruction: "",
        expectedArguments: [],
        ruleName: "",
        otherInterpretation: ""
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
      inversion: false, // ce booléen permet de savoir s'il faut inverser ou non telle inférence ayant pour connecteur dominant ∧, ∨, ⊻, ≡, ↓ ou ↑
      setInversion: this.setInversion,
      // showOperatorScope: this.showOperatorScope, // cette fonction détecte la portée de l'opérateur et l'affiche lorsque l'utilisateur met sa souris sur l'opérateur (la portée se retrouve soulignée)
      // commutativityRule: this.commutativityRule, // cette fonction permet d'inverser les parties gauche et droite de ce qui est dans la portée de l'opérateur
      // section de la création d'inférence par l'utilisateur
      futureInference: "",
      addToFutureInference: this.addToFutureInference,
      removeLastCharacter: this.removeLastCharacter,
      // section des données de l'utilisateur
      storeUserExerciseBeforeUpload: this.storeUserExerciseBeforeUpload,
      storedObjectExercise: {
        title: "",
        premisses: [],
        conclusion: "",
        meaning: [],
        comment: "",
        rulesImplied: [],
        doable: undefined
      },
      forecastInference: this.forecastInference,
      probableInference: {
        active: false,
        itself: "",
        commentary: "",
        numberCommentary: "",
        activable: false
      },
      attemptingToValidateARule: this.attemptingToValidateARule,
      attemptOfRuleValidation: false, // devient "true" dès que l'utilisateur ou l'automatisme, a tenté de valider la règle (et lorsqu'il est true la fenêtre de règle devient rouge)
      currentlyForecasting: false, // devient "true" dès qu'on fait un storageForRuleVerification juste en plaçant la souris sur une inférence
      mouseAndInference: "onMouseLeave", // contient soit "onMouseEnter", "OnMouseLeave", voire "onClick", pour savoir ce que l'utilisateur a fait en dernier
      storageForecastInference: this.storageForecastInference, // utilise les deux précédentes variables du state
      modifyClassNameOfAnyInference: this.modifyClassNameOfAnyInference,
      allEvent: [], // peut prendre les valeurs "removeLastInference", "addInference", "doubleAddInference"
      addLastEvent: this.addLastEvent, // permet de fixer quel est le dernier évènement dans la déduction
      otherInterpretation: ["inactive", "impossible"], // concerne le fait que l'utilisateur ait activé ou non l'autre interprétation, en fonction de si c'était possible ou non
      setOtherInterpretation: this.setOtherInterpretation
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
