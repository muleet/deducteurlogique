import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "../Context/RuleProvider";
import ShowExpectedArguments from "./Components/ShowExpectedArguments";
// import ShowModalButtons from "./Components/ShowModalButtons";
// import ReactDOM from "react-dom";

// ReactModal.setAppElement("#main");
class RuleModal extends Component {
  // dans les props de cette classe il y a "valueInference"
  constructor() {
    super();
    this.state = {
      showModal: false,
      modalClassName: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    if (this.state.showModal === false) {
      this.props.valueInference.changeStorageBoolean(); // il est possible de pusher dans storedInference
      this.setState({
        showModal: true,
        modalClassName: ""
      });
    } else {
      // si le modal était déjà affiché, on le referme en cliquant sur le même bouton
      this.handleCloseModal();
    }
  }

  handleCloseModal() {
    this.props.valueInference.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.setState({ showModal: false });
  }

  showExpectedArguments(expectedArguments, ruleName) {
    return (
      <ShowExpectedArguments
        valueInference={this.props.valueInference}
        ruleName={ruleName}
        expectedArguments={expectedArguments}
      />
    );
  }

  // ShowModalButtons(valueRule, valueInference) {}

  verifyRule(valueRule) {
    // "RuleModal", puis "ShowExpectedArguments", puis "VerifyRule", puis "redirectToTheRightRule", puis "[la règle en question]", puis "addInference"
    // puis dans le cas des hypothèses, changeHypothesisLevel, puis updateHypotheticalInferencesThemselves puis RIEN (pas d'updateInferencesOfCurrentHypotheses)
    console.log("verifyRule, pour la règle ", this.props.ruleName);

    if (
      this.props.valueInference.storedInference !== undefined &&
      this.props.expectedArguments.length ===
        this.props.valueInference.storedInference.length
    ) {
      valueRule.redirectToTheRightRule(
        this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
        this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
        this.props.valueInference.storedNumbers // storedNumbers contient (en str) les numéros des inférences citées juste avant.
      );
      this.setState({ modalClassName: "rule-modal-ended-well modal-ending" });
      // this.handleCloseModal();
    } else {
      this.props.valueInference.setAdvice(
        "Tous les arguments n'étaient pas entrés",
        "error-advice"
      );
      this.setState({ modalClassName: "rule-modal-ended-badly modal-ending" });
    }
  }

  verifySpecificRule(valueRule) {
    console.log("verifySpecificRule", this.props.ruleName);
    if (this.props.valueInference.hypothesisCurrentLevelAndId.level !== 0) {
      if (
        this.props.valueInference.storedInference !== undefined &&
        this.props.expectedArguments.length - 1 === // on fait -1 puisque l'hypothèse n'est pas comptée à ce moment
          this.props.valueInference.storedInference.length
      ) {
        valueRule.redirectToTheRightRule(
          this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les arguments ci-dessous.
          this.props.valueInference.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
          this.props.valueInference.storedNumbers // storedNumbers contient (en str) les numéros des inférences citées juste avant.
        );
        this.setState({ modalClassName: "rule-modal-ended-well modal-ending" });
        // this.handleCloseModal();
      } else {
        this.props.valueInference.setAdvice(
          "Entrez tous les arguments avant de valider",
          "error-advice"
        );
        this.setState({
          modalClassName: "rule-modal-ended-badly modal-ending"
        });
      }
    } else {
      this.props.valueInference.setAdvice(
        "Créez d'abord une hypothèse avant de valider",
        "error-advice"
      );
    }
  }

  render() {
    return (
      <RuleProvider
        valueInference={this.props.valueInference}
        // Deducer reçoit le value d'InferenceProvider puis l'envoie à ButtonRuleMaker, qui l'envoie à RuleModal, qui l'envoie à RuleProvider
      >
        <RuleContext.Consumer>
          {value => (
            <Fragment>
              <div>
                <div onClick={this.handleOpenModal}>
                  {this.props.modalButton}
                </div>
                <ReactModal
                  isOpen={this.state.showModal}
                  contentLabel="onRequestClose Example"
                  // onAfterOpen={handleAfterOpenFunc}
                  onRequestClose={this.handleCloseModal}
                  portalClassName="rule-modal-portal"
                  overlayClassName="rule-modal-overlay"
                  className={"rule-modal fade " + this.state.modalClassName}
                  shouldFocusAfterRender={true}
                  shouldCloseOnOverlayClick={false}
                  shouldCloseOnEsc={true}
                  shouldReturnFocusAfterClose={true}
                  ariaHideApp={false}
                  closeTimeoutMS={400}
                >
                  <section className="rule-modal-window">
                    <p className="rule-modal-ruleName">{this.props.ruleName}</p>
                    <p className="rule-modal-ruleInstruction">
                      {this.props.instruction}
                    </p>
                    <ul className="rule-modal-all-arguments">
                      {this.showExpectedArguments(
                        this.props.expectedArguments,
                        this.props.ruleName
                      )}
                      {value.choiceContent}
                      {/* cette variable, valueRule.choice, est vide la plupart du temps */}
                    </ul>
                    <div className="rule-modal-all-buttons">
                      {/* {this.ShowModalButtons(value, this.props.valueInference)} */}
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          if (
                            this.props.ruleName !== "⊃i" &&
                            this.props.ruleName !== "~i"
                          ) {
                            this.verifyRule(value);
                          } else {
                            this.verifySpecificRule(value);
                          }
                        }}
                      >
                        <i className="fas fa-check-square" />
                      </p>
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          this.props.valueInference.changeStorageBoolean(
                            "erase"
                          );
                        }}
                      >
                        <i className="fas fa-eraser" />
                      </p>
                      <p
                        className="rule-modal-button"
                        onClick={this.handleCloseModal}
                      >
                        <i className="fas fa-times-circle" />
                      </p>
                    </div>
                  </section>
                </ReactModal>
              </div>
            </Fragment>
          )}
        </RuleContext.Consumer>
      </RuleProvider>
    );
  }
}

// const props = {};

// ReactDOM.render(<RuleModal {...props} />, document.getElementById("main"));
export default RuleModal;
