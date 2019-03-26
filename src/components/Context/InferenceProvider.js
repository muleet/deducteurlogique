import React, { createContext, Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import MakeInference from "../Calcul Tools/MakeInference";
import InferenceScanner from "./Components/InferenceScanner";
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
      let hypNumber = 0,
        hypIDNumber = this.state.hypothesisCurrentLevelAndId.theCurrentHypID;
      let inferenceType = "";
      let copyArrayRendered = [...this.state.allInferencesRendered];
      let copyArrayThemselves = [...this.state.allInferencesThemselves];
      // section de l'hypothèse (ignorée si hyp est undefined)
      if (hyp === "nouvelle hypothèse" || hyp === "nouvelle hyp ∨e") {
        hypNumber = 1;
        newInference.numberCommentaryHypothesis = copyArrayRendered.length + 1;
        hypIDNumber = this.manageLotsOfStuffAboutHypothesis(
          newInference,
          hyp,
          "hypothèse créée"
        );
        inferenceType = "hypothesisItself";
      }
      if (hyp === "hypothèse validée" || hyp === "hypothèse réfutée") {
        hypNumber = -1;
        hypIDNumber = this.manageLotsOfStuffAboutHypothesis(
          newInference,
          hyp,
          "conclusion d'hypothèse"
        );
      }

      // section des hypothèses de l'élimination de la disjonction, ∨e
      // const copyStoredHypId =
      //   this.state.hypothesisCurrentLevelAndId.actualID + hypNumber; // CE TRUC LA MARCHE
      const copyStoredHypId = hypIDNumber;

      const storedLevel =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber; // variable qui n'est utilisée que pour conditionner la règle reit

      // vérification de la conclusion
      if (
        storedLevel === 0 &&
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

      // section  de la détection de l'opérateur + de la possibilité de commuter, pour les règles où l'opérateur est commutatif
      // showOperatorScope: this.showOperatorScope,
      // commutativityRule: this.commutativityRule

      // Maj du tableau lui-même, avec la nouvelle inférence (l'un des moments les plus importants du code)
      copyArrayRendered.push(
        <MakeInference
          key={Number(copyArrayRendered.length + 1)}
          inferenceNumber={Number(copyArrayRendered.length + 1) + "."}
          hypothesisCurrentLevel={storedLevel}
          inferenceItself={newInference.itself}
          inferenceCommentary={commentary}
          inferenceType={inferenceType}
          onClickSent={() => {
            if (this.state.canInferenceBeStored === true) {
              this.storageForRuleVerification(
                copyArrayRendered.length, // on envoie le futur numéro d'inférence
                newInference.itself, // on envoie l'inférence elle-même
                copyStoredHypId // on envoie l'id de l'hypothèse, pour vérifier si l'inférence est stockable
              );
            } else {
              // ce if empêche l'utilisateur de reit une inférence qui provient d'une hyp terminée, et permet toujours de reit depuis une absence d'hyp
              if (
                storedLevel === 0 ||
                this.state.hypothesisCurrentLevelAndId.whichIDIsStillOpen[
                  copyStoredHypId - 1
                ][1] === true
              ) {
                // l'action est possible SSI l'hyp est ouverte.(Il nereste plusqu'à coder l'action en question)
              }
            }
          }}
          hypIDSent={hypIDNumber}
        />
      );
      newInference.level =
        this.state.hypothesisCurrentLevelAndId.level + hypNumber;
      newInference.actualHypID =
        // this.state.hypothesisCurrentLevelAndId.actualID + hypNumber; // ce truc-là marche !
        hypIDNumber;
      copyArrayThemselves.push(newInference);

      if (
        this.state.ruleModalContent.ruleName &&
        this.state.ruleModalShown.normal === true
      ) {
        InferenceScanner(
          this.state.ruleModalContent.ruleName, // nom de la règle du ruleModal en cours
          copyArrayThemselves, // ensemble des inférences actuelles (qui seront scannées)
          this.state.updateScannedInferences, // fonction qui permettra de maj la liste des inférences scannées
          this.state.allHypotheticalInferences, // contenu des hyp en cours
          this.state.hypothesisCurrentLevelAndId, // données des hyp en cours
          this.state.allEndedHypotheticalInferences
        );
      }

      this.setState(state => ({
        allInferencesRendered: copyArrayRendered,
        allInferencesThemselves: copyArrayThemselves
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
      if (ruleName === "~i" || ruleName === "⊃i") {
        expectedArgumentsLength--;
      }
      // début de l'intérêt principal de cette fonction
      if (this.state.canInferenceBeStored === true) {
        console.log("storageRuleVerif", this.state.hypothesisCurrentLevelAndId);

        // cas de la règle reit
        if (
          ruleName === "reit" &&
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID >= hypID
          // this.state.hypothesisCurrentLevelAndId.actualID >= hypID
        ) {
          copyArrayStoredInference = [infItself]; // inférence elle-même
          copyStoredNumbers = [numInference]; // nombre de l'inférence
        } else if (ruleName === "reit") {
          this.setAdvice(
            "Impossible de réitérer une inférence provenant d'une hypothèse terminée",
            "error-advice"
          );
        }

        // cas de toutes les règles sauf reit
        console.log(
          "faut que ce soit égal",
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID,
          "===",
          hypID
        );
        // console.log(
        //   "faut que ce soit égal",
        //   this.state.hypothesisCurrentLevelAndId.actualID,
        //   "===",
        //   hypID
        // );
        if (
          ruleName !== "reit" &&
          this.state.hypothesisCurrentLevelAndId.theCurrentHypID === hypID
          // this.state.hypothesisCurrentLevelAndId.actualID === hypID
        ) {
          if (expectedArgumentsLength === copyArrayStoredInference.length) {
            // dans ce if on reset les arguments, vu que l'utilisateur a dépassé le nombre d'arguments max en cliquant
            copyArrayStoredInference = [infItself]; // inférence elle-même
            copyStoredNumbers = [numInference]; // nombre de l'inférence
          } else {
            // dans ce else on rajoute un argument, vu que l'utilisateur n'a pas encore dépassé le nombre d'arguments max en cliquant
            copyArrayStoredInference.push(infItself);
            copyStoredNumbers.push(" " + numInference);
            copyStoredHypId.push(hypID);
          }
        } else if (ruleName !== "reit") {
          this.setAdvice(
            "Impossible d'utiliser des inférences hors de l'hypothèse en cours, sauf pour reit",
            "error-advice"
          );
        }

        // cas de la règle ∨e
        if (ruleName === "∨e") {
          console.log(
            "la règle d'élimination de la disjonction inclusive, fait son oeuvre"
          );
          this.longStorageForRuleVerification(
            infItself,
            copyStoredNumbers,
            true
          );
        }

        this.setState(state => ({
          storedInference: copyArrayStoredInference,
          storedNumbers: copyStoredNumbers,
          storedHypID: copyStoredHypId
        }));
      }
    };

    this.longStorageForRuleVerification = (inference, numbers, bool) => {
      // utilisé uniquement pour l'élimination de la disjonction inclusive
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

    this.changeStorageBoolean = (bool, num) => {
      // sert à désactiver le tableau storedInference quand un modal n'est pas activé
      if (bool === "resetButStillTrue") {
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
      } else if (bool === true) {
        this.setState({
          canInferenceBeStored: true
        });
      } else if (bool === false) {
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
      if (this.state.allInferencesThemselves.length >= 1) {
        let copyAllInferencesRendered = [...this.state.allInferencesRendered];
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
        copyAllInferencesRendered.pop(); // on extrait une partie du tableau, la première en partant de la fin
        copyAllInferencesThemselves.pop();
        InferenceScanner(
          this.state.ruleModalContent.ruleName, // nom de la règle du ruleModal en cours
          copyAllInferencesThemselves, // ensemble des inférences actuelles (qui seront scannées)
          this.state.updateScannedInferences, // fonction qui permettra de maj la liste des inférences scannées
          copyAHI, // contenu des hyp en cours
          this.state.hypothesisCurrentLevelAndId, // données des hyp en cours // contenu des hyp en cours
          copyAEHI
        );
        this.setState(state => ({
          allInferencesRendered: copyAllInferencesRendered,
          allInferencesThemselves: copyAllInferencesThemselves,
          allHypotheticalInferences: copyAHI,
          allEndedHypotheticalInferences: copyAEHI
        }));
      }
    };

    this.resetDeduction = () => {
      this.setState(state => ({
        allInferencesRendered: [],
        allInferencesThemselves: [],
        allInferencesValidForCurrentRule: [],
        storedInference: [],
        storedNumbers: "",
        storedHypID: 0,
        canInferenceBeStored: false,
        hypothesisCurrentLevelAndId: {
          level: 0,
          maxID: -1,
          // actualID: 0,
          theCurrentHypID: -1,
          whichIDIsStillOpen: [] // tableau à tableaux contenant un nombre + un booléen
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

    this.getCurrentHyp = () => {
      // cette fonction cherche la première hypothèse en partant de la fin, à toujours être true, et maj la variable "theCurrentHypID" avec le bon nombre
      let newTheOneAndOnlyCurrentHyp = null;

      return newTheOneAndOnlyCurrentHyp;
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
        // copyHypothesisCurrentLevelAndID.actualID++;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.push([
          copyHypothesisCurrentLevelAndID.maxID,
          true
        ]);
      } else if (change === "conclusion d'hypothèse") {
        // on conclut une hyp
        copyHypothesisCurrentLevelAndID.level--;
        // copyHypothesisCurrentLevelAndID.actualID--; // DOUTE : cette ligne a-t-elle vraiment lieu ... ?
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[
          copyHypothesisCurrentLevelAndID.theCurrentHypID
        ][1] = false;
      } else if (change === "effacement de conclusion d'hyp") {
        // on efface une conclusion d'hyp avec removeLastInference
        copyHypothesisCurrentLevelAndID.level++;
        // copyHypothesisCurrentLevelAndID.actualID++;
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[
          // copyHypothesisCurrentLevelAndID.theCurrentHypID + 1
          this.state.allInferencesThemselves[
            this.state.allInferencesThemselves.length - 2
          ].actualHypID
        ][1] = true;
      } else if (change === "effacement de création d'hyp") {
        // on efface une hyp avec removeLastInference
        copyHypothesisCurrentLevelAndID.maxID--;
        copyHypothesisCurrentLevelAndID.level--;
        // copyHypothesisCurrentLevelAndID.actualID--; // DOUTE : cette ligne a-t-elle vraiment lieu ... ?
        copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.pop();
      }

      // (étape 1,5 : on maj l'ID de l'hypothèse en cours)
      for (
        let i = copyHypothesisCurrentLevelAndID.whichIDIsStillOpen.length - 1;
        i >= 0;
        i--
      ) {
        if (copyHypothesisCurrentLevelAndID.whichIDIsStillOpen[i][1] === true) {
          console.log("la dernière hyp en cours est la", i);
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
      return copyHypothesisCurrentLevelAndID.theCurrentHypID;
      // consolelog("niveau & id d'hypothèse", copyHypothesisCurrentLevelAndID);
    };

    this.setChoiceContent = choiceContent => {
      this.setState({
        ruleModalChoiceContent: choiceContent
      });
    };

    this.setRuleModal = (str, strClassName, ruleModalContent, eal) => {
      // Si str est true, ruleModalShown devient true (visible). Si str est false, ruleModalShown devient false (invisible). Si str est "change", ruleModalShown devient l'opposé de ce qu'il était. Si str est quoi que ce soit d'autre, setRuleModal vérifie quand même la className.
      // "eal" contient expectedArguments.length
      let newRuleModalShown = { normal: false };
      let newClassName = ""; // rule-modal-ended-well ou rule-modal-ended-badly
      let newRuleModalContent;
      if (ruleModalContent) {
        newRuleModalContent = ruleModalContent;
      } else {
        newRuleModalContent = this.state.ruleModalContent;
      }
      if (str === "stillOpen" || str === "initial") {
        // cas 1 : rien n'était ouvert et on ouvre un premier ruleModal
        newRuleModalShown.normal = true;
      } else if (
        str === "change" &&
        ruleModalContent.ruleName !== this.state.ruleModalContent.ruleName
      ) {
        // cas 2 : un ruleModal s'est ouvert mais il avait un ruleName différent du ruleModal déjà en cours
        newRuleModalShown.normal = true;
        this.changeStorageBoolean("resetButStillTrue", eal);
      } else if (str === "change" && !newRuleModalShown.shown) {
        // cas 3 : L'utilisateur a fermé le ruleModal qui était ouvert, en cliquant sur le bouton du ruleModal, par conséquent plus rien n'est ouvert
        this.updateScannedInferences("reset"); // il n'y a plus de ruleModal en cours, donc plus de détection des inférences compatibles
      }

      if (
        str === "hypothesis-ended-well" ||
        str === "user-closed-the-modal" ||
        str === "rule-ended-well"
      ) {
        // cas 4 : fin d'une règle qui ferme le ruleModal (par exemple ⊃i ~i)
        // cas 5 : l'utilisateur appuie sur la touche de fermeture du ruleModal
        newRuleModalShown.normal = false;
        this.updateScannedInferences("reset"); // il n'y a plus de ruleModal en cours, donc plus de détection des inférences compatibles
      }

      if (
        // newRuleModalShown.normal === true ||
        str === "initial" ||
        str === "stillOpen" ||
        (str === "change" &&
          // ruleModalContent.ruleName !== this.state.ruleModalContent.ruleName &&
          newRuleModalShown.normal === true)
      ) {
        InferenceScanner(
          newRuleModalContent.ruleName, // nom de la règle du ruleModal en cours
          this.state.allInferencesThemselves, // ensemble des inférences actuelles (qui seront scannées)
          this.state.updateScannedInferences, // fonction qui permettra de maj la liste des inférences scannées
          this.state.allHypotheticalInferences, // contenu des hyp en cours
          this.state.hypothesisCurrentLevelAndId, // données des hyp en cours // contenu des hyp en cours
          this.state.allEndedHypotheticalInferences // données des hyp terminées
        );
      }

      if (strClassName === "ended-well") {
        newClassName = "rule-modal-ended-well";
      } else if (strClassName === "ended-badly") {
        newClassName = "rule-modal-ended-badly";
      }

      // ci-dessous on utilise la fonction permettant de scanner les inférences pour voir s'il y en a qui sont compatibles avec la règle du ruleModal en cours
      this.setState({
        ruleModalShown: newRuleModalShown,
        ruleModalClassName: newClassName,
        ruleModalContent: newRuleModalContent
      });
    };

    this.updateScannedInferences = newArrayOfCompatibleInferences => {
      if (newArrayOfCompatibleInferences === "reset") {
        newArrayOfCompatibleInferences = "";
      }
      this.setState({
        allInferencesValidForCurrentRule: newArrayOfCompatibleInferences
      });
    };

    this.toggleOptionsAboutInferences = str => {
      // str peut avoir "Debugger" ou "inferenceScanner" comme valeur, selon l'option qu'on veut changer
      let newBooleansOptionsAboutInferences = {
        ...this.state.booleansOptionsAboutInferences
      };
      if (str === "Debugger") {
        if (newBooleansOptionsAboutInferences.boolDebugger === true) {
          newBooleansOptionsAboutInferences.boolDebugger = false;
        } else {
          newBooleansOptionsAboutInferences.boolDebugger = true;
        }
      } else if (str === "InferenceScanner") {
        if (newBooleansOptionsAboutInferences.boolInferenceScanner === true) {
          newBooleansOptionsAboutInferences.boolInferenceScanner = false;
        } else {
          newBooleansOptionsAboutInferences.boolInferenceScanner = true;
        }
      }
      this.setState({
        booleansOptionsAboutInferences: newBooleansOptionsAboutInferences
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

    this.setInversion = () => {
      // permet d'inverser l'inférence qui sera produite. fonction utilisée uniquement par l'élimination de la disjonction
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

    this.state = {
      allInferencesRendered: [], // contient les données htmlisées des inférences
      allInferencesThemselves: [], // contient les inférences elles-mêmes + leur commentaire + les nombres justifiant leur commentaire
      allInferencesValidForCurrentRule: [], // contient des tableaux à deux données : la position du premier caractère dans l'inf + la classeName qu'il faut lui donner (soit "inference-validFirstArgument", soit "inference-validSecondArgument"), autrement dit allValidInference ne contient rien sur les inférences invalides pour la règle en cours
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
      // section de l'objet des options relatives aux déductions et inférences
      booleansOptionsAboutInferences: {
        boolInferenceScanner: true, // le scanner est-il activé ? (l'utilisateur peut l'activer ou le désactiver en cliquant sur l'oeil dans l'interface des exos)
        boolDebugger: false // le debugger est-il activé ? (il affiche certaines informations)
      },
      toggleOptionsAboutInferences: this.toggleOptionsAboutInferences,
      // sections de divers boutons de l'interface
      giveSolution: this.giveSolution,
      removeLastInference: this.removeLastInference,
      resetDeduction: this.resetDeduction,
      // section de l'hypothèse
      manageLotsOfStuffAboutHypothesis: this.manageLotsOfStuffAboutHypothesis,
      getCurrentHyp: this.getCurrentHyp,
      hypothesisCurrentLevelAndId: {
        level: 0,
        maxID: -1, // -1 signifie qu'aucune hypothèse n'a encore été créée
        // actualID: 0,
        theCurrentHypID: -1, // -1 signifie qu'aucune hypothèse n'a encore été créée
        whichIDIsStillOpen: [] // tableau à tableau contenant un nombre + un booléen
      },
      allHypotheticalInferences: [], // cette variable stocke les derniers intitulés d'hypothèses. Lorsqu'on utilise ~i ou ⊃i (si les conditions sont remplies pour les utiliser réellement), le dernier élément de cette variable est alors utilisé pour créer une nouvelle inférence, puis il est retiré du tableau.
      allEndedHypotheticalInferences: [], // utilisé uniquement pour removeLastInference. Lorsqu'on supprime une inférence qui concluait une hypothèse, celle-ci redevient une hypothèse en cours, il faut donc pouvoir la récupérer. C'est à cela que sert le stockage des hyp supprimées.
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
      updateScannedInferences: this.updateScannedInferences,
      updateStepRule: this.updateStepRule,
      // section conseil & signification
      advice: <div className="advice" />,
      setAdvice: this.setAdvice,
      possibleMeaningShown: false,
      setPossibleMeaning: this.setPossibleMeaning,
      //  section commutativité & portée de l'opérateur
      // inversion: false, // ce booléen permet de savoir s'il faut inverser ou non telle inférence ayant pour connecteur dominant ∧, ∨, ⊻, ≡, ↓ ou ↑
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
