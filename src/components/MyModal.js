import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "./Calcul Tools/RuleProvider";
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

  verifyRule(value) {
    if (this.props.valueSent.storedInference[1] !== undefined) {
      console.log("verifyRule");
      <Fragment>
        {value.conditionalElimination(
          this.props.valueSent.storedInference[0],
          this.props.valueSent.storedInference[1]
        )}
        {console.log("state", value.machin)}
      </Fragment>;
    }
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
                  bodyOpenClassName="my-modal-Body--open"
                  htmlOpenClassName="my-modal-Html--open"
                  // portalClassName="A"
                  // overlayClassName="B"
                  // className="C"
                  // bodyOpenClassName="D"
                  // htmlOpenClassName="E"
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
                        {this.props.valueSent.storedInference[0]}
                      </li>
                      <li className="my-modal-single-argument">
                        <p>A⊃B : </p>
                        {this.props.valueSent.storedInference[1]}
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
