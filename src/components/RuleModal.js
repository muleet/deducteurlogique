import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "./Context/RuleProvider";
// import ReactDOM from "react-dom";

// ReactModal.setAppElement("#main");
class RuleModal extends Component {
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
      this.props.valueSent.changeStorageBoolean(); // il est possible de pusher dans storedInference
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
    this.props.valueSent.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.setState({ showModal: false });
  }

  showExpectedArguments(expectedArguments) {
    let arrayExpectedArguments = [];
    for (let i = 0; i < expectedArguments.length; i++) {
      arrayExpectedArguments.push(
        <li key={i} className="rule-modal-single-argument">
          <p>{expectedArguments[i] + " :"}</p>
          {this.props.valueSent.storedInferenceRendered[i]}
        </li>
      );
    }
    return arrayExpectedArguments;
  }

  verifyRule(valueRuleContext) {
    console.log("verifyRule, pour la règle ", this.props.ruleName);

    if (
      this.props.valueSent.storedInference !== undefined &&
      this.props.expectedArguments.length ===
        this.props.valueSent.storedInference.length
    ) {
      valueRuleContext.redirectToTheRightRule(
        this.props.ruleName, // argument qui permettra à redirectToTheRightRule de savoir où rediriger les autres arguments.
        this.props.valueSent.storedInference, // storedInference contient (en tableau) les inférences qui permettront de valider la règle (c'est tout le but du site).
        this.props.valueSent.storedNumbers // storedNumbers contient (en str) les numéros des inférences citées juste avant.
      );
      this.setState({ modalClassName: "rule-modal-ended-well modal-ending" });
    } else {
      this.setState({ modalClassName: "rule-modal-ended-badly modal-ending" });
    }
  }

  render() {
    return (
      <RuleProvider
        valueSent={this.props.valueSent}
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
                      {this.showExpectedArguments(this.props.expectedArguments)}
                      {value.choiceContent}
                      {/* cette variable, valueRuleContext.choice, est vide la plupart du temps */}
                    </ul>
                    <div className="rule-modal-all-buttons">
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          this.verifyRule(value);
                        }}
                      >
                        <i className="fas fa-check-square" />
                      </p>
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          this.props.valueSent.changeStorageBoolean("erase");
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
