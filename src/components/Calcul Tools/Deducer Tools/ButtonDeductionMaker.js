import React, { Component } from "react";

// section dédiée au bouton qui permet d'activer ou désactiver le debugger

// section dédiée au bouton qui permet d'activer ou désactiver la détection des inférences compatibles avec la règle en cours

class ButtonDeductionMaker extends Component {
  render() {
    // section 1 : la détection des inférences compatibles
    let eyeOfCompatibleInferencesClassName = "icon question-mark-button ",
      textOfTheEye = (
        <div className="question-mark">
          <div className="question-mark-content">
            Cliquez pour activer/désactiver la détection automatique des
            inférences compatibles avec la règle en cours.
          </div>
        </div>
      );
    if (
      !this.props.valueInference.booleansOptionsAboutInferences
        .boolInferenceScanner
    ) {
      eyeOfCompatibleInferencesClassName += "fas fa-eye-slash ";
    } else if (
      this.props.valueInference.booleansOptionsAboutInferences
        .boolInferenceScanner
    ) {
      eyeOfCompatibleInferencesClassName += "fas fa-eye ";
    }
    let eyeOfCompatibleInferences = (
      <i
        key="1"
        className={eyeOfCompatibleInferencesClassName}
        onClick={() => {
          this.props.valueInference.toggleOptionsAboutInferences(
            "InferenceScanner"
          );
        }}
      >
        {textOfTheEye}
      </i>
    );

    // section 2 : sauter automatiquement la dernière étape de validation lorsque 2 arguments compatibles sont entrés (sauf pour les règles à choix)
    let finalCheckClassName = " icon question-mark-button ",
      textOfTheCheck = (
        <div className="question-mark">
          <div className="question-mark-content">
            Cliquez pour activer/désactiver la tentative automatique de
            validation d'une règle au moment tous ses arguments ont été rentrés.
          </div>
        </div>
      );
    if (
      this.props.valueInference.booleansOptionsAboutInferences.boolFinalCheck
    ) {
      finalCheckClassName += "fas fa-check";
    } else if (
      !this.props.valueInference.booleansOptionsAboutInferences.boolFinalCheck
    ) {
      finalCheckClassName += "fas fa-check-double";
    }

    let finalCheck = (
      <i
        key="2"
        className={finalCheckClassName}
        onClick={() =>
          this.props.valueInference.toggleOptionsAboutInferences("finalCheck")
        }
      >
        {textOfTheCheck}
      </i>
    );

    // section 3 : activer/désactiver le debugger
    let cameraOfTheDebuggerClassName = "hidden icon question-mark-button ",
      textOfTheCamera = (
        <div className="question-mark">
          <div className="question-mark-content">
            Cliquez pour activer/désactiver l'outil de détection des bugs.
          </div>
        </div>
      );

    if (
      !this.props.valueInference.booleansOptionsAboutInferences.boolDebugger
    ) {
      cameraOfTheDebuggerClassName += "fas fa-video-slash";
    } else if (
      this.props.valueInference.booleansOptionsAboutInferences.boolDebugger
    ) {
      cameraOfTheDebuggerClassName += "fas fa-video ";
    }
    let cameraOfTheDebugger = (
      <i
        key="3"
        className={cameraOfTheDebuggerClassName}
        onClick={() => {
          this.props.valueInference.toggleOptionsAboutInferences("Debugger");
        }}
      >
        {textOfTheCamera}
      </i>
    );

    // section 4 : autres boutons
    let buttonRemoveLastInference = (
        <i
          className="fas fa-long-arrow-alt-left icon"
          onClick={() => {
            this.props.valueInference.removeLastInference();
          }}
          onMouseOver={() => {
            this.props.valueInference.modifyClassNameOfAnyInference(
              "removable",
              "last"
            );
          }}
          onMouseOut={() => {
            this.props.valueInference.modifyClassNameOfAnyInference(
              "unremovable",
              "last"
            );
          }}
        />
      ),
      buttonEraseAllInferences = (
        <i
          className="fas fa-eraser icon"
          onClick={() => {
            this.props.valueInference.resetDeduction();
          }}
          onMouseOver={() => {
            this.props.valueInference.modifyClassNameOfAnyInference(
              "removable",
              "all"
            );
          }}
          onMouseOut={() => {
            this.props.valueInference.modifyClassNameOfAnyInference(
              "unremovable",
              "all"
            );
          }}
        />
      );

    return (
      <div className="all-set-buttons-about-inferences">
        {/* <li className="set-buttons-about-inferences"> */}
        {eyeOfCompatibleInferences}
        {finalCheck}
        {cameraOfTheDebugger}
        {/* </li> */}
        {/* <li className="set-buttons-about-inferences"> */}
        {buttonRemoveLastInference}
        {buttonEraseAllInferences}
        {/* </li> */}
      </div>
    );
  }
}
export default ButtonDeductionMaker;
