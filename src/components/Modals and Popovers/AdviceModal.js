import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
// import ReactDOM from "react-dom";

class RuleModal extends Component {
  // dans les props de cette classe il y a "valueInference"

  render() {
    return (
      <Fragment>
        <div>
          <div />
          <ReactModal
            isOpen={true}
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
            // closeTimeoutMS={400}
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
