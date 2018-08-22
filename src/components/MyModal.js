import React from "react";
import ReactModal from "react-modal";
import RuleProvider, { RuleContext } from "./Calcul Tools/RuleProvider";
// import ReactDOM from "react-dom";

// ReactModal.setAppElement("#main");
class MyModal extends React.Component {
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

  verifyRule() {
    if (this.props.valueSent.storedInference[1] !== undefined) {
      <RuleContext.Consumer>
        {value =>
          value.state.conjonctionElimination(
            this.props.valueSent.storedInference[0],
            this.props.valueSent.storedInference[1]
          )
        }
      </RuleContext.Consumer>;
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.handleOpenModal}>{this.props.modalButton}</div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          // onAfterOpen={handleAfterOpenFunc}
          onRequestClose={this.handleCloseModal}
          portalClassName="my-modal-portal"
          overlayClassName="my-modal-overlay"
          className="my-modal"
          shouldFocusAfterRender={true}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          shouldReturnFocusAfterClose={true}
          ariaHideApp={false}
        >
          <section className="my-modal-window">
            <p className="my-modal-instruction-rule">
              {this.props.instruction}
            </p>
            <p>{"" + this.props.valueSent.canInferenceBeStored}</p>
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
                  this.verifyRule();
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
              <p className="my-modal-button" onClick={this.handleCloseModal}>
                <i className="fas fa-times-circle" />
              </p>
            </div>
          </section>
        </ReactModal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<MyModal {...props} />, document.getElementById("main"));
export default MyModal;
