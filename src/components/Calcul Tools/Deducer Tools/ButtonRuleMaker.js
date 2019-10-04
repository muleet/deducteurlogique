import React, { Component } from "react";
import RulePopover from "../../Modals and Popovers/RulePopover";
import InfoRules from "../../../data/InfoRules.json";
import RuleModal from "../../Modals and Popovers/RuleModal";
import RuleHypothesisModal from "../../Modals and Popovers/RuleHypothesisModal";
// import ButtonDeductionMaker from "./ButtonDeductionMaker";

// ButtonRuleMaker génère la liste des règles d'un exercice. Par défaut, chaque exercice a un nombre de règles fixes.
// Si aucune règle n'est fixée pour un exercice, alors ButtonRuleMaker renvoie la totalité des règles.

class ButtonRuleMaker extends Component {
  // renderSlashedEyeForButtonRule(bool) {
  //   if (
  //     bool === "no" &&
  //     this.props.valueInference.booleansOptionsAboutInferences.boolInferenceScanner
  //   ) {
  //     return <i className="fas fa-eye-slash tiny-info-rule" />;
  //   }
  // }

  renderModal() {
    if (this.props.valueInference.ruleModalContent.ruleName === "hyp") {
      return (
        <RuleHypothesisModal
          instruction={this.props.valueInference.ruleModalContent.instruction}
          expectedArguments={
            this.props.valueInference.ruleModalContent.expectedArguments
          } // pas pareil pour l'hypothèse ? j'ai un doute alors je laisse ce commentaire
          ruleName={this.props.valueInference.ruleModalContent.ruleName}
          valueInference={this.props.valueInference}
        />
      );
    } else {
      return (
        <RuleModal
          instruction={this.props.valueInference.ruleModalContent.instruction}
          expectedArguments={
            this.props.valueInference.ruleModalContent.expectedArguments
          }
          ruleName={this.props.valueInference.ruleModalContent.ruleName}
          valueInference={this.props.valueInference}
        />
      );
    }
  }

  renderRuleClassName(ruleName, availability) {
    let classNameToReturn = " selectable ";
    // if (this.props.valueInference.longStoredInference) {
    //   classNameToReturn = "longSelected";
    //   // this.renderRuleClassName("∨e");
    // }
    if (availability === "test" || availability === "bug") {
      classNameToReturn += " testRule ";
    }
    if (
      this.props.valueInference.ruleModalContent.ruleName === ruleName &&
      this.props.valueInference.ruleModalShown.normal
    ) {
      classNameToReturn += " selected";
    }

    return classNameToReturn;
  }

  handleClick(instruction, expectedArguments, ruleName, valueInference) {
    const objectForTheRuleModal = {
      instruction: instruction,
      expectedArguments: expectedArguments,
      ruleName: ruleName
    };
    // les deux conditions ci-dessous permettent de vérifier si canInferenceBeStored doit être ouvert ou fermé
    if (
      this.props.valueInference.ruleModalShown.normal === true &&
      ruleName === this.props.valueInference.ruleModalContent.ruleName
    ) {
      valueInference.changeStorageBoolean(false);
    } else {
    }
    if (this.props.valueInference.ruleModalShown.normal === false) {
      valueInference.changeStorageBoolean(
        true,
        expectedArguments.length,
        ruleName
      );
    }
    if (this.props.valueInference.ruleModalShown.normal === false) {
      valueInference.setRuleModal(
        // cas 1
        "initial",
        "",
        objectForTheRuleModal,
        expectedArguments.length
      );
    } else {
      valueInference.setRuleModal(
        // cas 2 et 3
        "change",
        "",
        objectForTheRuleModal,
        expectedArguments.length
      );
    }
  }

  makeTypeRule(type, content) {
    let title = "";
    if (content.length >= 1) {
      if (type === "basic") {
        title = "Règles de base";
      }
      if (type === "hypothetical") {
        title = "Règles d'hypothèse";
      }
      if (type === "conjonction" || type === "disjonction") {
        title = "Conjonctions & Disjonctions";
      }
      // if (type === "disjonction") {
      //   title = "Disjonctions";
      // }
      if (type === "other") {
        title = "Autres règles";
        // title = "Autres règles";
      }
      return (
        <div>
          <p className="specificSetOfRules-title">{title}</p>
          <ul className="specificSetOfRules">{content}</ul>
        </div>
      );
    }
  }

  makeOneButtonRule(num, Rule, RulePopoverClassName, organizedUtilization) {
    return (
      <li
        key={num}
        onClick={() => {
          if (Rule.name !== "rep") {
            this.handleClick(
              Rule.instruction,
              Rule.expectedArguments,
              Rule.name,
              this.props.valueInference
            );
          }
        }}
      >
        <RulePopover
          RulePopoverClassName={RulePopoverClassName} // singleRule tinyRule fatRule + this.renderRuleClassName(name, available)
          ruleName={Rule.name}
          lecture={Rule.lecture}
          verbalName={Rule.verbalName}
          Description={Rule.verbalDescription}
          HowToUse={organizedUtilization}
          // ShouldItBeResized={true} // par exemple pour ~~e
        />
      </li>
    );
  }

