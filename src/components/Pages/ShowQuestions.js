import React, { Component, Fragment } from "react";
import Questions from "../../data/Questions";

class ShowQuestions extends Component {
  renderQuestions() {
    let arrayQuestions = [];
    for (let i = 0; i < Questions.length; i++) {
      arrayQuestions.push(
        <Fragment key={i}>
          <li className="question-answer-example-together">
            <p className="question-alone">{Questions[i].name}</p>
            <p className="answer-alone">{Questions[i].answer}</p>
            <p className="example-alone">{Questions[i].example}</p>
          </li>
          <hr style={{ width: "10%", marginLeft: "40px" }} />
        </Fragment>
      );
    }

    return arrayQuestions;
  }

  render() {
    return (
      <main className="main-questions">
        <h2>Questions sur la logique</h2>
        <ul className="set-of-questions">{this.renderQuestions()}</ul>
      </main>
    );
  }
}

export default ShowQuestions;
