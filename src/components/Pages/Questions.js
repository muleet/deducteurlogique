import React, { Component, Fragment } from "react";
import QuestionsContent from "../../data/QuestionsContent";

class Questions extends Component {
  renderInformations() {}

  render() {
    return QuestionsContent[1].name;
  }
}

export default Questions;
