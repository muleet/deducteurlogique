import React, { Component } from "react";
import "../css/buttonMenu.css";

class ButtonMenu extends Component {
  render() {
    return (
      <div>
        <div
          className={"button-menu " + this.props.className}
          id={this.props.id}
          // onClick={this.props.link} // commenté puisque ça fonctionne mal je crois)
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default ButtonMenu;
