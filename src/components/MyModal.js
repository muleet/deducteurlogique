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
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          // onAfterOpen={handleAfterOpenFunc}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          // portalClassName="ReactModalPortal"
          // overlayClassName="ReactModal__Overlay"
          portalClassName="my-modal-portal"
          overlayClassName="my-modal-overlay"
          className="my-modal"
          shouldFocusAfterRender={true}
          shouldCloseOnEsc={true}
          shouldReturnFocusAfterClose={true}
        >
          <p>Modal text!</p>
          <button onClick={this.handleCloseModal}>Close Modal</button>{" "}
        </ReactModal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<MyModal {...props} />, document.getElementById("main"));
export default MyModal;
