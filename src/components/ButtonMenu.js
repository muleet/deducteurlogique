import React, { Component } from "react";

class ButtonMenu extends Component {
  render() {
    return (
      <div className={"button-menu " + this.props.className} id={this.props.id}>
        {this.props.name}
      </div>
    );
  }
}

export default ButtonMenu;
