import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
// import ReactDOM from "react-dom";

class RuleModal extends Component {
  // dans les props de cette classe il y a "valueInference"
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
      this.setState({
        showModal: true
      });
    } else {
      // si le modal était déjà affiché, on le referme en cliquant sur le même bouton
      this.handleCloseModal();
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    if (!this.state.showModal) {
      this.handleOpenModal();
      setTimeout(() => {
        this.handleCloseModal();
      }, 6000);
    }
    return (
      <Fragment>
        <div>
          <div onClick={this.handleOpenModal} />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            // onAfterOpen={handleAfterOpenFunc}
            onRequestClose={this.handleCloseModal}
            portalClassName="advice-modal-portal"
            overlayClassName="advice-modal-overlay"
            className={"advice-modal fade " + this.props.adviceClassName}
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            closeTimeoutMS={400}
          >
            <section className="rule-modal-window">
              {this.props.advice}
              {/* this.props.advice est la variable pour laquelle ce modal existe */}
              <div className="rule-modal-all-buttons">
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
    );
  }
}

// const props = {};

// ReactDOM.render(<RuleModal {...props} />, document.getElementById("main"));
export default RuleModal;
