import React, { Component } from "react";

class ButtonHeader extends Component {
  render() {
    return (
      <div
        className={"button-header " + this.props.className}
        id={this.props.id}
      >
        {this.props.name}
      </div>
    );
  }
}

export default ButtonHeader;
