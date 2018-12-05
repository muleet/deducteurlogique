import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "../Context/RuleProvider";
// import ReactDOM from "react-dom";

// ReactModal.setAppElement("#main");
class RuleModal extends Component {
  constructor() {
    super();
    this.state = {
      futureHypothesis: ""
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.props.valueInference.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.props.valueInference.setRuleModal(false);
    this.resetHypothesis();
  }

  addToFutureHypothesis = newChar => {
    let copyFutureHypothesis = this.state.futureHypothesis;
    copyFutureHypothesis += newChar;
    this.setState({ futureHypothesis: copyFutureHypothesis });
  };

  showCharacters = value => {
    let everyPossibleCharacter = [
      ["~", "∧", "∨", "⊻", "⊃", "⊅", "≡", "↑", "↓"],
      ["p", "q", "r", "s"],
      ["(", ")"]
    ];
    let interfaceToMakeAnHypothesis = [];
    for (let i = 0; i < everyPossibleCharacter.length; i++) {
      let subInterface = [];
      for (let j = 0; j < everyPossibleCharacter[i].length; j++) {
        subInterface.push(
          <li
            key={subInterface.length}
            className="rule-modal-hypothesis-button-character selectable"
            onClick={() => {
              this.addToFutureHypothesis(everyPossibleCharacter[i][j]);
            }}
          >
            {everyPossibleCharacter[i][j]}
          </li>
        );
      }
      interfaceToMakeAnHypothesis.push(
        <ul key={interfaceToMakeAnHypothesis.length}>{subInterface}</ul>
      );
    }

    return (
      <div className="rule-modal-all-button-hypothesis">
        {interfaceToMakeAnHypothesis}
      </div>
    );
  };

  makeHypothesis = (valueRuleContext, hypothesisItself) => {
    if (2 === 1 + 1) {
      // il faudrait des conditions pour vérifier que l'utilisateur n'a pas rentré n'importe quoi
      // if (hypothesisItself[0] === /p/g) {
      // if (hypothesisItself[0] === /∧∨⊃⊂≡/) {
      const inferenceToAdd = {
        itself: hypothesisItself,
        numberCommentary: "",
        commentary: "hyp"
      };
      this.props.valueInference.setAdvice(
        "Hypothèse créée : " + inferenceToAdd.itself,
        "rule-advice"
      );
      valueRuleContext.addInferenceFromRule(
        inferenceToAdd,
        "nouvelle hypothèse"
      );
      // pour être créée, l'hypothèse part d'ici, puis va à addInferenceFromRule de RuleProvider, puis va à addInference de InferenceProvider
      this.handleCloseModal();
    } else {
      this.props.valueInference.setAdvice(
        "Hypothèse non cohérente",
        "error-advice"
      );
    }
  };

  removeLastCharacter = () => {
    let copyFutureHypothesis = [...this.state.futureHypothesis];
    copyFutureHypothesis = copyFutureHypothesis.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
    copyFutureHypothesis = copyFutureHypothesis.join("");
    this.setState(state => ({
      futureHypothesis: copyFutureHypothesis
    }));
  };

  resetHypothesis = () => {
    const empty = [];
    this.setState(state => ({
      futureHypothesis: empty
    }));
  };

  render() {
    return (
      <RuleProvider
        valueInference={this.props.valueInference}
        // Deducer reçoit le value de InferenceProvider puis l'envoie à ButtonRuleMaker, qui l'envoie à RuleHypothesisModal, qui l'envoie à RuleProvider
      >
        <RuleContext.Consumer>
          {value => (
            <Fragment>
              <div>
                <ReactModal
                  isOpen={this.props.valueInference.ruleModalShown.normal}
                  contentLabel="onRequestClose Example"
                  // onAfterOpen={handleAfterOpenFunc}
                  onRequestClose={this.handleCloseModal}
                  portalClassName="rule-modal-portal"
                  overlayClassName="rule-modal-overlay"
                  className={
                    "rule-modal-hypothesis fade " +
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
                    <ul className="typable-text">
                      {this.state.futureHypothesis}
                      <p className="blinking">_</p>
                    </ul>
                    {this.showCharacters(value)}
                    {/* {this.props.valueInference.ruleModalChoiceContent} */}
                    <div className="rule-modal-all-buttons">
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          this.removeLastCharacter(
                            value,
                            this.state.futureHypothesis
                          );
                        }}
                      >
                        <i className="fas fa-long-arrow-alt-left icon" />
                      </p>
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          if (this.state.futureHypothesis.length > 0)
                            this.makeHypothesis(
                              value,
                              this.state.futureHypothesis
                            );
                        }}
                      >
                        <i className="fas fa-check-square" />
                      </p>
                      <p
                        className="rule-modal-button"
                        onClick={() => {
                          this.resetHypothesis();
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
