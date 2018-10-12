import React, { Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
// import React, { createContext, Component, Fragment } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "../Context/RuleProvider";
import ShowExpectedArguments from "./Components/ShowExpectedArguments";
import ShowModalButtons from "./Components/ShowModalButtons";
// import ReactDOM from "react-dom";

// export const RuleModalContext = createContext();

// ReactModal.setAppElement("#main");
class RuleModalProvider extends Component {
  // dans les props de cette classe il y a "valueInference"
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.props.valueInference.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.props.valueInference.setRuleModal(false);
    this.props.valueInference.setChoiceContent("");
  }

  showExpectedArguments(expectedArguments, ruleName, valueRule) {
    return (
      <ShowExpectedArguments
        valueInference={this.props.valueInference}
        ruleName={ruleName}
        expectedArguments={expectedArguments}
        valueRule={valueRule}
      />
    );
  }

  showModalButtons(expectedArguments, ruleName, valueRule) {
    return (
      <ShowModalButtons
        valueInference={this.props.valueInference}
        ruleName={ruleName}
        expectedArguments={expectedArguments}
        valueRule={valueRule}
        handleCloseModal={this.handleCloseModal}
      />
    );
  }

  render() {
    let keyboard = "";
    if (this.props.ruleName === "") {
      keyboard = (
        <ul className="typable-text">
          {this.props.valueInference.futureInference}
          <p className="blinking">_</p>
        </ul>
      );
    }
    return (
      <RuleProvider
        valueInference={this.props.valueInference}
        // Deducer reçoit le value d'InferenceProvider puis l'envoie à ButtonRuleMaker, qui l'envoie à RuleModal, qui l'envoie à RuleProvider
      >
        <RuleContext.Consumer>
          {value => (
            <Fragment>
              <div>
                <ReactModal
                  // isOpen={this.state.showModal}
                  isOpen={this.props.valueInference.ruleModalShown.normal}
                  contentLabel="onRequestClose Example"
                  // onAfterOpen={handleAfterOpenFunc}
                  onRequestClose={this.handleCloseModal}
                  portalClassName="rule-modal-portal"
                  overlayClassName="rule-modal-overlay"
                  className={
                    "rule-modal fade " +
                    this.props.valueInference.ruleModalClassName
                  }
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
                        this.props.ruleName,
                        value
                      )}
                      {keyboard}
                      {this.props.valueInference.ruleModalChoiceContent}
                      {/* cette variable, ruleModalChoiceContent, est vide la plupart du temps */}
                    </ul>
                    <div className="rule-modal-all-buttons">
                      {this.showModalButtons(
                        this.props.expectedArguments,
                        this.props.ruleName,
                        value
                      )}
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
export default RuleModalProvider;
