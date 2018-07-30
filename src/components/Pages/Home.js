import React, { Component, Fragment } from "react";
// Importation de mes composants
import ButtonMenu from "../ButtonMenu";
import InfoRules from "./InfoRules";
import MakeListExercises from "./MakeListExercises.js";
import FormalisationEnonces from "./FormalisationEnonces";
// import CalculDesPredicats from "./CalculDesPredicats";
import Linker from "../Linker";
import CalculDesPredicats from "./CalculDesPredicats";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <main className="main-menu">
          <Linker
            link="/list-regles"
            path="/list-regles"
            components={InfoRules}
            name={
              <ButtonMenu
                className="tuto-color main-button"
                name={"Tuto & infos"}
              />
            }
          />
          <Linker
            link="/calcul-prop-exo"
            path="/calcul-prop-exo"
            components={MakeListExercises}
            name={
              <ButtonMenu
                className="prop-color main-button"
                name="Calcul des propositions"
              />
            }
          />
          <Linker
            link="/fde"
            path="/fde"
            components={FormalisationEnonces}
            name={
              <ButtonMenu
                className="forma-color main-button"
                name="Formalisation des énoncés"
              />
            }
          />
          <Linker
            link="/calcul-pred"
            path="/calcul-pred"
            components={CalculDesPredicats}
            name={
              <ButtonMenu
                className="pred-color main-button"
                name="Calcul des prédicats"
              />
            }
          />
        </main>
      </Fragment>
    );
  }
}

export default Home;
