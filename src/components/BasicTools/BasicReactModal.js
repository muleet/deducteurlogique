import React, { Component } from "react";
import ReactModal from "react-modal";

class BasicReactModal extends Component {
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
        <div onClick={this.handleOpenModal}>{this.props.buttonSent}</div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          {this.props.contentSent}
          {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
        </ReactModal>
      </div>
    );
  }
}

export default BasicReactModal;
