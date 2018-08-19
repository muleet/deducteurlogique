import React, { Component, Fragment } from "react";

class ShowInferencePossibleMeaning extends Component {
  howManyMeaning(props) {
    let meaningNumberLinks = [];
    if (props) {
      for (let i = 0; i < props; i++) {
        console.log("wesh");
        meaningNumberLinks.push(<li key={i}>{Number([i]) + 1}</li>);
      }
    }
    return meaningNumberLinks;
  }

  whichMeaning(num) {}

  render() {
    const meanings = this.props.exerciseSent.meaning;
    let possibleMeaning = [[], [], [], [], [], [], [], [], [], [], [], [], []];
    let meaningNumber;
    let meaningChosen = 0;
    if (!(meanings[0] === undefined)) {
      for (let i = 0; i < meanings.length; i++) {
        if (typeof meanings[i] == "string") {
          possibleMeaning[0].push(<li key={i}>{meanings[i]}</li>);
        } else if (typeof meanings[i] == "object") {
          meaningNumber = meanings[i].length;
          for (let j = 0; j < meanings[i].length; j++) {
            possibleMeaning[i].push(<li key={j}>{meanings[i][j]}</li>);
          }
        }
      }
    }
    return (
      <div style={{ display: "flex" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 14,
            fontWeight: "bold",
            marginRight: "5px",
            lineHeight: "16px"
          }}
          onClick={this.whichMeaning()}
        >
          {this.howManyMeaning(meaningNumber)}
        </ul>
        <ul className="possible-meaning">{possibleMeaning[meaningChosen]}</ul>
      </div>
    );
  }
}

export default ShowInferencePossibleMeaning;
