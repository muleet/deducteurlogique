import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "./Context/RuleProvider";
// import ReactDOM from "react-dom";

// ReactModal.setAppElement("#main");
class MyModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    if (this.state.showModal === false) {
      this.props.valueSent.changeStorageBoolean(); // il est possible de pusher dans storedInference
      this.setState({ showModal: true });
    } else {
      // si le modal était déjà affiché, on le referme en cliquant sur le même bouton
      this.handleCloseModal();
    }
  }

  handleCloseModal() {
    this.props.valueSent.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference + storedInference est vidé
    this.setState({ showModal: false });
  }

  verifyRule(valueRuleContext) {
    console.log("verifyRule");
    if (this.props.valueSent.storedInference[1] !== undefined) {
      valueRuleContext.conditionalElimination(
        this.props.valueSent.storedInference[0],
        this.props.valueSent.storedInference[1]
      );
    }
    // if (result !== "error" || result !== "") {
    //   return (
    //     <InferenceProvider>
    //       <InferenceContext.Consumer>
    //         {value => {
    //           const inference = {
    //             itself: result,
    //             numberCommentary: "num",
    //             commentary: "⊃e"
    //           };
    //           // Puis on envoie utilise cet objet comme argument de la fonction contextuelle addInference, qui provient d'InferenceProvider
    //           value.addInference(inference);
    //           console.log(value.allInferences);
    //         }}
    //       </InferenceContext.Consumer>
    //     </InferenceProvider>
    //   );
    // } else {
    //   console.log("erreur dans la vérification de la règle");
    // }
  }

  render() {
    return (
      <RuleProvider>
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
                  portalClassName="my-modal-portal"
                  overlayClassName="my-modal-overlay"
                  className="my-modal"
                  shouldFocusAfterRender={true}
                  shouldCloseOnOverlayClick={false}
                  shouldCloseOnEsc={true}
                  shouldReturnFocusAfterClose={true}
                  ariaHideApp={false}
                >
                  <section className="my-modal-window">
                    <p className="my-modal-ruleName">{this.props.ruleName}</p>
                    <p className="my-modal-ruleInstruction">
                      {this.props.instruction}
                    </p>
                    <ul className="my-modal-all-arguments">
                      <li className="my-modal-single-argument">
                        <p>A : </p>
                        {this.props.valueSent.storedInferenceRendered[0]}
                      </li>
                      <li className="my-modal-single-argument">
                        <p>A⊃B : </p>
                        {this.props.valueSent.storedInferenceRendered[1]}
                      </li>
                    </ul>
                    <div className="my-modal-all-buttons">
                      <p
                        className="my-modal-button"
                        onClick={() => {
                          this.verifyRule(value);
                        }}
                      >
                        <i className="fas fa-check-square" />
                      </p>
                      <p
                        className="my-modal-button"
                        onClick={() => {
                          this.props.valueSent.changeStorageBoolean("redo");
                        }}
                      >
                        <i className="fas fa-eraser" />
                      </p>
                      <p
                        className="my-modal-button"
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

// ReactDOM.render(<MyModal {...props} />, document.getElementById("main"));
export default MyModal;
