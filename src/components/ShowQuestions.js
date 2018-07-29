import React, { Component, Fragment } from "react";
import QuestionsContent from "../data/QuestionsContent";

class ShowQuestions extends Component {
  state = {
    arrayQuestionsState: []
  };

  renderInformations() {
    let arrayQuestions = [];
    for (let i = 0; i < QuestionsContent.length; i++) {
      arrayQuestions.push(
        <Fragment>
          <li>{QuestionsContent[1].name}</li>
          <li>{QuestionsContent[1].answer}</li>
        </Fragment>
      );
    }

    this.setState({ arrayQuestionsState: arrayQuestions });
  }

  render() {
    return <ul>{this.state.arrayQuestionsState}</ul>;
  }
}

export default ShowQuestions;