  render() {
    // SECTION 1 : DÉCLARATION DES CREATIONS DES VARIABLES
    let allCurrentRuleNames = []; // tableau contenant des str avec tous les noms de règles en cours
    let allBasicRulesRendered = [];
    let allHypotheticalRulesRendered = [];
    let allConjonctionRulesRendered = [];
    // let allDisjonctionRulesRendered = [];
    let allOtherRulesRendered = [];
    if (this.props.sandbox) {
      // cas 1 (sandbox) : allCurrentRuleNames contient les noms de toutes les règles du site
      for (let i = 0; i < InfoRules.length; i++) {
        if (
          InfoRules[i].available === "yes" ||
          InfoRules[i].available === "test" ||
          InfoRules[i].available === "bug"
        ) {
          allCurrentRuleNames.push(InfoRules[i].name); // ne contient QUE les noms des règles
        }
      }
    } else {
      // cas 2 (un exercice spécifique) : allCurrentRuleNames contient les noms de toutes les règles de l'exo sélectionné
      allCurrentRuleNames = [...this.props.rulesSent]; // rulesSent est envoyée par Deducer et contient seulement les noms en str des règles impliquées
    }

    // SECTION 2 : CRÉATION DES BUTTONRULES
    if (allCurrentRuleNames.length > 0) {
      // On commence par créer un tableau qui va contenir toutes les infos des règles de l'exo. C'est lui qui sera la source de toutes les autres infos.
      let arrayCurrentRulesData = [];
      for (let i = 0; i < allCurrentRuleNames.length; i++) {
        for (let j = 0; j < InfoRules.length; j++) {
          if (allCurrentRuleNames[i] === InfoRules[j].name) {
            arrayCurrentRulesData.push(InfoRules[j]);
          }
        }
      }
      // On va maintenant créer le popover tout en organisant ses données. A l'aide de cette fonction :
      // makeOneButtonRule(num, Rule, RulePopoverClassName, organizedUtilization)
      for (let i = 0; i < Number(arrayCurrentRulesData.length); i++) {
        let organizedUtilization = [],
          classNameRulePopover = this.renderRuleClassName(
            arrayCurrentRulesData[i].name,
            arrayCurrentRulesData[i].available
          ),
          currentRuleRendered = "";
        for (
          let j = 0;
          j < arrayCurrentRulesData[i].arrayUtilization.length;
          j++
        ) {
          organizedUtilization.push(
            <ol key={j}>{arrayCurrentRulesData[i].arrayUtilization[j]}</ol>
          );
        }

        if (arrayCurrentRulesData[i].ruleType === "basic") {
          classNameRulePopover += " singleRule fatRule";

          if (arrayCurrentRulesData[i].name === "rep") {
            classNameRulePopover = "singleRule fatRule unclickableRule";
          }
        } else if (allCurrentRuleNames[i] === "hyp") {
          classNameRulePopover = "singleRule fatRule " + classNameRulePopover;
        } else if (
          allCurrentRuleNames[i].length === 2 ||
          allCurrentRuleNames[i] === "~~e"
        ) {
          if (allCurrentRuleNames[i] === "~~e") {
            classNameRulePopover += " negationElimination";
          }
          classNameRulePopover = "singleRule tinyRule " + classNameRulePopover;
        } else if (Number(allCurrentRuleNames[i].length) > 2) {
          // sauf l'hypothèse
          classNameRulePopover =
            "singleRule fatRule " +
            this.renderRuleClassName(
              arrayCurrentRulesData[i].name,
              arrayCurrentRulesData[i].available
            );
        }
        currentRuleRendered = this.makeOneButtonRule(
          i, // nombre de la règle
          arrayCurrentRulesData[i], // tout le contenu de la règle
          classNameRulePopover, // className de la règle
          organizedUtilization
        );

        //  if (
        //   Number(allCurrentRuleNames[i].length) === 2 ||
        //   allCurrentRuleNames[i] === "~~e"
        // ) {
        //   let currentRuleName = arrayCurrentRulesData[i].name;
        if (arrayCurrentRulesData[i].ruleType === "basic") {
          allBasicRulesRendered.push(currentRuleRendered);
        } else if (arrayCurrentRulesData[i].ruleType === "hypothetical") {
          allHypotheticalRulesRendered.push(currentRuleRendered);
        } else if (
          arrayCurrentRulesData[i].ruleType === "conjonction" ||
          arrayCurrentRulesData[i].ruleType === "disjonction"
        ) {
          allConjonctionRulesRendered.push(currentRuleRendered);
          // } else if (arrayCurrentRulesData[i].ruleType === "disjonction") {
          //   allDisjonctionRulesRendered.push(currentRuleRendered);
        } else if (arrayCurrentRulesData[i].ruleType === "other") {
          allOtherRulesRendered.push(currentRuleRendered);
        }
      }
    }

    // pour finir, on retourne tous les boutons relatifs aux règles
    return (
      <ul className="globalSetOfRules">
        {this.makeTypeRule("basic", allBasicRulesRendered)}
        {this.makeTypeRule("hypothetical", allHypotheticalRulesRendered)}
        {this.makeTypeRule("conjonction", allConjonctionRulesRendered)}
        {/* {this.makeTypeRule("disjonction", allDisjonctionRulesRendered)} */}
        {this.makeTypeRule("other", allOtherRulesRendered)}
        {this.renderModal(this.props.valueInference.ruleModalContent)}
      </ul>
    );
  }
}

export default ButtonRuleMaker;
