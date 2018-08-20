import React, { Component } from "react";
import MyModal from "./MyModal";
class MyPopover extends Component {
  longDescription = () => {
    if (this.props.Description.length > 200) {
      return "my-popover-longDescription";
    }
  };

  render() {
    return (
      <div className={"my-popover-button " + this.props.myPopoverClassName}>
        {this.props.name}
        <div className="my-popover">
          <div className="my-popover-rulename">{this.props.verbalName}</div>
          <ul className="my-popover-content">
            <li className={"my-popover-description " + this.longDescription()}>
              {this.props.Description}
            </li>
            <li className="my-popover-array">{this.props.HowToUse}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MyPopover;
