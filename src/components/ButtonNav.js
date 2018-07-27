import React, { Component } from "react";

class ButtonNav extends Component {
  render() {
    return (
      <div className={"nav-button " + this.props.className} id={this.props.id}>
        {this.props.name}
      </div>
    );
  }
}

export default ButtonNav;
