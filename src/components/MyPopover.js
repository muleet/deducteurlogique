import React, { Component } from "react";

class MyPopover extends Component {
  render() {
    return (
      <div className={"my-popover-button " + this.props.myPopoverClassName}>
        {this.props.name}
        <div className="my-popover">
          {this.props.verbalName}
          <ul className="my-popover-content">
            <li className="my-popover-desc">{this.props.Description}</li>
            <li className="my-popover-array">{this.props.HowToUse}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MyPopover;
