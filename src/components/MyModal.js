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
          {/* on affiche d'abord l'instruction décrivant ce que doit fthisaire l'utilisateur pour se servir de cette règle */}
          <p className="my-modal-instruction-rule">{this.props.instruction}</p>
          <p>{"" + this.props.valueSent.canInferenceBeStored}</p>
          {/* puis on affiche les inférences stockées, celles qui permettront de vérifier si la règle est bien utilisée */}
          <p>{this.props.valueSent.storedInference}</p>
          {/* puis on affiche le contenu du modal */}
          <p>{this.props.modalContent}</p>
          {/* enfin, on affiche le bouton qui ferme le modal si l'utilisateur ne veut finalement pas utiliser cette règle */}
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
