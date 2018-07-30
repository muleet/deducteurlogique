import Popover from "react-simple-popover";
import React, { Component } from "react";

class PopoverDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleMouseEnter(e) {
    this.setState({ open: !this.state.open });
  }

  handleClose(e) {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <div
          href="#"
          className={"my-popover-button " + this.props.myPopoverClassName}
          ref="target"
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onExiting={this.handleClose.bind(this)}
        >
          {this.props.name}
          <div className="my-popover">{this.props.content}</div>
        </div>
      </div>
    );
  }
}

export default PopoverDemo;
