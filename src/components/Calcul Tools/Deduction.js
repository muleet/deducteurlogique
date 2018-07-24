import React, { Component, Fragment } from "react";

// Cette Classe n'est plus jamais utilisée nulle part il me semble. Je la laisse pour le moment avant de la supprimer.

class Deduction extends Component {
  render() {
    return (
      <Fragment>
        <ul className="deduction">{this.props.arrayUpdated}</ul>
      </Fragment>
    );
  }
}

export default Deduction;
