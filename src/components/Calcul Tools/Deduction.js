import React, { Component, Fragment } from "react";

class Deduction extends Component {
  render() {
    return (
      <Fragment>
        <ul className="deduction">
          <div className="inferenceGlobal">
            <div className="inferenceNumber">
              {"exemple de numéro d'inférence"}
            </div>
            <div className="inferenceItself">{"exemple d'inférence"}</div>
            <div className="inferenceCommentary">
              {"exemple de commentaire d'inférence"}
            </div>
          </div>
        </ul>
      </Fragment>
    );
  }
}

export default Deduction;
