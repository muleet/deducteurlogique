import React, { Component } from "react";
import LocutionsGrecques from "../../../data/LocutionsGrecques";
// import LocutionsLatines from "../../../data/LocutionsLatines";

class Locution extends Component {
  state = {
    languageChosen: ""
  };

  changeLanguage() {}

  render() {
    let singleLocutionRendered = [],
      allLocutionRendered = [];
    for (let i = 0; i < LocutionsGrecques.length; i++) {
      singleLocutionRendered.push([]);
    }
    for (let i = 0; i < LocutionsGrecques.length; i++) {
      allLocutionRendered.push(
        <div key={i} className="single-locution">
          <div className="single-line-locution greek-color">
            {LocutionsGrecques[i].grec}
          </div>
          <div className="single-line-locution">
            [{LocutionsGrecques[i].alphabetlatin}]
          </div>

          <div className="single-line-locution french-color">
            {LocutionsGrecques[i].traduction}
          </div>
        </div>
      );

      console.log("à la fin du ", i);
    }
    return <div className="all-locutions">{allLocutionRendered}</div>;
  }
}

export default Locution;
