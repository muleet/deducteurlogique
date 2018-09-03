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
      modalClassName: "",
      futureHypothesis: ""
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    if (this.state.showModal === false) {
      // this.props.valueInference.changeStorageBoolean(); // il est possible de pusher dans storedInference
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
    this.setState({ showModal: false });
    this.resetHypothesis();
  }

  addToFutureHypothesis = newChar => {
    let copyFutureHypothesis = this.state.futureHypothesis;
    copyFutureHypothesis += newChar;
    this.setState({ futureHypothesis: copyFutureHypothesis });
  };

  showCharacters = value => {
    // let arrayPropositionalSymbol = ["~", "∧","∨","⊻","⊃","≡", "↓", "→", "↔"] // je mets de côté la totalité des symboles de calcul des propositions pour le moment
    let everyPossibleCharacter = [
      ["~", "∧", "∨", "⊃"],
      ["p", "q", "r"],
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
    console.log("y'a un problème dans makeHypothesis non ?");
    const inferenceToAdd = {
      itself: hypothesisItself,
      numberCommentary: "",
      commentary: "hyp"
    };
    valueRuleContext.addInferenceFromRule(inferenceToAdd, "nouvelle hypothèse");
    // pour être créée, l'hypothèse part d'ici, puis va à addInferenceFromRule de RuleProvider, puis va à addInference de InferenceProvider
    this.handleCloseModal();
  };

  removeLastCharacter = () => {
    let copyFutureHypothesis = [...this.state.futureHypothesis];
    copyFutureHypothesis = copyFutureHypothesis.slice(0, -1); // on extrait une partie du tableau, la première en partant de la fin (d'où le "-1")
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
                  className={
                    "rule-modal-hypothesis fade " + this.state.modalClassName
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
                    <ul className="possible-hypothesis-itself">
                      {this.state.futureHypothesis}
                      <p className="blinking">_</p>
                    </ul>
                    {this.showCharacters(value)}
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
