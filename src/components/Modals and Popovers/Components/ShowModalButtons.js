import React, { Component, Fragment } from "react";

class ShowModalButtons extends Component {
  render() {
    let arrayModalButton;
    return (
      <Fragment>
        <p
          className="rule-modal-button"
          onClick={() => {
            this.verifyRule(this.props.valueRule);
          }}
        >
          <i className="fas fa-check-square" />
        </p>
        <p
          className="rule-modal-button"
          onClick={() => {
            this.props.valueInference.changeStorageBoolean("erase");
          }}
        >
          <i className="fas fa-eraser" />
        </p>
        <p className="rule-modal-button" onClick={this.handleCloseModal}>
          <i className="fas fa-times-circle" />
        </p>
      </Fragment>
    );
  }
}

export default ShowModalButtons;
