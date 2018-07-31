import React, { Component } from "react";

class MyPopover extends Component {
  render() {
    return (
      <div className={"my-popover-button " + this.props.myPopoverClassName}>
        {this.props.name}
        <ul className="my-popover">
          <li className="my-popover-desc">{this.props.Description}</li>
          <li className="my-popover-array">{this.props.HowToUse}</li>
        </ul>
      </div>
    );
  }
}

export default MyPopover;
