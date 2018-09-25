import React, { Component, Fragment } from "react";
import QuestionsAboutLogic from "../../../data/QuestionsAboutLogic";

class ShowQuestions extends Component {
  renderQuestions() {
    let arrayQuestions = [];
    for (let i = 0; i < QuestionsAboutLogic.length; i++) {
      arrayQuestions.push(
        <Fragment key={i}>
          <li className="question-answer-example-together">
            <p className="question-alone">{QuestionsAboutLogic[i].name}</p>
            <p className="answer-alone">{QuestionsAboutLogic[i].answer}</p>
            <p className="example-alone">{QuestionsAboutLogic[i].example}</p>
          </li>
          <hr style={{ width: "10%", marginLeft: "40px" }} />
        </Fragment>
      );
    }

    return arrayQuestions;
  }

  render() {
    return <ul className="set-of-questions">{this.renderQuestions()}</ul>;
  }
}

export default ShowQuestions;
