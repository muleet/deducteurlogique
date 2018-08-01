import React, { Component, Fragment } from "react";
import QuestionsAboutLogic from "../data/QuestionsAboutLogic";

class ShowQuestions extends Component {
  state = {
    arrayQuestionsState: []
  };

  renderInformations() {
    let arrayQuestions = [];
    for (let i = 0; i < QuestionsAboutLogic.length; i++) {
      arrayQuestions.push(
        <li className="question-answer-example-together">
          <p className="question-alone">{QuestionsAboutLogic[i].name}</p>
          <p className="answer-alone">{QuestionsAboutLogic[i].answer}</p>
          <p className="example-alone">{QuestionsAboutLogic[i].example}</p>
        </li>
      );
    }

    return arrayQuestions;
  }

  render() {
    return <ul className="set-of-questions">{this.renderInformations()}</ul>;
  }
}

export default ShowQuestions;
