import React from "react";
import ReactModal from "react-modal";
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
    this.props.valueSent.changeStorageBoolean(); // il est possible de pusher dans storedInference
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.props.valueSent.changeStorageBoolean(); // il n'est plus possible de pusher dans storedInference
    this.setState({ showModal: false });
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
          shouldCloseOnOverlayClick={false}
          portalClassName="my-modal-portal"
          overlayClassName="my-modal-overlay"
          className="my-modal"
          shouldFocusAfterRender={true}
          shouldCloseOnEsc={true}
          shouldReturnFocusAfterClose={true}
        >
          <p className="my-modal-instruction-rule">{this.props.instruction}</p>
          <p>{"" + this.props.valueSent.canInferenceBeStored}</p>
          <ul className="my-modal-arguments">
            <li className="infNum-color">
              {"A. " + this.props.valueSent.storedInference[0]}
            </li>
            <li className="infItself-color">
              {"A⊃B. " + this.props.valueSent.storedInference[1]}
            </li>
          </ul>
          <p
            className={"my-modal-close-button"}
            onClick={this.handleCloseModal}
          >
            <i className="far fa-window-close" />
          </p>
        </ReactModal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<MyModal {...props} />, document.getElementById("main"));
export default MyModal;
