import React, { Component, Fragment } from "react";
import Rules from "../data/InfoRules";

class ShowInfoRules extends Component {
  state = {
    numberRule: "",
    arrayInfoRule: []
  };

  renderListRules() {
    let renderedListRules = [];
    for (let i = 0; i < Rules.length; i++) {
      let classNameToRender = "single-rule";
      renderedListRules.push(
        <li
          className={classNameToRender}
          // onMouseOver={() => {
          //   this.renderInfoRules(i);
          // }}
        >
          {Rules[i].name}
        </li>
      );
    }
    return renderedListRules;
  }

  // Fonction méga importante qui permet de créer une str pour chaque ensemble spécifique de données, d'une règle
  renderLiInformationRule = array => {
    // let arrayTemporary = [];
    // for (let i = 0; i < array.length; i++) {
    //   arrayTemporary.push(array[i]);
    // }
    // const strToReturn = arrayTemporary.join(", ");
    // return <li>{strToReturn}</li>;
  };

  renderInfoRule = numRule => {
    this.setState({
      numberRule: (
        <div
          style={{
            display: "flex",
            textAlign: "start",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          Rule {Number(Rules[numRule])}
        </div>
      )
    });

    // let DescriptionToRender = (
    //   <Fragment>
    //     {this.renderLiInformationRules * Rules[numRule].description}
    //   </Fragment>
    // );

    // Compilation de toutes les données en une seule variable, qui est l'état arrayInfoRule
    // this.setState({
    //   arrayInfoRule: (
    //     <Fragment>
    //       Description : <li>{DescriptionToRender}</li>
    //     </Fragment>
    //   )
    // });

    return <Fragment>{this.state.arrayInfoRule}</Fragment>;
  };

  render() {
    return (
      <main className="main-rules-info">
        <ul className="list-rules">{this.renderListRules()}</ul>
      </main>
    );
  }
}

export default ShowInfoRules;
