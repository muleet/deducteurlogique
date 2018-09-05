import React, { Component } from "react";

class RulePopover extends Component {
  longDescription = () => {
    if (this.props.Description.length > 200) {
      return "rule-popover-longDescription";
    }
  };

  render() {
    return (
      <div className={"rule-popover-button " + this.props.RulePopoverClassName}>
        {this.props.ruleName}
        <div className="rule-popover">
          <div className="rule-popover-rulename">{this.props.verbalName}</div>
          <ul className="rule-popover-content">
            <li
              className={"rule-popover-description " + this.longDescription()}
            >
              {this.props.Description}
            </li>
            <li className="rule-popover-array">{this.props.HowToUse}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RulePopover;
